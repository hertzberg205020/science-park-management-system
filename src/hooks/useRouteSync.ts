import { useAppDispatch, useAppSelector } from '@/store';
import { addTab, setActiveTab } from '@/store/tabs/tabsSlice';
import type { MenuItemInRow } from '@/types/MenuItemInRow';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

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

export const useRouteSync = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { menuList } = useAppSelector(state => state.authSlice);

  // 監聽路由變化，自動建立/切換 Tab
  useEffect(() => {
    const currentPath = location.pathname;

    const menuItem = findMenuItemByKey(menuList, currentPath);

    // 當 activeKey 變化時，tabsManager 會自動導航到對應的路由
    // navigate 的職責為 tabsManager
    if (menuItem) {
      dispatch(addTab({
        key: menuItem.key,
        label: menuItem.label,
        closable: menuItem.key !== '/dashboard'
      }));
    } else {
      console.warn(`No menu item found for path: ${currentPath}`);
      // 預設切換到儀表板
      dispatch(setActiveTab('/dashboard'));
    }
  }, [location.pathname, dispatch, menuList]);
}
