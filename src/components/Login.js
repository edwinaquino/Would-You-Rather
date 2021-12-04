/* Login component */
import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/AuthenticatedUser';

import './Login.css'

// rubrics Login Flow
// There should be a way for the user to impersonate/ log in as an existing user. (This could be as simple as having a login box that appears at the root of the application. The user could then select a name from the list of existing users.)
// The application works correctly regardless of which user is selected.
// The application allows the user to log out and log back in. The user should be logged in to submit new polling questions, vote, and view the leaderboard.
// Once the user logs in, the home page is shown.
// Whenever the user types something in the address bar, the user is asked to log in before the requested page is shown.



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


            <div >
     
                <Form className="center-screen">
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>Please Select User:</Form.Label>

                        <Form.Select aria-label="Default select example" onChange={handleChange}>
                            return(<option value="" selected>Select User</option>)
                            {Object.keys(props.users).map((u) => {
                                return (
                                    <option id="MenuItem"
                                        key={props.users[u].id}
                                        value={props.users[u].id}
                                    >
                                        {props.users[u].name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => {
                            //alert(user)
                            //console.log('submited');
                            props.dispatch(setAuthedUser(user));
                        }}>
                        Submit
                    </Button>
                    
                </Form>
   

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
