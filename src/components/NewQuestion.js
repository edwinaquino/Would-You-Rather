/* new question component */
import React from 'react';



import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/Questions';
import { Link } from 'react-router-dom';



function NewQuestion(props) {
    const classes = ""
    // react.UseState to save the user input text for both options
    const [option1, setUser] = React.useState('');
    const [option2, setUser2] = React.useState('');
    // functions to interact with the state
    const handleChange = (event) => {
        setUser(event.target.value);
    };
    const handleChange2 = (event) => {
        setUser2(event.target.value);
    };
    console.log(option1);
    console.log(option2);

    return (
        <div className={classes.root}>
            <div id="Paper" elevation={10} className={classes.container}>
                <h1 style={{ textAlign: 'center', color: '#dee2e6' }}>
                    Create New Question
                </h1>
                <hr style={{ border: '1px solid #adb5bd' }} />
                <h2 style={{ color: '#5969C5' }}>Would you Rather...</h2>
                <form>
                    <input data-id="CustomTextField"
                        spellCheck="false"
                        autoComplete="off"
                        className={classes.textField}
                        InputProps={{
                            className: classes.textField,
                        }}
                        id="outlined-basic"
                        label="option 1"
                        variant="outlined"
                        onChange={handleChange}
                    />
                </form>

                <span className={classes.splitLine}>
                    <span
                        style={{
                            transform: 'translatey(10px)',
                            width: '48%',
                            height: '1px',
                            backgroundColor: '#6c757d',
                        }}
                    />
                    <div
                        style={{
                            color: '#5969C5',
                            marginRight: '15px',
                            marginLeft: '15px',
                        }}
                    >
                        OR
                    </div>
                    <span
                        style={{
                            transform: 'translatey(10px)',
                            width: '48%',
                            height: '1px',
                            backgroundColor: '#6c757d',
                        }}
                    />
                </span>

                <form>
                <input data-id="CustomTextField2"
                        spellCheck="false"
                        autoComplete="off"
                        className={classes.textField}
                        InputProps={{
                            className: classes.textField,
                        }}
                        id="outlined-basic"
                        label="option 2"
                        variant="outlined"
                        onChange={handleChange2}
                    />
                </form>
                <button
                    component={Link}
                    to="/home"
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    onClick={() => {
                        // validate if form was empty
                        if (!(option1 === '' || option2 === '')) {
                            props.dispatch(handleAddQuestion(option1, option2));
                            console.log('submited');
                        } else {
                            console.log('form was empty');
                        }
                    }}
                >
                    Submit Question
                </button>
            </div>
        </div>
    );
}

function mapStateToProps({ selectUser }) {
    return {
        userIn: selectUser,
    };
}

export default connect(mapStateToProps)(NewQuestion);
