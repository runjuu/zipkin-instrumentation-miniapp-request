# zipkin-instrumentation-miniapp-request
基于 [zipkin-instrumentation-fetch](https://github.com/openzipkin/zipkin-js/tree/master/packages/zipkin-instrumentation-fetch) 将 [wx.request](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html) 重新封装了一次

## 例子 🌰
```javascript
const { wrapRequest, zipkin } = require('zipkin-instrumentation-miniapp-request');

const {
  Tracer,
  BatchRecorder,
  ExplicitContext,
  HttpLogger
  jsonEncoder: { JSON_V2 },
} = zipkin;

const tracer = new Tracer({
  ctxImpl: new ExplicitContext(),
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: 'http://localhost:9411/api/v2/spans',
      jsonEncoder: JSON_V2,
    })
  }),
  localServiceName: '小程序名称'
});

const zipkinRequest = wrapRequest({ tracer, serviceName: "小程序名称", remoteServiceName: "服务器名称" });
// https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html
```

###### [Zipkin.js](https://github.com/openzipkin/zipkin-js)
