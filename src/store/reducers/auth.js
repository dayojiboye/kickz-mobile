import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentUser: null,
  loading: false,
  hasFetched: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        hasFetched: true,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
