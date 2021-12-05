/* Login component */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/AuthenticatedUser';
// rubrics Login Flow
// There should be a way for the user to impersonate/ log in as an existing user. (This could be as simple as having a login box that appears at the root of the application. The user could then select a name from the list of existing users.)
// The application works correctly regardless of which user is selected.
// The application allows the user to log out and log back in. The user should be logged in to submit new polling questions, vote, and view the leaderboard.
// Once the user logs in, the home page is shown.
// Whenever the user types something in the address bar, the user is asked to log in before the requested page is shown.
function Login(props) {
    // use React.UseState to save the selected user
    const [user, setUser] = React.useState('');
    // function that interacts with the state
    const handleChange = (event) => {
        //alert(event.target.value)
        setUser(event.target.value);
        setDisabledButton(''); // Enable Submit Button

    };
    const [disabledButton, setDisabledButton] = React.useState('disabled');

    // FOr Debuggin
    //console.log("LINE33 Login.js: ",props.users);
    //alert(props.users)
    return (
        <>
            {props.users === "null" ? (
                <p>Loading....</p>
            ) : (
                <div style={{ backgroundColor: "#eee", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", textAlign: "center" }}>
                    <h2>Please Login</h2>
                    <Form>
                        <Row className="align-items-center">
                            <Col xs="auto" className="my-1">
                                <Form.Label
                                    className="me-sm-2"
                                    htmlFor="inlineFormCustomSelect"
                                    visuallyHidden
                                >
                                    Preference
                                </Form.Label>
                                <Form.Select className="me-sm-2" id="inlineFormCustomSelect" onChange={handleChange} name="user">
                                    <option value="0">Select User</option>
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
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button variant="primary" type="submit" disabled={disabledButton} onClick={() => {
                                    //alert(user)
                                    //console.log('submited');
                                    props.dispatch(setAuthedUser(user));
                                }}>
                                    Go
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            )}
        </>
    );
}
function mapStateToProps({ users }) {
    return {
        users: users,
    };
}
export default connect(mapStateToProps)(Login);
