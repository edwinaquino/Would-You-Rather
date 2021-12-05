// Source: https://github.com/udacity/reactnd-chirper-app/blob/new-tweet-logic/src/middleware/logger.js
// comment out the console output for debugging
const logger = (store) => (next) => (action) => {
    // console.group(action.type);
    // console.log('The action: ', action);
    const returnValue = next(action);
    //console.log('The new state: ', store.getState());
    // console.groupEnd();
    return returnValue;
};
export default logger;
