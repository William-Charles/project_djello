export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST";
export const GET_LOGIN_FAILURE = "GET_LOGIN_FAILURE";
export const GET_BOARDS = "GET_BOARDS";

export function getLoginRequest(data) {
  return {
    type: GET_LOGIN_REQUEST
  };
}

export function getLoginFailure(error) {
  return {
    type: GET_LOGIN_FAILURE,
    error
  };
}

export function getLoginSuccess(data) {
  return {
    type: GET_LOGIN_SUCCESS,
    data
  };
}

export function getBoards(data) {
  return {
    type: GET_BOARDS,
    data
  };
}

// export function getStocks(date) {
//   return dispatch => {
//     dispatch(getStocksRequest());
//
//     fetch(`api/quandl/${date}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`${response.status}: ${response.statusText}`);
//         }
//         return response.json();
//       })
//       .then(json => {
//         dispatch(getStocksSuccess(json));
//       })
//       .catch(error => {
//         dispatch(getStocksFailure(error));
//       });
//   };
// }
//
// export function getInitialStocks() {
//   return dispatch => {
//     dispatch(getStocks(20160129));
//   };
// }
