
// Requirement: Does the leaderboard work correctly and have the desired functionality?
import React from 'react';
import { connect } from 'react-redux';
// STyle
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';



function UserDetails(
    classes,
    name,
    avatarImg,
    position,
    answeredQ,
    askedQ,
    color,
    authedUser
) {


    return (

        <>



            <tr>
                <td><Image src={avatarImg} roundedCircle className="hdravatarURL" /><p>{name}</p></td>
                <td> <h2> <Badge style={{ borderRadius: "30px" }} bg="primary">{answeredQ + askedQ}</Badge></h2></td>

                <td><h2> <Badge style={{ borderRadius: "30px" }} bg="info">{answeredQ}</Badge> </h2></td>
                <td><h2> <Badge style={{ borderRadius: "30px" }} bg="warning">{askedQ}</Badge> </h2></td>
            </tr>





        </>
    );
}

function LeaderBoard(props) {
    const authedUser = props.authedUser.id;
    const ids = props.leaderIds;
    const users = props.users;
    const classes = ""
    // gold silver and bronze colors
    const colorsArr = ['#f6d27b', '#C0C0C0', '#CD7F32'];
    return (


        <>
            <h1 style={{ textAlign: 'center' }}>Leaderboard</h1>

            <Table hover style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Total Score</th>

                        <th>Answered Questions </th>
                        <th>Asked Questions</th>
                    </tr>
                </thead>
                <tbody>
                    {ids.map((element, index) =>
                        UserDetails(
                            classes,
                            users[element].name,
                            users[element].avatarURL,
                            index + 1,
                            Object.keys(props.users[element].answers).length,
                            users[element].questions.length,
                            colorsArr[index],
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
