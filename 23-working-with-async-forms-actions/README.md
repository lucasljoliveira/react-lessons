## Section 18 - Handling Forms via Form Actions - Project 2

We can use 'use' hook from react the same way we use useContext, but only if we are in the react version 19 or above.
The action function can be both sync or async.
useFormStatus is used to get the status of the submittion, the same way as the param 'pending' returned from useActionState, but we can't use it on the same component, just in a children component.
useOptimistic can be used to update values in the screen before something is being made by the backend, like an update.
