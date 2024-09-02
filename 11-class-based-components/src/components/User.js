import { Component } from 'react';

import classes from './User.module.css';

class User extends Component {
  componentWillUnmount() {
    console.log("User will unmount will be called when component is removed from screen.")
  }
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
};

// const User = (props) => {
//   return <li className={classes.user}>{this.props.name}</li>;
// };

export default User;
