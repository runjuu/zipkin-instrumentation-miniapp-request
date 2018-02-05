const zipkin = require('zipkin');
const HttpLogger = require('./httpLogger');

const { Instrumentation } = zipkin;

function wrapRequest({tracer, serviceName, remoteServiceName}) {
  const instrumentation = new Instrumentation.HttpClient({tracer, serviceName, remoteServiceName});

  return function zipkinWXRequest(config) {
    tracer.scoped(() => {
      const method = config.method || 'GET';
      const zipkinOpts = instrumentation.recordRequest(config, config.url, method);
      const traceId = tracer.id;

      Object.assign(zipkinOpts.header, zipkinOpts.headers);

      const { success, fail } = zipkinOpts;

      const finalConfig = Object.assign({}, zipkinOpts, {
        success(res) {
          tracer.scoped(() => {
            instrumentation.recordResponse(traceId, res.statusCode);
          });
          success(res)
        },
        fail(err) {
          tracer.scoped(() => {
            instrumentation.recordError(traceId, err);
          });
          fail(err);
        },
      });

      wx.request(finalConfig);
    });
  };
}

module.exports.wrapRequest = wrapRequest;
module.exports.zipkin = Object.assign({}, zipkin, {
  HttpLogger,
});