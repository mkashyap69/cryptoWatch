/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Divider,
  Heading,
  Tag,
  TagLabel,
  Icon,
} from '@chakra-ui/react';

import { Spinner } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { AiFillPieChart } from 'react-icons/ai';

import RenderTableData from './RenderTableData';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router';
import axios from 'axios';
import { getRenderWatchListData } from './redux/actions/action';

const WatchListPage = () => {
  const [cryptoObject, setCryptoObject] = useState([]);
  const user = useSelector((state) => state.user.data);

  const watchListCryptoObject = useSelector(
    (state) => state.renderWatchList?.data?.data?.data
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWatchlistData = async () => {
      const token = user?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const watchlistData = await axios.get(
        'http://localhost:9000/api/v1/user/watchList',
        config
      );
      const watchListQueryIntoString =
        watchlistData.data.data.watchlist.toString();

      dispatch(getRenderWatchListData(watchListQueryIntoString));
    };
    fetchWatchlistData();
  }, []);

  useEffect(() => {
    if (watchListCryptoObject) {
      setCryptoObject(Object.values(watchListCryptoObject));
    }
  }, [watchListCryptoObject]);

  const goToHomePage = () => {
    history.push('/market');
  };

  const portfolioHandler = () => {
    history.push('/portfolio');
  };

  return (
    <div>
      {cryptoObject.length !== 0 ? (
        <>
          <div className="table-head">
            <Heading className="mainPage--heading">Your Watchlist</Heading>
            <div className="watchlist-page-buttons">
              <div className="home-button" onClick={goToHomePage}>
                <Tag size="lg" variant="solid" colorScheme="teal">
                  <ArrowBackIcon color="white" />
                  <TagLabel>Home Page</TagLabel>
                </Tag>
              </div>
              <div className="portfolio-tag" onClick={portfolioHandler}>
                <Tag size="lg" variant="solid" colorScheme="teal">
                  <Icon color="white" as={AiFillPieChart} />
                  <TagLabel>Portfolio</TagLabel>
                </Tag>
              </div>
            </div>
          </div>

          <div className="rates-table">
            <Table
              size="md"
              colorScheme="teal"
              variant="simple"
              placement="center"
            >
              <Thead color="grey">
                <Tr>
                  <Th></Th>
                  <Th>Rank</Th>
                  <Th>Time</Th>
                  <Th>Name / Symbol</Th>
                  <Th>Market Cap</Th>
                  <Th>Price (INR)</Th>
                  <Th isNumeric>Max Supply</Th>
                  <Th isNumeric>%24h</Th>
                  <Th isNumeric>%30d</Th>
                </Tr>
              </Thead>
              <Tbody>
                <RenderTableData
                  cryptoObject={cryptoObject}
                  OFFSET={0}
                  PER_PAGE={cryptoObject.length}
                />
              </Tbody>
            </Table>
          </div>
          <Divider />
        </>
      ) : (
        <Spinner size="xl" color="teal" />
      )}
    </div>
  );
};

export default WatchListPage;
