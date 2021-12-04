/* Home page */
// importing libraries
import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';


import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addDefaultLocale(en);

const formatDate = (timestamp) => {
  const timeAgo = new TimeAgo('en-US');
  const date = new Date(timestamp);

  return timeAgo.format(date);
};

// function that recives classes name avatarImg id and timestamp
// and returns the html for a "Card"
function UserCard(classes, name, avatarImg, id, timestamp, optionOne = "", optionTwo = "", mode) {
    //alert(mode);
    console.log("Dashboard.js LINE 22", optionOne);
    let url = '/question/:id' + id;

  

    return (
        <>
        

            <Col>
                <Card key={id} style={{ textAlign: "center" }} >
                    <Card.Header style={{ textAlign: "right" }}>      <small className="text-muted">
                        {formatDate(timestamp)}</small></Card.Header>
                    <Image style={{ width: "200px", margin: "0 auto", padding: "10px" }} variant="top" src={avatarImg} roundedCircle />
                    <Card.Body>
                    <h3>{name}</h3>
                        <Card.Title style={{ fontStyle: "italic" }}>Would you Rather...</Card.Title>
                        <Card.Text>
                            

                            <p>{optionOne.text}</p>
                            <p>or</p>
                            <p>{optionTwo.text}?</p>
                            <Link to={url} className="logoutButton NavLink btn btn-primary">{mode==="answered" ? "View Results " : "Give Answer"}</Link>
                        </Card.Text>
                    </Card.Body>

                </Card>
            </Col>




        </>
    );
}

function Dashboard(props) {
    // used react.useState to toggle between answered and Unanswered questions
    const [mode, setMode] = React.useState('Unanswered');
    // functions that change the mode of the react.useState
    const changeToUnanswered = () => {
        setMode('Unanswered');
    };
    const changeToAnswered = () => {
        setMode('answered');
    };

    console.log(mode);
    // getting data from the store
    const answeredQuestionsIds = props.answeredQuestions;
    const allQuestions = props.questions;
    const allUsers = props.users;

    console.log(allUsers);
    console.log(answeredQuestionsIds);
    console.log(allQuestions);
    // function to order the questions by timestamp
    const orderedQuestionsIds = Object.keys(allQuestions).sort(
        (firstElement, secondElement) =>
            allQuestions[secondElement].timestamp -
            allQuestions[firstElement].timestamp
    );

    const classes = ""
    return (

        <>

<h1 style={{ textAlign: 'center' }}>Dashboard - <span style={{textTransform: "capitalize"}}>{mode}</span></h1>
            
<Nav variant="pills" defaultActiveKey="link-1" style={{marginBottom: "15px"}}>
  <Nav.Item>
    <Nav.Link eventKey={mode === 'Unanswered' ? 'link-1' : 'disabled'} onClick={changeToUnanswered}>Unanswered</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey={mode === 'Answered' ? 'disabled' : 'link-2'} onClick={changeToAnswered}>Answered</Nav.Link>
  </Nav.Item>

</Nav>         
            


            <Row xs={1} md={2} className="g-4">



                {orderedQuestionsIds.map(function (key, index) {
                    // {console.log("Dashboard.js Line 101. ", allQuestions[key])}

                    if (mode === 'Unanswered') {
                        // show unanswered questions
                        if (
                            !answeredQuestionsIds.some((e) =>
                                allQuestions[key].id.includes(e)
                            )
                        ) {
                            let author = allQuestions[key].author;
                            return UserCard(
                                classes,
                                allUsers[author].name,
                                allUsers[author].avatarURL,
                                allQuestions[key].id,
                                allQuestions[key].timestamp,
                                allQuestions[key].optionOne,
                                allQuestions[key].optionTwo,
                                mode
                            );
                        }
                    } else {
                        // show answered questions
                        if (
                            answeredQuestionsIds.some((e) =>
                                allQuestions[key].id.includes(e)
                            )
                        ) {
                            let author = allQuestions[key].author;
                            return UserCard(
                                classes,
                                allUsers[author].name,
                                allUsers[author].avatarURL,
                                allQuestions[key].id,
                                allQuestions[key].timestamp,
                                allQuestions[key].optionOne,
                                allQuestions[key].optionTwo,
                                mode
                            );
                        }
                    }
                })}






            </Row>





        </>
    );
}
// getting the answeredQuestions, all questions, and all users
function mapStateToProps({ questions, users, authedUser }) {
    let answeredQuestions = {};
    Object.keys(authedUser).length !== 0 && Object.keys(users).length !== 0
        ? (answeredQuestions = Object.keys(users[authedUser.id]['answers']))
        : (answeredQuestions = {});

    return {
        answeredQuestions,
        questions,
        users,
    };
}

export default connect(mapStateToProps)(Dashboard);
