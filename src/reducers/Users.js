// template from: https://github.com/udacity/reactnd-chirper-app/blob/new-tweet-logic/src/reducers/users.js
import {
    RECEIVE_USERS,
    ADD_ANSWER_TO_USERS,
    ADD_QUESTION_TO_USERS,
} from '../actions/Users';
// handle switch cases for action type
export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            };
        // Append answeer to user profile
        case ADD_ANSWER_TO_USERS:
            return {
                ...state,
                ...action.users,
            };
        // Apppend question to user profile
        case ADD_QUESTION_TO_USERS:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: [
                        ...state[action.question.author].questions,
                        action['question']['id'],
                    ],
                },
            };
        default:
            return state;
    }
}
