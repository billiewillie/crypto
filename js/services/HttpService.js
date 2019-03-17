export default {
  sendRequest(url) {
    return fetch(url).then(response => {
      return response.json();
    });
  },

  sendMultipleRequests(urls) {
    let requests = urls.map(url => this.sendRequest(url))
    return Promise.all(requests);
  },
}