import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUserToNull } from '../actions/AuthenticatedUser';
class Logout extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setAuthedUserToNull(null));
    }
    render() {
        // Take user to home page after successful logout to login prompt
        return <Redirect to="/" />;
    }
}

export default connect(null)(Logout);
