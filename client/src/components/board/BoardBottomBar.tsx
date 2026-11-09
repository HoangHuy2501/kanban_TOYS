import { House } from 'lucide-react';
import { Link } from 'react-router-dom';

import BoardPagination from '@client/src/components/board/BoardPagination';
import LanguageToggle from '@client/src/components/board/LanguageToggle';
import { useI18n } from '@client/src/i18n/I18nContext';

interface BoardBottomBarProps {
  page?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
}

const BoardBottomBar = ({ page, pageCount, onPageChange }: BoardBottomBarProps) => {
  const { t } = useI18n();
  const showPagination =
    typeof page === 'number' &&
    typeof pageCount === 'number' &&
    pageCount > 0 &&
    Boolean(onPageChange);

  return (
    <div className="shrink-0 px-4 pb-4 md:px-8 md:pb-5">
      <div className="mx-auto flex w-full max-w-[1720px] items-center justify-end gap-2 md:gap-3">
        {showPagination && onPageChange ? (
          <>
            <BoardPagination page={page} pageCount={pageCount} onChange={onPageChange} />
            <span aria-hidden className="h-8 w-px bg-border md:h-9" />
          </>
        ) : null}

        <LanguageToggle />

        <Link
          to="/"
          aria-label={t('homeAria')}
          className="flex size-12 items-center justify-center rounded-full border border-border bg-white text-primary shadow-lg transition hover:-translate-y-0.5 hover:border-primary hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 md:size-14"
        >
          <House className="size-6 md:size-7" aria-hidden />
        </Link>
      </div>
    </div>
  );
};

export default BoardBottomBar;
