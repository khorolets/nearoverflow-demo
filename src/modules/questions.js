const initialState = {
  questions: null,
}

const SET_QUESTIONS = 'Nearoverflow/questions/set_questions'

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      }
    default:
      return state
  }
}


export const setQuestions = questions => dispatch => {
  dispatch({
    type: SET_QUESTIONS,
    payload: questions,
  })
}