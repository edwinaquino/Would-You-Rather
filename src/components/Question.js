/* question page component */
import React from 'react';

import { connect } from 'react-redux';

import { handleAddAnswer } from '../actions/Questions';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import UserDetails from './Dashboard'
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';



function Question(props) {
    const classes = ""
    // React.UseState to save user selection
    const [userOpinion, setUserOpinion] = React.useState('');
    const [buttonDisabled, setButtonDisabled] = React.useState('disabled');
    // fnctions to change the state
    const userOpinionToOptionOne = () => {
        setUserOpinion('optionOne');
        setButtonDisabled('');

    };
    const userOpinionToOptionTwo = () => {
        setUserOpinion('optionTwo');
        setButtonDisabled('');
    };

    console.log(userOpinion);
    // getting all necesary data
    const allUsers = props.users;
    const allQuestions = props.questions;
    // in case the id of question is not in questions
    // it will redirect to a 404 page
    const idOfQuestion = props.match.params.id.substring(3);
    if (allQuestions[idOfQuestion] === undefined) {
        return <Redirect to="/404"></Redirect>;
    }

    const nameOfPersonAsking = allUsers[allQuestions[idOfQuestion].author].name;
    const avatarOfPersonAsking =
        allUsers[allQuestions[idOfQuestion].author].avatarURL;
    const questionOne = allQuestions[idOfQuestion].optionOne.text;
    const questionTwo = allQuestions[idOfQuestion].optionTwo.text;
    const timeStamp = allQuestions[idOfQuestion].timestamp;

    const questionOneVotes = allQuestions[idOfQuestion].optionOne.votes.length;
    const questionTwoVotes = allQuestions[idOfQuestion].optionTwo.votes.length;
    const totalVotePercentage = questionOneVotes + questionTwoVotes;
    const questionOneVotePercentage = Math.trunc(
        (questionOneVotes * 100) / totalVotePercentage
    );
    const questionTwoVotePercentage = Math.trunc(
        (questionTwoVotes * 100) / totalVotePercentage
    );

    const userVotedOne = allQuestions[idOfQuestion].optionOne.votes.includes(
        props.authedUserId
    );
    const userVotedTwo = allQuestions[idOfQuestion].optionTwo.votes.includes(
        props.authedUserId
    );
    return (
        <>

            <Col>
                <Card style={{ textAlign: "center" }} >
                                        <Card.Header style={{ textAlign: "left" }}>Poll Question</Card.Header>
                        <Image style={{ width: "200px", margin: "0 auto", padding: "10px" }} variant="top" src={avatarOfPersonAsking} roundedCircle />
                    
                    <Card.Body>
                    <h3>{nameOfPersonAsking}</h3>
                        <Card.Title>Would you Rather...</Card.Title>
                        <Card.Text>
                            
                            {userVotedOne || userVotedTwo ? (
                                <>
                                    <div style={{textAlign: "left", fontWeight: "bold"}}>Results:</div>


                                    <p style={{textAlign: "left", margin:"0px"}}>{questionOne} {userVotedOne ? `⭐ Your vote`: ""}</p>
                                    <ProgressBar style={{ fontSize: "18px", height:"20px"}} variant="primary" now={questionOneVotePercentage} label={`${questionOneVotePercentage}%`} />
                                    {questionOneVotes > 1 ? `${questionOneVotes} votes`: `${questionOneVotes} vote`}
                                    

                                    <p style={{textAlign: "left", margin:"0px"}}>{questionTwo}{userVotedOne ? "": `⭐ Your vote`}</p>
                                    <ProgressBar style={{ fontSize: "18px", height:"20px"}} variant="info" now={questionTwoVotePercentage} label={`${questionTwoVotePercentage}%`} />
                                    {questionTwoVotes > 1 ? `${questionTwoVotes} votes`: `${questionTwoVotes} vote`}
                                    {userVotedOne ? "": " - Your Vote"}


                                    {/* <div style={{ marginTop: '20px', fontSize: '32px' }}>You Voted for:  "{userVotedOne ? questionOne : questionTwo}"</div> */}
                                </>
                            ) : (
                                <>
                                    <div style={{margin: "auto 0"}}>
                                <p><input name="question" type="radio" value="1" onClick={userOpinionToOptionOne}/> {questionOne} </p>   
                                
                                    
                                    <p>Or</p>
                                    <p><input name="question" type="radio" value="2" onClick={userOpinionToOptionTwo}/> {questionTwo} </p> 
                                    </div>
                         
                                    
                                    <Button className="logoutButton NavLink btn btn-primary" disabled={buttonDisabled} onClick={() => {
                            
                            props.dispatch(
                                handleAddAnswer(userOpinion, idOfQuestion)
                            );
                        }}>Submit Your Answer</Button>
                                </>
                            )}


                        </Card.Text>
                    </Card.Body>
  
                </Card>
            </Col>


        </>
    );
}

function mapStateToProps({ authedUser, users, questions }) {
    return {
        authedUserId: authedUser.id,
        users,
        questions,
    };
}

export default connect(mapStateToProps)(Question);
