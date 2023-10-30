import { Suspense, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from '@/components/Loading';
import PageNotFound from '@/pages/PageNotFound';
import useLazyRoutes from '@/hooks/useLazyRoutes';
import { routesConfig } from './routesConfig';
import type { FC, ReactElement } from 'react';

const SiderRouters: FC = (): ReactElement => {
  const lazyRoutes = useLazyRoutes(routesConfig);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {lazyRoutes.map(({ pathname, Component }) => {
          return <Route path={pathname} element={<Component />} key={pathname} />;
        })}
        <Route
          path="/"
          element={
            <Navigate to='/recommend' />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default memo(SiderRouters);