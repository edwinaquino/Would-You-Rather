import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';


import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import  './NavHeader.css'

// nav bar
function NavHeader(props) {
    let avatarImg = props.users[props.authedUserId].avatarURL;
    const classes = ""
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
<div>




<Navbar bg="primary" expand="lg" style={{marginBottom: "15px"}}>
  <Container>
   
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <Nav.Item><Link to="/home" className="NavLink">Dashboard</Link></Nav.Item>
    <Nav.Item><Link to="/add" className="NavLink">Create Question</Link></Nav.Item>
    <Nav.Item><Link to="/LeaderBoard" className="NavLink">LeaderBoard</Link></Nav.Item>


    </Nav>
    <Nav>
    <Nav.Item className="NaveItemText">{props.users[props.authedUserId].name}</Nav.Item>
    
    <Nav.Item ><Image src={avatarImg} roundedCircle className="hdrAvatarImg"/></Nav.Item>
    <Nav.Item className=" "><Link to="/logout" className="logoutButton NavLink btn btn-warning btn-sm">Log out</Link></Nav.Item>
    </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>




</div>

    );
}
function mapStateToProps({ authedUser, users }) {
    return {
        authedUserId: authedUser.id,
        users: users,
    };
}
export default connect(mapStateToProps)(NavHeader);
