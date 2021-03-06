![npm](https://img.shields.io/npm/v/react-router-fluent)
# React-Router-Fluent

An experimental fluent-style routing tool built on top of `react-router` and intended for use in typescript projects.

```tsx

//Before
history.push('/users/32/details/edit')


//After
redirect(root().users().byId('32').details().edit())

```


## Quick Start

With yarn
```shell
> yarn add react-router-fluent react-router react-router-dom
```
With npm
```shell
> npm install react-router-fluent react-router react-router-dom
```

```tsx
import React from 'react'
import {buildRouteObject, buildRouterArray} from 'react-router-fluent'


const LazyDashboard = React.Lazy(() => import('../dashboard'))

const rootDefinition = {
    name: 'root',
    path: '/',
    component: LazyDashboard
    displayName: 'Dashboard',
    children: [
        ...
    ]
} as const;

export const root = buildRouteObject(rootDefinition)

export const RootRoutes = buildRouterArray(rootDefinition)

```
> *Important*: To get useful typing, Routes should be declared constants using the typescript const assertion syntax:
> ```tsx
> const rootDefinition = {...} as const
> ```
> 

## Features 

### Small bundle size
Only 479b!
### Typescript support
Declaring the route tree as a constant allows typescript to give intelligent suggestions

### Built-in breadcrumb support
The nested route tree makes it easy to generate breadcrumbs for any page
```ts
import {resolveCrumbs} from 'react-router-fluent'
import root from './routeDefinition'

const crumbs = resolveCrumbs(root().users().details())

/**
 * crumbs = [
 *   {link: '/',              name: 'Dashboard'},
 *   {link: '/users',         name: 'Users'},
 *   {link: '/users/details', name: 'Details'},
 * ]
```

## License

MIT Licensed. Copyright (c) Alexander Nicholson 2021.
