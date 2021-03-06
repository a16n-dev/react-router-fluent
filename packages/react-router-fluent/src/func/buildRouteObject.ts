import { Route } from "./types";

export type Crumb = {
    text: string;
    link: string;
}

type Mapping<T extends Route> = T['path'] extends string ? () => {
    [a in T['children'][number] as a['name']]: Mapping<a>
} : (param: string) => {
    [a in T['children'][number] as a['name']]: Mapping<a>
};

const recurseRouteObject = (a: Route) => (fullpath: string, crumbs: Array<Crumb>) => {
    if(typeof a.path === 'string'){
        return () => {
            const routePath = `${fullpath}${a.path}`;
            const routeCrumbs = [...crumbs, {link: routePath, text: (a.displayName as string)}]
            return ({
            path: routePath,
            crumbs: routeCrumbs,
            ...(a.children.reduce(
                (obj, val) => ({
                    ...obj,
                    [val.name]: recurseRouteObject(val)(routePath, routeCrumbs)
                }),
            {}))
        })}
    } else {
        return (param: string) => {
            const routePath = `${fullpath}${(a.path as any)(param)}`;
            const routeCrumbs = [...crumbs, {link: routePath, text: (a.displayName as any)(param)}]
            return ({
            path: routePath,
            crumbs: routeCrumbs,
            ...(a.children.reduce(
                (obj, val) => ({
                    ...obj,
                    [val.name]: recurseRouteObject(val)(routePath, routeCrumbs)
                }),
            {}))
        }) }
    }
}

const buildRouteObject = <T extends Route>(routemap: T): Mapping<T> => {

    const converted = recurseRouteObject(routemap)('', []) as Mapping<T>
    return converted;
}

export default buildRouteObject;
