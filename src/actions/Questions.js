// Starting source: https://github.com/udacity/reactnd-chirper-app/blob/new-tweet-logic/src/actions/tweets.js
import { _saveQuestionAnswer } from '../utils/api';
import { addAnswerToUsers, addQuestionToUsers } from './Users';
import { _saveQuestion } from '../utils/api';
// Declare Constants
export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SET_UNANSWERED_QUESTIONS = 'SET_UNANSWERED_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
// Answers Functions
function addAnswerToQuestions(questions) {
    return {
        type: ADD_ANSWER,
        questions,
    };
}
export function handleAddAnswer(answer, qId) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return _saveQuestionAnswer({
            authedUser: authedUser.id,
            qId,
            answer,
        }).then((res) => {
            dispatch(addAnswerToQuestions(res.questions));
            dispatch(addAnswerToUsers(res.users));
        });
    };
}
// Questions Functions
export function handleAddQuestion(optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return _saveQuestion({
            optionOne,
            optionTwo,
            author: authedUser.id,
        }).then((newQuest) => {
            dispatch(addQuestion(newQuest));
            dispatch(addQuestionToUsers(newQuest));
        });
    };
}
function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    };
}
export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}
