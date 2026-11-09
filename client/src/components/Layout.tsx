import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="board-surface min-h-screen w-full">
      <Outlet />
    </div>
  );
};

export default Layout;
