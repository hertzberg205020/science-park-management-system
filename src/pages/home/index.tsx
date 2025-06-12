import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import NavSidebar from '@/components/navSidebar';
import CustomBreadcrumb from '@/components/breadCrumb';
import LayoutHeader from '@/components/layoutHeader';
import { Outlet, useLocation } from 'react-router';
import TabsManager from '@/components/tabsManager';
import type { MenuItemInRow } from '@/types/MenuItemInRow';
import { useAppDispatch, useAppSelector } from '@/store';
import { addTab, setActiveTab } from '@/store/tabs/tabsSlice';

const { Header, Content, Footer, Sider } = Layout;


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

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { menuList } = useAppSelector(state => state.authSlice);
  const { items } = useAppSelector(state => state.tabsSlice);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 監聽路由變化，自動建立/切換 Tab
  useEffect(() => {
    const currentPath = location.pathname;

    // 檢查當前路徑是否已經有 Tab
    const existingTab = items.find(item => item.key === currentPath);

    if (existingTab) {
      // 如果已存在，只需切換
      dispatch(setActiveTab(currentPath));
    } else {
      // 如果不存在，查找選單項目並建立新 Tab
      const menuItem = findMenuItemByKey(menuList, currentPath);
      if (menuItem) {
        dispatch(addTab({
          key: menuItem.key,
          label: menuItem.label,
          closable: menuItem.key !== '/dashboard'
        }));
      }
    }
  }, [location.pathname, dispatch, menuList, items]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        // style={{ maxHeight: '100vh', overflow: 'auto' }}
        width={240}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <NavSidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 20px 0 0', background: colorBgContainer, textAlign: 'right' }} >
          <LayoutHeader />
        </Header>
        <Content style={{
          margin: '0 16px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <CustomBreadcrumb />

          <div className="tabs-container" style={{
            flexShrink: 0,
            background: colorBgContainer,
            borderRadius: `${borderRadiusLG}px ${borderRadiusLG}px 0 0`,
            marginBottom: 0
          }}>
            <TabsManager />
          </div>

          <div
            style={{
              flex: 1,
              minHeight: 0,
              padding: 24,
              overflowY: 'auto',
              overflowX: 'hidden',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout >
  );
};

export default Home;
