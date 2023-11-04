import { firstLevelMenuEnum } from '@/utils/constant';
import { AliwangwangFilled, AppleFilled, CustomerServiceFilled, DribbbleCircleFilled, FireFilled, FlagFilled, LikeFilled, ReadFilled, ShoppingFilled, SmileFilled } from '@ant-design/icons';
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
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => (
  {
    key,
    icon,
    children,
    label,
  } as MenuItem
);

const getIcon = (key: string) => {
  let icon = undefined;
  switch (key) {
    case 'recommend':
      icon = <LikeFilled />
      break;
    case 'knowledge':
      icon = <ReadFilled />
      break;
    case 'hot':
      icon = <FireFilled />
      break;
    case 'game':
      icon = <FlagFilled />
      break;
    case 'amusement':
      icon = <SmileFilled />
      break;
    case 'nichigen':
      icon = <AliwangwangFilled />
      break;
    case 'music':
      icon = <CustomerServiceFilled />
      break;
    case 'food':
      icon = <AppleFilled />
      break;
    case 'pe':
      icon = <DribbbleCircleFilled />
      break;
    case 'fasion':
      icon = <ShoppingFilled />
      break;
    default:
      icon = undefined;
      break;
  }
  return icon
}

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
  const icon = getIcon(key);
  meunItems.push(getMenuItem(
    <Link to={key} >{label}</Link>,
    key,
    icon)
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