import { DeepRoute } from "./types";
import {Route} from 'react-router-dom';

const recurseRouterArray = (r: DeepRoute, cb: (path: string, component: any) => void, path: string, queryParamCount = 0) => {
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

const buildRouterArray = <T extends DeepRoute>(routemap: T) => {

    const routeArray: Array<React.ReactElement> = [];
    const callback = (path: string, component: any) => routeArray.push(<Route component={component} path={path} exact/>);

    recurseRouterArray(routemap, callback, '');

    return routeArray
}

export default buildRouterArray;