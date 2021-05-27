export const portfolioTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TO_PORTFOLIO_START':
      return { ...state, loading: true, error: null };
    case 'ADD_TO_PORTFOLIO_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_TO_PORTFOLIO_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };

    case 'GET_FROM_PORTFOLIO_START':
      return { ...state, loading: true, error: null };
    case 'GET_FROM_PORTFOLIO_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'GET_FROM_PORTFOLIO_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };

    default:
      return state;
  }
};

export const portfolioCoinNameReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_FROM_PORTFOLIO_COIN_START':
      return { ...state, loading: true, error: null };
    case 'GET_FROM_PORTFOLIO_COIN_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'GET_FROM_PORTFOLIO_COIN_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };

    default:
      return state;
  }
};

export const getPortfolioTransactionsByCoinNameReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case 'GET_FROM_PORTFOLIO_TRANSACTIONS_START':
      return { ...state, loading: true, error: null };
    case 'GET_FROM_PORTFOLIO_TRANSACTIONS_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'GET_FROM_PORTFOLIO_TRANSACTIONS_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };

    default:
      return state;
  }
};
