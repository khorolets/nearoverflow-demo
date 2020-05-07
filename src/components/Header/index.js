import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Navbar, Button } from 'react-bootstrap'

const Header = ({ currentUser, signIn, signOut }) => (
  <Navbar fixed="top" bg="dark" variant="dark" className="justify-content-between">
    <Navbar.Brand>
      <Link to="/">NEARoverflow</Link>
    </Navbar.Brand>

    {currentUser &&
      <Button
        variant="outline-light"
        onClick={signOut}>
        Ⓝ Log out
        </Button>
    }
    {!currentUser &&
      <Button
        variant="outline-light"
        onClick={signIn}>
        Ⓝ Log in
        </Button>
    }
  </Navbar>
)

Header.propTypes = {
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
}

Header.defaultProps = {
  currentUser: null,
}

export default Header