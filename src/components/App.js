/* App component */
import React, { Component } from 'react';
import { getInitialData } from '../actions';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import LogOut from './Logout';
import { NotFound } from './404';

import NavHeader from './NavHeader';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
  state = {};
  componentDidMount() {
    console.log('componentDidMount()');
    this.props.dispatch(getInitialData());
  }
  render() {
    console.clear();
    console.log('LINE 25 App.js User is logged in?', this.props);

    return (

      <div>


        {/* if there is no authed user, show login page */}
        {this.props.userIn === true ? (
          <Route path="/" component={Login}></Route>
        ) : (
          <React.Fragment>
            {/* how navbar in every page except 404 and login */}
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
                      component={NewQuestion}
                    ></Route>
                    <Route
                      exact
                      path="/question/:id"
                      component={QuestionPage}
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
                    {/* 404 */}
                    <Redirect exact from="/" to="/home" />
                    <Route component={NotFound} />
                  </Switch>

                </Col>
              </Row>
            </Container>
          </React.Fragment>
        )}
      </div>
    );
  }
}
// checking if ther is an authedUser
function mapStateToProps({ authedUser }) {
  return {
    userIn: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
