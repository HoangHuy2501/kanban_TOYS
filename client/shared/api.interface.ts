/* 前后端共享的类型写在这里 */

export const PRODUCTION_ACCENTS = ['blue', 'green', 'orange', 'violet'] as const;
export type ProductionAccent = (typeof PRODUCTION_ACCENTS)[number];
export const isProductionAccent = (v: string): v is ProductionAccent =>
  (PRODUCTION_ACCENTS as readonly string[]).includes(v);
export const PRODUCTION_ACCENT_LABELS: Record<ProductionAccent, string> = {
  blue: 'Xanh dương',
  green: 'Xanh lá',
  orange: 'Cam',
  violet: 'Tím',
};

export interface ProductionLine {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  accent: ProductionAccent;
  targetLabel: string;
}

export interface ProductionRecordRow {
  id: string;
  groupName: string;
  plannedWorkers: number;
  actualWorkers: number;
  itemCode: string | null;
  woCode: string | null;
  poCode: string | null;
  poQty: number;
  operationStaff: number;
  goodsName: string | null;
  smv: number;
  plannedQty: number;
  actualQty: number;
  completionRate: number | null;
  varianceQty: number;
  varianceHours: number | null;
}

export interface ProductionLineTotals {
  recordCount: number;
  plannedQty: number;
  actualQty: number;
  completionRate: number | null;
  varianceQty: number;
}

export interface ProductionLineDetail {
  line: ProductionLine;
  targetDate: string;
  rows: ProductionRecordRow[];
  totals: ProductionLineTotals;
  syncedAt: string;
}

export const INJMOLDING_LINE_CODE = 'F11-INJMOLDING';
export const INJMOLDING_DASHBOARD_MESSAGE = 'dashboardInjmolding' as const;
export const LINE_DASHBOARD_MESSAGE = 'dashboard' as const;

export interface DashboardRecordRow {
  groupName: string;
  plannedWorkers: number;
  actualWorkers: number;
  itemCode: string | null;
  poCode: string | null;
  wrkOrder: string | null;
  poQty: number;
  operationStaff: string;
  goodsNo: string | null;
  goodsName: string | null;
  smv: number;
  plannedQty: number;
  actualQty: number;
  completionRate: number;
  varianceQty: number;
  varianceHours: number;
}

export interface InjmoldingDashboardResponse {
  success: true;
  message: typeof INJMOLDING_DASHBOARD_MESSAGE;
  data: DashboardRecordRow[];
}

export interface LineDashboardResponse {
  success: true;
  message: typeof LINE_DASHBOARD_MESSAGE;
  data: DashboardRecordRow[][];
}
