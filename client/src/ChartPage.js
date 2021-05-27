/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import CryptoChart from './CryptoChart';
import {
  Stat,
  StatLabel,
  StatHelpText,
  StatArrow,
  StatGroup,
  Spinner,
  Heading,
  Tag,
  Text,
  Divider,
} from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const ChartPage = () => {
  const [data, setData] = useState([]);
  const [remainingData, setRemainingData] = useState();
  const user = useSelector((state) => state.user.data);


  let { id } = useParams();

  const fetchGraphData = async () => {

    const token=user?.token

    const config={
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(
      `http://localhost:9000/api/v1/dbData/${id}`,config
    );
    setRemainingData(data.particularCoinData);
    setData(data.todayPriceData);
  };

  useEffect(() => {
    fetchGraphData();
  }, []);
  return (
    <div className="chart-page">
      {remainingData ? (
        <>
          <div className="coin-information">
            <div className="coin-name">
              <Heading>{remainingData.name}</Heading>
              <Tag variant="solid" colorScheme="teal">
                {remainingData.symbol}
              </Tag>
            </div>
            <div className="coin-price">
              <Text fontSize="sm">
                {remainingData.name} Price{' '}
                <Tag variant="solid" size="sm" colorScheme="teal">
                  {remainingData.symbol}
                </Tag>
              </Text>
              <Heading>₹ {remainingData.graphData.price?.toFixed(2)}</Heading>
            </div>

            <div className="coin-stat">
              <StatGroup>
                <Stat>
                  <StatLabel>％24H</StatLabel>
                  <StatHelpText>
                    {remainingData.percent_change_24h>0?<StatArrow type="increase" />:<StatArrow type="decrease" />}
                    {remainingData.percent_change_24h
                      ? remainingData.percent_change_24h?.toFixed(2)
                      : 'NA'}
                    %
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>％30d</StatLabel>
                  <StatHelpText>
                  {remainingData.percent_change_30d>0?<StatArrow type="increase" />:<StatArrow type="decrease" />}
                    {remainingData.percent_change_30d
                      ? remainingData.percent_change_30d?.toFixed(2)
                      : 'NA'}
                    %
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>％90d</StatLabel>
                  <StatHelpText>
                  {remainingData.percent_change_90d>0?<StatArrow type="increase" />:<StatArrow type="decrease" />}
                    {remainingData.percent_change_90d
                      ? remainingData.percent_change_90d?.toFixed(2)
                      : 'NA'}
                    %
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </div>
          </div>
          <Divider colorScheme="teal" />
          <div className="coin-market">
            <div className="coin-market_cap">
              <Text fontSize="sm">Market Cap</Text>
              <Heading size="sm">
                ₹{' '}
                {remainingData.market_cap
                  ? remainingData.market_cap?.toFixed(2)
                  : 'NA'}
              </Heading>
            </div>
            <Divider colorScheme="teal" orientation="vertical" height="20vh" />
            <div className="coin-volume_24h">
              <Text fontSize="sm">
                Volume <Tag colorScheme="teal">24h</Tag>
              </Text>
              <Heading size="sm">
                ₹{' '}
                {remainingData.volume_24h
                  ? remainingData.volume_24h?.toFixed(2)
                  : 'NA'}
              </Heading>
            </div>
            <Divider colorScheme="teal" orientation="vertical" height="20vh" />

            <div className="coin-market_cap--info">
              <div className="coin-market_supply">
                <Text fontSize="sm">Circulating Supply</Text>
                <div className="coin-market-percentage">
                  <Heading size="xs">
                    {remainingData.circulating_supply
                      ? remainingData.circulating_supply?.toFixed(2)
                      : 'NA'}{' '}
                    {remainingData.symbol}{' '}
                  </Heading>
                </div>
              </div>
              <div className="coin-market_supply--info">
                <div>
                  <Text fontSize="sm">Max Supply</Text>
                  <Heading className="coin-market-cap--heading">
                    {remainingData.max_supply
                      ? remainingData.max_supply?.toFixed(2)
                      : 'NA'}{' '}
                    {remainingData.symbol}{' '}
                  </Heading>
                </div>
                <Divider width="100%" colorScheme="teal" />
                <div>
                  <Text fontSize="sm">Total Supply</Text>
                  <Heading className="coin-market-cap--heading">
                    {remainingData.circulating_supply
                      ? remainingData.circulating_supply?.toFixed(2)
                      : 'NA'}{' '}
                    {remainingData.symbol}{' '}
                  </Heading>
                </div>
              </div>
            </div>
          </div>
          <Divider colorScheme="teal" />
          <div className="rates-chart">
            <CryptoChart data={data} stat={remainingData.percent_change_24h} />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ChartPage;

// circulating_supply: 18713700
// graphData:
// price: 3057740.673992328
// time: "06:29"
// __proto__: Object
// id: 1
// name: "Bitcoin"
// percent_change_24h: 21.84782331
// percent_change_30d: -25.06492549
// percent_change_90d: -20.44205342
// symbol: "BTC"
// _id: "60a65d587bc1eb30556a2ec8"
// __proto__: Object
