const axios = require('axios');
const Crypto = require('../models/CryptoModel');

const getCryptoDataFromAPI = async (req, res, next) => {
  const { sortKey } = req.query;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-CMC_PRO_API_KEY': process.env.CRYPTO_API_KEY,
    },
  };
  const { data } = await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=INR&sort=${sortKey}&limit=400`,
    config
  );
  res.status(200).json({ status: 'Success', data });
};

const getCryptoDataFromDB = async (req, res) => {
  const coinId = req.params.id;
  const data = await Crypto.find({
    // createdAt: {
    //   $gte: new Date(new Date().setHours(00, 00, 00)),
    //   $lt: new Date(new Date().setHours(23, 59, 59)),
    // },
  })
    .sort('createdAt')
    .select('data -_id ')
    //.cache(req.user._id);

  const todayPriceData = [];
  let particularCoinData;

  data.forEach((d) => {
    particularCoinData = d.data.find((e) => e.id == coinId);
    todayPriceData.push(particularCoinData?.graphData);
  });

  if (todayPriceData.length === 0) {
    res.status(200).json({ status: 'Success', message: 'No Data' });
  } else {
    res
      .status(200)
      .json({ status: 'Success', todayPriceData, particularCoinData });
  }
};

module.exports = {
  getCryptoDataFromAPI,
  getCryptoDataFromDB,
};
