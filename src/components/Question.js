/* question page component */
import React from 'react';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/Questions';
import { Redirect } from 'react-router';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';
function QuestionPage(props) {
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
    //console.log(userOpinion);
    const allUsers = props.users;
    const allQuestions = props.questions;
    // in case the id of question is not in questions
    // it will redirect to a 404 page
    const idOfQuestion = props.match.params.id.substring(3);
    if (allQuestions[idOfQuestion] === undefined) {
        return <Redirect to="/404"></Redirect>;
    }
    const userAsking = allUsers[allQuestions[idOfQuestion].author].name;
    const UserVoting =
        allUsers[allQuestions[idOfQuestion].author].avatarURL;
    const optionOne = allQuestions[idOfQuestion].optionOne.text;
    const optionTwo = allQuestions[idOfQuestion].optionTwo.text;
    //const timeStamp = allQuestions[idOfQuestion].timestamp;
    const PollVotesOne = allQuestions[idOfQuestion].optionOne.votes.length;
    const PollVotesTwo = allQuestions[idOfQuestion].optionTwo.votes.length;
    const totalVotePercentage = PollVotesOne + PollVotesTwo;
    const optionOneVotePercentage = Math.trunc(
        (PollVotesOne * 100) / totalVotePercentage
    );
    const optionTwoVotePercentage = Math.trunc(
        (PollVotesTwo * 100) / totalVotePercentage
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
                    <Image style={{ width: "200px", margin: "0 auto", padding: "10px" }} variant="top" src={UserVoting} roundedCircle />
                    <Card.Body>
                        <h3>{userAsking}</h3>
                        <Card.Title>Would you Rather...</Card.Title>
                        <Card.Text>
                            {userVotedOne || userVotedTwo ? (
                                <>
                                    <div style={{ textAlign: "left", fontWeight: "bold" }}>Results:</div>
                                    <p style={{ textAlign: "left", margin: "0px" }}>{optionOne} {userVotedOne ? `⭐ Your vote` : ""}</p>
                                    <ProgressBar style={{ fontSize: "18px", height: "20px" }} variant="primary" now={optionOneVotePercentage} label={`${optionOneVotePercentage}%`} />
                                    {PollVotesOne > 1 ? `${PollVotesOne} votes` : `${PollVotesOne} vote`}
                                    <p style={{ textAlign: "left", margin: "0px" }}>{optionTwo}{userVotedOne ? "" : `⭐ Your vote`}</p>
                                    <ProgressBar style={{ fontSize: "18px", height: "20px" }} variant="info" now={optionTwoVotePercentage} label={`${optionTwoVotePercentage}%`} />
                                    {PollVotesTwo > 1 ? `${PollVotesTwo} votes` : `${PollVotesTwo} vote`}
                                    {userVotedOne ? "" : " - Your Vote"}
                                    {/* <div style={{ marginTop: '20px', fontSize: '32px' }}>You Voted for:  "{userVotedOne ? optionOne : optionTwo}"</div> */}
                                </>
                            ) : (
                                <>
                                    <div style={{ margin: "auto 0" }}>
                                        <p><input name="question" type="radio" value="1" onClick={userOpinionToOptionOne} /> {optionOne} </p>
                                        <p>Or</p>
                                        <p><input name="question" type="radio" value="2" onClick={userOpinionToOptionTwo} /> {optionTwo} </p>
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
export default connect(mapStateToProps)(QuestionPage);
