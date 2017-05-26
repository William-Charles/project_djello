export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST";
export const GET_LOGIN_FAILURE = "GET_LOGIN_FAILURE";

export const GET_BOARDS = "GET_BOARDS";
export const GET_BOARDS_SUCCESS = "GET_BOARDS_SUCCESS";

export const CREATE_BOARD = "CREATE_BOARD";
export const CREATE_CARD = "CREATE_CARD";

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

export function getBoardsSuccess(data) {
  return {
    type: GET_BOARDS_SUCCESS,
    data
  };
}

export function getBoards(data) {
  return dispatch => {
    dispatch(getLoginRequest());

    /////////////////////////////////////////////

    data.id = "c3409def3b5d2ae78b88d88ecfe94cb3";

    /////////////////////////////////////////////

    fetch(`/api/boards/${data.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        dispatch(getBoardsSuccess(json));
      })
      .catch(error => {
        dispatch(getLoginFailure(error));
      });
  };
}

export function createBoardSuccess(data) {
  return {
    type: CREATE_BOARD,
    data
  };
}

export function createBoard(data) {
  return dispatch => {
    let token = "c3409def3b5d2ae78b88d88ecfe94cb3";
    // Update the state so that it knows the request has begun
    dispatch(getLoginRequest());

    data.token = token;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      headers,
      method: "POST",
      body: JSON.stringify(data)
    };

    fetch(`/api/boards/new`, options)
      .then(response => {
        // If response not okay, throw an error
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        // Otherwise, extract the response into json
        return response.json();
      })
      .then(json => {
        // Dispatch success which adds the user.
        dispatch(createBoardSuccess(json));
      })
      .catch(error => {
        // Dispatch failure which sets the error in state
        dispatch(getLoginFailure(error));
      });
  };
}

export function createCard(data) {
  return {
    type: CREATE_CARD,
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
