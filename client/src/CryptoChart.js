import React, { useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  
} from 'recharts';
import { Spinner } from '@chakra-ui/react';

const CryptoChart = ({ data, stat }) => {
  const [priceData, setpriceData] = useState([]);

  useEffect(() => {
    if (data) {
      const dailyData = data.length > 16 ? data.slice(data.length - 16) : data;
      setpriceData(dailyData);
    }
  }, [data]);

  return (
    <div className="cryptoChart">
      {data.length === 0 ? (
        <Spinner />
      ) : (
        <ResponsiveContainer>
          <AreaChart
            data={priceData}
            margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#2d797b"
              fillOpacity={1}
              fill={stat > 0 ? 'url(#colorInc)' : 'url(#colorDec)'}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CryptoChart;
