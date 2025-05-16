import { getRoute } from '@/router/routerMap';
import type { RouteObject } from 'react-router';

interface MenuItem {
  key: string;
  icon: string;
  label: string;
  children?: MenuItem[];
}

/**
 * Generates a list of routes based on the provided menu items.
 * Only the leaf nodes (items without children) are added to the routes.
 *
 * @param {MenuItem[] | undefined} menuItems - The menu items to generate routes from.
 * @returns {RouteObject[]} - The generated routes.
 */
export function generateRoutes(menuItems: MenuItem[] | undefined): RouteObject[] {
  // if (!menuItems) {
  //   return [];
  // }

  // return menuItems.map(item => {
  //   const hasChildren = item.children && item.children.length > 0;

  //   const node: RouteObject = {
  //     path: item.key,
  //     element: getRoute(item.key)?.element ?? null,
  //   };

  //   if (hasChildren) {
  //     node.children = generateRoutes(item.children);
  //   }

  //   return node;
  // });


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
