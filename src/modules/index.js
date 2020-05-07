import { combineReducers } from 'redux'

import commonReducer from './common'
import questionsReducer from './questions'

export default combineReducers({
  commonReducer,
  questionsReducer,
})