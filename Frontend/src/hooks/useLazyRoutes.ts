import { lazy } from 'react';
import type { ComponentType } from 'react';
import { RoutesConfigInterface } from '@/routes/routesConfig';

interface LazyRoutesInterface {
  pathname: string;
  Component: ComponentType
}

/**
 * 懒加载路由
 *
 * @param   {RoutesConfig[]}  routesConfig  路由配置
 *
 * @return  {LazyRoutesInterface[]}         经过懒加载处理的路由配置
 */
const useLazyRoutes = (routesConfig: RoutesConfigInterface[]): LazyRoutesInterface[] => {
  const pagesImporters = import.meta.glob<boolean, string, { default: ComponentType<any> }>('@/pages/siderPages/*/index.tsx');

  const lazyRoutes: LazyRoutesInterface[] = routesConfig.map(({ pathname, componentPath }) => {
    const Component = lazy(pagesImporters[componentPath]);
    return {
      pathname,
      Component,
    }
  });

  return lazyRoutes;
}

export default useLazyRoutes;