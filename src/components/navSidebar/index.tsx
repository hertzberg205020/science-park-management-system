import { type MenuItemInRow } from '@/api/users';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import icons from './icons';
import logo from '@/assets/logo.png';
import './index.scss';
import { useAppSelector } from '@/store';
import { useNavigate } from 'react-router';

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
  const [menuTree, setMenuTree] = useState<MenuItem[]>([]);
  const data = useAppSelector(state => state.authSlice.menuList);
  const { token } = useAppSelector(state => state.authSlice);
  const navigate = useNavigate();

  const handleMenuItemClick = ({ key }: { key: string }) => {
    // Handle menu item click
    navigate(key);

  }


  useEffect(() => {

    const convertedData = convertToMenuItem(data);
    setMenuTree(convertedData);
  }, [data, token]);


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
        items={menuTree}
        onClick={handleMenuItemClick}
      />
    </div>
  )
}

export default NavSidebar;
