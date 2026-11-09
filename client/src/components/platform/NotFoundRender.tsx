import { Link } from 'react-router-dom';
import { House } from 'lucide-react';

const NotFoundRender = () => {
  return (
    <div className="board-surface flex min-h-screen w-full flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-6xl font-extrabold text-primary tnum">404</p>
      <p className="text-lg font-semibold text-foreground">
        Không tìm thấy trang
      </p>
      <p className="max-w-md text-sm text-muted-foreground">
        Trang bạn truy cập không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <House className="size-4" />
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFoundRender;
