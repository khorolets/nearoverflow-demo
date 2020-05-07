import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import App from './App'
import QuestionsList from './components/QuestionsList'
import QuestionDetail from './components/QuestionDetail'


export default () => (
  <Router basename={process.env.PUBLIC_URL}>
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
  </Router >
)