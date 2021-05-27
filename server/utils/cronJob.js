const cron = require('node-cron');
const Crypto = require('../models/CryptoModel');
const axios = require('axios');
const moment = require('moment');
//every 30 minutes
//*/30 * * * *
cron.schedule('*/30 * * * *', async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CMC_PRO_API_KEY': process.env.CRYPTO_API_KEY,
      },
    };
    const { data } = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=INR&sort=market_cap&limit=400`,
      config
    );
    const array = [];

    data.data.forEach((d) => {
      const obj = {
        id: d.id,
        name: d.name,
        symbol: d.symbol,
        circulating_supply: d.circulating_supply,
        max_supply: d.max_supply,
        volume_24h: d.quote.INR.volume_24h,
        market_cap: d.quote.INR.market_cap,
        percent_change_24h: d.quote.INR.percent_change_24h,
        percent_change_30d: d.quote.INR.percent_change_30d,
        percent_change_90d: d.quote.INR.percent_change_90d,
        graphData: {
          price: d.quote.INR.price,

          time: moment(d.quote.INR.last_updated).format('hh:mm a'),
        },
      };
      array.push(obj);
    });
    await Crypto.create({ data: array });
    console.log('done');
  } catch (err) {
    console.log(err);
  }
});
