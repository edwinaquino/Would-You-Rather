/* Add New Would you Rather... Question */
import React from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/Questions';
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function AddQuestion(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [optionOne, setUser] = React.useState('');
    const [optionTwo, setUser2] = React.useState('');
    // update state and assigned values when user has provided
    const GetQuestion1 = (event) => {
        setUser(event.target.value);
    };
    const GetQuestion2 = (event) => {
        setUser2(event.target.value);
    };
    // DEBUGGING
    //console.log(optionOne);
    //console.log(optionTwo);
    return (
        <>
            <Form>
                <h1 style={{ textAlign: 'center' }}>Add New Question</h1>
                <h2 >Would you Rather...</h2>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Option One"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="What if option 1...." onChange={GetQuestion1} />
                </FloatingLabel>
                <p>Or</p>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Option Two"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="What if option 2...." onChange={GetQuestion2} />
                </FloatingLabel>
                <Button disabled={optionOne !== '' && optionTwo !== '' ? "" : "disabled"} className="btn btn-primary btn-lg" variant="primary" size="lg" onClick={() => {

                    if (!(optionOne === '' && optionTwo === '')) {
                        props.dispatch(handleAddQuestion(optionOne, optionTwo));
                        //alert("SUCCESS");
                        setModalShow(true)
                        //console.log('submited');
                    } else {
                        alert("Fatal Error #161 - We an encountered an error and could not save your information. Please make sure all fields are populated.");
                        //console.log('form was empty');
                    }
                }}>
                    Submit
                </Button>
            </Form>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
// https://react-bootstrap.netlify.app/components/modal/
function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Success
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Congratulations!</h4>
                <p>
                    Thank you. Your 'What Would You Rather...' questions have been submitted successfully. Please click the continue button to proceed.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Link className="btn btn-primary" onClick={props.onHide} to="/home" >Continue</Link>
            </Modal.Footer>
        </Modal>
    );
}
function mapStateToProps({ selectUser }) {
    return {
        userIn: selectUser,
    };
}
export default connect(mapStateToProps)(AddQuestion);
