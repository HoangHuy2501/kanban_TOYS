const { getPool, sql } = require("../config/connectData");
const { getIgPool } = require("../config/connectDataMsqls");

class InjmoldingRepository {

    // lấy dữ liệu của assembly(bộ phận nhựa)
    async GetInjmoldingData(flow, StepNo) {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('flow', sql.VarChar(50), flow)
                .input('StepNo', sql.Int, StepNo)
                .query(`
                SELECT
                    x.Flow,
                    x.WrkOrder,
                    x.StepNo,
                    x.SLNKH,
                    x.SLNTT,
                    x.SLPO,
                    x.CDoan,
                    x.SLKH,
                    x.GoodsName,
                    x.SMV
                FROM (
                    SELECT
                        e.dept AS Flow,
                        k.style AS MH,
                        COALESCE(k.wrk_order, e.short_code) AS WrkOrder,
                        COALESCE(k.step, e.pro_no) AS StepNo,
                        e.emp_num AS SLNKH,
                        e.fact_emp_num AS SLNTT,
                        e.ord_qty AS SLPO,
                        e.pro_no AS CDoan,
                        e.plan_qty AS SLKH,
                        m.goods_no AS GoodsNo,
                        b.goods_name AS GoodsName,
                        ROUND(k.smv, 2) AS SMV,

                        ROW_NUMBER() OVER (
                            PARTITION BY
                                e.dept,
                                e.short_code,
                                e.pro_no,
                                e.pro_date
                            ORDER BY
                                e.id DESC,
                                m.id DESC
                        ) AS rn

                    FROM RDS.erp_t8_GI.dbo.sfc_pro_emp_num_def01 e

                    LEFT JOIN [TongeBi].[dbo].[kanban_wo_smv] k
                        ON k.wrk_order = e.short_code
                    AND k.step = @StepNo
                    AND k.process = 'INJMOLDING'

                    LEFT JOIN RDS.erp_t8_GI.dbo.sfc_mo2 m
                        ON m.def02=left(k.wrk_order, CHARINDEX('#', k.wrk_order + '#') - 1)

                    LEFT JOIN RDS.erp_t8_GI.dbo.bas_goods b
                        ON b.goods_no = m.goods_no

                    WHERE e.dept LIKE @flow
                    AND e.pro_no = @StepNo
                    AND e.pro_date >= CAST(GETDATE() AS DATE)
                    AND e.pro_date < DATEADD(
                        DAY, 1, CAST(GETDATE() AS DATE)
                    )
                ) x
                WHERE x.rn = 1
                ORDER BY x.WrkOrder, x.GoodsNo;
                `);
            return result.recordset;
        } catch (error) {
            throw error
        }
    }
    // lấy số lượng thực tế của injmolding (bộ phận nhựa)
    async GetInjmoldingActualQuantity(flow, StepNo) {
        try {
            const pool = await getIgPool();
            const result = await pool.execute(`
                SELECT
                    t.flow AS Flow,
                    x.step AS StepNo,
                    t.WrkOrder,
                    SUM(t.Qty) AS ActualOutput
                FROM bi.__kanban_wo_bdl_step x
                INNER JOIN payroll.pytckreg3 t
                    ON t.WrkOrder = x.wo
                AND t.BundleNo = x.bundle
                AND t.StepNo = x.step
                WHERE t.RegDate = CURDATE()
                AND t.Flow like ?
                AND x.process = 'INJMOLDING'
                AND x.step = ?
                GROUP BY
                    t.flow,
                    x.step,
                    t.WrkOrder;
               `, [flow, StepNo]);
            return result
        } catch (error) {
            throw error
        }
    }
}
module.exports = new InjmoldingRepository();