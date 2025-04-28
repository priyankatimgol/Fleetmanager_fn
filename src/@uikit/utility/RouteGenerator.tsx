// import React from 'react';
import type { RouteObject } from "react-router-dom";

/**
 * @param {Object} structure - The passed object that defines the routes.
 * @param {boolean} structure.isAuthenticated - [Required] in order to differentiate between LoggedIn/Loggedout users
 * @param {string} structure.userRole - [Optional] in order to differentiate between admin and normal users
 * @param {object} [structure.anonymousStructure] - it's an object that has only [ routes ] array, [ these routes available for All personas ]
 * @param {object} [structure.authorizedStructure] - it's an object that has [ fallbackPath: {string}, routes: {array} ], fallbackPath: is used for redirect when a logged [in] user tried to access unAuthorized route, routes: only The Logged [in] Routes Available
 * @param {object} [structure.unAuthorizedStructure] - it's an object that has [ fallbackPath: {string}, routes: {array} ], fallbackPath: is used for redirect when a logged [out] user tried to access route that requires [Authorization] , routes: only The Logged [out] Routes Available
 * @param {component} [structure.component fallbackComponent] - in order to redirect in all cases if the route doesn't match.
 * @param {unAuthorizedComponent} [structure.unAuthorizedComponent] - in order to show not permitted route.
 * @returns {Array}
 */

const generateRoutes = (structure: any) => {
  const {
    isAuthenticated = false,
    anonymousStructure = {},
    authorizedStructure = {},
  } = structure || {};

  const dynamicRoutes: RouteObject[] = [];

  if (anonymousStructure) {
    dynamicRoutes.push(
      ...routesGenerator(isAuthenticated, anonymousStructure, "anonymous")
    );
  }

  if (authorizedStructure) {
    dynamicRoutes.push(
      ...routesGenerator(
        isAuthenticated,
        authorizedStructure,
        "authorized"
      )
    );
  }
  return dynamicRoutes;
};

/**
 * path: string
 * component: React.Component
 * routeProps: Object -----> To override route props
 * userRole: string -----> To override route props
 * redirectPath: String ----> To redirect to specific location
 * showRouteIf: to override when to show the component or when to [ Navigate ]
 */
const routesGenerator = (
  isAuthenticated: boolean = false,
  routeSet: any = {},
  type: string = "anonymous",
): any => {
  const generatedRoutes: any[] = [];

  const isAnonymous = type === "anonymous";
  const isAuthorized = type === "authorized";

  if (routeSet?.routes) {
    const routes = routeSet.routes;
    if (Array.isArray(routes) && routes.length > 0) {
      routes.forEach((route) => {
        const { path = "" } = route || {};
        if (isAnonymous) {
          return generatedRoutes.push(route);
        }
        if (isAuthorized) {
          generatedRoutes.push({
            element: route.element,
            path: path,
            permittedRole: route.permittedRole,
          });
        }
      });
    }
  }
  return generatedRoutes;
};

export default generateRoutes;
