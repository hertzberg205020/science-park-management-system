# 探討身分驗證與授權

## 問題描述

目前的身分驗證實作會依據使用者身分動態創建 routes，網頁後端會依據使用者的 JWT token 返回使用者可視的 routes，返回的結果如下方所示。

```json
[
  {
    "icon": "DashboardOutlined",
    "label": "Dashboard",
    "description": "儀表板",
    "key": "/dashboard",
  },
  {

    "icon": "TeamOutlined",
    "label": "Tenant Management",
    "description": "客戶管理",
    "key": "/users",
    "children": [
      {
        "icon": "UnorderedListOutlined",
        "label": "Tenant List",
        "description": "客戶列表",
        "key": "/users/list",
      },
      {
        "icon": "UserAddOutlined",
        "label": "Add Tenant",
        "description": "新增客戶",
        "key": "/users/add",
      }
    ]
  },
  {
    "icon": "LaptopOutlined",
    "label": "Property Management",
    "key": "/property-management",
    "description": "物業管理",
    "children": [
      {

        "icon": "InsertRowLeftOutlined",
        "label": "Building Management",
        "description": "大樓管理",
        "key": "/property-management/building",

      },
      {
        "icon": "BankOutlined",
        "label": "Room Management",
        "description": "房間管理",
        "key": "/property-management/room",
      },
      {
        "icon": "TruckOutlined",
        "label": "Vehicle Information",
        "description": "車輛管理",
        "key": "/property-management/car",
      }
    ]
  },
  {
    "icon": "ToolOutlined",
    "label": "Repair Management",
    "key": "/repair",
    "description": "修復管理"
  },
  {
    "icon": "DollarOutlined",
    "label": "Financial Management",
    "description": "財務管理",
    "key": "/finance",
    "children": [
      {

        "icon": "ProfileOutlined",
        "label": "Contract Management",
        "description": "合約管理",
        "key": "/finance/contract",

      },
      {
        "icon": "FrownOutlined",
        "label": "Contract Detail",
        "description": "合約明細",
        "key": "/finance/contract/detail",
      },
      {
        "icon": "FileTextOutlined",
        "label": "Billing Management",
        "description": "收費管理",
        "key": "/finance/bill",
      }
    ]
  },
  {
    "icon": "TransactionOutlined",
    "label": "Leasing Hub",
    "description": "招商管理",
    "key": "/merchant-portal",
  },
  {
    "icon": "FundProjectionScreenOutlined",
    "label": "Operations Management",
    "description": "運營管理",
    "key": "/operation-center",
    "children": [
      {

        "icon": "FundViewOutlined",
        "label": "Operations Overview",
        "description": "運營概覽",
        "key": "/operation-center/analytics",

      },
      {
        "icon": "ReadOutlined",
        "label": "Article Publishing",
        "description": "文章發布",
        "key": "/operation-center/article",
      },
      {
        "icon": "CommentOutlined",
        "label": "Content Comments",
        "description": "內容評論",
        "key": "/operation-center/comments",
      }
    ]
  },
  {
    "icon": "ToolOutlined",
    "label": "Equipment Management",
    "description": "設備管理",
    "key": "/equipment",
  },
  {
    "icon": "ThunderboltOutlined",
    "label": "Energy Consumption",
    "description": "能耗管理",
    "key": "/energy",
  },
  {
    "icon": "SettingOutlined",
    "label": "Authorization Settings",
    "description": "權限管理",
    "key": "/authorization-center",
  },
  {
    "icon": "UserOutlined",
    "label": "User Profile",
    "description": "個人資訊",
    "key": "/user-profile",
  }
]
```

我想將 mock API 的返回值類型由原先的 `MenuItemInRow[]` 改為 `string[]`，其表示的是 permissions，如下方所示。
使用 `generateRoutes` 函式來生成對應使用者權限的 routes，和使用 PrivateRoute 機制**重構目前的授權檢視機制**。

