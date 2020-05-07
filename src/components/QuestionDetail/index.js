import React from 'react'
import PropTypes from 'prop-types'
import Big from 'big.js'
import { connect } from 'react-redux'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { setQuestions } from '../../modules/questions'

import Answer from '../Answer'
import AnswerForm from '../AnswerForm'
import Box from '../Box'
import { BOATLOAD_OF_GAS } from '../../lib/constants'

class QuestionDetail extends React.Component {

  static propTypes = {
    setQuestions: PropTypes.func.isRequired,
    contract: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    questions: PropTypes.object
  }

  static defaultProps = {
    questions: null,
    currentUser: null,
  }

  componentDidMount() {
    if (!this.props.questions) {
      this.props.contract.list_questions()
        .then(response => this.props.setQuestions(response))
    }
  }

  markAsCorrect = (answerId) => {
    let { questionId } = this.props.match.params
    let question = this.props.questions[questionId]
    let answer = question.answers.filter(ans => ans.id === answerId)[0]

    if (question.answers.filter(ans => ans.is_correct === true).length > 0) {
      alert("ERROR: This question already has correct answer")
      return false
    }

    if (
      this.props.currentUser &&
      this.props.currentUser.accountId === question.author_account_id &&
      this.props.currentUser.accountId !== answer.account_id
    ) {
      this.props.contract.set_correct_answer(
        { question_id: parseInt(questionId, 10), answer_id: answerId }
      ).then(() => {
        this.props.contract.list_questions()
          .then(response => this.props.setQuestions(response))
      })
    } else {
      alert("ERROR: You're not allowed to perform this action")
    }
    return false
  }

  upvote = (answerId) => {
    let { questionId } = this.props.match.params

    this.props.contract.upvote_answer(
      {
        question_id: parseInt(questionId, 10),
        answer_id: answerId
      },
      BOATLOAD_OF_GAS,
      Big(1).times(10 ** 24).toFixed()
    )
  }

  render() {
    let { questionId } = this.props.match.params
    if (!this.props.questions) return null
    let props = this.props.questions[questionId]
    if (!props) return null
    let questionIsLocked = props.answers.filter(ans => ans.is_correct === true).length > 0
    return (
      <>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Container>
                  <Row>
                    <Col xs={2}>
                      <Box
                        active={questionIsLocked}
                        title="Reward"
                        number={props.reward}
                      />
                    </Col>
                    <Col>
                      <Card.Text className="author">@{props.author_account_id}</Card.Text>
                      <Card.Title>{props.content}</Card.Title>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {props.answers.length > 0 &&
          <Row>
            <Col>
              <h2>Answers: </h2>
              {props.answers.map(answer =>
                <Answer
                  questionIsLocked={questionIsLocked}
                  questionAuthor={props.author_account_id}
                  markAsCorrect={this.markAsCorrect}
                  upvoteAnswer={this.upvote}
                  key={`answer_${answer.id}`}
                  {...answer}
                />
              )}
            </Col>
          </Row>
        }
        <AnswerForm questionId={this.props.match.params.questionId} />
      </>
    )
  }
}

const mapStateToProps = state => ({
  contract: state.commonReducer.contract,
  currentUser: state.commonReducer.currentUser,
  questions: state.questionsReducer.questions
})


export default withRouter(
  connect(
    mapStateToProps,
    {
      setQuestions
    }
  )(QuestionDetail)
)