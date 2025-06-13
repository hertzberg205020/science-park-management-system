import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TabItem {
  key: string;          // 路由路徑
  label: string;        // 顯示標題
  closable: boolean;    // 是否可關閉
}

interface TabsState {
  activeKey: string; // 當前展示的 Tab 的 key
  items: TabItem[]; // 所有 Tab 的列表
}

/**
 * Loads the Tabs state from sessionStorage.
 * @returns {TabsState} Returns the Tabs state 物件. If no data is found in sessionStorage, returns the default state.
 * @description
 * Attempts to retrieve and parse the 'tabs-state' entry from sessionStorage. If the data structure is valid, returns the parsed state;
 * otherwise, returns the default Tabs state (including the home tab).
 * This 函式 is used to initialize the Tabs state, ensuring tab 資訊 persists after a page refresh.
 * @example
 * const tabsState = loadTabsFromStorage();
 */
const loadTabsFromStorage = (): TabsState => {
  try {
    const saved = sessionStorage.getItem('tabs-state');
    if (saved) {
      const parsedState = JSON.parse(saved);
      // 驗證數據結構
      if (parsedState.activeKey && Array.isArray(parsedState.items)) {
        return parsedState;
      }
    }
  } catch (error) {
    console.warn('載入 Tab 狀態失敗:', error);
  }

  // 返回預設狀態
  return {
    activeKey: '/dashboard',
    items: [
      {
        key: '/dashboard',
        label: '首頁',
        closable: false
      }
    ]
  };
};

/**
 * Saves the Tabs state to sessionStorage.
 * @param {TabsState} state - The Tabs state to save.
 * @description
 * Serializes the Tabs state and stores it in sessionStorage under the key 'tabs-state'.
 * This 函式 is used to persist the current tab state across page reloads.
 */
const saveTabsToStorage = (state: TabsState) => {
  try {
    sessionStorage.setItem('tabs-state', JSON.stringify(state));
  } catch (error) {
    console.warn('儲存 Tab 狀態失敗:', error);
  }
};

const initialState: TabsState = loadTabsFromStorage();

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    // 設定當前活躍的 Tab
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeKey = action.payload;
      saveTabsToStorage(state);
    },

    // 添加新 Tab
    addTab: (state, action: PayloadAction<TabItem>) => {
      const existingTab = state.items.find(item => item.key === action.payload.key);
      if (!existingTab) {
        state.items.push(action.payload);
      }
      state.activeKey = action.payload.key;
      saveTabsToStorage(state);
    },

    // 移除 Tab
    removeTab: (state, action: PayloadAction<string>) => {
      const tabKey = action.payload;

      // 如果沒有 Tab，則不執行任何操作
      if (state.items.length <= 0) {
        return;
      }

      const tabIndex = state.items.findIndex(item => item.key === tabKey);

      if (state.activeKey === tabKey) {
        const newActiveIndex = tabIndex - 1;
        state.activeKey = state.items[newActiveIndex].key;
      }

      state.items.splice(tabIndex, 1);
      saveTabsToStorage(state);
    },

    // 關閉其他 Tab
    removeOtherTabs: (state, action: PayloadAction<string>) => {
      const keepTabKey = action.payload;
      state.items = state.items.filter(item => !item.closable || item.key === keepTabKey);
      state.activeKey = keepTabKey;
      saveTabsToStorage(state);
    },

    // 關閉所有可關閉的 Tab
    removeAllTabs: (state) => {
      state.items = state.items.filter(item => !item.closable);
      if (state.items.length > 0) {
        state.activeKey = state.items[0].key;
      }
      saveTabsToStorage(state);
    },

    // 清除持久化數據（用於登出時）
    clearTabsStorage: () => {
      try {
        localStorage.removeItem('tabs-state');
      } catch (error) {
        console.warn('清除 Tab 狀態失敗:', error);
      }
    }
  }
});

export const {
  setActiveTab,
  addTab,
  removeTab,
  removeOtherTabs,
  removeAllTabs,
  clearTabsStorage
} = tabsSlice.actions;

export default tabsSlice.reducer;
