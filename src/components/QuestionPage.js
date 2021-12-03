/* question page component */
import React from 'react';

import { connect } from 'react-redux';

import { handleAddAnswer } from '../actions/Questions';
import { Redirect } from 'react-router';


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
    let date = new Date(timeStamp);
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
        <div id="Card" className={classes.card}>
            <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
                {/* code to format the date */}
                {date.getDate() +
                    '/' +
                    (date.getMonth() + 1) +
                    '/' +
                    date.getFullYear()}
            </div>
            <div id="Avatar"
                src={avatarOfPersonAsking}
                className={classes.avatar}
            ></div>
            <p>{nameOfPersonAsking} asks:</p>
            <p style={{ fontSize: '2em' }}>Would you Rather...</p>
            {/* if the authed user has already voted, show results, if not
            show options to allow vote */}
            {userVotedOne || userVotedTwo ? (
                <React.Fragment>
                    <div>results:</div>
                    <div className={classes.resultsOptions}>
                        <div className={classes.resultOptionText}>
                            1.- {option1}: {option1VotePercentage}%
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '15px',
                            }}
                        >
                            votes:
                            {option1Votes}
                        </div>
                        <div
                            style={{
                                height: '100%',
                                backgroundColor: '#c40046',
                                width: `${option1VotePercentage}%`,
                                position: 'absolute',
                                top: '0px',
                            }}
                        ></div>
                    </div>
                    <div className={classes.resultsOptions}>
                        <div className={classes.resultOptionText}>
                            2.- {option2}: {option2VotePercentage}%
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '15px',
                            }}
                        >
                            votes:
                            {option2Votes}
                        </div>
                        <div
                            style={{
                                height: '100%',
                                backgroundColor: '#c40046',
                                width: `${option2VotePercentage}%`,
                                position: 'absolute',
                                top: '0px',
                            }}
                        ></div>
                    </div>
                    <div style={{ marginTop: '20px', fontSize: '32px' }}>
                        You Voted option {userVotedOne ? '1' : '2'}
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <button
                        style={{ width: '80%' }}
                        variant="contained"
                        className={
                            userOpinion === 'optionOne' ? classes.activeBtn : ''
                        }
                        onClick={userOpinionToOptionOne}
                    >
                        {option1}
                    </button>
                    <p>OR</p>
                    <button
                        style={{ width: '80%' }}
                        variant="contained"
                        className={
                            userOpinion === 'optionTwo' ? classes.activeBtn : ''
                        }
                        onClick={userOpinionToOptionTwo}
                    >
                        {option2}
                    </button>
                    <button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        style={{ marginTop: '20px' }}
                        onClick={() => {
                            console.log('submited');
                            props.dispatch(
                                handleAddAnswer(userOpinion, idOfQuestion)
                            );
                        }}
                    >
                        Submit Opinion
                    </button>
                </React.Fragment>
            )}
        </div>
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
