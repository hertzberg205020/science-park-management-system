import { createBrowserRouter, RouterProvider } from 'react-router'
import BASE_ROUTES from './router'
import { useAppDispatch, useAppSelector } from './store'
import { getMenu, type MenuItemInRow } from './api/users';
import { setMenuList } from './store/login/authSlice';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { generateRoutes, type MenuNode } from './utils/generateRoutes';
import type { RouteObject } from 'react-router';


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
  const [routeTree, setRouteTree] = useState<RouteObject[]>([...BASE_ROUTES]);

  useEffect(() => {
    const buildMenu = async () => {
      try {
        const baseRoutes = [...BASE_ROUTES]
        // const rootRoute = baseRoutes.find(route => route.path === '/');
        let menuRoutes: RouteObject[] = [];
        const res = await getMenu();
        console.log('res', res);

        if (res && res.length > 0) {
          dispatch(setMenuList(res));

          const menuTree = convertToMenuItem(res);

          menuRoutes = generateRoutes(menuTree);
        }

        const updatedRoutes: RouteObject[] = [...baseRoutes];
        const rootIndex = updatedRoutes.findIndex(route => route.path === '/');
        if (rootIndex >= 0 && menuRoutes.length > 0) {
          updatedRoutes[rootIndex].children = menuRoutes;
        }


        setRouteTree(updatedRoutes);
      }
      catch (error) {
        console.error('Error fetching menu:', error);
      }
    }

    buildMenu();
  }, [token, dispatch]);

  // 只在 routeTree 變動時重新建立 router 實例
  const router = useMemo(() => createBrowserRouter(routeTree), [routeTree]);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
