interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div className="board-surface flex min-h-screen w-full flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-4xl font-extrabold text-status-danger">
        Ứng dụng gặp lỗi
      </p>
      <p className="max-w-xl break-words text-sm text-muted-foreground">
        {error?.message || 'Đã xảy ra lỗi không xác định.'}
      </p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="mt-2 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Thử lại
      </button>
    </div>
  );
};

export default ErrorFallback;
