const convertTransactionsToSummary = (portfolioTransactions, name) => {
  let arr = [];
  portfolioTransactions.forEach((d) => {
    if (d.coinName === name) {
      arr.push(d);
    }
  });

  let totalCoinQuant = 0;
  let totalCoinPrice = 0;
  let coin;
  arr.forEach((a) => {
    totalCoinQuant = totalCoinQuant + a.coinQuantity;
    totalCoinPrice = totalCoinPrice + a.coinPrice;
    coin = a.coinName;
  });

  let obj = {
    coin,
    totalCoinPrice,
    totalCoinQuant,
  };

  return obj;
};

export default convertTransactionsToSummary;
