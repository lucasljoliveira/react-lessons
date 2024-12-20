## Section 28 - Animating React Apps - Css Animation

* motion from framer-motion component has most html components, and we can use them to animate anything we want.
* once we use the motion, we can set animate param to animate whatever we want on the component.
* we can also use intial as param to set a initial value to a component that doesn't have, like a modal.
* we can also use exit to set an animation when the modal is closed, but if the component disappear from the html we must use AnimatePresence to make sure that before it desapear the animation is played.
* the param variants can hold animation objects to be used in other params.
* child components henriet the same variants of their parents, so if initial is defined to "hidden" in the parent, the child will also be set to this value, and the value of the variant can be changed, like done in NewChallenge.jsx 'li' component.
    - But in this case the exit was also set, and because of that the modal was taking a little longer to close because it is being animated, to not do the animation the value of exit or any other param can be set to the actual value, like the ending value "visible".
* We can use the para staggerChildren to add delay to animation in children components. It is set inside the transition param in a parent component.
* a list can be given to a 'scale' param for example to change the scale more than one time, like if the initial scale is 0.5, we can set the final to [0.8, 1.3, 1] and it will be applied.
* useAnimate can be use to trigger animation imperatively on the code, it returns a scope, that is the same thing as refs, and this ref must be placed on the parent component that the animation will play, and also receives a function called animate, this function is called in the code to trigger the animation and receives three params, the first is a string with the target elements or css classes that should be triggered, the second is the object that defines the animation, the same object used in animate, exit, initial params of motion, and the third is an object like the transition param, where we can set how the animation will be played.
* the function stagger from framer-motion does the same as the param staggerChildren, it's a config to set how children elements are played.
* We can use AnimatePresence with multiple elements and control how it works with for example the mode param.
* the layout param helps with animating a list of elements when they are added or removed from the list, with sliding movement.
* if there's a element that is added to an element that that as the layout it might be shown wrong, or in a strange way, to fix that we have to add animation to the non-animated element, this way the layout animation is overwrited.
* set the key prop in an element can be set to reset its value and trigger the animation again like in the badge element in this project.
* we can use useScroll to take values from the scroll and use useTransform to transform it into values that style params uses, like opacity or y/x positions, and we use the style property instead of the animation property on the element because the animation plays effects when something changes on the html, but style play effects when some variable changes, like the scrollY from useScroll.
