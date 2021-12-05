// Would you Rather... App
import React, { Component } from 'react';
import { getInitialData } from '../actions';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Components for App
import Dashboard from './Dashboard';
import AddQuestion from './AddQuestion';
import Question from './Question';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import LogOut from './Logout';
import { NotFound } from './NotFound';
import NavHeader from './NavHeader';

// Import Style
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Start Main Class
class App extends Component {
  state = {};
  // Check App Component Mounts properly before dispatching
  componentDidMount() {
    //console.log('componentDidMount()');
    this.props.dispatch(getInitialData());
  }
  render() {
    // For Debuging
    console.clear();
   // console.log('LINE 25 App.js User is logged in?', this.props);

    return (

      <div>

        {this.props.userIn === true ? (
          <Route path="/" component={Login}></Route>
        ) : (
          <>

            <Route
              path={[
                '/home',
                '/add',
                '/question',
                '/leaderboard',
              ]}
              component={NavHeader}
            />

            <Container>
              <Row>
                <Col>
                  <Switch>
                    <Route
                      exact
                      path="/home"
                      component={Dashboard}
                    ></Route>
                    <Route
                      exact
                      path="/add"
                      component={AddQuestion}
                    ></Route>
                    <Route
                      exact
                      path="/question/:id"
                      component={Question}
                    ></Route>
                    <Route
                      exact
                      path="/leaderboard"
                      component={LeaderBoard}
                    ></Route>

                    <Route
                      exact
                      path="/logout"
                      component={LogOut}
                    ></Route>
                    {/* Question not found show error page */}
                    <Redirect exact from="/" to="/home" />
                    <Route component={NotFound} />
                  </Switch>

                </Col>
              </Row>
            </Container>
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    userIn: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
