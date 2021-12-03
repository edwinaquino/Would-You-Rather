/* Login component */
import React from 'react';


import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/AuthenticatedUser';



function Login(props) {
    const classes = ""
    // use React.UseState to save the selected user
    const [user, setUser] = React.useState('');
    // function that interacts with the state
    const handleChange = (event) => {
        //alert(event.target.value)
        setUser(event.target.value);
    };
    console.log(user);
    if (props.users === null) {
        return (<div>loading... line 25 of login.js</div>);
    } else {
        return (
            
            <div className={classes.title}>
                <h1 style={{ marginBottom: '-5px' }}>Please select user to login</h1>
                <form id="FormControl" className={classes.formControl}>
                    <label id="InputLabel"
                        id="demo-simple-select-label"
                        style={{ color: 'white' }}
                    >
                        User
                    </label>
                    <select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        onChange={handleChange}
                        className={classes.select}
                        color="primary"
                    >
                        {Object.keys(props.users).map((u) => {
                            return (
                                <option id="MenuItem"
                                    key={props.users[u].id}
                                    classes={classes.item}
                                    value={props.users[u].id}
                                >
                                    {props.users[u].name}
                                </option>
                            );
                        })}
                    </select>
                </form>
                <button
                    onClick={() => {
                         alert(user)
                        //console.log('submited');
                        props.dispatch(setAuthedUser(user));
                    }}
                    className={classes.submit}
                    variant="contained"
                    color="primary"
                >
                    Submit
                </button>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        users: users,
    };
}

export default connect(mapStateToProps)(Login);
