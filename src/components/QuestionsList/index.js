import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { setQuestions } from '../../modules/questions'
import QuestionForm from '../QuestionForm'
import QuestionListItem from './item'


class QuestionList extends React.Component {

  static propTypes = {
    setQuestions: PropTypes.func.isRequired,
    contract: PropTypes.object.isRequired,
    questions: PropTypes.object,
    currentUser: PropTypes.object
  }

  static defaultProps = {
    questions: null,
    currentUser: null,
  }

  componentDidMount() {
    this.props.contract.list_questions()
      .then(response => this.props.setQuestions(response))
  }

  render() {
    return (
      <React.Fragment>
        {this.props.currentUser && <QuestionForm />}
        {this.props.questions &&
          <Row>
            <Col><h2>Questions:</h2></Col>
          </Row>
        }
        <Row>
          <Col>
            {
              this.props.questions &&
              Object
                .keys(this.props.questions)
                .slice(0)
                .reverse()
                .map(questionId =>
                  <QuestionListItem
                    key={`question_${questionId}`}
                    questionId={questionId}
                    {...this.props.questions[questionId]} />
                )
            }
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  contract: state.commonReducer.contract,
  currentUser: state.commonReducer.currentUser,
  questions: state.questionsReducer.questions,
})

export default connect(
  mapStateToProps,
  {
    setQuestions,
  }
)(QuestionList)