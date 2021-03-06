import { Route } from "./types";

const recurseRouterArray = (r: Route, cb: (path: string, component: any) => void, path: string, queryParamCount = 0) => {
    let newPath: string;
    let newQueryParamCount = queryParamCount;
    if(typeof r.path === 'string'){
        newPath = `${path}${r.path}`
    } else {
      newPath = `${path}${r.path(`:p${queryParamCount}`)}`
      newQueryParamCount+=1;
    }
    cb(newPath, r.Component);
    r.children.forEach(r => recurseRouterArray(r, cb, newPath, newQueryParamCount));
}

const buildRouterArray = <T extends Route>(routemap: T) => {

    const routeArray = [];
    const callback = (path: string, component: any) => routeArray.push({
        path,
        component
    });

    recurseRouterArray(routemap, callback, '');

    return routeArray
}

export default buildRouterArray;