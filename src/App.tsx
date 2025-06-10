import { createBrowserRouter, RouterProvider } from 'react-router'
import BASE_ROUTES from './router'
import { useAppDispatch, useAppSelector } from './store'
import { getMenu, type MenuItemInRow } from './api/users';
import { setMenuList } from './store/login/authSlice';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { generateRoutes, type MenuNode } from './utils/generateRoutes';
import type { RouteObject } from 'react-router';
import { Spin } from 'antd';


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
