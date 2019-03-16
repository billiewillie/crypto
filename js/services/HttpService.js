export default {
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
      this._sendRequest(url, data => {
        results.push({url, data});
        pendingRequestCount--;

        if(!pendingRequestCount) {
          callback(results);
        }
      })
    })
  },
}