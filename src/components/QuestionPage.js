/* question page component */
import React from 'react';

import { connect } from 'react-redux';

import { handleAddAnswer } from '../actions/Questions';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import UserCard from './Dashboard'
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addDefaultLocale(en);

const formatDate = (timestamp) => {
  const timeAgo = new TimeAgo('en-US');
  const date = new Date(timestamp);

  return timeAgo.format(date);
};

function QuestionPage(props) {
    const classes = ""
    // React.UseState to save user selection
    const [userOpinion, setUserOpinion] = React.useState('');
    // fnctions to change the state
    const userOpinionToOptionOne = () => {
        setUserOpinion('optionOne');
    };
    const userOpinionToOptionTwo = () => {
        setUserOpinion('optionTwo');
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
    const option1 = allQuestions[idOfQuestion].optionOne.text;
    const option2 = allQuestions[idOfQuestion].optionTwo.text;
    const timeStamp = allQuestions[idOfQuestion].timestamp;
    //let date = new this.formatDate(timeStamp);
    // getting the vote percentage of each options
    const option1Votes = allQuestions[idOfQuestion].optionOne.votes.length;
    const option2Votes = allQuestions[idOfQuestion].optionTwo.votes.length;
    const totalVotePercentage = option1Votes + option2Votes;
    const option1VotePercentage = Math.trunc(
        (option1Votes * 100) / totalVotePercentage
    );
    const option2VotePercentage = Math.trunc(
        (option2Votes * 100) / totalVotePercentage
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
                                        <Card.Header style={{ textAlign: "right" }}>      <small className="text-muted">
                        {formatDate(timeStamp)}</small></Card.Header>
                        <Image style={{ width: "200px", margin: "0 auto", padding: "10px" }} variant="top" src={avatarOfPersonAsking} roundedCircle />
                    
                    <Card.Body>
                    <h3>{nameOfPersonAsking}</h3>
                        <Card.Title>Would you Rather...</Card.Title>
                        <Card.Text>
                            
                            {userVotedOne || userVotedTwo ? (
                                <>
                                    <div style={{textAlign: "left", fontWeight: "bold"}}>Results:</div>


                                    <p style={{textAlign: "left", margin:"0px"}}>{option1} {userVotedOne ? `⭐ Your vote`: ""}</p>
                                    <ProgressBar style={{ fontSize: "18px", height:"20px"}} variant="primary" now={option1VotePercentage} label={`${option1VotePercentage}%`} />
                                    {option1Votes > 1 ? `${option1Votes} votes`: `${option1Votes} vote`}
                                    

                                    <p style={{textAlign: "left", margin:"0px"}}>{option2}{userVotedOne ? "": `⭐ Your vote`}</p>
                                    <ProgressBar style={{ fontSize: "18px", height:"20px"}} variant="info" now={option2VotePercentage} label={`${option2VotePercentage}%`} />
                                    {option2Votes > 1 ? `${option2Votes} votes`: `${option2Votes} vote`}
                                    {userVotedOne ? "": " - Your Vote"}


                                    {/* <div style={{ marginTop: '20px', fontSize: '32px' }}>You Voted for:  "{userVotedOne ? option1 : option2}"</div> */}
                                </>
                            ) : (
                                <>
                                    <div style={{margin: "auto 0"}}>
                                <p><input type="radio" value="1" onClick={userOpinionToOptionOne}/> {option1} </p>   
                                
                                    
                                    <p>Or</p>
                                    <p><input type="radio" value="2" onClick={userOpinionToOptionTwo}/> {option2} </p> 
                                    </div>
                         
                                    
                                    <Button className="logoutButton NavLink btn btn-primary" onClick={() => {
                            
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

export default connect(mapStateToProps)(QuestionPage);
