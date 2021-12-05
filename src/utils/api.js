// API starter code found here: https://github.com/udacity/reactnd-chirper-app/blob/new-tweet-logic/src/utils/api.js
import { questions as QuestionsData, users as UsersData } from './Data';
const users = UsersData;
const questions = QuestionsData;
/* API FUNCTIONS */


export function _getUsers() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...users }), 1000);
    });
}

export function _getQuestions() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...questions }), 1000);
    });
}



export function _saveQuestion(question) {
    return new Promise((res, rej) => {
        const authedUser = question.author;
        const formattedQuestion = formatQuestion(question);

        setTimeout(() => {


            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    questions: users[authedUser].questions.concat([
                        formattedQuestion.id,
                    ]),
                },
            };
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion,
            };
            res(formattedQuestion);
        }, 1000);
    });
}

export function _saveQuestionAnswer({ authedUser, qId, answer }) {
    return new Promise((res, rej) => {
        setTimeout(() => {

            questions = {
                ...questions,
                [qId]: {
                    ...questions[qId],
                    [answer]: {
                        ...questions[qId][answer],
                        votes: questions[qId][answer].votes.concat([
                            authedUser,
                        ]),
                    },
                },
            };

            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    answers: {
                        ...users[authedUser].answers,
                        [qId]: answer,
                    },
                },
            };



            res({ users, questions });
        }, 500);
    });
}

function generateUID() {
    return (
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
}

function formatQuestion({ optionOne, optionTwo, author }) {
    return {
        id: generateUID(),
        author,
        timestamp: Date.now(),

        optionOne: {
            votes: [],
            text: optionOne,
        },
        optionTwo: {
            votes: [],
            text: optionTwo,
        },
    };
}


