import * as Actions from "./actions";

const initialState = {
  loggedIn: false,
  boards: [],
  isFetching: false,
  error: null
};

export function djelloApp(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: true,
        error: null
      };
    case Actions.GET_LOGIN_SUCCESS:
      return {
        ...state,
        filteredResults: action.data,
        results: action.data,
        isFetching: false
      };
    case Actions.GET_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.GET_BOARDS:
      return {
        ...state,
        boards: action.data,
        isFetching: false
      };

    default:
      return {
        ...state
      };
  }
}
