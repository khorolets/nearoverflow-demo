import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'

import Box from '../Box'

class Answer extends React.Component {

  static propTypes = {
    markAsCorrect: PropTypes.func.isRequired,
    upvoteAnswer: PropTypes.func.isRequired,
    account_id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    reward: PropTypes.number.isRequired,
    is_correct: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    questionIsLocked: PropTypes.bool.isRequired,
    questionAuthor: PropTypes.string.isRequired,
  }

  state = { isLoading: false }

  handleMarkAsCorrect = (e) => {
    this.setState({ isLoading: true }, () => {
      this.props.markAsCorrect(this.props.id)
    })
  }

  handleUpvote = (e) => {
    this.props.upvoteAnswer(this.props.id)
  }

  render() {
    let { account_id, content, reward, is_correct } = this.props
    return (
      <Card>
        <Card.Body>
          <Container>
            <Row>
              <Col xs={2}>
                <Box
                  active={is_correct}
                  title="Reward"
                  number={reward}
                />
                <Button
                  block
                  className="upvote"
                  variant="outline-dark"
                  sime='sm'
                  onClick={this.handleUpvote}
                >
                  Upvote 1 Ⓝ
                </Button>
              </Col>
              <Col>
                {
                  !this.props.questionIsLocked &&
                  this.props.currentUser &&
                  this.props.currentUser.accountId === this.props.questionAuthor &&
                  <Button
                    className="mark-as-correct"
                    variant="outline-success"
                    size='sm'
                    onClick={this.handleMarkAsCorrect}
                  >
                    {this.state.isLoading ?
                      <Spinner animation="border" size="sm" />
                      : "Mark as correct"
                    }
                  </Button>
                }
                <Card.Text className="author">@{account_id}</Card.Text>
                <Card.Title>{content}</Card.Title>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    )
  }
}


const mapStateToProps = state => ({
  contract: state.commonReducer.contract,
  currentUser: state.commonReducer.currentUser,
})

export default connect(mapStateToProps, null)(Answer)