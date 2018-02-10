(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['zipkin-instrumentation-miniapp-request'] = factory());
}(this, (function () { 'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var None = {
  get type() {
    return 'None';
  },
  map: function map() {
    return None;
  },
  ifPresent: function ifPresent() {},
  flatMap: function flatMap() {
    return None;
  },
  getOrElse: function getOrElse(f) {
    if (f instanceof Function) {
      return f();
    } else {
      return f;
    }
  },
  equals: function equals(other) {
    return other.type === 'None';
  },
  toString: function toString() {
    return 'None';
  },

  get present() {
    return false;
  }
};

var Some = function () {
  function Some(value) {
    _classCallCheck(this, Some);

    this.value = value;
  }

  _createClass(Some, [{
    key: 'map',
    value: function map(f) {
      return new Some(f(this.value));
    }
  }, {
    key: 'ifPresent',
    value: function ifPresent(f) {
      return this.map(f);
    }
  }, {
    key: 'flatMap',
    value: function flatMap(f) {
      return this.map(f).getOrElse(None);
    }
  }, {
    key: 'getOrElse',
    value: function getOrElse() {
      return this.value;
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return other instanceof Some && other.value === this.value;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'Some(' + this.value.toString() + ')';
    }
  }, {
    key: 'present',
    get: function get() {
      return true;
    }
  }, {
    key: 'type',
    get: function get() {
      return 'Some';
    }
  }]);

  return Some;
}();

// Used to validate input arguments


function isOptional(data) {
  return data != null && (data instanceof Some || data === None || data.type === 'Some' || data.type === 'None');
}

function verifyIsOptional(data) {
  if (data == null) {
    throw new Error('Error: data is not Optional - it\'s null');
  }
  if (isOptional(data)) {
    if (isOptional(data.value)) {
      throw new Error('Error: data (' + data.value.toString() + ') is wrapped in Option twice');
    }
  } else {
    throw new Error('Error: data (' + data + ') is not an Option!');
  }
}

function fromNullable(nullable) {
  if (nullable != null) {
    return new Some(nullable);
  } else {
    return None;
  }
}

var Some_1 = Some;
var None_1 = None;
var verifyIsOptional_1 = verifyIsOptional;
var fromNullable_1 = fromNullable;

var option = {
	Some: Some_1,
	None: None_1,
	verifyIsOptional: verifyIsOptional_1,
	fromNullable: fromNullable_1
};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InetAddress = function () {
  function InetAddress(addr) {
    _classCallCheck$1(this, InetAddress);

    this.addr = addr;
  }

  // returns undefined if this isn't an IPv4 string


  _createClass$1(InetAddress, [{
    key: 'ipv4',
    value: function ipv4() {
      // coercing to int forces validation here
      var ipv4Int = this.toInt();
      if (ipv4Int && ipv4Int !== 0) {
        return this.addr;
      }
      return undefined;
    }
  }, {
    key: 'toInt',
    value: function toInt() {
      // e.g. 10.57.50.83
      // should become
      // 171520595
      var parts = this.addr.split('.');

      // The jshint tool always complains about using bitwise operators,
      // but in this case it's actually intentional, so we disable the warning:
      // jshint bitwise: false
      return parts[0] << 24 | parts[1] << 16 | parts[2] << 8 | parts[3];
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'InetAddress(' + this.addr + ')';
    }
  }]);

  return InetAddress;
}();

// In non-node environments we fallback to 127.0.0.1


InetAddress.getLocalAddress = function getLocalAddress() {
  var isNode = (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof process.on === 'function';
  if (!isNode) {
    return new InetAddress('127.0.0.1');
  }

  // eslint-disable-next-line global-require
  var networkAddress = commonjsRequire.call(null, 'network-address');
  return new InetAddress(networkAddress.ipv4());
};

var InetAddress_1 = InetAddress;

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var SimpleAnnotation = function () {
  function SimpleAnnotation() {
    _classCallCheck$2(this, SimpleAnnotation);
  }

  _createClass$2(SimpleAnnotation, [{
    key: 'toString',
    value: function toString() {
      return this.annotationType + '()';
    }
  }]);

  return SimpleAnnotation;
}();

var ClientSend = function (_SimpleAnnotation) {
  _inherits(ClientSend, _SimpleAnnotation);

  function ClientSend() {
    _classCallCheck$2(this, ClientSend);

    return _possibleConstructorReturn(this, (ClientSend.__proto__ || Object.getPrototypeOf(ClientSend)).apply(this, arguments));
  }

  return ClientSend;
}(SimpleAnnotation);

var ClientRecv = function (_SimpleAnnotation2) {
  _inherits(ClientRecv, _SimpleAnnotation2);

  function ClientRecv() {
    _classCallCheck$2(this, ClientRecv);

    return _possibleConstructorReturn(this, (ClientRecv.__proto__ || Object.getPrototypeOf(ClientRecv)).apply(this, arguments));
  }

  return ClientRecv;
}(SimpleAnnotation);

var ServerSend = function (_SimpleAnnotation3) {
  _inherits(ServerSend, _SimpleAnnotation3);

  function ServerSend() {
    _classCallCheck$2(this, ServerSend);

    return _possibleConstructorReturn(this, (ServerSend.__proto__ || Object.getPrototypeOf(ServerSend)).apply(this, arguments));
  }

  return ServerSend;
}(SimpleAnnotation);

var ServerRecv = function (_SimpleAnnotation4) {
  _inherits(ServerRecv, _SimpleAnnotation4);

  function ServerRecv() {
    _classCallCheck$2(this, ServerRecv);

    return _possibleConstructorReturn(this, (ServerRecv.__proto__ || Object.getPrototypeOf(ServerRecv)).apply(this, arguments));
  }

  return ServerRecv;
}(SimpleAnnotation);

function LocalOperationStart(name) {
  this.name = name;
}
LocalOperationStart.prototype.toString = function () {
  return 'LocalOperationStart("' + this.name + '")';
};

var LocalOperationStop = function (_SimpleAnnotation5) {
  _inherits(LocalOperationStop, _SimpleAnnotation5);

  function LocalOperationStop() {
    _classCallCheck$2(this, LocalOperationStop);

    return _possibleConstructorReturn(this, (LocalOperationStop.__proto__ || Object.getPrototypeOf(LocalOperationStop)).apply(this, arguments));
  }

  return LocalOperationStop;
}(SimpleAnnotation);

function Message(message) {
  this.message = message;
}
Message.prototype.toString = function () {
  return 'Message("' + this.message + '")';
};

function ServiceName(serviceName) {
  this.serviceName = serviceName;
}
ServiceName.prototype.toString = function () {
  return 'ServiceName("' + this.serviceName + '")';
};

function Rpc(name) {
  this.name = name;
}
Rpc.prototype.toString = function () {
  return 'Rpc("' + this.name + '")';
};

function ClientAddr(_ref) {
  var host = _ref.host,
      port = _ref.port;

  this.host = host;
  this.port = port;
}
ClientAddr.prototype.toString = function () {
  return 'ClientAddr(host="' + this.host + '", port=' + this.port + ')';
};

function ServerAddr(_ref2) {
  var serviceName = _ref2.serviceName,
      host = _ref2.host,
      port = _ref2.port;

  this.serviceName = serviceName;
  this.host = host || undefined;
  this.port = port || 0;
}
ServerAddr.prototype.toString = function () {
  return 'ServerAddr(serviceName="' + this.serviceName + '", host="' + this.host + '", port=' + this.port + ')';
};

function LocalAddr(_ref3) {
  var host = _ref3.host,
      port = _ref3.port;

  this.host = host || InetAddress_1.getLocalAddress();
  this.port = port || 0;
}
LocalAddr.prototype.toString = function () {
  return 'LocalAddr(host="' + this.host.toString() + '", port=' + this.port + ')';
};

function BinaryAnnotation(key, value) {
  this.key = key;
  this.value = value;
}
BinaryAnnotation.prototype.toString = function () {
  return 'BinaryAnnotation(' + this.key + '="' + this.value + '")';
};

var annotation = {
  ClientSend: ClientSend,
  ClientRecv: ClientRecv,
  ServerSend: ServerSend,
  ServerRecv: ServerRecv,
  Message: Message,
  ServiceName: ServiceName,
  Rpc: Rpc,
  ClientAddr: ClientAddr,
  ServerAddr: ServerAddr,
  LocalAddr: LocalAddr,
  BinaryAnnotation: BinaryAnnotation,
  LocalOperationStart: LocalOperationStart,
  LocalOperationStop: LocalOperationStop
};

Object.keys(annotation).forEach(function (key) {
  annotation[key].prototype.annotationType = key;
});

var annotation_1 = annotation;

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Some$1 = option.Some;
// Determines whether or not a traceId should be sampled.
// If no sample decision is already made (by a debug flag, or
// the "sampled" property is set), it will use evaluator,
// which is a function traceId => Boolean, and returns true if
// the traceId should be sampled (stored in Zipkin).


var Sampler = function () {
  function Sampler(evaluator) {
    _classCallCheck$3(this, Sampler);

    this.evaluator = evaluator;
  }

  _createClass$3(Sampler, [{
    key: 'shouldSample',
    value: function shouldSample(traceId) {
      var _this = this;

      var result = traceId.sampled.getOrElse(function () {
        return _this.evaluator(traceId);
      });
      return new Some$1(result);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'Sampler(' + this.evaluator.toString() + ')';
    }
  }]);

  return Sampler;
}();

function neverSample(traceId) {
  // eslint-disable-line no-unused-vars
  return false;
}
neverSample.toString = function () {
  return 'never sample';
};

function alwaysSample(traceId) {
  // eslint-disable-line no-unused-vars
  return true;
}
alwaysSample.toString = function () {
  return 'always sample';
};

function makeCountingEvaluator(sampleRate) {
  if (sampleRate <= 0) {
    return neverSample;
  } else if (sampleRate >= 1) {
    return alwaysSample;
  } else {
    var counter = 0;
    var limit = parseInt(1 / sampleRate);
    var counting = function counting(traceId) {
      // eslint-disable-line no-unused-vars
      counter = counter % limit;
      var shouldSample = counter === 0;
      counter++;
      return shouldSample;
    };
    counting.toString = function () {
      return 'countingSampler: sampleRate=' + sampleRate;
    };
    return counting;
  }
}

var CountingSampler = function (_Sampler) {
  _inherits$1(CountingSampler, _Sampler);

  function CountingSampler() {
    var sampleRate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    _classCallCheck$3(this, CountingSampler);

    return _possibleConstructorReturn$1(this, (CountingSampler.__proto__ || Object.getPrototypeOf(CountingSampler)).call(this, makeCountingEvaluator(sampleRate < 1 ? sampleRate : 1)));
  }

  return CountingSampler;
}(Sampler);

var sampler = { Sampler: Sampler, CountingSampler: CountingSampler, neverSample: neverSample, alwaysSample: alwaysSample };

var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Record = function () {
  function Record(_ref) {
    var traceId = _ref.traceId,
        timestamp = _ref.timestamp,
        annotation = _ref.annotation;

    _classCallCheck$4(this, Record);

    this.traceId = traceId;
    this.timestamp = timestamp;
    this.annotation = annotation;
  }

  _createClass$4(Record, [{
    key: "toString",
    value: function toString() {
      return "Record(traceId=" + this.traceId.toString() + ", annotation=" + this.annotation.toString() + ")";
    }
  }]);

  return Record;
}();

var record = Record;

var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Some$2 = option.Some;
var None$1 = option.None;
var verifyIsOptional$1 = option.verifyIsOptional;

var TraceId = function () {
  function TraceId(params) {
    _classCallCheck$5(this, TraceId);

    var _params$traceId = params.traceId,
        traceId = _params$traceId === undefined ? None$1 : _params$traceId,
        _params$parentId = params.parentId,
        parentId = _params$parentId === undefined ? None$1 : _params$parentId,
        spanId = params.spanId,
        _params$sampled = params.sampled,
        sampled = _params$sampled === undefined ? None$1 : _params$sampled,
        _params$flags = params.flags,
        flags = _params$flags === undefined ? 0 : _params$flags;

    verifyIsOptional$1(traceId);
    verifyIsOptional$1(parentId);
    verifyIsOptional$1(sampled);
    this._traceId = traceId;
    this._parentId = parentId;
    this._spanId = spanId;
    this._sampled = sampled;
    this._flags = flags;
  }

  _createClass$5(TraceId, [{
    key: 'isDebug',
    value: function isDebug() {
      // The jshint tool always complains about using bitwise operators,
      // but in this case it's actually intentional, so we disable the warning:
      // jshint bitwise: false
      return (this._flags & 1) === 1;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'TraceId(spanId=' + this.spanId.toString() + (', parentId=' + this.parentId.toString()) + (', traceId=' + this.traceId.toString() + ')');
    }
  }, {
    key: 'spanId',
    get: function get() {
      return this._spanId;
    }
  }, {
    key: 'parentId',
    get: function get() {
      return this._parentId.getOrElse(this.spanId);
    }
  }, {
    key: 'traceId',
    get: function get() {
      return this._traceId.getOrElse(this.parentId);
    }
  }, {
    key: 'sampled',
    get: function get() {
      return this.isDebug() ? new Some$2(true) : this._sampled;
    }
  }, {
    key: 'flags',
    get: function get() {
      return this._flags;
    }
  }]);

  return TraceId;
}();

var TraceId_1 = TraceId;

// === Generate a random 64-bit number in fixed-length hex format
function randomTraceId() {
  var digits = '0123456789abcdef';
  var n = '';
  for (var i = 0; i < 16; i++) {
    var rand = Math.floor(Math.random() * 16);
    n += digits[rand];
  }
  return n;
}

var randomTraceId_1 = randomTraceId;

var hrTimeSupport = typeof process !== 'undefined' && process.hrtime;

// since hrtime isn't available, we can ignore the input parameters
function nowLegacy() {
  return Date.now() * 1000;
}

function nowHrTime(startTimestamp, startTick) {
  if (startTimestamp && startTick) {
    var hrtime = process.hrtime(startTick);
    var elapsedMicros = Math.floor(hrtime[0] * 1000000 + hrtime[1] / 1000);
    return startTimestamp + elapsedMicros;
  } else {
    return Date.now() * 1000;
  }
}

// Returns the current time in epoch microseconds
// if startTimestamp and startTick are present, process.hrtime is used
// See https://nodejs.org/api/process.html#process_process_hrtime_time
var now = hrTimeSupport ? nowHrTime : nowLegacy;
var hrtime = hrTimeSupport ? function () {
  return process.hrtime();
} : function () {
  return undefined;
};

var time = {
	now: now,
	hrtime: hrtime
};

function Endpoint(_ref) {
  var serviceName = _ref.serviceName,
      ipv4 = _ref.ipv4,
      port = _ref.port;

  this.setServiceName(serviceName);
  this.setIpv4(ipv4);
  this.setPort(port);
}
Endpoint.prototype.setServiceName = function setServiceName(serviceName) {
  // In zipkin, names are lowercase. This eagerly converts to alert users early.
  this.serviceName = serviceName ? serviceName.toLocaleLowerCase() : undefined;
};
Endpoint.prototype.setIpv4 = function setIpv4(ipv4) {
  this.ipv4 = ipv4;
};
Endpoint.prototype.setPort = function setPort(port) {
  this.port = port || undefined;
};
Endpoint.prototype.isEmpty = function isEmpty() {
  return this.serviceName === undefined && this.ipv4 === undefined && this.port === undefined;
};

function Annotation(timestamp, value) {
  this.timestamp = timestamp;
  this.value = value;
}
Annotation.prototype.toString = function toString() {
  return 'Annotation(value="' + this.value + '")';
};

function Span(traceId) {
  var _this = this;

  this.traceId = traceId.traceId;
  traceId._parentId.ifPresent(function (id) {
    _this.parentId = id;
  });
  this.id = traceId.spanId;
  this.name = undefined; // no default
  this.kind = undefined; // no default
  this.timestamp = undefined;
  this.duration = undefined;
  this.localEndpoint = undefined; // no default
  this.remoteEndpoint = undefined; // no default
  this.annotations = [];
  this.tags = {};
  this.debug = traceId.isDebug();
  this.shared = false;
}

Span.prototype.setName = function setName(name) {
  // In zipkin, names are lowercase. This eagerly converts to alert users early.
  this.name = name ? name.toLocaleLowerCase() : undefined;
};
Span.prototype.setKind = function setKind(kind) {
  this.kind = kind;
};
Span.prototype.setTimestamp = function setTimestamp(timestamp) {
  this.timestamp = timestamp;
};
Span.prototype.setDuration = function setDuration(duration) {
  // Due to rounding errors, a fraction ends up as zero, so check undefined
  if (typeof duration !== 'undefined') {
    this.duration = Math.max(duration, 1);
  }
};
Span.prototype.setLocalEndpoint = function setLocalEndpoint(ep) {
  if (ep && !ep.isEmpty()) {
    this.localEndpoint = ep;
  } else {
    this.localEndpoint = undefined;
  }
};
Span.prototype.setRemoteEndpoint = function setRemoteEndpoint(ep) {
  if (ep && !ep.isEmpty()) {
    this.remoteEndpoint = ep;
  } else {
    this.remoteEndpoint = undefined;
  }
};
Span.prototype.addAnnotation = function addAnnotation(timestamp, value) {
  this.annotations.push(new Annotation(timestamp, value));
};
Span.prototype.putTag = function putTag(key, value) {
  this.tags[key] = value;
};
Span.prototype.setDebug = function setDebug(debug) {
  this.debug = debug;
};
Span.prototype.setShared = function setShared(shared) {
  this.shared = shared;
};
Span.prototype.toString = function toString() {
  var annotations = this.annotations.map(function (a) {
    return a.toString();
  }).join(', ');
  return 'Span(id=' + this.traceId + ', annotations=[' + annotations + '])';
};

var Endpoint_1 = Endpoint;
var Span_1 = Span;

var model = {
	Endpoint: Endpoint_1,
	Span: Span_1
};

var isPromise_1 = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var None$2 = option.None;
var Some$3 = option.Some;
var fromNullable$1 = option.fromNullable;

var Sampler$1 = sampler.Sampler;
var alwaysSample$1 = sampler.alwaysSample;






var now$1 = time.now;
var hrtime$1 = time.hrtime;

var Endpoint$1 = model.Endpoint;



function requiredArg(name) {
  throw new Error('Tracer: Missing required argument ' + name + '.');
}

var Tracer = function () {
  function Tracer(_ref) {
    var _ref$ctxImpl = _ref.ctxImpl,
        ctxImpl = _ref$ctxImpl === undefined ? requiredArg('ctxImpl') : _ref$ctxImpl,
        _ref$recorder = _ref.recorder,
        recorder = _ref$recorder === undefined ? requiredArg('recorder') : _ref$recorder,
        _ref$sampler = _ref.sampler,
        sampler$$1 = _ref$sampler === undefined ? new Sampler$1(alwaysSample$1) : _ref$sampler,
        _ref$traceId128Bit = _ref.traceId128Bit,
        traceId128Bit = _ref$traceId128Bit === undefined ? false : _ref$traceId128Bit,
        localServiceName = _ref.localServiceName,
        localEndpoint = _ref.localEndpoint;

    _classCallCheck$6(this, Tracer);

    this.recorder = recorder;
    this.sampler = sampler$$1;
    this.traceId128Bit = traceId128Bit;
    if (localEndpoint) {
      this._localEndpoint = localEndpoint;
    } else {
      this._localEndpoint = new Endpoint$1({
        serviceName: localServiceName || 'unknown'
      });
    }
    this._ctxImpl = ctxImpl;
    this._defaultTraceId = this.createRootId();
    this._startTimestamp = now$1();
    this._startTick = hrtime$1();
  }

  _createClass$6(Tracer, [{
    key: 'scoped',
    value: function scoped(callback) {
      return this._ctxImpl.scoped(callback);
    }
  }, {
    key: 'createRootId',
    value: function createRootId() {
      var rootSpanId = randomTraceId_1();
      var traceId = this.traceId128Bit ? new Some$3(randomTraceId_1() + rootSpanId) : None$2;
      var id = new TraceId_1({
        traceId: traceId,
        parentId: None$2,
        spanId: rootSpanId,
        sampled: None$2,
        flags: 0
      });
      id._sampled = this.sampler.shouldSample(id);
      return id;
    }
  }, {
    key: 'createChildId',
    value: function createChildId() {
      var currentId = fromNullable$1(this._ctxImpl.getContext());

      var childId = new TraceId_1({
        traceId: currentId.map(function (id) {
          return id.traceId;
        }),
        parentId: currentId.map(function (id) {
          return id.spanId;
        }),
        spanId: randomTraceId_1(),
        sampled: currentId.flatMap(function (id) {
          return id.sampled;
        }),
        flags: currentId.map(function (id) {
          return id.flags;
        }).getOrElse(0)
      });
      if (childId.sampled.present === false) {
        childId._sampled = this.sampler.shouldSample(childId);
      }
      return childId;
    }

    // creates a span, timing the given callable, adding any error as a tag
    // if the callable returns a promise, a span stops after the promise resolves

  }, {
    key: 'local',
    value: function local(operationName, callable) {
      var _this = this;

      if (typeof callable !== 'function') {
        throw new Error('you must pass a function');
      }
      return this.scoped(function () {
        var traceId = _this.createChildId();
        _this.setId(traceId);
        _this.recordServiceName(_this._localEndpoint.serviceName);
        _this.recordAnnotation(new annotation_1.LocalOperationStart(operationName));

        var result = void 0;
        try {
          result = callable();
        } catch (err) {
          _this.recordBinary('error', err.message ? err.message : err.toString());
          _this.recordAnnotation(new annotation_1.LocalOperationStop());
          throw err;
        }

        // Finish the span on a synchronous success
        if (!isPromise_1(result)) {
          _this.recordAnnotation(new annotation_1.LocalOperationStop());
          return result;
        }

        if (!traceId.sampled.getOrElse(false)) {
          return result; // no need to stop as it was never started
        }

        // At this point we know we are sampled. Explicitly record against the ID
        var explicitRecord = function explicitRecord(annotation) {
          return _this.recorder.record(new record({
            traceId: traceId,
            timestamp: now$1(_this._startTimestamp, _this._startTick),
            annotation: annotation
          }));
        };

        // Ensure the span representing the promise completes
        return result.then(function (output) {
          explicitRecord(new annotation_1.LocalOperationStop());
          return output;
        }).catch(function (err) {
          var message = err.message ? err.message : err.toString();
          explicitRecord(new annotation_1.BinaryAnnotation('error', message));
          explicitRecord(new annotation_1.LocalOperationStop());
          throw err;
        });
      });
    }
  }, {
    key: 'letChildId',
    value: function letChildId(callable) {
      var _this2 = this;

      return this.scoped(function () {
        var traceId = _this2.createChildId();
        _this2.setId(traceId);
        return callable(traceId);
      });
    }
  }, {
    key: 'setId',
    value: function setId(traceId) {
      this._ctxImpl.setContext(traceId);
    }
  }, {
    key: 'recordAnnotation',
    value: function recordAnnotation(annotation) {
      var _this3 = this;

      this.id.sampled.ifPresent(function (sampled) {
        // sampled present is different than sampled == true
        if (!sampled) return;
        _this3.recorder.record(new record({
          traceId: _this3.id,
          timestamp: now$1(_this3._startTimestamp, _this3._startTick),
          annotation: annotation
        }));
      });
    }
  }, {
    key: 'recordMessage',
    value: function recordMessage(message) {
      this.recordAnnotation(new annotation_1.Message(message));
    }
  }, {
    key: 'recordServiceName',
    value: function recordServiceName(serviceName) {
      this.recordAnnotation(new annotation_1.ServiceName(serviceName));
    }
  }, {
    key: 'recordRpc',
    value: function recordRpc(name) {
      this.recordAnnotation(new annotation_1.Rpc(name));
    }
  }, {
    key: 'recordClientAddr',
    value: function recordClientAddr(ia) {
      this.recordAnnotation(new annotation_1.ClientAddr(ia));
    }
  }, {
    key: 'recordServerAddr',
    value: function recordServerAddr(ia) {
      this.recordAnnotation(new annotation_1.ServerAddr(ia));
    }
  }, {
    key: 'recordLocalAddr',
    value: function recordLocalAddr(ia) {
      this.recordAnnotation(new annotation_1.LocalAddr(ia));
    }
  }, {
    key: 'recordBinary',
    value: function recordBinary(key, value) {
      this.recordAnnotation(new annotation_1.BinaryAnnotation(key, value));
    }
  }, {
    key: 'writeIdToConsole',
    value: function writeIdToConsole(message) {
      /* eslint-disable no-console */
      console.log(message + ': ' + this.id.toString());
    }
  }, {
    key: 'id',
    get: function get() {
      return this._ctxImpl.getContext() || this._defaultTraceId;
    }
  }, {
    key: 'localEndpoint',
    get: function get() {
      return this._localEndpoint;
    }
  }]);

  return Tracer;
}();

var tracer = Tracer;

var _createClass$7 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var explicitContext = function () {
  function ExplicitContext() {
    _classCallCheck$7(this, ExplicitContext);

    this.currentCtx = null;
  }

  _createClass$7(ExplicitContext, [{
    key: "setContext",
    value: function setContext(ctx) {
      this.currentCtx = ctx;
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.currentCtx;
    }
  }, {
    key: "scoped",
    value: function scoped(callable) {
      var prevCtx = this.currentCtx;
      var result = callable();
      this.currentCtx = prevCtx;
      return result;
    }
  }, {
    key: "letContext",
    value: function letContext(ctx, callable) {
      var _this = this;

      return this.scoped(function () {
        _this.setContext(ctx);
        return callable();
      });
    }
  }]);

  return ExplicitContext;
}();

var noop = function createNoopTracer() {
  var recorder = {
    record: function record() {}
  };
  var ctxImpl = new explicitContext();
  return new tracer({ recorder: recorder, ctxImpl: ctxImpl });
};

var httpHeaders = {
  TraceId: 'X-B3-TraceId',
  SpanId: 'X-B3-SpanId',
  ParentSpanId: 'X-B3-ParentSpanId',
  Sampled: 'X-B3-Sampled',
  Flags: 'X-B3-Flags'
};

var _createClass$8 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var now$2 = time.now;
var hrtime$2 = time.hrtime;

var Span$1 = model.Span;
var Endpoint$2 = model.Endpoint;

function PartialSpan(traceId) {
  this.traceId = traceId;
  this.startTimestamp = now$2();
  this.startTick = hrtime$2();
  this.delegate = new Span$1(traceId);
  this.localEndpoint = new Endpoint$2({});
}
PartialSpan.prototype.finish = function finish() {
  if (this.endTimestamp) {
    return;
  }
  this.endTimestamp = now$2(this.startTimestamp, this.startTick);
};

var BatchRecorder = function () {
  function BatchRecorder(_ref) {
    var _this = this;

    var logger = _ref.logger,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === undefined ? 60 * 1000000 : _ref$timeout;

    _classCallCheck$8(this, BatchRecorder);

    this.logger = logger;
    this.timeout = timeout;
    this.partialSpans = new Map();

    // read through the partials spans regularly
    // and collect any timed-out ones
    var timer = setInterval(function () {
      _this.partialSpans.forEach(function (span, id) {
        if (_this._timedOut(span)) {
          _this._writeSpan(id);
        }
      });
    }, 1000);
    if (timer.unref) {
      // unref might not be available in browsers
      timer.unref(); // Allows Node to terminate instead of blocking on timer
    }
  }

  _createClass$8(BatchRecorder, [{
    key: '_writeSpan',
    value: function _writeSpan(id) {
      var span = this.partialSpans.get(id);

      // TODO(adriancole) refactor so this responsibility isn't in writeSpan
      if (span === undefined) {
        // Span not found.  Could have been expired.
        return;
      }

      // ready for garbage collection
      this.partialSpans.delete(id);

      var spanToWrite = span.delegate;
      spanToWrite.setLocalEndpoint(span.localEndpoint);
      if (span.endTimestamp) {
        spanToWrite.setTimestamp(span.startTimestamp);
        spanToWrite.setDuration(span.endTimestamp - span.startTimestamp);
      }
      this.logger.logSpan(spanToWrite);
    }
  }, {
    key: '_updateSpanMap',
    value: function _updateSpanMap(id, updater) {
      var span = void 0;
      if (this.partialSpans.has(id)) {
        span = this.partialSpans.get(id);
      } else {
        span = new PartialSpan(id);
      }
      updater(span);
      if (span.endTimestamp) {
        this._writeSpan(id);
      } else {
        this.partialSpans.set(id, span);
      }
    }
  }, {
    key: '_timedOut',
    value: function _timedOut(span) {
      return span.startTimestamp + this.timeout < now$2();
    }
  }, {
    key: 'record',
    value: function record(rec) {
      var id = rec.traceId;

      this._updateSpanMap(id, function (span) {
        switch (rec.annotation.annotationType) {
          case 'ClientSend':
            span.delegate.setKind('CLIENT');
            break;
          case 'ClientRecv':
            span.finish();
            span.delegate.setKind('CLIENT');
            break;
          case 'ServerSend':
            span.finish();
            span.delegate.setKind('SERVER');
            break;
          case 'ServerRecv':
            // TODO: only set this to false when we know we in an existing trace
            span.delegate.setShared(id.parentId !== id.spanId);
            span.delegate.setKind('CLIENT');
            break;
          case 'LocalOperationStart':
            span.delegate.setName(rec.annotation.name);
            break;
          case 'LocalOperationStop':
            span.finish();
            break;
          case 'Message':
            span.delegate.addAnnotation(rec.timestamp, rec.annotation.message);
            break;
          case 'Rpc':
            span.delegate.setName(rec.annotation.name);
            break;
          case 'ServiceName':
            span.localEndpoint.setServiceName(rec.annotation.serviceName);
            break;
          case 'BinaryAnnotation':
            span.delegate.putTag(rec.annotation.key, rec.annotation.value);
            break;
          case 'LocalAddr':
            span.localEndpoint.setIpv4(rec.annotation.host && rec.annotation.host.ipv4());
            span.localEndpoint.setPort(rec.annotation.port);
            break;
          case 'ServerAddr':
            span.delegate.setKind('CLIENT');
            span.delegate.setRemoteEndpoint(new Endpoint$2({
              serviceName: rec.annotation.serviceName,
              ipv4: rec.annotation.host && rec.annotation.host.ipv4(),
              port: rec.annotation.port
            }));
            break;
          default:
            break;
        }
      });
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'BatchRecorder()';
    }
  }]);

  return BatchRecorder;
}();

var batchRecorder = BatchRecorder;

var _createClass$9 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConsoleRecorder = function () {
  /* eslint-disable no-console */
  function ConsoleRecorder() {
    var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : console.log;

    _classCallCheck$9(this, ConsoleRecorder);

    this.logger = logger;
  }

  _createClass$9(ConsoleRecorder, [{
    key: 'record',
    value: function record(rec) {
      var id = rec.traceId;
      this.logger('Record at (spanId=' + id.spanId + ', parentId=' + id.parentId + ',' + (' traceId=' + id.traceId + '): ' + rec.annotation.toString()));
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'consoleTracer';
    }
  }]);

  return ConsoleRecorder;
}();

var consoleRecorder = ConsoleRecorder;

function appendZipkinHeaders(req, traceId) {
  var headers = req.headers || {};
  headers[httpHeaders.TraceId] = traceId.traceId;
  headers[httpHeaders.SpanId] = traceId.spanId;

  traceId._parentId.ifPresent(function (psid) {
    headers[httpHeaders.ParentSpanId] = psid;
  });
  traceId.sampled.ifPresent(function (sampled) {
    headers[httpHeaders.Sampled] = sampled ? '1' : '0';
  });

  return headers;
}

function addZipkinHeaders(req, traceId) {
  var headers = appendZipkinHeaders(req, traceId);
  return Object.assign({}, req, { headers: headers });
}

var request = {
  addZipkinHeaders: addZipkinHeaders
};

var _createClass$10 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$10(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Some$4 = option.Some;
var None$3 = option.None;




function stringToBoolean(str) {
  return str === '1' || str === 'true';
}

function stringToIntOption(str) {
  try {
    return new Some$4(parseInt(str));
  } catch (err) {
    return None$3;
  }
}

function containsRequiredHeaders(readHeader) {
  return readHeader(httpHeaders.TraceId) !== None$3 && readHeader(httpHeaders.SpanId) !== None$3;
}

function requiredArg$1(name) {
  throw new Error('HttpServerInstrumentation: Missing required argument ' + name + '.');
}

var HttpServerInstrumentation = function () {
  function HttpServerInstrumentation(_ref) {
    var _ref$tracer = _ref.tracer,
        tracer = _ref$tracer === undefined ? requiredArg$1('tracer') : _ref$tracer,
        _ref$serviceName = _ref.serviceName,
        serviceName = _ref$serviceName === undefined ? tracer.localEndpoint.serviceName : _ref$serviceName,
        _ref$port = _ref.port,
        port = _ref$port === undefined ? requiredArg$1('port') : _ref$port;

    _classCallCheck$10(this, HttpServerInstrumentation);

    this.tracer = tracer;
    this.serviceName = serviceName;
    this.port = port;
  }

  _createClass$10(HttpServerInstrumentation, [{
    key: '_createIdFromHeaders',
    value: function _createIdFromHeaders(readHeader) {
      if (containsRequiredHeaders(readHeader)) {
        var spanId = readHeader(httpHeaders.SpanId);
        return spanId.map(function (sid) {
          var traceId = readHeader(httpHeaders.TraceId);
          var parentSpanId = readHeader(httpHeaders.ParentSpanId);
          var sampled = readHeader(httpHeaders.Sampled);
          var flags = readHeader(httpHeaders.Flags).flatMap(stringToIntOption).getOrElse(0);
          return new TraceId_1({
            traceId: traceId,
            parentId: parentSpanId,
            spanId: sid,
            sampled: sampled.map(stringToBoolean),
            flags: flags
          });
        });
      } else {
        if (readHeader(httpHeaders.Flags) !== None$3) {
          var currentId = this.tracer.id;
          var idWithFlags = new TraceId_1({
            traceId: currentId.traceId,
            parentId: currentId.parentId,
            spanId: currentId.spanId,
            sampled: currentId.sampled,
            flags: readHeader(httpHeaders.Flags)
          });
          return new Some$4(idWithFlags);
        } else {
          return new Some$4(this.tracer.createRootId());
        }
      }
    }
  }, {
    key: 'recordRequest',
    value: function recordRequest(method, requestUrl, readHeader) {
      var _this = this;

      this._createIdFromHeaders(readHeader).ifPresent(function (id) {
        return _this.tracer.setId(id);
      });
      var id = this.tracer.id;

      this.tracer.recordServiceName(this.serviceName);
      this.tracer.recordRpc(method.toUpperCase());
      this.tracer.recordBinary('http.url', requestUrl);
      this.tracer.recordAnnotation(new annotation_1.ServerRecv());
      this.tracer.recordAnnotation(new annotation_1.LocalAddr({ port: this.port }));

      if (id.flags !== 0 && id.flags != null) {
        this.tracer.recordBinary(httpHeaders.Flags, id.flags.toString());
      }
      return id;
    }
  }, {
    key: 'recordResponse',
    value: function recordResponse(id, statusCode, error) {
      this.tracer.setId(id);
      this.tracer.recordBinary('http.status_code', statusCode.toString());
      if (error) {
        this.tracer.recordBinary('error', error.toString());
      }
      this.tracer.recordAnnotation(new annotation_1.ServerSend());
    }
  }]);

  return HttpServerInstrumentation;
}();

var httpServer = HttpServerInstrumentation;

var _createClass$11 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$11(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




function requiredArg$2(name) {
  throw new Error('HttpClientInstrumentation: Missing required argument ' + name + '.');
}

var HttpClientInstrumentation = function () {
  function HttpClientInstrumentation(_ref) {
    var _ref$tracer = _ref.tracer,
        tracer = _ref$tracer === undefined ? requiredArg$2('tracer') : _ref$tracer,
        _ref$serviceName = _ref.serviceName,
        serviceName = _ref$serviceName === undefined ? tracer.localEndpoint.serviceName : _ref$serviceName,
        remoteServiceName = _ref.remoteServiceName;

    _classCallCheck$11(this, HttpClientInstrumentation);

    this.tracer = tracer;
    this.serviceName = serviceName;
    this.remoteServiceName = remoteServiceName;
  }

  _createClass$11(HttpClientInstrumentation, [{
    key: 'recordRequest',
    value: function recordRequest(request$$1, url, method) {
      this.tracer.setId(this.tracer.createChildId());
      var traceId = this.tracer.id;

      this.tracer.recordServiceName(this.serviceName);
      this.tracer.recordRpc(method.toUpperCase());
      this.tracer.recordBinary('http.url', url);
      this.tracer.recordAnnotation(new annotation_1.ClientSend());
      if (this.remoteServiceName) {
        // TODO: can we get the host and port of the http connection?
        this.tracer.recordAnnotation(new annotation_1.ServerAddr({
          serviceName: this.remoteServiceName
        }));
      }

      return request.addZipkinHeaders(request$$1, traceId);
    }
  }, {
    key: 'recordResponse',
    value: function recordResponse(traceId, statusCode) {
      this.tracer.setId(traceId);
      this.tracer.recordBinary('http.status_code', statusCode.toString());
      this.tracer.recordAnnotation(new annotation_1.ClientRecv());
    }
  }, {
    key: 'recordError',
    value: function recordError(traceId, error) {
      this.tracer.setId(traceId);
      this.tracer.recordBinary('error', error.toString());
      this.tracer.recordAnnotation(new annotation_1.ClientRecv());
    }
  }]);

  return HttpClientInstrumentation;
}();

var httpClient = HttpClientInstrumentation;

var instrumentation = {
  HttpServer: httpServer,
  HttpClient: httpClient
};

function toV1Endpoint(endpoint) {
  if (endpoint === undefined) {
    return undefined;
  }
  var res = {
    serviceName: endpoint.serviceName || '' // undefined is not allowed in v1
  };
  if (endpoint.ipv4) {
    res.ipv4 = endpoint.ipv4;
  }
  if (endpoint.port) {
    res.port = endpoint.port;
  }
  return res;
}

function toV1Annotation(ann, endpoint) {
  return {
    value: ann.value,
    timestamp: ann.timestamp,
    endpoint: endpoint
  };
}

function encodeV1(span) {
  var res = {
    traceId: span.traceId
  };
  if (span.parentId) {
    // instead of writing "parentId": NULL
    res.parentId = span.parentId;
  }
  res.id = span.id;
  res.name = span.name || ''; // undefined is not allowed in v1

  // Log timestamp and duration if this tracer started and completed this span.
  if (!span.shared) {
    res.timestamp = span.timestamp;
    res.duration = span.duration;
  }

  var jsonEndpoint = toV1Endpoint(span.localEndpoint);

  var beginAnnotation = void 0;
  var endAnnotation = void 0;
  var addressKey = void 0;
  switch (span.kind) {
    case 'CLIENT':
      beginAnnotation = span.timestamp ? 'cs' : undefined;
      endAnnotation = 'cr';
      addressKey = 'sa';
      break;
    case 'SERVER':
      beginAnnotation = span.timestamp ? 'sr' : undefined;
      endAnnotation = 'ss';
      addressKey = 'ca';
      break;
    default:
  }

  if (span.annotations.length > 0 || beginAnnotation) {
    // don't write empty array
    res.annotations = span.annotations.map(function (ann) {
      return toV1Annotation(ann, jsonEndpoint);
    });
  }

  if (beginAnnotation) {
    res.annotations.push({
      value: beginAnnotation,
      timestamp: span.timestamp,
      endpoint: jsonEndpoint
    });
    if (span.duration) {
      res.annotations.push({
        value: endAnnotation,
        timestamp: span.timestamp + span.duration,
        endpoint: jsonEndpoint
      });
    }
  }

  var keys = Object.keys(span.tags);
  if (keys.length > 0 || span.remoteEndpoint) {
    // don't write empty array
    res.binaryAnnotations = keys.map(function (key) {
      return {
        key: key,
        value: span.tags[key],
        endpoint: jsonEndpoint
      };
    });
  }

  if (span.remoteEndpoint) {
    var address = {
      key: addressKey,
      value: true,
      endpoint: toV1Endpoint(span.remoteEndpoint)
    };
    res.binaryAnnotations.push(address);
  }

  if (span.debug) {
    // instead of writing "debug": false
    res.debug = true;
  }
  return JSON.stringify(res);
}

function encodeV2(span) {
  var copy = {
    traceId: span.traceId
  };
  if (span.parentId) {
    copy.parentId = span.parentId;
  }
  copy.id = span.id;
  if (span.name) {
    copy.name = span.name;
  }
  if (span.kind) {
    copy.kind = span.kind;
  }
  if (span.timestamp) {
    copy.timestamp = span.timestamp;
  }
  if (span.duration) {
    copy.duration = span.duration;
  }
  if (span.localEndpoint) {
    copy.localEndpoint = span.localEndpoint;
  }
  if (span.remoteEndpoint) {
    copy.remoteEndpoint = span.remoteEndpoint;
  }
  if (span.annotations.length > 0) {
    copy.annotations = span.annotations;
  }
  if (Object.keys(span.tags).length > 0) {
    copy.tags = span.tags;
  }
  if (span.debug) {
    copy.debug = true;
  }
  if (span.shared) {
    copy.shared = true;
  }
  return JSON.stringify(copy);
}

var JSON_V1 = {
  encode: function encode(span) {
    return encodeV1(span);
  }
};
var JSON_V2 = {
  encode: function encode(span) {
    return encodeV2(span);
  }
};

var jsonEncoder = {
	JSON_V1: JSON_V1,
	JSON_V2: JSON_V2
};

var lib = {
  Tracer: tracer,
  createNoopTracer: noop,
  TraceId: TraceId_1,
  option: option,
  Annotation: annotation_1,
  InetAddress: InetAddress_1,
  HttpHeaders: httpHeaders,
  BatchRecorder: batchRecorder,
  ConsoleRecorder: consoleRecorder,
  ExplicitContext: explicitContext,
  sampler: sampler,
  Request: request,
  Instrumentation: instrumentation,
  model: model,
  jsonEncoder: jsonEncoder
};

const { jsonEncoder: { JSON_V1: JSON_V1$1 } } = lib;

class HttpLogger {
  constructor({endpoint, headers = {}, httpInterval = 1000, jsonEncoder = JSON_V1$1, timeout = 0}) {
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

const { Instrumentation: Instrumentation$1 } = lib;

function wrapRequest({tracer, serviceName, remoteServiceName}) {
  const instrumentation = new Instrumentation$1.HttpClient({tracer, serviceName, remoteServiceName});

  return function zipkinWXRequest(config) {
    tracer.scoped(() => {
      const method = config.method || 'GET';
      const zipkinOpts = instrumentation.recordRequest(config, config.url, method);
      const traceId = tracer.id;

      zipkinOpts.header = Object.assign({}, zipkinOpts.header, zipkinOpts.headers);

      const { success, fail } = zipkinOpts;

      const finalConfig = Object.assign({}, zipkinOpts, {
        success(res) {
          tracer.scoped(() => {
            instrumentation.recordResponse(traceId, res.statusCode);
          });
          success(res);
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

var index = {
  wrapRequest,
  zipkin: Object.assign({}, lib, { HttpLogger })
};

return index;

})));
