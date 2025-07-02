// src/constants/permissions.ts

export const PERMISSIONS = {
  DASHBOARD_READ: 'dashboard.read',
  USERS_LIST_READ: 'users.list.read',
  USERS_ADD_READ: 'users.add.read',
  PROPERTY_BUILDING_READ: 'property.management.building.read',
  PROPERTY_ROOM_READ: 'property.management.room.read',
  PROPERTY_CAR_READ: 'property.management.car.read',
  REPAIR_READ: 'repair.read',
  FINANCE_CONTRACT_READ: 'finance.contract.read',
  FINANCE_CONTRACT_DETAIL_READ: 'finance.contract.detail.read',
  FINANCE_BILL_READ: 'finance.bill.read',
  MERCHANT_PORTAL_READ: 'merchant.portal.read',
  OPERATION_ANALYTICS_READ: 'operation.center.analytics.read',
  OPERATION_ARTICLE_READ: 'operation.center.article.read',
  OPERATION_COMMENTS_READ: 'operation.center.comments.read',
  EQUIPMENT_READ: 'equipment.read',
  ENERGY_READ: 'energy.read',
  AUTHORIZATION_CENTER_READ: 'authorization.center.read',
  USER_PROFILE_READ: 'user.profile.read',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// 權限到路由資訊的對照表
export interface RouteInfo {
  path: string;
  label: string;
  description: string;
  icon?: string;
  parentPath?: string; // 用於巢狀選單
}

export const PERMISSION_ROUTE_MAP: Record<Permission, RouteInfo> = {
  [PERMISSIONS.DASHBOARD_READ]: {
    path: '/dashboard',
    label: 'Dashboard',
    description: '儀表板',
    icon: 'DashboardOutlined'
  },
  [PERMISSIONS.USERS_LIST_READ]: {
    path: '/users/list',
    label: 'Tenant List',
    description: '客戶列表',
    icon: 'UnorderedListOutlined',
    parentPath: '/users'
  },
  [PERMISSIONS.USERS_ADD_READ]: {
    path: '/users/add',
    label: 'Add Tenant',
    description: '新增客戶',
    icon: 'UserAddOutlined',
    parentPath: '/users'
  },
  [PERMISSIONS.PROPERTY_BUILDING_READ]: {
    path: '/property-management/building',
    label: 'Building Management',
    description: '大樓管理',
    icon: 'InsertRowLeftOutlined',
    parentPath: '/property-management'
  },
  [PERMISSIONS.PROPERTY_ROOM_READ]: {
    path: '/property-management/room',
    label: 'Room Management',
    description: '房間管理',
    icon: 'BankOutlined',
    parentPath: '/property-management'
  },
  [PERMISSIONS.PROPERTY_CAR_READ]: {
    path: '/property-management/car',
    label: 'Vehicle Information',
    description: '車輛管理',
    icon: 'TruckOutlined',
    parentPath: '/property-management'
  },
  [PERMISSIONS.REPAIR_READ]: {
    path: '/repair',
    label: 'Repair Management',
    description: '修復管理',
    icon: 'ToolOutlined'
  },
  [PERMISSIONS.FINANCE_CONTRACT_READ]: {
    path: '/finance/contract',
    label: 'Contract Management',
    description: '合約管理',
    icon: 'ProfileOutlined',
    parentPath: '/finance'
  },
  [PERMISSIONS.FINANCE_CONTRACT_DETAIL_READ]: {
    path: '/finance/contract/detail',
    label: 'Contract Detail',
    description: '合約明細',
    icon: 'FrownOutlined',
    parentPath: '/finance'
  },
  [PERMISSIONS.FINANCE_BILL_READ]: {
    path: '/finance/bill',
    label: 'Billing Management',
    description: '收費管理',
    icon: 'FileTextOutlined',
    parentPath: '/finance'
  },
  [PERMISSIONS.MERCHANT_PORTAL_READ]: {
    path: '/merchant-portal',
    label: 'Leasing Hub',
    description: '招商管理',
    icon: 'TransactionOutlined'
  },
  [PERMISSIONS.OPERATION_ANALYTICS_READ]: {
    path: '/operation-center/analytics',
    label: 'Operations Overview',
    description: '運營概覽',
    icon: 'FundViewOutlined',
    parentPath: '/operation-center'
  },
  [PERMISSIONS.OPERATION_ARTICLE_READ]: {
    path: '/operation-center/article',
    label: 'Article Publishing',
    description: '文章發布',
    icon: 'ReadOutlined',
    parentPath: '/operation-center'
  },
  [PERMISSIONS.OPERATION_COMMENTS_READ]: {
    path: '/operation-center/comments',
    label: 'Content Comments',
    description: '內容評論',
    icon: 'CommentOutlined',
    parentPath: '/operation-center'
  },
  [PERMISSIONS.EQUIPMENT_READ]: {
    path: '/equipment',
    label: 'Equipment Management',
    description: '設備管理',
    icon: 'ToolOutlined'
  },
  [PERMISSIONS.ENERGY_READ]: {
    path: '/energy',
    label: 'Energy Consumption',
    description: '能耗管理',
    icon: 'ThunderboltOutlined'
  },
  [PERMISSIONS.AUTHORIZATION_CENTER_READ]: {
    path: '/authorization-center',
    label: 'Authorization Settings',
    description: '權限管理',
    icon: 'SettingOutlined'
  },
  [PERMISSIONS.USER_PROFILE_READ]: {
    path: '/user-profile',
    label: 'User Profile',
    description: '個人資訊',
    icon: 'UserOutlined'
  }
};

// 父級選單資訊
export const PARENT_MENU_INFO: Record<string, { label: string; description: string; icon: string }> = {
  '/users': {
    label: 'Tenant Management',
    description: '客戶管理',
    icon: 'TeamOutlined'
  },
  '/property-management': {
    label: 'Property Management',
    description: '物業管理',
    icon: 'LaptopOutlined'
  },
  '/finance': {
    label: 'Financial Management',
    description: '財務管理',
    icon: 'DollarOutlined'
  },
  '/operation-center': {
    label: 'Operations Management',
    description: '運營管理',
    icon: 'FundProjectionScreenOutlined'
  }
};
