const COINS_URL = 'https://api.coinpaprika.com/v1/coins';
const getSingleCoinUrl = (id) => `https://api.coinpaprika.com/v1/coins/${id}/ohlcv/latest/`;

const DataService = {

  _sendRequest(url, successCallback, method = 'GET') {

    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open(method, url);

    // 3. Отсылаем запрос
    xhr.send();

    xhr.onload = () => {
      // 4. Если код ответа сервера не 200, то это ошибка
      if (xhr.status != 200) {
        // обработать ошибку
        console.error( xhr.status + ': ' + xhr.statusText );
      } else {
        // вывести результат
        let responseData = JSON.parse(xhr.responseText); 
        successCallback(responseData);
      }
    }

  },

  _sendMultipleRequests(urls, callback) {
    let pendingRequestCount = urls.length;
    let results = [];

    urls.forEach(url => {
      results.push({url, data});
      pendingRequestCount--;

      if(!pendingRequestCount) {
        callback(results);
      }
    })
  },

  getCurrencies(callback) {

    DataService._sendRequest(COINS_URL, data => {
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

    DataService._sendMultipleRequests(Object.keys(coinsIdMap), coins => {
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