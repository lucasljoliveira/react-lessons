## Section 32 - React + Typescript

* Base types: number(1), string('1'), boolean(true), array([1,2,3]), object({a: 'abc'})
* type union a: number | string
* type inference tells which type the variable is by it`s first value
* With type aliases you can define your own type. e.g.: type Person = {name: string}
* Void type showed by functions are functions that doesn't return anything, so we can expect undefined or null
* Generics are a way to infer in functions which value they return, so using 'function A<T>(a: T[], b: T): return [...a, b]' passing a as [1, 2, 3] and b as 4 typescript will infer that the value returned is a list of numbers because the return is a list and all the its values are numbers.

* Components Functions can be typed merging React.FC (FC=Functional Component) with <{ items: string[] }> to merge default props from Components functions and our on props.
* We can use type, interface or class to create a model for an object, on classes we create an object that must be instantiated, and because of that we need to add a constructor function.
* We can use default interfaces to set types to useRef, like useRef<HTMLInputElement>(null), and every component has a interface, these values need to be defined to specify types to ref in objects, like input, paragraph and so on.
* ? is used before access object parameters to make sure that if the parameter is not defined null will be used then.
* ! is used before access object parameters to garantee that the parameter will never be null.
* We can use function.bind(null, 'any param') to preconfigure parameters to a function that is passed to another component.
