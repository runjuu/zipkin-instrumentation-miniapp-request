# zipkin-instrumentation-miniapp-request
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Runjuu/zipkin-instrumentation-miniapp-request/pulls)
[![npm version](https://badge.fury.io/js/zipkin-instrumentation-miniapp-request.svg)](https://badge.fury.io/js/zipkin-instrumentation-miniapp-request)


基于 [zipkin-instrumentation-fetch](https://github.com/openzipkin/zipkin-js/tree/master/packages/zipkin-instrumentation-fetch) 对小程序的请求方法进行了封装
```bash
npm i zipkin-instrumentation-miniapp-request
```
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

const zipkinRequest = wrapRequest({ tracer, remoteServiceName: "服务器名称" });
// zipkinRequest 使用方式与 wx.request 一样
```

## 无法使用 npm ?
直接将[打包好的文件](https://github.com/Runjuu/zipkin-instrumentation-miniapp-request/blob/master/index.js)放入小程序开发目录，使用相对路径进行引用

###### [Zipkin.js](https://github.com/openzipkin/zipkin-js)
