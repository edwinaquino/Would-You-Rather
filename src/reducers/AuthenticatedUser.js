// starter code: https://github.com/udacity/reactnd-chirper-app/blob/new-tweet-logic/src/reducers/authedUser.js
import { SET_AUTHED_USER, SET_AUTHED_USER_TO_NULL } from '../actions/AuthenticatedUser';
export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER_TO_NULL:
            return null;
        case SET_AUTHED_USER:
            return {
                ...state,
                id: action.id,
            };
        default:
            return state;
    }
}
