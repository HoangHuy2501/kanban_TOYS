import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { getApiErrorMessage } from '@client/src/lib/api-error';
import { PRODUCTION_LINES } from '@client/src/config/production-lines';
import {
  fetchKanbanDetail,
  lineKanbanQueryKey,
} from '@client/src/hooks/use-production';
import BoardHeader from '@client/src/components/board/BoardHeader';
import BoardBottomBar from '@client/src/components/board/BoardBottomBar';
import LineCard from '@client/src/components/board/LineCard';
import { useI18n } from '@client/src/i18n/I18nContext';
import type { ProductionLine } from '@shared/api.interface';

const FactoryDashboardPage = () => {
  const [openingCode, setOpeningCode] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useI18n();

  const lines: ProductionLine[] = PRODUCTION_LINES;

  const handleOpen = async (line: ProductionLine): Promise<void> => {
    if (openingCode) return;
    setOpeningCode(line.code);
    try {
      await queryClient.fetchQuery({
        queryKey: lineKanbanQueryKey(line.code),
        queryFn: () => fetchKanbanDetail(line.code),
        staleTime: 15_000,
      });
      navigate(`/line/${encodeURIComponent(line.code)}`);
    } catch (openError) {
      toast.error(t('lineOpenFailed'), {
        description: getApiErrorMessage(openError, t('requestFailedHint')),
      });
    } finally {
      setOpeningCode(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <BoardHeader />

      <main className="mx-auto w-full max-w-[1680px] flex-1 px-6 py-6 md:px-10 md:py-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lines.map((line: ProductionLine, index: number) => (
            <div
              key={line.id}
              className="rise"
              style={{ animationDelay: `${Math.min(index, 6) * 45}ms` }}
            >
              <LineCard
                line={line}
                onOpen={(target: ProductionLine) => void handleOpen(target)}
                isOpening={openingCode === line.code}
              />
            </div>
          ))}
        </div>
      </main>

      <BoardBottomBar />
    </div>
  );
};

export default FactoryDashboardPage;
