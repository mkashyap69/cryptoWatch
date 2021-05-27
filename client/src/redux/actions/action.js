import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_START',
    });
    const { data } = await axios.post(
      'http://localhost:9000/api/v1/auth/login',
      { email, password },
      { withCredentials: true }
    );
    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error?.response?.data || error?.message,
    });
  }
};

export const getUserByCookies = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_SESSION_USER_START',
    });

    // const { token } = getState().user.data;

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    const { data } = await axios.get('http://localhost:9000/api/v1/auth/user', {
      withCredentials: true,
    });

    dispatch({
      type: 'GET_SESSION_USER_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_SESSION_USER_FAIL',
      payload: error?.response?.data || error?.message,
    });
  }
};

export const addToWatchListAction = (coinId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ADD_TO_WATCHLIST_START',
    });

    const { token } = getState().user.data;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:9000/api/v1/user/${coinId}`,
      {},
      config
    );

    dispatch({
      type: 'ADD_TO_WATCHLIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'ADD_TO_WATCHLIST_FAIL',
      payload: error?.message,
    });
  }
};

export const getRenderWatchListData =
  (watchListQueryIntoString) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'GET_RENDER_WATCHLIST_START',
      });

      const { token } = getState().user.data;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:9000/api/v1/user/renderWatchList?watchList=${watchListQueryIntoString}`,
        config
      );

      dispatch({
        type: 'GET_RENDER_WATCHLIST_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'GET_RENDER_WATCHLIST_FAIL',
        payload: error?.message,
      });
    }
  };

export const addToPortfolioTransactions =
  (obj) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ADD_TO_PORTFOLIO_START',
      });

      if (obj.transactionType === 'Sell') {
        obj.coinPrice = -obj.coinPrice;
        obj.coinQuantity = -obj.coinQuantity;
      }
      const { token, data } = getState().user.data;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { dat } = await axios.post(
        `http://localhost:9000/api/v1/portfolio/`,
        { ...obj, user: data._id },
        config
      );

      dispatch({
        type: 'ADD_TO_PORTFOLIO_SUCCESS',
        payload: dat,
      });
    } catch (error) {
      dispatch({
        type: 'ADD_TO_PORTFOLIO_FAIL',
        payload: error?.message,
      });
    }
  };

export const getPortfolioTransactions =
  (coinName) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'GET_FROM_PORTFOLIO_START',
      });

      const { token } = getState().user.data;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:9000/api/v1/portfolio/?coinName=${coinName}`,
        config
      );

      dispatch({
        type: 'GET_FROM_PORTFOLIO_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'GET_FROM_PORTFOLIO_FAIL',
        payload: error?.message,
      });
    }
  };

export const getPortfolioTransactionsByCoinName =
  (coinName) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'GET_FROM_PORTFOLIO_TRANSACTIONS_START',
      });

      const { token } = getState().user.data;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:9000/api/v1/portfolio/transactions/${coinName}`,
        config
      );

      dispatch({
        type: 'GET_FROM_PORTFOLIO_TRANSACTIONS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'GET_FROM_PORTFOLIO_TRANSACTIONS_FAIL',
        payload: error?.message,
      });
    }
  };

export const getUserCoinList = (coinName) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_FROM_PORTFOLIO_COIN_START',
    });

    const { token } = getState().user.data;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:9000/api/v1/portfolio/uniqueCoinName`,
      config
    );
    console.log(data);

    dispatch({
      type: 'GET_FROM_PORTFOLIO_COIN_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_FROM_PORTFOLIO_COIN_FAIL',
      payload: error?.message,
    });
  }
};
