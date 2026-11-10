import { axiosForBackend } from '@client/src/api/http';
import type {
  DashboardRecordRow,
  InjmoldingDashboardResponse,
  AssemblyDashboardResponse,
  LineDashboardResponse,
  ProductionLine,
  ProductionLineDetail,
  ProductionLineTotals,
  ProductionRecordRow,
} from '@shared/api.interface';

import {
  findProductionLine,
} from '@client/src/config/production-lines';

export async function fetchLineDashboard(): Promise<DashboardRecordRow[][]> {
  const response = await axiosForBackend.get<LineDashboardResponse>(
    '/api/dashboard',
  );

  return response.data.data;
}

export async function fetchInjmoldingDashboard(): Promise<DashboardRecordRow[]> {
  const response = await axiosForBackend.get<InjmoldingDashboardResponse>(
    '/api/dashboard/injmolding',
  );
  return response.data.data;
}

export async function fetchAssemblyDashboard(): Promise<DashboardRecordRow[]> {
  const response = await axiosForBackend.get<AssemblyDashboardResponse>(
    '/api/dashboard/assembly',
  );

  return response.data.data;
}
const toRecordRow = (
  row: DashboardRecordRow,
  index: number,
): ProductionRecordRow => ({
  id: `${row.wrkOrder ?? row.itemCode}-${index}`,
  groupName: row.groupName,
  plannedWorkers: row.plannedWorkers,
  actualWorkers: row.actualWorkers,
  itemCode: row.itemCode,
  woCode: row.wrkOrder,
  poCode: row.poCode,
  poQty: row.poQty,
  operationStaff: Number(row.operationStaff) || 0,
  goodsName: row.goodsName,
  smv: row.smv,
  plannedQty: row.plannedQty,
  actualQty: row.actualQty,
  completionRate: row.completionRate,
  varianceQty: row.varianceQty,
  varianceHours: row.varianceHours,
});

const buildDetail = (
  code: string,
  groups: DashboardRecordRow[][],
): ProductionLineDetail => {
  const line: ProductionLine = findProductionLine(code) ?? {
    id: code,
    code,
    name: code,
    subtitle: '',
    accent: 'blue',
    targetLabel: '',
  };
  const rows = groups.flat().map(toRecordRow);
  const plannedQty = rows.reduce(
    (sum: number, row: ProductionRecordRow) => sum + row.plannedQty,
    0,
  );
  const actualQty = rows.reduce(
    (sum: number, row: ProductionRecordRow) => sum + row.actualQty,
    0,
  );
  const totals: ProductionLineTotals = {
    recordCount: rows.length,
    plannedQty,
    actualQty,
    completionRate:
      plannedQty > 0 ? Math.round((actualQty / plannedQty) * 100) : null,
    varianceQty: actualQty - plannedQty,
  };

  return {
    line,
    targetDate: new Date().toISOString().slice(0, 10),
    rows,
    totals,
    syncedAt: new Date().toISOString(),
  };
};

export async function fetchDashboardDetail(
  code: string,
): Promise<ProductionLineDetail> {
  const groups = await fetchLineDashboard();

  return buildDetail(code, groups);
}

export async function fetchAssemblyDetail(
  code: string,
): Promise<ProductionLineDetail> {
  const rows = await fetchAssemblyDashboard();

  return buildDetail(code, [rows]);
}

export async function fetchInjmoldingDetail(
  code: string,
): Promise<ProductionLineDetail> {
  const rows = await fetchInjmoldingDashboard();
  return buildDetail(code, [rows]);
}
