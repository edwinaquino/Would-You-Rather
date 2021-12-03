/* Home page */
// importing libraries
import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

// function that recives classes name avatarImg id and timestamp
// and returns the html for a "Card"
function UserCard(classes, name, avatarImg, id, timestamp) {
    console.log(timestamp);
    let url = '/question/:id' + id;
    let date = new Date(timestamp);
    return (
        <div id="Card" key={id} className={classes.card}>
            <div style={{ width: '200px', position: 'relative' }}>
                <div id="Avatar" src={avatarImg} className={classes.avatar}></div>
                <div className={classes.lineBreak}></div>
            </div>
            <div
                style={{
                    width: '245px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    position: 'relative',
                }}
            >
                <h2>{name} asks:</h2>
                <div
                    style={{
                        height: '1px',
                        width: '100%',
                        backgroundColor: 'gainsboro',
                    }}
                />
                <h4 style={{ color: 'gainsboro' }}>Would you Rather?</h4>
                <button
                    component={Link}
                    to={url}
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: '20px' }}
                >
                    View Poll
                </button>
            </div>
            <div
                style={{
                    width: '215px',
                    marginTop: '15px',
                    textAlign: 'right',
                }}
            >
                {date.getDate() +
                    '/' +
                    (date.getMonth() + 1) +
                    '/' +
                    date.getFullYear()}
            </div>
        </div>
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

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div id="Paper" elevation={10} className={classes.container}>
                <button
                    className={mode === 'answered' ? classes.notActive : ''}
                    variant="contained"
                    color="primary"
                    onClick={changeToUnanswered}
                >
                    Unanswered
                </button>
                <button
                    variant="contained"
                    color="primary"
                    className={mode === 'Unanswered' ? classes.notActive : ''}
                    onClick={changeToAnswered}
                >
                    Answered
                </button>
                {orderedQuestionsIds.map(function (key, index) {
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
                                allQuestions[key].timestamp
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
                                allQuestions[key].timestamp
                            );
                        }
                    }
                })}
            </div>
        </div>
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
