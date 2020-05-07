import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'

import Header from './components/Header'

class App extends React.Component {

  static propTypes = {
    wallet: PropTypes.object.isRequired,
    nearConfig: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
  }

  static defaultProps = {
    currentUser: null,
  }

  state = { questionText: '' }

  signIn = () => {
    this.props.wallet.requestSignIn(
      this.props.nearConfig.contractName,
      "NEAROverflow"
    )
  }

  signOut = () => {
    this.props.wallet.signOut()
    window.location.href = '/'
  }

  render() {
    return (
      <>
        <Header
          currentUser={this.props.currentUser}
          signIn={this.signIn}
          signOut={this.signOut}
        />
        <Container>
          {this.props.children}
        </Container>
      </>
    );
  }
}


const mapStateToProps = state => ({
  currentUser: state.commonReducer.currentUser,
  nearConfig: state.commonReducer.nearConfig,
  wallet: state.commonReducer.walletConnection,
})

export default connect(mapStateToProps, null)(App)