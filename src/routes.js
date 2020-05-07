import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import App from './App'
import QuestionsList from './components/QuestionsList'
import QuestionDetail from './components/QuestionDetail'


export default () => (
  <Router>
    <App>
      <Switch>
        <Route exact path='/'>
          <QuestionsList />
        </Route>
        <Route path='/:questionId'>
          <QuestionDetail />
        </Route>
      </Switch>
    </App>
  </Router>
)