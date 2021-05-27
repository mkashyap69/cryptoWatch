/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Tr, Td, Tag, Tooltip, useToast } from '@chakra-ui/react';
import moment from 'moment';
import convertingINR from './utils/convertingINR';
import { useHistory } from 'react-router-dom';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { addToWatchListAction } from './redux/actions/action';

const RenderTableData = ({ cryptoObject, OFFSET, PER_PAGE }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [watchListed, setWatchListed] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (window.location.pathname === '/watchlist') {
      setWatchListed(true);
    }
  }, [window.location.pathname]);

  const chartView = (id) => {
    history.push(`/chart/${id}`);
  };

  const addToWatchlist = (id) => {
    dispatch(addToWatchListAction(id)).then(() => {
      toast({
        title: 'Added To Watchlist',
        status: 'success',
        duration: 2000,
      });
    });
  };

  return (
    <>
      {cryptoObject.slice(OFFSET, OFFSET + PER_PAGE).map((crypto) => (
        <Tr key={Math.random()}>
          <Td>
            {watchListed ? (
              <Tooltip
                hasArrow
                label="In Your Watchlist"
                bg="white"
                color="teal"
              >
                <CheckIcon
                  color="teal"
                  className="watchlist-icon"
                  style={{ cursor: 'pointer' }}
                  //onClick={() => addToWatchlist(crypto.id)}
                />
              </Tooltip>
            ) : (
              <Tooltip
                hasArrow
                label="Add To Watchlist"
                bg="white"
                color="teal"
              >
                <AddIcon
                  color="teal"
                  className="watchlist-icon"
                  style={{ cursor: 'pointer' }}
                  onClick={() => addToWatchlist(crypto.id)}
                />
              </Tooltip>
            )}
          </Td>
          <Td>{crypto.cmc_rank}</Td>
          <Td>{moment(crypto.quote.INR.last_updated).format('hh:mm a')}</Td>
          <Tooltip hasArrow label="Open Chart Info" bg="white" color="teal">
            <Td
              className="crypto-name-cell"
              onClick={() => chartView(crypto.id)}
            >
              <span className="crypto-name">{crypto.name}</span>{' '}
              <Tag variant="solid" colorScheme="teal">
                {crypto.symbol}
              </Tag>
            </Td>
          </Tooltip>
          <Td>₹ {convertingINR(crypto.quote.INR.market_cap)}</Td>
          <Td>₹ {convertingINR(crypto.quote.INR.price)}</Td>
          <Td isNumeric>
            {crypto.max_supply ? convertingINR(crypto.max_supply) : '--'}{' '}
            {crypto.symbol}
          </Td>
          {crypto.quote.INR.percent_change_24h > 0 ? (
            <Td style={{ color: 'green' }} isNumeric>
              ⬆️ {crypto.quote.INR.percent_change_24h}
            </Td>
          ) : (
            <Td style={{ color: 'red' }} isNumeric>
              ⬇️ {crypto.quote.INR.percent_change_24h}
            </Td>
          )}
          {crypto.quote.INR.percent_change_30d > 0 ? (
            <Td style={{ color: 'green' }} isNumeric>
              ⬆️ {crypto.quote.INR.percent_change_30d}
            </Td>
          ) : (
            <Td style={{ color: 'red' }} isNumeric>
              ⬇️ {crypto.quote.INR.percent_change_30d}
            </Td>
          )}
        </Tr>
      ))}
    </>
  );
};

export default RenderTableData;