```json
[
  "authorization.center.read",
  "dashboard.read",
  "energy.read",
  "equipment.read",
  "finance.bill.read",
  "finance.contract.detail.read",
  "finance.contract.read",
  "merchant.portal.read",
  "operation.center.analytics.read",
  "operation.center.article.read",
  "operation.center.comments.read",
  "property.management.building.read",
  "property.management.car.read",
  "property.management.room.read",
  "repair.read",
  "user.profile.read",
  "users.add.read",
  "users.list.read"
]
```

## project structure

```txt
├── commit-instructions.md
├── Documents
│   ├── auth
│   │   ├── problem-02.md
│   │   └── problems-01.md
│   └── tab-component.md
├── eslint.config.js
├── index.html
├── LICENSE.txt
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── api
│   │   ├── client-list.ts
│   │   ├── dashboard.ts
│   │   ├── tenement.ts
│   │   └── users.ts
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   ├── bg.jpg
│   │   ├── come.png
│   │   ├── lgbg.jpg
│   │   ├── login-background.png
│   │   └── logo.png
│   ├── components
│   │   ├── breadCrumb
│   │   │   └── index.tsx
│   │   ├── layoutHeader
│   │   │   └── index.tsx
│   │   ├── navSidebar
│   │   │   ├── icons.tsx
│   │   │   ├── index.scss
│   │   │   └── index.tsx
│   │   └── tabsManager
│   │       ├── index.scss
│   │       └── index.tsx
│   ├── hooks
│   │   └── useRouteSync.ts
│   ├── index.scss
│   ├── main.tsx
│   ├── mock
│   │   ├── index.ts
│   │   └── menus
│   │       ├── description.md
│   │       └── index.ts
│   ├── pages
│   │   ├── authorization-center
│   │   │   └── index.tsx
│   │   ├── dashboard
│   │   │   ├── BarFigure.tsx
│   │   │   ├── energy-figure-config.ts
│   │   │   ├── EnergyFigure.tsx
│   │   │   ├── icons.tsx
│   │   │   ├── index.scss
│   │   │   ├── index.tsx
│   │   │   └── PieFigure.tsx
│   │   ├── energy
│   │   │   └── index.tsx
│   │   ├── equipment
│   │   │   └── index.tsx
│   │   ├── finance
│   │   │   ├── bill-center.tsx
│   │   │   ├── contract-detail.tsx
│   │   │   └── contract.tsx
│   │   ├── home
│   │   │   └── index.tsx
│   │   ├── leasing-hub
│   │   │   └── merchant-portal.tsx
│   │   ├── login
│   │   │   ├── index.scss
│   │   │   └── index.tsx
│   │   ├── notFound
│   │   │   └── index.tsx
│   │   ├── operation-center
│   │   │   ├── analytics.tsx
│   │   │   ├── article.tsx
│   │   │   └── comments.tsx
│   │   ├── property-management
│   │   │   ├── room.tsx
│   │   │   ├── tenement
│   │   │   │   ├── columns.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   └── UpsertModal.tsx
│   │   │   └── vehicle.tsx
│   │   ├── repair
│   │   │   └── index.tsx
│   │   ├── user-profile
│   │   │   └── index.tsx
│   │   └── users
│   │       ├── add-user.tsx
│   │       ├── ClientForm.tsx
│   │       ├── index.tsx
│   │       └── interface
│   │           └── index.ts
│   ├── router
│   │   ├── index.tsx
│   │   └── routerMap.tsx
│   ├── store
│   │   ├── index.ts
│   │   ├── login
│   │   │   └── authSlice.ts
│   │   ├── tabs
│   │   │   └── tabsSlice.ts
│   │   └── tenement
│   │       └── tenementSlice.ts
│   ├── types
│   │   ├── MenuItemInRow.ts
│   │   ├── PaginatedResponse.ts
│   │   └── tenement.ts
│   ├── utils
│   │   ├── generateRoutes.tsx
│   │   ├── http
│   │   │   ├── http.ts
│   │   │   └── request.ts
│   │   ├── process-table-column.tsx
│   │   └── RequireAuth.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

## 前端 tech stack

- **Framework**: React (v19+)
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite
- **UI Library**: Ant Design 5.x
- **Routing**: react-router 7.5
- **State Management**: Redux Toolkit

---

## mock routes

```typescript!
export const menuList = [
  {
    "icon": "DashboardOutlined",
    "label": "Dashboard",
    "description": "儀表板",
    "key": "/dashboard",
  },
  {

    "icon": "TeamOutlined",
    "label": "Tenant Management",
    "description": "客戶管理",
    "key": "/users",
    "children": [
      {
        "icon": "UnorderedListOutlined",
        "label": "Tenant List",
        "description": "客戶列表",
        "key": "/users/list",
      },
      {
        "icon": "UserAddOutlined",
        "label": "Add Tenant",
        "description": "新增客戶",
        "key": "/users/add",
      }
    ]
  },
  {
    "icon": "LaptopOutlined",
    "label": "Property Management",
    "key": "/property-management",
    "description": "物業管理",
    "children": [
      {

        "icon": "InsertRowLeftOutlined",
        "label": "Building Management",
        "description": "大樓管理",
        "key": "/property-management/building",

      },
      {
        "icon": "BankOutlined",
        "label": "Room Management",
        "description": "房間管理",
        "key": "/property-management/room",
      },
      {
        "icon": "TruckOutlined",
        "label": "Vehicle Information",
        "description": "車輛管理",
        "key": "/property-management/car",
      }
    ]
  },
  {
    "icon": "ToolOutlined",
    "label": "Repair Management",
    "key": "/repair",
    "description": "修復管理"
  },
  {
    "icon": "DollarOutlined",
    "label": "Financial Management",
    "description": "財務管理",
    "key": "/finance",
    "children": [
      {

        "icon": "ProfileOutlined",
        "label": "Contract Management",
        "description": "合約管理",
        "key": "/finance/contract",

      },
      {
        "icon": "FrownOutlined",
        "label": "Contract Detail",
        "description": "合約明細",
        "key": "/finance/contract/detail",
      },
      {
        "icon": "FileTextOutlined",
        "label": "Billing Management",
        "description": "收費管理",
        "key": "/finance/bill",
      }
    ]
  },
  {
    "icon": "TransactionOutlined",
    "label": "Leasing Hub",
    "description": "招商管理",
    "key": "/merchant-portal",
  },
  {
    "icon": "FundProjectionScreenOutlined",
    "label": "Operations Management",
    "description": "運營管理",
    "key": "/operation-center",
    "children": [
      {

        "icon": "FundViewOutlined",
        "label": "Operations Overview",
        "description": "運營概覽",
        "key": "/operation-center/analytics",

      },
      {
        "icon": "ReadOutlined",
        "label": "Article Publishing",
        "description": "文章發布",
        "key": "/operation-center/article",
      },
      {
        "icon": "CommentOutlined",
        "label": "Content Comments",
        "description": "內容評論",
        "key": "/operation-center/comments",
      }
    ]
  },
  {
    "icon": "ToolOutlined",
    "label": "Equipment Management",
    "description": "設備管理",
    "key": "/equipment",
  },
  {
    "icon": "ThunderboltOutlined",
    "label": "Energy Consumption",
    "description": "能耗管理",
    "key": "/energy",
  },
  {
    "icon": "SettingOutlined",
    "label": "Authorization Settings",
    "description": "權限管理",
    "key": "/authorization-center",
  },
  {
    "icon": "UserOutlined",
    "label": "User Profile",
    "description": "個人資訊",
    "key": "/user-profile",
  }
]
```

## 授權建立 routes

```typescript!
import { createBrowserRouter, RouterProvider } from 'react-router'
import BASE_ROUTES from './router'
import { useAppDispatch, useAppSelector } from './store'
import { getMenu } from './api/users';
import { setMenuList } from './store/login/authSlice';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { generateRoutes, type MenuNode } from './utils/generateRoutes';
import type { RouteObject } from 'react-router';
import { Spin } from 'antd';
import type { MenuItemInRow } from './types/MenuItemInRow';


