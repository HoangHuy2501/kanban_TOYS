import { House, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
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
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const themeLabel = t(isDark ? 'switchToLight' : 'switchToDark');
  const showPagination =
    typeof page === 'number' &&
    typeof pageCount === 'number' &&
    pageCount > 0 &&
    Boolean(onPageChange);

  return (
    <div className="shrink-0 px-4 pb-4 md:px-8 md:pb-5">
      <div className="mx-auto flex w-full max-w-[1720px] flex-wrap items-center justify-end gap-2 md:gap-3">
        {showPagination && onPageChange ? (
          <>
            <BoardPagination page={page} pageCount={pageCount} onChange={onPageChange} />
            <span aria-hidden className="hidden h-9 w-px bg-border sm:block" />
          </>
        ) : null}

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            aria-label={themeLabel}
            title={themeLabel}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary shadow-lg transition hover:-translate-y-0.5 hover:border-primary hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 md:size-14"
          >
            {isDark ? <Sun className="size-5 md:size-6" aria-hidden /> : <Moon className="size-5 md:size-6" aria-hidden />}
          </button>

          <LanguageToggle />
        </div>

        <Link
          to="/"
          aria-label={t('homeAria')}
          className="flex size-12 items-center justify-center rounded-full border border-border bg-card text-primary shadow-lg transition hover:-translate-y-0.5 hover:border-primary hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 md:size-14"
        >
          <House className="size-6 md:size-7" aria-hidden />
        </Link>
      </div>
    </div>
  );
};

export default BoardBottomBar;
