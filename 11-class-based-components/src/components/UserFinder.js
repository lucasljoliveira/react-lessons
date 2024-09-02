import { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

// const DUMMY_USERS = [
//   { id: 'u1', name: 'Max' },
//   { id: 'u2', name: 'Manuel' },
//   { id: 'u3', name: 'Julie' },
// ];

class UserFinder extends Component {
  // We can have just only Context per class.
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
        filteredUsers: [],
        searchTerm: ''
    }
  }

  componentDidMount() {
    console.log("This could be used to search for the users for the first time, like fetching data from db and them updating the state.")
    this.setState({
        filteredUsers: this.context.users
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("This could be used the same way as useEffect with conditional variables, bellow we check if the searchTerm changed and only update if positive.")
    console.log("The if statement is used to prevent an infinite loop, because without it the componentDidUpdate will be called all the time by the this.setState.")
    if (prevState.searchTerm !== this.state.searchTerm) {
        this.setState({
            filteredUsers: this.context.users.filter((user) => user.name.includes(this.state.searchTerm))
        });
    };
  }

  searchChangeHandler(event) {
    this.setState({searchTerm: event.target.value});
  };

  render() {
    return (
        <Fragment>
            <div className={classes.finder}>
                <input type='search' onChange={this.searchChangeHandler.bind(this)} />
            </div>
            <ErrorBoundary>
                <Users users={this.state.filteredUsers} />
            </ErrorBoundary>
        </Fragment>
    ); 
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;