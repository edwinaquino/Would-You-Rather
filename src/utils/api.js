
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

let users: IUser = {
    edwin: {
      id: 'edwin',
      name: 'Edwin L. Aquino',
      avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA646543118713252.png',
      answers: {
        '6zsy2jovgbxpcjk2ecdwyl': 'optionOne',
        '1njhjuts54dntulvjewiv': 'optionTwo',
        z9vvnx3xvwkobuphjw6i9: 'optionOne',
        fw5hnwbnjvd5ejwdtgaksi: 'optionOne',
      },
      questions: [],
    },
    mercedes: {
      id: 'mercedes',
      name: 'Mercedes P. Gonzales',
      avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA294937090792206.png',
      answers: {
        '6zsy2jovgbxpcjk2ecdwyl': 'optionOne',
      },
      questions: [],
    },
    tom: {
      id: 'tom',
      name: 'Tomas G. Garcia',
      avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA7100655269366061.png',
      answers: {
        '6zsy2jovgbxpcjk2ecdwyl': 'optionTwo',
        hcg0m5o5ne8mnnrbvtz9h: 'optionTwo',
        fw5hnwbnjvd5ejwdtgaksi: 'optionTwo',
        z9vvnx3xvwkobuphjw6i9: 'optionOne',
        '1njhjuts54dntulvjewiv': 'optionTwo',
        j3od3ubw750w3c3mshms2c: 'optionOne',
      },
      questions: [],
    },
    aleandra: {
      id: 'aleandra',
      name: 'Aleandra A. Fuentez',
      avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA6464894342527661.png',
      answers: {
        ne0xr9onz325lomrpo8va: 'optionOne',
      },
      questions: [],
    },
    audrey: {
      id: 'audrey',
      name: 'Audrey L. Tran',
      avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA8379026134983469.png',
      answers: {},
      questions: [],
    },
    pablo: {
      id: 'pablo',
      name: 'Pablo B. Hernandez',
      avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA290414191302663.png',
      answers: {},
      questions: [],
    },
    joe: {
      id: 'joe',
      name: 'Jose H. Sanchez',
      avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA794894408797836.png',
      answers: {},
      questions: [],
    },
    jenny: {
      id: 'jenny',
      name: 'Jenifer C. Morales',
      avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA817473290214918.png',
      answers: {},
      questions: [],
    },
    tony: {
      id: 'tony',
      name: 'Antonio R. Martinez',
      avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA939226466355644.png',
      answers: {},
      questions: [],
    },
    anna: {
      id: 'anna',
      name: 'Anna Q. Fuentes',
      avatarURL: 'https://www.cartoonize.net/svgavatars/temp-avatars/svgA6239545299463118.png',
      answers: {
        '6zsy2jovgbxpcjk2ecdwyl': 'optionOne',
        '1njhjuts54dntulvjewiv': 'optionOne',
        z9vvnx3xvwkobuphjw6i9: 'optionTwo',
      },
      questions: [],
    },
  };
  
  let questions: IQuestion = {
    okoppi5prcvgynqaaiyyc: {
      id: 'okoppi5prcvgynqaaiyyc',
      timestamp: 1636211375475,
      author: 'tony',
      optionOne: {
        votes: [],
        text: 'lose your keys',
      },
      optionTwo: {
        votes: [],
        text: 'forget your cell phone',
      },
    },
    izbuq3p6otudfqsv180z: {
      id: 'izbuq3p6otudfqsv180z',
      timestamp: 1636211401423,
      author: 'tony',
      optionOne: {
        votes: [],
        text: 'lose all your contacts',
      },
      optionTwo: {
        votes: [],
        text: 'lose $1000',
      },
    },
    h322lh6ootapxxcrsdv1gc: {
      id: 'h322lh6ootapxxcrsdv1gc',
      timestamp: 1636211437294,
      author: 'tony',
      optionOne: {
        votes: [],
        text: 'stop using YouTube',
      },
      optionTwo: {
        votes: [],
        text: 'stop using Instagram',
      },
    },
    'qzqiywx64l5u6yz24b5kd': {
      id: 'qzqiywx64l5u6yz24b5kd',
      timestamp: 1636211566522,
      author: 'edwin',
      optionOne: {
        votes: [],
        text: 'know the history of every object you touched',
      },
      optionTwo: {
        votes: [],
        text: 'be able to talk to animals',
      },
    },
    ne0xr9onz325lomrpo8va: {
      id: 'ne0xr9onz325lomrpo8va',
      timestamp: 1636211625299,
      author: 'edwin',
      optionOne: {
        votes: ['aleandra'],
        text: 'be the richest person in the world',
      },
      optionTwo: {
        votes: [],
        text: 'be immortal',
      },
    },
    j3od3ubw750w3c3mshms2c: {
      id: 'j3od3ubw750w3c3mshms2c',
      timestamp: 1636211701880,
      author: 'jenny',
      optionOne: {
        votes: ['tom'],
        text: 'experience the world beginning',
      },
      optionTwo: {
        votes: [],
        text: 'ending',
      },
    },
    z9vvnx3xvwkobuphjw6i9: {
      id: 'z9vvnx3xvwkobuphjw6i9',
      timestamp: 1636211719902,
      author: 'jenny',
      optionOne: {
        votes: ['edwin', 'tom'],
        text: 'have more money',
      },
      optionTwo: {
        votes: ['anna'],
        text: 'more time',
      },
    },
    '1efetgi6go5p7nrqgs12ci': {
      id: '1efetgi6go5p7nrqgs12ci',
      timestamp: 1636211777768,
      author: 'audrey',
      optionOne: {
        votes: [],
        text: 'be super strong',
      },
      optionTwo: {
        votes: [],
        text: 'super fast',
      },
    },
    fw5hnwbnjvd5ejwdtgaksi: {
      id: 'fw5hnwbnjvd5ejwdtgaksi',
      timestamp: 1636211839502,
      author: 'mercedes',
      optionOne: {
        votes: ['edwin'],
        text: ' win an Olympic Gold Medal',
      },
      optionTwo: {
        votes: ['tom'],
        text: 'an Academy Award',
      },
    },
    '1njhjuts54dntulvjewiv': {
      id: '1njhjuts54dntulvjewiv',
      timestamp: 1636211884807,
      author: 'aleandra',
      optionOne: {
        votes: ['anna'],
        text: 'be famous for your dancing',
      },
      optionTwo: {
        votes: ['edwin', 'tom'],
        text: 'famous for your singing',
      },
    },
    hcg0m5o5ne8mnnrbvtz9h: {
      id: 'hcg0m5o5ne8mnnrbvtz9h',
      timestamp: 1636211927403,
      author: 'joe',
      optionOne: {
        votes: [],
        text: 'be invisible',
      },
      optionTwo: {
        votes: ['tom'],
        text: 'be able to fly',
      },
    },
    '6zsy2jovgbxpcjk2ecdwyl': {
      id: '6zsy2jovgbxpcjk2ecdwyl',
      timestamp: 1636212021327,
      author: 'anna',
      optionOne: {
        votes: ['anna', 'edwin', 'mercedes'],
        text: 'live on a plant',
      },
      optionTwo: {
        votes: ['tom'],
        text: 'beneath the sea',
      },
    },
  };
