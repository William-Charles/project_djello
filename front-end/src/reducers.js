import * as Actions from "./actions";

const initialState = {
  loggedIn: true,
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
    case Actions.GET_BOARDS_SUCCESS:
      return {
        ...state,
        boards: action.data,
        isFetching: false
      };
    case Actions.CREATE_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.data],
        isFetching: false
      };
    case Actions.CREATE_CARD:
      return {
        ...state,
        boards: state.boards.map(board => {
          if (board.title === action.data.parent) {
            board.cards = [...board.cards, action.data];
          }
          return board;
        }),
        isFetching: false
      };
    default:
      return {
        ...state
      };
  }
}