function convertToMenuItem(rows: MenuItemInRow[]): MenuNode[] {
  return rows.map(row => ({
    key: row.key,
    label: row.label,
    icon: row.icon,
    children: row.children ? convertToMenuItem(row.children) : undefined
  }));
}



function App() {

  const { token } = useAppSelector(state => state.authSlice);
  const dispatch = useAppDispatch();

  const [isRoutesReady, setIsRoutesReady] = useState<boolean>(false);
  const [routeTree, setRouteTree] = useState<RouteObject[] | null>(null);

  useEffect(() => {
    const buildMenu = async () => {
      try {
        if (!token) {
          setRouteTree(BASE_ROUTES);
          setIsRoutesReady(true);
          return;
        }
        setIsRoutesReady(false);


        let menuRoutes: RouteObject[] = [];
        const res = await getMenu();

        if (res && res.length > 0) {
          dispatch(setMenuList(res));

          const menuTree = convertToMenuItem(res);

          menuRoutes = generateRoutes(menuTree);
        }

        const updatedRoutes: RouteObject[] = [...BASE_ROUTES];
        const rootIndex = updatedRoutes.findIndex(route => route.path === '/');
        if (rootIndex >= 0 && menuRoutes.length > 0) {
          updatedRoutes[rootIndex].children = menuRoutes;
          const dashboardRoute = updatedRoutes[rootIndex]
            .children
            .find(route => route.path === '/dashboard');
          if (dashboardRoute) {
            dashboardRoute.index = true;
          }
        }

        setRouteTree(updatedRoutes);
      }
      catch (error) {
        console.error('Error fetching menu:', error);
        setRouteTree(BASE_ROUTES);
      }
      finally {
        setIsRoutesReady(true);
      }
    }

    buildMenu();
  }, [token, dispatch]);


  const router = useMemo(() => {
    if (!isRoutesReady && routeTree) {
      return createBrowserRouter(routeTree);
    }
    return createBrowserRouter(BASE_ROUTES);
  }, [routeTree, isRoutesReady]);

  return isRoutesReady && router ? (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  ) : (<Spin></Spin>)
}

