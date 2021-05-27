const mongoose = require('mongoose');

const CryptoSchema = mongoose.Schema(
  {
    data: [
      {
        id: Number,
        name: String,
        symbol: String,
        circulating_supply: Number,
        max_supply: Number,
        volume_24h:Number,
        market_cap:Number,
        percent_change_24h: Number,
        percent_change_30d: Number,
        percent_change_90d: Number,
        graphData: { price: Number, time: String },
      },
    ],
  },
  { timestamps: true }
);

const Crypto = mongoose.model('Crypto', CryptoSchema);

module.exports = Crypto;
