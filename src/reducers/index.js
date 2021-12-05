// reducers
// Source: https://github.com/udacity/reactnd-chirper-app/blob/new-tweet-logic/src/reducers/index.js
import { combineReducers } from 'redux';
import authedUser from './AuthenticatedUser';
import users from './Users';
import questions from './Questions'; // Poll Question
import { loadingBarReducer } from 'react-redux-loading';
export default combineReducers({
    authedUser,
    users,
    questions,
    loadingBar: loadingBarReducer,
});
