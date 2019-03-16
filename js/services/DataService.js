import HttpService from './HttpService.js'

const COINS_URL = 'https://api.coinpaprika.com/v1/coins';
const getSingleCoinUrl = (id) => `https://api.coinpaprika.com/v1/coins/${id}/ohlcv/latest/`;

const DataService = {

  _sendRequest(url){
    let promise = {
      _successCallbacks: [],
      _resolve() {
        this._successCallbacks.forEach(callback => callback()); 
      },
      then(successCallback) {
        this._successCallback.push(successCallback);
      }
    }

    HttpService.sendRequest(url, data => {
      promise._resolve(data);
    });
    
    return promise;
  },

  getCurrencies(callback) {

    let promise = this._sendRequest(COINS_URL);

    promise.then(result => {
      console.log(result);
    })

    // const allCoinsPrices = allCoinsData
    //   .then(data => {
    //     data = data.slice(0, 10);
    //     const coinsIds = data.map(coin => coin.id);
    //     const coinsIdMap = coinsIds.reduce((acc, id) => {
    //         acc[getSingleCoinUrl(id)] = id;
    //         return acc;
    //       }, {});

    //     return HttpService._sendMultipleRequests(Object.keys(coinsIdMap));
    //   })
      
    //   .then(coins => {
    //     const dataWithPrice = data.map(item => {
    //       let itemUrl = getSingleCoinUrl(item.id);
    //       let itemPriceData = coins.find(coin => coin.url === itemUrl).data[0];
    //       item.price = itemPriceData.close;
    //       return item;
    //     });
    //     callback(dataWithPrice)
    //   })

    //   .catch(err => {});

    // HttpService._sendRequest(COINS_URL, data => {
    //   data = data.slice(0, 10);
    //   const coinsIds = data.map(coin => coin.id);
    //   const coinsIdMap = coinsIds.reduce((acc, id) => {
    //     acc[getSingleCoinUrl(id)] = id;
    //     return acc;
    //   }, {})

    //   HttpService._sendMultipleRequests(Object.keys(coinsIdMap), coins => {
    //     const dataWithPrice = data.map(item => {
    //       let itemUrl = getSingleCoinUrl(item.id);
    //       let itemPriceData = coins.find(coin => coin.url === itemUrl).data[0];
    //       item.price = itemPriceData.close;
    //       return item;
    //     });
    //     callback(dataWithPrice)
    //   });
    // });
  },

  // getCurrenciesPrices(data, callback) {
  //   const coinsIds = data.map(coin => coin.id);
  //   const coinsIdMap = coinsIds.reduce((acc, id) => {
  //     acc[getSingleCoinUrl(id)] = id;
  //     return acc;
  //   }, {})

  //   HttpService._sendMultipleRequests(Object.keys(coinsIdMap), coins => {
  //     const dataWithPrice = data.map(item => {
  //       let itemUrl = getSingleCoinUrl(item.id);
  //       let itemPriceData = coins.find(coin => coin.url === itemUrl).data[0];
  //       item.price = itemPriceData.close;
  //       return item;
  //     });
  //     callback(dataWithPrice)
  //   });
  // },
};

export default DataService;