## Section 26 - A (Pretty Deep Dive) Introduction to Next.js - Food App


1. Routes using file system and dynamic routes.
2. How to use reserved files error.js, loading.js, not-found.js, layout.js to manage specific things inside next code.
3. All pages are standard react components, but they are server components, that are executed on the server and rendered on the client.
4. To use client componentes we have to add 'use client'.
5. useState, useRef and many other hooks must be executed on the client side, so in order to use them use must use 'use client'.
6. We can take advantage of server componentes to fetch data on them.
7. We can use server actions, that are async functions on separated files or with 'use server' inside the function to take advantage of server actions and use them on args like onAction from forms.
8. We can use useFormStatus to get the status of the form, but it must be used inside the form.
9. Next has a pretty aggressive caching, so we must revalidate the cache using revalidatePath every time we change any data to make sure that the screen will be updated.
10. We must test the app after building it because things might not work in the same way as in development.
11. We can use static metadata exporting it on the page and also dynamic metadata exporting an async function called generateMetadata, that receives the same args as the main function.
