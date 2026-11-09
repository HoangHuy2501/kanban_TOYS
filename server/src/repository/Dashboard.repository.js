const { getPool, sql } = require("../config/connectData");
const { getIgPool } = require("../config/connectDataMsqls");
class DashboardRepository {
    async GetDashboardData(flow, StepNo) {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('flow', sql.VarChar(50), flow)
                .input('StepNo', sql.Int, StepNo)
                .query(`
                SELECT
                    p.dept AS Flow,
                    p.emp_num as SLNKH,
                    p.fact_emp_num as SLNTT,
                    p.short_code as MH,
                    p.ord_no as PO,
                    p.ord_qty as SLPO,
                    p.pro_no as CDoan,
                    p.plan_qty as SLKH,
                    k.step AS StepNo,
                    k.style AS Style,
                    k.order_no AS OrderNo,
                    k.wrk_order AS WrkOrder,
                    k.process AS Process,
                    ROUND(k.smv, 2) AS SMV
                FROM [TongeBi].[dbo].[kanban_wo_smv] k

                INNER JOIN (
                    SELECT DISTINCT
                        e.dept,
                        e.short_code,
                        e.ord_no,
                        e.emp_num,
                        e.fact_emp_num,
                        e.ord_qty,
                        e.pro_no,
                        --b.goods_name,
                        e.plan_qty
                    FROM RDS.erp_t8_GI.dbo.sfc_pro_emp_num_def01 e 
                    join RDS.erp_t8_GI.dbo.sfc_plan2 s on s.def01=e.ord_no
                    join RDS.erp_t8_GI.dbo.sfc_mo2 m on m.mrp_no=s.mrp_no
                    join RDS.erp_t8_GI.dbo.bas_goods b on b.goods_no=m.goods_no
                    WHERE dept = @flow
                    AND pro_date >= CAST(GETDATE() AS DATE)
                    AND pro_date < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))
                ) p
                    ON k.style = p.short_code
                AND k.order_no = p.ord_no
                WHERE k.step = @StepNo
                GROUP BY
                    p.dept,
                    p.emp_num,
                    p.fact_emp_num,
                    p.short_code,
                    p.ord_no,
                    p.ord_qty,
                    p.pro_no,
                    p.plan_qty,
                    k.step,
                    k.style,
                    k.order_no,
                    k.wrk_order,
                    k.process,
                    k.smv
                ORDER BY k.style, k.order_no;
                `);
            return result.recordset;
        } catch (error) {
            throw error
        }
    }
    //lấy số lượng thực tế
    async GetActualQuantity(flow, StepNo) {
        try {
            const pool = await getIgPool();
            const result = await pool.execute(`
                SELECT
                    flow AS Flow,
                    step AS StepNo,
                    cust_style AS Style,
                    order_no AS OrderNo,
                    SUM(qty) AS ActualOutput
                FROM bi.regsum1h_v2
                WHERE reg_date = CURDATE()
                AND flow = ?
                AND step = ?
                GROUP BY
                    flow,
                    step,
                    cust_style,
                    order_no;
               `, [flow, StepNo]);
            return result
        } catch (error) {
            throw error
        }
    }
}
module.exports = new DashboardRepository();