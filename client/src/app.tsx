import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import { I18nProvider } from './i18n/I18nContext';
import FactoryDashboardPage from './pages/FactoryDashboard/FactoryDashboardPage';
import LineDetailPage from './pages/LineDetail/LineDetailPage';
import NotFound from './pages/NotFound/NotFound';

const RoutesComponent = () => {
  return (
    <I18nProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<FactoryDashboardPage />} />
          <Route path="line/:lineCode" element={<LineDetailPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </I18nProvider>
  );
};

export default RoutesComponent;
