import { ACTION_SET_SCORE, ACTION_SET_ORDER } from "../actions";

const initialState = {
    score: [],
    order: 0
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_SET_SCORE: {
        return {
          ...state,
          score: action.payload
        }
      }

      case ACTION_SET_ORDER: {
        return {
          ...state,
          order: action.payload
        }
      }

      default: {
          return {
              ...state
          }
      }
    }
}

export default rootReducer;