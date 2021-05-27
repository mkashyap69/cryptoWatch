/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Divider,
  Tag,
  Heading,
  Button,
  TagLabel,
  Icon,
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon, StarIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { AiFillPieChart } from 'react-icons/ai';
import RenderTableData from './RenderTableData';
import axios from 'axios';

const MarketPriceTable = () => {
  const [cryptoObject, setCryptoObject] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [sortKey, setSortKey] = useState('market_cap');
  const history = useHistory();
  const user = useSelector((state) => state.user.data);

  const PER_PAGE = 100;
  let OFFSET = currentPage * PER_PAGE;
  const TOTAL_PAGE_COUNT = Math.ceil(cryptoObject?.length / PER_PAGE);

  const fetchRates = async () => {
    const token = user?.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:9000/api/v1/apiData?sortKey=${sortKey}`,
      config
    );

    setCryptoObject(data.data.data);
  };

  //For loading data firsts time
  useEffect(() => {
    fetchRates();
  }, [sortKey]);

  const handlePageClick = async ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const watchlistHandler = async () => {
    history.push('/watchlist');
  };

  const portfolioHandler = () => {
    history.push('/portfolio');
  };

  return (
    <div className="mainPage-bottom">
      {cryptoObject ? (
        <>
          <div className="table-head">
            <Heading size="lg" className="mainPage--heading">
              Today's Cryptocurrency Prices
            </Heading>
            <div className="watchlist-tag" onClick={watchlistHandler}>
              <Tag size="lg" variant="solid" colorScheme="teal">
                <StarIcon color="white" />
                <TagLabel>Watchlist</TagLabel>
              </Tag>
            </div>
            <div className="portfolio-tag" onClick={portfolioHandler}>
              <Tag size="lg" variant="solid" colorScheme="teal">
                <Icon color="white" as={AiFillPieChart} />
                <TagLabel>Portfolio</TagLabel>
              </Tag>
            </div>
            <div>
              <Menu>
                <MenuButton
                  as={Button}
                  color="teal"
                  rightIcon={<ChevronDownIcon />}
                  size="md"
                >
                  {sortKey ? `Sort By: ${sortKey}` : 'Sort By'}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setSortKey('market_cap')}>
                    Market Cap
                  </MenuItem>
                  <MenuItem onClick={() => setSortKey('name')}>Name</MenuItem>
                  <MenuItem onClick={() => setSortKey('price')}>Price</MenuItem>
                  <MenuItem onClick={() => setSortKey('percent_change_24h')}>
                    % 24H
                  </MenuItem>
                </MenuList>
              </Menu>
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
                  OFFSET={OFFSET}
                  PER_PAGE={PER_PAGE}
                />
              </Tbody>
            </Table>
          </div>
          <Divider />
          <ReactPaginate
            previousLabel={'← Previous'}
            nextLabel={'Next →'}
            pageCount={TOTAL_PAGE_COUNT}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link'}
            disabledClassName={'pagination__link--disabled'}
            activeClassName={'pagination__link--active'}
          />
        </>
      ) : (
        <Spinner size="xl" color="teal" />
      )}
    </div>
  );
};

export default MarketPriceTable;
