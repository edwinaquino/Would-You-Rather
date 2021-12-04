import { questions as QuestionsData, users as UsersData } from './Data';
const users = UsersData;
const questions = QuestionsData;
/* API FUNCTIONS */
function generateUID() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}

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

function formatQuestion({ optionOne, optionTwo, author }) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
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

export function _saveQuestion(question) {
    return new Promise((res, rej) => {
        const authedUser = question.author;
        const formattedQuestion = formatQuestion(question);

        setTimeout(() => {
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion,
            };

            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    questions: users[authedUser].questions.concat([
                        formattedQuestion.id,
                    ]),
                },
            };

            res(formattedQuestion);
        }, 1000);
    });
}

export function _saveQuestionAnswer({ authedUser, qId, answer }) {
    return new Promise((res, rej) => {
        setTimeout(() => {
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

            res({ users, questions });
        }, 500);
    });
}




