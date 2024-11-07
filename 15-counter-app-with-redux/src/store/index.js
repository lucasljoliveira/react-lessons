import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import authReducer from './auth';


const store = configureStore({
    reducer: {counter: counterReducer, auth: authReducer} // we can asign an object to reducer key with any key value and as value the reducers to use many differents reducers.
    // reducer: counterSlice.reducer
});

export default store;

// import { createStore } from 'redux';

// const counterReducer = (state = initialState, action) => {
//     if (action.type === "increase"){
//         return {
//             //...state,  this can return an object and we can mutate it's value later, so it's better to not do this in most situations.
//             counter: state.counter + action.amount,
//             showCounter: state.showCounter
//         };
//     }
//     if (action.type === "increment"){
//         return {
//             counter: state.counter + 1,
//             showCounter: state.showCounter
//         };
//     }
//     if (action.type === "decrement"){
//         return {
//             counter: state.counter - 1,
//             showCounter: state.showCounter
//         };
//     }
//     if (action.type === "toggle"){
//         return {
//             showCounter: !state.showCounter,
//             counter: state.counter
//         };
//     }

//     return state;
// };

// const store = createStore(counterReducer);

// export default store;
