const User = require('../models/UserModel');
const axios = require('axios');

const addToWatchList = async (req, res) => {
  const { coinId } = req.params;
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    {
      $addToSet: {
        watchlist: coinId,
      },
    },
    { upsert: true, returnOriginal: false }
  );

  res.status(200).json({
    status: 'Success',
    data: user,
  });
};

const getWatchListData = async (req, res) => {
  const { _id } = req.user;
  const userWatchlist = await User.findById(_id).select('watchlist')
  //.cache(_id);

  res.status(200).json({
    status: 'Success',
    data: userWatchlist,
  });
};

const renderWatchListData = async (req, res) => {
  const { watchList } = req.query;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-CMC_PRO_API_KEY': process.env.CRYPTO_API_KEY,
    },
  };

  const { data } = await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?convert=INR&id=${watchList}`,
    config
  );
  res.status(200).json({
    status: 'Success',
    data,
  });
};

module.exports = { addToWatchList, getWatchListData, renderWatchListData };
