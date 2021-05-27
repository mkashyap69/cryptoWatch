/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon, ArrowBackIcon, Icon, StarIcon } from '@chakra-ui/icons';
import { Heading } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Tag, TagLabel } from '@chakra-ui/tag';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AddToPortfolioModal from './AddToPortfolioModal';
import { getPortfolioTransactionsByCoinName } from './redux/actions/action';
import moment from 'moment';
import { Alert } from '@chakra-ui/alert';
import { AiFillPieChart } from 'react-icons/ai';

const PortfolioTransactionPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [portfolioOb, setPortfolioOb] = useState();
  const history = useHistory();
  const portfolio = useSelector(
    (state) => state.transactionByCoinName?.data?.data
  );
  const dispatch = useDispatch();
  const { coinName } = useParams();

  useEffect(() => {
    if (portfolio) {
      setPortfolioOb(portfolio);
    }
  }, [portfolio]);

  useEffect(() => {
    dispatch(getPortfolioTransactionsByCoinName(coinName));
  }, [coinName]);

  const watchlistHandler = () => {
    history.push('/watchlist');
  };

  const goToHomePage = () => {
    history.push('/market');
  };
  const portfolioHandler = () => {
    history.push('/portfolio');
  };
  return (
    <div className="portfolio-page">
      <div className="portfolio-page-head">
        <Heading className="mainPage--heading">Your Portfolio</Heading>
        <div className="portfolio-page-buttons">
          <div className="portfolio-tag" onClick={portfolioHandler}>
            <Tag size="lg" variant="solid" colorScheme="teal">
              <Icon color="white" as={AiFillPieChart} />
              <TagLabel>Portfolio</TagLabel>
            </Tag>
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
        <Heading size="md" className="portfolio-page-table-heading">
          Your Asset Transactions
        </Heading>
        {portfolioOb?.length !== 0 ? (
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
                <Th>Price (INR)</Th>
                <Th>Transaction</Th>
                <Th>Holdings</Th>
                <Th>Transaction Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {portfolioOb?.map((d) => (
                <Tr key={Math.random()}>
                  <Td>{d.coinName}</Td>
                  <Td>₹{d.coinPrice}</Td>

                  <Td>{d.transactionType}</Td>
                  <Td>{d.coinQuantity}</Td>
                  <Td>
                    {moment(d.transactionDate).format('DD/MM/YYYY HH:mm a')}
                  </Td>
                </Tr>
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
  );
};

export default PortfolioTransactionPage;

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
