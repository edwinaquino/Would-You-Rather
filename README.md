# Would You Rather Project

This is a React App using the power of [Redux](https://react-redux.js.org/). This is a fun React web app that lets users play the “Would You Rather?” game. The game goes like this: A user is asked a question in the form: “Would you rather [option A] or [option B] ?”. Answering "neither" or "both" is against the rules.

In this app, users will be able to answer questions, see which questions they haven’t answered, see how other people have voted, post questions, and see the ranking of users on the leaderboard.


## Screen Shot
![Would You Rather App](https://user-images.githubusercontent.com/30946443/144736205-34b77d55-4701-4e9f-8c47-18ca4efeba8d.gif)

## Getting Started

To get started developing right away:

* Clone this project using Git: `git clone https://github.com/edwinaquino/Would-You-Rather.git`
* cd into my-reads folder: `cd Would-You-Rather`
* install all project dependencies with `npm install`
* start the development server with `npm start`
* Open In Browser - Your app should now be running on port 3000. Open your browser to: http://localhost:3000

## Included Dependencies

* bootstrap: 5.1.3,
* javascript-time-ago: ^2.3.10
* react-bootstrap: ^2.0.3
* react-redux": ^7.2.6

## API Data

The `src/utils/api.js` file represents a mocked database and methods that let you access the data. Each user has an avatar, you can customize the data who whatever you want..

To simplify the development process, an API was provided by Udaticy. The provided file [`api.js`](https://github.com/udacity/reactnd-chirper-app/tree/new-tweet-logic/src/utils) contains the methods you will need to perform necessary operations:

This code will queries to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

This project was bootstrapped with [Chirper (A Twitter Clone App)](https://github.com/udacity/reactnd-chirper-app/tree/new-tweet-logic). You can find more information on how to perform common tasks [here](https://github.com/udacity/reactnd-chirper-app/blob/master/README.md).

## License
[MIT](https://choosealicense.com/licenses/mit/)
