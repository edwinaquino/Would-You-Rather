
// Requirement: Does the leaderboard work correctly and have the desired functionality?
import React from 'react';
import { connect } from 'react-redux';
// STyle
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
function LeaderBoard(props) {
    const ids = props.leaderIds;
    const users = props.users;
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
                    {ids.map(function (element, index) {
                        let name = users[element].name
                        let avatarImg = users[element].avatarURL;
                        let answeredQ = Object.keys(props.users[element].answers).length;
                        let askedQ = users[element].questions.length;
                        return (
                            <tr key={index}>
                                <td><Image src={avatarImg} roundedCircle className="hdravatarURL" /><p>{name}</p></td>
                                <td> <h2> <Badge style={{ borderRadius: "30px" }} bg="primary">{answeredQ + askedQ}</Badge></h2></td>
                                <td><h2> <Badge style={{ borderRadius: "30px" }} bg="info">{answeredQ}</Badge> </h2></td>
                                <td><h2> <Badge style={{ borderRadius: "30px" }} bg="warning">{askedQ}</Badge> </h2></td>
                            </tr>
                        )
                    })}
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
