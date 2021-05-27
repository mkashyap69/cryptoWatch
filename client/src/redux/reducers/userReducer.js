export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'USER_LOGIN_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'USER_LOGIN_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };

    case 'GET_SESSION_USER_START':
      return { ...state, loading: true, error: null };
    case 'GET_SESSION_USER_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'GET_SESSION_USER_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };

    default:
      return state;
  }
};

export const watchListReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST_START':
      return { ...state, loading: true, error: null };
    case 'ADD_TO_WATCHLIST_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_TO_WATCHLIST_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };

    default:
      return state;
  }
};

export const renderWatchListReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_RENDER_WATCHLIST_START':
      return { ...state, loading: true, error: null };
    case 'GET_RENDER_WATCHLIST_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'GET_RENDER_WATCHLIST_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };

    default:
      return state;
  }
};
