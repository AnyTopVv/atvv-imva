import { firstLevelMenuEnum } from '@/utils/constant';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
export interface RoutesConfigInterface {
  pathname: string;
  componentPath: string;
}

const firstLevelMenuItems = Object.keys(firstLevelMenuEnum);  // 一级菜单项

/**
 * 获取菜单项
 * @param label 显示内容
 * @param key 唯一标识符
 * @param children 子菜单列表
 * @param icon 图标
 * @returns 菜单项
 */
const getMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  icon?: React.ReactNode,
): MenuItem => (
  {
    key,
    icon,
    children,
    label,
  } as MenuItem
);

/**
 * 获取页面组件路径
 * @param name 组件名
 * @returns 页面组件路径
 */
const getComponentPath = (name: string) => `/src/pages/siderPages/${name}/index.tsx`;

// 菜单配置项
const meunItems: MenuItem[] = [];
firstLevelMenuItems.forEach(key => {
  const label = firstLevelMenuEnum[key as keyof typeof firstLevelMenuEnum];
  meunItems.push(getMenuItem(
    <Link to={key} >{label}</Link>,
    key)
  )
})
export { meunItems };

// 路由配置
const routesConfig: RoutesConfigInterface[] = [];
firstLevelMenuItems.forEach(firstLevelMenuItem => {

  const routeConfig = [{
    pathname: `${firstLevelMenuItem}`,
    componentPath: getComponentPath(firstLevelMenuItem),
  }]
  routesConfig.push(...routeConfig);
})
export { routesConfig };