import HttpService from './HttpService.js'

const COINS_URL = 'https://api.coinpaprika.com/v1/coins';
const getSingleCoinUrl = (id) => `https://api.coinpaprika.com/v1/coins/${id}/ohlcv/latest/`;

const DataService = {

  getCurrencies(callback) {

    HttpService._sendRequest(COINS_URL, data => {
      const firstTenData = data.slice(0, 10);
      // callback(firstTenData);
      DataService.getCurrenciesPrices(firstTenData, callback)
    });
  },

  getCurrenciesPrices(data, callback) {
    const coinsIds = data.map(coin => coin.id);
    const coinsIdMap = coinsIds.reduce((acc, id) => {
      acc[getSingleCoinUrl(id)] = id;
      return acc;
    }, {})

    HttpService._sendMultipleRequests(Object.keys(coinsIdMap), coins => {
      const dataWithPrice = data.map(item => {
        let itemUrl = getSingleCoinUrl(item.id);
        let itemPriceData = coins.find(coin => coin.url === itemUrl).data[0];
        item.price = itemPriceData.close;
        return item;
      });
      callback(dataWithPrice)
    })
  },
};

export default DataService;