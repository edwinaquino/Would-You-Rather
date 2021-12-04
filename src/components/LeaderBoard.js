/* Leader board component */
import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';



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

        <>



            <tr>
                <td><Image src={avatarImg} roundedCircle className="hdrAvatarImg" /></td>
                <td> <h2> <Badge style={{ borderRadius: "30px" }} bg="primary">5</Badge></h2></td>

                <td><h2> <Badge style={{ borderRadius: "30px" }} bg="info">{answeredQ}</Badge> </h2></td>
                <td><h2> <Badge style={{ borderRadius: "30px" }} bg="warning">{askedQ}</Badge> </h2></td>
            </tr>





        </>
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


        <>
            <h1 style={{ textAlign: 'center' }}>Leaderboard</h1>

            <Table hover style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Total Score</th>

                        <th>Answered Questions </th>
                        <th>Created Questions</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </Table>


        </>
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
