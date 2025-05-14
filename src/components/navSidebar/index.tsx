import { getMenu, type MenuItemInRow } from '@/api/users';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import icons from './icons';
import logo from '@/assets/logo.png';
import './index.scss';

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode | null;
  children?: MenuItem[] | null;
}


interface NavSidebarProps {
  collapsed: boolean;
}

function convertToMenuItem(nodes: MenuItemInRow[]): MenuItem[] {
  return nodes.map((node) => {
    const { key, label, icon, children } = node;
    const menuItem: MenuItem = {
      key,
      label,
      icon: icon ? icons[icon] : null,
      children: children ? convertToMenuItem(children) : null,
    };
    return menuItem;
  });
}

const NavSidebar: React.FC<NavSidebarProps> = ({ collapsed }) => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await getMenu();
        const convertedData = convertToMenuItem(data);
        setMenuData(convertedData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    // the callback function in useEffect can not be async
    // because it will return a promise
    // so we need to define a function and call it
    fetchMenuData();
  }, []);


  return (
    <div className='nav-left'>
      <div className="logo">
        <img src={logo} alt='Smart Park' width={18} />
        <h1>Smart</h1>
      </div>
      <Menu
        defaultSelectedKeys={['/dashboard']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={menuData}
      />
    </div>
  )
}

export default NavSidebar;
