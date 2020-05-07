import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, Container, Row, Col } from 'react-bootstrap'

import Box from '../Box'

const QuestionListItem = ({ questionId, answers, reward, author_account_id, content }) => (
  <Card>
    <Card.Body>
      <Container>
        <Row>
          <Col xs={2}>
            <Box
              active={answers.filter(ans => ans.is_correct === true).length > 0}
              title="Reward"
              number={reward}
            />
          </Col>
          <Col>
            <Card.Text className="author">@{author_account_id}</Card.Text>
            <Card.Title>
              <Link to={`/${questionId}`}>{content}</Link>
            </Card.Title>
          </Col>
          <Col xs={2}>
            <div className="box">
              <span>Answers:</span>
              <span className="number">{answers.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </Card.Body>
  </Card>
)

QuestionListItem.propTypes = {
  questionId: PropTypes.string.isRequired,
  reward: PropTypes.number.isRequired,
  author_account_id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.object),
}

QuestionListItem.defaultProps = {
  answers: [],
}

export default QuestionListItem
