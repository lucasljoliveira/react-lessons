## Section 27 - React Server Componentes (RSC) & Server Actions - A Closer Look

RSC
* never executes on the client side.
* can be pre-render on server side.
* next.js all components are rendered on the server side by default.
* Advantages:
    - Less code to download on the client side, better performance.
    - Can fetch/submit data & can use async / await.
    - Component is rendered on the server and the html is sent to the client.
    - Project/build must be configured to support RSC.
* RCS Components can directly include client-components, but client-components can't directly include RSC, only as children.
    - If a RSC-component is included on client-components it will be transformed into client-component, unless if it become async, that make sure that the function RSC
* 'user server' can be added inside a function to transform it to server-side function.
    - 'user server' can only be used in functions of files that 'use client' are not defined.
* use() hook can be used for getting access to Context, but it also can be used to await promisses in client-components, but only special promises that integrates with React's Suspense feature, like we did on UsePromisesDemo.js
* We can use ErrorBoundary + Suspense + use hook together to manage data fetching with error, loading and fetching handled.
