import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Style
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import  './NavHeader.css'

function NavHeader(props) {
    // Format avatar url
    let avatarURL = props.users[props.authedUserId].avatarURL;


    return (
<>




<Navbar bg="primary" expand="lg" style={{marginBottom: "15px"}}>
  <Container>
   
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <Nav.Item><Link to="/home" className="NavLink">Dashboard</Link></Nav.Item>
    <Nav.Item><Link to="/add" className="NavLink">Create New Poll</Link></Nav.Item>
    <Nav.Item><Link to="/LeaderBoard" className="NavLink">LeaderBoard</Link></Nav.Item>


    </Nav>
    <Nav>
    <Nav.Item className="NaveItemText">{props.users[props.authedUserId].name}</Nav.Item>
    
    <Nav.Item ><Image src={avatarURL} roundedCircle className="hdravatarURL"/></Nav.Item>
    <Nav.Item className=" "><Link to="/logout" className="logoutButton NavLink btn btn-warning btn-sm">Log out</Link></Nav.Item>
    </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>




</>

    );
}
function mapStateToProps({ authedUser, users }) {
    return {
        authedUserId: authedUser.id,
        users: users,
    };
}
export default connect(mapStateToProps)(NavHeader);
