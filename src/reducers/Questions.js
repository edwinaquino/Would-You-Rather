// reducer starter code found here: https://github.com/udacity/reactnd-chirper-app/blob/new-tweet-logic/src/reducers/tweets.js
import {
    RECEIVE_QUESTIONS,
    ADD_QUESTION,
    ADD_ANSWER,
} from '../actions/Questions';
export default function questions(state = {}, action) {
    switch (action.type) {
        case ADD_ANSWER:
            return {
                ...state,
                ...action.questions,
            };
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            };
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            };
        default:
            return state;
    }
}
