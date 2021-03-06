import { Crumb } from "./buildRouteObject";

export const resolvePath = (route: any): string => route.path;

export const resolveCrumbs = (route: any): Array<Crumb> => route.crumbs