export default App

```

```typescript!
export interface MenuItemInRow {
  key: string;
  label: string;
  icon?: string;
  children?: MenuItemInRow[] | null;
}
```

```typescript!
import { getRoute } from '@/router/routerMap';
import type { RouteObject } from 'react-router';

export interface MenuNode {
  key: string;
  label: string;
  children?: MenuNode[];
}

/**
 * Generates a list of routes based on the provided menu items.
 * Only the leaf nodes (items without children) are added to the routes.
 *
 * @param {MenuNode[] | undefined} menuItems - The menu items to generate routes from.
 * @returns {RouteObject[]} - The generated routes.
 */
export function generateRoutes(menuItems: MenuNode[] | undefined): RouteObject[] {

  const routes: RouteObject[] = [];

  // only the leaf nodes are added to the routes
  if (menuItems && menuItems.length > 0) {
    // only the leaf nodes are added to the routes
    for (const item of menuItems) {
      const hasChildren = item.children && item.children.length > 0;

      const isLeafNode = !hasChildren;

      if (isLeafNode) {
        const node: RouteObject = {
          path: item.key,
          element: getRoute(item.key)?.element
        };

        routes.push(node);
      } else {
        routes.push(...generateRoutes(item.children));
      }
    }
  }

  return routes;
}

```

```typescript=
import type { MenuItemInRow } from '@/types/MenuItemInRow';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  menuList: MenuItemInRow[];
}

const initialState: AuthState = {
  token: sessionStorage.getItem('token') || null,
  menuList: [],
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      // save token to redux state
      state.token = action.payload;
      // save token to sessionStorage
      sessionStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      // clear token from redux state
      state.token = '';
      // clear token from sessionStorage
      sessionStorage.removeItem('token');
    },
    setMenuList: (state, action: PayloadAction<MenuItemInRow[]>) => {
      state.menuList = action.payload;
    },
  },
});

export const { setToken, clearToken, setMenuList } = authSlice.actions;
export default authSlice.reducer;

```
