/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import MarketPriceTable from './Table';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChartPage from './ChartPage';
import HomePage from './HomePage';
import { useDispatch, useSelector } from 'react-redux';
import WatchListPage from './WatchListPage';
import PortfolioTransactionPage from './PortfolioTransactionPage';
import PortfolioSummaryPage from './PortfolioSummaryPage';
import Header from './Header';
import { useEffect } from 'react';
import { getUserByCookies } from './redux/actions/action';

function App() {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserByCookies());
  }, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route
            exact
            path="/market"
            render={() => (user ? <MarketPriceTable /> : <HomePage />)}
          />
          <Route
            path="/chart/:id"
            component={() => (user ? <ChartPage /> : <HomePage />)}
          />
          <Route
            path="/watchlist"
            component={() => (user ? <WatchListPage /> : <HomePage />)}
          />
          <Route
            path="/portfolio"
            exact
            component={() => (user ? <PortfolioSummaryPage /> : <HomePage />)}
          />
          <Route
            path="/portfolio/transactions/:coinName"
            component={() =>
              user ? <PortfolioTransactionPage /> : <HomePage />
            }
          />
          <Route component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
