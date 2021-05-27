import { combineReducers } from 'redux';
import {
  renderWatchListReducer,
  userReducer,
  watchListReducer,
} from './userReducer';
import {
  portfolioTransactionReducer,
  portfolioCoinNameReducer,
  getPortfolioTransactionsByCoinNameReducer,
} from './portfolioReducer';

const rootReducer = combineReducers({
  user: userReducer,
  watchList: watchListReducer,
  renderWatchList: renderWatchListReducer,
  portfolio: portfolioTransactionReducer,
  userCoinList: portfolioCoinNameReducer,
  transactionByCoinName: getPortfolioTransactionsByCoinNameReducer,
});

export default rootReducer;
