// middleware
// SOURCE: https://github.com/udacity/reactnd-chirper-app/blob/new-tweet-logic/src/middleware/index.js 
import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk,
  logger,
)
