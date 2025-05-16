// routerMap.tsx
import React, { lazy } from 'react';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

// 用 React.lazy 動態載入各頁面
const Dashboard = lazy(() => import('@/pages/dashboard'));
const UsersList = lazy(() => import('@/pages/users'));
const AddUser = lazy(() => import('@/pages/users/add-user'));
const BuildingManagement = lazy(() => import('@/pages/property-management/tenement'));
const RoomManagement = lazy(() => import('@/pages/property-management/room'));
const VehicleManagement = lazy(() => import('@/pages/property-management/vehicle'));
const RepairManagement = lazy(() => import('@/pages/repair'));
const ContractManagement = lazy(() => import('@/pages/finance/contract'));
const ContractDetail = lazy(() => import('@/pages/finance/contract-detail'));
const BillingManagement = lazy(() => import('@/pages/finance/bill-center'));
const MerchantPortal = lazy(() => import('@/pages/leasing-hub/merchant-portal'));
const OperationsAnalytics = lazy(() => import('@/pages/operation-center/analytics'));
const ArticlePublishing = lazy(() => import('@/pages/operation-center/article'));
const ContentComments = lazy(() => import('@/pages/operation-center/comments'));
const EquipmentManagement = lazy(() => import('@/pages/equipment'));
const EnergyConsumption = lazy(() => import('@/pages/energy'));
const AuthorizationSettings = lazy(() => import('@/pages/authorization-center'));
const UserProfile = lazy(() => import('@/pages/user-profile'));

const routerMap: Record<string, RouteConfig> = {
  '/dashboard': {
    path: '/dashboard',
    element: <Dashboard />
  },
  '/users/list': {
    path: '/users/list',
    element: <UsersList />
  },
  '/users/add': {
    path: '/users/add',
    element: <AddUser />
  },
  '/property-management/building': {
    path: '/property-management/building',
    element: <BuildingManagement />
  },
  '/property-management/room': {
    path: '/property-management/room',
    element: <RoomManagement />
  },
  '/property-management/car': {
    path: '/property-management/car',
    element: <VehicleManagement />
  },
  '/repair': {
    path: '/repair',
    element: <RepairManagement />
  },
  '/finance/contract': {
    path: '/finance/contract',
    element: <ContractManagement />
  },
  '/finance/contract/detail': {
    path: '/finance/contract/detail',
    element: <ContractDetail />
  },
  '/finance/bill': {
    path: '/finance/bill',
    element: <BillingManagement />
  },
  '/merchant-portal': {
    path: '/merchant-portal',
    element: <MerchantPortal />
  },
  '/operation-center/analytics': {
    path: '/operation-center/analytics',
    element: <OperationsAnalytics />
  },
  '/operation-center/article': {
    path: '/operation-center/article',
    element: <ArticlePublishing />
  },
  '/operation-center/comments': {
    path: '/operation-center/comments',
    element: <ContentComments />
  },
  '/equipment': {
    path: '/equipment',
    element: <EquipmentManagement />
  },
  '/energy': {
    path: '/energy',
    element: <EnergyConsumption />
  },
  '/authorization-center': {
    path: '/authorization-center',
    element: <AuthorizationSettings />
  },
  '/user-profile': {
    path: '/user-profile',
    element: <UserProfile />
  }
};

export const getRoute = (path: string): RouteConfig | undefined => {
  return routerMap[path];
};
