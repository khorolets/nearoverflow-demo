import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, Button, Jumbotron } from 'react-bootstrap'

import {
  QUESTION_MIN_PRICE,
  BOATLOAD_OF_GAS,
} from '../../lib/constants'

class QuestionForm extends React.Component {

  static propTypes = {
    contract: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
  }

  static defaultProps = {
    currentUser: null,
  }

  state = { questionText: '' }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.questionText.length > 0) {
      this.props.contract.create_question(
        { content: this.state.questionText, reward: QUESTION_MIN_PRICE },
        BOATLOAD_OF_GAS,
        QUESTION_MIN_PRICE,
      )
    }
    return false
  }

  render() {
    return (
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <h1>Ask a question!</h1>
              <p>
                Simply ask a question and give the reward to the correct answer (10 Ⓝ)
              </p>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={this.state.questionText}
                    onChange={
                      (e) => { this.setState({ questionText: e.target.value }) }
                    }
                    placeholder="Post new quesion"
                  />
                </Form.Group>
                <Button type='submit' variant="outline-dark">Post new quetsion</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    )
  }
}

const mapStateToProps = state => ({
  contract: state.commonReducer.contract,
  currentUser: state.commonReducer.currentUser,
})

export default connect(mapStateToProps, null)(QuestionForm)