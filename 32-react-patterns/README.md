## Section 29 - React Patterns & Best Practices

* Compound components can be use to wrap components to be use together, like the Accordion/AccordionItem components in this project.
* Render props is a way to render a children element that come as a function, passing props to it and this function must return something renderable, like a component.
    - This way when you put an component that receive children, now this children must be a function.
* To render dynamic key to list elements we can pass a function as props to a component and there use this function to get the key prop.
* Debouncing is a way to not make something change (like a interface) in every iteraction of something (like a key stroke), so by debouncing a key stroke we'll wait until the user finishes typping and once he stop we perform the action and update the interface.
    - In order to do that we gotta use a timer and clear it whenever the user types something before some interval, always setting a new timer with a new interval to be waited.
    - This bouncing helps with search filters that make http request, once it's too consuming make http requests in every key stroke we wait a few miliseconds to perform it.
