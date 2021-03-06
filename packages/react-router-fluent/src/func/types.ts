export interface BasicRoute {
    readonly Component: any;
    readonly name: string;
    readonly children: readonly DeepRoute[]
}

export interface SimpleRoute extends BasicRoute {
    readonly displayName: string;
    readonly path: string;
}

export interface QueryRoute extends BasicRoute {
    readonly displayName: ((param: string) => string);
    readonly path: ((param: string) => string);
}

export type DeepRoute = SimpleRoute | QueryRoute