const { jsonEncoder: { JSON_V1 } } = require('zipkin');

class HttpLogger {
  constructor({endpoint, headers = {}, httpInterval = 1000, jsonEncoder = JSON_V1, timeout = 0}) {
    this.queue = [];
    this.endpoint = endpoint;
    this.jsonEncoder = jsonEncoder;

    this.headers = Object.assign({ 'content-type': 'application/json' }, headers);

    // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
    // only supported by node-fetch; silently ignored by browser fetch clients
    // @see https://github.com/bitinn/node-fetch#fetch-options
    this.timeout = timeout;

    this.timer = setInterval(this.processQueue.bind(this), httpInterval);
  }

  logSpan(span) {
    this.queue.push(this.jsonEncoder.encode(span));
  }

  processQueue() {
    if (this.queue.length > 0) {
      const postBody = `[${this.queue.join(',')}]`;
      wx.request({
        method: 'POST',
        url: this.endpoint,
        data: postBody,
        header: this.headers,
        timeout: this.timeout,
        success(response) {
          if (response.statusCode !== 202) {
            console.error('Unexpected response while sending Zipkin data, status:' +
              `${response.statusCode}, body: ${response.data}`);
          }
        },
        fail(error) {
          console.error('Error sending Zipkin data', error);
        },
      });

      this.queue.length = 0;
    }
  }
}

module.exports = HttpLogger;