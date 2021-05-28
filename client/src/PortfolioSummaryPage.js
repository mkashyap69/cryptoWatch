/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon, ArrowBackIcon, StarIcon } from '@chakra-ui/icons';
import { Heading } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Tag, TagLabel } from '@chakra-ui/tag';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AddToPortfolioModal from './AddToPortfolioModal';
import {
  getPortfolioTransactions,
  getUserCoinList,
} from './redux/actions/action';
import { Alert } from '@chakra-ui/alert';
import convertTransactionsToSummary from './utils/convetTransactionsToSummary';
import { Tooltip } from '@chakra-ui/tooltip';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { Spinner } from '@chakra-ui/spinner';
import './css/Portfolio.css'

const PortfolioSummaryPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [portfolioSummaryOb, setPortfolioSummaryOb] = useState();
  const [priceOb, setPriceOb] = useState({});
  const [chartArray, setChartArray] = useState();

  const history = useHistory();
  const portfolio = useSelector((state) => state.portfolio?.data?.data);
  const userCoinList = useSelector((state) => state.userCoinList?.data?.data);
  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();
  const pieChartData = {};
  let arr = [];
  const priceObj = {};

  const fetchRates = async () => {
    const token = user?.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `/api/v1/apiData?sortKey=market_cap&limit=400`,
      config
    );

    data.data.data.forEach((d) => {
      priceObj[d.symbol] = d.quote.INR.price;
    });
    setPriceOb(priceObj);
  };

  useEffect(() => {
    portfolio?.forEach(({ coinName, total }) => {
      pieChartData[coinName] = total;
    });
  }, [portfolio]);

  useEffect(() => {
    if (portfolio) {
      userCoinList?.forEach((name) => {
        let newObj = convertTransactionsToSummary(portfolio, name);
        if (newObj.totalCoinPrice < 0) {
          newObj.totalCoinPrice = -newObj.totalCoinPrice;
        }
        arr.push(newObj);
      });

      let chartArray = [['coin', 'holdings']];

      arr.forEach((d) => {
        if (d.totalCoinQuant > 0) {
          let pushArray = [d.coin, d.totalCoinPrice];
          chartArray.push(pushArray);
        }
      });
      setChartArray(chartArray);

      setPortfolioSummaryOb(arr);
    }
  }, [portfolio, userCoinList]);

  useEffect(() => {
    portfolio?.forEach(({ coinName, total }) => {
      pieChartData[coinName] = total;
    });
  }, [portfolio]);

  useEffect(() => {
    fetchRates();
    dispatch(getPortfolioTransactions());
    dispatch(getUserCoinList());
  }, []);

  const watchlistHandler = () => {
    history.push('/watchlist');
  };

  const goToHomePage = () => {
    history.push('/');
  };

  const redirectToTransaction = (coinName) => {
    history.push(`/portfolio/transactions/${coinName}`);
  };
  return (
    <div className="portfolio-page">
      <div className="portfolio-page-head">
        <Heading className="mainPage--heading">Your Portfolio</Heading>
        <div className="portfolio-page-buttons">
          <div className="watchlist-tag" onClick={onOpen}>
            <Tag size="lg" variant="solid" colorScheme="teal">
              <AddIcon color="white" />
              <TagLabel>Add Transaction</TagLabel>
            </Tag>
            <AddToPortfolioModal isOpen={isOpen} onClose={onClose} />
          </div>
          <div className="watchlist-tag" onClick={watchlistHandler}>
            <Tag size="lg" variant="solid" colorScheme="teal">
              <StarIcon color="white" />
              <TagLabel>Watchlist</TagLabel>
            </Tag>
          </div>
          <div className="home-button" onClick={goToHomePage}>
            <Tag size="lg" variant="solid" colorScheme="teal">
              <ArrowBackIcon color="white" />
              <TagLabel>Home Page</TagLabel>
            </Tag>
          </div>
        </div>
      </div>
      <div className="portfolio-page-bottom">
        <div className="portfolio-page-chart">
          <Chart
            width={'100%'}
            height={'100%'}
            chartType="PieChart"
            loader={<Spinner />}
            data={chartArray}
            options={{
              title: '',
              is3D: true,
            }}
            rootProps={{ 'data-testid': '2' }}
          />
        </div>
        <div className="portfolio-summary-table">
          {portfolioSummaryOb?.length !== 0 ? (
            <Table
              size="lg"
              colorScheme="teal"
              variant="simple"
              placement="center"
              className="portfolio-page-table"
            >
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Total Holdings</Th>
                  <Th>Total Amount</Th>
                  <Th>Current Coin Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {portfolioSummaryOb?.map((d) => (
                  <Tooltip
                    hasArrow
                    label="See your transactions"
                    bg="white"
                    color="teal"
                    key={Math.random()}
                  >
                    <Tr
                      key={Math.random()}
                      onClick={() => redirectToTransaction(d.coin)}
                      className="portfolio-page-table-tr"
                    >
                      <Td>{d.coin}</Td>
                      <Td>
                        {d.totalCoinQuant} {d.coin}
                      </Td>
                      <Td>₹{d.totalCoinPrice}</Td>
                      <Td>₹{priceOb[d.coin]?.toFixed(2)}</Td>
                    </Tr>
                  </Tooltip>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Alert status="info" className="noTransaction-alert">
              Seems like there are no recent transactions !!! Click to add
              transaction
              <div className="watchlist-tag" onClick={onOpen}>
                <Tag size="lg" variant="solid" colorScheme="teal">
                  <AddIcon color="white" />
                  <TagLabel>Add Transaction</TagLabel>
                </Tag>
                <AddToPortfolioModal isOpen={isOpen} onClose={onClose} />
              </div>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryPage;

// {(
//   (priceOb[d.coinName]?.toFixed(2) * d.coinQuantity) /
//     d.total -
//   1 * 100
// ).toFixed(2) > 0 ? (
//   <Td style={{ color: 'green' }}>
//     ⬆️{' '}
//     {(
//       (priceOb[d.coinName]?.toFixed(2) * d.coinQuantity) /
//         d.total -
//       1 * 100
//     ).toFixed(2)}
//   </Td>
// ) : (
//   <Td style={{ color: 'red' }}>
//     ⬇️{' '}
//     {(
//       (priceOb[d.coinName]?.toFixed(2) * d.coinQuantity) /
//         d.total -
//       1 * 100
//     ).toFixed(2)}
//   </Td>
// )}

/* <div className="portfolio-page-bottom-left">
          <div className="portfolio-page-current">
            <div className="portfolio-page-current-head">
              <div className="portfolio-page-current-head-price">
                <Text size="xs">Current Balance</Text>
                <Heading size="xl">₹ 1000</Heading>
              </div>
              <div className="portfolio-page-current-head-tag">
                <Tag size="md" variant="solid" colorScheme="red">
                  <TriangleDownIcon />
                  <Heading size="sm">24.86</Heading>
                </Tag>
              </div>
            </div>
            <div className="portfolio-page-chart">
              <PieChart
                className="portfolio-page-chart-pie"
                width={730}
                height={250}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <Pie
                  data={data01}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={70}
                  fill="#81CA9C"
                  label
                >
                  {data01.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div> */
