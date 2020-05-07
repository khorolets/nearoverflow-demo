import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import * as nearAPI from 'near-api-js'

// import * as serviceWorker from './serviceWorker';
import Routes from './routes'
import getConfig from './config.js'
import reducers from './modules'

import './custom.scss'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

// Initializing contract
async function initContract() {
  const nearConfig = getConfig('development')

  // Initializing connection to the NEAR DevNet
  const near = await nearAPI.connect({
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
    },
    ...nearConfig
  })

  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near)

  // Load in account data
  let currentUser
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount
    }
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
    // View methods are read-only – they don't modify the state, but usually return some value
    viewMethods: ['list_questions'],
    // Change methods can modify the state, but you don't receive the returned value when called
    changeMethods: [
      'create_question',
      'create_answer',
      'upvote_answer',
      'set_correct_answer',
    ],
    // Sender is the account ID to initialize transactions.
    // getAccountId() will return empty string if user is still unauthorized
    sender: walletConnection.getAccountId()
  })

  return { contract, currentUser, nearConfig, walletConnection }
}

window.nearInitPromise = initContract()
  .then(initialProps => {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={createStoreWithMiddleware(reducers, { commonReducer: initialProps })}>
          <Routes />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    )
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
