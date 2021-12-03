/* Leader board component */
import React from 'react';

import { connect } from 'react-redux';

// function recives name, avatarImg, position, answeredQuestions, askedQuestions
// color and authed User, and returns a card UI
function UserCard(
    classes,
    name,
    avatarImg,
    position,
    answeredQ,
    askedQ,
    color,
    authedUser
) {
    // if not gold, silver or bronze then use this color
    if (color === undefined) {
        color = '#5969c5';
    }
    // code to make the "user player" background highlighted in the leaderboard
    let backgroundColor;
    if (authedUser === true) {
        backgroundColor = 'green';
    } else {
        backgroundColor = 'white';
    }
    return (
        <div id="Card"
            
            style={{ backgroundColor: backgroundColor,width:"200px",border:"1px red solid",margin: "0px auto" }}
            key={name}
        >
            <div style={{ width: '200px', position: 'relative' }}>
                <strong style={{ color: `${color}`, fontSize: '20px' }}>
                    #{position}
                </strong>
                <div id="Avatar" src={avatarImg}><img src={avatarImg} style={{width:"50px"}}/></div>
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
                <h2>{name}</h2>
                <div
                    style={{
                        height: '1px',
                        width: '100%',
                       
                    }}
                />
                <h4 style={{ color: 'gainsboro' }}>
                    Answered questions:{' '}
                    <strong style={{ color: '#5969C5' }}>{answeredQ}</strong>
                </h4>
                <h4 style={{ color: 'gainsboro' }}>
                    Asked questions:{' '}
                    <strong style={{ color: '#5969C5' }}>{askedQ}</strong>
                </h4>
                <div className={classes.lineBreak}></div>
            </div>
            <div
                style={{
                    position: 'relative',
                    textAlign: 'center',
                    width: '240px',
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Total score</h2>
                <h2
                    style={{
                        marginLeft: '90px',
                        backgroundColor: '#5969C5',
                        width: '50px',
                        height: '50px',
                        borderRadius: '25px',
                        lineHeight: '50px',
                    }}
                >
                    {answeredQ + askedQ}
                </h2>
            </div>
        </div>
    );
}

function LeaderBoard(props) {
    // getting data from props
    const authedUser = props.authedUser.id;
    const ids = props.leaderIds;
    const users = props.users;
    const classes = ""
    // gold silver and bronze colors
    const colors = ['#f6d27b', '#C0C0C0', '#CD7F32'];
    return (
        <div className={classes.root}>
            <div id="Paper" elevation={10} className={classes.container}>
                {ids.map((element, index) =>
                    UserCard(
                        classes,
                        users[element].name,
                        users[element].avatarURL,
                        index + 1,
                        Object.keys(props.users[element].answers).length,
                        users[element].questions.length,
                        colors[index],
                        users[authedUser].name === users[element].name
                            ? true
                            : false
                    )
                )}
            </div>
        </div>
    );
}

function mapStateToProps({ users, authedUser }) {
    return {
        leaderIds: Object.keys(users).sort((firstElement, secondElement) => {
            let user2 =
                Object.keys(users[secondElement].answers).length +
                Object.keys(users[secondElement].questions).length;
            let user1 =
                Object.keys(users[firstElement].answers).length +
                Object.keys(users[firstElement].questions).length;
            return user2 - user1;
        }),
        users,
        authedUser,
    };
}

export default connect(mapStateToProps)(LeaderBoard);
