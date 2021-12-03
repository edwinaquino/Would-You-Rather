import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';


// nav bar
function NavBar(props) {
    let avatarImg = props.users[props.authedUserId].avatarURL;
    const classes = ""
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div id="Paper" className={classes.root}>
            <div id="Tabs">
                <Link to="/home" >Dashboard</Link> | 
                <Link to="/add" >Create Question</Link> | 
                <Link to="/leaderboard" >LeaderBoard</Link> | 

            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '13px',
                    right: '25px',
                    display: 'flex',
                    gap: '10px',
                    flexDirection: 'row-reverse',
                }}
            >
                <button
                    className={classes.logout}
                    component={Link}
                    to="/logout"
                >
                    <span id="ExitToAppIcon" style={{ fontSize: '40px' }}>Close Icon Here</span>
                </button>
                <div id="Avatar"
                    src={avatarImg}
                    style={{
                        backgroundColor: '#0077b6',
                    }}
                >avatar</div>
                <div className={classes.name}>
                    {props.users[props.authedUserId].name}
                </div>
            </div>
        </div>
    );
}
function mapStateToProps({ authedUser, users }) {
    return {
        authedUserId: authedUser.id,
        users: users,
    };
}
export default connect(mapStateToProps)(NavBar);
