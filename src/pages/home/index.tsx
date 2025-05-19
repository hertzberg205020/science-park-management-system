import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import NavSidebar from '@/components/navSidebar';
import CustomBreadcrumb from '@/components/breadCrumb';
import LayoutHeader from '@/components/layoutHeader';
import { Outlet } from 'react-router';

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100%' }}>
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
        <Content style={{ margin: '0 16px' }}>
          <CustomBreadcrumb />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
          aaaa
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
