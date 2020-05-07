import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'

import { BOATLOAD_OF_GAS, ANSWER_PRICE } from '../../lib/constants'

class AnswerForm extends React.Component {

  static propTypes = {
    contract: PropTypes.object.isRequired,
    questionId: PropTypes.string.isRequired,
    currentUser: PropTypes.object,
  }

  static defaultProps = {
    currentUser: null,
  }

  state = { content: '' }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.content.length > 0) {
      this.props.contract.create_answer(
        {
          question_id: parseInt(this.props.questionId, 10),
          content: this.state.content,
        },
        BOATLOAD_OF_GAS,
        ANSWER_PRICE
      ).then(() => {
        this.setState({ content: '' })
      })
    }
    return false
  }

  render() {
    return (
      <Row>
        <Col>
          <Card className="form-card">
            <Card.Body>
              <Card.Title>Post Answer</Card.Title>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder={
                      this.props.currentUser
                        ? "Answer"
                        : "You have to be authenticated to post an answer"
                    }
                    value={this.state.content}
                    disabled={!this.props.currentUser}
                    onChange={(e) => this.setState({ content: e.target.value })}
                  />
                </Form.Group>
                <Alert variant='secondary'>
                  To post an answer costs 1 Ⓝ but then you have a chance to grab the question reward.
                  </Alert>
                <Button
                  type="submit"
                  variant="outline-dark"
                  disabled={!this.props.currentUser}
                >
                  Submit answer
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }
}


const mapStateToProps = state => ({
  currentUser: state.commonReducer.currentUser,
  contract: state.commonReducer.contract,
})

export default connect(mapStateToProps, null)(AnswerForm)