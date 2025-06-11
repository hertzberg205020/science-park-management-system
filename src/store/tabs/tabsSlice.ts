import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TabItem {
  key: string;          // 路由路徑
  label: string;        // 顯示標題
  closable: boolean;    // 是否可關閉
}

interface TabsState {
  activeKey: string;    // 當前激活的 tab key
  items: TabItem[];      // 所有 tabs 列表
}

const initialState: TabsState = {
  activeKey: '/dashboard',
  items: [
    {
      key: '/dashboard',
      label: '儀表板',
      closable: false
    }
  ]
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    // 設定當前活躍的 Tab
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeKey = action.payload;
    },

    // 添加新 Tab
    addTab: (state, action: PayloadAction<TabItem>) => {
      const existingTab = state.items.find(item => item.key === action.payload.key);
      if (!existingTab) {
        state.items.push(action.payload);
      }
      state.activeKey = action.payload.key;
    },

    // 移除 Tab
    removeTab: (state, action: PayloadAction<string>) => {
      const tabKey = action.payload;
      const tabIndex = state.items.findIndex(item => item.key === tabKey);

      if (tabIndex > -1) {
        state.items.splice(tabIndex, 1);

        // 如果關閉的是當前活躍的 Tab，切換到其他 Tab
        if (state.activeKey === tabKey) {
          if (state.items.length > 0) {
            // 優先選擇右邊的 Tab，如果沒有則選擇左邊的
            const newActiveIndex = tabIndex < state.items.length ? tabIndex : tabIndex - 1;
            state.activeKey = state.items[newActiveIndex].key;
          }
        }
      }
    },

    // 關閉其他 Tab
    removeOtherTabs: (state, action: PayloadAction<string>) => {
      const keepTabKey = action.payload;
      state.items = state.items.filter(item => !item.closable || item.key === keepTabKey);
      state.activeKey = keepTabKey;
    },

    // 關閉所有可關閉的 Tab
    removeAllTabs: (state) => {
      state.items = state.items.filter(item => !item.closable);
      if (state.items.length > 0) {
        state.activeKey = state.items[0].key;
      }
    }
  }
});

export const {
  setActiveTab,
  addTab,
  removeTab,
  removeOtherTabs,
  removeAllTabs
} = tabsSlice.actions;

export default tabsSlice.reducer;
