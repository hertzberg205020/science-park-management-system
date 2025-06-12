import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import icons from './icons';
import logo from '@/assets/logo.png';
import './index.scss';
import { useAppDispatch, useAppSelector } from '@/store';
import { useLocation, useNavigate } from 'react-router';
import { addTab } from '@/store/tabs/tabsSlice';
import type { MenuItemInRow } from '@/types/MenuItemInRow';

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

// 遞迴查找選單項目資訊
function findMenuItemByKey(menuList: MenuItemInRow[], key: string): MenuItemInRow | null {
  for (const item of menuList) {
    if (item.key === key) {
      return item;
    }
    if (item.children) {
      const found = findMenuItemByKey(item.children, key);
      if (found) return found;
    }
  }
  return null;
}

const NavSidebar: React.FC<NavSidebarProps> = ({ collapsed }) => {
  const [menuTree, setMenuTree] = useState<MenuItem[]>([]);
  const data = useAppSelector(state => state.authSlice.menuList);
  const { token } = useAppSelector(state => state.authSlice);
  const { activeKey } = useAppSelector(state => state.tabsSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuItemClick = ({ key }: { key: string }) => {
    // 查找選單項目資訊
    const menuItem = findMenuItemByKey(data, key);


    if (menuItem) {
      // 建立新 Tab
      dispatch(addTab({
        key: menuItem.key,
        label: menuItem.label,
        closable: menuItem.key !== '/dashboard' // 首頁不可關閉
      }));
    }

    // 導航到對應路由
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
        {!collapsed && <h1>Smart</h1>}
      </div>
      <Menu
        defaultSelectedKeys={['/dashboard']}
        selectedKeys={[activeKey || location.pathname]}
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
