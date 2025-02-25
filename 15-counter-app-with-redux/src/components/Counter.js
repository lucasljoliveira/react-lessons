import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter';


const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);

  const toggleCounterHandler = () => {
    // dispatch({type: "toggle"})
    dispatch(counterActions.toggleCounter());
  };
  
  function increaseHandler(data) {
    // dispatch({type: "increase", amount: 5});
    dispatch(counterActions.increase(data));
  };
  
  function incrementHandler() {
    // dispatch({type: "increment"});
    dispatch(counterActions.increment());
  };
  
  function decrementHandler() {
    // dispatch({type: "decrement"});
    dispatch(counterActions.decrement());
  };
  
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={() => increaseHandler(5)}>Increase by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;


// import { Component } from 'react';
// import { connect } from 'react-redux';

// class CounterClass extends Component {
  //   incrementHandler () {
//     this.props.increment();
//   }
//   decrementHandler () {
//     this.props.decrement();
//   }
//   toggleCounterHandler () {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Class Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     )
//   };
// }

// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({type: "increment"}),
//     decrement: () => dispatch({type: "decrement"}),
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CounterClass);
