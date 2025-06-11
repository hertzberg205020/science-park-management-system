import React from 'react';
import { Tabs, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { setActiveTab, removeTab, removeOtherTabs, removeAllTabs } from '@/store/tabs/tabsSlice';
import './index.scss';

const TabsManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeKey, items } = useAppSelector(state => state.tabsSlice);

  // Tab 切換處理
  const handleTabChange = (key: string) => {
    dispatch(setActiveTab(key));
  };

  // Tab 關閉處理
  const handleTabEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      dispatch(removeTab(targetKey as string));
    }
  };

  // 右鍵選單項目
  const getContextMenuItems = (tabKey: string): MenuProps['items'] => [
    {
      key: 'close-others',
      label: '關閉其他',
      onClick: () => dispatch(removeOtherTabs(tabKey))
    },
    {
      key: 'close-all',
      label: '關閉所有',
      onClick: () => dispatch(removeAllTabs())
    }
  ];

  // 轉換 Tab 項目格式
  const tabItems = items.map(item => ({
    key: item.key,
    label: (
      <Dropdown
        menu={{ items: getContextMenuItems(item.key) }}
        trigger={['contextMenu']}
      >
        <span className="tab-label">
          <span className="tab-text">{item.label}</span>
        </span>
      </Dropdown>
    ),
    closable: item.closable
  }));

  return (
    <div className="tabs-manager">
      <Tabs
        type="editable-card"
        activeKey={activeKey}
        items={tabItems}
        onChange={handleTabChange}
        onEdit={handleTabEdit}
        hideAdd
        tabBarStyle={{
          margin: 0,
          padding: '0 16px',
          background: 'transparent'
        }}
        tabBarExtraContent={
          <Dropdown
            menu={{
              items: [
                {
                  key: 'close-others',
                  label: '關閉其他',
                  onClick: () => dispatch(removeOtherTabs(activeKey))
                },
                {
                  key: 'close-all',
                  label: '關閉所有',
                  onClick: () => dispatch(removeAllTabs())
                }
              ]
            }}
            placement="bottomRight"
          >
            <MoreOutlined className="tabs-more-btn" />
          </Dropdown>
        }
      />
    </div>
  );
};

export default TabsManager;
