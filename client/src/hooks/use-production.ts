import { useQuery } from '@tanstack/react-query';

import {
  fetchDashboardDetail,
  fetchInjmoldingDetail,
} from '@client/src/api/production';
import type { ProductionLineDetail } from '@shared/api.interface';

const REFRESH_INTERVAL_MS = 300_000;
const KANBAN_STALE_TIME_MS = 15_000;

export const lineKanbanQueryKey = (code: string) => ['line-kanban', code] as const;

export const fetchKanbanDetail = async (
  code: string,
): Promise<ProductionLineDetail> => {
  if (code.includes('INJMOLDING')) return fetchInjmoldingDetail(code);
  return fetchDashboardDetail(code);
};

export const useProductionLineDetail = (code: string) => {
  return useQuery({
    queryKey: lineKanbanQueryKey(code),
    queryFn: () => fetchKanbanDetail(code),
    enabled: code.length > 0,
    staleTime: KANBAN_STALE_TIME_MS,
    refetchInterval: REFRESH_INTERVAL_MS,
  });
};
