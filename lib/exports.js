var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('@material-ui/core/Button');
var Dialog = require('@material-ui/core/Dialog');
var DialogTitle = require('@material-ui/core/DialogTitle');
var DialogActions = require('@material-ui/core/DialogActions');
var FormControlLabel = require('@material-ui/core/FormControlLabel');
var Switch = require('@material-ui/core/Switch');
var Radio = require('@material-ui/core/Radio');
var RadioGroup = require('@material-ui/core/RadioGroup');
var FormControl = require('@material-ui/core/FormControl');
var FormGroup = require('@material-ui/core/FormGroup');
var Checkbox = require('@material-ui/core/Checkbox');
var core = require('@material-ui/core');
var redux = require('redux');
var reactRedux = require('react-redux');
var ArrowRightIcon = require('@material-ui/icons/ArrowRight');
var FiberManualRecordRoundedIcon = require('@material-ui/icons/FiberManualRecordRounded');
var FormatColorFillRoundedIcon = require('@material-ui/icons/FormatColorFillRounded');
var PaletteIcon = require('@material-ui/icons/Palette');
var BorderColorRoundedIcon = require('@material-ui/icons/BorderColorRounded');
var FormatColorTextRoundedIcon = require('@material-ui/icons/FormatColorTextRounded');
var fabric = require('fabric');
var uuid = require('uuid');
var tinycolor = require('tinycolor2');
var require$$0 = require('js-binary-schema-parser/lib/schemas/gif');
var _jsBinarySchemaParser = require('js-binary-schema-parser');
var _uint = require('js-binary-schema-parser/lib/parsers/uint8');
var ResizeObserver = require('resize-observer-polyfill');
var makeStyles = require('@material-ui/core/styles/makeStyles');
var FontFaceObserver = require('fontfaceobserver');
var styles = require('@material-ui/core/styles');
var List = require('@material-ui/core/List');
var ListItem = require('@material-ui/core/ListItem');
var ListItemText = require('@material-ui/core/ListItemText');
var Menu = require('@material-ui/core/Menu');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var Dialog__default = /*#__PURE__*/_interopDefaultLegacy(Dialog);
var DialogTitle__default = /*#__PURE__*/_interopDefaultLegacy(DialogTitle);
var DialogActions__default = /*#__PURE__*/_interopDefaultLegacy(DialogActions);
var FormControlLabel__default = /*#__PURE__*/_interopDefaultLegacy(FormControlLabel);
var Switch__default = /*#__PURE__*/_interopDefaultLegacy(Switch);
var Radio__default = /*#__PURE__*/_interopDefaultLegacy(Radio);
var RadioGroup__default = /*#__PURE__*/_interopDefaultLegacy(RadioGroup);
var FormControl__default = /*#__PURE__*/_interopDefaultLegacy(FormControl);
var FormGroup__default = /*#__PURE__*/_interopDefaultLegacy(FormGroup);
var Checkbox__default = /*#__PURE__*/_interopDefaultLegacy(Checkbox);
var ArrowRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ArrowRightIcon);
var FiberManualRecordRoundedIcon__default = /*#__PURE__*/_interopDefaultLegacy(FiberManualRecordRoundedIcon);
var FormatColorFillRoundedIcon__default = /*#__PURE__*/_interopDefaultLegacy(FormatColorFillRoundedIcon);
var PaletteIcon__default = /*#__PURE__*/_interopDefaultLegacy(PaletteIcon);
var BorderColorRoundedIcon__default = /*#__PURE__*/_interopDefaultLegacy(BorderColorRoundedIcon);
var FormatColorTextRoundedIcon__default = /*#__PURE__*/_interopDefaultLegacy(FormatColorTextRoundedIcon);
var tinycolor__default = /*#__PURE__*/_interopDefaultLegacy(tinycolor);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var _jsBinarySchemaParser__default = /*#__PURE__*/_interopDefaultLegacy(_jsBinarySchemaParser);
var _uint__default = /*#__PURE__*/_interopDefaultLegacy(_uint);
var ResizeObserver__default = /*#__PURE__*/_interopDefaultLegacy(ResizeObserver);
var makeStyles__default = /*#__PURE__*/_interopDefaultLegacy(makeStyles);
var FontFaceObserver__default = /*#__PURE__*/_interopDefaultLegacy(FontFaceObserver);
var List__default = /*#__PURE__*/_interopDefaultLegacy(List);
var ListItem__default = /*#__PURE__*/_interopDefaultLegacy(ListItem);
var ListItemText__default = /*#__PURE__*/_interopDefaultLegacy(ListItemText);
var Menu__default = /*#__PURE__*/_interopDefaultLegacy(Menu);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var domain;

// This constructor is used to store event handlers. Instantiating this is
// faster than explicitly calling `Object.create(null)` to get a "clean" empty
// object (tested with v8 v4.9).
function EventHandlers() {}
EventHandlers.prototype = Object.create(null);

function EventEmitter() {
  EventEmitter.init.call(this);
}

// nodejs oddity
// require('events') === require('events').EventEmitter
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.usingDomains = false;

EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function() {
  this.domain = null;
  if (EventEmitter.usingDomains) {
    // if there is an active domain, then attach to it.
    if (domain.active ) ;
  }

  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = new EventHandlers();
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  domain = this.domain;

  // If there is no 'error' event listener then throw.
  if (doError) {
    er = arguments[1];
    if (domain) {
      if (!er)
        er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain;
      er.domainThrown = false;
      domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
    // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] :
                                          [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + type + ' listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }

  return target;
}
function emitWarning(e) {
  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || (list.listener && list.listener === listener)) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length; i-- > 0;) {
          if (list[i] === listener ||
              (list[i].listener && list[i].listener === listener)) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (list.length === 1) {
          list[0] = undefined;
          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type];
          }
        } else {
          spliceOne(list, position);
        }

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        for (var i = 0, key; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        do {
          this.removeListener(type, listeners[listeners.length - 1]);
        } while (listeners[0]);
      }

      return this;
    };

EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;

  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === 'function')
      ret = [evlistener.listener || evlistener];
    else
      ret = unwrapListeners(evlistener);
  }

  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

/**
 * This class is responsible for receiving remote events and translating that into
 * commands we can use to update the canvas. It needs to understand any optimizations
 * the PaintEventSerializer might do and decode those into usable data again. In the
 * PoC code the only optimization used was multiplying/dividing the coordinates to
 * reduce number of bytes in the data stream.
 */
var EventPainterController = /** @class */ (function (_super) {
    __extends(EventPainterController, _super);
    function EventPainterController() {
        var _this = _super.call(this) || this;
        _this.events = [];
        // Websocket is used for test purposes until event emitter is ready. TEMPORARY.
        // @ts-ignore
        _this.ws = new WebSocket("ws://" + window.location.hostname + ":6969");
        _this.ws.onopen = function () {
            console.log('opened');
        };
        _this.ws.onmessage = function (event) {
            var data = JSON.parse(event.data);
            switch (data.eventType) {
                case 'moving': {
                    _this.emit('moving', data.id, data.target);
                    break;
                }
                case 'added': {
                    _this.emit('added', data.id, data.objectType, data.target);
                    break;
                }
                case 'moved': {
                    _this.emit('moved', data.id, data.objectType, data.target);
                    break;
                }
                case 'lineWidthChanged': {
                    _this.emit('lineWidthChanged', data.id, data.objectType, data.target);
                    break;
                }
                case 'textEdit': {
                    _this.emit('textEdit', data.id, data.target);
                    break;
                }
                case 'modified': {
                    _this.emit('modified', data.id, data.objectType, data.target);
                    break;
                }
                case 'rotated': {
                    _this.emit('rotated', data.id, data.objectType, data.target);
                    break;
                }
                case 'scaled': {
                    _this.emit('scaled', data.id, data.objectType, data.target);
                    break;
                }
                case 'removed': {
                    _this.emit('removed', data.id, data.target);
                    break;
                }
                case 'skewed': {
                    _this.emit('skewed', data.id, data.target);
                    break;
                }
                case 'colorChanged': {
                    _this.emit('colorChanged', data.id, data.objectType, data.target);
                    break;
                }
                case 'fontFamilyChanged': {
                    _this.emit('fontFamilyChanged', data.id, data.target);
                    break;
                }
                case 'pointer': {
                    _this.emit('pointer', data.id, data.target);
                    break;
                }
                case 'setToolbarPermissions': {
                    _this.emit('setToolbarPermissions', data.id, data.target);
                    break;
                }
                case 'fontColorChanged': {
                    _this.emit('fontColorChanged', data.id, data.objectType, data.target);
                    break;
                }
                case 'cursorPointer': {
                    _this.emit('cursorPointer', data.id, data.target);
                    break;
                }
                case 'backgroundColorChanged': {
                    _this.emit('backgroundColorChanged', data.id, data.target);
                    break;
                }
                case 'sendStamp': {
                    _this.emit('sendStamp', data.id, data.target);
                    break;
                }
                case 'brushTypeChanged': {
                    _this.emit('brushTypeChanged', data.id, data.target);
                    break;
                }
            }
        };
        _this.ws.onclose = function () {
            _this.ws = null;
        };
        return _this;
    }
    EventPainterController.prototype.replayEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, event_1;
            return __generator(this, function (_b) {
                for (_i = 0, _a = this.events; _i < _a.length; _i++) {
                    event_1 = _a[_i];
                    this.parseAndEmitEvent(event_1);
                }
                return [2 /*return*/];
            });
        });
    };
    EventPainterController.prototype.handlePainterEvent = function (events) {
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event_2 = events_1[_i];
            this.events.push(event_2);
            this.parseAndEmitEvent(event_2);
            // TODO: We can clear the list of events if we receive a
            // 'clear all' event. We know there wont be any events to
            // replay to get to current state of whiteboard right after
            // a clear (whiteboard will be empty). This assumption might
            // change once we implement Undo/Redo functions though.
            // In the Poc it used to look like this:
            // if (event.type === 'painterClear') {
            //   this.events.splice(0, this.events.length - 1);
            // }
        }
    };
    EventPainterController.prototype.requestRefetch = function () {
        this.emit('refetch');
    };
    EventPainterController.prototype.parseAndEmitEvent = function (event) {
        // NOTE: Empty object if param is undefined.
        var eventParam = event.param ? event.param : '{}';
        // NOTE: In our case (based on the PaintEventSerializer implementation) the param
        // will be a JSON stringified fabric.js target object. We may want to introduce
        // some more type safety for this once we start doing data optimizations in the
        // serializer. Param data will not be modified by the server.
        var target = JSON.parse(eventParam);
        // this.emit(event.type, event.objectType, target);
        // NOTE: Right now it might seem unnecessary to have all these events
        // sharing all the same parameters. But in the future if we apply
        // som optimization the parameters might be different between add
        // delete, moved. etc.
        switch (event.type) {
            case 'added':
                this.added(event.id, event.objectType, target);
                break;
            case 'moved':
                this.moved(event.id, event.objectType, target);
                break;
            case 'rotated':
                this.rotated(event.id, event.objectType, target);
                break;
            case 'scaled':
                this.scaled(event.id, event.objectType, target);
                break;
            case 'skewed':
                this.skewed(event.id, target);
                break;
            case 'colorChanged':
                this.colorChanged(event.id, event.objectType, target);
                break;
            case 'modified':
                this.modified(event.id, event.objectType, target);
                break;
            case 'fontFamilyChanged':
                this.fontFamilyChanged(event.id, target);
                break;
            case 'removed':
                this.removed(event.id, target);
                break;
            case 'moving':
                this.moving(event.id, target);
                break;
            case 'setToolbarPermissions':
                this.setToolbarPermissions(event.id, target);
                break;
            case 'lineWidthChanged':
                this.lineWidthChanged(event.id, event.objectType, target);
                break;
            case 'pointer':
                this.pointer(event.id, target);
                break;
            case 'textEdit':
                this.textEdit(event.id, target);
                break;
            case 'brushTypeChanged':
                this.brushTypeChanged(event.id, target);
                break;
            case 'backgroundColorChanged':
                this.backgroundColorChanged(event.id, target);
                break;
            case 'sendStamp':
                this.sendStamp(event.id, target);
                break;
            case 'fontColorChanged':
                this.fontColorChanged(event.id, event.objectType, target);
                break;
            case 'reconstruct':
                this.emit('reconstruct', event.id, target);
                break;
            case 'cursorPointer':
                this.cursorPointer(event.id, target);
                break;
        }
    };
    EventPainterController.prototype.textEdit = function (id, target) {
        var _a;
        this.emit('textEdit', id, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, eventType: 'textEdit', target: __assign(__assign({}, target), { id: id }) }));
    };
    EventPainterController.prototype.added = function (id, objectType, target) {
        var _a;
        this.emit('added', id, objectType, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
            id: id,
            objectType: objectType,
            eventType: 'added',
            target: __assign(__assign({}, target), { id: id }),
        }));
    };
    EventPainterController.prototype.moved = function (id, objectType, target) {
        var _a;
        this.emit('moved', id, objectType, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
            id: id,
            objectType: objectType,
            eventType: 'moved',
            target: __assign({}, target),
        }));
    };
    EventPainterController.prototype.rotated = function (id, objectType, target) {
        var _a;
        this.emit('rotated', id, objectType, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
            id: id,
            objectType: objectType,
            eventType: 'rotated',
            target: __assign({}, target),
        }));
    };
    EventPainterController.prototype.scaled = function (id, objectType, target) {
        var _a;
        this.emit('scaled', id, objectType, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, objectType: objectType, eventType: 'scaled', target: target }));
    };
    EventPainterController.prototype.skewed = function (id, target) {
        var _a;
        this.emit('skewed', id, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, eventType: 'skewed', target: target }));
    };
    EventPainterController.prototype.colorChanged = function (id, objectType, target) {
        var _a;
        this.emit('colorChanged', id, objectType, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, objectType: objectType, eventType: 'colorChanged', target: target }));
    };
    EventPainterController.prototype.modified = function (id, objectType, target) {
        var _a;
        this.emit('modified', id, objectType, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, objectType: objectType, target: target, eventType: 'modified' }));
    };
    EventPainterController.prototype.fontFamilyChanged = function (id, target) {
        var _a;
        this.emit('fontFamilyChanged', id, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, target: target, eventType: 'fontFamilyChanged' }));
    };
    // private reconstruct(id: string, target: PainterEvent) {
    //   this.emit('reconstruct', id, target);
    //   // TEMPORARY for realtime testing purposes.
    //   this.ws?.send(JSON.stringify({ id, target, eventType: 'reconstruct' }));
    // }
    EventPainterController.prototype.removed = function (id, target) {
        var _a;
        this.emit('removed', id, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, target: target, eventType: 'removed' }));
    };
    EventPainterController.prototype.moving = function (id, target) {
        var _a;
        this.emit('moving', id, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, target: target, eventType: 'moving' }));
    };
    EventPainterController.prototype.setToolbarPermissions = function (id, target) {
        var _a;
        this.emit('setToolbarPermissions', id, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, target: target, eventType: 'setToolbarPermissions' }));
    };
    EventPainterController.prototype.fontColorChanged = function (id, objectType, target) {
        var _a;
        this.emit('fontColorChanged', id, objectType, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, objectType: objectType, eventType: 'fontColorChanged', target: target }));
    };
    EventPainterController.prototype.lineWidthChanged = function (id, objectType, target) {
        var _a;
        this.emit('lineWidthChanged', id, objectType, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, objectType: objectType, eventType: 'lineWidthChanged', target: target }));
    };
    EventPainterController.prototype.pointer = function (id, target) {
        var _a;
        this.emit('pointer', id, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, eventType: 'pointer', target: target }));
    };
    EventPainterController.prototype.cursorPointer = function (id, target) {
        var _a;
        this.emit('cursorPointer', id, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, eventType: 'cursorPointer', target: target }));
    };
    EventPainterController.prototype.brushTypeChanged = function (id, target) {
        var _a;
        this.emit('brushTypeChanged', id, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, eventType: 'brushTypeChanged', target: target }));
    };
    EventPainterController.prototype.backgroundColorChanged = function (id, target) {
        var _a;
        this.emit('backgroundColorChanged', id, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, eventType: 'backgroundColorChanged', target: target }));
    };
    EventPainterController.prototype.sendStamp = function (id, target) {
        var _a;
        this.emit('sendStamp', id, target);
        // TEMPORARY for realtime testing purposes.
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ id: id, eventType: 'sendStamp', target: target }));
    };
    return EventPainterController;
}(EventEmitter));

var PaintEventSerializer = /** @class */ (function (_super) {
    __extends(PaintEventSerializer, _super);
    function PaintEventSerializer(multiplier) {
        var _this = _super.call(this) || this;
        _this.serializedEventIDs = [];
        _this.multiplier = multiplier;
        return _this;
    }
    /**
     * Push a new event to be serialized for synchronization.
     */
    PaintEventSerializer.prototype.push = function (type, object) {
        // TODO: Optmization of which data get serialized, for example:
        // we wouldn't need to send anything other than id and position
        // for move events, or the updated color if object color was
        // modified.
        var _a;
        // TODO: In the case of line shapes, we will want the users to see
        // the line appear directly, not just when it's finished. In this
        // case we want to just send the object ID and the additional points
        // being added. In the PoC I solved this by having begin/end events
        // which just set up the properties of the line (color/thickness).
        // We may want to think of similar optimizations later as well.
        // Example of this was the 'shapeBegin' event, where brushParameters
        // set up the style for the line.
        //
        // shapeBegin(id: string, brushParameters: BrushParameters): void {
        // const data: OperationData = {
        //  brush: brushParameters,
        // };
        //
        // const event: PainterEvent = {
        //   type: 'shapeBegin',
        //   id: id,
        //   param: JSON.stringify(data),
        // };
        //
        // console.log(`Serializing event for object: ${object.id}`);
        var shape = (_a = object.target) === null || _a === void 0 ? void 0 : _a.shape;
        if (type === 'moving' && (shape === null || shape === void 0 ? void 0 : shape.basePath)) {
            object.target.shape = shape.toJSON([
                'basePath',
            ]);
        }
        var uniqueObjectId = object.id;
        var serialized = {
            id: uniqueObjectId,
            type: type,
            objectType: object.type,
            param: JSON.stringify(object.target),
        };
        // NOTE: The list of ID's this serialized generated is for filtering
        // purposes. Preventing the local user from handling the same event
        // twice. This state can be checked by using the 'didSerializeEvent'
        // function.
        this.serializedEventIDs.push(uniqueObjectId);
        this.emit('event', serialized);
    };
    PaintEventSerializer.prototype.didSerializeEvent = function (id) {
        return this.serializedEventIDs.findIndex(function (id2) { return id2 === id; }) !== -1;
    };
    return PaintEventSerializer;
}(EventEmitter));

// NOTE: This is used to scale up the coordinates sent in events
// to save bytes in the text representation of numbers. E.g. 33
// instead of 0.0333333333. Sacrificing some sub-pixel accuracy.
var NormalizeCoordinates = 1000;
var Context = React.createContext({
    state: {},
    actions: {},
    requestAllEvents: function () { },
});
// NOTE: This class was added to allow demonstrating synchronizing whiteboard events without any network or server.
var SharedEventSerializerContextProvider = function (_a) {
    var children = _a.children, simulateNetworkSynchronization = _a.simulateNetworkSynchronization, simulatePersistence = _a.simulatePersistence;
    var eventSerializer = React.useState(new PaintEventSerializer(NormalizeCoordinates))[0];
    var eventController = React.useState(new EventPainterController())[0];
    // NOTE: This effect is used to set up network sync simulation. Just handling the locally
    // serialized events directly using the event controller.
    React.useEffect(function () {
        if (!eventSerializer || !eventController)
            return;
        if (!simulateNetworkSynchronization)
            return;
        // NOTE: We will receive events from the server as arrays of serialized
        // events. When joining a room the user will receive a big list of events
        // of all that's been painted so far. After they received the initial big
        // list the will receive individual events or smaller chunks of events as
        // others users (and themselves) interact more with the whiteboard.
        // The function receiving events might look like this:
        var handleRemoteEvent = function (payload) {
            // IMPORTANT: We should keep in mind the user's own events
            // will appear in this list as well. The server doesn't do
            // any filtering based on the user at this point.
            // Once the events have been received, there needs to be some code
            // transforming the event data into commands for drawing or updating
            // objects on the canvas.
            eventController.handlePainterEvent([payload]);
        };
        // NOTE: This handler simulates receiving events from the server
        // usually we wouldn't feed remote events directly in to the event
        // serializer.
        eventSerializer.on('event', handleRemoteEvent);
        return function () {
            eventSerializer.removeListener('event', handleRemoteEvent);
        };
    }, [eventSerializer, eventController, simulateNetworkSynchronization]);
    // NOTE: Resubmit all events serialized so far.
    var sendAllPersistentEvents = React.useCallback(function () {
        if (!eventSerializer || !eventController)
            return;
        if (!simulateNetworkSynchronization)
            return;
        var stored = window.localStorage.getItem('canvas:simulated:events');
        if (stored !== null) {
            var persistentEvents = JSON.parse(stored);
            console.log("resubmitting persistent events: " + persistentEvents.length);
            eventController.handlePainterEvent(persistentEvents);
        }
    }, [eventController, eventSerializer, simulateNetworkSynchronization]);
    // NOTE: Request fetching all events.
    var refetchEvents = React.useCallback(function () {
        if (!eventSerializer || !eventController)
            return;
        eventController.requestRefetch();
    }, [eventController, eventSerializer]);
    // NOTE: This effect listens for refetch request
    // and resubmits all events when it's invoked.
    React.useEffect(function () {
        if (!simulatePersistence)
            return;
        if (!eventController)
            return;
        var refetchRequestHandler = function () {
            sendAllPersistentEvents();
        };
        eventController.on('refetch', refetchRequestHandler);
        return function () {
            eventController.removeListener('refetch', refetchRequestHandler);
        };
    }, [eventController, sendAllPersistentEvents, simulatePersistence]);
    // NOTE: This effect sets up simulated persistance. This would simulate
    // events being sent from the server when the user reloads the page.
    React.useEffect(function () {
        if (!eventSerializer || !eventController)
            return;
        // changed from simulateNetworkSynchronization, needed network synch, but not persistence, which localStorage is for.
        if (!simulatePersistence)
            return;
        var stored = window.localStorage.getItem('canvas:simulated:events');
        if (stored !== null) {
            var persistentEvents = JSON.parse(stored);
            console.log("applying simulated persistent events: " + persistentEvents.length);
            eventController.handlePainterEvent(persistentEvents);
        }
        var remoteEvents = [];
        var storeRemoteEvent = function (payload) {
            var length = remoteEvents.push(payload);
            console.log("storing simulated persistance events: " + length);
            window.localStorage.setItem('canvas:simulated:events', JSON.stringify(remoteEvents));
        };
        eventSerializer.on('event', storeRemoteEvent);
        return function () {
            eventSerializer.removeListener('event', storeRemoteEvent);
        };
    }, [
        eventSerializer,
        eventController,
        simulatePersistence,
        simulateNetworkSynchronization,
    ]);
    return (React__default['default'].createElement(Context.Provider, { value: {
            state: {
                eventSerializer: eventSerializer,
                eventController: eventController,
            },
            actions: {},
            requestAllEvents: refetchEvents,
        } }, children));
};
function useSharedEventSerializer() {
    return React.useContext(Context);
}

var useText = function (newText) {
    if (newText === void 0) { newText = ''; }
    var _a = React.useState(newText), text = _a[0], updateText = _a[1];
    return { text: text, updateText: updateText };
};

var useFontFamily = function (font) {
    if (font === void 0) { font = 'Arial'; }
    var _a = React.useState(font), fontFamily = _a[0], updateFontFamily = _a[1];
    return { fontFamily: fontFamily, updateFontFamily: updateFontFamily };
};

var useShapeColor = function (color) {
    if (color === void 0) { color = '#000000'; }
    var _a = React.useState(color), shapeColor = _a[0], updateShapeColor = _a[1];
    return { shapeColor: shapeColor, updateShapeColor: updateShapeColor };
};

var useShape = function (newShape) {
    if (newShape === void 0) { newShape = 'rectangle'; }
    var _a = React.useState(newShape), shape = _a[0], updateShape = _a[1];
    return { shape: shape, updateShape: updateShape };
};

var useWhiteboardClearModal = function () {
    var _a = React.useState(false), clearWhiteboardModal = _a[0], setOpen = _a[1];
    var openModal = React.useCallback(function () {
        setOpen(true);
    }, []);
    var closeModal = React.useCallback(function () {
        setOpen(false);
    }, []);
    var ClearWhiteboardModal = function (props) {
        return (React__default['default'].createElement("div", null,
            React__default['default'].createElement(Dialog__default['default'], { open: clearWhiteboardModal, onClose: closeModal, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
                React__default['default'].createElement(DialogTitle__default['default'], { id: "alert-dialog-title" }, 'Are you sure you want to clear the board?'),
                React__default['default'].createElement(DialogActions__default['default'], null,
                    React__default['default'].createElement(Button__default['default'], { onClick: closeModal, color: "primary", variant: "contained" }, "Cancel"),
                    React__default['default'].createElement(Button__default['default'], { onClick: props.clearWhiteboard, color: "secondary", variant: "contained" }, "Yes")))));
    };
    return { clearWhiteboardModal: clearWhiteboardModal, openModal: openModal, closeModal: closeModal, ClearWhiteboardModal: ClearWhiteboardModal };
};

var usePointerEvents = function (newState) {
    if (newState === void 0) { newState = true; }
    var _a = React.useState(newState), pointerEvents = _a[0], setPointerEvents = _a[1];
    return { pointerEvents: pointerEvents, setPointerEvents: setPointerEvents };
};

var useFontColor = function (color) {
    if (color === void 0) { color = '#000000'; }
    var _a = React.useState(color), fontColor = _a[0], updateFontColor = _a[1];
    return { fontColor: fontColor, updateFontColor: updateFontColor };
};

var useTextIsActive = function () {
    var _a = React.useState(false), textIsActive = _a[0], updateTextIsActive = _a[1];
    return { textIsActive: textIsActive, updateTextIsActive: updateTextIsActive };
};

var useShapeIsActive = function () {
    var _a = React.useState(false), shapeIsActive = _a[0], updateShapeIsActive = _a[1];
    return { shapeIsActive: shapeIsActive, updateShapeIsActive: updateShapeIsActive };
};

var useBrushIsActive = function () {
    var _a = React.useState(false), brushIsActive = _a[0], updateBrushIsActive = _a[1];
    return { brushIsActive: brushIsActive, updateBrushIsActive: updateBrushIsActive };
};

var useEraseType = function (type) {
    if (type === void 0) { type = null; }
    var _a = React.useState(type), eraseType = _a[0], updateEraseType = _a[1];
    return { eraseType: eraseType, updateEraseType: updateEraseType };
};

/**
 * Indicates of shapes are selectable and eventful.
 */
var useShapesAreSelectable = function () {
    var _a = React.useState(false), shapesAreSelectable = _a[0], updateShapesAreSelectable = _a[1];
    return { shapesAreSelectable: shapesAreSelectable, updateShapesAreSelectable: updateShapesAreSelectable };
};

/**
 * Indicates of shapes are eventful.
 */
var useShapesAreEvented = function () {
    var _a = React.useState(false), shapesAreEvented = _a[0], updateShapesAreEvented = _a[1];
    return { shapesAreEvented: shapesAreEvented, updateShapesAreEvented: updateShapesAreEvented };
};

var DEFAULT_VALUES = {
    POINTER: 'arrow',
    ERASE_TYPE: null,
    PEN_LINE: 'pencil',
    PEN_COLOR: '#000000',
    LINE_WIDTH: 2,
    FLOOD_FILL: '#000000',
    FONT_FAMILY: 'Arial',
    FONT_COLOR: '#000000',
    SHAPE: 'rectangle',
    SHAPE_COLOR: '#000000',
    STAMP: 'good',
};

var useLineWidth = function (width) {
    if (width === void 0) { width = 2; }
    var _a = React.useState(width), lineWidth = _a[0], updateLineWidth = _a[1];
    return { lineWidth: lineWidth, updateLineWidth: updateLineWidth };
};

var useFloodFill$1 = function (color) {
    if (color === void 0) { color = '#000000'; }
    var _a = React.useState(color), floodFill = _a[0], updateFloodFill = _a[1];
    return { floodFill: floodFill, updateFloodFill: updateFloodFill };
};

var useFloodFillIsActive = function () {
    var _a = React.useState(false), floodFillIsActive = _a[0], updateFloodFillIsActive = _a[1];
    return { floodFillIsActive: floodFillIsActive, updateFloodFillIsActive: updateFloodFillIsActive };
};

/**
 * Hook that updates and indicates if laser pointer is active.
 */
var useLaserIsActive = function () {
    var _a = React.useState(false), laserIsActive = _a[0], updateLaserIsActive = _a[1];
    return { laserIsActive: laserIsActive, updateLaserIsActive: updateLaserIsActive };
};

var useClearIsActive = function () {
    var _a = React.useState(false), clearIsActive = _a[0], updateClearIsActive = _a[1];
    return { clearIsActive: clearIsActive, updateClearIsActive: updateClearIsActive };
};

var usePointerPermissions = function () {
    var _a = React.useState(true), pointerIsEnabled = _a[0], setPointerIsEnabled = _a[1];
    return { pointerIsEnabled: pointerIsEnabled, setPointerIsEnabled: setPointerIsEnabled };
};

var useLineWidthIsActive = function () {
    var _a = React.useState(false), lineWidthIsActive = _a[0], updateLineWidthIsActive = _a[1];
    return { lineWidthIsActive: lineWidthIsActive, updateLineWidthIsActive: updateLineWidthIsActive };
};

var useBrushType = function (type) {
    if (type === void 0) { type = 'pencil'; }
    var _a = React.useState(type), brushType = _a[0], updateBrushType = _a[1];
    return { brushType: brushType, updateBrushType: updateBrushType };
};

var canvasImagePopup = function () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var _a = React.useState(false), imagePopupIsOpen = _a[0], updateImagePopupIsOpen = _a[1];
    return { imagePopupIsOpen: imagePopupIsOpen, updateImagePopupIsOpen: updateImagePopupIsOpen };
};

var usePerfectShapeIsActive = function () {
    var _a = React.useState(false), perfectShapeIsActive = _a[0], updatePerfectShapeIsActive = _a[1];
    return { perfectShapeIsActive: perfectShapeIsActive, updatePerfectShapeIsActive: updatePerfectShapeIsActive };
};

function WhiteboardToggle(props) {
    var label = props.label, state = props.state, onStateChange = props.onStateChange;
    var handleChange = function (event) {
        var currentState = event.target.checked;
        onStateChange(currentState);
    };
    var containerStyle = {
        display: 'inline-block',
        paddingLeft: 10,
    };
    return (React__default['default'].createElement("div", { style: containerStyle },
        React__default['default'].createElement(FormControlLabel__default['default'], { control: React__default['default'].createElement(Switch__default['default'], { checked: state, onChange: handleChange, name: "checkedB", color: "primary" }), label: label })));
}

var usePartialEraseIsActive = function () {
    var _a = React.useState(false), partialEraseIsActive = _a[0], updatePartialEraseIsActive = _a[1];
    return { partialEraseIsActive: partialEraseIsActive, updatePartialEraseIsActive: updatePartialEraseIsActive };
};

/**
 Modal component to upload image files.
 This component handles the logic to set the type of file(png, svg, giff, img)
 the user is uploading.
 The file size limit is 5mb.
 */
var useUploadFileModal = function (eventSerializer, userId) {
    var _a = React.useState(false), uploadFileModal = _a[0], setOpen = _a[1];
    var openUploadFileModal = React.useCallback(function () {
        setOpen(true);
    }, []);
    var closeUploadFileModal = React.useCallback(function () {
        setOpen(false);
    }, []);
    var UploadFileModal = function (props) {
        var _a = React.useState('element'), value = _a[0], setValue = _a[1];
        var _b = React.useState(false), error = _b[0], setError = _b[1];
        var _c = React.useState(false), gifError = _c[0], setGifError = _c[1];
        var handleChange = function (event) {
            setValue(event.target.value);
        };
        var _d = React.useState(false), backgroundImageIsPartialErasable = _d[0], setBackgroundPartialErasable = _d[1];
        var handleChangeCheckbox = function (event) {
            setBackgroundPartialErasable(event.target.checked);
        };
        var onImageChange = function (event) {
            if (event.target.files && event.target.files[0]) {
                var setBackgroundImageIsPartialErasable_1 = props.setBackgroundImageIsPartialErasable, setIsBackgroundImage_1 = props.setIsBackgroundImage, setBackgroundImage_1 = props.setBackgroundImage, setImage_1 = props.setImage, setIsGif_1 = props.setIsGif;
                var fileType = event.target.files[0].type;
                var img = event.target.files[0];
                var imageSize = img.size;
                var totalSize = imageSize / 1024;
                if (totalSize >= 5000) {
                    setError(true);
                    return;
                }
                if (value === 'background') {
                    if (fileType === 'image/gif') {
                        setGifError(true);
                        return;
                    }
                    setError(false);
                    setGifError(false);
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        var _a;
                        setBackgroundImageIsPartialErasable_1(backgroundImageIsPartialErasable);
                        setIsBackgroundImage_1(true);
                        if ((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.result) {
                            setBackgroundImage_1(e.target.result);
                            setOpen(false);
                        }
                    };
                    reader_1.readAsDataURL(img);
                    return;
                }
                if (fileType === 'image/gif') {
                    setIsGif_1(true);
                    setIsBackgroundImage_1(false);
                    setBackgroundImageIsPartialErasable_1(false);
                    var reader_2 = new FileReader();
                    reader_2.onload = function (e) {
                        var _a;
                        if ((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.result) {
                            setImage_1(e.target.result);
                        }
                    };
                    reader_2.readAsDataURL(img);
                }
                else {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var _a;
                        if ((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.result) {
                            // @ts-ignore
                            setImage_1(e.target.result);
                            setIsGif_1(false);
                            setIsBackgroundImage_1(false);
                            setBackgroundImageIsPartialErasable_1(false);
                        }
                    };
                    reader.readAsDataURL(img);
                }
                setOpen(false);
                setError(false);
                setGifError(false);
            }
        };
        return (React__default['default'].createElement("div", null,
            React__default['default'].createElement(Dialog__default['default'], { open: uploadFileModal, onClose: closeUploadFileModal, "aria-labelledby": "upload-image-dialog", "aria-describedby": "upload-image-dialog" },
                React__default['default'].createElement(DialogTitle__default['default'], { id: "alert-dialog-title" }, 'Upload image'),
                React__default['default'].createElement("div", { style: {
                        padding: '20px',
                    } },
                    error && (React__default['default'].createElement(core.FormLabel, { component: "legend" }, "File should be less than 5mb")),
                    gifError && (React__default['default'].createElement(core.FormLabel, { component: "legend" }, "Can not use gifs as background image")),
                    React__default['default'].createElement(FormControl__default['default'], { component: "fieldset" },
                        React__default['default'].createElement(RadioGroup__default['default'], { "aria-label": "gender", name: "gender1", value: value, onChange: handleChange },
                            React__default['default'].createElement(FormControlLabel__default['default'], { value: "element", control: React__default['default'].createElement(Radio__default['default'], null), label: "Set as a whiteboard element" }),
                            React__default['default'].createElement(FormControlLabel__default['default'], { value: "background", control: React__default['default'].createElement(Radio__default['default'], null), label: "Set as background image" })),
                        value === 'background' && (React__default['default'].createElement(FormGroup__default['default'], null,
                            React__default['default'].createElement(FormControlLabel__default['default'], { control: React__default['default'].createElement(Checkbox__default['default'], { checked: backgroundImageIsPartialErasable, onChange: handleChangeCheckbox, name: "gilad" }), label: "Set background image partial erasable" }))))),
                React__default['default'].createElement(DialogActions__default['default'], null,
                    React__default['default'].createElement(Button__default['default'], { onClick: closeUploadFileModal, color: "primary", variant: "contained" }, "Cancel"),
                    React__default['default'].createElement("input", { accept: "image/*", style: { display: 'none' }, id: "raised-button-file", multiple: true, type: "file", onChange: onImageChange }),
                    React__default['default'].createElement("label", { htmlFor: "raised-button-file" },
                        React__default['default'].createElement(Button__default['default'], { component: "span", color: "default", variant: "contained" }, "Upload"))))));
    };
    return {
        uploadFileModal: uploadFileModal,
        openUploadFileModal: openUploadFileModal,
        closeUploadFileModal: closeUploadFileModal,
        UploadFileModal: UploadFileModal,
    };
};

/**
 * Redux dispatch actions. Note, actions are directly named after permission properties to prevent
 * rewrites of multiple files.
 */
var UPDATE_PEN = 'pen';
var UPDATE_POINTER = 'pointer';
var UPDATE_MOVE = 'move';
var UPDATE_ERASE = 'erase';
var UPDATE_PARTIAL_ERASE = 'partialErase';
var UPDATE_FLOOD_FILL = 'floodFill';
var UPDATE_TEXT = 'text';
var UPDATE_SHAPE = 'shape';
var UPDATE_UNDO_REDO = 'undoRedo';
var UPDATE_CLEAR_WHITEBOARD = 'clearWhiteboard';
var UPDATE_DOWNLOAD_CANVAS = 'downloadCanvas';
var UPDATE_UPLOAD_IMAGE = 'uploadImage';
var UPDATE_RECEIVED = 'updateReceived';

var canvasBoardState = {
    resize: false,
    shape: null,
    startPoint: { x: 0, y: 0 },
};
function canvasBoardReducer(state, action) {
    if (state === void 0) { state = canvasBoardState; }
    switch (action.type) {
        case 'SET_FALSE': {
            return __assign(__assign({}, state), { resize: false });
        }
        case 'SET_TRUE': {
            return __assign(__assign({}, state), { resize: true });
        }
        case 'SET_SHAPE': {
            return __assign(__assign({}, state), { shape: action.payload });
        }
        case 'SET_SHAPE_NULL': {
            return __assign(__assign({}, state), { shape: null });
        }
        case 'SET_START_POINT': {
            return __assign(__assign({}, state), { startPoint: action.payload });
        }
        default:
            return state;
    }
}

/**
 * Default permissions state.
 */
var permissionsState = {
    pointer: false,
    move: false,
    erase: false,
    partialErase: false,
    pen: false,
    floodFill: false,
    text: false,
    shape: false,
    undoRedo: false,
    clearWhiteboard: false,
    downloadCanvas: false,
    uploadImage: false,
    backgroundColor: false,
    cursorPointer: false,
};
/**
 * Reducer
 * @param state Redux state
 * @param action Action
 */
function permissionsReducer(state, action) {
    if (state === void 0) { state = permissionsState; }
    switch (action.type) {
        case UPDATE_POINTER: {
            return __assign(__assign({}, state), { pointer: action.payload });
        }
        case UPDATE_PEN: {
            return __assign(__assign({}, state), { pen: action.payload });
        }
        case UPDATE_SHAPE: {
            return __assign(__assign({}, state), { shape: action.payload });
        }
        case UPDATE_TEXT: {
            return __assign(__assign({}, state), { text: action.payload });
        }
        case UPDATE_UNDO_REDO: {
            return __assign(__assign({}, state), { undoRedo: action.payload });
        }
        case UPDATE_UPLOAD_IMAGE: {
            return __assign(__assign({}, state), { uploadImage: action.payload });
        }
        case UPDATE_PARTIAL_ERASE: {
            return __assign(__assign({}, state), { partialErase: action.payload });
        }
        case UPDATE_MOVE: {
            return __assign(__assign({}, state), { move: action.payload });
        }
        case UPDATE_CLEAR_WHITEBOARD: {
            return __assign(__assign({}, state), { clearWhiteboard: action.payload });
        }
        case UPDATE_DOWNLOAD_CANVAS: {
            return __assign(__assign({}, state), { downloadCanvas: action.payload });
        }
        case UPDATE_ERASE: {
            return __assign(__assign({}, state), { erase: action.payload });
        }
        case UPDATE_FLOOD_FILL: {
            return __assign(__assign({}, state), { floodFill: action.payload });
        }
        case UPDATE_RECEIVED: {
            return __assign(__assign({}, state), action.payload);
        }
        default:
            return state;
    }
}
/**
 * Root reducer
 */
redux.combineReducers({
    permissionsState: permissionsReducer,
    canvasBoardState: canvasBoardReducer,
});

var teacherPermissions = {
    allowClearAll: true,
    allowClearOthers: true,
    allowClearMyself: true,
};
var studentPermissions = {
    allowClearAll: false,
    allowClearOthers: false,
    allowClearMyself: true,
};
/**
 * Default users state.
 */
var initialState$1 = [
    {
        id: 'teacher',
        name: 'William',
        role: 'teacher',
        permissions: teacherPermissions,
        avatarImg: 'https://i.pravatar.cc/35?img=59',
    },
    {
        id: 'student',
        name: 'John',
        role: 'student',
        permissions: studentPermissions,
        avatarImg: 'https://i.pravatar.cc/35?img=4',
    },
    {
        id: 'student2',
        name: 'Mary',
        role: 'student',
        permissions: studentPermissions,
        avatarImg: 'https://i.pravatar.cc/35?img=37',
    },
];
/**
 * Reducer
 * @param state Redux state
 * @param action Action
 */
function usersReducer(state, action) {
    if (state === void 0) { state = initialState$1; }
    switch (action.type) {
        default:
            return state;
    }
}

/**
 * Default portfolio state.
 */
var initialState = [
    {
        studentId: 'student',
        studentStamps: [],
    },
    {
        studentId: 'student2',
        studentStamps: [],
    },
];
/**
 * Reducer
 * @param state Redux state
 * @param action Action
 */
function portfolioReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case 'ADD_STAMP':
            var _a = action.payload, studentId_1 = _a.studentId, stamp_1 = _a.stamp;
            var newState = state.map(function (portfolio) {
                // Finding for the element with the received studentId
                if (portfolio.studentId === studentId_1) {
                    var stampExist = portfolio.studentStamps.find(function (current) {
                        return current.stamp === stamp_1;
                    });
                    /**
                     * If received stamp doesn't exists in the student's portfolio
                     * this just will be added in the student's stamps array
                     * with the quantity of 1
                     */
                    if (!stampExist) {
                        return {
                            studentId: studentId_1,
                            studentStamps: __spreadArrays(portfolio.studentStamps, [
                                { stamp: stamp_1, quantity: 1 },
                            ]),
                        };
                    }
                    /**
                     * If received stamp exists in the student's porfolio,
                     * is necessary map the student's stamps array
                     * to update the quantity of stamps in the received stamp
                     */
                    var stampsUpdated = portfolio.studentStamps.map(function (currentStamp) {
                        /**
                         * If the current stamp is the received stamp,
                         * current stamp quantity will increased in 1
                         */
                        if (currentStamp.stamp === stamp_1) {
                            return {
                                stamp: currentStamp.stamp,
                                quantity: currentStamp.quantity += 1,
                            };
                        }
                        return currentStamp;
                    });
                    return {
                        studentId: studentId_1,
                        studentStamps: stampsUpdated,
                    };
                }
                return portfolio;
            });
            return newState;
        default:
            return state;
    }
}

var rootReducer = redux.combineReducers({
    permissionsState: permissionsReducer,
    usersState: usersReducer,
    canvasBoardState: canvasBoardReducer,
    potfolioReducer: portfolioReducer,
});

/**
 * Redux store
 */
var store = redux.createStore(rootReducer);

/**
 * Indicates if any tool is enabled in toolbar.
 */
var getToolbarIsEnabled = function (userId) {
    // teacher hardcoded until sign in active. TEMPORARY
    if (userId && userId === 'teacher') {
        return true;
    }
    var permissions = store.getState().permissionsState;
    for (var key in permissions) {
        if (permissions[key] === true) {
            return true;
        }
    }
    return false;
};

var usePointer = function (pointerType) {
    if (pointerType === void 0) { pointerType = 'arrow'; }
    var _a = React.useState(pointerType), pointer = _a[0], updatePointer = _a[1];
    return { pointer: pointer, updatePointer: updatePointer };
};

var useBackgroundColor = function (color) {
    if (color === void 0) { color = '#ffffff'; }
    var _a = React.useState(color), backgroundColor = _a[0], updateBackgroundColor = _a[1];
    return { backgroundColor: backgroundColor, updateBackgroundColor: updateBackgroundColor };
};

var useStampMode = function (mode) {
    if (mode === void 0) { mode = 'student'; }
    var _a = React.useState(mode), stampMode = _a[0], updateStampMode = _a[1];
    return { stampMode: stampMode, updateStampMode: updateStampMode };
};

var useStamp = function (newStamp) {
    if (newStamp === void 0) { newStamp = 'good'; }
    var _a = React.useState(newStamp), stamp = _a[0], updateStamp = _a[1];
    return { stamp: stamp, updateStamp: updateStamp };
};

var useStampIsActive = function () {
    var _a = React.useState(false), stampIsActive = _a[0], updateStampIsActive = _a[1];
    return { stampIsActive: stampIsActive, updateStampIsActive: updateStampIsActive };
};

/**
 * Generates stamp assignation modal
 */
var useStampAssignationModal = function () {
    var _a = React.useState(false), stampAssignationModal = _a[0], setOpen = _a[1];
    /**
     * Opens modal
     */
    var openStampAssignationModal = React.useCallback(function () {
        setOpen(true);
    }, []);
    /**
     * Closes modal
     */
    var closeStampAssignationModal = React.useCallback(function () {
        setOpen(false);
    }, []);
    /**
     * Renders modal
     * @param {IStampAssignationModal} props - Needed props to render the modal
     * - assignStudents - Callback used when confirm button is clicked
     * - studentsList - List of the current users that are students
     */
    var StampAssignationModal = function (props) {
        var studentsList = props.studentsList, assignStudents = props.assignStudents;
        /**
         * Creates the studentsStatus array and put all their values in false
         */
        var initStudentsArray = function () {
            return studentsList.map(function (_) { return false; });
        };
        var _a = React.useState(initStudentsArray()), studentsStatus = _a[0], setStudentsStatus = _a[1];
        var _b = React.useState(false), selectionExists = _b[0], setSelectionExists = _b[1];
        /**
         * Handles the changes in modal's checkboxes
         * @param event - Event that contains all the data
         * related to the current changed checkbox
         */
        var handleChange = function (event) {
            var status = studentsStatus;
            var clicked = event.target.id;
            var clickedIndex = studentsList.findIndex(function (student) { return student.id === clicked; });
            studentsStatus[clickedIndex] = event.target.checked;
            setStudentsStatus(status);
            areStudentsSelected();
        };
        /**
         * Is executed when assign button is clicked,
         * closes the modal and updates assigned students
         */
        var assignStampToStudents = function () {
            var assigned = studentsList
                .filter(function (_, index) {
                return studentsStatus[index];
            })
                .map(function (student) { return student.id; });
            setOpen(false);
            assignStudents(assigned);
        };
        /**
         * Checks if at least one checkbox is active.
         */
        var areStudentsSelected = function () {
            var exists = !!studentsStatus.filter(function (student) { return student; }).length;
            setSelectionExists(exists);
        };
        return (React__default['default'].createElement("div", null,
            React__default['default'].createElement(Dialog__default['default'], { open: stampAssignationModal, onClose: closeStampAssignationModal, "aria-labelledby": "stamp-assignation-dialog", "aria-describedby": "stamp-assignation-dialog" },
                React__default['default'].createElement(core.DialogTitle, { id: "alert-dialog-title" }, 'Assign Stamp to:'),
                React__default['default'].createElement("div", { style: {
                        padding: '0 20px 10px 20px',
                    } },
                    React__default['default'].createElement(core.FormControl, { component: "fieldset" },
                        React__default['default'].createElement(core.FormGroup, null, studentsList.map(function (student) { return (React__default['default'].createElement(core.FormControlLabel, { key: student.id, control: React__default['default'].createElement(core.Checkbox, { id: student.id, onChange: handleChange, name: student.id }), label: student.name })); })))),
                React__default['default'].createElement(core.DialogActions, { style: { padding: '10px 20px 20px 20px' } },
                    React__default['default'].createElement(core.Button, { onClick: closeStampAssignationModal, color: "primary", variant: "contained" }, "Cancel"),
                    React__default['default'].createElement(core.Button, { component: "span", color: "default", variant: "contained", onClick: assignStampToStudents, disabled: !selectionExists }, "Assign")))));
    };
    return {
        stampAssignationModal: stampAssignationModal,
        openStampAssignationModal: openStampAssignationModal,
        closeStampAssignationModal: closeStampAssignationModal,
        StampAssignationModal: StampAssignationModal,
    };
};

var useStampAssignedStudents = function (studentIds) {
    if (studentIds === void 0) { studentIds = []; }
    var _a = React.useState(studentIds), stampAssignedStudents = _a[0], updateStampAssignedStudents = _a[1];
    return { stampAssignedStudents: stampAssignedStudents, updateStampAssignedStudents: updateStampAssignedStudents };
};

var WhiteboardContext = React.createContext({});
var WhiteboardProvider = function (_a) {
    var children = _a.children, clearWhiteboardPermissions = _a.clearWhiteboardPermissions, allToolbarIsEnabled = _a.allToolbarIsEnabled, activeCanvas = _a.activeCanvas, userId = _a.userId;
    var _b = useText(), text = _b.text, updateText = _b.updateText;
    var _c = useFontColor(), fontColor = _c.fontColor, updateFontColor = _c.updateFontColor;
    var _d = useFontFamily(), fontFamily = _d.fontFamily, updateFontFamily = _d.updateFontFamily;
    var _e = useShapeColor(), shapeColor = _e.shapeColor, updateShapeColor = _e.updateShapeColor;
    var _f = useShape(), shape = _f.shape, updateShape = _f.updateShape;
    var _g = useEraseType(), eraseType = _g.eraseType, updateEraseType = _g.updateEraseType;
    var _h = useLineWidth(), lineWidth = _h.lineWidth, updateLineWidth = _h.updateLineWidth;
    var _j = useFloodFill$1(), floodFill = _j.floodFill, updateFloodFill = _j.updateFloodFill;
    var _k = useStamp(), stamp = _k.stamp, updateStamp = _k.updateStamp;
    var _l = useStampMode(), stampMode = _l.stampMode, updateStampMode = _l.updateStampMode;
    var _m = useStampAssignedStudents(), stampAssignedStudents = _m.stampAssignedStudents, updateStampAssignedStudents = _m.updateStampAssignedStudents;
    var _o = useBackgroundColor(), backgroundColor = _o.backgroundColor, updateBackgroundColor = _o.updateBackgroundColor;
    var _p = usePointerEvents(), pointerEvents = _p.pointerEvents, setPointerEvents = _p.setPointerEvents;
    var _q = canvasImagePopup(), imagePopupIsOpen = _q.imagePopupIsOpen, updateImagePopupIsOpen = _q.updateImagePopupIsOpen;
    var _r = usePointer(), pointer = _r.pointer, updatePointer = _r.updatePointer;
    var _s = useSharedEventSerializer().state, eventSerializer = _s.eventSerializer, eventController = _s.eventController;
    var _t = useWhiteboardClearModal(), ClearWhiteboardModal = _t.ClearWhiteboardModal, openModal = _t.openModal, closeModal = _t.closeModal;
    var _u = useTextIsActive(), textIsActive = _u.textIsActive, updateTextIsActive = _u.updateTextIsActive;
    var _v = useShapeIsActive(), shapeIsActive = _v.shapeIsActive, updateShapeIsActive = _v.updateShapeIsActive;
    var _w = useBrushIsActive(), brushIsActive = _w.brushIsActive, updateBrushIsActive = _w.updateBrushIsActive;
    var _x = useClearIsActive(), clearIsActive = _x.clearIsActive, updateClearIsActive = _x.updateClearIsActive;
    var _y = usePartialEraseIsActive(), partialEraseIsActive = _y.partialEraseIsActive, updatePartialEraseIsActive = _y.updatePartialEraseIsActive;
    var _z = useLineWidthIsActive(), lineWidthIsActive = _z.lineWidthIsActive, updateLineWidthIsActive = _z.updateLineWidthIsActive;
    var _0 = useBrushType(), brushType = _0.brushType, updateBrushType = _0.updateBrushType;
    var _1 = usePerfectShapeIsActive(), perfectShapeIsActive = _1.perfectShapeIsActive, updatePerfectShapeIsActive = _1.updatePerfectShapeIsActive;
    var _2 = useStampIsActive(), stampIsActive = _2.stampIsActive, updateStampIsActive = _2.updateStampIsActive;
    var _3 = useShapesAreSelectable(), shapesAreSelectable = _3.shapesAreSelectable, updateShapesAreSelectable = _3.updateShapesAreSelectable;
    var _4 = useShapesAreEvented(), shapesAreEvented = _4.shapesAreEvented, updateShapesAreEvented = _4.updateShapesAreEvented;
    var _5 = useFloodFillIsActive(), floodFillIsActive = _5.floodFillIsActive, updateFloodFillIsActive = _5.updateFloodFillIsActive;
    var _6 = useLaserIsActive(), laserIsActive = _6.laserIsActive, updateLaserIsActive = _6.updateLaserIsActive;
    var _7 = usePointerPermissions(), pointerIsEnabled = _7.pointerIsEnabled, setPointerIsEnabled = _7.setPointerIsEnabled;
    var _8 = useUploadFileModal(), UploadFileModal = _8.UploadFileModal, openUploadFileModal = _8.openUploadFileModal, closeUploadFileModal = _8.closeUploadFileModal;
    var _9 = useStampAssignationModal(), StampAssignationModal = _9.StampAssignationModal, openStampAssignationModal = _9.openStampAssignationModal;
    // Provisional (just for change value in Toolbar selectors) they can be modified in the future
    var _10 = React.useState(DEFAULT_VALUES.PEN_COLOR), penColor = _10[0], updatePenColor = _10[1];
    var _11 = React.useState(false), eraserIsActive = _11[0], updateEraserIsActive = _11[1];
    // NOTE: Actions provided by canvas instance somewhere in the DOM.
    // The canvas instance will be responsible for registering the actions
    // fulfilling the ICanvasActions interface. Now there can only be one
    // instance registered, but in the future we could add support for
    // multiple instances using the instanceId to choose which one to
    // apply action to.
    var _12 = React.useState(), canvasActions = _12[0], updateCanvasActions = _12[1];
    var _13 = React.useState(''), image = _13[0], setImage = _13[1];
    var _14 = React.useState(false), isGif = _14[0], setIsGif = _14[1];
    var _15 = React.useState(''), backgroundImage = _15[0], setBackgroundImage = _15[1];
    var _16 = React.useState(false), isBackgroundImage = _16[0], setIsBackgroundImage = _16[1];
    var _17 = React.useState(''), localImage = _17[0], setLocalImage = _17[1];
    var _18 = React.useState(false), localBackground = _18[0], setLocalBackground = _18[1];
    var _19 = React.useState(null), copiedItem = _19[0], setCopiedItem = _19[1];
    var _20 = React.useState(null), activeTool = _20[0], setActiveTool = _20[1];
    var _21 = React.useState(false), backgroundImageIsPartialErasable = _21[0], setBackgroundImageIsPartialErasable = _21[1];
    var studentsList = store
        .getState()
        .usersState.filter(function (user) { return user.role === 'student'; });
    var isLocalObject = function (id, canvasId) {
        var object = id.split(':');
        if (!object.length) {
            throw new Error('Invalid ID');
        }
        return object[0] === canvasId;
    };
    var _22 = React.useState(true), eventedObjects = _22[0], updateEventedObjects = _22[1];
    /**
     * Opens ClearWhiteboardModal
     */
    var openClearWhiteboardModal = function () {
        if (allToolbarIsEnabled ||
            store.getState().permissionsState.clearWhiteboard) {
            openModal();
        }
    };
    /**
     * Opens Stamp Assignation Modal
     */
    var openStampModal = function () {
        if (allToolbarIsEnabled) {
            openStampAssignationModal();
        }
    };
    var fillColorAction = React.useCallback(function (color) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.fillColor(color);
    }, [canvasActions]);
    var changeStrokeColorAction = React.useCallback(function (color) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.changeStrokeColor(color);
    }, [canvasActions]);
    var changeBrushTypeAction = React.useCallback(function (type) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.changeBrushType(type);
    }, [canvasActions]);
    var textColorAction = React.useCallback(function (color) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.textColor(color);
    }, [canvasActions]);
    var findObjectById = React.useCallback(function (id) {
        if (!canvasActions)
            return undefined;
        return canvasActions.findObjectById(id);
    }, [canvasActions]);
    var isCursorObject = React.useCallback(function (object) {
        if (!canvasActions)
            return false;
        return canvasActions.isCursorObject(object);
    }, [canvasActions]);
    var clearWhiteboardActionClearMyself = React.useCallback(function () {
        var toolbarIsEnabled = getToolbarIsEnabled(userId);
        if (clearWhiteboardPermissions.allowClearMyself && toolbarIsEnabled) {
            canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.clearWhiteboardClearMySelf();
        }
    }, [canvasActions, clearWhiteboardPermissions.allowClearMyself, userId]);
    var clearWhiteboardAllowClearOthersAction = React.useCallback(function (userId) {
        if (clearWhiteboardPermissions.allowClearOthers) {
            canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.clearWhiteboardAllowClearOthers(userId);
        }
    }, [canvasActions, clearWhiteboardPermissions]);
    var clearWhiteboardActionClearAll = React.useCallback(function () {
        if (clearWhiteboardPermissions.allowClearAll) {
            canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.clearWhiteboardClearAll();
        }
    }, [canvasActions, clearWhiteboardPermissions]);
    var discardActiveObjectAction = React.useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.discardActiveObject();
    }, [canvasActions]);
    var addShapeAction = React.useCallback(function (specific) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.addShape(specific);
    }, [canvasActions]);
    var fillBackgroundColor = React.useCallback(function (color) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.fillBackgroundColor(color);
    }, [canvasActions]);
    var setBackgroundColorInCanvas = React.useCallback(function (color) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.setBackgroundColorInCanvas(color);
    }, [canvasActions]);
    var eraseObjectAction = React.useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.eraseObject();
    }, [canvasActions]);
    var setCanvasSelectionAction = React.useCallback(function (selection) {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.setCanvasSelection(selection);
    }, [canvasActions]);
    var undoAction = React.useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.undo();
    }, [canvasActions]);
    var redoAction = React.useCallback(function () {
        canvasActions === null || canvasActions === void 0 ? void 0 : canvasActions.redo();
    }, [canvasActions]);
    var perfectShapeIsAvailable = function () {
        var permissionsState = store.getState();
        return (allToolbarIsEnabled || permissionsState.shape || permissionsState.move);
    };
    /**
     * Returns boolean indicating if undo / redo feature is available.
     */
    /**
     * List of available colors in toolbar
     * */
    var colorsList = [
        'black',
        'red',
        'yellow',
        'green',
        'blue',
        'purple',
        'brown',
    ];
    var value = {
        fontFamily: fontFamily,
        fontColor: fontColor,
        updateFontFamily: updateFontFamily,
        colorsList: colorsList,
        shape: shape,
        shapeColor: shapeColor,
        updateShape: updateShape,
        text: text,
        updateText: updateText,
        openClearWhiteboardModal: openClearWhiteboardModal,
        openStampModal: openStampModal,
        pointerEvents: pointerEvents,
        eraseType: eraseType,
        updateEraseType: updateEraseType,
        textIsActive: textIsActive,
        updateTextIsActive: updateTextIsActive,
        shapeIsActive: shapeIsActive,
        updateShapeIsActive: updateShapeIsActive,
        brushIsActive: brushIsActive,
        updateBrushIsActive: updateBrushIsActive,
        clearIsActive: clearIsActive,
        updateClearIsActive: updateClearIsActive,
        updateFontColor: updateFontColor,
        lineWidth: lineWidth,
        updateLineWidth: updateLineWidth,
        floodFill: floodFill,
        updateFloodFill: updateFloodFill,
        floodFillIsActive: floodFillIsActive,
        updateFloodFillIsActive: updateFloodFillIsActive,
        eventedObjects: eventedObjects,
        updateEventedObjects: updateEventedObjects,
        // Just for control selectors' value they can be modified in the future
        pointer: pointer,
        updatePointer: updatePointer,
        penColor: penColor,
        updatePenColor: updatePenColor,
        stamp: stamp,
        updateStamp: updateStamp,
        setPointerEvents: setPointerEvents,
        updateShapesAreSelectable: updateShapesAreSelectable,
        updateShapesAreEvented: updateShapesAreEvented,
        closeModal: closeModal,
        updateShapeColor: updateShapeColor,
        shapesAreSelectable: shapesAreSelectable,
        shapesAreEvented: shapesAreEvented,
        canvasActions: canvasActions,
        updateCanvasActions: updateCanvasActions,
        laserIsActive: laserIsActive,
        updateLaserIsActive: updateLaserIsActive,
        lineWidthIsActive: lineWidthIsActive,
        updateLineWidthIsActive: updateLineWidthIsActive,
        perfectShapeIsActive: perfectShapeIsActive,
        updatePerfectShapeIsActive: updatePerfectShapeIsActive,
        isLocalObject: isLocalObject,
        brushType: brushType,
        updateBrushType: updateBrushType,
        // NOTE: Actions that will get invoked based on registered handler.
        fillColor: fillColorAction,
        textColor: textColorAction,
        addShape: addShapeAction,
        discardActiveObject: discardActiveObjectAction,
        clearWhiteboard: clearWhiteboardActionClearMyself,
        clearWhiteboardAllowClearOthers: clearWhiteboardAllowClearOthersAction,
        clearWhiteboardClearAll: clearWhiteboardActionClearAll,
        eraseObject: eraseObjectAction,
        changeStrokeColor: changeStrokeColorAction,
        changeBrushType: changeBrushTypeAction,
        setCanvasSelection: setCanvasSelectionAction,
        undo: undoAction,
        redo: redoAction,
        pointerIsEnabled: pointerIsEnabled,
        setPointerIsEnabled: setPointerIsEnabled,
        allToolbarIsEnabled: allToolbarIsEnabled,
        imagePopupIsOpen: imagePopupIsOpen,
        updateImagePopupIsOpen: updateImagePopupIsOpen,
        activeCanvas: activeCanvas,
        perfectShapeIsAvailable: perfectShapeIsAvailable,
        partialEraseIsActive: partialEraseIsActive,
        updatePartialEraseIsActive: updatePartialEraseIsActive,
        openUploadFileModal: openUploadFileModal,
        closeUploadFileModal: closeUploadFileModal,
        image: image,
        setImage: setImage,
        isGif: isGif,
        setIsGif: setIsGif,
        backgroundImage: backgroundImage,
        setBackgroundImage: setBackgroundImage,
        backgroundImageIsPartialErasable: backgroundImageIsPartialErasable,
        setBackgroundImageIsPartialErasable: setBackgroundImageIsPartialErasable,
        isBackgroundImage: isBackgroundImage,
        setIsBackgroundImage: setIsBackgroundImage,
        localImage: localImage,
        setLocalImage: setLocalImage,
        eraserIsActive: eraserIsActive,
        updateEraserIsActive: updateEraserIsActive,
        localBackground: localBackground,
        setLocalBackground: setLocalBackground,
        backgroundColor: backgroundColor,
        updateBackgroundColor: updateBackgroundColor,
        fillBackgroundColor: fillBackgroundColor,
        setBackgroundColorInCanvas: setBackgroundColorInCanvas,
        copiedItem: copiedItem,
        setCopiedItem: setCopiedItem,
        stampMode: stampMode,
        updateStampMode: updateStampMode,
        stampIsActive: stampIsActive,
        updateStampIsActive: updateStampIsActive,
        stampAssignedStudents: stampAssignedStudents,
        updateStampAssignedStudents: updateStampAssignedStudents,
        isCursorObject: isCursorObject,
        findObjectById: findObjectById,
        eventSerializer: eventSerializer,
        eventController: eventController,
        activeTool: activeTool,
        setActiveTool: setActiveTool,
    };
    return (React__default['default'].createElement(WhiteboardContext.Provider, { value: value },
        React__default['default'].createElement("button", { onClick: function () { return clearWhiteboardActionClearMyself(); } }, "Clear My self"),
        React__default['default'].createElement("button", { onClick: function () { return clearWhiteboardActionClearAll(); } }, "Clear All"),
        React__default['default'].createElement("button", { onClick: function () { return clearWhiteboardAllowClearOthersAction('student'); } }, "Clear student"),
        (window.innerWidth <= 768 || window.innerHeight <= 768) &&
            perfectShapeIsAvailable() ? (React__default['default'].createElement(WhiteboardToggle, { label: "Perfect Shape Creation", state: perfectShapeIsActive, onStateChange: function (value) {
                if (perfectShapeIsAvailable()) {
                    updatePerfectShapeIsActive(value);
                }
            } })) : null,
        React__default['default'].createElement(ClearWhiteboardModal, { clearWhiteboard: clearWhiteboardActionClearMyself }),
        React__default['default'].createElement(UploadFileModal, { setImage: setImage, setIsGif: setIsGif, setBackgroundImage: setBackgroundImage, setBackgroundImageIsPartialErasable: setBackgroundImageIsPartialErasable, isBackgroundImage: isBackgroundImage, setIsBackgroundImage: setIsBackgroundImage }),
        React__default['default'].createElement(StampAssignationModal, { studentsList: studentsList, assignStudents: updateStampAssignedStudents }),
        children));
};

/**
 * Render a section inside of the Toolbar
 * @param children - content that the TollbarSection will have inside
 */
function ToolbarSection(_a) {
    var children = _a.children;
    var toolbarSectionStyle = {
        width: '52px',
        display: 'flex',
        flexDirection: 'column',
        border: 'solid 1px #d0d0d0',
        backgroundColor: '#fff',
        borderRadius: '8px',
    };
    return (React__default['default'].createElement("div", { className: "toolbar-section", style: toolbarSectionStyle }, children));
}

/**
 * Render each button that will be included in the toolbar
 * @param {ToolbarButtonModel} props - Props that the button
 * need to be rendered:
 * - id - id to identify the button
 * - title - title for the button to show in on hover
 * - iconSrc - src for the icon button
 * - iconName - alt for the icon button
 * - selected - flag to set the current selected button
 * - onClick - event to send to parent when the button is clicked
 */
function ToolbarButton(props) {
    var id = props.id, title = props.title, iconSrc = props.iconSrc, iconName = props.iconName, active = props.active, enabled = props.enabled, onClick = props.onClick;
    var toolbarButtonStyle = {
        border: 'none',
        width: '36px',
        marginLeft: '2px',
        backgroundColor: active ? '#d9d9d9' : '#fff',
        borderRadius: '4px',
        outline: 0,
    };
    return (React__default['default'].createElement("button", { key: id, title: title, style: toolbarButtonStyle, className: [
            'toolbar-button original',
            active ? 'selected-button' : '',
            !active ? 'unselected-button' : '',
        ].join(' '), onClick: function () { return onClick(id); }, disabled: enabled === false },
        React__default['default'].createElement("img", { src: iconSrc, alt: iconName, width: "24px", height: "24px" })));
}

var textIcon = "var img = \"data:image/svg+xml,%3csvg id='Capa_1' enable-background='new 0 0 409.294 409.294' height='512' viewBox='0 0 409.294 409.294' width='512' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m116.915 263.118h175.412l28.516 58.471h64.407l-148.431-321.589h-64.398l-148.43 321.588h64.407zm87.705-193.356 62.252 134.885h-124.503z'/%3e%3cpath d='m0 350.824h409.294v58.471h-409.294z'/%3e%3c/svg%3e\";\n  export default img;";

var pointer = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 461.192 461.192' style='enable-background:new 0 0 461.192 461.192%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M389.833%2c296.806l-250.3-293.3c-3.6-4.2-9.9-4.7-14.1-1.1c-1.9%2c1.6-3.1%2c3.8-3.4%2c6.2l-53%2c382.1c-0.8%2c5.5%2c3.1%2c10.5%2c8.5%2c11.3 c2.6%2c0.4%2c5.3-0.3%2c7.4-1.9l101.9-77.6l38.6%2c131.5c1.6%2c5.3%2c7.1%2c8.3%2c12.4%2c6.8l55-16.2c5.3-1.6%2c8.3-7.1%2c6.8-12.4l-37.8-128.6 l119.6%2c9.7c5.5%2c0.4%2c10.3-3.7%2c10.8-9.2C392.433%2c301.406%2c391.633%2c298.806%2c389.833%2c296.806z M248.933%2c282.306 c-5.5-0.4-10.3%2c3.7-10.8%2c9.2c-0.1%2c1.2%2c0%2c2.4%2c0.4%2c3.6l39.1%2c133l-35.8%2c10.5l-39.9-135.8c-1.6-5.3-7.1-8.3-12.4-6.8 c-1.2%2c0.3-2.3%2c0.9-3.2%2c1.6l-94.2%2c71.7l46.7-336l220.2%2c257.9L248.933%2c282.306z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var hand = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M426.667%2c192c-7.875%2c0-15.26%2c2.146-21.604%2c5.885C402.677%2c176.594%2c384.573%2c160%2c362.667%2c160 c-10.417%2c0-19.99%2c3.771-27.427%2c10.052c-7.469-12.406-21.063-20.719-36.573-20.719c-7.76%2c0-15.052%2c2.083-21.333%2c5.729V42.667 C277.333%2c19.135%2c258.198%2c0%2c234.667%2c0S192%2c19.135%2c192%2c42.667v285.479c0%2c5.375-3.542%2c8.135-5.063%2c9.073s-5.615%2c2.865-10.375%2c0.469 l-68.5-34.25c-6.24-3.125-13.229-4.771-20.208-4.771c-24.917%2c0-45.187%2c20.271-45.187%2c45.188V352c0%2c2.958%2c1.229%2c5.781%2c3.385%2c7.802 l123.115%2c114.906C194.937%2c498.75%2c228.542%2c512%2c263.781%2c512h66.885c76.458%2c0%2c138.667-62.208%2c138.667-138.667V234.667 C469.333%2c211.135%2c450.198%2c192%2c426.667%2c192z M448%2c373.333c0%2c64.698-52.635%2c117.333-117.333%2c117.333h-66.885 c-29.813%2c0-58.25-11.208-80.052-31.563L64%2c347.365v-3.51C64%2c330.698%2c74.698%2c320%2c87.854%2c320c3.677%2c0%2c7.375%2c0.875%2c10.667%2c2.521 l68.5%2c34.25c9.99%2c5.01%2c21.635%2c4.458%2c31.135-1.396c9.5-5.875%2c15.177-16.052%2c15.177-27.229V42.667 c0-11.76%2c9.573-21.333%2c21.333-21.333c11.76%2c0%2c21.333%2c9.573%2c21.333%2c21.333v160c0%2c5.896%2c4.771%2c10.667%2c10.667%2c10.667 c5.896%2c0%2c10.667-4.771%2c10.667-10.667V192c0-11.76%2c9.573-21.333%2c21.333-21.333c11.76%2c0%2c21.333%2c9.573%2c21.333%2c21.333v10.667 c0%2c0.021%2c0%2c0.042%2c0%2c0.063v0.01c0.042%2c5.854%2c4.802%2c10.594%2c10.667%2c10.594c5.896%2c0%2c10.667-4.771%2c10.667-10.667V202.5 c0.083-11.677%2c9.646-21.167%2c21.333-21.167c11.76%2c0%2c21.333%2c9.573%2c21.333%2c21.333v32c0%2c5.896%2c4.771%2c10.667%2c10.667%2c10.667 s10.667-4.771%2c10.667-10.667c0-11.76%2c9.573-21.333%2c21.333-21.333S448%2c222.906%2c448%2c234.667V373.333z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var crosshair = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512%3b' xml:space='preserve' width='512' height='512'%3e%3cpath d='M256%2c512c-11.046%2c0-20-8.954-20-20V327c0-11.046%2c8.954-20%2c20-20s20%2c8.954%2c20%2c20v165C276%2c503.046%2c267.046%2c512%2c256%2c512z M276%2c185V20c0-11.046-8.954-20-20-20s-20%2c8.954-20%2c20v165c0%2c11.046%2c8.954%2c20%2c20%2c20S276%2c196.046%2c276%2c185z M512%2c256 c0-11.046-8.954-20-20-20H326c-11.046%2c0-20%2c8.954-20%2c20s8.954%2c20%2c20%2c20h166C503.046%2c276%2c512%2c267.046%2c512%2c256z M205%2c256 c0-11.046-8.954-20-20-20H20c-11.046%2c0-20%2c8.954-20%2c20s8.954%2c20%2c20%2c20h165C196.046%2c276%2c205%2c267.046%2c205%2c256z M256%2c276 c11.046%2c0%2c20-8.954%2c20-20c0-11.046-8.954-20-20-20c-11.046%2c0-20%2c8.954-20%2c20C236%2c267.046%2c244.954%2c276%2c256%2c276z'/%3e%3c/svg%3e\";\n  export default img;";

var laser = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0'%3f%3e%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='512px' height='512px' viewBox='0 0 16 16'%3e%3cg%3e%3cpath fill='%23FB5252' d='M8 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z' data-original='%23444444' class='active-path' data-old_color='%23444444'/%3e%3cpath fill='%23FB5252' d='M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z' data-original='%23444444' class='active-path' data-old_color='%23444444'/%3e%3c/g%3e %3c/svg%3e\";\n  export default img;";

var right = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 368 368' style='enable-background:new 0 0 368 368%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M365%2c177.751l-160-128c-2.408-1.92-5.712-2.288-8.472-0.968c-2.76%2c1.336-4.528%2c4.144-4.528%2c7.216v72H16 c-8.824%2c0-16%2c7.176-16%2c16v80c0%2c8.824%2c7.176%2c16%2c16%2c16h176v72c0%2c3.072%2c1.768%2c5.88%2c4.528%2c7.208c1.112%2c0.528%2c2.296%2c0.792%2c3.472%2c0.792 c1.784%2c0%2c3.552-0.6%2c5-1.752l160-128c1.896-1.52%2c3-3.816%2c3-6.248S366.896%2c179.271%2c365%2c177.751z M208%2c295.351v-63.352 c0-4.416-3.576-8-8-8H16l-0.016-80H16h184c4.424%2c0%2c8-3.584%2c8-8V72.647l139.192%2c111.352L208%2c295.351z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var trash = "var img = \"data:image/svg+xml,%3csvg height='427pt' viewBox='-40 0 427 427.00131' width='427pt' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0'/%3e%3cpath d='m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0'/%3e%3cpath d='m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0'/%3e%3cpath d='m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0'/%3e%3c/svg%3e\";\n  export default img;";

var eraser = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 433.25 433.25' style='enable-background:new 0 0 433.25 433.25%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M418.4%2c192.331c19.8-19.8%2c19.8-51.9%2c0-71.7l-0.1-0.1l-78.6-78.3c-19.8-19.8-51.9-19.7-71.8%2c0l-169.5%2c169.6l-54.2%2c54.1 c-19.8%2c19.7-19.8%2c51.8-0.1%2c71.6l48.3%2c48.3H10c-5.5%2c0-10%2c4.5-10%2c10s4.5%2c10%2c10%2c10h297.4c5.5%2c0%2c10-4.5%2c10-10s-4.5-10-10-10H225 l23.9-23.7L418.4%2c192.331z M196.7%2c385.831h-76.1l-62.3-62.4c-12-12-11.9-31.4%2c0-43.4l47.1-47l122.2%2c122L196.7%2c385.831z M119.6%2c218.931l162.5-162.5c12-12%2c31.5-12%2c43.5%2c0l78.6%2c78.4c12%2c12%2c12%2c31.4%2c0%2c43.5l-162.4%2c162.8L119.6%2c218.931z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var pen = "var img = \"data:image/svg+xml,%3csvg id='bold' enable-background='new 0 0 24 24' height='512' viewBox='0 0 24 24' width='512' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m2.43 15.67 13.688-13.698c.141-.142.332-.222.531-.222h.001c.199 0 .39.079.53.22l4.85 4.85c.141.141.22.332.22.53 0 .199-.079.39-.22.531l-13.7 13.69z'/%3e%3cpath d='m22.568 5.943.493-.493c.605-.606.939-1.405.939-2.25 0-.864-.336-1.668-.937-2.258-1.202-1.214-3.315-1.213-4.514-.002l-.493.493z'/%3e%3cpath d='m2.024 16.678-1.99 6.348c-.083.266-.012.557.186.754.142.143.334.22.53.22.075 0 .15-.011.225-.034l6.347-1.99z'/%3e%3cpath d='m6.97 8.788c.192 0 .384-.073.53-.22l4.842-4.842c.259-.258.605-.36.944-.335l1.184-1.185c-1.024-.548-2.326-.403-3.189.459l-4.842 4.842c-.293.293-.293.768 0 1.061.147.146.338.22.531.22z'/%3e%3c/svg%3e\";\n  export default img;";

var pencil = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpolygon points='51.2%2c353.28 0%2c512 158.72%2c460.8 '/%3e %3c/g%3e%3c/g%3e%3cg%3e %3cg%3e %3crect x='89.73' y='169.097' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -95.8575 260.3719)' width='353.277' height='153.599'/%3e %3c/g%3e%3c/g%3e%3cg%3e %3cg%3e %3cpath d='M504.32%2c79.36L432.64%2c7.68c-10.24-10.24-25.6-10.24-35.84%2c0l-23.04%2c23.04l107.52%2c107.52l23.04-23.04 C514.56%2c104.96%2c514.56%2c89.6%2c504.32%2c79.36z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var felt = "var img = \"data:image/svg+xml,%3csvg height='464pt' viewBox='0 0 464 464' width='464pt' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m25.945312 398.347656 39.421876 39.425782 113.519531-63.855469-89.085938-89.089844zm0 0'/%3e%3cpath d='m103.3125 250.339844c-1.671875-1.671875-3.984375-2.621094-6.34375-2.621094-4.945312 0-8.96875 4.023438-8.96875 8.964844 0 2.359375.953125 4.671875 2.625 6.34375l110.0625 110.066406c1.671875 1.671875 3.984375 2.625 6.34375 2.625 4.945312 0 8.96875-4.027344 8.96875-8.96875 0-2.359375-.953125-4.671875-2.625-6.34375zm0 0'/%3e%3cpath d='m2.625 448.40625c-1.671875 1.671875-2.625 3.984375-2.625 6.34375 0 4.941406 4.023438 8.96875 8.96875 8.96875 2.359375 0 4.671875-.953125 6.34375-2.625l25.375-25.375-12.6875-12.691406zm0 0'/%3e%3cpath d='m127.3125 226.339844c-1.671875-1.671875-3.984375-2.621094-6.34375-2.621094-4.945312 0-8.96875 4.023438-8.96875 8.964844 0 2.359375.953125 4.671875 2.625 6.34375l110.0625 110.066406c1.671875 1.671875 3.984375 2.625 6.34375 2.625 4.945312 0 8.96875-4.027344 8.96875-8.96875 0-2.359375-.953125-4.671875-2.625-6.34375zm0 0'/%3e%3cpath d='m319.3125 34.339844c-1.671875-1.671875-3.984375-2.621094-6.34375-2.621094-4.945312 0-8.96875 4.023438-8.96875 8.964844 0 2.359375.953125 4.671875 2.625 6.34375l110.0625 110.066406c1.671875 1.671875 3.984375 2.625 6.34375 2.625 4.945312 0 8.96875-4.027344 8.96875-8.96875 0-2.359375-.953125-4.671875-2.625-6.34375zm0 0'/%3e%3cpath d='m454.910156 49.941406-41.140625-41.144531c-11.601562-11.601563-31.800781-11.753906-43.554687-.3125l-27.445313 26.6875 85.765625 85.769531 26.6875-27.449218c5.65625-5.816407 8.777344-13.496094 8.777344-21.605469 0-8.296875-3.222656-16.082031-9.089844-21.945313zm0 0'/%3e%3cpath d='m148.070312 224.476562 91.167969 91.167969 130.824219-134.550781-87.4375-87.441406zm0 0'/%3e%3cpath d='m295.3125 58.339844c-1.671875-1.671875-3.984375-2.621094-6.34375-2.621094-4.945312 0-8.96875 4.023438-8.96875 8.964844 0 2.359375.953125 4.671875 2.625 6.34375l110.0625 110.066406c1.671875 1.671875 3.984375 2.625 6.34375 2.625 4.945312 0 8.96875-4.027344 8.96875-8.96875 0-2.359375-.953125-4.671875-2.625-6.34375zm0 0'/%3e%3c/svg%3e\";\n  export default img;";

var crayon = "var img = \"data:image/svg+xml,%3csvg height='512' viewBox='0 0 192 192' width='512' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m32.485 63.515h128v64h-128z' transform='matrix(.707 -.707 .707 .707 -39.279 96.201)'/%3e%3cpath d='m22.946 123.8-8.485 8.485a8 8 0 0 0 -2.332 6.089l.482 8.916-11.378 33.321a8.071 8.071 0 0 0 10.156 10.156l33.322-11.378 8.916.482a8.039 8.039 0 0 0 6.089-2.332l8.485-8.485z'/%3e%3cpath d='m189.823 36.118-33.941-33.941a8 8 0 0 0 -11.313 0l-19.8 19.8 45.255 45.253 19.8-19.8a8 8 0 0 0 -.001-11.312z'/%3e%3c/svg%3e\";\n  export default img;";

var chalk = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 18.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 324.985 324.985' style='enable-background:new 0 0 324.985 324.985%3b' xml:space='preserve'%3e%3cg%3e %3cpath d='M54.324%2c270.626c-12.33-12.332-26.508-21.168-39.921-24.881c-2.358-0.652-4.514-1.089-6.521-1.382l-1.348%2c1.348 c-0.003%2c0.003-0.007%2c0.006-0.01%2c0.009c-12.576%2c12.577-6.46%2c38.396%2c13.923%2c58.778c12.823%2c12.823%2c28.313%2c20.479%2c41.437%2c20.479 c7.057%2c0%2c13.054-2.268%2c17.344-6.557c0.004-0.004%2c0.008-0.009%2c0.012-0.013l1.345-1.345c-0.294-2.006-0.729-4.161-1.382-6.519 C75.491%2c297.133%2c66.655%2c282.956%2c54.324%2c270.626z'/%3e %3cpath d='M323.409%2c51.129c-2.901-10.481-9.62-21.375-18.918-30.672C284.11%2c0.073%2c258.29-6.045%2c245.712%2c6.534L21.175%2c231.071 c14.74%2c4.594%2c30.43%2c14.206%2c44.464%2c28.241c14.033%2c14.032%2c23.645%2c29.722%2c28.237%2c44.46L318.413%2c79.235 C324.866%2c72.783%2c326.641%2c62.801%2c323.409%2c51.129z'/%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var paintBrush = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 469.333 469.333' style='enable-background:new 0 0 469.333 469.333%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cg%3e %3cpath d='M401.781%2c0c-21.156%2c0-41.365%2c10.104-54.24%2c27.292l-78.906%2c112.302c-8.417%2c11.24-26.771%2c12.542-36.677%2c2.615 l-22.167-22.167c-8.625-8.625-20.094-13.375-32.292-13.375h-3c-12.198%2c0-23.667%2c4.75-32.292%2c13.375l-32.417%2c32.417 c-4.167%2c4.167-4.167%2c10.917%2c0%2c15.083l192%2c192c2.083%2c2.083%2c4.813%2c3.125%2c7.542%2c3.125c2.729%2c0%2c5.458-1.042%2c7.542-3.125 l32.417-32.417c8.625-8.625%2c13.375-20.094%2c13.375-32.292v-3c0-12.198-4.75-23.667-13.375-32.292l-22.167-22.167 c-4.531-4.531-7.125-10.802-7.125-17.208c0-7.615%2c3.635-14.896%2c9.469-19.271l112.833-79.302 c16.927-12.677%2c27.031-32.885%2c27.031-54.042C469.333%2c30.302%2c439.031%2c0%2c401.781%2c0z M405.333%2c85.333 C393.573%2c85.333%2c384%2c75.76%2c384%2c64c0-11.76%2c9.573-21.333%2c21.333-21.333S426.667%2c52.24%2c426.667%2c64 C426.667%2c75.76%2c417.094%2c85.333%2c405.333%2c85.333z'/%3e %3cpath d='M104.083%2c192c-4.167-4.167-10.917-4.167-15.083%2c0l-76.5%2c76.5C4.437%2c276.562%2c0%2c287.271%2c0%2c298.667 s4.438%2c22.104%2c12.5%2c30.167l16.385%2c16.396c3.354%2c3.365%2c8.573%2c4.104%2c12.719%2c1.781l37.604-20.885l-20.885%2c37.604 c-2.313%2c4.156-1.583%2c9.354%2c1.781%2c12.719l80.396%2c80.385c8.063%2c8.063%2c18.771%2c12.5%2c30.167%2c12.5s22.104-4.438%2c30.167-12.5l76.5-76.5 c4.167-4.167%2c4.167-10.917%2c0-15.083L104.083%2c192z'/%3e %3c/g%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var marker = "var img = \"data:image/svg+xml,%3csvg id='Capa_1' enable-background='new 0 0 511.956 511.956' height='512' viewBox='0 0 511.956 511.956' width='512' xmlns='http://www.w3.org/2000/svg'%3e%3cg%3e%3cpath d='m483.801 64.782-42.866-42.856c-29.24-29.235-76.816-29.233-106.055 0-8.465 8.462-237.437 237.385-244.257 244.204-2.813 2.813-4.395 6.629-4.395 10.607 0 6.817 4.36 10.538 4.429 10.642l-31.966 31.96c-5.855 5.852-5.859 15.359 0 21.215 5.695 5.694 8.832 13.265 8.832 21.317 0 13.698-8.761 21.209-8.834 21.32-13.581 13.59-44.322 44.354-48.133 48.167-4.708 4.711-5.745 11.962-2.548 17.804l30.098 54.997c4.795 8.761 16.686 10.483 23.764 3.406l60.608-60.595c11.76-11.756 30.894-11.756 42.653 0 5.857 5.857 15.354 5.857 21.211 0l31.97-31.964c.135.088 3.922 4.432 10.644 4.432 3.838 0 7.677-1.464 10.605-4.393l84.445-84.427c2.476-2.475 159.231-159.197 159.794-159.76 29.318-29.309 29.322-76.761.001-106.076zm-170.402 234.021-106.513-106.49 43.358-43.349 106.513 106.49zm-258.586 173.395-15.095-27.582 29.583-29.604 21.356 21.351zm119.585-55.708c-18.8-11.097-42.387-11.096-61.188 0l-24.024-24.02c11.116-18.745 11.131-42.427 0-61.197l22.687-22.683c8.085 8.084 75.452 75.436 85.225 85.206zm54.558-33.262c-12.197-12.194-94.367-94.347-106.513-106.49l63.228-63.214 106.513 106.49zm233.634-233.583-84.617 84.599-106.513-106.491 84.631-84.613c17.544-17.539 46.089-17.539 63.633 0l42.866 42.856c17.59 17.589 17.592 46.059 0 63.649z'/%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var dashedPen = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 18.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 181.213 181.213' style='enable-background:new 0 0 181.213 181.213%3b' xml:space='preserve'%3e%3cpath d='M144.744%2c57.682l-21.213-21.213L160%2c0l21.213%2c21.213L144.744%2c57.682z M35.673%2c124.326L0%2c160l21.213%2c21.213l35.673-35.674 L35.673%2c124.326z M119.05%2c83.376L97.836%2c62.163l-36.469%2c36.47l21.213%2c21.213L119.05%2c83.376z'/%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var circleShape = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M256%2c0C115.03%2c0%2c0%2c115.05%2c0%2c256c0%2c140.97%2c115.05%2c256%2c256%2c256c140.97%2c0%2c256-115.05%2c256-256C512%2c115.03%2c396.95%2c0%2c256%2c0z M256%2c482C131.383%2c482%2c30%2c380.617%2c30%2c256S131.383%2c30%2c256%2c30s226%2c101.383%2c226%2c226S380.617%2c482%2c256%2c482z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var rectangleShape = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M497%2c51H15C6.716%2c51%2c0%2c57.716%2c0%2c66v380c0%2c8.284%2c6.716%2c15%2c15%2c15h482c8.284%2c0%2c15-6.716%2c15-15V66 C512%2c57.716%2c505.284%2c51%2c497%2c51z M482%2c431H30V81h452V431z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var triangleShape = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 469.333 469.333' style='enable-background:new 0 0 469.333 469.333%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M468.208%2c453.88l-224-448.453c-3.625-7.236-15.458-7.236-19.083%2c0l-224%2c448.453c-1.646%2c3.305-1.479%2c7.237%2c0.458%2c10.385 c1.958%2c3.149%2c5.396%2c5.068%2c9.083%2c5.068h448c3.688%2c0%2c7.125-1.919%2c9.083-5.068C469.688%2c461.117%2c469.854%2c457.186%2c468.208%2c453.88z M27.917%2c448l206.75-413.479L441.417%2c448H27.917z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var pentagonShape = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 511.995 511.995' style='enable-background:new 0 0 511.995 511.995%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M507.807%2c200.272L262.474%2c12.859c-3.819-2.923-9.109-2.923-12.949%2c0L4.191%2c200.272c-3.627%2c2.773-5.077%2c7.509-3.648%2c11.84 l93.717%2c281.92c1.451%2c4.352%2c5.547%2c7.296%2c10.133%2c7.296h303.253c4.608%2c0%2c8.683-2.944%2c10.091-7.296l93.717-281.92 C512.885%2c207.803%2c511.413%2c203.046%2c507.807%2c200.272z M399.946%2c479.995H112.095L23.221%2c212.582L256.031%2c34.747l232.811%2c177.856 L399.946%2c479.995z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var hexagonShape = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M510.432%2c249.597L388.297%2c38.537c-2.096-3.631-5.967-5.378-10.159-5.378H133.861c-4.192%2c0-8.063%2c1.747-10.159%2c5.378 L1.567%2c249.841c-2.09%2c3.631-2.09%2c7.976%2c0%2c11.607l122.135%2c211.535c2.096%2c3.632%2c5.967%2c5.858%2c10.159%2c5.858h244.276 c4.192%2c0%2c8.063-2.288%2c10.159-5.919l122.135-211.569C512.523%2c257.722%2c512.523%2c253.228%2c510.432%2c249.597z M371.369%2c455.384H140.63 L25.27%2c256.003L140.63%2c56.616h230.738l115.36%2c199.387L371.369%2c455.384z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var starShape = "var img = \"data:image/svg+xml,%3csvg height='511pt' viewBox='0 -10 511.98685 511' width='511pt' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m114.59375 491.140625c-5.609375 0-11.179688-1.75-15.933594-5.1875-8.855468-6.417969-12.992187-17.449219-10.582031-28.09375l32.9375-145.089844-111.703125-97.960937c-8.210938-7.167969-11.347656-18.519532-7.976562-28.90625 3.371093-10.367188 12.542968-17.707032 23.402343-18.710938l147.796875-13.417968 58.433594-136.746094c4.308594-10.046875 14.121094-16.535156 25.023438-16.535156 10.902343 0 20.714843 6.488281 25.023437 16.511718l58.433594 136.769532 147.773437 13.417968c10.882813.980469 20.054688 8.34375 23.425782 18.710938 3.371093 10.367187.253906 21.738281-7.957032 28.90625l-111.703125 97.941406 32.9375 145.085938c2.414063 10.667968-1.726562 21.699218-10.578125 28.097656-8.832031 6.398437-20.609375 6.890625-29.910156 1.300781l-127.445312-76.160156-127.445313 76.203125c-4.308594 2.558594-9.109375 3.863281-13.953125 3.863281zm141.398438-112.875c4.84375 0 9.640624 1.300781 13.953124 3.859375l120.277344 71.9375-31.085937-136.941406c-2.21875-9.746094 1.089843-19.921875 8.621093-26.515625l105.472657-92.5-139.542969-12.671875c-10.046875-.917969-18.6875-7.234375-22.613281-16.492188l-55.082031-129.046875-55.148438 129.066407c-3.882812 9.195312-12.523438 15.511718-22.546875 16.429687l-139.5625 12.671875 105.46875 92.5c7.554687 6.613281 10.859375 16.769531 8.621094 26.539062l-31.0625 136.9375 120.277343-71.914062c4.308594-2.558594 9.109376-3.859375 13.953126-3.859375zm-84.585938-221.847656s0 .023437-.023438.042969zm169.128906-.0625.023438.042969c0-.023438 0-.023438-.023438-.042969zm0 0'/%3e%3c/svg%3e\";\n  export default img;";

var chatBubbleShape = "var img = \"data:image/svg+xml,%3csvg id='Capa_1' enable-background='new 0 0 511.072 511.072' height='512' viewBox='0 0 511.072 511.072' width='512' xmlns='http://www.w3.org/2000/svg'%3e%3cg id='Speech_Bubble_48_'%3e%3cg%3e%3cpath d='m74.39 480.536h-36.213l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-36.029-23.644-62.375-54.751-76.478-90.425-14.093-35.647-15.864-74.888-5.121-113.482 12.89-46.309 43.123-88.518 85.128-118.853 45.646-32.963 102.47-50.387 164.33-50.387 77.927 0 143.611 22.389 189.948 64.745 41.744 38.159 64.734 89.63 64.734 144.933 0 26.868-5.471 53.011-16.26 77.703-11.165 25.551-27.514 48.302-48.593 67.619-46.399 42.523-112.042 65-189.83 65-28.877 0-59.01-3.855-85.913-10.929-25.465 26.123-59.972 40.929-96.086 40.929zm182-420c-124.039 0-200.15 73.973-220.557 147.285-19.284 69.28 9.143 134.743 76.043 175.115l7.475 4.511-.23 8.727c-.456 17.274-4.574 33.912-11.945 48.952 17.949-6.073 34.236-17.083 46.99-32.151l6.342-7.493 9.405 2.813c26.393 7.894 57.104 12.241 86.477 12.241 154.372 0 224.682-93.473 224.682-180.322 0-46.776-19.524-90.384-54.976-122.79-40.713-37.216-99.397-56.888-169.706-56.888z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var move = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 16.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='511.626px' height='511.626px' viewBox='0 0 511.626 511.626' style='enable-background:new 0 0 511.626 511.626%3b' xml:space='preserve'%3e%3cg%3e %3cpath d='M506.199%2c242.968l-73.09-73.089c-3.614-3.617-7.898-5.424-12.848-5.424c-4.948%2c0-9.229%2c1.807-12.847%2c5.424 c-3.613%2c3.619-5.424%2c7.902-5.424%2c12.85v36.547H292.355V109.641h36.549c4.948%2c0%2c9.232-1.809%2c12.847-5.424 c3.614-3.617%2c5.421-7.896%2c5.421-12.847c0-4.952-1.807-9.235-5.421-12.851L268.66%2c5.429c-3.613-3.616-7.895-5.424-12.847-5.424 c-4.952%2c0-9.232%2c1.809-12.85%2c5.424l-73.088%2c73.09c-3.618%2c3.619-5.424%2c7.902-5.424%2c12.851c0%2c4.946%2c1.807%2c9.229%2c5.424%2c12.847 c3.619%2c3.615%2c7.898%2c5.424%2c12.85%2c5.424h36.545v109.636H109.636v-36.547c0-4.952-1.809-9.234-5.426-12.85 c-3.619-3.617-7.902-5.424-12.85-5.424c-4.947%2c0-9.23%2c1.807-12.847%2c5.424L5.424%2c242.968C1.809%2c246.585%2c0%2c250.866%2c0%2c255.815 s1.809%2c9.233%2c5.424%2c12.847l73.089%2c73.087c3.617%2c3.613%2c7.897%2c5.431%2c12.847%2c5.431c4.952%2c0%2c9.234-1.817%2c12.85-5.431 c3.617-3.61%2c5.426-7.898%2c5.426-12.847v-36.549H219.27v109.636h-36.542c-4.952%2c0-9.235%2c1.811-12.851%2c5.424 c-3.617%2c3.617-5.424%2c7.898-5.424%2c12.847s1.807%2c9.233%2c5.424%2c12.854l73.089%2c73.084c3.621%2c3.614%2c7.902%2c5.424%2c12.851%2c5.424 c4.948%2c0%2c9.236-1.81%2c12.847-5.424l73.087-73.084c3.621-3.62%2c5.428-7.905%2c5.428-12.854s-1.807-9.229-5.428-12.847 c-3.614-3.613-7.898-5.424-12.847-5.424h-36.542V292.356h109.633v36.553c0%2c4.948%2c1.807%2c9.232%2c5.42%2c12.847 c3.621%2c3.613%2c7.905%2c5.428%2c12.854%2c5.428c4.944%2c0%2c9.226-1.814%2c12.847-5.428l73.087-73.091c3.617-3.617%2c5.424-7.901%2c5.424-12.85 S509.82%2c246.585%2c506.199%2c242.968z'/%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var photo = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 477.867 477.867' style='enable-background:new 0 0 477.867 477.867%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M426.667%2c68.267H51.2c-28.277%2c0-51.2%2c22.923-51.2%2c51.2V358.4c0%2c28.277%2c22.923%2c51.2%2c51.2%2c51.2h375.467 c28.277%2c0%2c51.2-22.923%2c51.2-51.2V119.467C477.867%2c91.19%2c454.944%2c68.267%2c426.667%2c68.267z M443.733%2c266.001L336.333%2c158.601 c-6.664-6.663-17.468-6.663-24.132%2c0L170.667%2c300.134l-56.201-56.201c-6.664-6.663-17.468-6.663-24.132%2c0l-56.201%2c56.201V119.467 c0-9.426%2c7.641-17.067%2c17.067-17.067h375.467c9.426%2c0%2c17.067%2c7.641%2c17.067%2c17.067V266.001z'/%3e %3c/g%3e%3c/g%3e%3cg%3e %3cg%3e %3ccircle cx='153.6' cy='187.733' r='51.2'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var undo = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 18.1.1%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 26.676 26.676' style='enable-background:new 0 0 26.676 26.676%3b' xml:space='preserve'%3e%3cg%3e %3cpath d='M26.105%2c21.891c-0.229%2c0-0.439-0.131-0.529-0.346l0%2c0c-0.066-0.156-1.716-3.857-7.885-4.59 c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0%2c0.213-0.115%2c0.406-0.304%2c0.508c-0.188%2c0.098-0.413%2c0.084-0.588-0.033L0.254%2c13.815 C0.094%2c13.708%2c0%2c13.528%2c0%2c13.339c0-0.191%2c0.094-0.365%2c0.254-0.477l11.857-7.979c0.175-0.121%2c0.398-0.129%2c0.588-0.029 c0.19%2c0.102%2c0.303%2c0.295%2c0.303%2c0.502v4.293c2.578%2c0.336%2c13.674%2c2.33%2c13.674%2c11.674c0%2c0.271-0.191%2c0.508-0.459%2c0.562 C26.18%2c21.891%2c26.141%2c21.891%2c26.105%2c21.891z'/%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var redo = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 18.1.1%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 26.677 26.677' style='enable-background:new 0 0 26.677 26.677%3b' xml:space='preserve'%3e%3cg%3e %3cpath d='M0.462%2c21.883C0.192%2c21.826%2c0%2c21.59%2c0%2c21.32C0%2c11.97%2c11.1%2c9.98%2c13.675%2c9.644V5.355c0-0.211%2c0.117-0.406%2c0.306-0.504 c0.188-0.1%2c0.413-0.086%2c0.588%2c0.027l11.858%2c7.984c0.156%2c0.105%2c0.25%2c0.281%2c0.25%2c0.477c0%2c0.189-0.094%2c0.365-0.25%2c0.473l-11.854%2c7.983 c-0.176%2c0.115-0.402%2c0.127-0.59%2c0.029c-0.188-0.1-0.303-0.297-0.303-0.506v-4.617c-1.867%2c0.014-3.409%2c0.098-4.696%2c0.252 c-6.166%2c0.729-7.813%2c4.432-7.883%2c4.59l0%2c0c-0.093%2c0.213-0.302%2c0.35-0.526%2c0.35C0.538%2c21.892%2c0.497%2c21.89%2c0.462%2c21.883z'/%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e %3cg%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var clear = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 298.667 298.667' style='enable-background:new 0 0 298.667 298.667%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpolygon points='298.667%2c30.187 268.48%2c0 149.333%2c119.147 30.187%2c0 0%2c30.187 119.147%2c149.333 0%2c268.48 30.187%2c298.667 149.333%2c179.52 268.48%2c298.667 298.667%2c268.48 179.52%2c149.333 '/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var screenshot = "var img = \"data:image/svg+xml,%3csvg height='512pt' viewBox='0 -21 512 512' width='512pt' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m346.667969 208h-16c-1.664063 0-3.265625-.789062-5.101563-3.15625l-19.242187-21.65625c-7.101563-7.957031-17.257813-12.519531-27.902344-12.519531h-44.84375c-10.644531 0-20.800781 4.5625-27.902344 12.519531l-20.074219 22.679688c-1.003906 1.320312-2.605468 2.132812-4.269531 2.132812h-16c-20.585937 0-37.332031 16.746094-37.332031 37.332031v101.335938c0 20.585937 16.746094 37.332031 37.332031 37.332031h181.335938c20.585937 0 37.332031-16.746094 37.332031-37.332031v-101.335938c0-20.585937-16.746094-37.332031-37.332031-37.332031zm-90.667969 138.667969c-29.398438 0-53.332031-23.9375-53.332031-53.335938 0-29.394531 23.933593-53.332031 53.332031-53.332031s53.332031 23.9375 53.332031 53.332031c0 29.398438-23.933593 53.335938-53.332031 53.335938zm0 0'/%3e%3cpath d='m448 0h-384c-35.285156 0-64 28.714844-64 64v341.332031c0 35.285157 28.714844 64 64 64h384c35.285156 0 64-28.714843 64-64v-341.332031c0-35.285156-28.714844-64-64-64zm0 426.667969h-384c-11.753906 0-21.332031-9.558594-21.332031-21.335938v-298.664062h426.664062v298.664062c0 11.777344-9.578125 21.335938-21.332031 21.335938zm0 0'/%3e%3c/svg%3e\";\n  export default img;";

var share = "var img = \"data:image/svg+xml,%3csvg height='512pt' viewBox='-21 0 512 512' width='512pt' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m389.332031 160c-44.09375 0-80-35.882812-80-80s35.90625-80 80-80c44.097657 0 80 35.882812 80 80s-35.902343 80-80 80zm0-128c-26.453125 0-48 21.523438-48 48s21.546875 48 48 48 48-21.523438 48-48-21.546875-48-48-48zm0 0'/%3e%3cpath d='m389.332031 512c-44.09375 0-80-35.882812-80-80s35.90625-80 80-80c44.097657 0 80 35.882812 80 80s-35.902343 80-80 80zm0-128c-26.453125 0-48 21.523438-48 48s21.546875 48 48 48 48-21.523438 48-48-21.546875-48-48-48zm0 0'/%3e%3cpath d='m80 336c-44.097656 0-80-35.882812-80-80s35.902344-80 80-80 80 35.882812 80 80-35.902344 80-80 80zm0-128c-26.453125 0-48 21.523438-48 48s21.546875 48 48 48 48-21.523438 48-48-21.546875-48-48-48zm0 0'/%3e%3cpath d='m135.703125 240.425781c-5.570313 0-10.988281-2.902343-13.910156-8.0625-4.375-7.679687-1.707031-17.453125 5.972656-21.824219l197.953125-112.855468c7.65625-4.414063 17.449219-1.726563 21.800781 5.976562 4.375 7.679688 1.707031 17.449219-5.972656 21.824219l-197.953125 112.851563c-2.496094 1.40625-5.203125 2.089843-7.890625 2.089843zm0 0'/%3e%3cpath d='m333.632812 416.425781c-2.6875 0-5.398437-.683593-7.894531-2.109375l-197.953125-112.855468c-7.679687-4.371094-10.34375-14.144532-5.972656-21.824219 4.351562-7.699219 14.125-10.367188 21.804688-5.972657l197.949218 112.851563c7.679688 4.375 10.347656 14.144531 5.976563 21.824219-2.945313 5.183594-8.363281 8.085937-13.910157 8.085937zm0 0'/%3e%3c/svg%3e\";\n  export default img;";

var studentStampMode = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 513.323 513.323' style='enable-background:new 0 0 513.323 513.323%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M256.661%2c257.323c-135.275%2c0-245.333%2c110.059-245.333%2c245.333c0%2c5.888%2c4.779%2c10.667%2c10.667%2c10.667h469.333 c5.888%2c0%2c10.667-4.779%2c10.667-10.667C501.995%2c367.381%2c391.936%2c257.323%2c256.661%2c257.323z'/%3e %3c/g%3e%3c/g%3e%3cg%3e %3cg%3e %3ccircle cx='256.661' cy='117.333' r='117.333'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var presentStampMode = "var img = \"data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 490.667 490.667' style='enable-background:new 0 0 490.667 490.667%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3ccircle cx='245.333' cy='160' r='74.667'/%3e %3c/g%3e%3c/g%3e%3cg%3e %3cg%3e %3ccircle cx='394.667' cy='224' r='53.333'/%3e %3c/g%3e%3c/g%3e%3cg%3e %3cg%3e %3ccircle cx='97.515' cy='224' r='53.333'/%3e %3c/g%3e%3c/g%3e%3cg%3e %3cg%3e %3cpath d='M245.333%2c256c-76.459%2c0-138.667%2c62.208-138.667%2c138.667c0%2c5.888%2c4.779%2c10.667%2c10.667%2c10.667h256 c5.888%2c0%2c10.667-4.779%2c10.667-10.667C384%2c318.208%2c321.792%2c256%2c245.333%2c256z'/%3e %3c/g%3e%3c/g%3e%3cg%3e %3cg%3e %3cpath d='M115.904%2c300.971c-6.528-1.387-13.163-2.304-19.904-2.304c-52.928%2c0-96%2c43.072-96%2c96c0%2c5.888%2c4.779%2c10.667%2c10.667%2c10.667 h76.629c-1.195-3.349-1.963-6.912-1.963-10.667C85.333%2c359.659%2c96.768%2c327.339%2c115.904%2c300.971z'/%3e %3c/g%3e%3c/g%3e%3cg%3e %3cg%3e %3cpath d='M394.667%2c298.667c-6.741%2c0-13.376%2c0.917-19.904%2c2.304c19.136%2c26.368%2c30.571%2c58.688%2c30.571%2c93.696 c0%2c3.755-0.768%2c7.317-1.963%2c10.667H480c5.888%2c0%2c10.667-4.779%2c10.667-10.667C490.667%2c341.739%2c447.595%2c298.667%2c394.667%2c298.667z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e\";\n  export default img;";

var img$7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAACyCAYAAAAJSP5WAAAgAElEQVR4Xu1dB3hUxRP/Xa7k7tLLpRdICAktwp9epIuCgCCIooL0Kr2IVKnSpUrvKkWaICCC0qX3EAIhCem9XHK5nuz/23d5jxyEEki4A+595Au527e7M/N782ZnZ2d4sFwWDrwlHOC9JXRYyLBwABYwmxkIHnzSnYgrB8JnwSyLbEopGwvDSsmw8mye+N10kjpvGvgAXL+fBu8fp1vkUwqGW5hVCmaVd9O7NZqQ/NtnmWEk/rXgOn4w3IcOsMjoBRlvYdQLMqq8m6UuXkESRn8LAqAQYLSzY7ceCNy1zSKjF2S+hVEvyKiXbRY3fBzxW7bguXy+37QtkZ8+AqsiMNPx7Bu2QfD5v59778vO7W27z8KocpTow56DiHzrakjbdUXQ4d3P5HXilFkkbeZkBsyABHzXADj26QKf+TOeeV/az2uI+spNiCpVhMfEce+0PN9p4ssRx7jjXo3kp95hwCnxrAnH/l3gPWPKM/mdvmoDoTfw+AK49vvmOSBeR9JnLYcy6RbjkmIWjd+Oge+KRe+sTN9ZwssTyLTvey3bE/m/fzLDWMMN0nZNIQmuBJ+f5pYJz+/Va03yLh3nyKBgduozBBU2/lwm/Zc3f8qj/3eW8PJgZvE+E8dOIskLZzOLOSEAu5YdYdusETymTSgTnt+v24LkXj7B9G94YADZpBnwmj21TPovb/6UR//vLOHlwczifabOXUTiJ4zhTADHXgNRYfOaMuN36o8LScbqX6GOvY4CAFJUhvu6iZD171VmY5Q3j8q6/3eW8LJmZEn93W3UmhQmZkIU5AvHLh0hG9yvTPmdunI1yd78O3SX4yD9ojECd2wu0/5fB4/Kcox3mviyZKQp+0rfuI3I+vR452X5zjPAlCC0jF22HLCAuWz5Ware0tasJ1CoUaDMR0G+AvqMTEBfwNnW6ctWE9nwQRYZvSBXLYx6QUa9SLPUZauI+/DBL8TT2MGjiOZ2BKzsbMCz4iP/0DHw4ABBoDts2jQE38UZhbkK+C6b90L9vcj83vY2FkaVgYQTf5hNNHciQJRa2HduB9kzNjziBo0kuav/ghYRkNZsBpKnhjYqAjrImY0P22YdoEtJRcG9TPCsrWHdIBAOXT6GWyk1dNqSlUSXkgGBswPcx498J+T8ThBZBngtsYv0tZtI1oZtUF/8lwkQopfTgGHwX7u8RL4mfj+NpP04nXGlUf8w9Q3T/+uKdvBE8IB9r05QHD8LZUIYs3sooDuIjT+EpGY1+K1c/ELySpk1n6RNXoBCpIMHCYTBoXD6pis83/Lt7hdiTnmB4U3vN6JOc6K4cpLbuKCAdvqgEyof2/8EXynwM1duhPzmGUYD04v+pqCmgKb3SiCDlUwGTXo48zkFshCVIW5VBdqoBOge3oVs2mR4TZ/4TLnFfNqDpO3dxoxBG9KHwja0IUJunX+r5f1WE1feD8u9Zm2J4tQRBoj0h4JGNmoC/ErYso75vDeR79wETdGkrOEI50G9kHfkJPJjbxgAV6sFrGwlUJw5zICZCocCmv7WFgFfgiDIloyAx8hvnyq7pEmzScLsSQatXqMJeIUAX+aIoJN/vtXyfquJK28w0/4j/tecKK6dNOzC2QejRu69Enka2fRDknv6KKfFGfu4bTfoIqLA0xZA4CMDz8UBBYmpUN88Az0AEXxh91UbqK+FIe/uRQbw9D6bpm3h/HUXuA54+ibMdcPzBbtOX0BcKRA+C2e/9bJ+6wl8HYCmQT/a8Cg49PoEfiuWlMjTB+27EtWfl8Gv5AH9gwTokWjQxp2/hG2jukABDx4TRvLS128mygtXoDx/GXx7B1hXC0be+n1QI4Ejhd4nDq4HlyG94D5iSMnjdfqcaO/EwLZNkxe2tV8Hr8pzDAuYy4i7aSvXErdnHHGKHzGe8O3twROLoLoZDsWuAyhEFmSTpsN79rQS5ZD8w49El5SKzLVLGM1PLzawiNHQ9Vsj5OLxp8owY8M24tr33dkZtIC5jMD8rG6SJs0g4PHgNcsQzxzzzUCSu2U3+HBBddx/pgxiew8m2ZtWcYvEx8dx+qgzAv/aZ5Fj0driNYjz3R6C+pbzT12BpNF7kNavDcW5C8jeshY2tVsg5OqJ5wIx+vM+JHvnRs79x95AtTXV0LUNa8R3/rIwoZwhkDhuKsn98x/wJELoo9OgyQlnbGXqW/adOReeU14svjnMtjJRKu4zgKZeCtoH69LzHDMRPovmvPOyfOcZUM5YxoOWHUnevweK/L0y6JDO2b/1SqFRk6bNIZnT10CNWC5GmoKZ/jjWaY7gKyffeVm+8wwobzDfb/gByT1/jBuGMpyaBtT1VqcUYKYdRH/Wk+T8vpW5l914of1RX3KV22ffeVm+8wwobzBH1GxGFDdOccMI4Ahx7dqAFQ8hl5/uiShpXqnzl5DU8QugRiIDZhH8Ie36PgQyF/ivWvrOy/KdZ0B5g/kWfIkW8cXAbANp06Zw/KQt3MYMLzX/w4PqEUXkJcPmSd1WCLn8T6n7KG+aTdW/hRHlyPmHg4eTjFXLjEagIJTUaoKQ6y9nFtyv3YLkXj3B9En78lq4HO5jh1nkaHHNlSOSAUR+3IVkH9rDDGJI7mIAoG3nbgjat+ulAHi/2cck59QhbuK23rUgqOiGymePvlR/5cuB19v7O8+A8mJ3wthJJHvhLmgQabT4kwbWR5Woiy/N96jOX5Osfb8wHg26G0gfEueuPRCw25KT7qWZWl4geFv6pbt8WVvWcIkQKegos6XBDVHl3suHYkZ1+Zpk7/nFaFvbvkUHOLT/CG5jhr7T8nyniS/PByeyVQci/+eg0RCU2eJKtVHtwdWX5vuDNp+S3L/3cv2KKzcAT8SHbZtm8F38bm+cvDRTyxMIb3rfKT+tIMmjvuU2R6idzJ5Ese/0BSrt3/HSfL/XuA1RnwuHdWggCpKz4dCrE7SxcZBUC4FnGWVLelP5/9JMfVMJfh3zju7Rj2RsW89sO1MQ2zVuA83tWGZo93lj4Db45RKIpy9eSdJXbkJBlALST+uiIC0D0nq1oM9IR4Wt6955Wb7zDCgPcEd3702yt29iumaOQ9lVQ2GeEtIujRC459dX4nmYQzWilt/hIouo1pd9PxXePz479W150Glufb4SY82NGHOYDz20mrv/L6juXmQWaWz8sQTBcJs7EO4TRr8Sz8MQQlSI4MwWqv09ps6C14zJr9SvOfDuVefwzjPgVRlY/P6kKT+Q/P+uwsraGorDJ6BBJudftn/KQdfSjP+wzxCSu/F3FCCdATON0bCRhaJa+i2LHC2bJqWB0vPbRtRuQnRX4yFuXQva8Giokm4xoKMpbd3KQHve8a9FCmITIKpVHerrJxgwSwMboGrUBQuYLWB+PkBftEVUtx4kd9c2rriOFbxRiETmb0njVqhy7tViKBKnTCNpM6fDCm7gwxUahDMPiv377VD5zGELmC1gflGoPr1d6tKfiS4tA9mzt0FXtNtHF2XSlh2hT8uAJuw/ePy0HB6jXi1+In7UBJLx01xYB9SD0EuGvLOGLW2K4lqlDCV9darNswfLE10GcrkCELFTCISVvVCo0qAgQwFRoDe0tx/CplU9VNzz6nmTI9t3I9l/7uJOmkirNYHjl5/AylYK9xHv9s4fK0ILmF8RzJFtuxD5kT3MQk+EyuBXl0ETdo5J2iICULOMtGbUJ1+RrD9+ZcBsCP9sDdeBPZ5byOcVyXujbreA+RXElTB+CkmfP5Pb6aPMLM5Ql/7D4b9u2SvzOGPtFqK4dAXy9fugQQKzGWPb5EM4ftYJbiNeLOvoK5D5xtz6yox+Yygth4lGNmtHFKcMqbTYvBZUa1pLQ2D3zUfwX1VyQpjSTiVpyiySd+kKlEf3M+MwyWMatoHdx23gOXmsRYZFDLUworTIApCxYSvRPIiCNjYeuoeJKFDkQX3rP+bEtRi+cBr5JXyXlF1e5ZjeQwgp1CNvy07oIWdmLIQ/nEZ1h28ZlWJ7CTaY3S0WMJdSJOk/ryM5O/aD7+gISf2a0CUkQlQpANlbdkB76z/YlnG965S5P5HYCT/Af/4M5P31N3L/PcSVY3MaOgb+K9/dIpaPi84C5lKAOXnKj0Sfk4Oc5TugRSzzuqcLMnHVxtCHX4Zt968QsH1TmfL0XqsOJOefg3D9tAfUey9DjQhDXPR778NlWL9nJjYvBWlvRdMyZfxbwZFnEHHv/XaERwiUZ48wu29s2lkmMq5KXVS5e7nM+XkdTqQQ2ZANGIm8P/+FJukWrCvWhmxob7iNfXpa27ddFiXRV+bMf1uZmDhpBpH/+gdsWjeE8r+rUIWf544tUfvVddZgeE5+sexEL8qjjI1bSVyfnsw4Nn7vQRN3E0KfmrDv/AF8ly+wyO4xRloY8gLISp27mOTsPwLthfuw/eoDaG5EQHnnbFHchT3c5k2Fx3dl71XI2LCFJPT9hnkLsJc1giD9vBHEgRUg8vaG7BmZR1+AtLeqiQXMzxFn+oq1JPfIP+CJraEJi0RhVj606YYAImoz2zT9GEGnD5UbH2/bViQaRQznv6YDMbVOHKpB0uI9BO7/7aljp8z7ifAEfLg/Jz9H+toNhMcXwLXvN+VGx+t4at7oyZc3g9KW/EzSf96IwpQ8uE0agrx/TqMgNxeqC8dAA4lsu7WBTb334D62/Ko50R3G3COP0hUIEAI9Ihh/sxgBsPmiBfJ3nAEPeli3qgErF2cUJKXBtnUTFCiVyN1/GPr7iRB/1AiSSgHQZWTAysEeBVly6NPSAAEf6n/OAJBD2qoDbBrVh9fMNzM22gLmpzwR6Ws2kNRpP0GREgYxnOD4dVdk/rIODi07QlgjGDyhAH4Lfyx3/qUuXk6SRw9jwCukZSF6d4Dy7BWoIi9B4lyDOcyqSrnB5Z9j3hahTeH4ZSfmIMDdhi1I7vkTXKEeSq7EsyYEPs7QXo5CIWKZrXc2u6i1LBRWNgLoH2YDUMFp4iD4zPmh3OksC8X0RkyyLAgtbR8POnYneQe2MyCiu3pCBEGNSLj2HowKm1a9Vr7RTZPMTT8z8xBXbwx9WAIKmGygEhRAxZAmloUy5o8VZHAZ2x+F4EHk5YH885eRW5RskeUBa6rQhSUFMftbAm9ImtaC8vQ/0Bf1a9ukLazs7eDQqslLpRMrLd9fpf1rFcqrTPR13Zs4YSrRRD6EpHYNyHcfgvZaDGy/aAm6A5exaxsc/tccIddef/rYiNotiPLqCUY7Szo2gU2tUKju3oN812YGkNaoAj3uMhpaCG+mPpXdV51A8qmp8avRIrI4L9ljXfQztrIVCwqmFFznr5EfHQ2iJ5D1+xruo8w3Qs8C5mKSTV+3maRNWICCzEyIaleB9uoD8GAFaedG0McmQ3ntJNynzDKZTRn1aQ9SmKcATyKGwMkJurgE5J04UORVkYEgnQEtBSEVrNNX/QGtBvm/n4IOsUZ+cZbs4r7yRx4TwLpaE6junIUkqAEIH9BFJELSrj6CDu82W8yY7cRelyZmx8nYuI3kHjqGnD1bOaHT7xgTwzoEhRoN7Hq3RYVNP5ucZ4kTphNl2B0mLkQfFgd+oDuEnjJYOdmDJ+RDGxkH7e2rEFWrDVHVQJDcXKiPhqEQaohqVYD2ejQKkMiQTolhc3qw9QxZAlmgs5qeVnx17DsUFTasNDkPSsKHWU7qdQKZuqXkew5Dn5GFgqRsqJNvcG43yhwBzYHcti54UikC9mw1K36lLF1JdA8TYB0SCLeBxjUB4/p+S3RpWRD4uAP6AhSolRB5esFn/gxewtgJRH0vBlawYswnIhAyhS+JWgXN6bvQagzeErqYLG6G0P9LK9RE9Yc3zIoPxdcCrxM7ZjdW+rLVJHX4QijxgAt8ZzwCjdoCBQXQXoyCtH1dBP758lmIzI7o50zoYc/+RBMeA0GAB/J3HYcGKZyfm9rVzoNHwW/VT2YHaLObEOVz+pr1RDawHy916UryIkeCkqbOJl4zJpWaluTZ80jegePIu3iM00S0E9u6LUC0euhuxkFQ1RPOg3vBfdigUvf/poG4pPmmrd1IMpesY7bvqbamp2eE3rXgMqYP3Ee/2rnGsuaPyQREAZh75hyIQAACHki+CnaNaoPk5kF94SZsPmoOn/kzeSmz5hHVnXAQXQEkNUPhOXk8L3HCFKKNT2IsPm1MLArS5XDo3gHeMwx19p51pa5YReQH/kJhYgZ0d+KgQzyzaGLzJ9N7RXBGAbJg07ANbFu/D6+Zz+/3eeO+yd9HffwZkR/6nSFBWqMxeBIJCK8AIRefX/btddL9XOGXx2QyV20gGVt2oFCrA89OCuWpC9AhC/YfdUbB7QfQJt5mauQ5dG2PvKP/Iv+kIYbXpnZLOPX9HDm7DjCf0YtdvNi0/gTBx/94gp7kWfNJ3tmL4NvZwuZ/oVCcOAfF33uNikSyeY6L0yrxqQn36WPwLlU4fZqs7/jXJOrYG4ypIQ6qByuxCOrbZyGbMB3ec0uuLlseuHlenyYBsyER928Qt6gOSe1Q5GzYA2W2IU6XXXDQ15m4RhOGaVRz0u+sGR9rIygO0BMXhs/YvMdWCEAoop+g5zaCCN3sYI7/12oB3fWH0CKGewiKM4jtT+hYFW7ThsBtlCXEkvInolpjorxzjpGNCDJYwQ4aRMO+VQcE/XPQJBgyG29G/NjvScbC1RDYu0EQ6A719dPcOTo2Qqx4aTA6cdYMYAFPNTIFvKRmU8YE0dyJxntINmJsTMcvSfqB3xi6i5sRT2OECBVh07WJJQv9YwyiFWazVi9hFIgI9uDBHUpEQgJfhCL+3QYz5dX9DzuTvKP7ODcYXVywQGUTDlIAsiBkf7Oam/7N+IBdqwEZSugRA5/1W+HaryfH3Ijm7Yn85J9Mv3QVLoA3eFIHFCpjoIOKG5vZJm7aFk4d2sJ9XOkrQD3v9femf5+6fDVJHfYjU1DTmpGTDCqkQ4qKqIGYdxvMaavXk+wtvyH//L8QugbDsUdnCBztId93FPk3ThWluBJBC62Rz7c4oKlWtu/aA7AWIe/Xw1AjGT6P2XBRn/ciGTs3M1hyqNIQLmMGMceMIlt3InnH94MPKUQNG8L5s05mtzI3pwcgeeY8kj5lNrTIZabFKhSxRzBCU+6922B+2Hsgyd60BlaQQNyqNYKL7K644eNI/vGz0IXHwfarjziQsgs01qalf9sG1IPjFx1AeAQ5v+xDfux1uPcfAf91j4o7xo+eSJIXzzHkSIYHQpHCMD59/S9EdfM2JNUrQzawr9kIw5wAXHwuSZNnkvRZc6CBintTUhmIfasiND7cbPhnkonEDhhG5Gv3QtywKvjOzhDXrAp9agas7G2hiYyG8uB/sP36I9DdLcXZI8wRfjaTjzV8UIgEiCvXB8/JFvqENOgSbzNtPB5z5ieOn0IS58/ktLvHyO/KNAWAuYKvrOeVPH0uSZs2/Qkw21apj6p3X75yVlnP0yRgThgzkahuhkFSswa0icnQXA8Hz1YMvtjGEFeQehuioHrgWQuhCjvHJVgRIAh2nzWA6vcrIHjIhD8WP1LkPWk6vGc/chU97DOUZGxcyYVx2gTWZ3LA2XduB9lg4+3fsmbs29Rf3NBxJHPlAkZhFF9IOzbviEonD5gEQ2bjzUgYNo7osrJg27Ip5H8ehWLfbwx4CyNzUYho6ItsZTbQhU6cckz6XjPYfNIKKTOmMkxlYwdoO7rA8172M9yHD+GYG/ftWJKzYgvUSOeEQG1t2Q+z4PnDm3mawhQPyb06rYniynFul5SVh9NnPRHwu/nEq5jkqXr4zQCiS0gGtAXIPXOYASr9EfnVBgoLoEkwnJxgXWqszWyNQFh/WANZR/dzpgNN5M2aICUlKYztP5ykrzOU/GVB79SjLypu22AS2k0BxlcZM3bgtyRrzQru7cgCmfLSfeho+K1cbDZ8NMlEUhcuJcrb4cjf8i/jr2R9ymK/2rDr1BJWxArJy+eVuLFB2wrgAr6XD3RJScyJCh7SGHn5rFr7RCWnmF4DSebmNdwKnBLs2KI9gk78aRLaXwVYprg3IqQByY+4YCQLyjh6SMCcfMzsQ/baeZS+dhNR3roL5an/kHfbcGTfLrAOxFWDEHBwOy991XoSO7gfp00Nx5acwffyhirpNuwbfgArNxny/viNOb/GuooqzF0AzwnjOJDSKqk5W9Ywth67g1iAeEibtUXwqSMWMD9H8gkTppKsuXOhKzL72OaU3y5dv0Hg7i1mxUOTTCZl/lKSe+Q4tJfvoVCRzdi0Nl6hsGldH5K6tSHffRC02DlrEzPF0+u2hLRJPeQdOQldxAXqOUYh5FxmIbrp4jNtJvymPwoKih0wgqSuXcrIgJojkprNoLsRB+lnTRH4u3kJ4rVrlOcMSM2znHU7UIA0TllQEFNZULm4TZkFbzM7xW0SMCfPWUwyJi5HIWKYcEJV4nVGczr3HQpSUIjszasYbcqaH0yeCMhg3bgWBF6eyP59C9Pe5n/NGbWsvHGS0dAe4yaiwoJHJXepORM/dgSj+W1DGwP6QpA8LRx7f4qXCRk1N8CV53xuw5/QHb/iAGHXHA5tuyDwyB6TYOdZNJtkQkkz5pOMqQugLSoBxm6GuA4dDX1OHrJ/XcedGjaYGL7gwQa6oqSBfASABz4ch3YEz0aM7Pm/QYUYeIwYB7+lj9JWpa3fQuL7fcMsXmRf9WNOXNA0tM69vwCNly5PMLzJfSfPmkeSJn/H2clUBuwJbrFHdbj/MAayQb3Njn8mmRDdUcqYtYwBM50AUwIMQbDt2Ryq09egfHiVs5fp9/aNP4SVoyPyD+2EFewhm/E9NHFJIGo1qFdEfZL6nVVwHjUIvj89yot8t20XoiyWQIXJ2OlXC1XjrpuE7jcF4NFdepLMPVuLTn37wbZ7ayi2/8mYHK6PKQxzoskkQo0fMZ5kL93EgJkNGKI2MIGcizOmE2NjlVlHPf3bpnI9uI4Zgow1m6C99oArT0aZ6vTNQFTcsoaj6WZIQ6KPSAVBdJFgfCF+v4al1NhzEPjgk+4k54/tTCsRAuDQ72Pk7DoEobfMrHb8HifDJGBOnDidZM5ZCi2yIAmoBWmrRshdRyuPpjGgY0Fc0mRp4kDrllWg+PcAd4yHX2R3u/QajIqbHyVoifykOxFWqgBl+H1QDe3YvS/4ImtU3GL6E9bmpNEen0tku65Efng38zFVJA5dv4Y2Kg7WQQEI2PXqlbPKi3aTgJlmg89a/St4Ah74Pm4AzwqqEzSmWc7ZysVDPSnx9G/GI1HrfejvpUOtNATz040UQS0v6OLS4T5tJNyGPzqr97DHAELzralj4pB/7TSsratAFOIGp16fwcMSeP9UTFFlkzJnGpd/w675x8zi2bpaEPzXvHrBobcKzNTLkLVtDwSuDtCnZkEX9hAEiYymZUH8+FEmdiUtrlAbhQ9zmVRZ9JKGNIA4NIQ5Mh+4+xejhzOmcw8i32eomsomB6fb3m6jv4ff4vLPE1deQivvfmkOkaQ+o6EvWqDTBaCkQWuIKlWEtGYo3Mea10FWlh8m0cypi5aS9J/WQZ0QZpSEhLWTWX8mneTjdjM7cXa7265WU9i2bAL1zTAEHTcOennwYReSc3QPNwabN85l6DhUXGlJ1v2shyKu12CSf+oa1DEXGWVg16QtBA62ICIBAvdtNwlunvcQm2RSKUtWkuz1v6EwW42CxDRoEc/NkwWyNapCi/Ci3GmAtG4LFGQooSxiLmvPSeu1hHVFX+Ts3AXPpfPhNeKR1gjzeo8ok24yQUisqcKHEK4TJ8N3jvkcxHyekEz1PTUH846fgvL4fi4M16VbL7O1m00C5tSfVpKszbtgJRGi4GEGk5K1eB09ATwhbhwK5bmjDBMpGEXSEBQo06FDptGhV2mzdiAKFWhSQa816+FezH98r0lboo9Lg7ROVRTIc6H45w8mS6b7gimW41Ev8IQkjJ5AfBbP5TEHkFfvgVYRAbs2n6Ly33tNgpvnTdlkk7obWJ+ooi4yJoChfp4/9IgFH25w6NkZJE+JzH3buBX14+YFeyqbdejT733WrDdKUxXVuTtR7NsOgVcNkKRspropzZvmsXwy3IZZKps+Dxx3UIW4zO4Dvoc7k59E8c8ZWNlIEXR8v8lw86w5m2RSGSvXkbTZS5GfFMa4fiiYXVq0h+ZWLAozUyBpWg9ERyA/bwgPpRnirZtWgfp0GFSIZeihIGZzCxu2u5+sUx3T7RuSvmsL095woJUGHAXCcXQ3+FoWgM/EcsqM+SRu6njYVW0Ip55dYWVnh7yT55h7zDWuxSRgTlu+muQePQ5dQhLUNwyVTe0q10fBfRo4FMFl4WRPNtjVbAqBvzcUf2xn2pZ0iUoISYzp3pukbd/Enc6mOYwLoYS4bR0EmWFswfM05ev8PuaLviR9xwaI4QGHAZ9Bm5wK3Z2HsGnVoEzqgZcHLaYB88p1TLleolIid/URFCCS07KUSNaDwWaipIlHaM0NGorIflacGYZk24EIRZQRPQ86fE4yD+7kksWwp1Ns2nU16zzD5SHo0vYZXq0B0d25AAGqwfqDICiO7We6cP9+Ojx/NM/Fs0nAnDxrIcn5dR8KYjNBlPmMoaFCCncUigYWCesGQ3H5OAdsOtHiW9zF/dDshorP+i1GFUvvuFcjqtQ7nCeD/ocem3IZMxG+ix5F15VW0G97e1p2Qns/CqpzZyH0C4HI3x35Zw5DgMrw3DAZLn0f5SYxJ16YBMw0NiNj6XzOg1F8EvT/Aohg/X5ryM8c5nhVPGfG49mJ2I0W70kz4D17Ktfd/cbtSPa5w1woqQHMvnCbOwYeE8qvQpQ5Cbg0c0lbsYYoT1+A4o+LIJoCiOp4gmh0UN0+xygVh05fPrNUW2nGKo+2JgHzwz5DSObGnxl6qNkg9f8frMRCCAN9oTkcxtjNDn2GIH3jz1yA/rPATPuhhLgN+w6+yx9FzUSHYbkAACAASURBVEV1+Zpk7PnFCMwSj1qolmKJmisJTLSeC0RCZM5YDw1iIUEQ04webbMNqoOqkVdMgpcXBb5JJhc/YgLJWroOQKahJJhrDVgJ+eC7O0B74zoKkQtpiw7IOXGQS4zI1ukQQAKhUyDU2WFGQUmUEM+JP8CrWJmv6M96kczfN3MB5lSDSx2ronqO+SQueVFBlWc7mgc77/BxWFevAm1CEvJ2buYSU1K+0t1WVzPeLGF5YxIwp/y4iNAsRDSwXnczCRpNuJE5wQctNiOAHskMEGltaloqjJ4msQtqCEn9GlD8cgI6RBqZKj5zF8F9whiOpsimH5Oc04eMtsSFkED2w2R4/VD65OTlCShT9h3zeW+Su3MHrGvU5rKusgtxykxDet/RcDVTW9mkYE5fvYnk7NyLgpQMaO6eh6aYJOkCTVqnFXRXklAADXgQwuaT2lCH34c68gqEqAhhFS+I69aAKiwMimtnOVPE98dF8Pj+EZjvhjQgecx5wUc5NmjknXO/YfBfv9wkD7IpQfu0sZOnzCKZy7bDysMW6nuGWAx6MSm4IINs8nB4zjL/hOsmE2hEaDOivHWK0ZrF3W10M4RWCdWk32K0Mt+1BsT1gkEKCsC3t0dBchqDzMqnj/Bi+g0hiq3HUKiNZLS2z8x58JzyHUcTzTWXs3g7lIhh7GbW6+E6dAx8Vy4yGe3mCOi7vrVIfvx1o6lR2Tib+aKv+IRNItDU+UtJ6viFUCP+iQUeqxFYbUoXfqIKNSFpVBvWft5QXboKSf3/Qegsg/zfM9Ddj4E+KpKJhXafNgde0yca0XTHqwbJT7rNpculmtnp6/6o+Ms6k9BujkCmc6I++dyDO420Mt0xdR0yEn4/L3kjeGWSSRoS8dF8v3JuccZuT7PCZhd8LKiFCAagZmxnQYWa4OkBXcINjvlWcILTgJ7wX/soC2jayrUkfugAzj/NZj5y6TcMfhYzw+i5orUF0+ZO407Fsz59u0YfovJ/R02Ck9I++CaZZNri5SR19EImzqK4z/jxjRD2OzblAHtCmBJpyN/ghkKkGVJ7VakPmyb1jbZa05asJMkjZ8Hm8w+hOXcD6oQbzHjOg0bCf/WboW1KK9BXaX8bFQlPag1+sDtIhgLq+KuQVKwLp37d4DHpUXKdVxmjPO81CZgpQRG13ieK62dAz/QJgl2hunfeyB1U/NiUmPo7HYXQ5IRz2952lRtA0qwe1DduQ3H5BBNE9PjOXtLkWSTn2Ak4fvwBcjbvhSr6EvMQuIwYD9+l801Ge3kK9FX6vlOxNhHXrorCzGwoTvxZVMPEF47Dv4Lvsrlmzy+TTTCq89dEvu8XOHb4EqLACshYModLo0UFwk7MEHcRBJ6rCNqMOxyY3QePgnXVEOT+cQjy4wcYMHut3Qi3AX04mh72HEgUh89CVL8qlId+L6rJ4Qy3mePhMWWCyWh/FcCV573hwfUI8tXQJtwySlzpPXcx3CeMNnt+mWyC0Z98SXL/+A0057KgiitUdw1FE1kbWVy5AYTeblCeOPAEyOmkHTp+BVJYgLw/dxSB9MlEfg/afEqy/t7LaGP6wx2bGj8JvvNnm4z28gTkq/RN45cVuMvtmFIG0R/vZavgPtz8479NJtDIj7sQ9aErEL7nB+1N6lpLYV5r1KalGxve61ejUK9F2qBFUCOCKTRp82lbFGbJUajRwbZpI+TuPgxl1EUOpF4/zofn9+M5mugDk/XHb7Cr3RL2H7dC5sJtzKlum+qN4djtY3hONfZ8vAoQ3oZ7b0JCaKkH9qKMlFZpCNehveD+7UCTYeVFeWuyCd6t1oQo75zl/L/s6Wuhcw3os25D+lFnWNk7Im/XJq6CKtXWRJ4PfWocHL/5Eqprt5B/+1Fmfa9JU+Eze4YRmLP/+A2OH38OYYA/cpavN+TqcK8B1zG94D7+0QbLizLsbW0X07M/yd66zqhaLfMG7NYTlXaZT0LxZ/HfZGC+U6EOUTy8woGZTpKW5RIFN4T63vkim9kReuRwGpudLNXekhpNoLtNt7gNh2GpGeG1Zh3cBvZ/BOYuX5G8PXth/+lnUF28BXWiwZVnW7sFQq6aV6lcUz8kd3xDiSresFFFL9aN6dhrACpuXmsynJSGLyab5B2fmkSRcMMIzGy6VMpIGo9BzwSyJ0tYNx0TZQdf2Hb/APmnLzPFeUTWIRDW8kblC/8Y0RPzVT+ivXMf0mYNkL3UoJXp5djmU1Qy00OZpRFeWbWlKRlyj+4BHy4Qh1YFTyREQa4SJFcNl5E934jFX3GnQVnx5YX6oUUS08YsglJryJrPuuFYDctkKQr1gfrWKW5VzS5GDJVZveDQpwt0uTnQxScAqkIQ6FHl1jkjMNPTxYojpyCuUwO523YzYGb8zL2HoMImS4ouym+a9Slr21pDbfKqDeHS70u4jR7GS523lGiTkuG71PxdcsVt/BcCYFk2oiGHaSMWQ40oBlzswVTW1LDv2R+FmbmQH9rJxW3QdmK/upC2rgfFiQsA0cF97FBo0zORNn0x9MiAz5Jl8Bj5qMIqzdCfNKA3JI3aQpMSD3V0GM2aAddxg+CzYJbJ3kplyctX6Stl7iKSOmEG9EU7sQJ4QDZtODynT+RlrN9CXPt980bxyGSTDfcMJfnJBhut+M4f/VtkHwyI+ShMy4YAztAjhYmecxr0JXxXL+YljJtIshf8CmnXpuDbSqE+fwsCX1dUOv5kUfI7qESEDQJh16EVcvYdhurKSdh/2AWVjppfsuxXAWZp702ZNY/o5XkoVCoh/d97yNywDYr/jsOp4xcIOLDDZLgoLR3F25tk0mkrV5OsTduhvXKPAWrxWn5080NctR6qhl8ymlv68jVEeeU6/Les5qUvXUXS12yCOvwSd1jV7vOeCNj55Ko7fcMWkv7jz5A2qglNRBTUl47DtvPXCNxnnJfuVZj4pt2bOncRyd6yG6L3QhCwYxPD53v1PiD5l45B5FANsqkD4D5mhEmw8Sq8NMmEk2cvIHmHT4An4iP/xEEuqSGToK9KfbgO7/tE1ShKJC3ck3/lBvTpmVAcMKQdoATQ++w6fIZKB39/gh5qamRt2QH1OZplVMW0t/u0BwL3bjMJ7a8irLK6N2Hk9yRzCT2S5gjbHh9A5OMN5ZkryD97CJLGbRB87u83kjcmmXTC2MkkZ+Fu5qwf9U6wqQXows9t4XC4j326VsjY+AvJPXwU8t2G7J70olmKnMf3gc/8mUb0pK5cS+Q7/oD6zC3GhUe/pGPY92v3TkfNxXzVn8h/NfiUxdIQOPbvBNX128g/fQiyxw4Fl9UD9Dr6MQmYo7v1JvJdm7hkL2yCcaePP0fgoZ3PnVNM934kd/t6zt6mR+CdJn4F78eSIabMWUjyjp1GoUoF9YVLTMyz9H/N4fBZe3h8P/a547wOAZhijLjh35GsZSugRz6TEpju8CnOX4Lqr8twnzkcrkMf+epNMb+XHdMkAqX+39xfD8DK1hmimgFQnj3MAFs2ZiL8XiCfxf0WnxDtibvM0rEA2dAjkyl06bH4B7iPfpQFNHbQSELUOkiqV4b8j7+hOnMIfOrWG/YVfJcbp7RNW7ySuI0eahJ+vKzwXuW+u6GNierWOUjrt0bIxeMM3dGf9yH2zRrBdcibWbzIJMJLmjiTZMxZCx7EkLYNhT5HAfX5C3Ac3Bv+q54fZ3y/SVuiPUt3/8KLBecDXkt/hseIR7Wzoz/rQdTX7qJq1BVe/LBxJHv5UhRAy5w0qfDLOl76kpVENtIA4Pjh3xGhp+yd0dgJY74niis34dilIzyKqg3crd6YCLw8EPT3m+npMQmYqX8zfcJaaHHPkBjRpw40CVcgqd8KIReNd/FK0j5h/v8j+thrjL1N72d3Bz3mLYHHd4+Su8QOHE5y1xyB4+iuTDe5i/ejENkQVPaHda1qEPl6QZ+aDitbKZPy1koqgv/6RzVRHh87Y816whOIzDajT2k0Na1ekLN9PwS+nsz5Ss2Fu8y5SxEqw2P9RLj262USbJSGhsfbmmzCNHeGfN1+qJQRkCAAWkQzoHSdMAU+c40XcsUnHT90FNEnZyBv72loi06qWPvUZJq4jR8IWbFQRWqbK3YdgZWjMwqKAvtp6TU9cpn2dq07MoXnlf/+y3g6BKgIu14fosLm1Qxf4oaOJgW5CohDgsC3kUJ5/Q54EiH8Vz86mvUqzDflvSnzfiIZU9dBqwlnMkjRN5bhwK83PJZMgtvIR284U86zNGObDMzJM+eS7F/2QXnvIuPNoPmZCTQQBPvD/pPW8Ckh3jj+2zEke8VWZgNFiySugAwlmBLi89MKuBUrvHOvcRuSf+5vbqHIek3Y7PzO3fuhQCGH4qAhcJ/ZZfSuBX4FN1g5O0Fz9S54VjxYOdugIDodVm6OEDesgYBfN5iMb6UR7rPaZvy8nqQMmQ8V7jMBXmzdFxHs4bH4R7yJ6weTCeV+kw+J4uxRrqilfcM20CdmQhNnKGhJA42kHzeAKNAHRF8I9e17UJw5zICObqywHhB295CaHN5TZsGnWD3n+++3I6oz18GXOkCjNLgB6WWImQY8l68FrIWQ7z8E5eHdnN+ajuHUrBMKc+VAoR6kkCD/9lnuXlpv0K5pY7NPivIsMKfMXkDSJs2HpqgWIxtSYA0J3KZPgee0Ny/W2yRgztiwlaROW4z8hBtMPjOCAhQi2sjnzAqCPcRa3DZ2aN0RmuMR0OA+04zNveE+cDgqFCvtRc0Mzd1I8MTWUF3+x6iEsW2LjnDq8Rlc+/TgpcycSzIXbUZ+TgSzAUPB7NZ7KApTUpF3ZDejtdgfG6dQOHRvA6GXBwrUaghlLpCNMP9TGI8D+37TtiTv9BGjuBgmtNazJtymDIVsyJvnnjMJmGm1qYz566FNNeSz4MGBCXZ5PPcyBWnx6qyGiDkXOA3tA8XR09A/SGHS+tFKrxSAnoNHGnlD6CnwtMVroE0wZOjnoyL0iGHGtO/wJfg+MuQePwN9pGExyS4oKaBt67WG5hK1yw22JPvQ2IU0guPn7SHyM7wxVFeuQ75uL3SIh7R5Wzh+/CE8xpl3htHEyTNIxqxF0EBudDqevq3cH/MIlZVZ8zr6MQmYKWHRX/YldFtaeWw/rODBlBqmWZpZs6F4WCibJJxOlgU43cqWIBDCmt5Q37jD+Jp9HzvQSrNaFmhUEHm4Q/3gIQRubiAqNXQpqSjMV4HkZEFvVQihowv4VtbQZaRDn54OYUVfSEOrImftXqgyDfmd2YvOwVBOwhlWtq6AvRW0SRFc9J8AvpC2awBhYEUQjRL+a1eYjMclASju27FEcewMVPcMx83YqEXKV5cuXyNwz5sbs2JSRj/sPYQor9wAz0oIKNTMTh31FliJRNCnKVCQmQ0eCKy8XCFtXgfioEBo4xOhCbsHfXIaBJ5uEAb4MGaEtb//E9mMXkUb0DBV5X9XkH/oHFSK+yXWI2SZJ4I/+NV9oAu7jgIoIaLx2NU8oL5zDuL/NYfQ3R1W/l7QuDojW6tmXIF8FyfUGfr6PAZpy1aT7O17oTz/t1H21OJvHf+Fy822YOWLyNKkYC4+wbS1GwmPx4Osf29mTunrt5CCbDkgsGIqHBVPIUC/p1VEqb37IkS+ShuagFtx8RIU245Dh1gGqPxAJ2ijrjD57eir2fGbAdDci4bywnHucC0ds/jbhWq+fNghD3xYwQWiJoGwrlQBkirBqPtd+Z1FTFuwjOSH3UH+sYvQJBlK1DEBXYG1gQIe1A+vMAtfW/+aqBZ7o9z5+SqyeN69b/Tkn0dcWX6fOmcx0aanQujnA6tCHrIPHYHy30PgwQm23TpAfe46VImGNQB7Fc/AREGUxwDaAHJpYE0Ivdwh9HQDdDrwJBIUKhTQ5+VD7OcNgYc7oNeDqNUQ+fmiTjHA31q/heReuwbbRg1Q8+vuT8gwZfY8os/Mhj49C4o/T0OTHcG9WVi3pDSgDgjfCtrIS7CCN9znj4f7+Dcv7PNxE7AsZf5O9ZUyZz5RXLgK+YETANIY2hm3n2NVkBwV1IjhQEQXqErqKalSG+q7VyFyrAR+gDuIVg9N2MUnjoex7kf6EIgdA+A3ZxKqDenLAPdMt2+IKjYO9m1aoMFMQ9mLy8PGEv6ZSxDeSIUe94rmIoEeKs42pg0fX2RLvELh+t0guBcLA3hThWjRzGUkuaSZ84j89wPQ3UqEpH09QKND9rF93AKLvsq1Af8Dv2VD5P93BdrwB8yi9XFNzi522aKd9HuRS1V4TRiMauOG8e6sXE+SN26FNjsLDq1bwKZpQ6jCwpE3dxPESIS4aAOJ5rkWuFSDNvMOY0YUz+nHjmk4DzkM/pvejlzVFjCXEZjZbtLXbSKFhQT6+CQoTpyC7mYs9Ir7jFZWUFC1aAfrCn4geh1ytm3gfOvs7iQViGPtVrBvWh+FahUKcxUQubrA2s8PPD4f+RH3kLF6LwqQD4c+XSEOrkzXFxBEJsAOGVw2Igm8YF23GpSXjzG2fXEw0/9boxokn9dHwM6Nbw0G3hpCyhiTZdpd0tRZJOvCJaQ9eIj86CzwKzkBegLdQ0NdFkYbOwWBZFPXZAKcWn0Cx+bvQ2BrC/D5DIiJRgNdTg6yjv2L3PPHmPmJguuAL7GG5sY5ODVsCeH5fzlNT80U2i97+MHgz6duRX9IOzZEpTf0nN+zBGMBc5nC9tmd3Vi8jMhv34Y+LR2FuXkozM6DPiwJVn4usGnZAFZSMfL2/g3b0Cqwr1cbQhcXVB01iJHRzSmziSIsHIprYdDRnBbZKuiQwBUwsqe5RIqSt7PApfcxAHZ7D9LmtSDw9YC1jy/cR72dcdsWML9GMBcf6trGLaRQLoc6NhaF+UqIgyqh3vgxvBNduhM+4UHi4wueSACBuweEbi7IPXMW+eH3UajTAyI+9GlZ0EZeZ8wKQbV6cHJxgr2VFfhqHXh2thBV8AFPZA0rkQBCP194FAvAMhHJ5T6sBczlzuLSDXBt229El5AIXkEhc3CXaNUQV6gAfYEWhQoVChVKaGJjoXuYAKIrgDg4EHYfNEPtIeaf2LB0nCh9awuYS88zyx1mygELmM1UMJZplZ4DFjCXnmeWO8yUAxYwm6lgLNMqPQcsYC49zyx3mCkHLGA2U8FYplV6DljAXHqeWe4wUw5YwGymgrFMq/QcsIC59Dyz3GGmHLCA2UwFY5lW6TlgAXPpeWa5w0w58EaBOX7YeAJSAL6tHbRp6RC4OoMUFkITHQO+jQRCJ1f4LJv3RtFUlrhImTaH8GhIaFwCxKHV4DboxbJ5pixcypy3tBIIIHBxhqwokWJZzu119GX2gk+aNY+o/rsC5WGaXzkNziNGgOj1SFu5kKtVx5aREEOGUKSbPU3lIdiHX/Ujeb+egCDUHXm3/oOYZhiZNAnes6c9kx8pi5eRlNHDjbI92Xz0KSr/tfep94WJAol9305M5QNazYvwAOdvPoPHRNPmvDZLwSdN/IHI9/4FfUQyUwuQzaVBg81FoY1RmJALVdZtBhPFi/swB0V9a6J6/Jt9yvhlwJ40bQ7RxsYha/Nqhic0KN+pcTtUPnf4mTIOb9ia5J0/bnR8iwb2O37WEwG/P1kj5l7dFiTv8gkm9JRN6UUHsGvWDpVPPXusl6GrNPeYHZhputu0CQuYWtr0MmQx8oSkUSi0/0VDhcii7ESP0nKxR/rZo0GeU2fDe8Yks6OtNIIpbdu4YeNJ7rY/oc4JZ261ZpLR1IdDx7ZwHWQ4CPv4FTPme5K26MdHp12KKQebyvVR5f5Fo/toObXEft8wZwopz9lDAPS3JKgeqkYaF1UqLQ2v2t6sBJ66eDnJWLQRqsTrDF10clTDiGADSe360FwN50Du+EEn8N1ckH/0AtQZdzjG0vtk346F74qFZkXbqwrqefffb9yG5J0zJHihl+3/msOmcV2m2qrPU6oR3PuoC8n8aw/TnioCqpFZxWDjXwvVYq8b8TDlx4Uk+fuxjEweL3cn8a2NqvFXTcpzkw5eXEApPy4iGcu3QZ10g2OutVModNm3ipkZMlg5ymDlaQfn3t3gMX4ML2H8FJJ/8jx4jjaAWgvN6XC4TO4Hr1lTzIa25wGxLL6//0F7knfsTy7NrySgHgR+buA7Oz21stbdGk2J/PZp7g3Ivtko4+xrNEHI7bNGPEyaNIOkzJ7KJZEs3l4SVAdVI6+YlOcmHby4EO/WaELyiqWNpVrCvt0XUBy+jkLcg7hmM9i1aQZhQEW4DTJkPSrpSp41j3hO/s5s6CoLoD6vj+Qps0jeiXPIO2vI6klBZtuwDZOKS/x+G4ScKbkUGi37kBt2jnmrFa+SS+93bPwhgs8dNeJj4piJJHXRHA7MrEZn3gRVGyAk/IJJ+W7SwVkhpSxYRlLGDWeOxLMMohNj62q7jvwOfkvK1+WWumgZk/eO5muWvhdqdoc+k6bMJPpsOZPSy33kt0Zyix85kWQtWQ8d0oqy3wMOn/WE8uQViGuHoNJTPBMR1ZqQvDtnjZKxs7awY+OPEHLuL+Nxvh1P0lbM57R/8fQItqFNEXzrtEnxZNLBWTBHf9GLZO/YzGXbYRlKv7ev1xrBlwzVkMrjiu7Sk2jDoyDwcgYEAmgiYqCLVYBX3R129WvBvnF9JodzacZOGDGBKGiq3JR0OPfvDl16JnQP41EoV0Dg7w27j1pC1v/Fa4Y86PAZyT/4OwMiWiaOH+IMnlQMYXAA7Fo2Re6BP6E4SAvdGzQszX8nqdEEmttnYdftawTuKjmzZ8R775Ocm2eM7GU2NYH0vfcRevOMEd205Fr6snmcXV6cJxLvWqiWaGxjl4ZnZdG2VEIqiwFL6uOOVyhRJt3i/Ma0DQtorx9mw+uHF/dMxA0aSfxWP79iVdyQUSTrZ1oYM4ObkqRlW9g0aYjco2egv3gL1nWqgC+VQODujoDfNz+XV9TEke88APXtc8yDSWvsOX7WHnl/n0KhSgvtrWjoi4prCr1qwrl/t2dmLk2aPJNkzFrA1GBhF2bW8Ie4ZS2o/72EAiSBBwkKoOJ4J/SpCU3CDQ5wsqGj4bdycYlzj/6iN1GH3YeVjQQCb3fk7f2V8VTQS1q5HqrfN/ZOxPQYQDK3rS0RBjQTque6H7jEl+WFlWf1+1wBlfekUpb/TFKGDXki6w4dl9rNNQ1ODaPrYd9hxEoigUDmCL7MBTR7KE38TWtrq89dg/Ogr59Z5fUeUx7iMGfW0AEoWKy9a8CmRV3oI6KhoQXjvxkAkpcPbVgURLVCIPb3hfdjVWDZicUOGkFUN+4ABQXQXb4LFVKY/NGOo7oyuaHzD+7k8smxyQtp7UL7L9pDEloNVnb2cBtmyJHBXtEdupHsg7u4ygD0S1qmQRgcCqJUAbk6qOV3uQ0PG5+asG33PnLWLmdoo+3dhoyC388/lSjnuMGjiDYtDUSlgZWzA+S/bOBqu9jUaIIqjy0AKZhztq1lAE+1f/HEkGKHaqguv2NSPJl0cCq0+NHfk/TFPxqlf2XdPtR3We0x32XChKkkfe4MbqEjDAyFlZ0tVDf+49K1ClERbotHGxW4ZAHyoOMXRH5gB5cln62NYnh4JBDCk0lxqEMKrH1rgqcuhDb9kUdFNm4ifBbMMeJb7OBRJHPVT5DWbAaHLu2gS0xC9uq1jMbke1djimpqL96DpqjiFaWP7lYWIp2hQ/pec7iM6PuEOfPgw84k5+g+DjR0UJpDzrpGEwgreMPKig/5H79xYBbBF+JmoVCeOsSAkr4dZF/0RcCOkgsKxfTsT3K2ruO0OFtOg/LC4SnmXVhAbZIffRVOzdtDe+kBUyuG0eRVGqPK3XMmxZNJB6dMiO7em2Rv32TEUHZhYV/rfYRcN7bbwirUJMqHhteoGBLYd/8CsBYhe/MaTqvQfh07d0elfduN6KNmQPrkhUzZCPaBYceiScHt6odCYGsPvUKJ3FW/Q12UIYh9EJgdRvihOuK4fhMmTCZZc9cz/m+qrZyHfwffZfN4UR9/TtT/3IVNj+YQOjuhIC8Pqmu3kHfhODO2bYU6KHiYxFTNom8gl9ET4bP40UOSMGwcyT9zAYobZ7hXE71PBA/YdWoFSb2aIAWFkB84BuVlQ5/0O+mHDaE+ehVaxDEa1LX9Fwj8c0eJco7p+y1J37CC89GzC27a2K5dVwQd3v3Effe79yKZ2zfD+9txUF27gfz/DKnCbGq1QPD1EybFk0kHp0yIbN2JyI/v5xjKFsKh39m/9z5CHluE3IIHocChmsfOrwYcunwMTXwCMnf/YmSK2NdojJDbxpoisl1XIj+8m2nHviIpmO0atUG1/4zdV7F9h5KsDSuZcVgzhC2Z4D1jLrymTmB4FzdiLMlaupDpk2pCIWRwHNgdIn8/WIms4Tb2Uflj2uYWnIkGWZynhn2obEIaoEqEwbVFq8nSCgEFqenIO38M1giA9fuVoTxzGQ59vkCFjSs5uaUuWEYyV25lkoaLA+rB4fO2yN1zFNr7N6GCCs4tOqDyiYMlyjlh4g8kdc4PXD46h2qNUZCRC4GvO4KvlLzovl3rfZJ7/QxTbo3tlP62rd8GlS+W7AJ83Ewsr79NDuaYL/uSrN82GGrwBTeG9l4YdJAz9EpK2IVK/G4ayf3tAHTxCbBp2xTi96oi7/gZyK+c5Kq1UoDYVW6AKveN/Z6RHT4n6oPXoEckNEWAplrRe/JMeJewyRIe2IAooy5wvGcfAJdPv0Klvb8yvEtdsJzkHjzKOHdVJ09Dh1wI4AnHoZ/Df+WTC9Gozl+TrH2/GJWVoB3RUnGhiGX6fND6U6I+EwG9JpwrFWf36VcoVGtK1JbpazeQ7H2HmRRf1v7eiBsznNvNc/z8GwTu3FKinOl9SQP6Ql1EITVh6GX3QSdUOra/xHvCG7Yieef/4TxPbIJGu/ZdEfTnk5q8vIBbUr8mB3PipBkkffZUCNxrQFTZF+ozF6BFFjNXiXLN2QAACiRJREFUIVzwHjJLnGPahi0Eag1Ut8OQvXoZA07akN2VorEJstnD4TFpHHM/LSuhun4TqntRyD3+B6dxqQD9lq+G62OLL+at0aIDkZ84yGlyloEOdVsg+LLhlXq/UVui/O+IkbZn8h4PGQX/EhZeSVNmkYSZkzlZ0Fc7/aEXu9i997/mJP/aSa72CO3Ppk5z8H08UGl/ySZDbL9hhCfgQ3s/Gln/HoA1HMCXesJ5fI9neoPuVm1IcsPPc7wzaNmWCL74b4l8fzjgW5K2doXR3MQIgvO4L+Cz4OmVdV8HqE0O5tSlP5PcYychqRUKbfRDyH+lzn8DKOnk3MZ+z9Ta8/iu5PDChNHfk7TFP3KeAnof1aDUfrXr+AWXujV14XKStXUHlLfOMf1T84JJOkgru/68Bm4l5Gqjbr7crX9Bp4zgvAP0PvtiQTh3K9Yl+TGXOTBI/tcMPCd7Jm+y/8+LnuBv+qoNJG5wX04z0wYG/zEtsrka7sMG8e7Vb0kUF/9l5M/a9HSuwur1UD2s5GAe+uDlnzhotNXMlG8uYcFaHFgJYyaS9EVzOHBSu9tlwkB4zZ1eIjZoLZmkibOgS6HZ+R1g92kHCH28IKkWDI+BJQc0vQ4g0zFMDmY6idgBw4jQ0wvyvUeQXxQrQD+nAnT+dhT8V5TsWqJt0latJcmDBzCamdXKLJhdR02A709zDebA/KUkZfwiqBHH8JZ+SPun9/isWg/Z4CcD2eNHTyC6B/HIO7AXauqZKLKLHeu2RPBlg+a6/0EnomDKvwGikAaQtmzEVMii//xXPTnv1GWrSMLwwU9sPDDmzoatkPXtybvXqj1R/POnEZgZ16F7JbyX+qDk179vbaKIv2qUVJx24NprEFcL/GmgSpw6kxC1CopTFyH0kCHwj5K1P3s/VUC6pETwBKLnxku/LiCbDZgTJ0wn8t8PQh11hfNIUInZt2gPu44fQuDg+MxdOLooVCPFCMxiBMB9wSi4jzMswJIWryBZO/+A/mIMxLV9ob56AnSDQeDtBpcBPeDa98ldvqhPuhP1hTCm+Ca7EDS4u3ojYMcmpt/EqTOI6swlKE78Ccd+w2AdHIj8K9cgtHOA//onyyvEjfyOJC+Zx8iYvj1o3UC6kSJEEGogkukzqlsPIt9FN3QeXQZvhRtqIu0JMNPinamjl0CFKCMe0Ltp1Vr/YlVrXye4XvdYZqGZKdF3A+qQ/OgrnP+YCRAfNBK6pBRoroTD7tM28CshrJPWt0sePogzA2hfBj9uINwXjYb7GENi7eQNv5DM9VtQcP4uxHUrQ3P5LFwnToHI1wewFjzxsFBzIHXMAiiUEZwWZz0PPj8uhMf3BrOHhq3yxCKkz1wFUbUK4MucoLwcxtT8rnx03xP8jf64G8k4ZNgIcW7ZEdZVKyNnxW4I61RAlSsnmfYJo74jGT/N42p5s1qHan/PYmOzYKF+7qxVP3G7d+zn9E3iMWUWvIvVE3/dAHud45kNmGkRyYzpq5GfddtQFqFYPDMLIvtm7eDYuT3cRhqKQabOW0yydx6A4tpJTouxpQ9svN5D9aSbRvTd/7gLUR+ix6/iGU1r3+RD8L09oL37APZtW8B73iyufWTbLiT3yB7OHGBjFuwr1UfVB4+C1tM3biZZa3/hagCyDxMFkkuPAaiwba3RHOKGjSZZyxczD58Yvgz4YW0Fl2+/gscEw2I1YewkkrlwNmM6saYN/ZzSZlerBVz6fwXXIY/MonCHUKKUGzZ22MvwQAM+azfCdUCfp8qZuvayftuNwuspsAqWwTrIFzaN6sD9GUeg6N6Acvs5WMnEEIVWhLhqZfgsX2ByLJl8AsWf3IQJU0jW3HVcAH5x4dB2hgWbA4QVKoFnZwPd7SjokGgUoMQuAO0btEbIBWNfaeriFUS+/xAUp48wYJagIkT1AgFbPgTOMlj7+4JnLYYmPh6529YzbVj727Z1RxBbIZxafwjZtwOM+BY/5juSscigSYvb7XQ7W/JJPYgr+kGfI4cuNhF8F0eoboRD9eDqowi37r0RsN1gtrBXVNdviGL3Lq4EM/s59b449ByMiltX8RK/n0Hkf/wFdfh/ECIE/BqO0Ny+wLxJRA1aQujq/Ex3WfqazSR14FyoEWF0NE1SqS5cR/aF7Fvj7XU6h/ttPiGKv//gHhzDusMFjsN7w3+ZaQ9EmBWYKbNiB40kOau3QYNMTrDFKyWxWrr4b1ZrsZ9Rohx7DUbg5lVP0BfbfzjJWres6ASLM4TVq0Dg6siULOY7OUNzNxKqG6e4LWKDrWoD2cTxEFX0hax/yVrubrOPiPLUX088WKzrjWp2WhzHpltLKHb9Cy1T7dUXkhY1EfSUTQ3qbstav5w72cE+0LaN2sK+TTMoTp5F3klDQL5N3RYQBvghd+cWCFEZjt91g8BFBo9nFKpMnj2fJE8az23tPzLRPOD2w3B4/DDxCf6FIYioEcnIhn7JbiQ5fN0Hgb+YtnKV2YGZMomurrPX74Eu6YZRMMvj9heruYuDnRIkrN4QoWHnn0pbdM/+JH/rIWYrmRWGADLwfbyhS7jxRIFJGuvhMLTzU6PP6LyoVyVjyXqo713i4n0ff+1bww12X7ZH3m/bUQgV7Fp1hsMnHz7zaH9Uu8+I/PDvRi43up4QBzUAxAIQPqC/nwy7z9tAn50N+f4dsEYIbL5sBEloDXhMGPVUPmRs3EoS+4xiFEfxN4oUFeE6Zwg8JhrMnuLX/YZtSF5R/W16jzS0GeAogU2dmvBdbPAcmeoy6eDPIjp93WaiOH6KCTDXpd42CrZhfa/Fg8MNGw+uEDWvC8fun8JrYP9n0pY4eQZJn7UYhcgx8uVahzRAQUQWNLjPCFja+hNY+3nDtkkDuPbp+cw+aYB/zuFjKIiIhz4xEYIqAdDdNVRfNWx1A/QYP58vZGqC27X7AG4Dn27Psvyh7j/lsf2chqaToPSKZKGw+aQ5rCt4QyBzQd6/p6HY+Q/EzWtB6O0Bu1ZNnzvnB227EvkRwxY/S5y0WhOE3DE+MsXOJXnmXJIxZQn0SGHa23f6Cjbv14f7mOEmx5LJJ/AiT3Hy1FlEHRmFQqUKqtM3UFBUC5oFsxX8IP6wNiTv14Pf5O9fmKa0VRuJ8vxFEBRCGxUHK2pj/rGd97D3EJK9aSts2rWBU5dPIOv7zQv3SelJmDKDIF8NYZAfsmjcRNh/nE0qbdwGwedKH8OQtm4TyT1yEqq9p1GAGPARCNuvWqLir+tKNbfH+Z04cTqRb9kPno0IAjcHWLnJYCW1QcVfjBeuxe9LX7qKyA/8Be3DREhbNkCFdSteaQ4vgoEXaWMWk3iRib7ONik/rSCvWmos5uv+pOIvBqClzltCdBmZ4Hu5w9MMS5ilr1lPZANfLPvR65RDaceygLm0HLO0N1sOWMBstqKxTKy0HLCAubQcs7Q3Ww5YwGy2orFMrLQcsIC5tByztDdbDvwf1pntSEOIWBYAAAAASUVORK5CYII=";

var img$6 = "data:image/png;base64,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";

var img$5 = "data:image/png;base64,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";

var colorPaletteOptions = [
    {
        id: 'transparent',
        value: 'transparent',
        title: 'Transparent',
        style: {
            color: 'rgba(125, 125, 125, 0.3)',
        },
    },
    {
        id: 'white_color',
        value: '#ffffff',
        title: 'White',
        style: {
            color: '#ffffff',
            backgroundColor: 'rgba(80, 80, 80, 0.3)',
            borderRadius: '4px',
        },
    },
    {
        id: 'light_gray_color',
        value: '#e6e6e6',
        title: 'Light Gray',
        style: {
            color: '#e6e6e6',
        },
    },
    {
        id: 'dark_gray_color',
        value: '#808080',
        title: 'Dark Gray',
        style: {
            color: '#808080',
        },
    },
    {
        id: 'black_color',
        value: '#000000',
        title: 'Black',
        style: {
            color: '#000000',
        },
    },
    {
        id: 'red_color',
        value: '#f8433f',
        title: 'Red',
        style: {
            color: '#f8433f',
        },
    },
    {
        id: 'green_color',
        value: '#5fe119',
        title: 'Green',
        style: {
            color: '#5fe119',
        },
    },
    {
        id: 'blue_color',
        value: '#347dfa',
        title: 'Blue',
        style: {
            color: '#347dfa',
        },
    },
    {
        id: 'cyan_color',
        value: '#44f9f9',
        title: 'Cyan',
        style: {
            color: '#44f9f9',
        },
    },
    {
        id: 'magenta_color',
        value: '#f289fe',
        title: 'Magenta',
        style: {
            color: '#f289fe',
        },
    },
    {
        id: 'yellow_color',
        value: '#fbe739',
        title: 'Yellow',
        style: {
            color: '#fbe739',
        },
    },
    {
        id: 'orange_color',
        value: '#fb823f',
        title: 'Orange',
        style: {
            color: '#fb823f',
        },
    },
    {
        id: 'purple_color',
        value: '#8880fc',
        title: 'Purple',
        style: {
            color: '#8880fc',
        },
    },
    {
        id: 'violet_color',
        value: '#0c7cfa',
        title: 'Violet',
        style: {
            color: '#0c7cfa',
        },
    },
];
var actionsSection = {
    // No one will be active
    active: '',
    elements: [
        // ToolbarButton
        {
            id: 'add_image',
            title: 'Add Image',
            iconSrc: photo,
            iconName: 'Add Image',
        },
        // ToolbarButton
        {
            id: 'undo',
            title: 'Undo',
            iconSrc: undo,
            iconName: 'Undo Icon',
        },
        // ToolbarButton
        {
            id: 'redo',
            title: 'Redo',
            iconSrc: redo,
            iconName: 'Redo Icon',
        },
        // ToolbarButton
        {
            id: 'clear_whiteboard',
            title: 'Clear Whiteboard',
            iconSrc: clear,
            iconName: 'Clear Icon',
        },
        // ToolbarButton
        {
            id: 'whiteboard_screenshot',
            title: 'Whiteboard Screenshot',
            iconSrc: screenshot,
            iconName: 'Screenshot Icon',
        },
        // ToolbarButton
        {
            id: 'share_whiteboard',
            title: 'Share Whiteboard',
            iconSrc: share,
            iconName: 'Share Icon',
        },
    ],
};
var toolsSection = {
    active: null,
    elements: [
        // Pointers - ToolbarSelector
        {
            id: 'pointers',
            options: [
                {
                    id: 'arrow_pointer',
                    value: 'arrow',
                    title: 'Arrow Pointer',
                    iconSrc: pointer,
                    iconName: 'Arrow',
                },
                {
                    id: 'hand_pointer',
                    value: 'hand',
                    title: 'Hand Pointer',
                    iconSrc: hand,
                    iconName: 'Hand',
                },
                {
                    id: 'crosshair_pointer',
                    value: 'crosshair',
                    title: 'Crosshair Pointer',
                    iconSrc: crosshair,
                    iconName: 'Crosshair',
                },
            ],
        },
        // Laser pointer tool.
        {
            id: 'laser_pointer',
            title: 'Laser Pointer',
            iconSrc: laser,
            iconName: 'Laser',
        },
        // Move - ToolbarButton
        {
            id: 'move_objects',
            title: 'Move Objects',
            iconSrc: move,
            iconName: 'Move Icon',
        },
        // Erase - ToolbarSelector
        {
            id: 'erase_type',
            options: [
                {
                    id: 'object_erase',
                    value: 'object',
                    title: 'Erase Object',
                    iconSrc: trash,
                    iconName: 'Erase Object',
                },
                {
                    id: 'partial_erase',
                    value: 'partial',
                    title: 'Partial Erase',
                    iconSrc: eraser,
                    iconName: 'Spot Erase',
                },
            ],
        },
        // Line Type - ToolbarSelector - Color Palette
        {
            id: 'line_type',
            options: [
                {
                    id: 'pen_line',
                    value: 'pen',
                    title: 'Pen Line',
                    iconSrc: pen,
                    iconName: 'Pen',
                },
                {
                    id: 'pencil_line',
                    value: 'pencil',
                    title: 'Pencil Line',
                    iconSrc: pencil,
                    iconName: 'Pencil',
                },
                {
                    id: 'felt_line',
                    value: 'felt',
                    title: 'Felt Line',
                    iconSrc: felt,
                    iconName: 'Felt',
                },
                {
                    id: 'crayon_line',
                    value: 'crayon',
                    title: 'Crayon Line',
                    iconSrc: crayon,
                    iconName: 'Crayon',
                },
                {
                    id: 'chalk_line',
                    value: 'chalk',
                    title: 'Chalk Line',
                    iconSrc: chalk,
                    iconName: 'Chalk',
                },
                {
                    id: 'paintbrush_line',
                    value: 'paintbrush',
                    title: 'Paintbrush Line',
                    iconSrc: paintBrush,
                    iconName: 'Paintbrush',
                },
                {
                    id: 'marker_line',
                    value: 'marker',
                    title: 'Marker Line',
                    iconSrc: marker,
                    iconName: 'Marker',
                },
                {
                    id: 'dashed_line',
                    value: 'dashed',
                    title: 'Dashed Line',
                    iconSrc: dashedPen,
                    iconName: 'Dashed Pen',
                },
            ],
            colorPaletteIcon: BorderColorRoundedIcon__default['default'],
        },
        // Thickness - SpecialToolbarSelector
        {
            id: 'line_width',
            icon: FiberManualRecordRoundedIcon__default['default'],
            styleOptions: [
                {
                    id: 'thick_2px',
                    value: 2,
                    title: '2px',
                    style: {
                        fontSize: 4,
                    },
                },
                {
                    id: 'thick_4px',
                    value: 4,
                    title: '4px',
                    style: {
                        fontSize: 6,
                    },
                },
                {
                    id: 'thick_8px',
                    value: 8,
                    title: '8px',
                    style: {
                        fontSize: 14,
                    },
                },
                {
                    id: 'thick_12px',
                    value: 12,
                    title: '12px',
                    style: {
                        fontSize: 20,
                    },
                },
                {
                    id: 'thick_16px',
                    value: 16,
                    title: '16px',
                    style: {
                        fontSize: 26,
                    },
                },
            ],
        },
        // Flood Fill - SpecialToolbarSelector
        {
            id: 'flood_fill',
            icon: FormatColorFillRoundedIcon__default['default'],
            styleOptions: colorPaletteOptions,
        },
        // Background Color - SpecialToolbarSelector
        {
            id: 'background_color',
            icon: PaletteIcon__default['default'],
            styleOptions: colorPaletteOptions,
        },
        // Text - ToolbarSelector - Color Palette
        {
            id: 'add_text',
            options: [
                {
                    id: 'arial_font',
                    value: 'Arial',
                    title: 'Arial Font',
                    iconSrc: textIcon,
                    iconName: 'Arial',
                },
                {
                    id: 'crayon_font',
                    value: 'Crayon',
                    title: 'Crayon Font',
                    iconSrc: crayon,
                    iconName: 'Crayon',
                },
                {
                    id: 'chalkboard_font',
                    value: 'Chalkboard',
                    title: 'Chalk Font',
                    iconSrc: chalk,
                    iconName: 'Chalkboard',
                },
            ],
            colorPaletteIcon: FormatColorTextRoundedIcon__default['default'],
        },
        // Shapes - ToolbarSelector - Color Palette
        {
            id: 'add_shape',
            options: [
                {
                    id: 'circle_shape',
                    value: 'circle',
                    title: 'Circle Shape',
                    iconSrc: circleShape,
                    iconName: 'Circle',
                },
                {
                    id: 'rectangle_shape',
                    value: 'rectangle',
                    title: 'Rectangle Shape',
                    iconSrc: rectangleShape,
                    iconName: 'Rectangle',
                },
                {
                    id: 'triangle_shape',
                    value: 'triangle',
                    title: 'Triangle Shape',
                    iconSrc: triangleShape,
                    iconName: 'Triangle',
                },
                {
                    id: 'pentagon_shape',
                    value: 'pentagon',
                    title: 'Pentagon Shape',
                    iconSrc: pentagonShape,
                    iconName: 'Pentagon',
                },
                {
                    id: 'hexagon_shape',
                    value: 'hexagon',
                    title: 'Hexagon Shape',
                    iconSrc: hexagonShape,
                    iconName: 'Hexagon',
                },
                {
                    id: 'arrow_shape',
                    value: 'arrow',
                    title: 'Arrow',
                    iconSrc: right,
                    iconName: 'Arrow',
                },
                {
                    id: 'star_shape',
                    value: 'star',
                    title: 'Star Shape',
                    iconSrc: starShape,
                    iconName: 'Star',
                },
                {
                    id: 'chat_bubble_shape',
                    value: 'chatBubble',
                    title: 'Chat Bubble',
                    iconSrc: chatBubbleShape,
                    iconName: 'Chat Bubble',
                },
            ],
        },
        // Stamps - ToolbarSelector
        {
            id: 'add_stamp',
            options: [
                {
                    id: 'good_stamp',
                    value: 'good',
                    title: 'Good Stamp',
                    iconSrc: img$7,
                    iconName: 'Good Stamp',
                },
                {
                    id: 'well_done_stamp',
                    value: 'wellDone',
                    title: 'Well Done Stamp',
                    iconSrc: img$6,
                    iconName: 'Well Done Stamp',
                },
                {
                    id: 'excellent_stamp',
                    value: 'excellent',
                    title: 'Excellent Stamp',
                    iconSrc: img$5,
                    iconName: 'Excellent Stamp',
                },
            ],
            secondOptions: [
                {
                    id: 'student_stamp_mode',
                    value: 'student',
                    title: 'Student Stamp Mode',
                    iconSrc: studentStampMode,
                    iconName: 'Student Stamp Mode',
                },
                {
                    id: 'present_stamp_mode',
                    value: 'present',
                    title: 'Present Stamp Mode',
                    iconSrc: presentStampMode,
                    iconName: 'Present Stamp Mode',
                },
            ],
        },
    ],
};

/**
 * Render a button to use in the SpecialSelector
 * @param {ISpecialButton} props - Props needed to render the component:
 * - id - id that the button has
 * - title - title for the button
 * - Icon - Icon to use in the button
 * - style - style to set in that Icon
 * - selected - flag to set the button as selected or not
 * - onClick - Function to execute when the button is clicked
 */
function SpecialButton(props) {
    var id = props.id, title = props.title, Icon = props.Icon, style = props.style, selected = props.selected, onClick = props.onClick;
    /**
     * Is executed when the button is clicked and sends an events to its parent
     */
    function handleClick() {
        onClick(id);
    }
    var toolbarButtonStyle = {
        border: 'none',
        width: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: selected ? '#d9d9d9' : '#fff',
        borderRadius: '4px',
        outline: 0,
    };
    return (React__default['default'].createElement("button", { title: title, style: toolbarButtonStyle, className: [
            'toolbar-button',
            selected ? 'selected-button' : '',
            !selected ? 'unselected-button' : '',
        ].join(' '), onClick: handleClick },
        React__default['default'].createElement(Icon, { style: style })));
}

/**
 * Render a color palette
 * @param {IColorPalette} props - Props needed to render the component:
 * - Icon - Icon to use in the color palette
 * - handleColorChange - Function to execute when the color changes
 * - selectedColor - Color to have selected in color palette
 */
function ColorPalette(props) {
    var Icon = props.Icon, handleColorChange = props.handleColorChange, selectedColor = props.selectedColor;
    /**
     * Executes the given funtion when the color changes
     * @param {string} color - new color to set
     */
    function changeColor(color) {
        handleColorChange(color);
    }
    var colorPaletteStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        rowGap: "2px",
        borderTop: "solid 1px #c0c0c0",
        padding: "4px 4px 4px 4px",
    };
    return (React__default['default'].createElement("div", { className: "color-palette", style: colorPaletteStyle }, colorPaletteOptions
        .filter(function (_, index) { return index; })
        .map(function (color) {
        return color.id ? (React__default['default'].createElement(SpecialButton, { key: color.id, id: color.id, title: color.title, Icon: Icon, style: color.style, selected: selectedColor === color.style.color, onClick: function () { return changeColor(color.style.color || ''); } })) : null;
    })));
}

/**
 * Render a ToolbarSelector
 * @param {IToolbarSelector} props - Props that the component need:
 * - id - id that the selector has in the Toolbar Section
 * - options - options to be displayed in the selector
 * - selected - flag that indicates if this selector is selected
 * - selectedValue - selected value setted by parent
 * - colorPalette (optional) - Contains the icon and onChangeColor method
 *   for the color palette (if required)
 * - onAction - event that is emitted to parent when action is triggered
 * - onClick - event that is emitted to parent when selector is clicked
 * - onChange - event that is emitted to parent when selector's value is changed
 */
function ToolbarSelector(props) {
    var id = props.id, options = props.options, active = props.active, selectedValue = props.selectedValue, colorPalette = props.colorPalette, onAction = props.onAction, onClick = props.onClick, onChange = props.onChange, enabled = props.enabled;
    var _a = React.useState(findOptionDefinedbyParent()), selectedOption = _a[0], setSelectedOption = _a[1];
    var _b = React.useState(false), showOptions = _b[0], setShowOptions = _b[1];
    var buttonRef = React.useRef(null);
    /**
     * When selectedValue changes the value is found in all the available options
     * to be setted like selected option
     */
    React.useEffect(function () {
        var newValue = options.find(function (option) { return option.value === selectedValue; });
        if (newValue) {
            setSelectedOption(newValue);
        }
    }, [selectedValue, options]);
    /**
     * Finds the option that has the selectedValue defined by parent
     */
    function findOptionDefinedbyParent() {
        return (options.find(function (option) { return option.value === selectedValue; }) || options[0]);
    }
    /**
     * Is executed when the selector is clicked and sends an event to its parent
     */
    function handleClick() {
        onClick(id);
        onAction(id, selectedOption.value);
        if (showOptions) {
            setShowOptions(false);
        }
    }
    /**
     * Is executed when the arrow is clicked
     */
    function handleArrowClick() {
        onClick(id);
        if (!showOptions) {
            document.addEventListener('click', handleOutsideClick, false);
        }
        else {
            document.removeEventListener('click', handleOutsideClick, false);
        }
        setShowOptions(!showOptions);
    }
    /**
     * Is executed when the selector changes its option
     * @param {IToolbarSelectorOption} value - new value to set in selector
     */
    function handleSelect(option) {
        setShowOptions(false);
        onChange(id, option.value);
        onAction(id, option.value);
    }
    /**
     * Is executed when you click on the window to check if you are clicking on toolbar elements or not
     * @param {MouseEvent} e - Mouse click event
     */
    function handleOutsideClick(e) {
        var _a;
        if (!((_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) && !showOptions) {
            setShowOptions(false);
        }
    }
    /**
     * Is executed when the color is changed (if color palette exists)
     * @param {string} color - new color to set
     */
    function handleChangeColor(color) {
        if (colorPalette) {
            colorPalette.onChangeColor(id, color);
        }
        setShowOptions(false);
    }
    var selectorContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
    };
    var toolbarSelectorStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '32px',
        border: 'none',
        paddingRight: 0,
        backgroundColor: active ? '#d9d9d9' : '#fff',
        borderRadius: '4px',
        outline: 0,
    };
    var iconStyle = {
        width: '24px',
        height: '24px',
    };
    var arrowStyle = {
        width: '20px',
        height: '20px',
    };
    var optionsContainerStyle = {
        position: 'absolute',
        margin: '0 0 8px 56px',
        padding: '2px',
        border: 'none',
        backgroundColor: '#fff',
        borderRadius: '4px',
        zIndex: 2,
    };
    var optionsStyle = {
        display: 'grid',
        rowGap: '2px',
        padding: '2px 2px 4px 0',
        gridAutoColumns: colorPalette
            ? 'repeat(auto-fit, minmax(0, 36px))'
            : 'repeat(6, auto)',
    };
    return (React__default['default'].createElement("div", { className: "selector-container", style: selectorContainerStyle },
        React__default['default'].createElement("button", { title: selectedOption.title, ref: buttonRef, style: toolbarSelectorStyle, className: [
                'toolbar-selector',
                active ? 'selected' : '',
                !active ? 'unselected' : '',
            ].join(' '), onClick: handleClick, disabled: enabled === false },
            React__default['default'].createElement("img", { className: "icon", style: iconStyle, src: selectedOption.iconSrc, alt: selectedOption.iconName }),
            React__default['default'].createElement(ArrowRightIcon__default['default'], { className: "arrow", onClick: handleArrowClick, style: arrowStyle })),
        showOptions && active ? (React__default['default'].createElement("div", { className: "options-container", style: optionsContainerStyle },
            React__default['default'].createElement("div", { style: optionsStyle, className: [
                    'options',
                    colorPalette ? 'with-palette' : 'no-palette',
                ].join(' ') }, options
                .filter(function (option) {
                return option.value !== selectedOption.value;
            })
                .map(function (option) {
                return (React__default['default'].createElement(ToolbarButton, { key: option.iconName, id: option.id, title: option.title, iconSrc: option.iconSrc, iconName: option.iconName, active: false, onClick: function () { return handleSelect(option); }, enabled: option.enabled }));
            })),
            colorPalette ? (React__default['default'].createElement(ColorPalette, { Icon: colorPalette.icon, handleColorChange: handleChangeColor, selectedColor: colorPalette.selectedColor })) : null)) : null));
}

/**
 * Render an SpecialSelector that uses a stylizable Icon (Font like)
 * @param {ISpecialSelector} props - Props needed to render the component:
 * - id - id that the element has
 * - Icon - Icon to set in the options
 * - active - flag to set if the element is selected or not
 * - selectedValue - Selected value setted by parent
 * - styleOptions - Icon styles in the different options
 * - onClick - Function to execute when the element is clicked
 * - onChange - Function to execute when the value changes
 */
function SpecialSelector(props) {
    var id = props.id, Icon = props.Icon, active = props.active, selectedValue = props.selectedValue, styleOptions = props.styleOptions, onClick = props.onClick, onChange = props.onChange, enabled = props.enabled;
    var _a = React.useState(findOptionDefinedByParent()), selectedOption = _a[0], setSelectedOption = _a[1];
    var _b = React.useState(false), showOptions = _b[0], setShowOptions = _b[1];
    var buttonRef = React.useRef(null);
    /**
     * When selectedValue changes the value is found in all the available options
     * to be setted like selected option
     */
    React.useEffect(function () {
        var newValue = styleOptions.find(function (option) { return option.value === selectedValue; });
        if (newValue) {
            setSelectedOption(newValue);
        }
    }, [selectedValue, styleOptions]);
    /**
     * Finds the option that has the selectedValue defined by parent
     */
    function findOptionDefinedByParent() {
        return (styleOptions.find(function (option) { return option.value === selectedValue; }) ||
            styleOptions[0]);
    }
    /**
     * Is executed when the selector is clicked and sends an event to its parent
     */
    function handleClick() {
        onClick(id);
        if (showOptions) {
            setShowOptions(false);
        }
    }
    /**
     * Is executed when the selector changes its value
     * @param {string} value - new value to set in selector
     */
    function handleSelect(option) {
        onChange(id, option.value.toString());
        setShowOptions(false);
    }
    /**
     * Is executed when you click the arrow
     */
    function handleArrowClick() {
        onClick(id);
        if (!showOptions) {
            document.addEventListener('click', handleOutsideClick, false);
        }
        else {
            document.removeEventListener('click', handleOutsideClick, false);
        }
        setShowOptions(!showOptions);
    }
    /**
     * Is executed when you click on the window to check if you are clicking on toolbar elements or not
     * @param {MouseEvent} e - Mouse click event
     */
    function handleOutsideClick(e) {
        var _a;
        if (!((_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
            if (!showOptions) {
                setShowOptions(false);
            }
        }
    }
    var selectorContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
    };
    var toolbarSelectorStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '32px',
        border: 'none',
        paddingRight: 0,
        backgroundColor: active ? '#d9d9d9' : '#fff',
        borderRadius: '4px',
        outline: 0,
    };
    var arrowStyle = {
        width: '20px',
        height: '20px',
    };
    var optionsContainerStyle = {
        position: 'absolute',
        margin: '0 0 8px 56px',
        padding: '2px',
        border: 'none',
        backgroundColor: '#fff',
        borderRadius: '4px',
        zIndex: 2,
    };
    var optionsStyle = {
        display: 'grid',
        rowGap: '2px',
        padding: '2px 2px 4px 0',
        gridAutoColumns: 'repeat(6, auto)',
    };
    var iconContainerStyle = {
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    };
    return (React__default['default'].createElement("div", { className: "selector-container", style: selectorContainerStyle },
        React__default['default'].createElement("button", { title: selectedOption.title, ref: buttonRef, style: toolbarSelectorStyle, className: [
                'toolbar-selector',
                active ? 'selected' : '',
                !active ? 'unselected' : '',
            ].join(' '), onClick: handleClick, disabled: enabled === false },
            React__default['default'].createElement("div", { style: iconContainerStyle },
                React__default['default'].createElement(Icon, { style: selectedOption.style })),
            React__default['default'].createElement(ArrowRightIcon__default['default'], { onClick: handleArrowClick, style: arrowStyle })),
        showOptions && active ? (React__default['default'].createElement("div", { className: "options-container", style: optionsContainerStyle },
            React__default['default'].createElement("div", { className: "options special-options no-palette", style: optionsStyle }, styleOptions
                .filter(function (option) {
                return option.value !== selectedOption.value;
            })
                .map(function (option) {
                return (React__default['default'].createElement(SpecialButton, { key: option.id, id: option.id, title: option.title, Icon: Icon, style: option.style, selected: false, onClick: function () { return handleSelect(option); } }));
            })))) : null));
}

var ELEMENTS = {
    ADD_IMAGE_ACTION: 'add_image',
    UNDO_ACTION: 'undo',
    REDO_ACTION: 'redo',
    CLEAR_WHITEBOARD_ACTION: 'clear_whiteboard',
    WHITEBOARD_SCREENSHOT_ACTION: 'whiteboard_screenshot',
    SHARE_WHITEBOARD_ACTION: 'share_whiteboard',
    POINTERS_TOOL: 'pointers',
    MOVE_OBJECTS_TOOL: 'move_objects',
    ERASE_TYPE_TOOL: 'erase_type',
    LINE_TYPE_TOOL: 'line_type',
    LINE_WIDTH_TOOL: 'line_width',
    FLOOD_FILL_TOOL: 'flood_fill',
    BACKGROUND_COLOR_TOOL: 'background_color',
    ADD_TEXT_TOOL: 'add_text',
    ADD_SHAPE_TOOL: 'add_shape',
    ADD_STAMP_TOOL: 'add_stamp',
    LASER_TOOL: 'laser_pointer',
};

/**
 * Maps permissions to action tools.
 * @param actions Action tool options for canvas.
 * @param allToolbarIsEnabled Indicates if all tools are enabled for user.
 * @param serializerToolbarState Provided permissions for individual tools.
 */
var mappedActionElements = function (actions, allToolbarIsEnabled, serializerToolbarState) {
    return actions.elements.map(function (elmnt) {
        switch (elmnt.id) {
            case 'whiteboard_screenshot': {
                var enabled = allToolbarIsEnabled || serializerToolbarState.downloadCanvas;
                return __assign(__assign({}, elmnt), { enabled: enabled });
            }
            case 'clear_whiteboard': {
                var enabled = allToolbarIsEnabled || serializerToolbarState.clearWhiteboard;
                return __assign(__assign({}, elmnt), { enabled: enabled });
            }
            case 'add_image': {
                var enabled = allToolbarIsEnabled || serializerToolbarState.uploadImage;
                return __assign(__assign({}, elmnt), { enabled: enabled });
            }
            case 'undo':
            case 'redo': {
                var enabled = allToolbarIsEnabled || serializerToolbarState.undoRedo;
                return __assign(__assign({}, elmnt), { enabled: enabled });
            }
            default: {
                return __assign(__assign({}, elmnt), { enabled: true });
            }
        }
    });
};
/**
 * Maps permissions to tools.
 * @param tools Tool options for canvas.
 * @param allToolbarIsEnabled Indicates if all tools are enabled for user.
 * @param serializerToolbarState Provided permissions for individual tools.
 */
var mappedToolElements = function (tools, allToolbarIsEnabled, serializerToolbarState) {
    return tools.elements.map(function (elmnt) {
        switch (elmnt.id) {
            case 'pointers': {
                var available = true;
                var enabled = allToolbarIsEnabled || serializerToolbarState.cursorPointer;
                return __assign(__assign({}, elmnt), { enabled: enabled, available: available });
            }
            case 'laser_pointer': {
                var available = true;
                var enabled = allToolbarIsEnabled || serializerToolbarState.pointer;
                return __assign(__assign({}, elmnt), { enabled: enabled, available: available });
            }
            case 'move_objects': {
                var available = true;
                var enabled = allToolbarIsEnabled || serializerToolbarState.move;
                return __assign(__assign({}, elmnt), { enabled: enabled, available: available });
            }
            case 'erase_type': {
                var available_1 = true;
                var enabled = allToolbarIsEnabled ||
                    serializerToolbarState.erase ||
                    serializerToolbarState.partialErase;
                elmnt = __assign(__assign({}, elmnt), { options: elmnt.options.map(function (option) {
                        if (option.id === 'partial_erase') {
                            return __assign(__assign({}, option), { enabled: allToolbarIsEnabled ||
                                    serializerToolbarState.partialErase, available: available_1 });
                        }
                        else {
                            return __assign(__assign({}, option), { enabled: allToolbarIsEnabled || serializerToolbarState.erase, available: available_1 });
                        }
                    }) });
                return __assign(__assign({}, elmnt), { enabled: enabled, available: available_1 });
            }
            case 'line_type': {
                var available = true;
                var enabled = allToolbarIsEnabled || serializerToolbarState.pen;
                return __assign(__assign({}, elmnt), { enabled: enabled, available: available });
            }
            case 'flood_fill': {
                var available = true;
                var enabled = allToolbarIsEnabled || serializerToolbarState.floodFill;
                return __assign(__assign({}, elmnt), { enabled: enabled, available: available });
            }
            case 'background_color': {
                var available = true;
                var enabled = allToolbarIsEnabled || serializerToolbarState.backgroundColor;
                return __assign(__assign({}, elmnt), { enabled: enabled, available: available });
            }
            case 'add_text': {
                var available = true;
                var enabled = allToolbarIsEnabled || serializerToolbarState.text;
                return __assign(__assign({}, elmnt), { enabled: enabled, available: available });
            }
            case 'add_shape': {
                var available = true;
                var enabled = allToolbarIsEnabled || serializerToolbarState.shape;
                return __assign(__assign({}, elmnt), { enabled: enabled, available: available });
            }
            case 'add_stamp': {
                var available = allToolbarIsEnabled;
                var enabled = allToolbarIsEnabled;
                return __assign(__assign({}, elmnt), { enabled: enabled, available: available });
            }
            default: {
                return __assign(__assign({}, elmnt), { enabled: true, available: true });
            }
        }
    });
};

/**
 * Render a ToolbarSecondOptionSelector
 * @param {ISecondOptionSelector} props - Props that the component need:
 * - id - id that the selector has in the Toolbar Section
 * - options - options to be displayed in the selector
 * - secondOptions - options to be displayed in the top of the selector
 * - selected - flag that indicates if this selector is selected
 * - selectedValue - selected value setted by parent
 * - selectedSecondValue - selected second value setted by parent
 * - colorPalette (optional) - Contains the icon and onChangeColor method
 *   for the color palette (if required)
 * - onAction - event that is emitted to parent when action is triggered
 * - onClick - event that is emitted to parent when selector is clicked
 * - onChange - event that is emitted to parent when selector's value is changed
 * - onSecondChange - event that is emitted to parent when selector's
 *   second value is changed
 */
function SecondOptionSelector(props) {
    var id = props.id, options = props.options, secondOptions = props.secondOptions, active = props.active, selectedValue = props.selectedValue, selectedSecondValue = props.selectedSecondValue, colorPalette = props.colorPalette, onAction = props.onAction, onClick = props.onClick, onChange = props.onChange, onSecondChange = props.onSecondChange, enabled = props.enabled;
    var _a = React.useState(findOptionDefinedbyParent()), selectedOption = _a[0], setSelectedOption = _a[1];
    var _b = React.useState(findSecondOptionDefinedbyParent()), selectedSecondOption = _b[0], setSelectedSecondOption = _b[1];
    var _c = React.useState(false), showOptions = _c[0], setShowOptions = _c[1];
    var buttonRef = React.useRef(null);
    /**
     * When selectedValue changes the value is found in all the available options
     * to be setted like selected option
     */
    React.useEffect(function () {
        var newValue = options.find(function (option) { return option.value === selectedValue; });
        if (newValue) {
            setSelectedOption(newValue);
        }
    }, [selectedValue, options]);
    /**
     * When selectedSecondValue changes the value is found
     * in all the available options to be setted like selected option
     */
    React.useEffect(function () {
        var newValue = secondOptions.find(function (option) { return option.value === selectedSecondValue; });
        if (newValue) {
            setSelectedSecondOption(newValue);
        }
    }, [selectedSecondValue, secondOptions]);
    /**
     * Finds the option that has the selectedValue defined by parent
     */
    function findOptionDefinedbyParent() {
        return (options.find(function (option) { return option.value === selectedValue; }) || options[0]);
    }
    /**
     * Finds the option that has the selectedSecondValue defined by parent
     */
    function findSecondOptionDefinedbyParent() {
        return (secondOptions.find(function (option) { return option.value === selectedSecondValue; }) ||
            options[0]);
    }
    /**
     * Is executed when the selector is clicked and sends an event to its parent
     */
    function handleClick() {
        onClick(id);
        onAction(id, selectedOption.value);
        if (showOptions) {
            setShowOptions(false);
        }
    }
    /**
     * Is executed when the arrow is clicked
     */
    function handleArrowClick() {
        onClick(id);
        if (!showOptions) {
            document.addEventListener('click', handleOutsideClick, false);
        }
        else {
            document.removeEventListener('click', handleOutsideClick, false);
        }
        setShowOptions(!showOptions);
    }
    /**
     * Is executed when the selector changes its option
     * @param {IToolbarSelectorOption} value - new value to set in selector
     */
    function handleSelect(option) {
        setShowOptions(false);
        onChange(id, option.value);
        onAction(id, option.value);
    }
    /**
     * Is executed when the selector changes its second option
     * @param {IToolbarSelectorOption} value - new second value to set in selector
     */
    function handleSecondSelect(option) {
        setShowOptions(false);
        onSecondChange(id, option.value);
    }
    /**
     * Is executed when you click on the window to check
     * if you are clicking on toolbar elements or not
     * @param {MouseEvent} e - Mouse click event
     */
    function handleOutsideClick(e) {
        var _a;
        if (!((_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) && !showOptions) {
            setShowOptions(false);
        }
    }
    /**
     * Is executed when the color is changed (if color palette exists)
     * @param {string} color - new color to set
     */
    function handleChangeColor(color) {
        if (colorPalette) {
            colorPalette.onChangeColor(id, color);
        }
        setShowOptions(false);
    }
    var selectorContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        top: '100px',
    };
    var toolbarSelectorStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '32px',
        border: 'none',
        paddingRight: 0,
        backgroundColor: active ? '#d9d9d9' : '#fff',
        borderRadius: '4px',
        outline: 0,
    };
    var iconStyle = {
        width: '24px',
        height: '24px',
    };
    var arrowStyle = {
        width: '20px',
        height: '20px',
    };
    var optionsContainerStyle = {
        position: 'absolute',
        margin: '0 0 8px 56px',
        padding: '2px',
        border: 'none',
        backgroundColor: '#fff',
        borderRadius: '4px',
        zIndex: 2,
    };
    var optionsStyle = {
        display: 'grid',
        rowGap: '2px',
        padding: '2px 2px 4px 0',
        gridAutoColumns: colorPalette
            ? 'repeat(auto-fit, minmax(0, 36px))'
            : 'repeat(6, auto)',
    };
    var secondOptionsStyle = {
        borderTop: 'solid 1px #c0c0c0',
        display: 'grid',
        rowGap: '2px',
        padding: '2px 2px 4px 0',
        gridAutoColumns: colorPalette
            ? 'repeat(auto-fit, minmax(0, 36px))'
            : 'repeat(6, auto)',
    };
    return (React__default['default'].createElement("div", { className: "selector-container", style: selectorContainerStyle },
        React__default['default'].createElement("button", { title: selectedOption.title, ref: buttonRef, style: toolbarSelectorStyle, className: [
                'toolbar-selector',
                active ? 'selected' : '',
                !active ? 'unselected' : '',
            ].join(' '), disabled: enabled === false },
            React__default['default'].createElement("img", { className: "icon", onClick: handleClick, style: iconStyle, src: selectedOption.iconSrc, alt: selectedOption.iconName }),
            React__default['default'].createElement(ArrowRightIcon__default['default'], { className: "arrow", onClick: handleArrowClick, style: arrowStyle })),
        showOptions && active ? (React__default['default'].createElement("div", { className: "options-container", style: optionsContainerStyle },
            React__default['default'].createElement("div", { style: optionsStyle, className: [
                    'options',
                    colorPalette ? 'with-palette' : 'no-palette',
                ].join(' ') }, options
                .filter(function (option) {
                return option.value !== selectedOption.value;
            })
                .map(function (option) {
                return (React__default['default'].createElement(ToolbarButton, { key: option.iconName, id: option.id, title: option.title, iconSrc: option.iconSrc, iconName: option.iconName, active: false, onClick: function () { return handleSelect(option); }, enabled: option.enabled }));
            })),
            React__default['default'].createElement("div", { style: secondOptionsStyle, className: [
                    'options',
                    colorPalette ? 'with-palette' : 'no-palette',
                ].join(' ') }, secondOptions.map(function (option) {
                return (React__default['default'].createElement(ToolbarButton, { key: option.iconName, id: option.id, title: option.title, iconSrc: option.iconSrc, iconName: option.iconName, active: option.id === selectedSecondOption.id, onClick: function () { return handleSecondSelect(option); }, enabled: option.enabled }));
            })),
            colorPalette ? (React__default['default'].createElement(ColorPalette, { Icon: colorPalette.icon, handleColorChange: handleChangeColor, selectedColor: colorPalette.selectedColor })) : null)) : null));
}

/**
 * Render the toolbar that will be used in the whiteboard
 */
function Toolbar(props) {
    var _a = React.useState(toolsSection), tools = _a[0], setTools = _a[1];
    var actions = React.useState(actionsSection)[0];
    var _b = React.useContext(WhiteboardContext), fillColor = _b.fillColor, textColor = _b.textColor, updateShape = _b.updateShape, fontFamily = _b.fontFamily, fontColor = _b.fontColor, updateFontFamily = _b.updateFontFamily, setPointerEvents = _b.setPointerEvents, textIsActive = _b.textIsActive, updateTextIsActive = _b.updateTextIsActive, updateShapeIsActive = _b.updateShapeIsActive, updateBrushIsActive = _b.updateBrushIsActive, shape = _b.shape, shapeColor = _b.shapeColor, eraseType = _b.eraseType, updateEraseType = _b.updateEraseType, discardActiveObject = _b.discardActiveObject, lineWidth = _b.lineWidth, updateLineWidth = _b.updateLineWidth, floodFill = _b.floodFill, updateFloodFill = _b.updateFloodFill, updateFloodFillIsActive = _b.updateFloodFillIsActive, updateEventedObjects = _b.updateEventedObjects, backgroundColor = _b.backgroundColor, stampMode = _b.stampMode, updateStampMode = _b.updateStampMode, updateStampIsActive = _b.updateStampIsActive, 
    // Just for control selectors' value may be changed in the future
    pointer = _b.pointer, updatePointer = _b.updatePointer, penColor = _b.penColor, changeStrokeColor = _b.changeStrokeColor, changeBrushType = _b.changeBrushType, stamp = _b.stamp, updateStamp = _b.updateStamp, updateShapesAreSelectable = _b.updateShapesAreSelectable, undo = _b.undo, redo = _b.redo, updateShapesAreEvented = _b.updateShapesAreEvented, updateLaserIsActive = _b.updateLaserIsActive, pointerIsEnabled = _b.pointerIsEnabled, allToolbarIsEnabled = _b.allToolbarIsEnabled, updateLineWidthIsActive = _b.updateLineWidthIsActive, brushType = _b.brushType, updateImagePopupIsOpen = _b.updateImagePopupIsOpen, openUploadFileModal = _b.openUploadFileModal, openClearWhiteboardModal = _b.openClearWhiteboardModal, updateEraserIsActive = _b.updateEraserIsActive, fillBackgroundColor = _b.fillBackgroundColor, setActiveTool = _b.setActiveTool;
    var toolbarIsEnabled = props.toolbarIsEnabled;
    var cursorPointerToolIsActive = allToolbarIsEnabled || props.permissions.cursorPointer;
    var pointerToolIsActive = allToolbarIsEnabled || props.permissions.pointer;
    var moveToolIsActive = allToolbarIsEnabled || props.permissions.move;
    var eraseToolIsActive = allToolbarIsEnabled ||
        props.permissions.erase ||
        props.permissions.partialErase;
    var penToolIsActive = allToolbarIsEnabled || props.permissions.pen;
    var floodFillToolIsActive = allToolbarIsEnabled || props.permissions.floodFill;
    var textToolIsActive = allToolbarIsEnabled || props.permissions.text;
    var shapeToolIsActive = allToolbarIsEnabled || props.permissions.shape;
    var backgroundColorToolIsActive = allToolbarIsEnabled || props.permissions.backgroundColor;
    /**
     * Is executed when a ToolbarButton is clicked in Tools section
     * and set the new selected button for that section
     * @param {number} index - index that the clicked button has in the array
     */
    function handleToolsElementClick(tool) {
        if (tool === ELEMENTS.POINTERS_TOOL && !cursorPointerToolIsActive) {
            return;
        }
        if (tool === ELEMENTS.LASER_TOOL && !pointerToolIsActive) {
            return;
        }
        if (tool === ELEMENTS.MOVE_OBJECTS_TOOL && !moveToolIsActive) {
            return;
        }
        if (tool === ELEMENTS.ERASE_TYPE_TOOL && !eraseToolIsActive) {
            return;
        }
        if (tool === ELEMENTS.LINE_TYPE_TOOL && !penToolIsActive) {
            return;
        }
        if (tool === ELEMENTS.FLOOD_FILL_TOOL && !floodFillToolIsActive) {
            return;
        }
        if (tool === ELEMENTS.ADD_TEXT_TOOL && !textToolIsActive) {
            return;
        }
        if (tool === ELEMENTS.ADD_SHAPE_TOOL && !shapeToolIsActive) {
            return;
        }
        if (tool === ELEMENTS.BACKGROUND_COLOR_TOOL &&
            !backgroundColorToolIsActive) {
            return;
        }
        /*
          If you click on another button different than
          the mentioned below the selected object will be deselected;
          the cases mentioned below will be handled in WhiteboardContext.
          The textIsActive validation was added here to fix
          a text synchronization issue
        */
        if ((tool !== ELEMENTS.ERASE_TYPE_TOOL &&
            tool !== ELEMENTS.ADD_TEXT_TOOL &&
            tool !== ELEMENTS.LINE_TYPE_TOOL &&
            tool !== ELEMENTS.LINE_WIDTH_TOOL) ||
            (textIsActive && tool !== ELEMENTS.ADD_TEXT_TOOL)) {
            discardActiveObject();
        }
        /*
          It is setted to true when you select Add Text Tool,
          otherwise will be setted in false
        */
        updateTextIsActive(tool === ELEMENTS.ADD_TEXT_TOOL);
        /*
          It is setted to true when you select Add Shape Tool,
          otherwise will be setted in false
        */
        updateShapeIsActive(tool === ELEMENTS.ADD_SHAPE_TOOL);
        /**
         * Indicates if brush / pencil / pen tool is active.
         */
        updateBrushIsActive(tool === ELEMENTS.LINE_TYPE_TOOL);
        /**
         * Indicates if flood-fill/paint bucket is active.
         */
        updateFloodFillIsActive(tool === ELEMENTS.FLOOD_FILL_TOOL);
        /**
         * Indicates if laser tool is active.
         */
        updateLaserIsActive(tool === ELEMENTS.LASER_TOOL);
        /**
         * Indicates if any eraser is active.
         */
        updateEraserIsActive(tool === ELEMENTS.ERASE_TYPE_TOOL);
        /**
         * Indicates if line width tool is active.
         */
        updateLineWidthIsActive(tool === ELEMENTS.LINE_WIDTH_TOOL);
        /*
          It is setted to false when you select Pointer Tool,
          otherwise will be setted in true
        */
        setPointerEvents(tool !== ELEMENTS.POINTERS_TOOL);
        updateEventedObjects(tool === ELEMENTS.MOVE_OBJECTS_TOOL);
        if (tool === ELEMENTS.MOVE_OBJECTS_TOOL) {
            updateShapesAreSelectable(true);
        }
        else {
            updateShapesAreSelectable(false);
        }
        updateShapesAreEvented(tool === ELEMENTS.FLOOD_FILL_TOOL || tool === ELEMENTS.ERASE_TYPE_TOOL);
        // set the clicked tool like active style in Toolbar
        if (allToolbarIsEnabled || toolbarIsEnabled) {
            setTools({
                active: tool,
                elements: __spreadArrays(tools.elements),
            });
        }
        setActiveTool(tool);
    }
    /**
     * Is executed when a ToolbarButton is clicked in Actions section
     * and set the new selected button for that section
     * @param {number} index - index that the clicked button has in the array
     */
    function handleActionsElementClick(tool) {
        discardActiveObject();
        var teacherHasPermission = allToolbarIsEnabled;
        var studentHasPermission = toolbarIsEnabled && props.permissions.undoRedo;
        if (toolbarIsEnabled) {
            switch (tool) {
                case ELEMENTS.CLEAR_WHITEBOARD_ACTION:
                    openClearWhiteboardModal();
                    break;
                case ELEMENTS.UNDO_ACTION:
                    if (teacherHasPermission || studentHasPermission) {
                        undo();
                    }
                    break;
                case ELEMENTS.REDO_ACTION:
                    if (teacherHasPermission || studentHasPermission) {
                        redo();
                    }
                    break;
                case ELEMENTS.WHITEBOARD_SCREENSHOT_ACTION:
                    updateImagePopupIsOpen(true);
                    break;
                case ELEMENTS.ADD_IMAGE_ACTION:
                    if (teacherHasPermission ||
                        (toolbarIsEnabled && props.permissions.uploadImage)) {
                        openUploadFileModal();
                    }
                    break;
            }
        }
    }
    /**
     * Is executed when a change value happens in a Tools ToolbarSelector
     * @param {string} tool - index of the selector in ToolbarSection
     * @param {string} value - new selected value
     */
    function handleToolSelectorChange(tool, option) {
        switch (tool) {
            case ELEMENTS.POINTERS_TOOL:
                updatePointer(option);
                break;
            case ELEMENTS.LINE_TYPE_TOOL:
                changeBrushType(option);
                break;
            case ELEMENTS.LINE_WIDTH_TOOL:
                updateLineWidth(Number(option));
                break;
            case ELEMENTS.FLOOD_FILL_TOOL:
                updateFloodFill(option);
                break;
            case ELEMENTS.BACKGROUND_COLOR_TOOL:
                fillBackgroundColor(option);
                break;
            case ELEMENTS.ADD_TEXT_TOOL:
                updateFontFamily(option);
                break;
            case ELEMENTS.ADD_SHAPE_TOOL:
                updateShape(option);
                break;
            case ELEMENTS.ADD_STAMP_TOOL:
                updateStamp(option);
                break;
        }
    }
    /**
     * Is executed when a change value happens in
     * a Tools ToolbarSecondOptionSelector in its second option
     * @param {string} tool - index of the selector in ToolbarSection
     * @param {string} value - new selected value
     */
    function handleToolSecondSelectorChange(tool, option) {
        switch (tool) {
            case ELEMENTS.ADD_STAMP_TOOL:
                updateStampMode(option);
                break;
        }
    }
    /**
     * Is executed when the action of the element is triggered
     * @param {number} index - index that the element has in the ToolbarSection
     * @param {string} specific (optional) - specific value/option to use
     */
    function handleToolsElementAction(tool, specific) {
        updateEraseType(null);
        switch (tool) {
            case ELEMENTS.ERASE_TYPE_TOOL:
                updateEraseType(specific);
                break;
            case ELEMENTS.ADD_TEXT_TOOL:
                updateFontFamily(specific);
                break;
            case ELEMENTS.ADD_SHAPE_TOOL:
                updateShape(specific);
                break;
            case ELEMENTS.ADD_STAMP_TOOL:
                updateStampIsActive(true);
                updateStamp(specific);
        }
    }
    /**
     * Is executed when a color was picked in elements with color palette
     * @param {number} index - index that the element has in ToolbarSection
     * @param {string} color - new color to set in the element
     */
    function changeColor(tool, color) {
        switch (tool) {
            case ELEMENTS.LINE_TYPE_TOOL:
                changeStrokeColor(color);
                break;
            case ELEMENTS.ADD_TEXT_TOOL:
                textColor(color);
                break;
            case ELEMENTS.ADD_SHAPE_TOOL:
                fillColor(color);
                break;
        }
    }
    /**
     * Set the props to create a new ColorPalette with the given icon
     * @param {OverridableComponent<SvgIconTypeMap<{}, 'svg'>>}
     * colorPaletteIcon - Icon to set in the color palette
     */
    function setColorPalette(tool) {
        var selected = '';
        if (!tool.colorPaletteIcon) {
            return undefined;
        }
        switch (tool.id) {
            case ELEMENTS.LINE_TYPE_TOOL:
                selected = penColor;
                break;
            case ELEMENTS.ADD_TEXT_TOOL:
                selected = fontColor;
                break;
            case ELEMENTS.ADD_SHAPE_TOOL:
                selected = shapeColor;
                break;
            default:
                selected = '';
                break;
        }
        return {
            icon: tool.colorPaletteIcon,
            selectedColor: selected,
            onChangeColor: changeColor,
        };
    }
    /**
     * Set the parent's definedOptionName in the given tool
     * @param {string} tool - Tool to set the definedOption
     */
    function setSelectedOptionSelector(tool, props) {
        switch (tool) {
            case ELEMENTS.POINTERS_TOOL:
                return pointer;
            case ELEMENTS.ERASE_TYPE_TOOL: {
                var allowed = props === null || props === void 0 ? void 0 : props.options.filter(function (options) { return options.enabled; });
                if ((allowed === null || allowed === void 0 ? void 0 : allowed.length) === 1 &&
                    eraseType &&
                    allowed[0].value !== eraseType) {
                    updateEraseType(allowed[0].value);
                    return allowed[0].value;
                }
                return eraseType;
            }
            case ELEMENTS.LINE_TYPE_TOOL:
                return brushType;
            case ELEMENTS.LINE_WIDTH_TOOL:
                return lineWidth;
            case ELEMENTS.FLOOD_FILL_TOOL:
                return floodFill;
            case ELEMENTS.BACKGROUND_COLOR_TOOL:
                return backgroundColor;
            case ELEMENTS.ADD_TEXT_TOOL:
                return fontFamily;
            case ELEMENTS.ADD_SHAPE_TOOL:
                return shape;
            case ELEMENTS.ADD_STAMP_TOOL:
                return stamp;
            default:
                return '';
        }
    }
    /**
     * Set the parent's definedSecondOptionName in the given tool
     * @param {string} tool - Tool to set the definedSecondOption
     */
    function setSelectedSecondOptionSelector(tool) {
        switch (tool) {
            case ELEMENTS.ADD_STAMP_TOOL:
                return stampMode;
            default:
                return null;
        }
    }
    /**
     * If a permission element is active in Toolbar, when the permission
     * will be revoked the active tool will change to the first one (pointers)
     */
    React.useEffect(function () {
        if (!toolbarIsEnabled &&
            tools.active !== ELEMENTS.ADD_TEXT_TOOL &&
            tools.active !== ELEMENTS.ADD_STAMP_TOOL) {
            setTools({
                active: ELEMENTS.POINTERS_TOOL,
                elements: __spreadArrays(tools.elements),
            });
        }
        // If tools.elements and tools.active are added an infinite loop happens
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toolbarIsEnabled]);
    /**
     * Indicates active tool.
     */
    var getActiveTool = React.useMemo(function () { return tools.active; }, [tools]);
    /**
     * Returns tool elements.
     */
    var getToolElements = React.useMemo(function () { return __spreadArrays(tools.elements); }, [tools]);
    /**
     * Sets pointer tool as active for teacher user
     */
    React.useEffect(function () {
        if (allToolbarIsEnabled) {
            setTools({
                active: ELEMENTS.POINTERS_TOOL,
                elements: getToolElements,
            });
            setPointerEvents(false);
        }
        // If getToolElements and tools.active are added an infinite loop happens
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allToolbarIsEnabled, setPointerEvents]);
    /**
     * Checks if any tool permission is set to true. If not, and tool is selected,
     * default pointer is automatically selected.
     */
    React.useEffect(function () {
        if (allToolbarIsEnabled) {
            return;
        }
        if (!props.permissions.pointer && getActiveTool === ELEMENTS.LASER_TOOL) {
            setTools({
                active: null,
                elements: getToolElements,
            });
        }
        if (!props.permissions.move &&
            getActiveTool === ELEMENTS.MOVE_OBJECTS_TOOL) {
            setTools({
                active: null,
                elements: getToolElements,
            });
        }
        if (!props.permissions.erase && !props.permissions.partialErase &&
            getActiveTool === ELEMENTS.ERASE_TYPE_TOOL) {
            setTools({
                active: null,
                elements: getToolElements,
            });
        }
        if (!props.permissions.erase && props.permissions.partialErase) {
            updateEraseType('partial');
        }
        else if (props.permissions.erase && !props.permissions.partialErase) {
            updateEraseType('object');
        }
        else {
            updateEraseType(null);
        }
        if (!props.permissions.pen && getActiveTool === ELEMENTS.LINE_TYPE_TOOL) {
            setTools({
                active: null,
                elements: getToolElements,
            });
        }
        if (!props.permissions.floodFill &&
            getActiveTool === ELEMENTS.FLOOD_FILL_TOOL) {
            setTools({
                active: null,
                elements: getToolElements,
            });
        }
        if (!props.permissions.text && getActiveTool === ELEMENTS.ADD_TEXT_TOOL) {
            setTools({
                active: null,
                elements: getToolElements,
            });
        }
        if (!props.permissions.shape && getActiveTool === ELEMENTS.ADD_SHAPE_TOOL) {
            setTools({
                active: null,
                elements: getToolElements,
            });
        }
        if (!props.permissions.cursorPointer &&
            getActiveTool === ELEMENTS.POINTERS_TOOL) {
            setTools({
                active: null,
                elements: getToolElements,
            });
        }
        if (!props.permissions.backgroundColor &&
            getActiveTool === ELEMENTS.BACKGROUND_COLOR_TOOL) {
            setTools({
                active: ELEMENTS.POINTERS_TOOL,
                elements: getToolElements,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        pointerIsEnabled,
        getActiveTool,
        getToolElements,
        allToolbarIsEnabled,
        props.permissions,
        updateEraseType,
    ]);
    var toolbarContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '120px',
    };
    var toolbarStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '16px',
        borderRadius: '8px',
    };
    var actionElements = mappedActionElements(actions, allToolbarIsEnabled, props.permissions);
    var toolElements = mappedToolElements(tools, allToolbarIsEnabled, props.permissions);
    return (React__default['default'].createElement("div", { style: toolbarContainerStyle },
        React__default['default'].createElement("div", { style: toolbarStyle },
            React__default['default'].createElement(ToolbarSection, null, toolElements
                .filter(function (tool) {
                return tool.available;
            })
                .map(function (tool) {
                return determineIfIsToolbarButton(tool)
                    ? createToolbarButton(tool.id, tool.title, tool.iconSrc, tool.iconName, tools.active === tool.id, handleToolsElementClick, tool.enabled)
                    : determineIfIsToolbarSelector(tool)
                        ? createToolbarSelector(tool.id, tool.options, tools.active === tool.id, handleToolsElementClick, handleToolSelectorChange, handleToolsElementAction, setSelectedOptionSelector(tool.id, tool), setColorPalette(tool), tool.enabled)
                        : determineIfIsSpecialSelector(tool)
                            ? createSpecialSelector(tool.id, tool.icon, tools.active === tool.id, setSelectedOptionSelector(tool.id), tool.styleOptions, handleToolsElementClick, handleToolSelectorChange, tool.enabled)
                            : determineIfIsToolbarSecondOptionSelector(tool)
                                ? createToolbarSecondOptionSelector(tool.id, tool.options, tool.secondOptions, tools.active === tool.id, handleToolsElementClick, handleToolSelectorChange, handleToolSecondSelectorChange, handleToolsElementAction, setSelectedOptionSelector(tool.id, tool), setSelectedSecondOptionSelector(tool.id), setColorPalette(tool), tool.enabled)
                                : null;
            })),
            React__default['default'].createElement(ToolbarSection, null, actionElements.map(function (action) {
                return determineIfIsToolbarButton(action)
                    ? createToolbarButton(action.id, action.title, action.iconSrc, action.iconName, actions.active === action.id, handleActionsElementClick, action.enabled)
                    : null;
            })))));
}
/**
 * Creates a ToolbarButton
 * @param {string} id - id of the button
 * @param {string} iconSrc - src for the icon of the button
 * @param {string} iconName - alt for the icon of the button
 * @param {boolean} active - flag to set this button like active
 * @param {(index: number) => void} onClick - function to execute when button is clicked
 */
function createToolbarButton(id, title, iconSrc, iconName, active, onClick, enabled) {
    return (React__default['default'].createElement(ToolbarButton, { key: id, id: id, title: title, iconSrc: iconSrc, iconName: iconName, active: active, enabled: enabled === false ? false : true, onClick: onClick }));
}
/**
 * Creates a ToolbarSelector
 * @param {string} id - id of the selector
 * @param {IToolbarSelectorOption[]} options - options that the selector
 * will have
 * @param {boolean} active - flag to set this selector like active
 * @param {(index: number) => void} onClick - function to execute
 * when selector is clicked
 * @param {(value: string) => void} onChange - function to execute
 * when selector's value changes
 * @param {(index: number) => void} onAction - function to execute when
 * the action of this element is triggered
 * @param {string} definedOptionName - selected option name defined by parent
 * @param {IColorPalette} colorPalette (optional) - Describes
 * the color palette to use
 */
function createToolbarSelector(id, options, active, onClick, onChange, onAction, selectedValue, colorPalette, enabled) {
    return (React__default['default'].createElement(ToolbarSelector, { key: id, id: id, options: options, active: active, selectedValue: selectedValue, colorPalette: colorPalette, onAction: onAction, onClick: onClick, onChange: onChange, enabled: enabled === false ? false : true }));
}
/**
 * Creates a ToolbarSecondOptionSelector
 * @param {string} id - id of the selector
 * @param {IToolbarSelectorOption[]} options - options that the selector
 * will have
 * @param {IToolbarSelectorOption[]} secondOptions - options that the selector
 * will have in the second options array
 * @param {boolean} active - flag to set this selector like active
 * @param {(index: number) => void} onClick - function to execute
 * when selector is clicked
 * @param {(value: string) => void} onChange - function to execute
 * when selector's value changes
 * @param {(value: string) => void} onSecondChange - function to execute
 * when selector's second value changes
 * @param {(index: number) => void} onAction - function to execute when
 * the action of this element is triggered
 * @param {string} definedOptionName - selected option name defined by parent
 * @param {string} definedSecondOptionName - selected second option
 * name defined by parent
 * @param {IColorPalette} colorPalette (optional) - Describes
 * the color palette to use
 */
function createToolbarSecondOptionSelector(id, options, secondOptions, active, onClick, onChange, onSecondChange, onAction, selectedValue, selectedSecondValue, colorPalette, enabled) {
    return (React__default['default'].createElement(SecondOptionSelector, { key: id, id: id, options: options, secondOptions: secondOptions, active: active, selectedSecondValue: selectedSecondValue, selectedValue: selectedValue, colorPalette: colorPalette, onAction: onAction, onClick: onClick, onChange: onChange, onSecondChange: onSecondChange, enabled: enabled === false ? false : true }));
}
/**
 * Create an SpecialToolbarSelector
 * @param {string} id - id of the selector
 * @param {OverridableComponent<SvgIconTypeMap<{}, 'svg'>>} Icon - Icon
 * that the selector will have
 * @param {boolean} selected - flag to set this selector like selected
 * @param {IStyleOptions[]} styleOptions - Options for the special selector
 * @param {(index: number) => void} onClick - Function to execute when
 * selector is clicked
 * @param {(value: string) => void} onChange - Function to execute when
 * selector's value is changed
 */
function createSpecialSelector(id, Icon, active, selectedValue, styleOptions, onClick, onChange, enabled) {
    return (React__default['default'].createElement(SpecialSelector, { key: id, id: id, Icon: Icon, active: active, selectedValue: selectedValue, styleOptions: styleOptions, onClick: onClick, onChange: onChange, enabled: enabled }));
}
/**
 * Validate if the given object has ToolbarButton Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsToolbarButton(toBeDetermined) {
    return !!toBeDetermined.iconSrc;
}
/**
 * Validate if the given object has ToolbarSelector Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsToolbarSelector(toBeDetermined) {
    return (!!toBeDetermined.options &&
        !toBeDetermined.secondOptions);
}
/**
 * Validate if the given object has SpecialToolbarSelector Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsSpecialSelector(toBeDetermined) {
    return !!toBeDetermined.icon;
}
/**
 * Validate if the given object has ToolbarSecondOptionSelector Props
 * @param {ToolbarElementTypes} toBeDetermined - Object to validate
 */
function determineIfIsToolbarSecondOptionSelector(toBeDetermined) {
    return (!!toBeDetermined.options &&
        !!toBeDetermined.secondOptions);
}
/**
 * Maps state to props.
 * @param state Redux state
 * @param ownProps Own properties
 */
var mapStateToProps$2 = function (state, ownProps) { return (__assign(__assign({}, ownProps), { permissions: state.permissionsState, toolbarIsEnabled: function (state) {
        for (var key in state.permissionsState) {
            if (state.permissionsState[key] === true) {
                return true;
            }
        }
        return false;
    } })); };
var Toolbar$1 = reactRedux.connect(mapStateToProps$2)(Toolbar);

var img$4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAMAAAAlM38UAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABFFBMVEUAAAACAgJhYWFfX19gYGBoaGhOTk5paWlHR0dpaWkAAAA7OztxcXEtLS0BAQElJSVZWVkBAQEmJiZQUFABAQEqKipLVVjp6en////Ly8vo6Oj+/v78/Py2tra7u7vl5eX7+/uysrKzs7Pu7u79/f25ubm1tbX6+vr4+Pjf39+kpKSgoKD29vaLi4uhoaGampqYmJiTk5OKioqIiIiGhoZ1dXV6enrOzs7k5OSurq7b29vV1dXJycnCwsLGxsawsLBycnKSkpLS0tLx8fFzc3OlpaWbm5uWlpaXl5d0dHRra2vPz8/FxcW+vr7Dw8PExMR5eXmxsbHIyMjAwMDBwcF9fX2oqKidnZ2vr6+tra2srKx2dnYsMTL3AAAAFnRSTlMAAfb28/T28vb4BfL60gXO8wTO9gPQbFIrtAAAAAFiS0dEGJtphR4AAAAJcEhZcwAAAMgAAADIAGP6560AAAAHdElNRQfkCBUWCDDgHXo+AAAAEGNhTnYAAAAgAAAAIAAAAAAAAAAAYrnu+gAAANRJREFUGNNjYIACMTiAiTACMZO4BBRIwsUZGJilpGXAgtKycmJwtSzyChBRCUUlBbhqVmUZFYioqpq6BkyYTVNCQ0FBQV1FQktbQUeTHWwAA4eunp6+gaGRsYmpmbmKBScDAxdQnNtS2cra3MZWzs7ewdHJmQdiHa+Lq5u+m4G7h4Gnl72BNysDAx/IDH4fH19bWz9/Gyf7gEBdAQYGQbDJQnJBfra2tsEhQfahYcIwUQah8IjIyMioSEt7+2hmBgYRiCiDqBhyaMBEUQF2QS6swkiKAYB3HfR2SqOqAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA4LTIxVDIyOjA4OjQ1KzAwOjAwO/5qbgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wOC0yMVQyMjowODo0NSswMDowMEqj0tIAAAAASUVORK5CYII=";

/**
 * Check if the given object is a free drawing object
 * @param {fabric.Object} object - object to check
 */
var isFreeDrawing = function (object) {
    return object.strokeLineCap === 'round';
};
var isSpecialFreeDrawing = function (object) {
    return ((object.type === 'group' && object.basePath) ||
        (object.type === 'image' && object.basePath));
};
/**
 * Check if the given object is a shape
 * @param {fabric.Object} object - object to check
 */
var isShape = function (object) {
    if (object.get('type') === 'path' && object.name) {
        return true;
    }
    return object.fill && !object.text;
};
/**
 * Check if the given object is a text object
 * @param {fabric.Object} object - object to check
 */
var isText = function (object) {
    return object.text;
};
/**
 * Check if the given object is an empty shape
 * @param {fabric.Object} object - object to check
 */
// eslint-disable-next-line react-hooks/exhaustive-deps
var isEmptyShape = function (object) {
    return isShape(object) && object.shapeType === 'shape';
};
/**
 * Get the bigger difference
 * between startPoint.x - point.x and startPoint.y - point.y
 * @param {Point} point - Point to find the difference with startPoint
 */
var getBiggerDifference = function (point, startPoint) {
    return Math.abs(point.x - startPoint.x) >
        Math.abs(point.y - startPoint.y)
        ? point.x - startPoint.x
        : point.y - startPoint.y;
};

var STATES_LIMIT = 50;
var CANVAS_OBJECT_PROPS = [
    'strokeUniform',
    'id',
    'selectable',
    'evented',
    'shapeType',
    'joinedIds',
    'isPartialErased',
    'basePath',
    'backgroundImageEditable',
    'name',
];

var UNDO = 'CANVAS_UNDO';
var REDO = 'CANVAS_REDO';
var SET = 'CANVAS_SET';
var SET_GROUP = 'CANVAS_SET_GROUP';
var SET_OTHER = 'CANVAS_SET_OTHER';
/**
 * Canvas history default state.
 */
var defaultState = {
    states: [],
    otherObjects: '',
    actionType: null,
    activeStateIndex: null,
    activeState: null,
    events: [],
    eventIndex: -1,
    activeObjects: [],
    backgrounds: [],
};
/**
 * Stringifies objects into proper format to store in state
 * and render to canvas.
 * @param payload
 */
var objectStringifier = function (payload) {
    var formatted = [];
    if (payload) {
        formatted = payload.map(function (object) {
            return object.toJSON(CANVAS_OBJECT_PROPS);
        });
    }
    return JSON.stringify({ objects: formatted });
};
/**
 * Determine if an object belongs to local canvas.
 * @param id Object ID
 * @param canvasId Canvas ID
 */
var isLocalObject$2 = function (id, canvasId) {
    if (!id) {
        return false;
    }
    var object = id.split(':');
    if (!object.length) {
        throw new Error('Invalid ID');
    }
    return object[0] === canvasId;
};
/**
 * Determines new event index on undo.
 * @param newIndex New umodified event index.
 * @param eventId Event ID
 * @param events List of events
 */
var determineNewIndex = function (newIndex, eventId, events) {
    var i = newIndex;
    for (i; i >= 0; i--) {
        if (events[i].eventId !== eventId) {
            return i;
        }
    }
    return -1;
};
/**
 * Determines new event index on redo.
 * @param newIndex New umodified event index.
 * @param eventId Event ID
 * @param events List of events
 */
var determineNewRedoIndex = function (newIndex, eventId, events) {
    var i = newIndex;
    for (i; i < events.length; i++) {
        if (events[i].eventId !== eventId) {
            return i - 1;
        }
    }
    return events.length - 1;
};
var limitValidator = function (list, limit) {
    var cloned = __spreadArrays(list);
    if (list.length > limit) {
        cloned.shift();
    }
    return cloned;
};
var filterById = function (canvasId, objects, isLocal) {
    return objects === null || objects === void 0 ? void 0 : objects.filter(function (object) {
        return isLocal
            ? object.id && isLocalObject$2(object.id, canvasId)
            : object.id && !isLocalObject$2(object.id, canvasId);
    });
};
/**
 * Removes future states if a new state has
 * been created after an undo.
 */
var spliceStates = function (activeStateIndex, statesList) {
    var states = __spreadArrays(statesList);
    if (activeStateIndex !== null && activeStateIndex + 1 < states.length) {
        states.splice(activeStateIndex + 1, 9e9);
    }
    else if (activeStateIndex === null) {
        states = [];
    }
    return states;
};
var spliceBackgroundStates = function (activeStateIndex, backgroundStates) {
    var states = __spreadArrays(backgroundStates);
    if (activeStateIndex !== null && activeStateIndex + 1 < states.length) {
        states.splice(activeStateIndex + 1, 9e9);
    }
    else if (activeStateIndex === null) {
        states = [];
    }
    return states;
};
/**
 * Removes future events if a new event has
 * been created after an undo.
 */
var spliceEvents = function (eventIndex, eventsList) {
    // Removes future events if a new event has been created after an undo.
    var events = __spreadArrays(eventsList);
    if (eventIndex >= 0 && eventIndex + 1 < events.length) {
        events.splice(eventIndex + 1, 9e9);
    }
    else if (eventIndex < 0) {
        events = [];
    }
    return events;
};
/**
 * History state reducer.
 * @param state Canvas state.
 * @param action Action
 */
var reducer = function (state, action) {
    var _a, _b, _c, _d, _e;
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        // Sets state when new object is created.
        case SET: {
            if (!action.background) {
                if (!action.event ||
                    (action.event.type === 'removed' && state.activeStateIndex === null) ||
                    (action.event.type !== 'backgroundColorChanged' &&
                        !((_a = action.payload) === null || _a === void 0 ? void 0 : _a.length) &&
                        !state.states.length)) {
                    return state;
                }
            }
            var states = __spreadArrays(state.states);
            var events = __spreadArrays(state.events);
            var selfItems = filterById(action.canvasId, action.payload, true);
            var otherObjects = filterById(action.canvasId, action.payload, false);
            var currentState = objectStringifier(__spreadArrays(selfItems, otherObjects));
            states = spliceStates(state.activeStateIndex, state.states);
            var backgrounds = spliceBackgroundStates(state.activeStateIndex, state.backgrounds);
            // Formats and creates new state.
            var mappedSelfState = objectStringifier(selfItems);
            states = limitValidator(__spreadArrays(states, [mappedSelfState]), STATES_LIMIT);
            var stateItems = __assign(__assign({}, state), { states: states, actionType: SET, activeStateIndex: states.length - 1, activeState: currentState, otherObjects: objectStringifier(otherObjects) });
            events = spliceEvents(state.eventIndex, events);
            events = limitValidator(events, STATES_LIMIT);
            if (action.event && !Array.isArray(action.event)) {
                events = __spreadArrays(events, [action.event]);
                stateItems = __assign(__assign({}, stateItems), { events: events, eventIndex: events.length - 1, backgrounds: __spreadArrays(backgrounds, [action.background || null]) });
            }
            else if (action.event && Array.isArray(action.event)) {
                events = __spreadArrays(events, action.event);
                stateItems = __assign(__assign({}, stateItems), { events: events, eventIndex: events.length - 1, backgrounds: __spreadArrays(backgrounds, [action.background || null]) });
            }
            return stateItems;
        }
        case SET_GROUP: {
            var states = __spreadArrays(state.states);
            var events = __spreadArrays(state.events);
            var selfItems = (_b = action.payload) === null || _b === void 0 ? void 0 : _b.filter(function (object) {
                if (object._objects) {
                    return object;
                }
                return isLocalObject$2(object.id, action.canvasId);
            });
            selfItems = selfItems.map(function (o) {
                if (o.toObject) {
                    return o.toObject(['id', 'selectable']);
                }
                return o;
            });
            var otherObjects = (_c = action.payload) === null || _c === void 0 ? void 0 : _c.filter(function (object) {
                return (!isLocalObject$2(object.id, action.canvasId) &&
                    !object._objects);
            });
            otherObjects = otherObjects.map(function (o) {
                if (o.toObject) {
                    return o.toObject(['id', 'selectable']);
                }
                return o;
            });
            var currentState = JSON.stringify({
                objects: __spreadArrays(selfItems, otherObjects),
            });
            states = spliceStates(state.activeStateIndex, state.states);
            // Formats and creates new state.
            var mappedSelfState = JSON.stringify({ objects: selfItems });
            states = limitValidator(__spreadArrays(states, [mappedSelfState]), STATES_LIMIT);
            var newEvent = __assign(__assign({}, action.event), { selfState: mappedSelfState });
            var stateItems = __assign(__assign({}, state), { states: states, actionType: SET, activeStateIndex: states.length - 1, activeState: currentState, otherObjects: JSON.stringify({ objects: otherObjects }) });
            events = spliceEvents(state.eventIndex, state.events);
            events = limitValidator(events, STATES_LIMIT);
            if (Array.isArray(action.event)) {
                events = __spreadArrays(events, action.event);
            }
            else {
                events = __spreadArrays(events, [newEvent]);
            }
            stateItems = __assign(__assign({}, stateItems), { events: events, eventIndex: events.length - 1 });
            return stateItems;
        }
        // Steps back to previous state.
        case UNDO: {
            if (state.activeStateIndex === null ||
                (state.activeStateIndex === 0 && state.states.length === STATES_LIMIT)) {
                return state;
            }
            var eventIndex = state.eventIndex - 1;
            if (state.events[state.eventIndex] &&
                state.events[state.eventIndex].eventId) {
                // This is a grouped event action, determine previous
                // event index prior to grouped event.
                eventIndex = determineNewIndex(state.eventIndex - 1, state.events[state.eventIndex - 1].eventId, state.events);
            }
            var activeStateIndex = state.activeStateIndex !== null && state.activeStateIndex >= 1
                ? state.activeStateIndex - 1
                : null;
            if (activeStateIndex === null && state.states.length === STATES_LIMIT) {
                activeStateIndex = 0;
                eventIndex = 0;
            }
            var activeSelfState = activeStateIndex !== null && activeStateIndex >= 0
                ? state.states[activeStateIndex]
                : JSON.stringify({ objects: [] });
            var activeSelfStateObjects = JSON.parse(activeSelfState).objects;
            var otherStateObjects = JSON.parse(state.otherObjects)
                .objects;
            var activeState = JSON.stringify({
                objects: __spreadArrays(activeSelfStateObjects, otherStateObjects),
            });
            var newState = __assign(__assign({}, state), { actionType: UNDO, activeStateIndex: activeStateIndex,
                activeState: activeState,
                eventIndex: eventIndex });
            return newState;
        }
        // Steps forward to more recent state.
        case REDO: {
            // If no future states, return current state.
            if (state.activeStateIndex !== null &&
                state.activeStateIndex + 1 === state.states.length) {
                return state;
            }
            if (!state.events.length) {
                return state;
            }
            var eventIndex = state.eventIndex + 1;
            if (state.events[state.eventIndex + 1] &&
                state.events[state.eventIndex + 1].eventId) {
                // This is a grouped event action, determine previous
                // event index prior to grouped event.
                eventIndex = determineNewRedoIndex(state.eventIndex + 1, state.events[state.eventIndex + 1].eventId, state.events);
            }
            var activeStateIndex = state.activeStateIndex !== null
                ? state.activeStateIndex + 1
                : 0;
            var activeSelfState = activeStateIndex !== null && activeStateIndex >= 0
                ? state.states[activeStateIndex]
                : JSON.stringify({ objects: [] });
            var activeSelfStateObjects = JSON.parse(activeSelfState).objects;
            var otherStateObjects = JSON.parse(state.otherObjects)
                .objects;
            var activeState = JSON.stringify({
                objects: __spreadArrays(activeSelfStateObjects, otherStateObjects),
            });
            return __assign(__assign({}, state), { actionType: REDO, activeStateIndex: activeStateIndex,
                activeState: activeState,
                eventIndex: eventIndex });
        }
        // Creates a new current state if a new event has been received by serializer from a non local canvas.
        case SET_OTHER: {
            if (!action.payload) {
                return state;
            }
            var selfItems = (_d = action.payload) === null || _d === void 0 ? void 0 : _d.filter(function (object) {
                return object.id && isLocalObject$2(object.id, action.canvasId);
            });
            var otherObjects = (_e = action.payload) === null || _e === void 0 ? void 0 : _e.filter(function (object) {
                return object.id && !isLocalObject$2(object.id, action.canvasId);
            });
            var currentState = objectStringifier(__spreadArrays(selfItems, otherObjects));
            return __assign(__assign({}, state), { actionType: SET_OTHER, activeState: currentState, otherObjects: objectStringifier(otherObjects) });
        }
        // Retuns default state.
        default: {
            return defaultState;
        }
    }
};
/**
 * Reducer hook.
 */
var useUndoRedo$1 = function () {
    var _a = React.useReducer(reducer, defaultState), state = _a[0], dispatch = _a[1];
    return { state: state, dispatch: dispatch };
};

/**
 * Class that handles all partial erasure methods.
 */
var PartialErase = /** @class */ (function () {
    /** @ignore */
    function PartialErase(id, canvas, lineWidth, eraseObjectCursor, allToolbarIsEnabled, partialEraseIsActive, hasPermission, eventSerializer, undoRedoDispatch) {
        var _this = this;
        var _a, _b;
        this.generateBackground = function (src) {
            var _a, _b;
            if (_this.bgRawCanvas) {
                _this.bgRawCanvas.remove();
                _this.bgRawCanvas = null;
            }
            if (!_this.bgRawCanvas) {
                _this.bgRawCanvas = document.createElement('canvas');
                _this.bgRawCanvas.width = _this.canvas.width;
                _this.bgRawCanvas.height = _this.canvas.height;
                _this.bgRawCanvas.style.position = 'absolute';
            }
            if (!src) {
                _this.canvas.getElement().before(_this.bgRawCanvas);
            }
            else {
                _this.tempCanvas.getElement().before(_this.bgRawCanvas);
            }
            var background = new Image();
            if (!src && ((_a = _this.canvas.backgroundImage) === null || _a === void 0 ? void 0 : _a.getElement)) {
                _this.hasBackground = true;
                background.src = (_b = _this.canvas.backgroundImage) === null || _b === void 0 ? void 0 : _b.getElement().currentSrc;
            }
            else if (src && src.getElement) {
                _this.hasBackground = true;
                background.src = src.getElement().currentSrc;
            }
            else {
                _this.hasBackground = false;
                return;
            }
            background.onload = function () {
                var _a, _b;
                var ctx = _this.bgRawCanvas.getContext('2d');
                var width;
                var height;
                if (!src) {
                    // @ts-ignore  - linter ignoring backgroundImage type and optional chaining.
                    width = background.width * ((_a = _this.canvas.backgroundImage) === null || _a === void 0 ? void 0 : _a.scaleX);
                    // @ts-ignore  - linter ignoring backgroundImage type and optional chaining.
                    height = background.height * ((_b = _this.canvas.backgroundImage) === null || _b === void 0 ? void 0 : _b.scaleY);
                }
                else {
                    width = background.width * src.scaleX;
                    height = background.height * src.scaleY;
                }
                ctx.drawImage(background, 0, 0, width, height);
                _this.canvas.backgroundImage = '';
                _this.canvas.renderAll();
            };
        };
        /**
         * Initiates erasing availability.
         */
        this.init = function () {
            _this.tempCanvas.freeDrawingBrush = new fabric.fabric.PencilBrush();
            _this.tempCanvas
                .freeDrawingBrush.canvas = _this.tempCanvas;
            _this.tempCanvas.freeDrawingBrush.color = 'rgba(0,0,0,0)';
            _this.tempCanvas.freeDrawingBrush.width = _this.lineWidth;
            _this.tempCanvas.freeDrawingCursor = "url(\"" + _this.eraseObjectCursor + "\"), auto";
            _this.tempCanvas.isDrawingMode =
                _this.allToolbarIsEnabled ||
                    _this.hasPermission ||
                    _this.partialEraseIsActive;
            _this.tempCanvas.on('mouse:move', function (e) {
                if (e.e.buttons) {
                    if (!_this.active) {
                        _this.active = true;
                        _this.moveSelfToTemp();
                    }
                    _this.coordinates.push(e.absolutePointer);
                    _this.buildTempEraseLine();
                }
                else {
                    _this.active = false;
                    _this.coordinates = [];
                }
            });
        };
        /**
         * Erases pixes along specified path
         */
        this.buildTempEraseLine = function () {
            var rawContext = _this.rawCanvas.getContext('2d');
            var i = 1;
            var bgContext;
            if (rawContext) {
                rawContext.globalCompositeOperation = 'destination-out';
                rawContext.lineCap = 'round';
                rawContext.strokeStyle = "rgba(0,0,0,1)";
                rawContext.lineWidth = _this.lineWidth;
                rawContext.beginPath();
                rawContext.moveTo(_this.coordinates[0].x, _this.coordinates[0].y);
                if (_this.hasBackground && _this.hasBgPermission) {
                    bgContext = _this.bgRawCanvas.getContext('2d');
                    bgContext.globalCompositeOperation = 'destination-out';
                    bgContext.lineCap = 'round';
                    bgContext.strokeStyle = "rgba(0,0,0,1)";
                    bgContext.lineWidth = _this.lineWidth;
                    bgContext.beginPath();
                    bgContext.moveTo(_this.coordinates[0].x, _this.coordinates[0].y);
                }
                for (i; i < _this.coordinates.length; i++) {
                    rawContext.lineTo(_this.coordinates[i - 1].x, _this.coordinates[i - 1].y);
                    rawContext.strokeStyle = "rgba(0,0,0,1)";
                    rawContext.stroke();
                    rawContext.beginPath();
                    rawContext.moveTo(_this.coordinates[i].x, _this.coordinates[i].y);
                    if (_this.hasBackground && _this.hasBgPermission) {
                        bgContext.lineTo(_this.coordinates[i - 1].x, _this.coordinates[i - 1].y);
                        bgContext.strokeStyle = "rgba(0,0,0,1)";
                        bgContext.stroke();
                        bgContext.beginPath();
                        bgContext.moveTo(_this.coordinates[i].x, _this.coordinates[i].y);
                    }
                    // Remove most rendered points. Leave a segment of rendered points
                    // for a smoother path.
                    if (_this.coordinates.length > 4) {
                        _this.coordinates.shift();
                    }
                }
            }
        };
        /**
         * Moves owned objects to temporary canvas for partial erasing.
         */
        this.moveSelfToTemp = function () {
            _this.canvas.getObjects().forEach(function (o) {
                if (_this.isOwned(_this.id, o.id)) {
                    _this.hasSelfObjects = true;
                    _this.tempCanvas.add(o);
                    o.set({ isActiveErase: true });
                    _this.canvas.remove(o);
                }
            });
            _this.canvas.renderAll();
            _this.tempCanvas.renderAll();
        };
        this.loadFromJSON = function (objects, backgroundColor) {
            return new Promise(function (resolve) {
                var mapped = JSON.stringify({ objects: objects.map(function (o) { return (__assign(__assign({}, o), { fromJSON: true })); }) });
                _this.canvas.loadFromJSON(mapped, function () {
                    if (backgroundColor) {
                        _this.canvas.backgroundColor = backgroundColor;
                    }
                    resolve();
                });
            });
        };
        /**
         * Group self owned objects
         */
        this.groupObjects = function () {
            _this.canvas
                .getObjects()
                .forEach(function (o) {
                if (_this.isOwned(_this.id, o.id)) {
                    o.set({ selectable: true, evented: true });
                    if (o._objects && !o.basePath) {
                        o.toActiveSelection();
                        _this.canvas.discardActiveObject();
                    }
                }
            });
        };
        this.backgroundToPermanent = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var dataURL = _this.bgRawCanvas.toDataURL();
                        fabric.fabric.Image.fromURL(dataURL, function (image) {
                            _this.bgRawCanvas.remove();
                            _this.canvas.setBackgroundImage(image, _this.canvas.renderAll.bind(_this.canvas), {
                                id: _this.backgroundId
                            });
                            resolve();
                        });
                    })];
            });
        }); };
        /**
         * Moves objects from temporary canvas to permanent canvas.
         */
        this.moveSelfToPermanent = function (id, destroy) { return __awaiter(_this, void 0, void 0, function () {
            var backgroundColor, partiallyErased, group, objects, foreignObjects, bgImage, payload;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        backgroundColor = this.canvas
                            .backgroundColor;
                        partiallyErased = this.tempCanvas
                            .getObjects()
                            .filter(function (o) { return o.isPartialErased; });
                        this.tempCanvas
                            .setActiveObject(new fabric.fabric.Group(partiallyErased))
                            .renderAll();
                        group = this.tempCanvas.getActiveObjects()[0];
                        objects = this.tempCanvas
                            .getObjects()
                            .filter(function (o) { return !o.isPartialErased; });
                        objects = objects.map(function (o) {
                            return o.toJSON(CANVAS_OBJECT_PROPS);
                        });
                        foreignObjects = this.canvas
                            .getObjects()
                            .map(function (o) {
                            return o.toJSON(CANVAS_OBJECT_PROPS);
                        });
                        objects = __spreadArrays(objects, foreignObjects);
                        return [4 /*yield*/, this.loadFromJSON(objects, backgroundColor)];
                    case 1:
                        _a.sent();
                        this.groupObjects();
                        this.canvas.renderAll();
                        if (this.tempCanvas.getContext()) {
                            this.tempCanvas.clear();
                        }
                        if (!(this.hasBackground && this.hasBgPermission && destroy)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.backgroundToPermanent()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        if (this.hasBackground && this.hasBgPermission && !destroy) {
                            bgImage = this.bgRawCanvas.toDataURL();
                            payload = {
                                type: 'backgroundImage',
                                target: { src: bgImage },
                                id: this.id + ":" + uuid.v4(),
                            };
                            this.eventSerializer.push('added', payload);
                        }
                        if (this.hasSelfObjects && (!(this.hasBackground && this.hasBgPermission) || (this.hasBackground && this.hasBgPermission && !destroy))) {
                            group.cloneAsImage(function (image) {
                                image.set({
                                    top: group.top,
                                    left: group.left,
                                    id: id || _this.generateId(),
                                });
                                _this.canvas.add(image);
                                image.bringToFront();
                                _this.canvas.renderAll();
                                image.bringToFront();
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Destroys temporary canvas.
         */
        this.destroy = function () {
            var _a;
            if (_this.tempCanvas.getObjects().length) {
                _this.moveSelfToPermanent();
            }
            if (_this.hasBackground && _this.hasBgPermission) {
                _this.moveSelfToTemp();
                _this.moveSelfToPermanent(null, true);
            }
            _this.canvas.off('background:modified');
            _this.tempCanvas.off('mouse:move');
            _this.tempCanvas.dispose();
            (_a = _this.canvas.getElement().parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(_this.rawCanvas);
        };
        /**
         *
         * @param selfId Onwer ID
         * @param objectId Object ID
         */
        this.isOwned = function (selfId, objectId) {
            return (objectId === null || objectId === void 0 ? void 0 : objectId.split(':')[0]) === selfId;
        };
        /**
         * Generate ID for joined objects.
         */
        this.generateId = function () {
            return _this.id + ":" + uuid.v4();
        };
        /**
         * Checks when path is created and merges erase path with existing objects if erased.
         * @param e Canvas event.
         */
        this.pathCreated = function (e) {
            var _a;
            if (e.path) {
                var partiallyErased_1 = [];
                e.path.stroke = '#ffffff';
                e.path.strokeUniform = true;
                e.path.globalCompositeOperation = 'destination-out';
                e.path.evented = false;
                e.path.selectable = false;
                e.path.isPartialErased = true;
                (_a = e.path) === null || _a === void 0 ? void 0 : _a.bringToFront();
                e.path.id = _this.generateId();
                e.path.isErasePath = true;
                var joinedIds_1 = [];
                var objectsToErase = _this.tempCanvas.getObjects().length > 1;
                if (objectsToErase) {
                    _this.tempCanvas.forEachObject(function (obj) {
                        var intersect = obj.intersectsWithObject(e.path, true, true);
                        if (intersect) {
                            obj.set({
                                isPartialErased: true,
                            });
                            joinedIds_1.push(obj.id);
                            partiallyErased_1.push(obj);
                            _this.tempCanvas.remove(obj);
                            if (obj.id) {
                                _this.eventSerializer.push('removed', { id: obj.id });
                            }
                        }
                    });
                }
                _this.tempCanvas
                    .setActiveObject(new fabric.fabric.Group(partiallyErased_1))
                    .renderAll();
                var group_1 = _this.tempCanvas.getActiveObjects()[0];
                var id_1 = _this.generateId();
                group_1.cloneAsImage(function (image) {
                    image.set({
                        top: group_1.top,
                        left: group_1.left,
                        id: id_1,
                        isPartialErased: true,
                        joinedIds: joinedIds_1,
                    });
                    _this.tempCanvas.add(image);
                    var payload = {
                        id: id_1,
                        type: 'image',
                        target: image.toJSON(CANVAS_OBJECT_PROPS),
                    };
                    _this.updateState(payload);
                    _this.eventSerializer.push('added', payload);
                });
                if (_this.hasBackground && _this.hasBgPermission) {
                    var payloadBg = {
                        id: _this.backgroundId,
                        target: {
                            strategy: 'allowClearMyself',
                            isBackgroundImage: true,
                        },
                    };
                    _this.eventSerializer.push('removed', payloadBg);
                }
                _this.tempCanvas.renderAll();
                _this.moveSelfToPermanent(id_1);
            }
        };
        /**
         * Updates undo / redo state.
         * @param eventPayload Event to store in state
         */
        this.updateState = function (eventPayload) {
            var _a, _b;
            var payload = __spreadArrays(_this.canvas.getObjects());
            var tempCanvasObjects = _this.tempCanvas.getObjects();
            var nonErasePathObjects = tempCanvasObjects.filter(function (path) { return !path.isErasePath; });
            // @ts-ignore
            if (nonErasePathObjects.length > 1 || (nonErasePathObjects.length === 1 && ((_a = nonErasePathObjects[0].joinedIds) === null || _a === void 0 ? void 0 : _a.length))) {
                payload = __spreadArrays(payload, _this.tempCanvas.getObjects());
            }
            var eventData = { event: eventPayload, type: 'added' };
            var statePayload = {
                type: SET,
                payload: payload,
                canvasId: _this.id,
                event: eventData,
            };
            if (_this.hasBackground && _this.hasBgPermission) {
                var bgImage = _this.bgRawCanvas.toDataURL();
                var background = __assign(__assign({}, ((_b = _this.backgroundImage) === null || _b === void 0 ? void 0 : _b.toJSON(CANVAS_OBJECT_PROPS))), { backgroundImageEditable: true, src: bgImage, scaleX: 1, scaleY: 1 });
                // @ts-ignore - linter ignoring optinonal props.
                statePayload = __assign(__assign({}, statePayload), { background: background });
            }
            _this.undoRedoDispatch(statePayload);
        };
        this.eventSerializer = eventSerializer;
        this.coordinates = [];
        this.id = id;
        this.canvas = canvas;
        this.rawCanvas = document.createElement('canvas');
        this.rawCanvas.style.cssText = 'position: absolute; z-index: 3;';
        this.undoRedoDispatch = undoRedoDispatch;
        this.active = false;
        this.hasBackground = canvas.backgroundImage ? true : false;
        this.backgroundId = null;
        this.bgRawCanvas = null;
        this.hasSelfObjects = false;
        this.hasBgPermission = this.hasBackground ? this.isOwned(id, canvas.backgroundImage.id) : false;
        this.backgroundImage = this.hasBackground ? this.canvas.backgroundImage : null;
        if (this.hasBackground && this.hasBgPermission) {
            this.backgroundId = (_a = this.backgroundImage) === null || _a === void 0 ? void 0 : _a.id;
            this.generateBackground();
            this.canvas.on('background:modified', function (e) {
                var _a;
                if (!e || !e.id) {
                    _this.generateBackground(null);
                    return;
                }
                // @ts-ignore
                var src = ((_a = e) === null || _a === void 0 ? void 0 : _a.getElement) ? e : null;
                _this.generateBackground(src);
            });
        }
        (_b = this.canvas
            .getElement()
            .parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(this.rawCanvas, this.canvas.getElement());
        this.tempCanvas = new fabric.fabric.Canvas(this.rawCanvas, {
            width: canvas.getWidth(),
            height: canvas.getHeight(),
        });
        this.lineWidth = lineWidth;
        this.eraseObjectCursor = eraseObjectCursor;
        this.allToolbarIsEnabled = allToolbarIsEnabled;
        this.partialEraseIsActive = partialEraseIsActive;
        this.hasPermission = hasPermission;
        this.moveSelfToTemp();
        this.tempCanvas.on('path:created', this.pathCreated);
    }
    return PartialErase;
}());

/**
 * Handles the logic for penColor and lineWidth synchronization actions
 * @param {string} userId - User that is generating that action.
 */
var useSynchronization = function (userId) {
    // Getting context variables
    var _a = React.useContext(WhiteboardContext), isLocalObject = _a.isLocalObject, lineWidth = _a.lineWidth;
    // Getting event serializer for synchronize objects
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    /**
     * Changes stroke property in the given object on remote whiteboards
     * @param {ICanvasObject} obj - Object to change stroke property
     */
    var changePenColorSync = function (obj) {
        var type = obj.name ? 'shape' : obj.get('type');
        if (obj.id && isLocalObject(obj.id, userId) && type !== 'textbox') {
            var target = { stroke: obj.stroke };
            var payload = {
                type: type,
                target: target,
                id: obj.id,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('colorChanged', payload);
        }
    };
    /**
     * Changes strokeWidth property in the given object on remote whiteboards
     * @param {ICanvasObject} obj - Object to change strokeWidth property
     */
    var changeLineWidthSync = function (obj) {
        var validTypes = [
            'rect',
            'ellipse',
            'triangle',
            'polygon',
            'path',
        ];
        var type = obj.get('type');
        if (obj.id && isLocalObject(obj.id, userId) && validTypes.includes(type)) {
            var target = { strokeWidth: lineWidth };
            var payload = {
                type: type,
                target: target,
                id: obj.id,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('lineWidthChanged', payload);
        }
    };
    return { changePenColorSync: changePenColorSync, changeLineWidthSync: changeLineWidthSync };
};

var arrowPoints = {
    width: 409.7,
    height: 442.88,
    points: [
        { x: 421.9738757134825, y: 196.70987572491168 },
        { x: 407.834244000769, y: 182.57032008693906 },
        { x: 393.6965767313491, y: 168.43272888169088 },
        { x: 379.5532381284964, y: 154.2894663735229 },
        { x: 365.40595304038783, y: 140.14225740133242 },
        { x: 351.2610887107064, y: 125.99746917454468 },
        { x: 337.1172549228348, y: 111.85371148402207 },
        { x: 322.9809654786668, y: 97.71749809661272 },
        { x: 308.8364247089637, y: 83.57303342806244 },
        { x: 294.6966087783445, y: 69.43329357317529 },
        { x: 280.556463690546, y: 55.29322456287976 },
        { x: 266.4130104285422, y: 41.14984739617767 },
        { x: 252.27004129672144, y: 27.006954357053974 },
        { x: 238.12715231015684, y: 12.864141462755187 },
        { x: 221.73327159660136, y: 1.7943556067127502 },
        { x: 201.98765029925104, y: 0.8819208342432976 },
        { x: 184.76336655467318, y: 10.522035200681886 },
        { x: 170.6169234698962, y: 24.66572185617592 },
        { x: 157.1707406203281, y: 39.39562030153163 },
        { x: 152.1761683067966, y: 58.48239694830658 },
        { x: 157.73223488307931, y: 77.39550980068184 },
        { x: 171.3497992734909, y: 92.00906856441497 },
        { x: 185.4679651524176, y: 106.17516528992958 },
        { x: 199.59272975975088, y: 120.347883146381 },
        { x: 213.70418688480066, y: 134.50724834195447 },
        { x: 227.82442238538243, y: 148.67542171544173 },
        { x: 241.93876921284198, y: 162.83768642389774 },
        { x: 233.39069804231917, y: 167.591 },
        { x: 213.38645805880773, y: 167.591 },
        { x: 193.38905990862938, y: 167.591 },
        { x: 173.38208895078844, y: 167.591 },
        { x: 153.38458133482396, y: 167.591 },
        { x: 133.38125050962466, y: 167.59100000000004 },
        { x: 113.37586071430738, y: 167.59100000000004 },
        { x: 93.37465416730595, y: 167.591 },
        { x: 73.38768441373348, y: 167.591 },
        { x: 53.387280811495344, y: 167.591 },
        { x: 33.63303642826434, y: 169.68605985145925 },
        { x: 18.51895599365234, y: 182.28913134098053 },
        { x: 12.372561812400816, y: 201.07911378954537 },
        { x: 12.274999999999999, y: 221.07070913640035 },
        { x: 12.276495982707477, y: 241.0644963197885 },
        { x: 17.127776158085673, y: 260.2501860621179 },
        { x: 31.18638092001411, y: 274.06183482968606 },
        { x: 50.720750152467254, y: 277.22200000000004 },
        { x: 70.7141005194683, y: 277.222 },
        { x: 90.72161658474974, y: 277.222 },
        { x: 110.70876839256088, y: 277.222 },
        { x: 130.716672736133, y: 277.222 },
        { x: 150.71832817961504, y: 277.222 },
        { x: 170.72021991037508, y: 277.222 },
        { x: 190.71707079039047, y: 277.222 },
        { x: 210.7091339298326, y: 277.222 },
        { x: 230.71120149462502, y: 277.222 },
        { x: 243.8167084987862, y: 280.0774962990549 },
        { x: 229.6681667499704, y: 294.22705286222657 },
        { x: 215.53794676402978, y: 308.3582863483813 },
        { x: 201.38783952799452, y: 322.50940851105815 },
        { x: 187.24370325181624, y: 336.6545592856065 },
        { x: 173.11038573271037, y: 350.7888905270994 },
        { x: 159.25517314008786, y: 365.19942042932695 },
        { x: 152.29518253289166, y: 383.6584934377894 },
        { x: 155.8699758360833, y: 403.07445355249195 },
        { x: 168.57564705138816, y: 418.3949065276878 },
        { x: 182.71504121772946, y: 432.53496107393505 },
        { x: 199.3530383869624, y: 443.22724196312856 },
        { x: 219.1261336062327, y: 443.7639935536729 },
        { x: 236.31893487834932, y: 434.04106512165066 },
        { x: 250.46171011601945, y: 419.89828988398045 },
        { x: 264.6033995572355, y: 405.7566004427645 },
        { x: 278.749956050992, y: 391.610043949008 },
        { x: 292.8842537918091, y: 377.4757462081909 },
        { x: 307.0307897683178, y: 363.3292102316822 },
        { x: 321.1708154795949, y: 349.18918452040504 },
        { x: 335.3157892573792, y: 335.04421074262075 },
        { x: 349.45608972413214, y: 320.90391027586793 },
        { x: 363.5948150653568, y: 306.7651849346432 },
        { x: 377.73431046475946, y: 292.62568953524055 },
        { x: 391.8783071010856, y: 278.4816928989144 },
        { x: 406.0258785346708, y: 264.33412146532913 },
        { x: 420.1633574971687, y: 250.19664250283128 },
        { x: 430.951238835671, y: 233.63153430165625 },
        { x: 431.6657546847659, y: 213.84641971198667 },
        { x: 421.9738757134825, y: 196.70987572491168 },
    ],
};

var chatBubblePoints = {
    width: 57.8,
    height: 54.89,
    points: [
        { x: 28.994134901184065, y: 1.5000005203770215 },
        { x: 24.02293495910987, y: 1.881462248758995 },
        { x: 19.15398595866561, y: 3.0369586675697935 },
        { x: 14.546191261615604, y: 4.954578796998248 },
        { x: 10.319471606761219, y: 7.612212537485175 },
        { x: 6.6222734375000005, y: 10.961753173828125 },
        { x: 3.6055360175669198, y: 14.934741375013255 },
        { x: 1.4255310640633108, y: 19.42610849818867 },
        { x: 0.221607127904892, y: 24.26999852667004 },
        { x: 0.06617632238194346, y: 29.268214196446355 },
        { x: 0.9642016839683056, y: 34.16619486873597 },
        { x: 2.8740643526874488, y: 38.789025381422604 },
        { x: 4.661655247729271, y: 43.21404043416027 },
        { x: 3.860898216810077, y: 48.152899327498865 },
        { x: 2.3446923969350753, y: 52.90612037773896 },
        { x: 0.678076171875, y: 56.3929557800293 },
        { x: 5.561442984312773, y: 55.358433207810855 },
        { x: 10.350618209838867, y: 53.92590129518509 },
        { x: 14.962283277511597, y: 51.98562750965357 },
        { x: 19.224313720703122, y: 49.38665698242187 },
        { x: 23.323874755859375, y: 46.545966796875 },
        { x: 22.48035281944275, y: 49.62853184270858 },
        { x: 19.863082893446087, y: 52.171369962498545 },
        { x: 24.75338335044682, y: 53.219091020390394 },
        { x: 29.725170469846578, y: 53.492029379465265 },
        { x: 34.71159083023667, y: 52.9958375900751 },
        { x: 39.53047682521864, y: 51.732707707284135 },
        { x: 44.09345343918726, y: 49.7052069342687 },
        { x: 48.256199218127875, y: 46.94104332049319 },
        { x: 51.86833558678627, y: 43.49042568352073 },
        { x: 54.777149542551484, y: 39.42385560672555 },
        { x: 56.81909304512665, y: 34.86778670204163 },
        { x: 57.86827092170715, y: 29.994253430068493 },
        { x: 57.86827092170715, y: 25.005746569931507 },
        { x: 56.81909304512665, y: 20.13221329795837 },
        { x: 54.777149542551484, y: 15.576144393274443 },
        { x: 51.86833558678627, y: 11.509574316479265 },
        { x: 48.256199218127875, y: 8.05895667950681 },
        { x: 44.11210594773293, y: 5.305014874376356 },
        { x: 39.54078412567033, y: 3.2708974327664326 },
        { x: 34.71159083023667, y: 2.004162409924902 },
        { x: 29.736831470962148, y: 1.5082292954869772 },
        { x: 28.994134901184065, y: 1.5000005203770215 },
    ],
};

var circlePoints = {
    width: 150,
    height: 150,
    points: [
        { x: 25.00000017462085, y: 100.00528573909124 },
        { x: 25.636429849646447, y: 109.97749890318029 },
        { x: 27.570196097576627, y: 119.77371717937444 },
        { x: 30.81108232763654, y: 129.23586360559528 },
        { x: 35.304912541823796, y: 138.15959359471424 },
        { x: 40.963657659767705, y: 146.38894309518247 },
        { x: 47.67879809078295, y: 153.793234593948 },
        { x: 55.30526322922924, y: 160.23995468235603 },
        { x: 63.724046663264744, y: 165.6437013477312 },
        { x: 72.76157143060118, y: 169.8970667574918 },
        { x: 82.28578329067204, y: 172.9321716604216 },
        { x: 92.11016809604189, y: 174.67587300851966 },
        { x: 102.10249670349185, y: 175.08496775602467 },
        { x: 112.04079496433224, y: 174.1350509519644 },
        { x: 121.76779313849693, y: 171.84167893854243 },
        { x: 131.10330518065894, y: 168.2653366041124 },
        { x: 139.89760522081494, y: 163.50755528430878 },
        { x: 147.98595535293686, y: 157.64192206048997 },
        { x: 155.2208767049297, y: 150.75306469717898 },
        { x: 161.4797434876873, y: 142.95682291448023 },
        { x: 166.64363641064108, y: 134.4040757502707 },
        { x: 170.62442786717304, y: 125.24597939223392 },
        { x: 173.35658269457406, y: 115.62301432731437 },
        { x: 174.7810495440151, y: 105.73489646899199 },
        { x: 174.8860046307982, y: 95.74847413090808 },
        { x: 173.69992508647556, y: 85.81910347729814 },
        { x: 171.20630903168603, y: 76.13950500798435 },
        { x: 167.42851336020976, y: 66.89780169468465 },
        { x: 162.43048969190568, y: 58.255955637783494 },
        { x: 156.30103812859488, y: 50.352368702482984 },
        { x: 149.18208551803218, y: 43.34293712948776 },
        { x: 141.2016169578692, y: 37.3277576040534 },
        { x: 132.4966135998693, y: 32.401058704734034 },
        { x: 123.24596598041353, y: 28.66139203699905 },
        { x: 113.56522890732776, y: 26.16591591711899 },
        { x: 103.6404140198556, y: 24.983983492396366 },
        { x: 93.65896336094012, y: 25.152866554538242 },
        { x: 83.78380018220925, y: 26.6789124879745 },
        { x: 74.20446534056283, y: 29.527731519177898 },
        { x: 65.07405456795824, y: 33.62476480087308 },
        { x: 56.575798756442985, y: 38.848828131731246 },
        { x: 48.830820789114334, y: 45.164031351420284 },
        { x: 41.995269842157484, y: 52.45426635407685 },
        { x: 36.18598988532143, y: 60.59469592652174 },
        { x: 31.51383912819957, y: 69.42692860399555 },
        { x: 28.05841870775809, y: 78.79515252727538 },
        { x: 25.87663273797711, y: 88.55665500485973 },
        { x: 25.014729813698672, y: 98.51064773213142 },
        { x: 25.00000017462085, y: 100.00528573909124 },
    ],
};

var pentagonPoints = {
    width: 522,
    height: 504,
    points: [
        { x: 507.8011960423737, y: 200.2778580096662 },
        { x: 491.9078298727004, y: 188.13664860317317 },
        { x: 476.0138907104923, y: 175.99500147805722 },
        { x: 460.11940520115274, y: 163.85293698918957 },
        { x: 444.2257668573088, y: 151.71151966427541 },
        { x: 428.34202301872676, y: 139.57766091814665 },
        { x: 412.4470258096253, y: 127.43520553323488 },
        { x: 396.55538939056237, y: 115.29531751229084 },
        { x: 380.6574348961103, y: 103.15060300742104 },
        { x: 364.7599629992823, y: 91.00625716698323 },
        { x: 348.86918667315746, y: 78.86702618548316 },
        { x: 332.97900226389646, y: 66.72824737921883 },
        { x: 317.0897337077497, y: 54.59016820853372 },
        { x: 301.1924557467687, y: 42.445970518947405 },
        { x: 285.3035494165589, y: 30.308168058740474 },
        { x: 269.4019036860832, y: 18.1606337566638 },
        { x: 251.79320603285356, y: 11.535458191871658 },
        { x: 235.72866721517497, y: 23.40291567632373 },
        { x: 219.83740057722287, y: 35.542471733311956 },
        { x: 203.94255384731434, y: 47.6847626715393 },
        { x: 188.04916757445395, y: 59.82593794664125 },
        { x: 172.14937639767624, y: 71.97200601549686 },
        { x: 156.26879955147473, y: 84.10339599427685 },
        { x: 140.37452079867583, y: 96.24525304701739 },
        { x: 124.47426703095749, y: 108.3916744954231 },
        { x: 108.58744274732841, y: 120.5278369771503 },
        { x: 92.69419479130197, y: 132.66890659012992 },
        { x: 76.80051076545193, y: 144.81030932281539 },
        { x: 60.89627501275762, y: 156.95977266403776 },
        { x: 45.00979196358155, y: 169.0956744720965 },
        { x: 29.11898047049977, y: 181.23488283768967 },
        { x: 13.228853952519852, y: 193.37356794142858 },
        { x: 0.06634181785582313, y: 207.59067606665195 },
        { x: 5.405765620498154, y: 226.7572231690178 },
        { x: 11.710743336122466, y: 245.72389215744903 },
        { x: 18.02320640802399, y: 264.7130786362147 },
        { x: 24.33264358978908, y: 283.69316261546294 },
        { x: 30.639874387349014, y: 302.66660933748875 },
        { x: 36.94950832128808, y: 321.64728518771983 },
        { x: 43.259139091773804, y: 340.62795152163295 },
        { x: 49.56856188414678, y: 359.60799221463196 },
        { x: 55.8767584352309, y: 378.58434412177405 },
        { x: 62.18517984085267, y: 397.5613724375854 },
        { x: 68.49344428085351, y: 416.53792856854386 },
        { x: 74.80322109612584, y: 435.51903423519525 },
        { x: 81.11501912159686, y: 454.50622011759435 },
        { x: 87.42268580432705, y: 473.4809780718107 },
        { x: 93.72995078043824, y: 492.45452760994436 },
        { x: 109.38489205549473, y: 501.33600000000007 },
        { x: 129.38371961597474, y: 501.336 },
        { x: 149.38086167990534, y: 501.336 },
        { x: 169.3755812416216, y: 501.33600000000007 },
        { x: 189.37961735888572, y: 501.33599999999996 },
        { x: 209.38956876966006, y: 501.33600000000007 },
        { x: 229.37588938679278, y: 501.336 },
        { x: 249.3828723629661, y: 501.336 },
        { x: 269.3831326773589, y: 501.336 },
        { x: 289.3797804217004, y: 501.336 },
        { x: 309.3818003365699, y: 501.33600000000007 },
        { x: 329.3753487106103, y: 501.336 },
        { x: 349.3746966608359, y: 501.336 },
        { x: 369.3894485963515, y: 501.336 },
        { x: 389.3843105093677, y: 501.336 },
        { x: 409.3748213854348, y: 501.1946713643074 },
        { x: 420.42980582725437, y: 486.05680656850336 },
        { x: 426.7354374420477, y: 467.0881705169594 },
        { x: 433.04836816544247, y: 448.09757724637416 },
        { x: 439.35377279803265, y: 429.1296240039548 },
        { x: 445.66421456404305, y: 410.14651802879916 },
        { x: 451.974614130164, y: 391.16353899958546 },
        { x: 458.2812599308958, y: 372.19185206826774 },
        { x: 464.59159976729006, y: 353.2090527183497 },
        { x: 470.89837925522437, y: 334.2369636284467 },
        { x: 477.21141244307495, y: 315.2460621237161 },
        { x: 483.51761041601424, y: 296.27572235045136 },
        { x: 489.82689195601426, y: 277.2961065736255 },
        { x: 496.13558496334576, y: 258.3182612240419 },
        { x: 502.4431862625602, y: 239.3436999568809 },
        { x: 508.7516021582006, y: 220.36668821622618 },
        { x: 507.8011960423737, y: 200.2778580096662 },
    ],
};

var starPoints = {
    width: 75,
    height: 70,
    points: [
        { x: 202.0042825708389, y: 222.002251578331 },
        { x: 206.42223926341532, y: 224.3250095502138 },
        { x: 210.8549991417136, y: 226.65555035475828 },
        { x: 215.28421833498427, y: 228.9842296303322 },
        { x: 219.699290717721, y: 231.305471165061 },
        { x: 224.1280550422091, y: 233.63391129159743 },
        { x: 224.92861398417875, y: 230.96513178614342 },
        { x: 224.08416665770483, y: 226.04119515932535 },
        { x: 223.2396919414997, y: 221.1170988241434 },
        { x: 222.39560266258334, y: 216.19524995748208 },
        { x: 221.54926333815231, y: 211.26028117063828 },
        { x: 222.35851978375018, y: 206.87623288415372 },
        { x: 225.94411674485914, y: 203.3811194171477 },
        { x: 229.5300924459696, y: 199.885636767745 },
        { x: 233.10771115948842, y: 196.3983002151267 },
        { x: 236.6852117071897, y: 192.91107884638012 },
        { x: 239.72848390933876, y: 189.59345035569368 },
        { x: 234.78581205359103, y: 188.8753470376879 },
        { x: 229.84152344046908, y: 188.1570088267196 },
        { x: 224.88457853300824, y: 187.43683182749595 },
        { x: 219.9355072758221, y: 186.71779876308165 },
        { x: 214.98857183513044, y: 185.9990760038942 },
        { x: 212.0965861465335, y: 182.4576966664195 },
        { x: 209.88221614063625, y: 177.97094151666852 },
        { x: 207.67138940095901, y: 173.49136573076248 },
        { x: 205.45567671551834, y: 169.00189004454296 },
        { x: 203.24696819051354, y: 164.52660618390888 },
        { x: 201.02795549821107, y: 163.9695559741929 },
        { x: 198.81865710765123, y: 168.4460350200534 },
        { x: 196.60369899892805, y: 172.93398178339004 },
        { x: 194.396996120275, y: 177.40520180461465 },
        { x: 192.17867817864845, y: 181.89995625932235 },
        { x: 189.6201565826237, y: 185.91063600437343 },
        { x: 184.6694154815674, y: 186.6299116744995 },
        { x: 179.72284731325553, y: 187.34858107398145 },
        { x: 174.78229687320396, y: 188.0663761790015 },
        { x: 169.8243741925396, y: 188.78669523543678 },
        { x: 164.89353265690804, y: 189.50307976806164 },
        { x: 166.86758581024222, y: 192.47516163754278 },
        { x: 170.45074926941098, y: 195.96790301267805 },
        { x: 174.02547242438794, y: 199.45241707694532 },
        { x: 177.60461429538393, y: 202.94123834975622 },
        { x: 181.1895504986793, y: 206.435707733348 },
        { x: 182.5565917007029, y: 210.64304491846264 },
        { x: 181.71034999139235, y: 215.5774445156697 },
        { x: 180.86547606253626, y: 220.50386864292622 },
        { x: 180.02164519318939, y: 225.42421073432266 },
        { x: 179.1758219487928, y: 230.3561702803243 },
        { x: 179.32576893770695, y: 233.92106546556948 },
        { x: 183.7360639747698, y: 231.602335638972 },
        { x: 188.17058121379813, y: 229.27087089516573 },
        { x: 192.5895601910504, y: 226.94757545312518 },
        { x: 197.0139216079712, y: 224.62145017242432 },
        { x: 201.44201542319357, y: 222.29336256875098 },
        { x: 202.0042825708389, y: 222.002251578331 },
    ],
};

var trianglePoints = {
    width: 521,
    height: 445,
    points: [
        { x: 507.51842996361853, y: 427.38971660222114 },
        { x: 497.2283761023697, y: 410.23961157986446 },
        { x: 486.94453159531827, y: 393.0998554903747 },
        { x: 476.6523464277816, y: 375.9461982877123 },
        { x: 466.35888181967414, y: 358.79040868220204 },
        { x: 456.07318758446866, y: 341.64756970971337 },
        { x: 445.7779504769482, y: 324.48882593588723 },
        { x: 435.4925327836444, y: 307.34644786697805 },
        { x: 425.20549157951496, y: 290.20136394428624 },
        { x: 414.9134088536809, y: 273.0478774779467 },
        { x: 404.61993730067223, y: 255.89207629759076 },
        { x: 394.33657592584365, y: 238.75312542918854 },
        { x: 384.0383144999824, y: 221.5893411203112 },
        { x: 373.7519350994537, y: 204.4453602046017 },
        { x: 363.4595539954304, y: 187.2913764408378 },
        { x: 353.1677823529126, y: 170.13840844715307 },
        { x: 342.87801486197964, y: 152.98878070908071 },
        { x: 332.5949490122489, y: 135.85032238294627 },
        { x: 322.30663234764245, y: 118.7031126909021 },
        { x: 312.0090246808833, y: 101.54041798149746 },
        { x: 301.71783586605824, y: 84.38842136816466 },
        { x: 291.43547574400486, y: 67.25113925587203 },
        { x: 281.02637661382715, y: 50.16155991697311 },
        { x: 264.98206050868583, y: 38.829463653087615 },
        { x: 245.3264288107058, y: 39.38557426536083 },
        { x: 229.95931520655563, y: 51.63146766471863 },
        { x: 219.65479462597102, y: 68.7657618013584 },
        { x: 209.36403914313757, y: 85.9171124677131 },
        { x: 199.07610252535105, y: 103.0637650005848 },
        { x: 188.78539834872367, y: 120.21503015613976 },
        { x: 178.49425531960955, y: 137.36702673640937 },
        { x: 168.20494947925354, y: 154.51596131907493 },
        { x: 157.91532220507804, y: 171.6654316276319 },
        { x: 147.62592545257993, y: 188.81451773134296 },
        { x: 137.33540538802743, y: 205.96547603180238 },
        { x: 127.04864104013645, y: 223.11017477108834 },
        { x: 116.7570975010253, y: 240.26283887158178 },
        { x: 106.46670665242613, y: 257.4135818109696 },
        { x: 96.17329633882483, y: 274.5693572188835 },
        { x: 85.87897803575913, y: 291.72664595064725 },
        { x: 75.58909328460167, y: 308.87654538979757 },
        { x: 65.30291998850878, y: 326.02025903749643 },
        { x: 55.01314351270461, y: 343.1699780167616 },
        { x: 44.72900511818216, y: 360.3103001437442 },
        { x: 34.43375816853326, y: 377.4691366280729 },
        { x: 24.145089986690646, y: 394.61700844087807 },
        { x: 13.854883272662757, y: 411.767444487676 },
        { x: 3.6089069967176917, y: 428.9365619514846 },
        { x: 0.41115631340432457, y: 448.3277470276654 },
        { x: 9.515116414632487, y: 465.7568636295907 },
        { x: 27.2388375612485, y: 474.2406814480908 },
        { x: 47.22301495708959, y: 474.47399999999993 },
        { x: 67.2245469012414, y: 474.47399999999993 },
        { x: 87.22604122611317, y: 474.474 },
        { x: 107.23405137573945, y: 474.474 },
        { x: 127.23344428991126, y: 474.474 },
        { x: 147.2252162362622, y: 474.474 },
        { x: 167.23162004072637, y: 474.47400000000005 },
        { x: 187.22538636647676, y: 474.474 },
        { x: 207.22643859162386, y: 474.474 },
        { x: 227.22777574459548, y: 474.474 },
        { x: 247.23187295153176, y: 474.474 },
        { x: 267.23639391772156, y: 474.474 },
        { x: 287.22302055568883, y: 474.474 },
        { x: 307.22915051059437, y: 474.47399999999993 },
        { x: 327.2337843787738, y: 474.474 },
        { x: 347.22522718570195, y: 474.47400000000005 },
        { x: 367.2343636938018, y: 474.47400000000005 },
        { x: 387.23739300430094, y: 474.474 },
        { x: 407.23121040011796, y: 474.474 },
        { x: 427.2316594949386, y: 474.474 },
        { x: 447.22396214027225, y: 474.474 },
        { x: 467.2224343721759, y: 474.474 },
        { x: 487.1909668553422, y: 473.84900319218264 },
        { x: 504.17219042655097, y: 463.9789213027395 },
        { x: 511.8923586242521, y: 445.89373775921393 },
        { x: 507.51842996361853, y: 427.38971660222114 },
    ],
};

var hexagonPoints = {
    width: 498,
    height: 449,
    points: [
        { x: 477.0385042309761, y: 219.197214176178 },
        { x: 464.54073804583345, y: 197.5534408485994 },
        { x: 452.03621964155946, y: 175.89797395129224 },
        { x: 439.5355722941756, y: 154.24921099424364 },
        { x: 427.0337372215895, y: 132.59839112120903 },
        { x: 414.5334686991638, y: 110.9502842175225 },
        { x: 402.03543755766003, y: 89.30605203551053 },
        { x: 389.53642602094914, y: 67.66012199395149 },
        { x: 376.9377712247167, y: 46.056114800177745 },
        { x: 358.03308920027314, y: 30.20908491733111 },
        { x: 333.56960429349436, y: 26.384999999999998 },
        { x: 308.5738289041083, y: 26.384999999999994 },
        { x: 283.56958640165976, y: 26.384999999999998 },
        { x: 258.57325187097064, y: 26.384999999999994 },
        { x: 233.5613009832561, y: 26.384999999999998 },
        { x: 208.5635327905414, y: 26.384999999999998 },
        { x: 183.57581097699563, y: 26.384999999999998 },
        { x: 158.57574118011468, y: 26.384999999999998 },
        { x: 133.64621555020395, y: 27.385090767890446 },
        { x: 111.90037256220343, y: 39.06804784751101 },
        { x: 98.03903688447018, y: 59.75081266036712 },
        { x: 85.53593509218345, y: 81.40514572728705 },
        { x: 73.03369676950534, y: 103.05798333661508 },
        { x: 60.538241037519334, y: 124.69907406262219 },
        { x: 48.031210128078236, y: 146.36021203387168 },
        { x: 35.529528761611445, y: 168.01208504133496 },
        { x: 23.037440879688887, y: 189.64734293096234 },
        { x: 10.53070762874076, y: 211.30796538244294 },
        { x: 0.6241068694591521, y: 234.06169519260013 },
        { x: 3.40267030787468, y: 258.5863450381928 },
        { x: 15.56874075994402, y: 280.4169513967128 },
        { x: 28.067794709831478, y: 302.0661780808717 },
        { x: 40.56386719239743, y: 323.7102406572387 },
        { x: 53.06616776792341, y: 345.36509072175016 },
        { x: 65.56238759599321, y: 367.0094085107297 },
        { x: 78.06316868116906, y: 388.66162671276857 },
        { x: 90.56065381834803, y: 410.3081361047158 },
        { x: 103.05990609788941, y: 431.9577063095646 },
        { x: 119.8278481526375, y: 450.10579344367983 },
        { x: 143.62350993873224, y: 456.629 },
        { x: 168.60895211048194, y: 456.62899999999996 },
        { x: 193.6264299288797, y: 456.62899999999996 },
        { x: 218.6145376434326, y: 456.629 },
        { x: 243.61326288406553, y: 456.629 },
        { x: 268.61117299123157, y: 456.629 },
        { x: 293.6099290861439, y: 456.629 },
        { x: 318.6115614615553, y: 456.629 },
        { x: 343.605513631111, y: 456.4807334315512 },
        { x: 366.69353883993625, y: 447.7276704297364 },
        { x: 382.05686117774246, y: 428.30387218479177 },
        { x: 394.5590087902622, y: 406.65082645180007 },
        { x: 407.05531468021866, y: 385.0078982673884 },
        { x: 419.5583723168204, y: 363.3532764217419 },
        { x: 432.0589214846382, y: 341.7029991088093 },
        { x: 444.56180838366555, y: 320.0486729714379 },
        { x: 457.05701396014285, y: 298.4076504706594 },
        { x: 469.560999802785, y: 276.75142102218604 },
        { x: 481.04452877807614, y: 254.6063047133386 },
        { x: 481.49120727348327, y: 229.9433287306852 },
        { x: 477.0385042309761, y: 219.197214176178 },
    ],
};

var rectanglePoints = {
    width: 570,
    height: 570,
    points: [
        { x: 550.1819286310673, y: 0 },
        { x: 510.17886327090093, y: 0 },
        { x: 470.1923963260574, y: 0 },
        { x: 430.1860753634669, y: 0 },
        { x: 390.1866554616305, y: 0 },
        { x: 350.18589939402545, y: 0 },
        { x: 310.1870155697501, y: 0 },
        { x: 270.19051883964613, y: 0 },
        { x: 230.1865324914566, y: 0 },
        { x: 190.18218159238188, y: 0 },
        { x: 150.177307127197, y: 0 },
        { x: 110.17800366618492, y: 0 },
        { x: 70.17849627851362, y: 0 },
        { x: 30.189766268011184, y: 0 },
        { x: 0.027047559211612678, y: 17.950331560423017 },
        { x: 0, y: 57.95281293778269 },
        { x: 0, y: 97.96260045371133 },
        { x: 0, y: 137.95982361339765 },
        { x: 0, y: 177.9494657277377 },
        { x: 0, y: 217.95780474383434 },
        { x: 0, y: 257.9560660776088 },
        { x: 0, y: 297.94940238780464 },
        { x: 0, y: 337.9471934038103 },
        { x: 0, y: 377.9467170903882 },
        { x: 0, y: 417.9587851524873 },
        { x: 0, y: 457.9606405474507 },
        { x: 0, y: 497.9513559803095 },
        { x: 0, y: 537.9511564168674 },
        { x: 16.942758919159882, y: 569.0527339356187 },
        { x: 56.93594807187008, y: 569.16 },
        { x: 96.9267443984798, y: 569.16 },
        { x: 136.92787287515526, y: 569.16 },
        { x: 176.9384976789578, y: 569.16 },
        { x: 216.94243548037036, y: 569.1600000000001 },
        { x: 256.92739832783803, y: 569.16 },
        { x: 296.92914783752246, y: 569.16 },
        { x: 336.9440719624174, y: 569.16 },
        { x: 376.9371405488048, y: 569.16 },
        { x: 416.932490977139, y: 569.16 },
        { x: 456.93521887537156, y: 569.16 },
        { x: 496.94347369957484, y: 569.1599999999999 },
        { x: 536.9408124548013, y: 569.16 },
        { x: 568.9183467255737, y: 553.2242735804413 },
        { x: 569.16, y: 513.2425290499529 },
        { x: 569.16, y: 473.24622153490276 },
        { x: 569.16, y: 433.24062786941073 },
        { x: 569.16, y: 393.24200865435233 },
        { x: 569.16, y: 353.24378286565826 },
        { x: 569.16, y: 313.24880131550015 },
        { x: 569.16, y: 273.2512690674656 },
        { x: 569.16, y: 233.24365037636133 },
        { x: 569.16, y: 193.2337934273525 },
        { x: 569.16, y: 153.23471518568243 },
        { x: 569.16, y: 113.23513957809081 },
        { x: 569.16, y: 73.2322690743899 },
        { x: 569.16, y: 33.249391241743695 },
        { x: 550.1819286310673, y: 0 },
    ],
};

var shapePoints = {
    arrow: arrowPoints,
    chatBubble: chatBubblePoints,
    circle: circlePoints,
    pentagon: pentagonPoints,
    star: starPoints,
    triangle: trianglePoints,
    hexagon: hexagonPoints,
    rectangle: rectanglePoints,
};

var ChalkBrush = /** @class */ (function (_super) {
    __extends(ChalkBrush, _super);
    /**
     * Class Constructor
     * @param {fabric.Canvas} canvas - Canvas to print the path
     * @param {string} userId - Id of the user that will draw
     * @param {IBrushStyle} style - Style for the brush (chalk/crayon)
     */
    function ChalkBrush(canvas, userId, style) {
        var _this = _super.call(this) || this;
        _this.canvas = canvas;
        _this.userId = userId;
        _this.style = style;
        _this.brightness = style === 'chalk' ? 20 : 0;
        _this.clearRectDimensions =
            style === 'chalk' ? { width: 3, height: 1 } : { width: 1, height: 1 };
        // Temporal canvas creation
        _this.tempCanvas = new fabric.fabric.Canvas(document.createElement('canvas'));
        _this.tempCanvas.setWidth(canvas.getWidth() * 2);
        _this.tempCanvas.setHeight(canvas.getHeight() * 2);
        // Contexts creations
        _this.ctx = _this.canvas.getContext();
        _this.tempContext = _this.tempCanvas.getContext();
        // Drawing variables initialization
        _this.isDrawing = false;
        _this.lastPoint = { x: 0, y: 0 };
        _this.points = [];
        _this.clearRects = [];
        return _this;
    }
    /**
     * Method used to draw in both contexts, save the points for the path
     * and save clear rects to generate the chalk/crayon path
     * @param {ICoordinate} point - Next point to continue drawing and register
     */
    ChalkBrush.prototype.draw = function (point) {
        var _this = this;
        // Saving current point
        this.points.push(point);
        // Starting line in temporal canvas
        this.tempContext.beginPath();
        this.tempContext.moveTo(this.lastPoint.x, this.lastPoint.y);
        this.tempContext.lineTo(point.x, point.y);
        this.tempContext.stroke();
        // Starting line in original canvas
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
        this.ctx.lineTo(point.x, point.y);
        this.ctx.stroke();
        // Chalk Effect
        var clearRectsInPoint = this.createClearRects(point, this.lastPoint, this.width);
        clearRectsInPoint.forEach(function (rect) {
            _this.tempContext.clearRect(rect.originPoint.x, rect.originPoint.y, rect.width, rect.height);
            _this.ctx.clearRect(rect.originPoint.x, rect.originPoint.y, rect.width, rect.height);
            _this.clearRects.push(rect);
        });
        this.lastPoint = point;
    };
    /**
     * Creates a new chalk path based on the given parameters
     * @param {string} id - Id for the path
     * @param {ICoordinate[]} points - Points to follow and construct the path
     * @param {number} width - Width that the path will have
     * @param {string} color - Color that the path will have
     * @param {IClearRect[]} clearRects - Clear rects to generate
     * the chalk/crayon effect
     */
    ChalkBrush.prototype.createChalkPath = function (id, points, width, color, clearRects) {
        return __awaiter(this, void 0, void 0, function () {
            var imagePath_1, line, group, path, top_1, left_1, tempData_1, imagePromise, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        line = _super.prototype.convertPointsToSVGPath.call(this, points.map(function (point) {
                            return new fabric.fabric.Point(point.x, point.y);
                        }))
                            .join('');
                        group = __spreadArrays([
                            new fabric.fabric.Path(line, {
                                fill: 'transparent',
                                stroke: tinycolor__default['default'](color)
                                    .brighten(this.brightness + 5)
                                    .toHexString(),
                                strokeWidth: width,
                                strokeLineJoin: 'round',
                                strokeLineCap: 'round',
                                strokeUniform: true,
                            })
                        ], clearRects.map(function (rect) {
                            return new fabric.fabric.Rect({
                                left: rect.originPoint.x,
                                top: rect.originPoint.y,
                                width: rect.width * 0.9,
                                height: rect.height * 0.9,
                                fill: 'red',
                                stroke: 'red',
                                strokeWidth: 0,
                                globalCompositeOperation: 'destination-out',
                            });
                        }));
                        /*
                          Adding a middle line to could close the path
                          and flood-fill works properly
                        */
                        if (width === 2) {
                            group.push(new fabric.fabric.Path(line, {
                                fill: 'transparent',
                                stroke: tinycolor__default['default'](color)
                                    .brighten(this.brightness + 5)
                                    .toHexString(),
                                strokeWidth: 1,
                                strokeLineJoin: 'round',
                                strokeLineCap: 'round',
                                strokeUniform: true,
                            }));
                        }
                        path = new fabric.fabric.Group(group);
                        top_1 = path.top;
                        left_1 = path.left;
                        path.set({
                            top: 0,
                            left: 0,
                        });
                        this.tempCanvas.add(path);
                        path.addWithUpdate();
                        this.tempCanvas.renderAll();
                        this.tempCanvas.setWidth(Number(path.width));
                        this.tempCanvas.setHeight(Number(path.height));
                        tempData_1 = this.tempCanvas.toDataURL();
                        imagePromise = new Promise(function (resolve, reject) {
                            try {
                                fabric.fabric.Image.fromURL(tempData_1, function (image) {
                                    image.set({
                                        id: id,
                                        top: top_1,
                                        left: left_1,
                                        basePath: {
                                            type: _this.style,
                                            points: points,
                                            stroke: color,
                                            strokeWidth: width,
                                            imageData: image.getSrc(),
                                        },
                                    });
                                    _this.tempCanvas.clear();
                                    _this.tempCanvas.remove();
                                    resolve(image);
                                });
                            }
                            catch (e) {
                                reject(e);
                            }
                        });
                        return [4 /*yield*/, imagePromise
                                .then(function (response) {
                                imagePath_1 = response;
                            })
                                .catch(function (e) {
                                throw e;
                            })];
                    case 1:
                        _a.sent();
                        if (!imagePath_1)
                            throw new Error('Path Image not retrieved');
                        return [2 /*return*/, imagePath_1];
                    case 2:
                        e_1 = _a.sent();
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates the clear rects to generate the chalk effect
     * @param {ICoordinate[]} points - Points to follow in the path
     * @param {number} width - Width that the path will have
     */
    ChalkBrush.prototype.createChalkEffect = function (points, width) {
        var _this = this;
        var clearRects = [];
        var lastPoint;
        points.forEach(function (point) {
            if (!lastPoint) {
                lastPoint = point;
            }
            else {
                clearRects.push.apply(clearRects, _this.createClearRects(point, lastPoint, width));
                lastPoint = point;
            }
        });
        return clearRects;
    };
    /**
     * Mouse Down Event, starts drawing in canvas
     * @param {ICoordinate} e - Mouse pointer coordinate
     */
    ChalkBrush.prototype.onMouseDown = function (e) {
        this.isDrawing = true;
        this.lastPoint = e;
        this.initializeContextProperties();
        this.points.push(e);
        this.draw({ x: e.x + 1, y: e.y + 1 });
    };
    /**
     * Mouse Move Event, continue drawing in canvas
     * @param {ICoordinate} e - Mouse pointer coordinate
     */
    ChalkBrush.prototype.onMouseMove = function (e) {
        if (!this.isDrawing)
            return;
        this.draw(e);
    };
    /**
     * Mouse Up Event, finishes canvas drawing
     */
    ChalkBrush.prototype.onMouseUp = function () {
        var _this = this;
        this.isDrawing = false;
        return new Promise(function (resolve) {
            try {
                _this.createChalkPath(_this.userId + ":" + uuid.v4(), _this.points, _this.width, _this.color, _this.clearRects).then(function (response) {
                    if (response) {
                        _this.canvas.add(response);
                        _this.canvas.renderAll();
                    }
                    _this.points = [];
                    _this.clearRects = [];
                    resolve();
                });
            }
            catch (error) {
                console.warn(error);
            }
        });
    };
    /**
     * Creates the random clear rects to be used in chalk/crayon effect
     * @param {ICoordinate} point - Current Point
     * @param {ICoordinate} lastPoint - Last registered point
     * @param {number} width - Width thath the path will have
     */
    ChalkBrush.prototype.createClearRects = function (point, lastPoint, width) {
        var clearRects = [];
        var length = Math.round(Math.sqrt(Math.pow(point.x - lastPoint.x, 2) + Math.pow(point.y - lastPoint.y, 2)) /
            (5 / width));
        var unit = {
            x: (point.x - lastPoint.x) / length,
            y: (point.y - lastPoint.y) / length,
        };
        for (var i = 0; i < length; i += 1) {
            var current = {
                x: lastPoint.x + i * unit.x,
                y: lastPoint.y + i * unit.y,
            };
            var random = {
                x: current.x + (Math.random() - 0.5) * width * 1.2,
                y: current.y + (Math.random() - 0.5) * width * 1.2,
            };
            var generatedRect = {
                originPoint: random,
                width: this.clearRectDimensions.width,
                height: this.clearRectDimensions.height,
            };
            clearRects.push(generatedRect);
        }
        return clearRects;
    };
    /**
     * Initialize the properties related with the drawing to create
     * like color and width in both canvases
     */
    ChalkBrush.prototype.initializeContextProperties = function () {
        this.tempContext.lineWidth = this.width;
        this.tempContext.lineCap = 'round';
        this.tempContext.lineJoin = 'round';
        this.tempContext.strokeStyle = tinycolor__default['default'](this.color)
            .brighten(this.brightness)
            .toHexString();
        this.ctx.lineWidth = this.width;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = tinycolor__default['default'](this.color)
            .brighten(this.brightness)
            .toHexString();
    };
    return ChalkBrush;
}(fabric.fabric.PencilBrush));

var MarkerBrush = /** @class */ (function (_super) {
    __extends(MarkerBrush, _super);
    /**
     * Class constructor
     * @param {Canvas} canvas - Canvas to print the lines
     * @param {string} userId - Id of the user that will draw
     */
    function MarkerBrush(canvas, userId, style) {
        var _this = _super.call(this) || this;
        /**
         * Flag to know when is possible draw in the Canvas,
         * when mouse is pressed the value is true and false when is released.
         */
        _this.isDrawing = false;
        /**
         * Last registered point
         */
        _this.lastPoint = null;
        /**
         * All the registered points
         */
        _this.points = [];
        _this.userId = userId;
        _this.canvas = canvas;
        _this.ctx = _this.canvas.getContext();
        _this.style = style;
        return _this;
    }
    /**
     * Mouse Down Event, starts to draw in the canvas
     * @param {ICoordinate} e - Event Coordinate value
     */
    MarkerBrush.prototype.onMouseDown = function (e) {
        this.isDrawing = true;
        this.lastPoint = { x: e.x, y: e.y };
        this.points.push(e, e);
    };
    /**
     * Mouse Move Event, detects mouse movement to set the position of each point
     * @param {ICoordinate} e - Event Coordinate value
     */
    MarkerBrush.prototype.onMouseMove = function (e) {
        if (!this.isDrawing || !this.lastPoint)
            return;
        this.points.push(e);
        this.ctx.beginPath();
        this.ctx.lineJoin = this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.style === 'marker' ? this.width / 5 : this.width;
        this.createContextLines(e);
        this.lastPoint = { x: e.x, y: e.y };
        this.ctx.globalAlpha = 1;
    };
    /**
     * Mouse Up Event, finish drawing in canvas
     * and creates the new path with the given points
     */
    MarkerBrush.prototype.onMouseUp = function () {
        this.isDrawing = false;
        var path;
        path = this.createMarkerPath(this.userId + ":" + uuid.v4(), this.points, this.width, this.color);
        this.points = [];
        this.canvas.add(path);
        this.canvas.requestRenderAll();
        path.setCoords();
    };
    /**
     * Add a new line in context drawing (path no created)
     * @param {number} alpha - line opacity
     * @param {ICoordinate} start - line start point
     * @param {ICoordinate} end - line end point
     */
    MarkerBrush.prototype.addContextLine = function (alpha, start, end) {
        this.ctx.globalAlpha = alpha;
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
    };
    /**
     * Creates a new Path with a given opacity
     * and a position respect the main line
     * @param {number} opacity - Opacity for the Path
     * @param {ICoordinate[]} points - Points to follow to create the new line
     * @param {string} color - Stroke color to set in the line
     * @param {number} width - Stroke width to set in the line
     * @param {number} difference - points position difference
     * respect the given points
     */
    MarkerBrush.prototype.addSVGLine = function (opacity, points, color, width, difference) {
        return new fabric.fabric.Path(_super.prototype.convertPointsToSVGPath.call(this, points.map(function (point) {
            return new fabric.fabric.Point(point.x + difference, point.y + difference);
        }))
            .join(''), {
            fill: 'transparent',
            stroke: color,
            strokeWidth: width,
            opacity: opacity,
            strokeLineJoin: 'round',
            strokeLineCap: 'round',
            strokeUniform: true,
        });
    };
    /**
     * Creates a new Marker/Felt Brush Path with the given parameters
     * @param {string} id - Id to set in the new path object
     * @param {ICoordinate[]} points - Points to follow and draw the path object
     * @param {number} width - General width that the draw
     * will have (lineWidth value)
     * @param {string} color - Path Color
     */
    MarkerBrush.prototype.createMarkerPath = function (id, points, width, color) {
        var markerPath;
        if (this.style === 'marker') {
            var singleWidth = width / (width < 4 ? 2 : 5);
            markerPath = new fabric.fabric.Group([
                this.addSVGLine(1, points, color, singleWidth, -width / 8),
                this.addSVGLine(0.8, points, color, singleWidth, -width / 4),
                this.addSVGLine(0.6, points, color, singleWidth, 0),
                this.addSVGLine(0.4, points, color, singleWidth, width / 4),
                this.addSVGLine(0.2, points, color, singleWidth, width / 8),
            ]);
        }
        else {
            markerPath = new fabric.fabric.Group([
                this.addSVGLine(0.6, points, color, width, width / 5),
                this.addSVGLine(0.8, points, color, width, 0),
            ]);
        }
        markerPath.set({
            id: id,
            basePath: {
                type: this.style,
                points: points,
                stroke: color,
                strokeWidth: width,
            },
        });
        return markerPath;
    };
    /**
     * Creates the context lines
     * @param {ICoordinate} e - Coordinates of current point
     */
    MarkerBrush.prototype.createContextLines = function (e) {
        if (!this.lastPoint)
            return;
        if (this.style === 'marker') {
            this.addContextLine(1, {
                x: this.lastPoint.x - this.width / 8,
                y: this.lastPoint.y - this.width / 8,
            }, { x: e.x - this.width / 8, y: e.y - this.width / 8 });
            this.addContextLine(0.8, {
                x: this.lastPoint.x - this.width / 4,
                y: this.lastPoint.y - this.width / 4,
            }, { x: e.x - this.width / 4, y: e.y - this.width / 4 });
            this.addContextLine(0.6, {
                x: this.lastPoint.x,
                y: this.lastPoint.y,
            }, { x: e.x, y: e.y });
            this.addContextLine(0.4, {
                x: this.lastPoint.x + this.width / 4,
                y: this.lastPoint.y + this.width / 4,
            }, { x: e.x + this.width / 4, y: e.y + this.width / 4 });
            this.addContextLine(0.2, {
                x: this.lastPoint.x + this.width / 8,
                y: this.lastPoint.y + this.width / 8,
            }, { x: e.x + this.width / 8, y: e.y + this.width / 8 });
        }
        else {
            this.addContextLine(0.8, {
                x: this.lastPoint.x,
                y: this.lastPoint.y,
            }, { x: e.x, y: e.y });
            this.addContextLine(0.6, {
                x: this.lastPoint.x + this.width / 6,
                y: this.lastPoint.y + this.width / 6,
            }, { x: e.x + this.width / 6, y: e.y + this.width / 6 });
        }
    };
    return MarkerBrush;
}(fabric.fabric.PencilBrush));

var PaintBrush = /** @class */ (function (_super) {
    __extends(PaintBrush, _super);
    /**
     * Class Constructor
     * @param {fabric.Canvas} canvas - Canvas to draw
     * @param {string} userId - User that will draw
     */
    function PaintBrush(canvas, userId) {
        var _this = _super.call(this) || this;
        /**
         * Brightness variation factor,
         * path colors variation is proportional to this number
         */
        _this.varyBrightness = 10;
        /**
         * Points to use to create the path
         */
        _this.points = [];
        /**
         * Points registered for each brush's bristle,
         * when a new line will be created
         */
        _this.brushPoints = [];
        /**
         * Flag to know if is possible draw o not
         * true: mouse clicked, false: mouse released
         */
        _this.isDrawing = false;
        /**
         * Brush state in this drawing,
         * contains properties necessaries to create variations in the drawing path
         */
        _this.currentBrush = _this.makeBrush(_this.color, _this.width);
        _this.canvas = canvas;
        _this.ctx = _this.canvas.getContext();
        _this.userId = userId;
        _this.latestPoint = { x: 0, y: 0 };
        _this.currentAngle = 0;
        return _this;
    }
    /**
     * Creates a color variation of the given color
     * @param {string} color - Color to create a variation
     */
    PaintBrush.prototype.varyColor = function (color) {
        var amount = Math.round(Math.random() * 2 * this.varyBrightness);
        var newColor = tinycolor__default['default'](color);
        var varied = amount > this.varyBrightness
            ? newColor.brighten(amount - this.varyBrightness)
            : newColor.darken(amount);
        return varied.toHexString();
    };
    /**
     * Create a brush state to use in the current drawing,
     * set the properties to make this drawing different
     * @param {string} color - Path original stroke color
     * @param {number} size - Path original stroke width
     */
    PaintBrush.prototype.makeBrush = function (color, size) {
        var bristleCount = Math.round(size / 3);
        var brush = [];
        var gap = size / bristleCount;
        for (var i = 0; i < bristleCount; i += 1) {
            var distance = i === 0 ? 0 : gap * i + (Math.random() * gap) / 2 - gap / 2;
            brush.push({
                distance: distance,
                thickness: Math.random() * 2 + 2,
                color: this.varyColor(color),
            });
            if (this.brushPoints) {
                this.brushPoints.push([]);
            }
        }
        return brush;
    };
    // Geometry
    /**
     * Set a new point based in the angle drawing
     * @param {number} distance - Distance of this bristle
     * respect the original point
     * @param {number} angle - Angle in which the draw is made.
     * @param {ICoordinate} origin - Origin point
     */
    PaintBrush.prototype.rotatePoint = function (distance, angle, origin) {
        return {
            x: origin.x + distance * Math.cos(angle),
            y: origin.y + distance * Math.sin(angle),
        };
    };
    /**
     * Get bearing of origin and destination points
     * @param {ICoordinate} origin - Origin Point
     * @param {ICoordinate} destination - Destination Point
     */
    PaintBrush.prototype.getBearing = function (origin, destination) {
        return ((Math.atan2(destination.y - origin.y, destination.x - origin.x) -
            Math.PI / 2) %
            (Math.PI * 2));
    };
    /**
     * Set a new angle based in origin and destination points
     * and the current angle
     * @param {ICoordinate} origin - Origin Point
     * @param {ICoordinate} destination - Destination Point
     * @param {number} oldAngle - Current Angle
     */
    PaintBrush.prototype.getNewAngle = function (origin, destination, oldAngle) {
        var bearing = this.getBearing(origin, destination);
        if (typeof oldAngle === 'undefined') {
            return bearing;
        }
        return oldAngle - this.angleDiff(oldAngle, bearing);
    };
    /**
     * Get the difference between two angles
     * @param {number} angleA - first angle
     * @param {number} angleB - second angle
     */
    PaintBrush.prototype.angleDiff = function (angleA, angleB) {
        var twoPi = Math.PI * 2;
        var diff = ((angleA - (angleB > 0 ? angleB : angleB + twoPi) + Math.PI) % twoPi) -
            Math.PI;
        return diff < -Math.PI ? diff + twoPi : diff;
    };
    // Drawing Functions
    /**
     * Draw path for a bristle of the brush
     * Technically bristle is a path and brush the group of these paths
     * @param {ICoordinate} origin - Origin point
     * @param {ICoordinate} destination - Destination Point
     * @param {IBristle} bristle - Configuration like color and width
     * of this bristle
     * @param {ICoordinate} controlPoint - Control Point for make
     * a quadratic curve
     */
    PaintBrush.prototype.strokeBristle = function (origin, destination, bristle, controlPoint, bristleNumber) {
        this.ctx.beginPath();
        this.ctx.moveTo(origin.x, origin.y);
        this.brushPoints[bristleNumber].push(origin);
        this.ctx.strokeStyle = bristle.color;
        this.ctx.lineWidth = bristle.thickness;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.shadowColor = bristle.color;
        this.ctx.shadowBlur = bristle.thickness / 2;
        this.ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, destination.x, destination.y);
        this.ctx.lineTo(destination.x, destination.y);
        if (this.brushPoints[bristleNumber]) {
            this.brushPoints[bristleNumber].push(destination);
        }
        this.ctx.stroke();
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        this.ctx.shadowBlur = 0;
    };
    /**
     * Draw each brush's bristle
     * @param {IBristle[]} bristles - Bristles of the Brush
     * @param {ICoordinate} origin - Origin Point
     * @param {ICoordinate} destination - DEstination Point
     * @param {number} oldAngle - Angle in the previous point
     * @param {number} newAngle - Angle in the current point
     */
    PaintBrush.prototype.drawStroke = function (bristles, origin, destination, oldAngle, newAngle) {
        var _this = this;
        bristles.forEach(function (bristle, index) {
            _this.ctx.beginPath();
            var bristleOrigin = _this.rotatePoint(bristle.distance - _this.width / 2, oldAngle, origin);
            var bristleDestination = _this.rotatePoint(bristle.distance - _this.width / 2, newAngle, destination);
            var controlPoint = _this.rotatePoint(bristle.distance - _this.width / 2, newAngle, origin);
            bristleDestination = _this.rotatePoint(bristle.distance - _this.width / 2, newAngle, destination);
            _this.strokeBristle(bristleOrigin, bristleDestination, bristle, controlPoint, index);
        });
    };
    /**
     * Keep doing the drawing in canvas
     * @param {ICoordinate} newPoint - New point to continue drawing
     */
    PaintBrush.prototype.continueStroke = function (newPoint) {
        var newAngle = this.getNewAngle(this.latestPoint, newPoint, this.currentAngle);
        this.drawStroke(this.currentBrush, this.latestPoint, newPoint, this.currentAngle, newAngle);
        this.currentAngle = newAngle % (Math.PI * 2);
        this.latestPoint = newPoint;
        this.points.push(newPoint);
    };
    /**
     * Start to draw in canvas
     * @param {ICoordinate} point - Point in which the drawing starts
     */
    PaintBrush.prototype.startStroke = function (point) {
        this.currentAngle = 0;
        this.currentBrush = this.makeBrush(this.color, this.width);
        this.isDrawing = true;
        this.latestPoint = point;
        this.points.push(point);
    };
    // Mouse Events
    /**
     * Mouse Down Event, starts drawing in canvas
     * @param {ICoordinate} e - Event coordinate value
     */
    PaintBrush.prototype.onMouseDown = function (e) {
        if (this.isDrawing)
            return;
        this.startStroke(e);
    };
    /**
     * Mouse Move Event, continues with drawing
     * @param {ICoordinate} e - Event coordinate value
     */
    PaintBrush.prototype.onMouseMove = function (e) {
        if (!this.isDrawing)
            return;
        this.continueStroke(e);
    };
    /**
     * Mouse Up Event, finishes drawing
     */
    PaintBrush.prototype.onMouseUp = function () {
        if (!this.isDrawing)
            return;
        this.createNewPaintBrushPath(this.userId + ":" + uuid.v4());
    };
    /**
     * Creates a new path based on previous properties
     * and a new modification on it
     * @param {string} id - Id for the path object
     * @param {ICoordinate[]} points - Points to follow in path creation
     * @param {number} width - Path general width
     * @param {string} color - Path general color
     * @param {IBristle[]} bristles - Brush's bristles for this path
     */
    PaintBrush.prototype.modifyPaintBrushPath = function (id, points, width, color, bristles) {
        var _this = this;
        var paintBrushPath = new fabric.fabric.Group(bristles.map(function (bristle) {
            var newPoints = [];
            var currentAngle = 0;
            var latestPoint = points[0];
            if (points.length === 1) {
                return _this.addSVGLine([points[0], points[0]], bristle.thickness, bristle.color);
            }
            points.forEach(function (point) {
                var newAngle = _this.getNewAngle(latestPoint, point, currentAngle);
                var bristleOrigin = _this.rotatePoint(bristle.distance - width / 2, currentAngle, latestPoint);
                var bristleDestination = _this.rotatePoint(bristle.distance - width / 2, newAngle, point);
                newPoints.push(bristleOrigin, bristleDestination);
                currentAngle = newAngle % (Math.PI * 2);
                latestPoint = point;
            });
            return _this.addSVGLine(newPoints, bristle.thickness, bristle.color);
        }));
        paintBrushPath.set({
            id: id,
            basePath: {
                type: 'paintbrush',
                points: points,
                stroke: color,
                strokeWidth: width,
                bristles: bristles,
            },
        });
        return paintBrushPath;
    };
    /**
     * Create the path for the current brush's bristle
     * @param {ICoordinate[]} points - Points to follow in path creation
     * @param {number} width - Width of current bristle
     * @param {string} color - Color of current bristle
     */
    PaintBrush.prototype.addSVGLine = function (points, width, color) {
        return new fabric.fabric.Path(_super.prototype.convertPointsToSVGPath.call(this, points.map(function (point) {
            return new fabric.fabric.Point(point.x, point.y);
        }))
            .join(''), {
            fill: 'transparent',
            stroke: color,
            shadow: new fabric.fabric.Shadow({
                affectStroke: true,
                nonScaling: true,
                color: color,
                blur: width / 2,
            }),
            strokeWidth: width,
            strokeLineJoin: 'round',
            strokeLineCap: 'round',
            strokeUniform: true,
        });
    };
    /**
     * Creates a new paintbrush path from mouse events
     * @param {string} id - Id to set in the path
     */
    PaintBrush.prototype.createNewPaintBrushPath = function (id) {
        var _this = this;
        if (this.points.length === 1) {
            this.brushPoints.forEach(function (bristle) {
                bristle.push(_this.points[0], _this.points[0]);
            });
        }
        var paintBrushPath = new fabric.fabric.Group(this.currentBrush.map(function (bristle, index) {
            return _this.addSVGLine(_this.brushPoints[index], bristle.thickness, bristle.color);
        }));
        paintBrushPath.set({
            id: id,
            basePath: {
                type: 'paintbrush',
                points: this.points,
                stroke: this.color,
                strokeWidth: this.width,
                bristles: this.currentBrush,
            },
        });
        this.isDrawing = false;
        this.points = [];
        this.brushPoints = [];
        this.canvas.add(paintBrushPath);
        paintBrushPath.addWithUpdate();
        this.canvas.renderAll();
    };
    return PaintBrush;
}(fabric.fabric.PencilBrush));

var PenBrush = /** @class */ (function (_super) {
    __extends(PenBrush, _super);
    /**
     * Class Constructor
     * @param {Canvas} canvas - Canvas to draw
     * @param {string} userId - userId of the current user
     */
    function PenBrush(canvas, userId) {
        var _this = _super.call(this) || this;
        /**
         * State to know if currently is possible draw in the given canvas,
         * basically used to avoid draw in the canvas in a mouse move event
         * when mouse down is not happening
         */
        _this.isDrawing = false;
        /**
         * Array to store the points to draw the paths that will conform
         * the final group of paths with their respective width
         */
        _this.points = [];
        _this.userId = userId;
        _this.canvas = canvas;
        return _this;
    }
    /**
     * Returns a random int from a given min value to a given max value,
     * basically is used here to set a different width in each path generated
     * @param {number} min - Random Number minimum value
     * @param {number} max - Random NUmber maximum value
     */
    PenBrush.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /**
     * Sets minimum and maximum values to set valid widths
     * for a pen line with the given linewidth
     * @param {number} lineWidth - stroke width for the line
     */
    PenBrush.prototype.setMinMaxWidth = function (lineWidth) {
        if (lineWidth < 4) {
            return {
                min: 2,
                max: 3,
            };
        }
        return {
            min: lineWidth / 2,
            max: lineWidth,
        };
    };
    /**
     * Mouse Down Event, starts to draw in the canvas
     * @param {ICoordinate} e - Event Coordinate value
     */
    PenBrush.prototype.onMouseDown = function (e) {
        var _a = this.setMinMaxWidth(this.width), min = _a.min, max = _a.max;
        this.isDrawing = true;
        this.points.push({
            x: e.x,
            y: e.y,
            width: this.getRandomInt(min, max),
        }, {
            x: e.x,
            y: e.y,
            width: this.getRandomInt(min, max),
        });
    };
    /**
     * Mouse Move Event, detects mouse movement to set the position of each point
     * @param {ICoordinate} e - Event Coordinate value
     */
    PenBrush.prototype.onMouseMove = function (e) {
        if (!this.isDrawing)
            return;
        var _a = this.setMinMaxWidth(this.width), min = _a.min, max = _a.max;
        var ctx = this.canvas.getContext();
        this.points.push({
            x: e.x,
            y: e.y,
            width: this.getRandomInt(min, max),
        });
        for (var i = 1; i < this.points.length; i++) {
            ctx.beginPath();
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.moveTo(this.points[i - 1].x, this.points[i - 1].y);
            ctx.lineWidth = this.points[i].width;
            ctx.strokeStyle = this.color;
            ctx.lineTo(this.points[i].x, this.points[i].y);
            ctx.stroke();
        }
    };
    /**
     * Mouse Up Event, finish drawing in canvas
     * and creates the new path with the given points
     */
    PenBrush.prototype.onMouseUp = function () {
        this.isDrawing = false;
        var path = this.createPenPath(this.userId + ":" + uuid.v4(), this.points, this.width, this.color);
        this.canvas.add(path);
        this.canvas.requestRenderAll();
        path.setCoords();
        this.points.length = 0;
    };
    /**
     * Creates a new Pen Brush Path with the given parameters
     * @param {string} id - Id to set in the new path object
     * @param {IPenPoint[]} points - Points to follow and draw the new path object
     * @param {number} width - General width that the draw
     * will have (lineWidth value)
     * @param {string} color - Path Color
     */
    PenBrush.prototype.createPenPath = function (id, points, width, color) {
        var _this = this;
        var paths = [];
        var penPath;
        points.forEach(function (point, index) {
            if (!index)
                return;
            paths.push(new fabric.fabric.Path(_super.prototype.convertPointsToSVGPath.call(_this, [
                {
                    x: points[index - 1].x,
                    y: points[index - 1].y,
                },
                {
                    x: point.x,
                    y: point.y,
                },
            ])
                .join(''), {
                strokeWidth: point.width,
                stroke: color,
                strokeLineCap: 'round',
                strokeLineJoin: 'round',
                strokeUniform: true,
            }));
        });
        penPath = new fabric.fabric.Group(paths);
        penPath.set({
            id: id,
            basePath: {
                type: 'pen',
                points: __spreadArrays(points),
                stroke: color,
                strokeWidth: width,
            },
        });
        return penPath;
    };
    return PenBrush;
}(fabric.fabric.PencilBrush));

/**
 * Applies Undo/Redo for brush type changes in groups of objects
 * @param {fabric.Canvas} canvas - Canvas in which the objects are
 * @param {string} userId - User that does the action
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher
 * to save the events and could make undo/redo over them
 */
var changeBrushTypeUndoRedoGroup = function (canvas, userId, undoRedoDispatch) {
    var obj = canvas.getActiveObject();
    var type = obj === null || obj === void 0 ? void 0 : obj.get('type');
    if (!obj || type !== 'activeSelection')
        return;
    var activeIds = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject().getObjects().map(function (o) { return o.id; });
    var payload = {
        type: type,
        svg: true,
        target: null,
        id: userId + ":group",
    };
    var event = { event: payload, type: 'activeSelection', activeIds: activeIds };
    var filtered = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) {
        return !o.group;
    });
    var active = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
    active === null || active === void 0 ? void 0 : active.set({ id: userId + ":group" });
    undoRedoDispatch({
        type: SET_GROUP,
        payload: __spreadArrays(filtered, [active]),
        canvasId: userId,
        event: event,
    });
};

/**
 * Changes brushType value and if one or more objects are selected
 * also changes their brush style
 * @param {fabric.Canvas} canvas - Canvas in which the objects to change are
 * @param {string} userId - User that will do changes in objects
 * @param {PaintEventSerializer} eventSerializer - Serializer to synchronize
 * changes in the other canvases
 * @param {IBrushType} type - Brush type to change
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher
 * to save brush type changes and could make undo/redo over them
 */
var changeBrushTypeAction = function (canvas, userId, eventSerializer, updateBrushType, type, undoRedoDispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var newActives, activeObjects, isFloodFilled, selection, _loop_1, _i, activeObjects_1, object, state_1, activesGroup;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newActives = [];
                activeObjects = [];
                isFloodFilled = function (object) {
                    return (object.fill &&
                        object.fill !== 'transparent' &&
                        object.fill !== 'rgb(0,0,0)');
                };
                // Updating brush type
                updateBrushType(type);
                if (!canvas)
                    return [2 /*return*/];
                selection = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
                // Saving activeObjects
                if ((selection === null || selection === void 0 ? void 0 : selection.type) === 'activeSelection') {
                    activeObjects = selection._objects;
                }
                else {
                    activeObjects = canvas.getActiveObjects();
                }
                if (!activeObjects)
                    return [2 /*return*/];
                canvas.discardActiveObject();
                _loop_1 = function (object) {
                    var brush_1, newPath_1, id, basePath, points, original_1, _a, _b, min_1, max_1, penPoints, bristles, clearRects, payload, event_1;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!(object.basePath &&
                                    canvas &&
                                    userId &&
                                    !isFloodFilled(object))) return [3 /*break*/, 8];
                                id = object.id;
                                basePath = object.basePath;
                                points = (basePath === null || basePath === void 0 ? void 0 : basePath.points).map(function (point) {
                                    return new fabric.fabric.Point(point.x, point.y);
                                });
                                if (isEmptyShape(object)) {
                                    original_1 = shapePoints[object.name];
                                    points = original_1.points.map(function (point) {
                                        var scaleX = (point.x / original_1.width) * Number(object.width);
                                        var scaleY = (point.y / original_1.height) * Number(object.height);
                                        return new fabric.fabric.Point(scaleX, scaleY);
                                    });
                                }
                                _a = type;
                                switch (_a) {
                                    case 'dashed': return [3 /*break*/, 1];
                                    case 'pencil': return [3 /*break*/, 1];
                                    case 'pen': return [3 /*break*/, 2];
                                    case 'marker': return [3 /*break*/, 3];
                                    case 'felt': return [3 /*break*/, 3];
                                    case 'paintbrush': return [3 /*break*/, 4];
                                    case 'chalk': return [3 /*break*/, 5];
                                    case 'crayon': return [3 /*break*/, 5];
                                }
                                return [3 /*break*/, 7];
                            case 1:
                                brush_1 = new fabric.fabric.PencilBrush();
                                newPath_1 = brush_1.createPath(brush_1.convertPointsToSVGPath(points).join(''));
                                newPath_1.set({
                                    stroke: basePath === null || basePath === void 0 ? void 0 : basePath.stroke,
                                    strokeWidth: basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth,
                                    strokeUniform: true,
                                    strokeDashArray: type === 'dashed' ? [Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth) * 2] : [],
                                    basePath: {
                                        type: type,
                                        points: points || [],
                                        stroke: String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke),
                                        strokeWidth: Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth),
                                    },
                                });
                                return [3 /*break*/, 7];
                            case 2:
                                brush_1 = new PenBrush(canvas, userId);
                                _b = brush_1.setMinMaxWidth(Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth)), min_1 = _b.min, max_1 = _b.max;
                                penPoints = points.map(function (point) {
                                    return {
                                        x: point.x,
                                        y: point.y,
                                        width: brush_1.getRandomInt(min_1, max_1),
                                    };
                                });
                                newPath_1 = brush_1.createPenPath(String(object.id), penPoints, Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke));
                                return [3 /*break*/, 7];
                            case 3:
                                brush_1 = new MarkerBrush(canvas, userId, type);
                                newPath_1 = brush_1.createMarkerPath(String(object.id), points, Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke));
                                return [3 /*break*/, 7];
                            case 4:
                                brush_1 = new PaintBrush(canvas, userId);
                                bristles = brush_1.makeBrush(String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke), Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth));
                                newPath_1 = brush_1.modifyPaintBrushPath(String(object.id), points, Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke), bristles);
                                return [3 /*break*/, 7];
                            case 5:
                                brush_1 = new ChalkBrush(canvas, userId, type);
                                clearRects = brush_1.createChalkEffect(points, Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth));
                                return [4 /*yield*/, brush_1
                                        .createChalkPath(String(object.id), points, Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke), clearRects)
                                        .then(function (image) {
                                        newPath_1 = image;
                                    })
                                        .catch(function (error) {
                                        console.warn(error);
                                    })];
                            case 6:
                                _c.sent();
                                return [3 /*break*/, 7];
                            case 7:
                                if (!newPath_1)
                                    return [2 /*return*/, { value: void 0 }];
                                newPath_1.set({
                                    top: object.top,
                                    left: object.left,
                                    angle: object.angle,
                                    scaleX: object.scaleX,
                                    scaleY: object.scaleY,
                                    flipX: object.flipX,
                                    flipY: object.flipY,
                                });
                                // Removing id to don't be detected and remove event wouldn't be sent
                                delete object.id;
                                delete newPath_1.id;
                                canvas.remove(object);
                                canvas.add(newPath_1);
                                newPath_1.set({
                                    id: id,
                                });
                                // Pushing new object to select it after creation
                                newActives.push(newPath_1);
                                payload = {
                                    id: String(newPath_1.id),
                                    type: newPath_1.type,
                                    target: {
                                        top: newPath_1.top,
                                        left: newPath_1.left,
                                        basePath: newPath_1.basePath,
                                    },
                                };
                                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('brushTypeChanged', payload);
                                if (activeObjects.length === 1) {
                                    event_1 = { event: payload, type: 'brushTypeChanged' };
                                    // Dispatching Brush Type Change in Custom Paths
                                    undoRedoDispatch({
                                        type: SET,
                                        payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                                        canvasId: userId,
                                        event: event_1,
                                    });
                                }
                                _c.label = 8;
                            case 8: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, activeObjects_1 = activeObjects;
                _a.label = 1;
            case 1:
                if (!(_i < activeObjects_1.length)) return [3 /*break*/, 4];
                object = activeObjects_1[_i];
                return [5 /*yield**/, _loop_1(object)];
            case 2:
                state_1 = _a.sent();
                if (typeof state_1 === "object")
                    return [2 /*return*/, state_1.value];
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                if (newActives.length === 1) {
                    canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(newActives[0]);
                }
                else if (newActives.length >= 2) {
                    activesGroup = new fabric.fabric.ActiveSelection(newActives);
                    canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(activesGroup);
                }
                canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                changeBrushTypeUndoRedoGroup(canvas, userId, undoRedoDispatch);
                return [2 /*return*/];
        }
    });
}); };

// filled shape default values
var filledShape = {
    stroke: 'none',
    strokeWidth: 0,
};
// empty shape default values
var emptyShape = {
    strokeWidth: 2,
    fill: 'transparent',
};
/**
 * Creates Rectangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
var rectangle = function (width, height, color, filled, thickness, dashed) {
    var shape = new fabric.fabric.Rect({
        width: width,
        height: height,
        selectable: false,
        evented: false,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        strokeUniform: true,
        strokeDashArray: dashed ? [thickness * 2] : [],
        strokeLineCap: dashed ? 'round' : 'butt',
        strokeLineJoin: dashed ? 'round' : 'butt',
        padding: 15,
    });
    return fabric.fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
};
/**
 * Creates Triangle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
var triangle = function (width, height, color, filled, thickness, dashed) {
    var shape = new fabric.fabric.Triangle({
        width: width,
        height: height,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        selectable: false,
        evented: false,
        padding: 15,
        strokeUniform: true,
        strokeDashArray: dashed ? [thickness * 2] : [],
        strokeMiterLimit: 50,
        strokeLineCap: dashed ? 'round' : 'butt',
        strokeLineJoin: dashed ? 'round' : 'miter',
    });
    return fabric.fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
};
/**
 * Creates Circle Shape
 * @param width With of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
var circle = function (width, height, color, filled, thickness, dashed) {
    var shape = new fabric.fabric.Ellipse({
        rx: width,
        ry: height,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        selectable: false,
        evented: false,
        strokeUniform: true,
        strokeDashArray: dashed ? [thickness * 2] : [],
        strokeLineCap: dashed ? 'round' : 'butt',
        strokeLineJoin: dashed ? 'round' : 'butt',
        padding: 15,
    });
    return fabric.fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
};
/**
 * Creates pentagon shape.
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
var pentagon = function (color, filled, thickness, dashed) {
    var shape = new fabric.fabric.Polygon([
        { x: 200, y: 0 },
        { x: 250, y: 42 },
        { x: 230, y: 100 },
        { x: 170, y: 100 },
        { x: 150, y: 42 },
    ]);
    shape = fabric.fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
    return shape.set({
        scaleX: 0.02,
        scaleY: 0.02,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        selectable: false,
        evented: false,
        strokeUniform: true,
        strokeDashArray: dashed ? [thickness * 2] : [],
        padding: 15,
        strokeMiterLimit: 50,
        strokeLineCap: dashed ? 'round' : 'butt',
        strokeLineJoin: dashed ? 'round' : 'miter',
    });
};
/**
 * Creates pentagon shape.
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
var hexagon = function (color, filled, thickness, dashed) {
    var shape = new fabric.fabric.Polygon([
        { x: 125, y: 0 },
        { x: 275, y: 0 },
        { x: 350, y: 175 },
        { x: 275, y: 350 },
        { x: 125, y: 350 },
        { x: 50, y: 175 },
    ]);
    shape = fabric.fabric.util.object.extend(shape, {
        shapeType: 'shape',
        scaleX: 0.02,
        scaleY: 0.02,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        selectable: false,
        evented: false,
        strokeUniform: true,
        strokeDashArray: dashed ? [thickness * 2] : [],
        padding: 15,
        strokeMiterLimit: 50,
        strokeLineCap: dashed ? 'round' : 'butt',
        strokeLineJoin: dashed ? 'round' : 'miter',
    });
    return shape;
};
/**
 * Method to create a shape.
 * @param path Shape to be created path
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape.
 * @param filled Flag to set a shape filled or not
 */
var generic = function (path, width, height, color, filled, thickness, dashed) {
    var shape = new fabric.fabric.Path(path);
    var scaleX = 1 / (Number(shape.width) / width);
    var scaleY = 1 / (Number(shape.height) / height);
    fabric.fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
    return shape.set({
        scaleX: scaleX,
        scaleY: scaleY,
        stroke: filled ? filledShape.stroke : color,
        strokeWidth: thickness,
        fill: filled ? color : emptyShape.fill,
        selectable: false,
        evented: false,
        strokeUniform: true,
        strokeDashArray: dashed ? [thickness * 2] : [],
        padding: 15,
        strokeMiterLimit: 50,
        strokeLineCap: dashed ? 'round' : 'butt',
        strokeLineJoin: dashed ? 'round' : 'miter',
    });
};
/**
 * Creates a star shape.
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
var star = function (width, height, color, filled, thickness, dashed) {
    var path = "\n    M 202.000 222.000     L 225.511 234.361     L 221.021 208.180     L 240.042 189.639     L 213.756 185.820     L 202.000 162.000     L 190.244 185.820     L 163.958 189.639     L 182.979 208.180     L 178.489 234.361     L 202.000 222.000     z\n  ";
    return generic(path, width, height, color, filled, thickness, dashed);
};
/**
 * Creates an arrow shape.
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
var arrow = function (width, height, color, filled, thickness, dashed) {
    var path = "\n    M421.976,196.712L236.111,10.848C228.884,3.615,220.219,0,210.131,0c-9.9,0-18.464,3.615-25.697,10.848L163.023,32.26\n    c-7.234,6.853-10.85,15.418-10.85,25.697c0,10.277,3.616,18.842,10.85,25.697l83.653,83.937H45.677\n    c-9.895,0-17.937,3.568-24.123,10.707s-9.279,15.752-9.279,25.837v36.546c0,10.088,3.094,18.698,9.279,25.837\n    s14.228,10.704,24.123,10.704h200.995L163.02,360.88c-7.234,7.228-10.85,15.89-10.85,25.981c0,10.089,3.616,18.75,10.85,25.978\n    l21.411,21.412c7.426,7.043,15.99,10.564,25.697,10.564c9.899,0,18.562-3.521,25.981-10.564l185.864-185.864\n    c7.043-7.043,10.567-15.701,10.567-25.981C432.54,211.939,429.016,203.37,421.976,196.712z\n  ";
    return generic(path, width, height, color, filled, thickness, dashed);
};
/**
 * Creates a chat bubble shape
 * @param width Width of shape
 * @param height Height of shape
 * @param color Color of shape
 * @param filled Flag to set a shape filled or not
 */
var chat = function (width, height, color, filled, thickness, dashed) {
    var path = "\n    M29,1.5c-16.016,0-29,11.641-29,26c0,5.292,1.768,10.211,4.796,14.318\n    C4.398,46.563,3.254,53.246,0,56.5c0,0,9.943-1.395,16.677-5.462c0.007,0.003,0.015,0.006,0.022,0.009\n    c2.764-1.801,5.532-3.656,6.105-4.126c0.3-0.421,0.879-0.548,1.33-0.277c0.296,0.178,0.483,0.503,0.489,0.848\n    c0.01,0.622-0.005,0.784-5.585,4.421C22.146,52.933,25.498,53.5,29,53.5c16.016,0,29-11.641,29-26S45.016,1.5,29,1.5z\n  ";
    return generic(path, width, height, color, filled, thickness, dashed);
};
/**
 * Creates laser pointer shape, used for pointer tool.
 */
var laserPointer = function () {
    var path = "\n    M256, 361.5h-67.421875c-1.1875-4.195312-2.855469-8.1875-4.945313-11.914062l47.679688-47.683594c5.859375-5.855469,\n    5.859375-15.351563.003906-21.210938-5.859375-5.855468-15.355468-5.859375-21.214844-.003906l-47.6875,\n    47.683594c-3.722656-2.09375-7.71875-3.761719-11.910156-4.945313v-308.425781c0-8.285156-6.71875-15-15-15-8.285156,\n    0-15, 6.714844-15 15v308.425781c-4.195312, 1.1875-8.191406, 2.851563-11.917968, 4.945313l-47.6875-47.683594c-5.855469-5.859375-15.351563-5.859375-21.210938,\n    0-5.859375, 5.855469-5.859375, 15.351562, 0, 21.210938l47.683594, 47.6875c-2.09375, 3.726562-3.761719, 7.71875-4.945313, 11.914062h-67.425781c-8.285156,\n    0-15 6.714844-15, 15s6.714844, 15, 15, 15h67.425781c1.183594, 4.195312, 2.851563, 8.1875, 4.945313, 11.914062l-47.683594, 47.6875c-5.859375, 5.855469-5.859375,\n    15.355469, 0, 21.210938, 2.929688, 2.929688, 6.765625, 4.394531, 10.605469, 4.394531, 3.839843, 0, 7.679687-1.464843, 10.605469-4.394531l47.6875-47.683594c3.726562,\n    2.09375, 7.722656, 3.761719, 11.917968, 4.945313v67.425781c0, 8.285156, 6.714844, 15, 15, 15, 8.28125, 0, 15-6.714844, 15-15v-67.425781c4.191406-1.1875,\n    8.1875-2.851563, 11.910156-4.945313l47.6875, 47.683594c2.929688, 2.929688, 6.765626, 4.394531, 10.605469, 4.394531, 3.839844, 0, 7.679688-1.464843, 10.605469-4.394531,\n    5.859375-5.855469, 5.859375-15.351562, 0-21.210938l-47.683594-47.683593c2.09375-3.726563, 3.761719-7.722657, 4.949219-11.917969h67.421875c8.285156, 0, 15-6.714844,\n    15-15s-6.714844-15-15-15zm0, 0\n  ";
    var shape = new fabric.fabric.Path(path);
    fabric.fabric.util.object.extend(shape, {
        shapeType: 'shape',
        mimicBackground: true,
    });
    return shape.set({
        scaleX: 0.1,
        scaleY: 0.1,
        flipY: true,
        angle: -50,
    });
};
var brush = function () {
    var shape = new fabric.fabric.PatternBrush();
    return shape;
};

var shapes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    rectangle: rectangle,
    triangle: triangle,
    circle: circle,
    pentagon: pentagon,
    hexagon: hexagon,
    generic: generic,
    star: star,
    arrow: arrow,
    chat: chat,
    laserPointer: laserPointer,
    brush: brush
});

/**
 * Selects shape.
 * @param props Shape properties
 */
function useShapeSelector(props) {
    var brushType = props.brushType, lineWidth = props.lineWidth, penColor = props.penColor, shape = props.shape, shapeColor = props.shapeColor;
    var value = React.useCallback(function (specific) {
        var value = (specific || shape) === 'chatBubble' ? 'chat' : specific || shape;
        switch (value) {
            case 'rectangle':
            case 'circle':
            case 'triangle':
            case 'star':
            case 'arrow':
            case 'chat':
                return shapes[value](2, 2, penColor, false, lineWidth, brushType === 'dashed');
            case 'pentagon':
            case 'hexagon':
                return shapes[value](penColor, false, lineWidth, brushType === 'dashed');
            case 'filledRectangle':
            case 'filledCircle':
            case 'filledArrow':
            case 'filledStar':
            case 'filledChatBubble': {
                var key = value.replace('filled', '').toLowerCase();
                return shapes[key](2, 2, shapeColor, true, 0, brushType === 'dashed');
            }
            case 'filledTriangle':
                return triangle(2, 4, shapeColor, true, 0, brushType === 'dashed');
            case 'filledPentagon':
            case 'filledHexagon': {
                var key = value === 'filledPentagon' ? 'pentagon' : 'hexagon';
                return shapes[key](shapeColor, true, 0, brushType === 'dashed');
            }
            default:
                return circle(2, 2, penColor, false, lineWidth, brushType === 'dashed');
        }
    }, [
        brushType, lineWidth, penColor, shape, shapeColor
    ]);
    return value;
}
/**
 * Selects special (filled) shape.
 * @param userId User Id
 */
function useSpecialShapeSelector(userId) {
    var _this = this;
    var value = React.useCallback(function (useProps) { return __awaiter(_this, void 0, void 0, function () {
        var canvas, shape, brushType, lineWidth, penColor, original, brush, newShape, _a, _b, min_1, max_1, penPoints, bristles, clearRects, scaleX, scaleY;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    canvas = useProps.canvas, shape = useProps.shape, brushType = useProps.brushType, lineWidth = useProps.lineWidth, penColor = useProps.penColor;
                    original = shapePoints[shape];
                    if (!canvas) {
                        return [2 /*return*/];
                    }
                    _a = brushType;
                    switch (_a) {
                        case 'pen': return [3 /*break*/, 1];
                        case 'marker': return [3 /*break*/, 2];
                        case 'felt': return [3 /*break*/, 2];
                        case 'paintbrush': return [3 /*break*/, 3];
                        case 'chalk': return [3 /*break*/, 4];
                        case 'crayon': return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 8];
                case 1:
                    brush = new PenBrush(canvas, userId);
                    _b = brush.setMinMaxWidth(lineWidth), min_1 = _b.min, max_1 = _b.max;
                    penPoints = original.points.map(function (point) {
                        return {
                            x: point.x,
                            y: point.y,
                            width: brush.getRandomInt(min_1, max_1),
                        };
                    });
                    newShape = brush.createPenPath('provisional', penPoints, lineWidth, penColor);
                    return [3 /*break*/, 8];
                case 2:
                    brush = new MarkerBrush(canvas, userId, brushType);
                    newShape = brush.createMarkerPath('provisional', original.points, lineWidth, penColor);
                    return [3 /*break*/, 8];
                case 3:
                    brush = new PaintBrush(canvas, userId);
                    bristles = brush.makeBrush(penColor, lineWidth);
                    newShape = brush.modifyPaintBrushPath('provisional', original.points, lineWidth, penColor, bristles);
                    return [3 /*break*/, 8];
                case 4:
                    brush = new ChalkBrush(canvas, userId, brushType);
                    clearRects = brush.createChalkEffect(original.points, lineWidth);
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, brush.createChalkPath('provisional', original.points, lineWidth, penColor, clearRects)];
                case 6:
                    newShape = _c.sent();
                    return [3 /*break*/, 8];
                case 7:
                    _c.sent();
                    return [2 /*return*/];
                case 8:
                    if (!newShape)
                        return [2 /*return*/];
                    scaleX = Number(newShape.width) / 2;
                    scaleY = Number(newShape.width) / 2;
                    newShape.set({
                        scaleX: 1 / scaleX,
                        scaleY: 1 / scaleY,
                    });
                    return [2 /*return*/, newShape];
            }
        });
    }); }, [userId]);
    return value;
}

/**
 * Gets length from one point to another.
 * @param x1 Coordinate starts.
 * @param x2 Coordinate ends.
 */
var getLength = function (x1, x2) { return Math.abs(x1 - x2); };
/**
 *
 * @param shape Fabric shape. Either rectangle or triangle.
 * @param start Start coordinates.
 * @param end End coordinates.
 */
var setSize = function (shape, start, end, isNormalBrush) {
    var width = getLength(end.x, start.x);
    var height = getLength(end.y, start.y);
    if (isNormalBrush) {
        shape.set({ width: width, height: height });
    }
    else {
        var scaleX = Number(shape.width) / width;
        var scaleY = Number(shape.height) / height;
        shape.set({
            scaleX: 1 / scaleX,
            scaleY: 1 / scaleY,
        });
    }
    return { width: width, height: height };
};
/**
 * Sets circle size and returns dimensions.
 * @param shape Fabric ellipse
 * @param start Start coordinates.
 * @param end End coordinates.
 */
var setCircleSize = function (shape, start, end, isNormalBrush) {
    var rx = getLength(end.x, start.x) / 2;
    var ry = getLength(end.y, start.y) / 2;
    if (isNormalBrush) {
        shape.set({ rx: rx, ry: ry });
    }
    else {
        var scaleX = Number(shape.width) / rx;
        var scaleY = Number(shape.height) / ry;
        shape.set({
            scaleX: (1 / scaleX) * 2,
            scaleY: (1 / scaleY) * 2,
        });
    }
    return { width: rx * 2, height: ry * 2 };
};
/**
 * Sets custom shape size and returns dimensions.
 * @param shape Custom shape.
 * @param start Start coordinates.
 * @param end End coordinates.
 */
var setPathSize = function (shape, start, end) {
    var width = getLength(end.x, start.x) / 2;
    var height = getLength(end.y, start.y) / 2;
    var scaleX = 2 / (Number(shape.width) / width);
    var scaleY = 2 / (Number(shape.height) / height);
    shape.set({ scaleX: scaleX, scaleY: scaleY });
    return { width: width, height: height };
};

/**
 * Mouse Move event handler
 * @param shape Shape that was added to canvas.
 * @param coordsStart Coordinates of initial click on canvas.
 * @param isCircle Indicates if shape added is a circle.
 */
function useMouseMove() {
    var value = React.useCallback(function (shape, coordsStart, specific, canvas, brushType) {
        var mouseMove = function (e) {
            if (!e.pointer || !canvas)
                return;
            canvas.selection = false;
            if (specific === 'filledCircle' || specific === 'circle') {
                setCircleSize(shape, coordsStart, e.pointer, brushType === 'pencil' || brushType === 'dashed');
            }
            else if (specific === 'filledRectangle' ||
                specific === 'filledTriangle' ||
                specific === 'rectangle' ||
                specific === 'triangle') {
                setSize(shape, coordsStart, e.pointer, brushType === 'pencil' || brushType === 'dashed');
            }
            else {
                setPathSize(shape, coordsStart, e.pointer);
            }
            var anchor = __assign(__assign({}, coordsStart), { originX: 'left', originY: 'top' });
            if (e.pointer && coordsStart.x > e.pointer.x) {
                anchor = __assign(__assign({}, anchor), { originX: 'right' });
            }
            if (e.pointer && coordsStart.y > e.pointer.y) {
                anchor = __assign(__assign({}, anchor), { originY: 'bottom' });
            }
            shape.set(anchor);
            canvas.renderAll();
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:move', mouseMove);
    }, []);
    return value;
}
/**
 * Mouse up event handler
 * @param dispatch React dispatch method
 */
function useMouseUp(dispatch) {
    var value = React.useCallback(function (shape, coordsStart, specific, canvas, brushType) {
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:up', function (e) {
            if (!e.pointer)
                return;
            var size;
            if (specific === 'filledCircle' || specific === 'circle') {
                size = setCircleSize(shape, coordsStart, e.pointer, brushType === 'pencil' || brushType === 'dashed');
            }
            else if (specific === 'filledRectangle' ||
                specific === 'filledTriangle' ||
                specific === 'rectangle' ||
                specific === 'triangle') {
                size = setSize(shape, coordsStart, e.pointer, brushType === 'pencil' || brushType === 'dashed');
            }
            else {
                size = setPathSize(shape, coordsStart, e.pointer);
            }
            if (size.width <= 2 && size.height <= 2) {
                canvas.remove(shape);
            }
            else {
                shape.setCoords();
                canvas.renderAll();
                dispatch({ type: 'CANVAS_SET', payload: canvas.getObjects() });
            }
        });
    }, [dispatch]);
    return value;
}
var useMouseDown = function (canvas, shapeSelector, clearOnMouseEvent, mouseMove, mouseUp, brushType, shapeColor) { return (React.useCallback(function (specific, color) {
    var click = function (e) {
        if (e.target || !e.pointer) {
            return;
        }
        var shape;
        shape = shapeSelector(specific);
        if (e.pointer) {
            shape.set({
                top: e.pointer.y,
                left: e.pointer.x,
                shapeType: 'shape',
                name: specific,
                strokeUniform: true,
            });
        }
        // fill and type properties just can be resetted if is an filled shape
        if (shape.fill !== 'transparent') {
            shape.set({
                shapeType: 'filledShape',
                fill: color || shapeColor,
            });
        }
        clearOnMouseEvent(click);
        // @ts-ignore
        mouseMove(shape, e.pointer, specific, canvas, brushType);
        // @ts-ignore
        mouseUp(shape, e.pointer, specific);
        canvas.add(shape);
    };
    canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:down', click);
}, [canvas, clearOnMouseEvent, mouseMove, mouseUp, shapeColor, shapeSelector, brushType])); };

/**
 * Cancels shape creation
 * @param canvas Fabric canvas
 */
var cancelShapeCreation = function (canvas) {
    return function () {
        if (store.getState().canvasBoardState.resize) {
            store.dispatch({ type: 'SET_FALSE' });
        }
        var shape = store.getState().canvasBoardState.shape;
        if (!(shape === null || shape === void 0 ? void 0 : shape.id) || (shape === null || shape === void 0 ? void 0 : shape.id) === 'provisional') {
            canvas === null || canvas === void 0 ? void 0 : canvas.remove(shape);
            store.dispatch({ type: 'SET_SHAPE_NULL' });
        }
    };
};
/**
 * Return the movement hability in the current target shape
 * @param {IEvent} event - current event, necessary to know
 * which is the current target shape
 */
var allowMovementInShape = function (event) {
    if (event.target) {
        event.target.set({
            lockMovementX: false,
            lockMovementY: false,
        });
    }
};

/**
 * Mouse down event handler
 * @param canvas Fabric canvas
 * @param brushType Brush type
 * @param shapeSelector Shape selector method
 * @param shapeToAdd Indicates shape to add
 * @param specialShapeSelector Method to select special shape
 * @param lineWidth Line width
 * @param penColor Pen / brush color
 */
var mouseDownAction = function (canvas, brushType, shapeSelector, shapeToAdd, specialShapeSelector, lineWidth, penColor) { return function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var shape_1, shape_2, shape;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (store.getState().canvasBoardState.resize) {
                    return [2 /*return*/];
                }
                // Locking movement to avoid shapes moving
                if (e.target) {
                    e.target.set({
                        lockMovementX: true,
                        lockMovementY: true,
                    });
                }
                if (!(brushType === 'pencil' || brushType === 'dashed')) return [3 /*break*/, 1];
                shape_1 = shapeSelector(shapeToAdd);
                store.dispatch({ type: 'SET_SHAPE', payload: shape_1 });
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, specialShapeSelector({
                    canvas: canvas,
                    shape: shapeToAdd,
                    brushType: brushType,
                    lineWidth: lineWidth,
                    penColor: penColor,
                })];
            case 2:
                shape_2 = (_a.sent());
                store.dispatch({ type: 'SET_SHAPE', payload: shape_2 });
                _a.label = 3;
            case 3:
                shape = store.getState().canvasBoardState.shape;
                if (!shape)
                    return [2 /*return*/];
                if (e.pointer) {
                    shape.set({
                        top: e.pointer.y,
                        left: e.pointer.x,
                        shapeType: 'shape',
                        name: shapeToAdd,
                        strokeUniform: true,
                    });
                    // startPoint = e.pointer;
                    store.dispatch({ type: 'SET_START_POINT', payload: e.pointer });
                }
                canvas === null || canvas === void 0 ? void 0 : canvas.add(shape);
                store.dispatch({ type: 'SET_TRUE' });
                /*
                  Canceling shapes creation in object:scaling
                  and object:rotating events
                */
                canvas === null || canvas === void 0 ? void 0 : canvas.on({
                    'object:scaling': cancelShapeCreation(canvas),
                    'object:rotating': cancelShapeCreation(canvas),
                });
                /*
                  When the shape was resized or rotated
                  the shape's movement is allowed
                */
                canvas === null || canvas === void 0 ? void 0 : canvas.on({
                    'object:scaled': allowMovementInShape,
                    'object:rotated': allowMovementInShape,
                });
                return [2 /*return*/];
        }
    });
}); }; };

var convertSVGPathInPoints = function (path) {
    var _a;
    return (_a = path
        .toSVG()
        .split('"')
        .find(function (element) { return element.startsWith('M'); })) === null || _a === void 0 ? void 0 : _a.split(/ ([MQL] [\d+ .]+)/gm).map(function (element) { return element.trim(); }).map(function (value, index, array) {
        var parts = (value || array[index - 1]).split(' ');
        return {
            x: Number(parts[1]),
            y: Number(parts[2]),
        };
    });
};

/**
 * Creates basePath property in pencil and dashed line styles
 * @param {ICanvasPathBrush} object - Line to set the property.
 */
var setBasePathInNormalBrushes = function (object) {
    var _a;
    // Getting point from SVG data in object
    var points = convertSVGPathInPoints(object);
    // Setting properties of base Path and adding them in current object
    object.set({
        basePath: {
            type: ((_a = object.strokeDashArray) === null || _a === void 0 ? void 0 : _a.length) ? 'dashed' : 'pencil',
            points: points || [],
            stroke: String(object.stroke),
            strokeWidth: Number(object.strokeWidth),
        },
    });
};

/**
 * Sets shape size
 * @param shape Shape
 * @param e fabric event
 * @param perfectShapeIsActive Indicates if perfect shape is enabled
 * @param startPoint Start point coordinates
 * @param shapeToAdd Type of shape to add
 * @param brushType Brush type
 * @param canvas Fabric canvas
 * @param userId User id.
 */
var setShapeSize = function (shape, e, perfectShapeIsActive, startPoint, shapeToAdd, brushType, canvas, userId) {
    var _a, _b, _c, _d;
    if (!e.pointer)
        return;
    var pointer = e.pointer;
    var biggerDifference = 0;
    var newSize;
    if (perfectShapeIsActive) {
        biggerDifference = getBiggerDifference(pointer, startPoint);
        pointer.x = startPoint.x + biggerDifference;
        pointer.y = startPoint.y + biggerDifference;
    }
    else {
        pointer = e.pointer;
    }
    if (shapeToAdd === 'circle') {
        newSize = setCircleSize(shape, startPoint, pointer, brushType === 'pencil' || brushType === 'dashed');
    }
    else if (shapeToAdd === 'rectangle' || shapeToAdd === 'triangle') {
        newSize = setSize(shape, startPoint, pointer, brushType === 'pencil' || brushType === 'dashed');
    }
    else {
        newSize = setPathSize(shape, startPoint, pointer);
    }
    if (brushType === 'marker' || brushType === 'felt') {
        shape.forEachObject(function (line) {
            line.set({
                top: Number(line.top) / Number(shape.scaleY),
                left: Number(line.left) / Number(shape.scaleX),
            });
        });
        shape.set({
            top: startPoint.y,
            left: startPoint.x,
        });
        shape.addWithUpdate();
        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
    }
    if (brushType === 'paintbrush' && canvas && userId) {
        var brush = new PaintBrush(canvas, userId);
        var newPoints = ((_a = shape.basePath) === null || _a === void 0 ? void 0 : _a.points).map(function (point) {
            return {
                x: point.x * Number(shape.scaleX),
                y: point.y * Number(shape.scaleY),
            };
        });
        var newPath = brush.modifyPaintBrushPath(String(shape.id), newPoints, Number((_b = shape.basePath) === null || _b === void 0 ? void 0 : _b.strokeWidth), String((_c = shape.basePath) === null || _c === void 0 ? void 0 : _c.stroke), ((_d = shape.basePath) === null || _d === void 0 ? void 0 : _d.bristles) || []);
        newPath.set({
            top: startPoint.y,
            left: startPoint.x,
        });
        shape.set(__assign({}, newPath));
        shape.addWithUpdate();
        canvas.renderAll();
    }
    return newSize;
};

var requiredPencilDashedProps = [
    'id',
    'height',
    'width',
    'left',
    'top',
    'scaleX',
    'scaleY',
    'originX',
    'originY',
    'basePath',
];
var requiredProps = [
    'id',
    'height',
    'width',
    'left',
    'top',
    'strokeWidth',
    'stroke',
    'fill',
    'name',
    'scaleX',
    'scaleY',
    'strokeUniform',
    'originX',
    'originY',
    'strokeMiterLimit',
    'strokeLineJoin',
    'strokeDashArray',
    'strokeLineCap',
    'strokeLineJoin',
];
var requiredEllipseProps = [
    'id',
    'ry',
    'rx',
    'left',
    'top',
    'strokeWidth',
    'stroke',
    'fill',
    'strokeUniform',
    'originY',
    'originX',
    'strokeDashArray',
    'strokeLineCap',
    'strokeLineJoin',
];

/**
 * Mouse up event handler
 * @param canvas Fabric canvas
 * @param userId User ID
 * @param perfectShapeIsActive Indicates if perfect shape is active
 * @param shapeToAdd Shape to add
 * @param brushType Brush type
 * @param lineWidth Line width
 * @param penColor Pen, brush, or stroke color
 * @param setShapeInProgress Method to set shape in progress
 * @param eventSerializer Paint event serializer
 * @param dispatch Dispatch method for undo redo state.
 */
var mouseUpAction = function (canvas, userId, perfectShapeIsActive, shapeToAdd, brushType, lineWidth, penColor, setShapeInProgress, eventSerializer, dispatch) { return (function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var shape, startPoint, size, id, brush_1, newPath_1, shapeName, setScaledPoint_1, original_1, points, _a, _b, min_1, max_1, penPoints, bristles, clearRects, type, payload, target_1, requiredProps_1, event_1, type, payload, target_2, event_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                shape = store.getState().canvasBoardState.shape;
                if (!shape || !store.getState().canvasBoardState.resize) {
                    return [2 /*return*/];
                }
                startPoint = store.getState().canvasBoardState.startPoint;
                size = setShapeSize(shape, e, perfectShapeIsActive, startPoint, shapeToAdd, brushType, canvas, userId);
                id = userId + ":" + uuid.v4();
                store.dispatch({ type: 'SET_FALSE' });
                if (!(size && size.width <= 2 && size.height <= 2)) return [3 /*break*/, 1];
                canvas.remove(shape);
                return [3 /*break*/, 10];
            case 1:
                if (!(brushType === 'pencil' || brushType === 'dashed')) return [3 /*break*/, 2];
                shape.set({ id: id });
                shape.setCoords();
                /*
                Setting the recent created shape like evented
                to can be resized and rotated
                */
                shape.set({
                    strokeDashArray: brushType === 'dashed' ? [Number(shape.strokeWidth) * 2] : [],
                    evented: true,
                    hoverCursor: 'default',
                    lockUniScaling: perfectShapeIsActive,
                });
                setBasePathInNormalBrushes(shape);
                canvas.setActiveObject(shape);
                canvas.renderAll();
                return [3 /*break*/, 9];
            case 2:
                canvas.remove(shape);
                if (!userId) return [3 /*break*/, 9];
                shapeName = String(shape.name);
                setScaledPoint_1 = function (point) {
                    return {
                        x: (point.x * Number(shape.width) * Number(shape.scaleX)) /
                            original_1.width,
                        y: (point.y * Number(shape.height) * Number(shape.scaleY)) /
                            original_1.height,
                    };
                };
                original_1 = shapePoints[shapeName];
                points = original_1.points.map(function (point) {
                    return setScaledPoint_1(point);
                });
                _a = brushType;
                switch (_a) {
                    case 'pen': return [3 /*break*/, 3];
                    case 'marker': return [3 /*break*/, 4];
                    case 'felt': return [3 /*break*/, 4];
                    case 'paintbrush': return [3 /*break*/, 5];
                    case 'chalk': return [3 /*break*/, 6];
                    case 'crayon': return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 3:
                brush_1 = new PenBrush(canvas, userId);
                _b = brush_1.setMinMaxWidth(lineWidth), min_1 = _b.min, max_1 = _b.max;
                penPoints = points.map(function (point) {
                    return {
                        x: point.x,
                        y: point.y,
                        width: brush_1.getRandomInt(min_1, max_1),
                    };
                });
                newPath_1 = brush_1.createPenPath(String(shape.id), penPoints, lineWidth, penColor);
                return [3 /*break*/, 8];
            case 4:
                brush_1 = new MarkerBrush(canvas, userId, brushType);
                newPath_1 = brush_1.createMarkerPath(String(shape.id), points, lineWidth, penColor);
                return [3 /*break*/, 8];
            case 5:
                brush_1 = new PaintBrush(canvas, userId);
                bristles = brush_1.makeBrush(penColor, lineWidth);
                newPath_1 = brush_1.modifyPaintBrushPath(String(shape.id), points, lineWidth, penColor, bristles);
                return [3 /*break*/, 8];
            case 6:
                brush_1 = new ChalkBrush(canvas, userId, brushType);
                clearRects = brush_1.createChalkEffect(points, lineWidth);
                return [4 /*yield*/, brush_1
                        .createChalkPath(String(shape.id), points, lineWidth, penColor, clearRects)
                        .then(function (image) {
                        newPath_1 = image;
                    })
                        .catch(function (error) {
                        console.warn(error);
                    })];
            case 7:
                _c.sent();
                return [3 /*break*/, 8];
            case 8:
                if (!newPath_1)
                    return [2 /*return*/];
                newPath_1.set({
                    id: id,
                    name: shapeName,
                    top: shape.top,
                    left: shape.left,
                    angle: shape.angle,
                    flipX: shape.flipX,
                    flipY: shape.flipY,
                    originX: shape.originX,
                    originY: shape.originY,
                    evented: true,
                    hoverCursor: 'default',
                    lockUniScaling: perfectShapeIsActive,
                });
                canvas.remove(shape);
                shape = newPath_1;
                canvas.add(newPath_1);
                canvas.setActiveObject(newPath_1);
                canvas.renderAll();
                _c.label = 9;
            case 9:
                setShapeInProgress(null);
                if (brushType !== 'pencil' && brushType !== 'dashed') {
                    type = shape.type;
                    payload = {};
                    target_1 = {
                        type: type,
                        id: id,
                    };
                    requiredProps_1 = requiredPencilDashedProps;
                    requiredProps_1.forEach(function (prop) {
                        var _a;
                        if (shape && shape[prop]) {
                            target_1 = __assign(__assign({}, target_1), (_a = {}, _a[prop] = shape[prop], _a));
                        }
                    });
                    payload = {
                        type: type,
                        target: target_1,
                        id: id,
                    };
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload);
                    event_1 = {
                        event: payload,
                        type: 'added',
                    };
                    dispatch({
                        type: SET,
                        payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                        canvasId: userId,
                        event: event_1,
                    });
                }
                else {
                    type = shape.type;
                    payload = {};
                    target_2 = {
                        type: type,
                        id: id,
                    };
                    if (type !== 'ellipse') {
                        requiredProps.forEach(function (prop) {
                            var _a;
                            if (shape && shape[prop]) {
                                target_2 = __assign(__assign({}, target_2), (_a = {}, _a[prop] = shape[prop], _a));
                            }
                        });
                        payload = {
                            type: type,
                            target: target_2,
                            id: id,
                        };
                    }
                    else {
                        requiredEllipseProps.forEach(function (prop) {
                            var _a;
                            if (shape && shape[prop]) {
                                target_2 = __assign(__assign({}, target_2), (_a = {}, _a[prop] = shape[prop], _a));
                            }
                        });
                        payload = {
                            type: type,
                            target: target_2,
                            id: id,
                        };
                    }
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload);
                    event_2 = { event: payload, type: 'added' };
                    dispatch({
                        type: SET,
                        payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                        canvasId: userId,
                        event: event_2,
                    });
                }
                store.dispatch({ type: 'SET_SHAPE_NULL' });
                _c.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}); }); };

/**
 * Mouse move handler
 * @param canvas Fabric canvas
 * @param userId User ID
 * @param perfectShapeIsActive Indicates if perfect shape is active
 * @param shapeToAdd Indicates shape to add
 * @param brushType Brush type
 * @param setShapeInProgress Method to set shape in progress
 * @param eventSerializer Paint event serializer
 */
var mouseMoveAction = function (canvas, userId, perfectShapeIsActive, shapeToAdd, brushType, setShapeInProgress, eventSerializer) { return function (e) {
    var shape = store.getState().canvasBoardState.shape;
    if (!shapeToAdd || !shape || !store.getState().canvasBoardState.resize) {
        return;
    }
    canvas.selection = false;
    var startPoint = store.getState().canvasBoardState.startPoint;
    setShapeSize(shape, e, perfectShapeIsActive, startPoint, shapeToAdd, brushType, canvas, userId);
    var anchor = __assign(__assign({}, startPoint), { originX: 'left', originY: 'top' });
    if (startPoint && e.pointer && startPoint.x > e.pointer.x) {
        anchor = __assign(__assign({}, anchor), { originX: 'right' });
    }
    if (startPoint && e.pointer && startPoint.y > e.pointer.y) {
        anchor = __assign(__assign({}, anchor), { originY: 'bottom' });
    }
    shape.set(anchor);
    canvas.renderAll();
    setShapeInProgress({
        shape: shape,
        startPoint: startPoint,
    });
    var type = shape.type;
    var target = {
        type: shape.name,
        shape: shape,
    };
    var payload = {
        type: type,
        target: target,
        id: userId,
    };
    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('moving', payload);
}; };

/**
 * Logic for change line color in special brushes
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that is drawing
 * @param {ICanvasBrush} object - Path to change color
 * @param {string} color - New color to set in path
 */
var changeLineColorInSpecialBrushes = function (canvas, userId, object, color) { return __awaiter(void 0, void 0, void 0, function () {
    var brush, basePath, brushType, _a, newBrush_1, newClearRects;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                basePath = object.basePath;
                brushType = (_b = object.basePath) === null || _b === void 0 ? void 0 : _b.type;
                _a = brushType;
                switch (_a) {
                    case 'paintbrush': return [3 /*break*/, 1];
                    case 'chalk': return [3 /*break*/, 2];
                    case 'crayon': return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 1:
                brush = new PaintBrush(canvas, userId);
                newBrush_1 = brush.makeBrush(color, Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth));
                object._objects.forEach(function (line, index) {
                    line.set({
                        stroke: newBrush_1[index].color,
                        shadow: new fabric.fabric.Shadow({
                            affectStroke: true,
                            nonScaling: true,
                            color: color,
                            blur: Number(line.strokeWidth) / 2,
                        }),
                    });
                });
                object.set({
                    basePath: {
                        type: (basePath === null || basePath === void 0 ? void 0 : basePath.type) || 'pen',
                        points: (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [],
                        stroke: color,
                        strokeWidth: Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth),
                        bristles: newBrush_1,
                    },
                });
                return [3 /*break*/, 5];
            case 2:
                brush = new ChalkBrush(canvas, userId, brushType);
                newClearRects = brush.createChalkEffect((basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth));
                return [4 /*yield*/, brush
                        .createChalkPath(String(object.id), (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), color, newClearRects)
                        .then(function (newObject) {
                        var id = object.id;
                        newObject.set({
                            angle: object.angle,
                            top: object.top,
                            left: object.left,
                            flipX: object.flipX,
                            flipY: object.flipY,
                        });
                        // Id's are deleted to avoid add and remove event serializing
                        delete object.id;
                        delete newObject.id;
                        canvas.remove(object);
                        canvas.add(newObject);
                        canvas.setActiveObject(newObject);
                        canvas.renderAll();
                        object = newObject;
                        // Id is resetted to could synchronize object
                        object.set({
                            id: id,
                        });
                    })];
            case 3:
                _d.sent();
                return [3 /*break*/, 5];
            case 4:
                (_c = object._objects) === null || _c === void 0 ? void 0 : _c.forEach(function (line) {
                    line.set('stroke', color);
                });
                object.set({
                    basePath: {
                        type: brushType || 'pen',
                        points: (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [],
                        stroke: color,
                        strokeWidth: Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth),
                    },
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, object];
        }
    });
}); };

/**
 * Changes the penColor value and if one or more objects are selected
 * also changes the stroke color in free drawing and empty shape objects
 * @param canvas Fabric canvas
 * @param userId User ID
 * @param eventSerializer Paint event serializer
 * @param updatePenColor Update pen color method
 * @param dispatch Dispatch
 * @param changePenColorSync Change pen color method.
 */
var useChangeStrokeColor = function (canvas, userId, eventSerializer, updatePenColor, dispatch, changePenColorSync) {
    return React.useCallback(function (color) {
        /**
         * Changes stroke color in current active objects
         */
        var changeColor = function () { return __awaiter(void 0, void 0, void 0, function () {
            var newActives, activeObjects, selection, _i, activeObjects_1, object, basePath, activesGroup, obj, type, stroke, payload, event_1, activeIds, payload, event_2, filtered, active;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        newActives = [];
                        activeObjects = [];
                        if (!canvas)
                            return [2 /*return*/];
                        selection = canvas.getActiveObject();
                        if ((selection === null || selection === void 0 ? void 0 : selection.type) === 'activeSelection') {
                            activeObjects = selection._objects;
                        }
                        else {
                            activeObjects = canvas.getActiveObjects();
                        }
                        if (!activeObjects)
                            return [2 /*return*/];
                        canvas.discardActiveObject();
                        _i = 0, activeObjects_1 = activeObjects;
                        _b.label = 1;
                    case 1:
                        if (!(_i < activeObjects_1.length)) return [3 /*break*/, 4];
                        object = activeObjects_1[_i];
                        if (((isShape(object) && object.shapeType === 'shape') ||
                            isFreeDrawing(object)) &&
                            color !== object.stroke) {
                            object.set('stroke', color);
                            newActives.push(object);
                            changePenColorSync(object);
                        }
                        // Updating basePath
                        if (isFreeDrawing(object)) {
                            basePath = object.basePath;
                            object.set({
                                basePath: {
                                    type: basePath === null || basePath === void 0 ? void 0 : basePath.type,
                                    points: basePath === null || basePath === void 0 ? void 0 : basePath.points,
                                    stroke: color,
                                    strokeWidth: basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth,
                                },
                            });
                        }
                        if (!(((object.type === 'group' && object.basePath) ||
                            (object.type === 'image' && object.basePath)) &&
                            canvas &&
                            userId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, changeLineColorInSpecialBrushes(canvas, userId, object, color)
                                .then(function (newObject) {
                                var basePath = newObject.basePath;
                                var payload = {
                                    type: (basePath === null || basePath === void 0 ? void 0 : basePath.type) === 'chalk' || (basePath === null || basePath === void 0 ? void 0 : basePath.type) === 'crayon'
                                        ? 'image'
                                        : 'group',
                                    target: {
                                        stroke: basePath === null || basePath === void 0 ? void 0 : basePath.stroke,
                                        bristles: basePath === null || basePath === void 0 ? void 0 : basePath.bristles,
                                    },
                                    id: String(newObject.id),
                                };
                                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('colorChanged', payload);
                                newActives.push(newObject);
                            })
                                .catch(function (e) {
                                console.warn(e);
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (newActives.length === 1) {
                            canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(newActives[0]);
                        }
                        else if (newActives.length >= 2) {
                            activesGroup = new fabric.fabric.ActiveSelection(newActives);
                            canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(activesGroup);
                        }
                        updatePenColor(color);
                        obj = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
                        if (!obj)
                            return [2 /*return*/];
                        type = obj === null || obj === void 0 ? void 0 : obj.get('type');
                        if (type === 'textbox')
                            return [2 /*return*/];
                        if ((obj === null || obj === void 0 ? void 0 : obj.type) !== 'activeSelection') {
                            stroke = type === 'path' ? obj === null || obj === void 0 ? void 0 : obj.stroke : (_a = obj === null || obj === void 0 ? void 0 : obj.basePath) === null || _a === void 0 ? void 0 : _a.stroke;
                            payload = {
                                type: type,
                                target: { stroke: stroke },
                                id: obj === null || obj === void 0 ? void 0 : obj.id,
                            };
                            event_1 = { event: payload, type: 'colorChanged' };
                            dispatch({
                                type: SET,
                                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                                canvasId: userId,
                                event: event_1,
                            });
                        }
                        else {
                            activeIds = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject().getObjects().map(function (o) { return o.id; });
                            payload = {
                                type: type,
                                svg: true,
                                target: null,
                                id: userId + ":group",
                            };
                            event_2 = { event: payload, type: 'activeSelection', activeIds: activeIds };
                            filtered = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) {
                                return !o.group;
                            });
                            active = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
                            active === null || active === void 0 ? void 0 : active.set({ id: userId + ":group" });
                            dispatch({
                                type: SET_GROUP,
                                payload: __spreadArrays(filtered, [active]),
                                canvasId: userId,
                                event: event_2,
                            });
                        }
                        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                        return [2 /*return*/];
                }
            });
        }); };
        changeColor();
    }, 
    // If changePenColorSync is added performance is affected
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canvas, updatePenColor, userId, eventSerializer, dispatch]);
};
/**
 * Updates text color.
 * @param canvas Fabric canvas
 * @param userId User id
 * @param updateFontColor updates font color method
 * @param eventSerializer Paint event serializer
 * @param dispatch Undo redo dispatch method.
 */
var useTextColor = function (canvas, userId, updateFontColor, eventSerializer, dispatch) {
    return React.useCallback(function (color) {
        updateFontColor(color);
        if ((canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject()) &&
            canvas.getActiveObject().text) {
            canvas.getActiveObject().set('fill', color);
            canvas.renderAll();
            var object = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
            if (!object.isEditing) {
                var payload = {
                    type: 'textbox',
                    target: { fill: color },
                    id: object.id,
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('fontColorChanged', payload);
                var event_3 = { event: payload, type: 'colorChanged' };
                dispatch({
                    type: SET,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                    event: event_3,
                });
            }
            return;
        }
        canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects().forEach(function (obj) {
            if (obj.id) {
                var type = obj.get('type');
                if (type === 'textbox') {
                    var target = function (type) {
                        if (type === 'textbox') {
                            return {
                                fill: color,
                            };
                        }
                    };
                    obj.set({
                        fill: color,
                    });
                    var payload = {
                        type: type,
                        target: target(type),
                        id: obj.id,
                    };
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('fontColorChanged', payload);
                }
            }
        });
    }, [updateFontColor, canvas, eventSerializer, dispatch, userId]);
};

var findLocalObjects = function (userId, objects) { return (objects.filter(function (o) { var _a; return (((_a = o.id) === null || _a === void 0 ? void 0 : _a.split(':')[0]) === userId); })); };
var isLocalObject$1 = function (objectId, userId) { return (objectId.split(':')[0] === userId); };

/**
 * Creates the listeners to erase objects from the whiteboard
 * @param canvas fabric canvas
 * @param userId user id
 * @param canvasId canvas id
 */
var useEraseObject = function (canvas, userId, canvasId) { return (React.useCallback(function () {
    var eraser = false;
    var activeObjects = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects();
    canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (object) {
        if ((object.id && isLocalObject$1(object.id, userId)) ||
            !object.id) {
            object.set({
                evented: true,
                hoverCursor: "url(\"" + img$4 + "\"), auto",
                lockMovementX: true,
                lockMovementY: true,
            });
        }
        else if (object.id) {
            object.set({
                hoverCursor: 'default',
            });
        }
    });
    if ((activeObjects === null || activeObjects === void 0 ? void 0 : activeObjects.length) && activeObjects.length > 1) {
        canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject().set({
            hoverCursor: "url(\"" + img$4 + "\"), auto",
        });
    }
    var mouseDown = function (e) {
        var _a;
        if (eraser) {
            return;
        }
        canvas.defaultCursor = "url(\"" + img$4 + "\"), auto";
        eraser = true;
        // if the click is made over an object
        if (e.target &&
            (!e.target._objects ||
                (e.target._objects && e.target.basePath)) &&
            ((e.target.id && isLocalObject$1(e.target.id, userId)) ||
                !e.target.id)) {
            canvas.remove(e.target);
            canvas.renderAll();
        }
        // if the click is made over an object group
        if ((_a = e.target) === null || _a === void 0 ? void 0 : _a._objects) {
            e.target._objects.forEach(function (object) {
                canvas.remove(object);
            });
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    };
    var mouseOver = function (e) {
        if (!eraser) {
            return false;
        }
        if ((e.target &&
            e.target.id &&
            isLocalObject$1(e.target.id, userId)) ||
            (e.target && !e.target.id)) {
            canvas.remove(e.target);
            canvas.renderAll();
        }
    };
    var mouseUp = function () {
        if (!eraser) {
            return false;
        }
        canvas.defaultCursor = 'default';
        eraser = false;
    };
    // When mouse down eraser is able to remove objects
    canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:down', mouseDown);
    // When mouse is over an object
    canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:over', mouseOver);
    // When mouse up eraser is unable to remove objects
    canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:up', mouseUp);
    // If isLocalObject is added in dependencies an infinity loop happens
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [canvas, canvasId, userId])); };

/**
 *
 * @param canvas Canvas
 * @param userId user Id
 * @param isCursorObject Function to know which is a cursor and which isn't
 * @param closeModal Close modal method
 * @param dispatch Dispatch method
 * @param isLocalObject Method to check if object is local
 * @param allToolbarIsEnabled Indicates if all toolbar tools are enabled
 * @param localImage Image to display as background or cavnas
 * @param eventSerializer Paint event serializer
 * @param updateClearIsActive Method to activate clear canvas functionality
 * @param canvasId Canvas ID
 * @param backgroundImage background image
 */
var useClearWhiteboardSelf = function (canvas, userId, isCursorObject, closeModal, dispatch, isLocalObject, allToolbarIsEnabled, localImage, eventSerializer, updateClearIsActive, canvasId, backgroundImage) {
    return React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var toolbarIsEnabled, serializerToolbarState, teacherHasPermission, studentHasPermission, target, target, event_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    toolbarIsEnabled = getToolbarIsEnabled();
                    serializerToolbarState = store.getState()
                        .permissionsState;
                    teacherHasPermission = allToolbarIsEnabled;
                    studentHasPermission = toolbarIsEnabled && serializerToolbarState.clearWhiteboard;
                    if (!(teacherHasPermission || studentHasPermission)) return [3 /*break*/, 4];
                    if (typeof localImage === 'string' && localImage.length) {
                        target = {
                            id: '',
                            target: {
                                strategy: 'allowClearMyself',
                                isLocalImage: true,
                            },
                        };
                        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', target);
                    }
                    return [4 /*yield*/, updateClearIsActive(true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (obj) {
                            if (obj.id &&
                                isLocalObject(obj.id, userId) &&
                                !isCursorObject(obj) &&
                                !obj.stampObject) {
                                var target = {
                                    id: obj.id,
                                    target: {
                                        strategy: 'allowClearMyself',
                                    },
                                };
                                obj.set({ groupClear: true });
                                canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', target);
                            }
                        }))];
                case 2:
                    _a.sent();
                    if (canvas === null || canvas === void 0 ? void 0 : canvas.backgroundImage) {
                        target = {
                            // @ts-ignore
                            id: canvas.backgroundImage.id,
                            target: {
                                strategy: 'allowClearMyself',
                                isBackgroundImage: true,
                            },
                        };
                        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', target);
                        // In order to remove background you need to add 0 to the first argument.
                        // An empty string unfortunately doesnt work.
                        // https://stackoverflow.com/a/14171884
                        // @ts-ignore
                        canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
                    }
                    closeModal();
                    event_1 = {
                        event: { id: userId + ":clearWhiteboard" },
                        type: 'clearedWhiteboard',
                    };
                    // Add cleared whiteboard to undo / redo state.
                    dispatch({
                        type: SET,
                        payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                        canvasId: userId,
                        event: event_1,
                    });
                    return [4 /*yield*/, updateClearIsActive(false)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); }, [
        allToolbarIsEnabled,
        localImage,
        updateClearIsActive,
        canvas,
        closeModal,
        userId,
        dispatch,
        eventSerializer,
        isCursorObject,
    ]);
};
/**
 * Method to clear other clearboards besides teacher
 * @param canvas Fabric canvas
 * @param isCursorObject Function to know which is a cursor and which isn't
 * @param updateClearIsActive Updates clear is active
 * @param eventSerializer Pain event serializer
 */
var useClearWhiteboardOthers = function (canvas, isCursorObject, updateClearIsActive, eventSerializer) {
    /**
     * Clears all whiteboard with allowClearOthers strategy
     * */
    return React.useCallback(function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateClearIsActive(true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (obj) {
                            if (obj.id) {
                                var object = obj.id.split(':');
                                if (!object.length) {
                                    throw new Error('Invalid ID');
                                }
                                if (object[0] === userId &&
                                    !isCursorObject(obj) &&
                                    !obj.stampObject) {
                                    canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                                }
                                var target = {
                                    id: obj.id,
                                    target: {
                                        strategy: 'allowClearOthers',
                                        userId: userId,
                                    },
                                };
                                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', target);
                            }
                        }))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, updateClearIsActive(false)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [canvas, eventSerializer, isCursorObject, updateClearIsActive]);
};
var useClearWhiteboardClearAll = function (canvas, userId, isCursorObject, updateClearIsActive, eventSerializer, dispatch) {
    return React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var target, event;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateClearIsActive(true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (obj) {
                            if (obj.id && !isCursorObject(obj) && !obj.stampObject) {
                                obj.set({ groupClear: true });
                                canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                            }
                        }))];
                case 2:
                    _a.sent();
                    target = {
                        target: {
                            strategy: 'allowClearAll',
                        },
                    };
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', target);
                    event = {
                        event: { id: userId + ":clearWhiteboard" },
                        type: 'clearedWhiteboard',
                    };
                    // Add cleared whiteboard to undo / redo state.
                    dispatch({
                        type: SET,
                        payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                        canvasId: userId,
                        event: event,
                    });
                    return [4 /*yield*/, updateClearIsActive(false)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [
        updateClearIsActive,
        canvas,
        eventSerializer,
        userId,
        dispatch,
        isCursorObject,
    ]);
};

var useCanvasActions = function (canvas, dispatch, canvasId, eventSerializer, userId, ignoreDirectActions) {
    var _a = React.useContext(WhiteboardContext), shapeIsActive = _a.shapeIsActive, updateFontColor = _a.updateFontColor, shape = _a.shape, shapeColor = _a.shapeColor, updatePenColor = _a.updatePenColor, updateShapeColor = _a.updateShapeColor, updateBrushType = _a.updateBrushType, closeModal = _a.closeModal, penColor = _a.penColor, lineWidth = _a.lineWidth, isLocalObject = _a.isLocalObject, updateClearIsActive = _a.updateClearIsActive, allToolbarIsEnabled = _a.allToolbarIsEnabled, perfectShapeIsActive = _a.perfectShapeIsActive, partialEraseIsActive = _a.partialEraseIsActive, eraseType = _a.eraseType, localImage = _a.localImage, brushType = _a.brushType, eraserIsActive = _a.eraserIsActive, updateBackgroundColor = _a.updateBackgroundColor, setLocalBackground = _a.setLocalBackground; _a.backgroundImage; var setIsBackgroundImage = _a.setIsBackgroundImage, setBackgroundImageIsPartialErasable = _a.setBackgroundImageIsPartialErasable, setLocalImage = _a.setLocalImage, setBackgroundImage = _a.setBackgroundImage;
    var changePenColorSync = useSynchronization(userId).changePenColorSync;
    /**
     * Adds shape to whiteboard.
     * @param specific Indicates shape type that should be added in whiteboard.
     */
    var shapeSelector = useShapeSelector({
        brushType: brushType,
        lineWidth: lineWidth,
        penColor: penColor,
        shape: shape,
        shapeColor: shapeColor,
    });
    /**
     * Adds shape with special brush to whiteboard.
     * @param {string} shape - Indicates shape type that should be added in whiteboard.
     * @param {IBrushType} brushType - Indicates brush type that sould be drawed the given shape.
     */
    var specialShapeSelector = useSpecialShapeSelector(userId);
    /**
     * Changes backgroundColor property
     * and makes the necessary changes to paint the current whiteboard
     * @param {string} color - Color to paint the background
     */
    var setBackgroundColorInCanvas = React.useCallback(function (color) {
        updateBackgroundColor(color);
        setLocalBackground(true);
        setIsBackgroundImage(false);
        setBackgroundImageIsPartialErasable(false);
        setLocalImage('');
        setBackgroundImage('');
        canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
        // @ts-ignore
        canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
    }, [
        canvas,
        setBackgroundImage,
        setBackgroundImageIsPartialErasable,
        setIsBackgroundImage,
        setLocalBackground,
        setLocalImage,
        updateBackgroundColor,
    ]);
    /**
     * Add specific color to the whiteboard background
     * @param {string} color - color to set
     */
    var fillBackgroundColor = React.useCallback(function (color) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, event;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, setBackgroundColorInCanvas(color)];
                case 1:
                    _a.sent();
                    payload = {
                        id: userId,
                        target: color,
                    };
                    event = {
                        event: {
                            id: userId,
                            color: color,
                        },
                        type: 'backgroundColorChanged',
                    };
                    dispatch({
                        type: SET,
                        payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                        canvasId: userId,
                        event: event,
                    });
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('backgroundColorChanged', payload);
                    return [2 /*return*/];
            }
        });
    }); }, [canvas, dispatch, eventSerializer, setBackgroundColorInCanvas, userId]);
    /**
     *
     * @param shape Shape that was added to canvas.
     * @param coordsStart Coordinates of initial click on canvas.
     * @param isCircle Indicates if shape added is a circle.
     */
    var mouseMove = useMouseMove();
    /**
     * Mouse up event handlers for cavnas
     */
    var mouseUp = useMouseUp(dispatch);
    /**
     * Clear mouse event handlers for cavnas
     */
    var clearOnMouseEvent = React.useCallback(function (click) {
        if (click) {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down', click);
        }
        else {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down');
        }
    }, [canvas]);
    /**
     * Clears all mouse event listeners from canvas.
     */
    var clearMouseEvents = React.useCallback(function () {
        canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:move');
        canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:up');
    }, [canvas]);
    /**
     * Mouse down event listener for canvas.
     * @param shape Shape being added on canvas.
     * @param isCircle Indicates if shape is a circle.
     */
    var mouseDown = useMouseDown(canvas, shapeSelector, clearOnMouseEvent, mouseMove, mouseUp, brushType, shapeColor);
    /**
     * Used to save the current shape in case of an interruption
     * in its creation, generated by a state change in perfectShapeIsActive
     */
    var _b = React.useState(), shapeInProgress = _b[0], setShapeInProgress = _b[1];
    /**
     * Add specific shape to whiteboard
     * */
    var addShape = React.useCallback(function (shapeToAdd) {
        // Required to prevent multiple shapes add at once
        // if user clicked more than one shape during selection.
        if (!shapeIsActive) {
            return;
        }
        // If shape creation was interrupted by a change in perfectShapeIsActive
        if (shapeInProgress) {
            var startPoint = shapeInProgress.startPoint;
            store.dispatch({ type: 'SET_TRUE' });
            store.dispatch({ type: 'SET_START_POINT', payload: startPoint });
        }
        var activeObject = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
        if (activeObject && isShape(activeObject)) {
            activeObject.set('evented', true);
        }
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:down', mouseDownAction(canvas, brushType, shapeSelector, shapeToAdd, specialShapeSelector, lineWidth, penColor));
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:move', mouseMoveAction(canvas, userId, perfectShapeIsActive, shapeToAdd, brushType, setShapeInProgress, eventSerializer));
        canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:up', mouseUpAction(canvas, userId, perfectShapeIsActive, shapeToAdd, brushType, lineWidth, penColor, setShapeInProgress, eventSerializer, dispatch));
    }, 
    /* If dataInProgress is added on dependencies
    the performance is bad and an unexpected behavior occurs */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        shapeIsActive,
        canvas,
        perfectShapeIsActive,
        shapeSelector,
        userId,
        eventSerializer,
        dispatch,
    ]);
    /**
     * Changes the penColor value and if one or more objects are selected
     * also changes the stroke color in free drawing and empty shape objects
     * @param {string} color - new color to change
     */
    var changeStrokeColor = useChangeStrokeColor(canvas, userId, eventSerializer, updatePenColor, dispatch, changePenColorSync);
    /**
     * Changes brush type for shapes and
     */
    var changeBrushType = React.useCallback(function (type) {
        changeBrushTypeAction(canvas, userId, eventSerializer, updateBrushType, type, dispatch);
    }, [canvas, dispatch, eventSerializer, updateBrushType, userId]);
    /**
     * Add specific color to selected shape
     * */
    var fillColor = React.useCallback(function (color) {
        updateShapeColor(color);
        clearOnMouseEvent();
        clearMouseEvents();
        mouseDown(shape, color);
        if ((canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject()) &&
            canvas.getActiveObject().fill !== 'transparent') {
            canvas.getActiveObject().set('fill', color);
            canvas.renderAll();
            // TODO: Handle Undo/Redo dispatch.
            dispatch({ type: SET, payload: canvas.getObjects() });
        }
    }, [
        canvas,
        clearMouseEvents,
        clearOnMouseEvent,
        mouseDown,
        shape,
        updateShapeColor,
        dispatch,
    ]);
    /**
     * Add specific color to selected text or group of texts
     * @param {string} color - color to set
     */
    var textColor = useTextColor(canvas, userId, updateFontColor, eventSerializer, dispatch);
    /**
     * Set the given visibility in all the controls in the given object.
     * @param {ICanvasObject} object - Object to set controls visibility.
     * @param {boolean} visibility - Visibility state.
     */
    var setObjectControlsVisibility = React.useCallback(function (object, visibility) {
        object.setControlsVisibility({
            bl: visibility,
            br: visibility,
            mb: visibility,
            ml: visibility,
            mr: visibility,
            mt: visibility,
            tl: visibility,
            tr: visibility,
            mtr: visibility,
        });
    }, []);
    // Flood-fill Feature or maybe could be in CanvasActions.tsx
    /**
     * Reorder the current shapes letting the shapes over their container shape
     */
    var reorderShapes = React.useCallback(function () {
        var temporal;
        var actualIndex;
        var compareIndex;
        var getObjectIndex = function (object, canvas) {
            return canvas.getObjects().indexOf(object);
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (actual) {
            canvas.forEachObject(function (compare) {
                actualIndex = getObjectIndex(actual, canvas);
                compareIndex = getObjectIndex(compare, canvas);
                if (actual.isContainedWithinObject(compare) &&
                    actualIndex < compareIndex) {
                    temporal = getObjectIndex(actual, canvas);
                    actual.moveTo(compareIndex);
                    compare.moveTo(temporal);
                }
            });
        });
    }, [canvas]);
    /**
     * Finds in the current canvas an object with the given id and returns it.
     * @param {string} id - Id of the object to find
     */
    var findObjectById = React.useCallback(function (id) {
        return canvas
            .getObjects()
            .find(function (obj) { return obj.id === id; });
    }, [canvas]);
    /**
     * Checks if the given object is a cursor object
     * @param {ICanvasObject} object - Object to check
     */
    var isCursorObject = React.useCallback(function (object) {
        var _a;
        return ((_a = object.id) === null || _a === void 0 ? void 0 : _a.split(':')[1]) === 'cursor';
    }, []);
    /**
     * Clears all whiteboard elements
     * */
    var clearWhiteboardClearAll = useClearWhiteboardClearAll(canvas, userId, isCursorObject, updateClearIsActive, eventSerializer, dispatch);
    /**
     * Clears all whiteboard elements
     * */
    var clearWhiteboardClearMySelf = useClearWhiteboardSelf(canvas, userId, isCursorObject, closeModal, dispatch, isLocalObject, allToolbarIsEnabled, localImage, eventSerializer, updateClearIsActive);
    /**
     * Clears all whiteboard with allowClearOthers strategy
     * */
    var clearWhiteboardAllowClearOthers = useClearWhiteboardOthers(canvas, isCursorObject, updateClearIsActive, eventSerializer);
    /**
     * Set Canvas Whiteboard selection ability
     * @param {boolean} selection - value to set in canvas and objects selection
     */
    var setCanvasSelection = React.useCallback(function (selection) {
        if (canvas) {
            canvas.selection = selection;
            canvas.renderAll();
        }
    }, [canvas]);
    /**
     * Set the cursor to be showed when a object hover happens
     * @param {string} cursor - Cursor name to show
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var setHoverCursorObjects = React.useCallback(function (cursor) {
        if (canvas) {
            canvas.forEachObject(function (object) {
                object.hoverCursor = cursor;
            });
            canvas.renderAll();
        }
    }, [canvas]);
    /**
     * Creates the listeners to erase objects from the whiteboard
     */
    var eraseObject = useEraseObject(canvas, userId, canvasId);
    React.useEffect(function () {
        if (!canvas || ignoreDirectActions) {
            return;
        }
        var toolbarIsEnabled = getToolbarIsEnabled(userId);
        var serializerToolbarState = store.getState()
            .permissionsState;
        var eraser;
        if (eraseType === 'partial' &&
            canvas &&
            toolbarIsEnabled &&
            eraserIsActive &&
            (allToolbarIsEnabled || serializerToolbarState.partialErase)) {
            canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject();
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            eraser = new PartialErase(userId, canvas, lineWidth, img$4, allToolbarIsEnabled, partialEraseIsActive, serializerToolbarState.partialErase, eventSerializer, dispatch);
            eraser.init();
        }
        if (eraseType === 'object' &&
            canvas &&
            toolbarIsEnabled &&
            (allToolbarIsEnabled || serializerToolbarState.erase)) {
            eraseObject();
            if (canvas.getActiveObjects().length === 1) {
                canvas.discardActiveObject().renderAll();
            }
        }
        return function () {
            if (eraser) {
                eraser.destroy();
                eraser = null;
            }
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:up');
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:over');
            canvas === null || canvas === void 0 ? void 0 : canvas.off('path:created');
        };
    }, [
        canvas,
        eraserIsActive,
        eraseType,
        partialEraseIsActive,
        allToolbarIsEnabled,
        userId,
        lineWidth,
        eventSerializer,
        dispatch,
        eraseObject,
    ]);
    /**
     * Deselect the actual selected object
     */
    var discardActiveObject = React.useCallback(function () {
        canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject().renderAll();
    }, [canvas]);
    var undo = React.useCallback(function () {
        var toolbarIsEnabled = getToolbarIsEnabled();
        var serializerToolbarState = store.getState()
            .permissionsState;
        var teacherHasPermission = allToolbarIsEnabled;
        var studentHasPermission = toolbarIsEnabled && serializerToolbarState.undoRedo;
        if (teacherHasPermission || studentHasPermission) {
            dispatch({ type: UNDO, canvasId: canvasId });
        }
    }, [dispatch, canvasId, allToolbarIsEnabled]);
    var redo = React.useCallback(function () {
        var toolbarIsEnabled = getToolbarIsEnabled();
        var serializerToolbarState = store.getState()
            .permissionsState;
        var teacherHasPermission = allToolbarIsEnabled;
        var studentHasPermission = toolbarIsEnabled && serializerToolbarState.undoRedo;
        if (teacherHasPermission || studentHasPermission) {
            dispatch({ type: REDO, canvasId: canvasId });
        }
    }, [dispatch, canvasId, allToolbarIsEnabled]);
    var state = React.useMemo(function () {
        var actions = {
            fillColor: fillColor,
            changeStrokeColor: changeStrokeColor,
            changeBrushType: changeBrushType,
            textColor: textColor,
            clearWhiteboardClearAll: clearWhiteboardClearAll,
            discardActiveObject: discardActiveObject,
            addShape: addShape,
            eraseObject: eraseObject,
            reorderShapes: reorderShapes,
            setCanvasSelection: setCanvasSelection,
            setHoverCursorObjects: setHoverCursorObjects,
            setObjectControlsVisibility: setObjectControlsVisibility,
            undo: undo,
            redo: redo,
            clearWhiteboardAllowClearOthers: clearWhiteboardAllowClearOthers,
            clearWhiteboardClearMySelf: clearWhiteboardClearMySelf,
            fillBackgroundColor: fillBackgroundColor,
            setBackgroundColorInCanvas: setBackgroundColorInCanvas,
            isCursorObject: isCursorObject,
            findObjectById: findObjectById,
        };
        return { actions: actions, mouseDown: mouseDown };
    }, [
        fillColor,
        changeStrokeColor,
        changeBrushType,
        textColor,
        clearWhiteboardClearAll,
        discardActiveObject,
        addShape,
        eraseObject,
        reorderShapes,
        setCanvasSelection,
        setHoverCursorObjects,
        setObjectControlsVisibility,
        undo,
        redo,
        clearWhiteboardAllowClearOthers,
        clearWhiteboardClearMySelf,
        fillBackgroundColor,
        setBackgroundColorInCanvas,
        isCursorObject,
        findObjectById,
        mouseDown,
    ]);
    return state;
};

var PainterEvents = /** @class */ (function () {
    function PainterEvents() {
    }
    PainterEvents.createId = function (canvasId) {
        return canvasId + ":" + uuid.v4();
    };
    PainterEvents.isLocalObject = function (id, canvasId) {
        var object = id.split(':');
        if (!object.length) {
            throw new Error('Invalid ID');
        }
        return object[0] === canvasId;
    };
    PainterEvents.pathCreated = function (target, id, canvasId) {
        if (this.isLocalObject(id, canvasId)) {
            return {
                type: 'path',
                target: target,
                id: id,
            };
        }
    };
    PainterEvents.objectAdded = function (target, id, canvasId) {
        if (this.isLocalObject(id, canvasId)) {
            return {
                type: 'path',
                target: target,
                id: id,
            };
        }
    };
    return PainterEvents;
}());

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var deinterlace_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deinterlace = void 0;

/**
 * Deinterlace function from https://github.com/shachaf/jsgif
 */
var deinterlace = function deinterlace(pixels, width) {
  var newPixels = new Array(pixels.length);
  var rows = pixels.length / width;

  var cpRow = function cpRow(toRow, fromRow) {
    var fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
    newPixels.splice.apply(newPixels, [toRow * width, width].concat(fromPixels));
  }; // See appendix E.


  var offsets = [0, 4, 2, 1];
  var steps = [8, 8, 4, 2];
  var fromRow = 0;

  for (var pass = 0; pass < 4; pass++) {
    for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
      cpRow(toRow, fromRow);
      fromRow++;
    }
  }

  return newPixels;
};

exports.deinterlace = deinterlace;
});

var lzw_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lzw = void 0;

/**
 * javascript port of java LZW decompression
 * Original java author url: https://gist.github.com/devunwired/4479231
 */
var lzw = function lzw(minCodeSize, data, pixelCount) {
  var MAX_STACK_SIZE = 4096;
  var nullCode = -1;
  var npix = pixelCount;
  var available, clear, code_mask, code_size, end_of_information, in_code, old_code, bits, code, i, datum, data_size, first, top, bi, pi;
  var dstPixels = new Array(pixelCount);
  var prefix = new Array(MAX_STACK_SIZE);
  var suffix = new Array(MAX_STACK_SIZE);
  var pixelStack = new Array(MAX_STACK_SIZE + 1); // Initialize GIF data stream decoder.

  data_size = minCodeSize;
  clear = 1 << data_size;
  end_of_information = clear + 1;
  available = clear + 2;
  old_code = nullCode;
  code_size = data_size + 1;
  code_mask = (1 << code_size) - 1;

  for (code = 0; code < clear; code++) {
    prefix[code] = 0;
    suffix[code] = code;
  } // Decode GIF pixel stream.


  var datum, bits, first, top, pi, bi;
  datum = bits = first = top = pi = bi = 0;

  for (i = 0; i < npix;) {
    if (top === 0) {
      if (bits < code_size) {
        // get the next byte
        datum += data[bi] << bits;
        bits += 8;
        bi++;
        continue;
      } // Get the next code.


      code = datum & code_mask;
      datum >>= code_size;
      bits -= code_size; // Interpret the code

      if (code > available || code == end_of_information) {
        break;
      }

      if (code == clear) {
        // Reset decoder.
        code_size = data_size + 1;
        code_mask = (1 << code_size) - 1;
        available = clear + 2;
        old_code = nullCode;
        continue;
      }

      if (old_code == nullCode) {
        pixelStack[top++] = suffix[code];
        old_code = code;
        first = code;
        continue;
      }

      in_code = code;

      if (code == available) {
        pixelStack[top++] = first;
        code = old_code;
      }

      while (code > clear) {
        pixelStack[top++] = suffix[code];
        code = prefix[code];
      }

      first = suffix[code] & 0xff;
      pixelStack[top++] = first; // add a new string to the table, but only if space is available
      // if not, just continue with current table until a clear code is found
      // (deferred clear code implementation as per GIF spec)

      if (available < MAX_STACK_SIZE) {
        prefix[available] = old_code;
        suffix[available] = first;
        available++;

        if ((available & code_mask) === 0 && available < MAX_STACK_SIZE) {
          code_size++;
          code_mask += available;
        }
      }

      old_code = in_code;
    } // Pop a pixel off the pixel stack.


    top--;
    dstPixels[pi++] = pixelStack[top];
    i++;
  }

  for (i = pi; i < npix; i++) {
    dstPixels[i] = 0; // clear missing pixels
  }

  return dstPixels;
};

exports.lzw = lzw;
});

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decompressFrames = exports.decompressFrame = exports.parseGIF = void 0;

var _gif = _interopRequireDefault(require$$0__default['default']);









function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var parseGIF = function parseGIF(arrayBuffer) {
  var byteData = new Uint8Array(arrayBuffer);
  return (0, _jsBinarySchemaParser__default['default'].parse)((0, _uint__default['default'].buildStream)(byteData), _gif["default"]);
};

exports.parseGIF = parseGIF;

var generatePatch = function generatePatch(image) {
  var totalPixels = image.pixels.length;
  var patchData = new Uint8ClampedArray(totalPixels * 4);

  for (var i = 0; i < totalPixels; i++) {
    var pos = i * 4;
    var colorIndex = image.pixels[i];
    var color = image.colorTable[colorIndex];
    patchData[pos] = color[0];
    patchData[pos + 1] = color[1];
    patchData[pos + 2] = color[2];
    patchData[pos + 3] = colorIndex !== image.transparentIndex ? 255 : 0;
  }

  return patchData;
};

var decompressFrame = function decompressFrame(frame, gct, buildImagePatch) {
  if (!frame.image) {
    console.warn('gif frame does not have associated image.');
    return;
  }

  var image = frame.image; // get the number of pixels

  var totalPixels = image.descriptor.width * image.descriptor.height; // do lzw decompression

  var pixels = (0, lzw_1.lzw)(image.data.minCodeSize, image.data.blocks, totalPixels); // deal with interlacing if necessary

  if (image.descriptor.lct.interlaced) {
    pixels = (0, deinterlace_1.deinterlace)(pixels, image.descriptor.width);
  }

  var resultImage = {
    pixels: pixels,
    dims: {
      top: frame.image.descriptor.top,
      left: frame.image.descriptor.left,
      width: frame.image.descriptor.width,
      height: frame.image.descriptor.height
    }
  }; // color table

  if (image.descriptor.lct && image.descriptor.lct.exists) {
    resultImage.colorTable = image.lct;
  } else {
    resultImage.colorTable = gct;
  } // add per frame relevant gce information


  if (frame.gce) {
    resultImage.delay = (frame.gce.delay || 10) * 10; // convert to ms

    resultImage.disposalType = frame.gce.extras.disposal; // transparency

    if (frame.gce.extras.transparentColorGiven) {
      resultImage.transparentIndex = frame.gce.transparentColorIndex;
    }
  } // create canvas usable imagedata if desired


  if (buildImagePatch) {
    resultImage.patch = generatePatch(resultImage);
  }

  return resultImage;
};

exports.decompressFrame = decompressFrame;

var decompressFrames = function decompressFrames(parsedGif, buildImagePatches) {
  return parsedGif.frames.filter(function (f) {
    return f.image;
  }).map(function (f) {
    return decompressFrame(f, parsedGif.gct, buildImagePatches);
  });
};

exports.decompressFrames = decompressFrames;
});

/**
 * Function that converts a valid sprite to render in fabric.js
 * @param {string | input File} gif can be a URL, dataURL or an "input File"
 * @param {number} maxWidth Optional, scale to maximum width
 * @param {number} maxHeight Optional, scale to maximum height
 * @param {number} maxDuration Optional, in milliseconds reduce the gif frames to a maximum duration, ex: 2000 for 2 seconds
 * @returns {*} {error} object if any or a sprite sheet of the converted gif as dataURL
 */
const gifToSprite = async (gif, maxWidth, maxHeight, maxDuration) => {
  let arrayBuffer;
  let error;
  let frames;

  // if the gif is an input file, get the arrayBuffer with FileReader
  if (gif.type) {
    const reader = new FileReader();
    try {
      arrayBuffer = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(gif);
      });
    } catch (err) {
      error = err;
    }
  }
  // else the gif is a URL or a dataUrl, fetch the arrayBuffer
  else {
    try {
      arrayBuffer = await fetch(gif).then((resp) => resp.arrayBuffer());
    } catch (err) {
      error = err;
    }
  }

  // Parse and decompress the gif arrayBuffer to frames with the "gifuct-js" library
  if (!error) frames = lib.decompressFrames(lib.parseGIF(arrayBuffer), true);
  if (!error && (!frames || !frames.length)) error = 'No_frame_error';
  if (error) {
    console.error(error);
    return { error };
  }

  // Create the needed canvass
  const dataCanvas = document.createElement('canvas');
  const dataCtx = dataCanvas.getContext('2d');
  const frameCanvas = document.createElement('canvas');
  const frameCtx = frameCanvas.getContext('2d');
  const spriteCanvas = document.createElement('canvas');
  const spriteCtx = spriteCanvas.getContext('2d');

  // Get the frames dimensions and delay
  let [width, height, delay] = [
    frames[0].dims.width,
    frames[0].dims.height,
    frames.reduce((acc, cur) => (acc = !acc ? cur.delay : acc), null),
  ];

  // Set the Max duration of the gif if any
  // FIXME handle delay for each frame
  const duration = frames.length * delay;
  maxDuration = maxDuration || duration;
  if (duration > maxDuration) frames.splice(Math.ceil(maxDuration / delay));

  // Set the scale ratio if any
  maxWidth = maxWidth || width;
  maxHeight = maxHeight || height;
  const scale = Math.min(maxWidth / width, maxHeight / height);
  width = width * scale;
  height = height * scale;

  //Set the frame and sprite canvass dimensions
  frameCanvas.width = width;
  frameCanvas.height = height;
  spriteCanvas.width = width * frames.length;
  spriteCanvas.height = height;

  frames.forEach((frame, i) => {
    // Get the frame imageData from the "frame.patch"
    const frameImageData = dataCtx.createImageData(
      frame.dims.width,
      frame.dims.height
    );
    frameImageData.data.set(frame.patch);
    dataCanvas.width = frame.dims.width;
    dataCanvas.height = frame.dims.height;
    dataCtx.putImageData(frameImageData, 0, 0);

    // Draw a frame from the imageData
    if (frame.disposalType === 2) frameCtx.clearRect(0, 0, width, height);
    frameCtx.drawImage(
      dataCanvas,
      frame.dims.left * scale,
      frame.dims.top * scale,
      frame.dims.width * scale,
      frame.dims.height * scale
    );

    // Add the frame to the sprite sheet
    spriteCtx.drawImage(frameCanvas, width * i, 0);
  });

  // Get the sprite sheet dataUrl
  const dataUrl = spriteCanvas.toDataURL();

  // Clean the dom, dispose of the unused canvass
  dataCanvas.remove();
  frameCanvas.remove();
  spriteCanvas.remove();

  return {
    dataUrl,
    frameWidth: width,
    framesLength: frames.length,
    delay,
  };
};

const [PLAY, PAUSE, STOP] = [0, 1, 2];

/**
 * Function that generates a valid gif for fabric.js
 * @param {string|File} gif can be a URL, dataURL or an "input File"
 * @param {number} maxWidth Optional, scale to maximum width
 * @param {number} maxHeight Optional, scale to maximum height
 * @param {number} maxDuration Optional, in milliseconds reduce the gif frames to a maximum duration, ex: 2000 for 2 seconds
 * @returns {*} {error} object if any or a 'fabric.image' instance of the gif with new 'play', 'pause', 'stop' methods
 */
const fabricGif = async (gif, maxWidth, maxHeight, maxDuration) => {
  const { error, dataUrl, delay, frameWidth, framesLength } = await gifToSprite(
    gif,
    maxWidth,
    maxHeight,
    maxDuration
  );

  if (error) return { error };

  return new Promise((resolve) => {
    fabric.fabric.Image.fromURL(dataUrl, (img) => {
      const sprite = img.getElement();
      let framesIndex = 0;
      let start = performance.now();
      let status;

      img.width = frameWidth;
      img.height = sprite.naturalHeight;
      img.mode = 'image';
      img.top = 200;
      img.left = 200;

      img._render = function (ctx) {
        if (status === PAUSE || (status === STOP && framesIndex === 0)) return;
        const now = performance.now();
        const delta = now - start;
        if (delta > delay) {
          start = now;
          framesIndex++;
        }
        if (framesIndex === framesLength || status === STOP) framesIndex = 0;
        ctx.drawImage(
          sprite,
          frameWidth * framesIndex,
          0,
          frameWidth,
          sprite.height,
          -this.width / 2,
          -this.height / 2,
          frameWidth,
          sprite.height
        );
      };
      img.play = function () {
        status = PLAY;
        this.dirty = true;
      };
      img.pause = function () {
        status = PAUSE;
        this.dirty = false;
      };
      img.stop = function () {
        status = STOP;
        this.dirty = false;
      };
      img.getStatus = () => ['Playing', 'Paused', 'Stopped'][status];

      img.play();
      resolve(img);
    });
  });
};

var DashedBrush = /** @class */ (function (_super) {
    __extends(DashedBrush, _super);
    /**
     * Class Constructor
     * @param {fabric.Canvas} canvas - Canvas to draw
     * @param {string} userId - User that will draw
     */
    function DashedBrush(canvas, userId) {
        var _this = _super.call(this) || this;
        _this.canvas = canvas;
        _this.userId = userId;
        _this.isDrawing = false;
        _this.points = [];
        _this.currentPath = null;
        return _this;
    }
    /**
     * Creates a new Dashed Brush Path with the given parameters
     * @param {string} id - Id to set in the new path object
     * @param {ICoordinate[]} points - Points to follow
     * and draw the new path object
     * @param {number} width - General width that the draw
     * will have (lineWidth value)
     * @param {string} color - Path Color
     */
    DashedBrush.prototype.createDashedPath = function (id, points, width, color) {
        var dashedPath = new fabric.fabric.Path(_super.prototype.convertPointsToSVGPath.call(this, points.map(function (point) {
            return new fabric.fabric.Point(point.x, point.y);
        }))
            .join(''), {
            fill: 'transparent',
            stroke: color,
            strokeWidth: width,
            strokeLineJoin: 'round',
            strokeLineCap: 'round',
            strokeUniform: true,
            strokeDashArray: [width * 2],
        });
        dashedPath.set({
            id: id,
            basePath: {
                type: 'dashed',
                points: points,
                stroke: color,
                strokeWidth: width,
            },
        });
        return dashedPath;
    };
    /**
     * Mouse Down Event, starts to draw in the canvas
     * @param {ICoordinate} e - Event Coordinate value
     */
    DashedBrush.prototype.onMouseDown = function (e) {
        if (this.isDrawing)
            return;
        this.isDrawing = true;
        this.points.push(e);
    };
    /**
     * Mouse Move Event, detects mouse movement to set the position of each point
     * @param {ICoordinate} e - Event Coordinate value
     */
    DashedBrush.prototype.onMouseMove = function (e) {
        if (!this.isDrawing)
            return;
        this.points.push(e);
        if (this.currentPath) {
            this.canvas.remove(this.currentPath);
        }
        this.currentPath = this.createDashedPath('provisional', this.points, this.width, this.color);
        this.canvas.add(this.currentPath);
    };
    /**
     * Mouse Up Event, finish drawing in canvas
     * and creates the new path with the given points
     */
    DashedBrush.prototype.onMouseUp = function () {
        if (!this.isDrawing)
            return;
        this.isDrawing = false;
        if (this.currentPath) {
            this.canvas.remove(this.currentPath);
        }
        if (this.points.length > 1) {
            var path = this.createDashedPath(this.userId + ":" + uuid.v4(), this.points, this.width, this.color);
            this.points = [];
            path.setCoords();
            this.canvas.add(path);
            this.canvas.renderAll();
        }
    };
    return DashedBrush;
}(fabric.fabric.PencilBrush));

/**
 * Logic for synchronize special brushes creation
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that is drawing
 * @param {string} id - path id
 * @param {ICanvasBrush} target - Target with properties to be setted in path
 */
var addSynchronizationInSpecialBrushes = function (canvas, userId, id, target) {
    var _a;
    var brush;
    var path;
    var basePath = target.basePath;
    var brushType = (_a = target.basePath) === null || _a === void 0 ? void 0 : _a.type;
    switch (brushType) {
        case 'dashed':
            brush = new DashedBrush(canvas, userId);
            path = brush.createDashedPath(id, (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke));
            break;
        case 'pen':
            brush = new PenBrush(canvas, userId);
            path = brush.createPenPath(id, (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke));
            break;
        case 'marker':
        case 'felt':
            brush = new MarkerBrush(canvas, userId, brushType);
            path = brush.createMarkerPath(id, (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke));
            break;
        case 'paintbrush':
            brush = new PaintBrush(canvas, userId);
            path = brush.modifyPaintBrushPath(id, (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke), (basePath === null || basePath === void 0 ? void 0 : basePath.bristles) || []);
            break;
    }
    if (!path)
        return;
    path.set({
        top: target.top,
        left: target.left,
        originX: target.originX,
        originY: target.originY,
        selectable: false,
        evented: false,
    });
    canvas.add(path);
    canvas.renderAll();
};

var useSynchronizedAdded = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = React.useContext(WhiteboardContext), floodFillIsActive = _a.floodFillIsActive, isGif = _a.isGif, image = _a.image, setLocalImage = _a.setLocalImage, setLocalBackground = _a.setLocalBackground;
    var _b = useSharedEventSerializer().state, eventSerializer = _b.eventSerializer, eventController = _b.eventController;
    /** Register and handle path:created event. */
    // Remove all of this useEffect.
    React.useEffect(function () {
        var pathCreated = function (e) {
            if (!e.path) {
                return;
            }
            e.path.id = PainterEvents.createId(userId);
            var target = {
                stroke: e.path.stroke,
                strokeWidth: e.path.strokeWidth,
                path: e.path.path,
                strokeDashArray: e.path
                    .strokeDashArray,
                isPartialErased: e.path.isPartialErased,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', PainterEvents.pathCreated(target, e.path.id, userId));
            var stateTarget = __assign(__assign({}, target), { top: e.path.top, left: e.path.left });
            if (canvas) {
                var event_1 = {
                    event: {
                        id: e.path.id,
                        target: stateTarget,
                        type: 'path',
                    },
                    type: 'added',
                };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas.getObjects(),
                    canvasId: userId,
                    event: event_1,
                });
            }
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('path:created', pathCreated);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('path:created', pathCreated);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
    /** Register and handle object:added event. */
    React.useEffect(function () {
        var objectAdded = function (e) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            if (!((_a = e.target) === null || _a === void 0 ? void 0 : _a.id))
                return;
            if (e.target.fromJSON)
                return;
            if (!shouldSerializeEvent(e.target.id))
                return;
            var target;
            if (e.type === 'localImage') {
                var payload_1 = {
                    type: e.type,
                    target: e.target,
                    id: e.target.id,
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload_1);
                var event_2 = { event: payload_1, type: 'backgroundAdded' };
                var background = __assign(__assign({}, e.target), { backgroundImageEditable: false });
                // send undo redo dispatch here.
                undoRedoDispatch({
                    type: SET,
                    background: background,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                    event: event_2,
                });
                return;
            }
            var type = (e.target.get('type') || 'path');
            switch (type) {
                case 'path':
                    if (((_c = (_b = e.target) === null || _b === void 0 ? void 0 : _b.basePath) === null || _c === void 0 ? void 0 : _c.type) === 'dashed') {
                        target = {
                            basePath: e.target.basePath,
                            originX: e.target.originX,
                            originY: e.target.originY,
                        };
                    }
                    break;
                case 'textbox':
                    target = {
                        text: e.target.text,
                        fontFamily: e.target.fontFamily,
                        stroke: e.target.fill,
                        top: e.target.top,
                        left: e.target.left,
                        width: e.target.width,
                    };
                    break;
                case 'group':
                    target = {
                        basePath: e.target.basePath,
                        originX: e.target.originX,
                        originY: e.target.originY,
                    };
                    break;
                case 'image':
                    var element = (_d = e.target) === null || _d === void 0 ? void 0 : _d.getElement();
                    if (element.currentSrc && !e.target.cursorPointer) {
                        target = {
                            basePath: __assign(__assign({}, e.target.basePath), { imageData: element.currentSrc }),
                            scaleX: e.target.scaleX,
                            scaleY: e.target.scaleY,
                            angle: e.target.angle,
                            flipX: e.target.flipX,
                            flipY: e.target.flipY,
                            originX: e.target.originX,
                            originY: e.target.originY,
                        };
                    }
                    break;
            }
            var payload = {
                type: type,
                target: __assign(__assign({}, target), { top: e.target.top, left: e.target.left }),
                id: e.target.id,
            };
            if ((canvas && ((_f = (_e = payload.target) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.trim().length)) ||
                (canvas &&
                    payload.type === 'group' && ((_g = payload.target) === null || _g === void 0 ? void 0 : _g.basePath)) ||
                (canvas &&
                    payload.type === 'image' && ((_h = payload.target) === null || _h === void 0 ? void 0 : _h.basePath)) ||
                (canvas &&
                    payload.type === 'path' && ((_j = payload.target) === null || _j === void 0 ? void 0 : _j.basePath))) {
                if (e.type !== 'backgroundImage') {
                    var event_3 = { event: payload, type: 'added' };
                    undoRedoDispatch({
                        type: SET,
                        payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                        canvasId: userId,
                        event: event_3,
                    });
                }
                if (!isGif && e.type !== 'backgroundImage') {
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload);
                }
            }
            if (isGif) {
                var payload_2 = {
                    type: 'gif',
                    target: { src: image },
                    id: e.target.id,
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload_2);
                return;
            }
            if (e.type === 'backgroundImage') {
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', __assign(__assign({}, payload), { type: 'backgroundImage' }));
                var event_4 = { event: payload, type: 'backgroundAdded' };
                var background = __assign(__assign({}, ((_k = canvas === null || canvas === void 0 ? void 0 : canvas.backgroundImage) === null || _k === void 0 ? void 0 : _k.toJSON(CANVAS_OBJECT_PROPS))), { backgroundImageEditable: true });
                // send undo redo dispatch here.
                undoRedoDispatch({
                    type: SET,
                    background: background,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                    event: event_4,
                });
                return;
            }
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:added', objectAdded);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:added', objectAdded);
        };
    }, [
        canvas,
        eventSerializer,
        shouldSerializeEvent,
        undoRedoDispatch,
        userId,
        isGif,
        image,
    ]);
    /**
     * Generates a new shape based on shape name.
     * @param target Object data.
     */
    var generateGenericShape = function (target) {
        switch (target.name) {
            case 'chatBubble': {
                return chat(target.width, target.height, target.stroke, target.filled, target.strokeWidth, target.strokeDashArray);
            }
            case 'star': {
                return star(target.width, target.height, target.stroke, target.filled, target.strokeWidth, target.strokeDashArray);
            }
            case 'hexagon': {
                return hexagon(target.stroke, target.filled, target.strokeWidth, target.strokeDashArray);
            }
            case 'pentagon': {
                return pentagon(target.stroke, target.filled, target.strokeWidth, target.strokeDashArray);
            }
            default: {
                return arrow(target.width, target.height, target.stroke, target.filled, target.strokeWidth, target.strokeDashArray);
            }
        }
    };
    /** Register and handle remote added event. */
    React.useEffect(function () {
        var added = function (id, objectType, target) {
            // TODO: We'll want to filter events based on the user ID. This can
            // be done like this. Example of extracting user id from object ID:
            // let { user } = new ShapeID(id);
            // Help!
            // if (eventSerializer?.didSerializeEvent(id)) return;
            var _a, _b;
            // TODO: We'll have to replace this with the user based filtering. Because
            // we want to allow bi-directional events (Teacher <-> Student) as opposed
            // to (Teacher --> Student).
            // Events come from another user
            // Pass as props to user context
            // Ids of shapes + userId  uuid()
            if (!shouldHandleRemoteEvent(id))
                return;
            if (objectType === 'textbox') {
                var text = new fabric.fabric.Textbox(target.text || '', {
                    fontSize: 30,
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontFamily: target.fontFamily,
                    fill: target.stroke,
                    top: target.top,
                    left: target.left,
                    width: target.width,
                    selectable: false,
                });
                text.id = id;
                canvas === null || canvas === void 0 ? void 0 : canvas.add(text);
                undoRedoDispatch({
                    type: SET_OTHER,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                });
                return;
            }
            if ((objectType === 'group' || objectType === 'path') && canvas) {
                addSynchronizationInSpecialBrushes(canvas, userId, id, target);
            }
            var shape = null;
            if (objectType === 'path' &&
                !target.name &&
                (!target.basePath || target.basePath.type === 'pencil')) {
                var pencil = new fabric.fabric.PencilBrush();
                pencil.color = target.stroke || '#000';
                pencil.width = target.strokeWidth || DEFAULT_VALUES.LINE_WIDTH;
                pencil.strokeDashArray = target.strokeDashArray || [];
                // Convert Points to SVG Path
                var res = pencil.createPath(target.path || '');
                res.id = id;
                res.selectable = false;
                res.evented = false;
                res.strokeUniform = true;
                if (target.isPartialErased) {
                    res.globalCompositeOperation = 'destination-out';
                }
                if (target.top !== undefined && target.left !== undefined) {
                    res.set({
                        top: target.top,
                        left: target.left,
                    });
                }
                canvas === null || canvas === void 0 ? void 0 : canvas.add(res);
                canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            }
            else if ((objectType === 'path' || objectType === 'polygon') &&
                target.name) {
                shape = generateGenericShape(target);
            }
            if (objectType === 'rect') {
                shape = new fabric.fabric.Rect();
            }
            if (objectType === 'triangle') {
                shape = new fabric.fabric.Triangle();
            }
            if (objectType === 'ellipse') {
                shape = new fabric.fabric.Ellipse();
            }
            if (objectType === 'image') {
                var src = ((_a = target.basePath) === null || _a === void 0 ? void 0 : _a.imageData) || target.src;
                fabric.fabric.Image.fromURL(src, function (data) {
                    data.set({
                        id: id,
                        top: target.top,
                        left: target.left,
                        angle: target.angle,
                        scaleX: target.scaleX,
                        scaleY: target.scaleY,
                        flipX: target.flipX,
                        flipY: target.flipY,
                        originX: target.originX,
                        originY: target.originY,
                        selectable: false,
                        evented: false,
                    });
                    if (target.basePath) {
                        data.set({
                            basePath: target.basePath,
                        });
                    }
                    canvas === null || canvas === void 0 ? void 0 : canvas.add(data);
                    canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                    undoRedoDispatch({
                        type: SET_OTHER,
                        payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                        canvasId: userId,
                    });
                });
            }
            if (objectType === 'gif') {
                (function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var gif, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, fabricGif(target.src + " ", 200, 200, 2000)];
                                case 1:
                                    gif = _a.sent();
                                    gif.set({ top: 0, left: 0, selectable: false, evented: false });
                                    gif.id = id;
                                    canvas === null || canvas === void 0 ? void 0 : canvas.add(gif);
                                    fabric.fabric.util.requestAnimFrame(function render() {
                                        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                                        fabric.fabric.util.requestAnimFrame(render);
                                    });
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_1 = _a.sent();
                                    console.error(e_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    });
                })();
            }
            if (objectType === 'backgroundImage') {
                if (canvas) {
                    canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
                    setLocalImage('');
                    setLocalBackground(false);
                    var src = ((_b = target.basePath) === null || _b === void 0 ? void 0 : _b.imageData) || target.src;
                    fabric.fabric.Image.fromURL(src, function (img) {
                        canvas === null || canvas === void 0 ? void 0 : canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                            scaleX: (canvas.width || 0) / (img.width || 0),
                            scaleY: (canvas.height || 0) / (img.height || 0),
                            originX: 'left',
                            originY: 'top',
                            id: id,
                        });
                        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                    });
                }
                return;
            }
            if (objectType === 'localImage') {
                if (canvas)
                    canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
                if (target.backgroundImage)
                    setLocalImage(target.backgroundImage);
                return;
            }
            if (shape) {
                target = __assign(__assign({}, target), { selectable: false, evented: floodFillIsActive, hoverCursor: floodFillIsActive ? 'not-allowed' : 'move' });
                shape.set(target);
                canvas === null || canvas === void 0 ? void 0 : canvas.add(shape);
                canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            }
            undoRedoDispatch({
                type: SET_OTHER,
                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                canvasId: userId,
            });
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('added', added);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('added', added);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        canvas,
        eventController,
        floodFillIsActive,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
        setLocalImage,
    ]);
};

var useSynchronizedMoved = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    var moveSelectedObject = React.useCallback(function (type, e, filteredState) {
        if (!e.target ||
            !e.target.id ||
            (e.target.id && !shouldSerializeEvent(e.target.id)))
            return;
        e.target.bringToFront();
        var target = {
            angle: e.target.angle,
            top: e.target.top,
            left: e.target.left,
            scaleX: e.target.scaleX,
            scaleY: e.target.scaleY,
            flipX: e.target.flipX,
            flipY: e.target.flipY,
            originX: e.target.originX,
            originY: e.target.originY,
        };
        var payload = {
            type: type,
            target: target,
            id: e.target.id,
        };
        if (canvas && !filteredState) {
            var event_1 = { event: payload, type: 'moved' };
            undoRedoDispatch({
                type: SET,
                payload: canvas.getObjects(),
                canvasId: userId,
                event: event_1,
            });
        }
        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('moved', payload);
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
    var moveSelectedGroup = React.useCallback(function (type, e, filteredState) {
        var activeIds = [];
        if (!e.target || !e.target._objects)
            return;
        e.target._objects.forEach(function (activeObject) {
            if (!shouldSerializeEvent(activeObject.id))
                return;
            var matrix = activeObject.calcTransformMatrix();
            var options = fabric.fabric.util.qrDecompose(matrix);
            var flipX = function () {
                var _a, _b;
                if (activeObject.flipX && ((_a = e.target) === null || _a === void 0 ? void 0 : _a.flipX)) {
                    return false;
                }
                return activeObject.flipX || ((_b = e.target) === null || _b === void 0 ? void 0 : _b.flipX);
            };
            var flipY = function () {
                var _a, _b;
                if (activeObject.flipY && ((_a = e.target) === null || _a === void 0 ? void 0 : _a.flipY)) {
                    return false;
                }
                return activeObject.flipY || ((_b = e.target) === null || _b === void 0 ? void 0 : _b.flipY);
            };
            var angle = function () {
                var _a, _b;
                if (((_a = e.target) === null || _a === void 0 ? void 0 : _a.angle) !== 0) {
                    return (_b = e.target) === null || _b === void 0 ? void 0 : _b.angle;
                }
                return activeObject.angle;
            };
            var target = {
                angle: angle(),
                top: options.translateY,
                left: options.translateX,
                scaleX: options.scaleX,
                scaleY: options.scaleY,
                flipX: flipX(),
                flipY: flipY(),
            };
            var payload = {
                type: type,
                target: target,
                id: activeObject.id || '',
            };
            activeIds.push(activeObject.id);
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('moved', payload);
        });
        if (!filteredState) {
            var payload = {
                type: type,
                svg: true,
                target: null,
                id: userId + ":group",
            };
            var event_2 = { event: payload, type: 'activeSelection', activeIds: activeIds };
            var filtered = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) {
                return !o.group;
            });
            var active = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
            active === null || active === void 0 ? void 0 : active.set({ id: userId + ":group" });
            undoRedoDispatch({
                type: SET_GROUP,
                payload: __spreadArrays(filtered, [active]),
                canvasId: userId,
                event: event_2,
            });
        }
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
    /** Register and handle object:moved event. */
    React.useEffect(function () {
        var objectMoved = function (e) {
            if (!e.target)
                return;
            var type = (e.target.get('type') || 'path');
            if (type === 'activeSelection') {
                moveSelectedGroup(type, e);
            }
            else {
                moveSelectedObject(type, e);
            }
        };
        var objectMoving = function (e) {
            if (!e.target)
                return;
            var type = (e.target.get('type') || 'path');
            if (type === 'activeSelection') {
                moveSelectedGroup(type, e, true);
            }
            else {
                moveSelectedObject(type, e, true);
            }
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:moved', objectMoved);
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:moving', objectMoving);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:moved', objectMoved);
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:moving', objectMoving);
        };
    }, [canvas, eventSerializer, moveSelectedGroup, moveSelectedObject]);
    /** Register and handle remote moved event. */
    React.useEffect(function () {
        var moved = function (id, objectType, target) {
            if (!shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    if (objectType === 'activeSelection' && target.left && obj.left) {
                        obj.set({
                            angle: target.angle,
                            top: target.top,
                            left: target.left + 1,
                            scaleX: target.scaleX,
                            scaleY: target.scaleY,
                            flipX: target.flipX,
                            flipY: target.flipY,
                            originX: 'center',
                            originY: 'center',
                        });
                        obj.set({ left: obj.left - 1 });
                        obj.bringToFront();
                        obj.setCoords();
                    }
                    else {
                        obj.set({
                            angle: target.angle || 0,
                            top: target.top,
                            left: target.left,
                            scaleX: target.scaleX || 1,
                            scaleY: target.scaleY || 1,
                            flipX: target.flipX || false,
                            flipY: target.flipY || false,
                            originX: target.originX || 'left',
                            originY: target.originY || 'top',
                        });
                        obj.bringToFront();
                        obj.setCoords();
                        undoRedoDispatch({
                            type: SET_OTHER,
                            payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                            canvasId: userId,
                        });
                    }
                }
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('moved', moved);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('moved', moved);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
    ]);
};

/**
 * Get's previous set color for canvas background.
 * @param currentIndex Current event index.
 * @param events List of events.
 */
var getPreviousBackground = function (currentIndex, events) {
    var i = currentIndex;
    if (i < 0) {
        return '#fff';
    }
    for (i; i >= 0; i--) {
        if (events[i].event.type === 'background') {
            return events[i].event.target.fill;
        }
    }
    return '#fff';
};
/**
 * Get's previous set color for canvas background.
 * @param currentIndex Current event index.
 * @param events List of events.
 */
var getPreviousBackgroundDivColor = function (currentIndex, events) {
    var _a;
    var i = currentIndex;
    if (i < 0) {
        return null;
    }
    for (i; i >= 0; i--) {
        if (((_a = events[i]) === null || _a === void 0 ? void 0 : _a.type) === 'backgroundColorChanged') {
            return events[i].event.color;
        }
    }
    return null;
};

/**
 * Extract from the given state the necessary variables
 * to be used in undo/redo actions
 * @param {CanvasHistoryState} state - Current state to extract variables
 */
var getStateVariables = function (state) {
    var currentEvent = state.events[state.eventIndex];
    var currentObject = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.event;
    var currentState = state.states[state.activeStateIndex];
    var nextEvent = state.events[state.eventIndex + 1];
    var nextObject = nextEvent === null || nextEvent === void 0 ? void 0 : nextEvent.event;
    var background = state.backgrounds[state.activeStateIndex];
    return { currentEvent: currentEvent, currentObject: currentObject, currentState: currentState, nextEvent: nextEvent, nextObject: nextObject, background: background };
};

/**
 * Determine if an object belongs to local canvas.
 * @param id Object ID
 * @param canvasId Canvas ID
 */
var isLocalObject = function (id, canvasId) {
    if (!id) {
        return false;
    }
    var object = id.split(':');
    if (!object.length) {
        throw new Error('Invalid ID');
    }
    return object[0] === canvasId;
};
/**
 * Parses to an object the given state
 * @param {string} activeState - Stringified state to parse
 */
var mapActiveState = function (activeState) {
    return JSON.parse(activeState).objects.map(function (object) {
        if (object.objects) {
            var _objects = object.objects;
            var mappedObjects = _objects.map(function (o) {
                return __assign(__assign({}, o), { fromJSON: true });
            });
            return __assign(__assign({}, object), { fromJSON: true, objects: mappedObjects });
        }
        return __assign(__assign({}, object), { fromJSON: true });
    });
};
/**
 * Loads the given objects in the whiteboard with the given instanceId
 * @param {fabric.Canvas} canvas - Canvas to set the objects.
 * @param {{ [key: string]: any }} mapped - Objects to set in canvas.
 * @param {string} instanceId - Canvas ID
 * @param {CanvasHistoryState} state - Current state in canvas actions history
 * @param {'UNDO' | 'REDO'} action - Action made
 * @param {(color: string) => void} setBackgroundColorInCanvas - Function to
 * set background color in current canvas
 */
var loadFromJSON = function (canvas, mapped, instanceId, state, action, setBackgroundColorInCanvas, setLocalImage, setBackgroundImageIsPartialErasable) {
    var _a = getStateVariables(state), currentEvent = _a.currentEvent, nextEvent = _a.nextEvent;
    canvas.loadFromJSON(JSON.stringify({ objects: mapped }), function () {
        canvas
            .getObjects()
            .forEach(function (o) {
            if (isLocalObject(o.id, instanceId)) {
                o.set({ selectable: true, evented: true });
                if (o._objects && !o.basePath) {
                    o.toActiveSelection();
                    canvas.discardActiveObject();
                }
            }
        });
        if (state.backgrounds.length && state.activeStateIndex !== null) {
            var bgs = state.backgrounds.slice(0, state.activeStateIndex + 1);
            var target_1 = bgs.reverse().find(function (item) { return item !== null; });
            if (target_1 && target_1.backgroundImageEditable) {
                setBackgroundImageIsPartialErasable(true);
                fabric.fabric.Image.fromURL(target_1.src, function (img) {
                    canvas === null || canvas === void 0 ? void 0 : canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                        scaleX: target_1.scaleX,
                        scaleY: target_1.scaleY,
                        originX: 'left',
                        originY: 'top',
                        // @ts-ignore
                        id: target_1.id,
                    });
                    canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                    canvas === null || canvas === void 0 ? void 0 : canvas.trigger('background:modified', img);
                });
            }
            else if (target_1 && !target_1.backgroundImageEditable) {
                setBackgroundImageIsPartialErasable(false);
                // @ts-ignore
                canvas === null || canvas === void 0 ? void 0 : canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
                setLocalImage(target_1.backgroundImage);
                canvas === null || canvas === void 0 ? void 0 : canvas.trigger('background:modified', null);
            }
            else {
                setLocalImage('');
                canvas === null || canvas === void 0 ? void 0 : canvas.trigger('background:modified', null);
                // @ts-ignore
                canvas === null || canvas === void 0 ? void 0 : canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
                canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            }
        }
        else if (state.backgrounds.length && state.activeStateIndex === null) {
            setLocalImage('');
            canvas === null || canvas === void 0 ? void 0 : canvas.trigger('background:modified', null);
        }
        if ((action === 'UNDO' && (nextEvent === null || nextEvent === void 0 ? void 0 : nextEvent.type) === 'backgroundColorChanged') ||
            (action === 'REDO' && (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.type) === 'backgroundColorChanged')) {
            var fill = getPreviousBackground(state.eventIndex, state.events);
            var divColorBackground = getPreviousBackgroundDivColor(state.eventIndex, state.events);
            if (divColorBackground) {
                setBackgroundColorInCanvas(divColorBackground);
            }
            else {
                canvas.backgroundColor = fill;
            }
        }
        canvas.renderAll();
    });
};
/**
 * Render Undo/Redo action in Local Whiteboard according with the given state
 * @param {fabric.Canvas} canvas - Current canvas
 * @param {string} instanceId - Canvas ID
 * @param {CanvasHistoryState} state - Current state to get data to render
 * @param {'UNDO' | 'REDO'} action - Action made
 * @param {boolean} shapesAreSelectable - Flag to know if objects are able
 * to be selectable
 * @param {(color: string) => void} setBackgroundColorInCanvas - Function to
 * set background color in current canvas
 */
var RenderLocalUndoRedo = function (canvas, instanceId, state, action, shapesAreSelectable, setBackgroundColorInCanvas, setLocalImage, setBackgroundImageIsPartialErasable) {
    /**
     * Reset selectable, evented and strokeUniform properties
     * when a group of objects had an undo/redo action
     */
    var resetObjectsSelectability = function () {
        canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
            var id = object.id;
            var isLocal = isLocalObject(id, instanceId);
            object.set({
                selectable: isLocal && shapesAreSelectable,
                evented: isLocal && shapesAreSelectable,
                strokeUniform: true,
            });
        });
        canvas.renderAll();
    };
    // To prevent fabricjs observers from updating state on rerender.
    canvas.forEachObject(function (object) {
        if (isLocalObject(object.id, instanceId)) {
            object.set({ fromJSON: true });
        }
    });
    // Getting the object of the current state
    var mapped = mapActiveState(state.activeState);
    // Loading objects in canvas
    loadFromJSON(canvas, mapped, instanceId, state, action, setBackgroundColorInCanvas, setLocalImage, setBackgroundImageIsPartialErasable);
    // If undo/redo was applied in a group of objects
    if (mapped.length === 1 && mapped[0].type === 'activeSelection') {
        resetObjectsSelectability();
    }
};

/**
 * Creates payload with the given id and target
 * and send reconstruct event with the created payload
 * @param {string} id - Object id for payload
 * @param {PayloadTarget} target - Target to send in payload
 */
var sendReconstructEvent = function (id, target, eventSerializer) {
    var payload = {
        id: id,
        target: target,
        type: 'reconstruct',
    };
    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('reconstruct', payload);
};

/**
 * Renders Undo action in Remote Whiteboards
 * @param {fabric.Canvas} canvas - Current canvas
 * @param {string} instanceId - Canvas ID
 * @param {CanvasHistoryState} state - Current state to get data to render
 * @param {PaintEventSerializer} eventSerializer - Event serializer to send
 * changes to Remote Whiteboards
 */
var RenderRemoteUndo = function (canvas, instanceId, state, eventSerializer, setLocalImage, setBackgroundImageIsPartialErasable) {
    var _a, _b;
    var _c = getStateVariables(state), currentEvent = _c.currentEvent, currentObject = _c.currentObject, currentState = _c.currentState, nextEvent = _c.nextEvent, nextObject = _c.nextObject;
    var checkPreviousBackgroundImage = function () {
        var backgrounds = state.backgrounds;
        var currentIndex = state.eventIndex;
        var background = backgrounds.slice(0, currentIndex + 1).reverse().find(function (bg) { return bg !== null; }) || null;
        return background;
    };
    /**
     * Gets the joinedIds property from the given object and finds the objects
     * with those ids to reconstruct them in the whiteboard
     */
    var reconstructJoinedObjects = function () {
        var _a;
        if (!currentState) {
            return;
        }
        var joinedIds = nextObject.target.joinedIds;
        var id = nextObject.id;
        var currentIds = (_a = currentObject === null || currentObject === void 0 ? void 0 : currentObject.target) === null || _a === void 0 ? void 0 : _a.joinedIds;
        var objects = JSON.parse(currentState).objects;
        if (currentIds && joinedIds) {
            joinedIds = __spreadArrays(joinedIds, currentIds);
        }
        // If state has states reconstruct event is able to be sent
        if (currentState) {
            var filteredObjects = objects.filter(function (o) { return (joinedIds === null || joinedIds === void 0 ? void 0 : joinedIds.indexOf(o.id)) !== -1; });
            var previousBg = checkPreviousBackgroundImage();
            var payload = {
                id: id,
                target: { objects: filteredObjects, backgroundImage: previousBg },
                type: 'reconstruct',
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('reconstruct', payload);
        }
    };
    var undoAdd = function (nextObject) {
        var payload = {
            id: nextObject.id,
        };
        // If undoing the creation of an object, remove.
        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', payload);
        /* If the object is an image, is necessary find if this image
        is product of flood-filled object composed for other objects */
        if (nextObject.type === 'image') {
            reconstructJoinedObjects();
        }
    };
    switch (nextEvent.type) {
        case 'added': {
            if (!Array.isArray(nextObject)) {
                undoAdd(nextObject);
            }
            else {
                nextObject.forEach(function (o) {
                    undoAdd(o);
                });
            }
            break;
        }
        case 'backgroundAdded': {
            var target = {
                // @ts-ignore
                id: nextEvent.event.id,
                target: {
                    strategy: 'removeBackground',
                    isBackgroundImage: true,
                },
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', target);
            if (state.backgrounds.length && state.activeStateIndex !== null) {
                var previous = state.backgrounds[state.eventIndex] || checkPreviousBackgroundImage();
                if (!previous)
                    return;
                var payload = {
                    type: ((_a = previous) === null || _a === void 0 ? void 0 : _a.backgroundImageEditable) ? 'backgroundImage' : 'localImage',
                    target: previous,
                    id: previous.id,
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload);
                break;
            }
            break;
        }
        case 'activeSelection': {
            /**
             * Validates if the id to send to payload must be from
             * currentObject or nextObject
             */
            var idIsInCurrentObject = function () {
                return (currentEvent.type === 'activeSelection' ||
                    currentEvent.type === 'added');
            };
            var objects = JSON.parse(currentState).objects;
            var id = (idIsInCurrentObject() ? currentObject : nextObject).id;
            if (currentEvent.type === 'added' && currentObject.type !== 'textbox') {
                eventSerializer.push('removed', {
                    id: nextObject.id,
                });
            }
            sendReconstructEvent(id, { objects: objects }, eventSerializer);
            break;
        }
        case 'clearedWhiteboard': {
            var objects = JSON.parse(currentState).objects;
            var id = nextObject.id;
            sendReconstructEvent(id, { objects: objects }, eventSerializer);
            break;
        }
        case 'backgroundColorChanged': {
            var divColorBackground = getPreviousBackgroundDivColor(state.eventIndex, state.events);
            var payload = {
                id: instanceId,
                target: divColorBackground || 'transparent',
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('backgroundColorChanged', payload);
            break;
        }
        default: {
            if (nextObject.type === 'background') {
                var fill = getPreviousBackground(state.eventIndex, state.events);
                var id = nextObject.id;
                canvas.backgroundColor = fill;
                canvas.renderAll();
                sendReconstructEvent(id, { background: fill }, eventSerializer);
                return;
            }
            if ((currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.type) !== 'remove' &&
                nextEvent.type !== 'clearedWhiteboard') {
                var id_1 = nextObject.id;
                if (id_1.split(':')[1] !== 'group') {
                    var objects = JSON.parse(currentState).objects;
                    var object = objects.find(function (o) { return o.id === id_1; });
                    sendReconstructEvent(id_1, { objects: [object] }, eventSerializer);
                }
                else {
                    var objectsToReconstruct_1 = [];
                    var objects_1 = JSON.parse(currentState).objects;
                    (_b = nextEvent.activeIds) === null || _b === void 0 ? void 0 : _b.forEach(function (id) {
                        var object = objects_1.find(function (object) { return object.id === id; });
                        objectsToReconstruct_1.push(object);
                    });
                    sendReconstructEvent(id_1, { objects: objectsToReconstruct_1 }, eventSerializer);
                }
            }
            else if (state.activeStateIndex !== null) {
                var objects = JSON.parse(currentState).objects;
                var id = nextObject.id;
                sendReconstructEvent(id, { objects: objects }, eventSerializer);
            }
            break;
        }
    }
};

/**
 * Renders Redo action in Remote Whiteboards according with the given state
 * @param {fabric.Canvas} canvas - Current canvas
 * @param {string} instanceId - Canvas ID
 * @param {CanvasHistoryState} state - Current state to get data for render
 * @param {PaintEventSerializer} eventSerializer - Event serializer to send
 * changes to remote whiteboards
 */
var RenderRemoteRedo = function (canvas, instanceId, state, eventSerializer) {
    var _a;
    var _b = getStateVariables(state), currentEvent = _b.currentEvent, currentObject = _b.currentObject, currentState = _b.currentState, background = _b.background;
    if (currentObject.type === 'background') {
        canvas.backgroundColor = currentObject.target.fill;
        canvas.renderAll();
        var payload = {
            id: currentObject.id,
            target: {
                background: currentObject.target.fill,
            },
            type: 'reconstruct',
        };
        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('reconstruct', payload);
        return;
    }
    switch (currentEvent.type) {
        case 'added': {
            if (!Array.isArray(currentObject)) {
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', currentObject);
                if (currentObject.type === 'image') {
                    var joinedIds = currentObject.target.joinedIds;
                    joinedIds === null || joinedIds === void 0 ? void 0 : joinedIds.forEach(function (id) {
                        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', {
                            id: id,
                        });
                    });
                }
            }
            if (background) {
                var payload = {
                    type: background.backgroundImageEditable ? 'backgroundImage' : 'localImage',
                    target: background,
                    id: background.id,
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload);
            }
            break;
        }
        case 'backgroundAdded': {
            var payload = {
                type: state.backgrounds[state.eventIndex].backgroundImageEditable ? 'backgroundImage' : 'localImage',
                target: state.backgrounds[state.eventIndex],
                id: state.backgrounds[state.eventIndex].id,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload);
            break;
        }
        case 'removed': {
            if (currentEvent.activeIds) {
                // Redo in a group of objects removed
                (_a = currentEvent.activeIds) === null || _a === void 0 ? void 0 : _a.forEach(function (id) {
                    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', {
                        id: id,
                    });
                });
            }
            else {
                // Redo in single object removed
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', {
                    id: currentObject.id,
                });
            }
            break;
        }
        case 'clearedWhiteboard': {
            var id = currentObject.id;
            sendReconstructEvent(id, false, eventSerializer);
            break;
        }
        case 'activeSelection': {
            var objects = JSON.parse(currentState).objects;
            var id = currentObject.id;
            sendReconstructEvent(id, { objects: objects }, eventSerializer);
            break;
        }
        case 'backgroundColorChanged': {
            var payload = {
                id: instanceId,
                target: currentObject.color,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('backgroundColorChanged', payload);
            break;
        }
        default: {
            var objects = JSON.parse(currentState).objects;
            var id_1 = currentObject.id;
            var object = objects.find(function (o) { return o.id === id_1; });
            sendReconstructEvent(id_1, { objects: [object] }, eventSerializer);
            break;
        }
    }
};

// This file is a work in progress. Multiple events need to be considered,
// such as group events, that are currently not function (or break functionality).
/**
 * Custom hook to track canvas history.
 * @param canvas Canvas being manipulated
 * @param eventSerializer Event serializer
 * @param canvasId Canvas ID
 */
var UndoRedo = function (canvas, eventSerializer, instanceId) {
    var _a = useUndoRedo$1(), state = _a.state, dispatch = _a.dispatch;
    var _b = React.useContext(WhiteboardContext), shapesAreSelectable = _b.shapesAreSelectable, setBackgroundColorInCanvas = _b.setBackgroundColorInCanvas, setLocalImage = _b.setLocalImage, setBackgroundImageIsPartialErasable = _b.setBackgroundImageIsPartialErasable;
    /**
     * Handles logic for render changes in undo/redo actions in local whiteboard
     */
    React.useEffect(function () {
        if (!state || !canvas) {
            return;
        }
        // Rerenders local canvas when an undo or redo event has been executed.
        if (state.actionType === UNDO || state.actionType === REDO) {
            RenderLocalUndoRedo(canvas, instanceId, state, state.actionType, shapesAreSelectable, setBackgroundColorInCanvas, setLocalImage, setBackgroundImageIsPartialErasable);
        }
    }, [
        canvas,
        instanceId,
        setBackgroundColorInCanvas,
        shapesAreSelectable,
        state,
    ]);
    /**
     * Handles logic for render changes in undo/redo actions in remote whiteboards
     */
    React.useEffect(function () {
        if (state.actionType === UNDO) {
            RenderRemoteUndo(canvas, instanceId, state, eventSerializer);
        }
        else if (state.actionType === REDO) {
            RenderRemoteRedo(canvas, instanceId, state, eventSerializer);
        }
    }, [canvas, eventSerializer, instanceId, state]);
    return { state: state, dispatch: dispatch };
};

/**
 * Logic for synchronize line color in special brushes
 * @param {ICanvasBrush} object - Path to change color
 * @param {ICanvasObject} target - Target to copy properties on path
 */
var colorChangeSynchronizationInSpecialBrushes = function (object, target) {
    var _a;
    var basePath = object.basePath;
    var brushType = (_a = object.basePath) === null || _a === void 0 ? void 0 : _a.type;
    if (brushType === 'paintbrush') {
        var bristles_1 = target.bristles || [];
        if (!bristles_1.length)
            return;
        object.forEachObject(function (line, index) {
            line.set({
                stroke: bristles_1[index].color,
                shadow: new fabric.fabric.Shadow({
                    affectStroke: true,
                    nonScaling: true,
                    color: bristles_1[index].color,
                    blur: Number(line.strokeWidth) / 2,
                }),
            });
            object.set({
                basePath: {
                    type: brushType || 'pen',
                    points: (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [],
                    stroke: String(target.stroke),
                    strokeWidth: Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth),
                    bristles: bristles_1,
                },
            });
        });
    }
    else if (brushType !== 'chalk' && brushType !== 'crayon') {
        object.forEachObject(function (line) {
            line.set({
                stroke: target.stroke,
            });
        });
        object.set({
            basePath: {
                type: brushType || 'pen',
                points: (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [],
                stroke: String(target.stroke),
                strokeWidth: Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth),
            },
        });
    }
};

var useSynchronizedColorChanged = function (canvas, userId, shouldHandleRemoteEvent, undoRedoDispatch) {
    var eventController = useSharedEventSerializer().state.eventController;
    React.useEffect(function () {
        var colorChanged = function (id, objectType, target) {
            var _a;
            if (id && !shouldHandleRemoteEvent(id))
                return;
            if (objectType === 'background' && canvas) {
                canvas.backgroundColor = (_a = target.fill) === null || _a === void 0 ? void 0 : _a.toString();
            }
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                var _a, _b;
                if (obj.id && obj.id === id) {
                    switch (objectType) {
                        case 'textbox':
                            return;
                        case 'shape':
                            obj.set({
                                fill: target.fill || obj.fill,
                                stroke: target.stroke || obj.stroke,
                            });
                            break;
                        case 'path':
                            obj.set({
                                stroke: target.stroke,
                            });
                            break;
                        // Color change in special brushes
                        case 'group':
                            colorChangeSynchronizationInSpecialBrushes(obj, target);
                            break;
                        // Chalk/Crayon path case, original is removed and recreated with a new color
                        case 'image':
                            var basePath = obj.basePath;
                            var brush = new ChalkBrush(canvas, userId, basePath === null || basePath === void 0 ? void 0 : basePath.type);
                            var clearRects = brush.createChalkEffect((basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth));
                            brush
                                .createChalkPath(String(target.id), (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), String(target.stroke), clearRects)
                                .then(function (newPath) {
                                obj.set({
                                    basePath: newPath.basePath,
                                    _element: newPath._element,
                                });
                                canvas.renderAll();
                            })
                                .catch(function (error) {
                                console.warn(error);
                            });
                            break;
                    }
                }
                if (objectType === 'shape') {
                    var index = (_b = (_a = target.objectsOrdering) === null || _a === void 0 ? void 0 : _a.find(function (find) { return obj.id === find.id; })) === null || _b === void 0 ? void 0 : _b.index;
                    if (index !== undefined) {
                        obj.moveTo(index);
                    }
                }
            });
            undoRedoDispatch({
                type: SET_OTHER,
                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                canvasId: userId,
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('colorChanged', colorChanged);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('colorChanged', colorChanged);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
    ]);
};

var useSynchronizedFontFamilyChanged = function (canvas, shouldHandleRemoteEvent) {
    var eventController = useSharedEventSerializer().state.eventController;
    React.useEffect(function () {
        var fontFamilyChanged = function (id, target) {
            if (!shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    obj.set({
                        fontFamily: target.fontFamily,
                    });
                }
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('fontFamilyChanged', fontFamilyChanged);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('fontFamilyChanged', fontFamilyChanged);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
};

var useSynchronizedRemoved = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    var _b = React.useContext(WhiteboardContext), clearIsActive = _b.clearIsActive, setBackgroundImage = _b.setBackgroundImage, setLocalImage = _b.setLocalImage, setLocalBackground = _b.setLocalBackground, isCursorObject = _b.isCursorObject;
    /** Register and handle remote event. */
    React.useEffect(function () {
        var removed = function (objectId, target) {
            var _a;
            if (target.isLocalImage) {
                setLocalImage('');
                setBackgroundImage('');
                setLocalBackground(false);
                return;
            }
            switch (target.strategy) {
                case 'allowClearMyself':
                    if (!shouldHandleRemoteEvent(objectId))
                        return;
                    canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                        if (obj.id === objectId &&
                            !isCursorObject(obj) &&
                            !obj.stampObject) {
                            canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                        }
                    });
                    if (target.isBackgroundImage) {
                        // In order to remove background you need to add 0 to the first argument.
                        // An empty string unfortunately doesnt work.
                        // https://stackoverflow.com/a/14171884
                        // @ts-ignore
                        canvas === null || canvas === void 0 ? void 0 : canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
                        setLocalImage('');
                        setBackgroundImage('');
                    }
                    break;
                case 'allowClearAll':
                    if (shouldHandleRemoteEvent(objectId))
                        return;
                    canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                        if (!isCursorObject(obj) && !obj.stampObject) {
                            canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                        }
                    });
                    break;
                case 'allowClearOthers':
                    if (shouldHandleRemoteEvent(objectId))
                        return;
                    canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                        if (obj.id) {
                            var object = obj.id.split(':');
                            if (!object.length) {
                                throw new Error('Invalid ID');
                            }
                            if (object[0] === target.userId &&
                                !isCursorObject(obj) &&
                                !obj.stampObject) {
                                canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                            }
                        }
                    });
                    break;
                case 'removeGroup':
                    if (shouldHandleRemoteEvent(objectId))
                        return;
                    (_a = target.objectIds) === null || _a === void 0 ? void 0 : _a.forEach(function (id) {
                        var objectToRemove = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().find(function (object) { return object.id === id; });
                        canvas === null || canvas === void 0 ? void 0 : canvas.remove(objectToRemove);
                    });
                    var event_1 = {
                        event: { id: userId + ":group" },
                        type: 'removed',
                        activeIds: target.objectIds,
                    };
                    undoRedoDispatch({
                        type: SET,
                        payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                        canvasId: userId,
                        event: event_1,
                    });
                    break;
                case 'removeBackground': {
                    if (!shouldHandleRemoteEvent(objectId) && objectId)
                        return;
                    // @ts-ignore
                    canvas === null || canvas === void 0 ? void 0 : canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
                    setLocalImage('');
                    break;
                }
                default:
                    canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                        if (obj.id && obj.id === objectId) {
                            canvas === null || canvas === void 0 ? void 0 : canvas.remove(obj);
                        }
                    });
            }
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            if (shouldHandleRemoteEvent(objectId)) {
                undoRedoDispatch({
                    type: SET_OTHER,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                });
            }
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('removed', removed);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('removed', removed);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
        setLocalImage,
        setBackgroundImage,
        setLocalBackground,
        isCursorObject,
    ]);
    /** Register and handle local event. */
    React.useEffect(function () {
        var objectRemoved = function (e) {
            var _a, _b, _c;
            if (e.target.isActiveErase) {
                return;
            }
            if (!e.target ||
                !e.target.id ||
                (e.target.id &&
                    !shouldSerializeEvent(e.target.id))) {
                return;
            }
            var payload = {
                id: e.target.id,
            };
            var canvasEvent = e.target;
            var groupObjects = (canvasEvent === null || canvasEvent === void 0 ? void 0 : canvasEvent._objects) || [];
            if (canvas &&
                payload.id &&
                (!(canvasEvent === null || canvasEvent === void 0 ? void 0 : canvasEvent._objects) || groupObjects.length > 0) &&
                !e.target.groupClear &&
                !clearIsActive) {
                if (e.target.text &&
                    !((_a = e.target.text) === null || _a === void 0 ? void 0 : _a.trim()))
                    return;
                if (!e.target.skipState &&
                    !e.target.fromJSON &&
                    (((_c = (_b = e.target) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.trim().length) ||
                        e.target.get('type') !== 'textbox')) {
                    if (payload.id.split(':')[1] === 'cursor')
                        return;
                    var event_2 = { event: payload, type: 'removed' };
                    undoRedoDispatch({
                        type: SET,
                        payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                        canvasId: userId,
                        event: event_2,
                    });
                }
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', payload);
            }
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:removed', objectRemoved);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:removed', objectRemoved);
        };
    }, [
        canvas,
        clearIsActive,
        eventSerializer,
        shouldSerializeEvent,
        undoRedoDispatch,
        userId,
    ]);
};

var useSynchronizedRotated = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote event. */
    React.useEffect(function () {
        var objectRotated = function (id, target) {
            if (!shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    var object = target.eTarget;
                    if (object) {
                        obj.set({
                            angle: object.angle,
                            top: object.top,
                            left: object.left,
                            scaleX: object.scaleX,
                            scaleY: object.scaleY,
                            flipX: object.flipX,
                            flipY: object.flipY,
                            originX: object.originX || 'left',
                            originY: object.originY || 'top',
                        });
                        obj.setCoords();
                    }
                }
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        var groupRotated = function (id, target) {
            var _a, _b;
            var isLocalGroup = function (id, canvasId) {
                var object = id.split(':');
                if (!object.length) {
                    throw new Error('Invalid ID');
                }
                return object[0] === canvasId;
            };
            if (isLocalGroup(id, userId)) {
                return;
            }
            var localObjects = (canvas === null || canvas === void 0 ? void 0 : canvas.getObjects()) || [];
            var objectsToGroup = [];
            for (var i = 0; i < localObjects.length; i++) {
                if (target.activeIds) {
                    if (target.activeIds.includes(localObjects[i].id)) {
                        objectsToGroup.push(localObjects[i]);
                    }
                }
            }
            var _loop_1 = function (i) {
                var match = ((_b = (_a = target === null || target === void 0 ? void 0 : target.eTarget) === null || _a === void 0 ? void 0 : _a.objects) === null || _b === void 0 ? void 0 : _b.filter(function (o) { return o.id === objectsToGroup[i].id; })[0]) || {};
                objectsToGroup[i].set(match);
            };
            for (var i = 0; i < objectsToGroup.length; i++) {
                _loop_1(i);
            }
            var props = target === null || target === void 0 ? void 0 : target.eTarget;
            var sel = new fabric.fabric.ActiveSelection(objectsToGroup, {
                canvas: canvas,
                originX: props === null || props === void 0 ? void 0 : props.originX,
                originY: props === null || props === void 0 ? void 0 : props.originY,
                top: props === null || props === void 0 ? void 0 : props.top,
                left: props === null || props === void 0 ? void 0 : props.left,
                width: props === null || props === void 0 ? void 0 : props.width,
                height: props === null || props === void 0 ? void 0 : props.height,
                scaleX: props === null || props === void 0 ? void 0 : props.scaleX,
                scaleY: props === null || props === void 0 ? void 0 : props.scaleY,
                flipX: props === null || props === void 0 ? void 0 : props.flipX,
                flipY: props === null || props === void 0 ? void 0 : props.flipY,
                angle: props === null || props === void 0 ? void 0 : props.angle,
                skewX: props === null || props === void 0 ? void 0 : props.skewX,
                skewY: props === null || props === void 0 ? void 0 : props.skewY,
                oCoords: props === null || props === void 0 ? void 0 : props.oCoords,
                aCoords: props === null || props === void 0 ? void 0 : props.aCoords,
                matrixCache: props === null || props === void 0 ? void 0 : props.matrixCache,
                ownMatrixCache: props === null || props === void 0 ? void 0 : props.ownMatrixCache,
                snapAngle: props === null || props === void 0 ? void 0 : props.snapAngle,
                snapThreshold: props === null || props === void 0 ? void 0 : props.snapThreshold,
                group: props === null || props === void 0 ? void 0 : props.group,
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(sel);
            canvas === null || canvas === void 0 ? void 0 : canvas.requestRenderAll();
            canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject();
        };
        var rotation = function (id, _type, target) {
            if (target.isGroup) {
                groupRotated(id, target);
                return;
            }
            objectRotated(id, target);
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('rotated', rotation);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('rotated', rotation);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent, userId]);
    /** Register and handle local event. */
    React.useEffect(function () {
        var objectRotated = function (e, filteredState) {
            if (!e.target)
                return;
            var type = e.target.get('type');
            var activeIds = [];
            if (type === 'activeSelection') {
                if (!e.target || !e.target._objects)
                    return;
                var targetObjects = e.target._objects;
                targetObjects === null || targetObjects === void 0 ? void 0 : targetObjects.forEach(function (activeObject) {
                    if (activeObject.id && !shouldSerializeEvent(activeObject.id))
                        return;
                    activeIds.push(activeObject.id);
                });
                var groupPayloadData = e.target.toJSON([
                    'id'
                ]);
                var groupPayload = {
                    id: userId,
                    type: type,
                    target: { activeIds: activeIds, eTarget: groupPayloadData, isGroup: true },
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('rotated', groupPayload);
                if (!filteredState) {
                    var activeObjects = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects();
                    canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject();
                    var activeSelection = new fabric.fabric.ActiveSelection(activeObjects, {
                        canvas: canvas,
                    });
                    canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(activeSelection);
                    canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                    var payload = {
                        type: type,
                        svg: true,
                        target: null,
                        id: userId + ":group",
                    };
                    var event_1 = { event: payload, type: 'activeSelection', activeIds: activeIds };
                    var filtered = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) {
                        return !o.group;
                    });
                    var active = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
                    active === null || active === void 0 ? void 0 : active.set({ id: userId + ":group" });
                    undoRedoDispatch({
                        type: SET_GROUP,
                        payload: __spreadArrays(filtered, [active]),
                        canvasId: userId,
                        event: event_1,
                    });
                }
            }
            else {
                if (!e.target.id) {
                    return;
                }
                var id = e.target.id;
                var target = {
                    top: e.target.top,
                    left: e.target.left,
                    angle: e.target.angle,
                    scaleX: e.target.scaleX,
                    scaleY: e.target.scaleY,
                    flipX: e.target.flipX,
                    flipY: e.target.flipY,
                    originX: e.target.originX,
                    originY: e.target.originY,
                };
                var payload = {
                    id: id,
                    type: type,
                    target: { eTarget: target, isGroup: false },
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('rotated', payload);
                if (canvas && !filteredState) {
                    var event_2 = { event: payload, type: 'rotated' };
                    undoRedoDispatch({
                        type: SET,
                        payload: canvas.getObjects(),
                        canvasId: userId,
                        event: event_2,
                    });
                }
            }
        };
        var objectRotating = function (e) {
            objectRotated(e, true);
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:rotated', objectRotated);
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:rotating', objectRotating);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:rotated', objectRotated);
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:rotating', objectRotating);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
};

var useSynchronizedScaled = function (canvas, userId, shouldSerializeEvent, shouldHandleRemoteEvent, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /**
     * When the lines to fix are paintbrush type is necessary
     * create a new paintbrush path based on its current data
     * @param {ICanvasBrush} path
     */
    var fixPaintBrushLines = React.useCallback(function (path) {
        var _a, _b, _c, _d;
        if (!canvas || !userId)
            return;
        var brush = new PaintBrush(canvas, userId);
        var newPoints = ((_a = path.basePath) === null || _a === void 0 ? void 0 : _a.points).map(function (point) {
            return {
                x: point.x * Number(path.scaleX),
                y: point.y * Number(path.scaleY),
            };
        });
        var newPath = brush.modifyPaintBrushPath(String(path.id), newPoints, Number((_b = path.basePath) === null || _b === void 0 ? void 0 : _b.strokeWidth), String((_c = path.basePath) === null || _c === void 0 ? void 0 : _c.stroke), ((_d = path.basePath) === null || _d === void 0 ? void 0 : _d.bristles) || []);
        path.set(__assign({}, newPath));
        path.addWithUpdate();
        canvas.renderAll();
    }, [canvas, userId]);
    /**
     * Fix the lines of marker/paintbrush path to maintain
     * the same separation on them when marker/paintbrush path is scaled
     * @param {ICanvasBrush} path - Modified path
     */
    var fixLines = React.useCallback(function (path) {
        var _a;
        var top = path.top;
        var left = path.left;
        if (((_a = path.basePath) === null || _a === void 0 ? void 0 : _a.type) === 'paintbrush') {
            fixPaintBrushLines(path);
        }
        path._objects.forEach(function (line) {
            line.set({
                top: Number(line.top) / Number(path.scaleY),
                left: Number(line.left) / Number(path.scaleX),
            });
        });
        path.addWithUpdate();
        path.set({
            top: top,
            left: left,
        });
        path.addWithUpdate();
    }, [fixPaintBrushLines]);
    /**
     * Remove the given chalk/crayon path from canvas
     * and add a new one in the correct scale in remote whiteboard
     * @param {ICanvasBrush} path - Path to remove
     */
    var remakePathSync = React.useCallback(function (path) { return __awaiter(void 0, void 0, void 0, function () {
        var basePath, brush, newPoints, newRects, newObject, id, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!canvas || !userId)
                        return [2 /*return*/];
                    basePath = path.basePath;
                    brush = new ChalkBrush(canvas, userId, basePath === null || basePath === void 0 ? void 0 : basePath.type);
                    newPoints = (basePath === null || basePath === void 0 ? void 0 : basePath.points).map(function (point) {
                        return {
                            x: point.x * Number(path === null || path === void 0 ? void 0 : path.scaleX),
                            y: point.y * Number(path === null || path === void 0 ? void 0 : path.scaleY),
                        };
                    });
                    newRects = brush.createChalkEffect(newPoints, Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, brush.createChalkPath(String(path.id), newPoints, Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke), newRects)];
                case 2:
                    newObject = _a.sent();
                    if (!path)
                        return [2 /*return*/];
                    id = path.id;
                    newObject.set({
                        top: path.top,
                        left: path.left,
                        angle: path.angle,
                        flipX: path.flipX,
                        flipY: path.flipY,
                    });
                    // Id's are deleted to avoid add and remove event serializing
                    delete path.id;
                    delete newObject.id;
                    canvas.remove(path);
                    canvas.add(newObject);
                    canvas.renderAll();
                    // Id's are deleted to avoid add and remove event serializing
                    newObject.set({
                        id: id,
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.warn(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [canvas, userId]);
    /** Register and handle remote event. */
    React.useEffect(function () {
        var objectScaled = function (id, target) {
            if (!shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    var object = target.eTarget;
                    if (object) {
                        obj.set({
                            angle: object.angle,
                            top: object.top,
                            left: object.left,
                            scaleX: object.scaleX,
                            scaleY: object.scaleY,
                            flipX: object.flipX,
                            flipY: object.flipY,
                            originX: object.originX || 'left',
                            originY: object.originY || 'top',
                        });
                        obj.setCoords();
                        if (object.type === 'group-marker') {
                            fixLines(obj);
                        }
                        if (object.type === 'image-based') {
                            remakePathSync(obj);
                        }
                    }
                }
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        var groupScaled = function (id, target) {
            var _a, _b;
            var isLocalGroup = function (id, canvasId) {
                var object = id.split(':');
                if (!object.length) {
                    throw new Error('Invalid ID');
                }
                return object[0] === canvasId;
            };
            if (isLocalGroup(id, userId)) {
                return;
            }
            var localObjects = (canvas === null || canvas === void 0 ? void 0 : canvas.getObjects()) || [];
            var objectsToGroup = [];
            for (var i = 0; i < localObjects.length; i++) {
                if (target.activeIds) {
                    if (target.activeIds.includes(localObjects[i].id)) {
                        objectsToGroup.push(localObjects[i]);
                    }
                }
            }
            var _loop_1 = function (i) {
                var match = ((_b = (_a = target === null || target === void 0 ? void 0 : target.eTarget) === null || _a === void 0 ? void 0 : _a.objects) === null || _b === void 0 ? void 0 : _b.filter(function (o) { return o.id === objectsToGroup[i].id; })[0]) || {};
                objectsToGroup[i].set(match);
            };
            for (var i = 0; i < objectsToGroup.length; i++) {
                _loop_1(i);
            }
            var props = target === null || target === void 0 ? void 0 : target.eTarget;
            var sel = new fabric.fabric.ActiveSelection(objectsToGroup, {
                canvas: canvas,
                originX: props === null || props === void 0 ? void 0 : props.originX,
                originY: props === null || props === void 0 ? void 0 : props.originY,
                top: props === null || props === void 0 ? void 0 : props.top,
                left: props === null || props === void 0 ? void 0 : props.left,
                width: props === null || props === void 0 ? void 0 : props.width,
                height: props === null || props === void 0 ? void 0 : props.height,
                scaleX: props === null || props === void 0 ? void 0 : props.scaleX,
                scaleY: props === null || props === void 0 ? void 0 : props.scaleY,
                flipX: props === null || props === void 0 ? void 0 : props.flipX,
                flipY: props === null || props === void 0 ? void 0 : props.flipY,
                angle: props === null || props === void 0 ? void 0 : props.angle,
                skewX: props === null || props === void 0 ? void 0 : props.skewX,
                skewY: props === null || props === void 0 ? void 0 : props.skewY,
                oCoords: props === null || props === void 0 ? void 0 : props.oCoords,
                aCoords: props === null || props === void 0 ? void 0 : props.aCoords,
                matrixCache: props === null || props === void 0 ? void 0 : props.matrixCache,
                ownMatrixCache: props === null || props === void 0 ? void 0 : props.ownMatrixCache,
                snapAngle: props === null || props === void 0 ? void 0 : props.snapAngle,
                snapThreshold: props === null || props === void 0 ? void 0 : props.snapThreshold,
                group: props === null || props === void 0 ? void 0 : props.group,
                globalCompositeOperation: 'source-over',
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(sel);
            canvas === null || canvas === void 0 ? void 0 : canvas.requestRenderAll();
            canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject();
        };
        var scaled = function (id, _type, target) {
            if (target.isGroup) {
                groupScaled(id, target);
                return;
            }
            objectScaled(id, target);
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('scaled', scaled);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('scaled', scaled);
        };
    }, [
        canvas,
        eventController,
        fixLines,
        remakePathSync,
        shouldHandleRemoteEvent,
        userId,
    ]);
    React.useEffect(function () {
        /**
         * Handles the logic for scale objects on canvas
         * @param e - Scale or scaling event
         * @param filtered - Flag to know if is a scaling (true)
         * or scaled (false) event
         */
        var objectScaled = function (e, filtered) { return __awaiter(void 0, void 0, void 0, function () {
            var type, activeIds, groupObjects, groupPayloadData, groupPayload, activeObjects, activeSelection, payload, event_1, filteredPayload, active, type_1, brushTarget, brushType, id, target, _a, brush, basePath, newPoints, newRects, newObject, id_1, e_1, payload, event_2;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!e.target)
                            return [2 /*return*/];
                        type = e.target.get('type');
                        activeIds = [];
                        if (!(type === 'activeSelection' && e.target._objects)) return [3 /*break*/, 1];
                        groupObjects = e.target._objects || [];
                        groupObjects.forEach(function (activeObject) {
                            if (activeObject.id && !shouldSerializeEvent(activeObject.id))
                                return;
                            activeIds.push(activeObject.id);
                        });
                        groupPayloadData = e.target.toJSON(['id']);
                        groupPayload = {
                            id: userId,
                            type: type,
                            target: { activeIds: activeIds, eTarget: groupPayloadData, isGroup: true },
                        };
                        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('scaled', groupPayload);
                        if (!filtered) {
                            activeObjects = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects();
                            canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject();
                            activeSelection = new fabric.fabric.ActiveSelection(activeObjects, {
                                canvas: canvas,
                            });
                            canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(activeSelection);
                            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                            payload = {
                                type: type,
                                svg: true,
                                target: null,
                                id: userId + ":group",
                            };
                            event_1 = { event: payload, type: 'activeSelection', activeIds: activeIds };
                            filteredPayload = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) {
                                return !o.group;
                            });
                            active = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
                            undoRedoDispatch({
                                type: SET_GROUP,
                                payload: __spreadArrays(filteredPayload, [active]),
                                canvasId: userId,
                                event: event_1,
                            });
                        }
                        return [3 /*break*/, 9];
                    case 1:
                        if (!e.target.id) {
                            return [2 /*return*/];
                        }
                        if (!shouldSerializeEvent(e.target.id))
                            return [2 /*return*/];
                        type_1 = e.target.get('type');
                        brushTarget = e.target;
                        brushType = (_b = brushTarget.basePath) === null || _b === void 0 ? void 0 : _b.type;
                        id = brushTarget.id;
                        target = {
                            top: e.target.top,
                            left: e.target.left,
                            angle: e.target.angle,
                            scaleX: e.target.scaleX,
                            scaleY: e.target.scaleY,
                            flipX: e.target.flipX,
                            flipY: e.target.flipY,
                            originX: e.target.originX,
                            originY: e.target.originY,
                        };
                        _a = brushType;
                        switch (_a) {
                            case 'marker': return [3 /*break*/, 2];
                            case 'felt': return [3 /*break*/, 2];
                            case 'paintbrush': return [3 /*break*/, 2];
                            case 'chalk': return [3 /*break*/, 3];
                            case 'crayon': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 8];
                    case 2:
                        fixLines(brushTarget);
                        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                        target.type = 'group-marker';
                        return [3 /*break*/, 8];
                    case 3:
                        if (!canvas || !userId)
                            return [2 /*return*/];
                        if (filtered)
                            return [3 /*break*/, 8];
                        brush = new ChalkBrush(canvas, userId, brushType);
                        basePath = brushTarget.basePath;
                        newPoints = (basePath === null || basePath === void 0 ? void 0 : basePath.points).map(function (point) {
                            var _a, _b;
                            return {
                                x: point.x * Number((_a = e.target) === null || _a === void 0 ? void 0 : _a.scaleX),
                                y: point.y * Number((_b = e.target) === null || _b === void 0 ? void 0 : _b.scaleY),
                            };
                        });
                        newRects = brush.createChalkEffect(newPoints, Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth));
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, brush.createChalkPath(String(brushTarget.id), newPoints, Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth), String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke), newRects)];
                    case 5:
                        newObject = _c.sent();
                        if (!e.target)
                            return [2 /*return*/];
                        id_1 = brushTarget.id;
                        newObject.set({
                            top: e.target.top,
                            left: e.target.left,
                            angle: e.target.angle,
                            flipX: e.target.flipX,
                            flipY: e.target.flipY,
                        });
                        // Id's are deleted to avoid add and remove event serializing
                        delete e.target.id;
                        delete newObject.id;
                        canvas.remove(e.target);
                        canvas.add(newObject);
                        canvas.setActiveObject(newObject);
                        canvas.renderAll();
                        // Id's are deleted to avoid add and remove event serializing
                        newObject.set({
                            id: id_1,
                        });
                        target.type = 'image-based';
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _c.sent();
                        console.warn(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        payload = {
                            id: id,
                            type: type_1,
                            target: { eTarget: target, isGroup: false },
                        };
                        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('scaled', payload);
                        if (canvas && !filtered) {
                            event_2 = { event: payload, type: 'scaled' };
                            undoRedoDispatch({
                                type: SET,
                                payload: canvas.getObjects(),
                                canvasId: userId,
                                event: event_2,
                            });
                        }
                        _c.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        var scaling = function (e) {
            objectScaled(e, true);
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:scaled', objectScaled);
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:scaling', scaling);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:scaled', objectScaled);
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:scaling', scaling);
        };
    }, [
        canvas,
        eventSerializer,
        fixLines,
        shouldSerializeEvent,
        undoRedoDispatch,
        userId,
    ]);
};

var useSynchronizedSkewed = function (canvas, shouldSerializeEvent, shouldHandleRemoteEvent) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote events. */
    React.useEffect(function () {
        var skewed = function (id, target) {
            if (!shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    obj.set({
                        angle: target.angle,
                        top: target.top,
                        left: target.left,
                        scaleX: target.scaleX,
                        scaleY: target.scaleY,
                        flipX: target.flipX,
                        flipY: target.flipY,
                        skewX: target.skewX,
                        skewY: target.skewY,
                    });
                }
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('skewed', skewed);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('skewed', skewed);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent]);
    /** Register and handle local events. */
    React.useEffect(function () {
        var objectSkewed = function (e) {
            var _a;
            if (!((_a = e.target) === null || _a === void 0 ? void 0 : _a.id)) {
                return;
            }
            if (!shouldSerializeEvent(e.target.id))
                return;
            var type = e.target.get('type');
            var target = {
                top: e.target.top,
                left: e.target.left,
                angle: e.target.angle,
                scaleX: e.target.scaleX,
                scaleY: e.target.scaleY,
                skewX: e.target.skewX,
                skewY: e.target.skewY,
            };
            var payload = {
                type: type,
                target: target,
                id: e.target.id,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('skewed', payload);
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:skewed', objectSkewed);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:skewed', objectSkewed);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent]);
};

var useSynchronizedReconstruct = function (canvas, shouldHandleRemoteEvent, userId, undoRedoDispatch, setLocalImage, setLocalBackground) {
    var eventController = useSharedEventSerializer().state.eventController;
    var getId = function (id) { return (id ? id.split(':')[0] : null); };
    if (canvas) {
        canvas.preserveObjectStacking = true;
    }
    React.useEffect(function () {
        var reconstruct = function (id, target) {
            var _a;
            if (!shouldHandleRemoteEvent(id))
                return;
            if (typeof target === 'object' && !target.param) {
                target.param = JSON.stringify(target);
            }
            if (typeof target !== 'object') {
                target = {
                    param: 'false',
                };
            }
            var parsed = JSON.parse(target.param);
            if (parsed === false) {
                canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (object) {
                    if (getId(id) === getId(object.id)) {
                        canvas.remove(object);
                    }
                });
            }
            if (parsed.background && canvas) {
                canvas === null || canvas === void 0 ? void 0 : canvas.setBackgroundColor(parsed.background, function () { });
                canvas.renderAll();
                return;
            }
            if (parsed.backgroundImage && canvas) {
                canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
                if (parsed.backgroundImage.backgroundImageEditable) {
                    setLocalImage('');
                    setLocalBackground(false);
                    var src = ((_a = parsed.backgroundImage.basePath) === null || _a === void 0 ? void 0 : _a.imageData) || parsed.backgroundImage.src;
                    fabric.fabric.Image.fromURL(src, function (img) {
                        canvas === null || canvas === void 0 ? void 0 : canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                            scaleX: (canvas.width || 0) / (img.width || 0),
                            scaleY: (canvas.height || 0) / (img.height || 0),
                            originX: 'left',
                            originY: 'top',
                            id: id,
                        });
                        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                    });
                }
                else {
                    canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
                    setLocalImage(parsed.backroundImage.src);
                }
            }
            var objects = JSON.parse(target.param).objects;
            var reset = function (object) {
                var old = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) { return o.id === object.id; })[0];
                object.set({ selectable: false, evented: false });
                canvas === null || canvas === void 0 ? void 0 : canvas.remove(old);
                canvas === null || canvas === void 0 ? void 0 : canvas.add(object);
                canvas === null || canvas === void 0 ? void 0 : canvas.bringToFront(object);
            };
            var loadImage = function (object) {
                return new Promise(function (resolve) {
                    var _a = object; _a.src; var data = __rest(_a, ["src"]);
                    fabric.fabric.Image.fromURL(object.src, function (image) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            image.set(data);
                            reset(image);
                            resolve();
                            return [2 /*return*/];
                        });
                    }); });
                });
            };
            objects === null || objects === void 0 ? void 0 : objects.forEach(function (object) { return __awaiter(void 0, void 0, void 0, function () {
                var group, items_1, groupObject_1, newGroup;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(object && object.type === 'path')) return [3 /*break*/, 1];
                            group = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) { return o._objects && !o.basePath; })[0];
                            if (group && group.id) {
                                canvas === null || canvas === void 0 ? void 0 : canvas.remove(group);
                            }
                            fabric.fabric.Path.fromObject(object, function (path) {
                                reset(path);
                            });
                            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                            return [3 /*break*/, 9];
                        case 1:
                            if (!(object && object.type === 'polygon')) return [3 /*break*/, 2];
                            // Ignore is required, typing is wrong in definition file.
                            //@ts-ignore
                            fabric.fabric.Polygon.fromObject(object, function (o) {
                                reset(o);
                            });
                            return [3 /*break*/, 9];
                        case 2:
                            if (!(object && object.type === 'textbox')) return [3 /*break*/, 3];
                            fabric.fabric.Textbox.fromObject(object, function (text) {
                                reset(text);
                            });
                            return [3 /*break*/, 9];
                        case 3:
                            if (!(object && object.type === 'rect')) return [3 /*break*/, 4];
                            // Ignore is required, typing is wrong in definition file.
                            //@ts-ignore
                            fabric.fabric.Rect.fromObject(object, function (o) {
                                reset(o);
                            });
                            return [3 /*break*/, 9];
                        case 4:
                            if (!(object && object.type === 'ellipse')) return [3 /*break*/, 5];
                            // Ignore is required, typing is wrong in definition file.
                            //@ts-ignore
                            fabric.fabric.Ellipse.fromObject(object, function (o) {
                                reset(o);
                            });
                            return [3 /*break*/, 9];
                        case 5:
                            if (!(object && object.type === 'triangle')) return [3 /*break*/, 6];
                            // Ignore is required, typing is wrong in definition file.
                            //@ts-ignore
                            fabric.fabric.Triangle.fromObject(object, function (o) {
                                reset(o);
                            });
                            return [3 /*break*/, 9];
                        case 6:
                            if (!(object && object.type === 'image')) return [3 /*break*/, 8];
                            if (object.joinedIds) {
                                canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (o) {
                                    var _a;
                                    if (((_a = object.joinedIds) === null || _a === void 0 ? void 0 : _a.indexOf(o.id)) !==
                                        -1) {
                                        canvas.remove(o);
                                    }
                                });
                            }
                            return [4 /*yield*/, loadImage(object)];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            if (object) {
                                items_1 = [];
                                fabric.fabric.Group.fromObject(object, function (group) {
                                    groupObject_1 = group;
                                    var old = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) { return o.id === object.id; })[0];
                                    if (group.getObjects()) {
                                        group.getObjects().forEach(function (o) {
                                            var oldO = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (oldObject) { return oldObject.id === o.id; })[0];
                                            canvas === null || canvas === void 0 ? void 0 : canvas.remove(oldO);
                                            items_1.push(o);
                                        });
                                    }
                                    group.set({ selectable: false, evented: false });
                                    canvas === null || canvas === void 0 ? void 0 : canvas.remove(old);
                                    canvas === null || canvas === void 0 ? void 0 : canvas.add(group);
                                });
                                canvas === null || canvas === void 0 ? void 0 : canvas.remove(groupObject_1);
                                // If object is a custom brush
                                if (object.basePath) {
                                    newGroup = new fabric.fabric.Group(items_1);
                                    newGroup.set(__assign({}, object));
                                    canvas === null || canvas === void 0 ? void 0 : canvas.add(newGroup);
                                }
                                else {
                                    items_1.forEach(function (o) {
                                        canvas === null || canvas === void 0 ? void 0 : canvas.add(o);
                                    });
                                }
                            }
                            _a.label = 9;
                        case 9:
                            undoRedoDispatch({
                                type: SET_OTHER,
                                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                                canvasId: userId,
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('reconstruct', reconstruct);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('reconstruct', reconstruct);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
    ]);
};

/**
 * Class to manage laser pointer.
 */
var Laser = /** @class */ (function () {
    /**
     * Class constructor
     * @param canvas Original canvas
     * @param color Color of pointer
     * @param fadeDelay Delay of trail fade
     * @param trailLength Length of trail
     * @param lineWidth Width of trail line
     * @param radius Radius of pointer
     * @param alpha Indicates level of alpha for fading line
     */
    function Laser(canvas, color, fadeDelay, trailLength, lineWidth, radius, alpha) {
        var _a;
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText =
            'position: absolute; z-index: 3; pointer-events: none;';
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.fadeInterval = null;
        this.clear = false;
        this.color = color;
        this.fadeDelay = fadeDelay && fadeDelay > 25 ? 25 : fadeDelay || 15;
        this.lineWidth = lineWidth ? lineWidth : 5;
        this.radius = radius ? radius : 2.5;
        this.alpha = alpha ? alpha / 100 : 0.01;
        // Create temporary canvas for laser pointer.
        var fabricCanvas = canvas.getElement();
        (_a = fabricCanvas.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(this.canvas, fabricCanvas);
        this.positions = [];
        this.pointer = { x: 0, y: 0 };
        this.motionTrailLength =
            trailLength && trailLength > 100 ? 100 : trailLength || 20;
        this.context = this.canvas.getContext('2d');
    }
    /**
     * Converts 6 digit hex to rgb
     * @param color 6 digit hex color
     */
    Laser.prototype.hexToRgb = function (color) {
        var parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return parsed
            ? {
                r: parseInt(parsed[1], 16),
                g: parseInt(parsed[2], 16),
                b: parseInt(parsed[3], 16),
            }
            : null;
    };
    /**
     * Stores last positions of pointer
     * @param xPos
     * @param yPos
     */
    Laser.prototype.storeLastPosition = function (xPos, yPos) {
        this.positions.push({
            x: xPos,
            y: yPos,
        });
        if (this.positions.length > this.motionTrailLength) {
            this.positions.shift();
        }
    };
    /**
     * Generates mid point between two points.
     * @param c1 Coordinate
     * @param c2 Coordinate
     */
    Laser.prototype.getMidpoint = function (c1, c2) {
        return (c1 + c2) / 2;
    };
    /**
     * Creates additional coordinates between coordinates provided
     * for a smoother gradient effect.
     */
    Laser.prototype.generateMidpoints = function () {
        var points = [];
        for (var i = 0; i < this.positions.length; i++) {
            points.push(this.positions[i]);
            if (this.positions[i + 1]) {
                var a = this.positions[i];
                var b = this.positions[i + 1];
                var midpoint = {
                    x: this.getMidpoint(a.x, b.x),
                    y: this.getMidpoint(a.y, b.y),
                };
                points.push(midpoint);
            }
        }
        return points;
    };
    /**
     * Draws main pointer in exact mouse coordinate.
     */
    Laser.prototype.buildPointer = function () {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.pointer.x, this.pointer.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
    };
    /**
     * Generates fading trail.
     * @param points Array of coordinates
     * @param colorProps RGB values of color
     */
    Laser.prototype.buildLine = function (points, colorProps) {
        var i = 0;
        this.context.strokeStyle = "rgba(" + colorProps.r + ", " + colorProps.g + ", " + colorProps.b + ", " + this.alpha + ")";
        this.context.lineWidth = this.lineWidth;
        this.context.beginPath();
        this.context.moveTo(points[0], points[0]);
        points.shift();
        for (i; i < points.length; i++) {
            this.context.lineTo(points[i].x, points[i].y);
            this.context.strokeStyle = "rgba(" + colorProps.r + ", " + colorProps.g + ", " + colorProps.b + ", " + this.alpha * (i * 10) + ")";
            this.context.stroke();
            this.context.beginPath();
            this.context.moveTo(points[i].x, points[i].y);
        }
    };
    /**
     * Fades trailing path
     */
    Laser.prototype.fadeAway = function () {
        var _this = this;
        var context = this.context;
        // let alpha = this.alpha;
        var colorProps = this.hexToRgb(this.color);
        this.fadeInterval = setInterval(function () {
            context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.positions.shift();
            var points = _this.generateMidpoints();
            if (!_this.clear) {
                _this.buildPointer();
            }
            if (points.length) {
                clearInterval(_this.fadeInterval);
                if (!colorProps) {
                    throw new Error('Invalid color!');
                }
                _this.buildLine(points, colorProps);
                _this.fadeAway();
            }
        }, this.fadeDelay);
    };
    /**
     * Updates pointer position and generates light trail.
     * @param pointer
     */
    Laser.prototype.update = function (pointer) {
        this.pointer = pointer;
        this.clear = false;
        // Clear interval that removes fading trail.
        if (this.fadeInterval) {
            clearInterval(this.fadeInterval);
        }
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Store latest pointer position.
        this.storeLastPosition(this.pointer.x, this.pointer.y);
        var points = this.generateMidpoints();
        var colorProps = this.hexToRgb(this.color);
        this.context.beginPath(); // Start path
        if (!colorProps) {
            throw new Error('Only valid colors allowed!');
        }
        this.buildPointer();
        this.buildLine(points, colorProps);
        this.fadeAway();
    };
    /**
     * Clears pointer
     */
    Laser.prototype.clearPointer = function () {
        this.clear = true;
    };
    /**
     * Removes temporary canvas for laser pointer.
     */
    Laser.prototype.remove = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.positions = [];
        this.canvas.remove();
    };
    return Laser;
}());

/**
 * Handles laser pointer events.
 * @param canvas Canvas
 * @param showPointer Indicates if pointer should be shown.
 * @param universalPermits Indicates if user has universal permits, such as a teacher.
 * @param shouldHandleRemoteEvent Method that checks if an event should be handled.
 * @param userId User ID.
 * @param laserColor Color of laser.
 * @param laserIsActive Indicates if laser tool is sselected.
 * @param allowPointer Indicates if user has permission to use laser pointer.
 */
var useSynchronizedPointer = function (canvas, allowPointer, shouldHandleRemoteEvent, userId, laserColor, laserIsActive) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Emits local event. */
    React.useEffect(function () {
        var trail;
        var id = userId + ":laser";
        /**
         * Handles moving event for laser pointer. Emits event to other users.
         * @param e Canvas event.
         */
        var move = function (e) {
            if (e.e.which && e.e.buttons && canvas) {
                canvas.defaultCursor = 'none';
                canvas.hoverCursor = 'none';
                canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (o) {
                    o.set({ hoverCursor: 'none' });
                });
                trail.update(e.pointer);
                var top_1 = e.pointer.y;
                var left = e.pointer.x;
                var payload = {
                    type: 'pointer',
                    target: { top: top_1, left: left, fill: laserColor },
                    id: id,
                };
                eventSerializer.push('pointer', payload);
            }
            else if (trail && canvas && !trail.clear) {
                canvas.defaultCursor = 'default';
                canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().forEach(function (o) {
                    o.set({ hoverCursor: 'default' });
                });
                var payload = {
                    type: 'pointer',
                    target: { groupClear: true },
                    id: id,
                };
                eventSerializer.push('pointer', payload);
                trail.clearPointer();
            }
        };
        if (laserIsActive && allowPointer) {
            trail = new Laser(canvas, laserColor, 20, 25);
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:move', move);
        }
        return function () {
            if (trail) {
                trail.remove();
                var payload = {
                    type: 'pointer',
                    target: false,
                    id: id,
                };
                eventSerializer.push('pointer', payload);
            }
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:move', move);
        };
    }, [
        laserIsActive,
        canvas,
        allowPointer,
        eventSerializer,
        laserColor,
        userId,
    ]);
    /** Register and handle remote moved event. */
    React.useEffect(function () {
        var trail;
        /**
         * Handles moving event for laser pointer. Receives event.
         * @param id User ID. Used for determining if event should be handled.
         * @param target Properites for laser pointer.
         */
        var moved = function (id, target) {
            if (!shouldHandleRemoteEvent(id)) {
                return;
            }
            if (!trail && canvas && target && !target.groupClear) {
                trail = new Laser(canvas, target.fill || '#000000', 20, 25);
            }
            else if (trail && target.groupClear) {
                trail.clearPointer();
            }
            else if (trail && !target) {
                trail.remove();
                trail = null;
            }
            else if (!trail && !canvas) {
                return;
            }
            trail === null || trail === void 0 ? void 0 : trail.update({ x: target.left, y: target.top });
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('pointer', moved);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('pointer', moved);
        };
    }, [canvas, eventController, allowPointer, shouldHandleRemoteEvent]);
};

var useSynchronizedSetToolbarPermissions = function (canvas, userId, shouldHandleRemoteEvent, updatePermissions) {
    var eventController = useSharedEventSerializer().state.eventController;
    React.useEffect(function () {
        var setToolbarPermissions = function (id, target) {
            if (!shouldHandleRemoteEvent(id))
                return;
            updatePermissions(UPDATE_RECEIVED, target);
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('setToolbarPermissions', setToolbarPermissions);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('setToolbarPermissions', setToolbarPermissions);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        userId,
        updatePermissions,
    ]);
};

var useSynchronizedFontColorChanged = function (canvas, userId, shouldHandleRemoteEvent, undoRedoDispatch) {
    var eventController = useSharedEventSerializer().state.eventController;
    React.useEffect(function () {
        var colorChanged = function (id, objectType, target) {
            if (id && !shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                if (obj.id && obj.id === id) {
                    if (objectType === 'textbox') {
                        obj.set({
                            fill: target.fill,
                        });
                    }
                }
            });
            undoRedoDispatch({
                type: SET_OTHER,
                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                canvasId: userId,
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('fontColorChanged', colorChanged);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('fontColorChanged', colorChanged);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
    ]);
};

/**x
 * Class to handle realtime creation of objects.
 */
var Realtime = /** @class */ (function () {
    /**
     *
     * @param width Canvas width
     * @param height Canvas height
     * @param id User / instance id
     */
    function Realtime(width, height, id) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = id;
        this.canvas.style.cssText =
            'position: absolute; z-index: 3; pointer-events: none;';
        this.canvas.width = width;
        this.canvas.height = height;
        this.pointer = null;
        this.points = [];
        this.context = null;
        this.type = null;
        this.tempCanvas = null;
        this.width = width;
        this.height = height;
    }
    /**
     * Initiates realtime process for adding elements to canvas.
     * @param canvas Canavs
     * @param type type of object being added
     * @param color Coloro of object being added
     * @param lineWidth Line width of object being added
     */
    Realtime.prototype.init = function (canvas, type, color, lineWidth) {
        var _a;
        if (type !== 'pencil' && type !== 'text') {
            this.tempCanvas = new fabric.fabric.Canvas(this.canvas, {
                width: this.width,
                height: this.height,
            });
        }
        var fabricCanvas = canvas.getElement();
        (_a = fabricCanvas.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(this.canvas, fabricCanvas);
        this.context = this.canvas.getContext('2d');
        this.color = this.hexToRgb(color);
        this.lineWidth = lineWidth;
        this.type = type;
    };
    /**
     * Checks if instance is initiated.
     */
    Realtime.prototype.isInitiated = function () {
        return this.context !== null;
    };
    /**
     * Converts 6 digit hex to rgb
     * @param color 6 digit hex color
     */
    Realtime.prototype.hexToRgb = function (color) {
        var parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return parsed
            ? {
                r: parseInt(parsed[1], 16),
                g: parseInt(parsed[2], 16),
                b: parseInt(parsed[3], 16),
            }
            : null;
    };
    /**
     *
     * @param target Contains shape information.
     */
    Realtime.prototype.draw = function (target) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var shape;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!((_a = target.shape) === null || _a === void 0 ? void 0 : _a.basePath)) return [3 /*break*/, 1];
                        switch (this.type) {
                            case 'pencil': {
                                this.drawPath(target.coordinates);
                                break;
                            }
                            case 'rectangle': {
                                this.rectDraw(target);
                                break;
                            }
                            case 'circle': {
                                this.ellipseDraw(target);
                                break;
                            }
                            case 'triangle': {
                                this.triangleDraw(target);
                                break;
                            }
                            case 'pentagon': {
                                this.pentagonDraw(target);
                                break;
                            }
                            case 'hexagon': {
                                this.hexagonDraw(target);
                                break;
                            }
                            case 'star': {
                                this.starDraw(target);
                                break;
                            }
                            case 'chatBubble': {
                                this.chatDraw(target);
                                break;
                            }
                            case 'arrow': {
                                this.arrowDraw(target);
                                break;
                            }
                            default: {
                                this.customBrushPath(target);
                            }
                        }
                        return [3 /*break*/, 3];
                    case 1:
                        if (!this.type) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.customBrushShape(this.type, target)];
                    case 2:
                        shape = _d.sent();
                        if (shape) {
                            this.clear();
                            (_b = this.tempCanvas) === null || _b === void 0 ? void 0 : _b.add(shape);
                            (_c = this.tempCanvas) === null || _c === void 0 ? void 0 : _c.renderAll();
                        }
                        _d.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Draws a path.
     * @param points Path points
     */
    Realtime.prototype.drawPath = function (points) {
        if (!points) {
            return;
        }
        var i = 0;
        this.clear();
        this.context.strokeStyle = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + ",1)";
        this.context.lineCap = 'round';
        this.context.lineWidth = this.lineWidth;
        this.context.beginPath();
        this.context.moveTo(points[0], points[0]);
        points.shift();
        for (i; i < points.length; i++) {
            this.context.lineTo(points[i].x, points[i].y);
        }
        this.context.stroke();
    };
    /**
     * Draws a shape
     * @param target Canvas target
     */
    Realtime.prototype.rectDraw = function (target) {
        var _a, _b, _c;
        this.clear();
        if (!target || !target.shape) {
            return;
        }
        var rect = rectangle(target.shape.width, target.shape.height, target.shape.stroke, false, target.shape.strokeWidth, (_a = target.shape.strokeDashArray) === null || _a === void 0 ? void 0 : _a.length);
        rect.set({
            top: target.shape.top,
            left: target.shape.left,
            originX: target.shape.originX,
            originY: target.shape.originY,
        });
        (_b = this.tempCanvas) === null || _b === void 0 ? void 0 : _b.add(rect);
        (_c = this.tempCanvas) === null || _c === void 0 ? void 0 : _c.renderAll();
    };
    /**
     * Draws circle
     * @param target Data of shape to be drawn.
     */
    Realtime.prototype.ellipseDraw = function (target) {
        var _a, _b, _c;
        this.clear();
        var ellipse = circle(target.shape.width / 2, target.shape.height / 2, target.shape.stroke, false, target.shape.strokeWidth, (_a = target.shape.strokeDashArray) === null || _a === void 0 ? void 0 : _a.length);
        ellipse.set({
            top: target.shape.top,
            left: target.shape.left,
            originX: target.shape.originX,
            originY: target.shape.originY,
        });
        (_b = this.tempCanvas) === null || _b === void 0 ? void 0 : _b.add(ellipse);
        (_c = this.tempCanvas) === null || _c === void 0 ? void 0 : _c.renderAll();
    };
    Realtime.prototype.triangleDraw = function (target) {
        var _a, _b, _c, _d;
        (_a = this.tempCanvas) === null || _a === void 0 ? void 0 : _a.clear();
        var triangle$1 = triangle(target.shape.width, target.shape.height, target.shape.stroke, false, target.shape.strokeWidth, (_b = target.shape.strokeDashArray) === null || _b === void 0 ? void 0 : _b.length);
        triangle$1.set({
            top: target.shape.top,
            left: target.shape.left,
            originX: target.shape.originX,
            originY: target.shape.originY,
        });
        (_c = this.tempCanvas) === null || _c === void 0 ? void 0 : _c.add(triangle$1);
        (_d = this.tempCanvas) === null || _d === void 0 ? void 0 : _d.renderAll();
    };
    /**
     *
     * @param target Shape information
     */
    Realtime.prototype.shapeProps = function (shape) {
        return {
            top: shape === null || shape === void 0 ? void 0 : shape.top,
            left: shape === null || shape === void 0 ? void 0 : shape.left,
            originX: shape === null || shape === void 0 ? void 0 : shape.originX,
            originY: shape === null || shape === void 0 ? void 0 : shape.originY,
            scaleX: shape === null || shape === void 0 ? void 0 : shape.scaleX,
            scaleY: shape === null || shape === void 0 ? void 0 : shape.scaleY,
        };
    };
    /**
     * Draws pentagon
     * @param target Shape information
     */
    Realtime.prototype.pentagonDraw = function (target) {
        var _a, _b, _c, _d;
        (_a = this.tempCanvas) === null || _a === void 0 ? void 0 : _a.clear();
        var pentagon$1 = pentagon(target.shape.stroke, false, target.shape.strokeWidth, (_b = target.shape.strokeDashArray) === null || _b === void 0 ? void 0 : _b.length);
        // @ts-ignore
        pentagon$1.set(this.shapeProps(target.shape));
        (_c = this.tempCanvas) === null || _c === void 0 ? void 0 : _c.add(pentagon$1);
        (_d = this.tempCanvas) === null || _d === void 0 ? void 0 : _d.renderAll();
    };
    /**
     * Draws hegaxon
     * @param target Shape information
     */
    Realtime.prototype.hexagonDraw = function (target) {
        var _a, _b, _c, _d;
        (_a = this.tempCanvas) === null || _a === void 0 ? void 0 : _a.clear();
        var hexagon$1 = hexagon(target.shape.stroke, false, target.shape.strokeWidth, (_b = target.shape.strokeDashArray) === null || _b === void 0 ? void 0 : _b.length);
        // @ts-ignore
        hexagon$1.set(this.shapeProps(target.shape));
        (_c = this.tempCanvas) === null || _c === void 0 ? void 0 : _c.add(hexagon$1);
        (_d = this.tempCanvas) === null || _d === void 0 ? void 0 : _d.renderAll();
    };
    /**
     * Draws star
     * @param target Shape inforamtion
     */
    Realtime.prototype.starDraw = function (target) {
        var _a, _b, _c, _d;
        (_a = this.tempCanvas) === null || _a === void 0 ? void 0 : _a.clear();
        var star$1 = star(2, 2, target.shape.stroke, false, target.shape.strokeWidth, (_b = target.shape.strokeDashArray) === null || _b === void 0 ? void 0 : _b.length);
        // @ts-ignore
        star$1.set(this.shapeProps(target.shape));
        (_c = this.tempCanvas) === null || _c === void 0 ? void 0 : _c.add(star$1);
        (_d = this.tempCanvas) === null || _d === void 0 ? void 0 : _d.renderAll();
    };
    /**
     * Draws chat bubble
     * @param target Shape information
     */
    Realtime.prototype.chatDraw = function (target) {
        var _a, _b, _c, _d;
        (_a = this.tempCanvas) === null || _a === void 0 ? void 0 : _a.clear();
        var chat$1 = chat(2, 2, target.shape.stroke, false, target.shape.strokeWidth, (_b = target.shape.strokeDashArray) === null || _b === void 0 ? void 0 : _b.length);
        // @ts-ignore
        chat$1.set(this.shapeProps(target.shape));
        (_c = this.tempCanvas) === null || _c === void 0 ? void 0 : _c.add(chat$1);
        (_d = this.tempCanvas) === null || _d === void 0 ? void 0 : _d.renderAll();
    };
    /**
     * Draws arrow
     * @param target Shape information
     */
    Realtime.prototype.arrowDraw = function (target) {
        var _a, _b, _c, _d;
        (_a = this.tempCanvas) === null || _a === void 0 ? void 0 : _a.clear();
        var arrow$1 = arrow(2, 2, target.shape.stroke, false, target.shape.strokeWidth, (_b = target.shape.strokeDashArray) === null || _b === void 0 ? void 0 : _b.length);
        // @ts-ignore
        arrow$1.set(this.shapeProps(target.shape));
        (_c = this.tempCanvas) === null || _c === void 0 ? void 0 : _c.add(arrow$1);
        (_d = this.tempCanvas) === null || _d === void 0 ? void 0 : _d.renderAll();
    };
    /**
     * Real time text drawing process.
     * @param target
     */
    Realtime.prototype.textDraw = function (target) {
        this.clear();
        this.context.font = target.fontSize + "px " + target.fontFamily;
        this.context.fillStyle = target.fill || '#000000';
        this.context.fillText(target.text, target.left, target.top + target.height - 7);
    };
    /**
     * Clears temporary canvas.
     */
    Realtime.prototype.clear = function () {
        var _a;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        (_a = this.tempCanvas) === null || _a === void 0 ? void 0 : _a.clear();
    };
    /**
     * Removes / destroys temporary canvas.
     */
    Realtime.prototype.remove = function () {
        var _a;
        if (!this.isInitiated()) {
            return;
        }
        this.clear();
        (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.remove();
    };
    /**
     * Fix the dimensions of the given shape
     * @param newShape - Shape to set dimensions
     * @param targetShape - Reference shape to set dimensions in the new one
     * @param brushType - Shape Brush Type
     */
    Realtime.prototype.fixCustomBrushShapeDimensions = function (newShape, targetShape, brushType) {
        var _a, _b, _c, _d;
        newShape.set({
            scaleX: targetShape.scaleX,
            scaleY: targetShape.scaleY,
            top: targetShape.top,
            left: targetShape.left,
            originX: targetShape.originX,
            originY: targetShape.originY,
        });
        if (brushType === 'paintbrush' ||
            brushType === 'marker' ||
            brushType === 'felt') {
            var scaleX = Number(targetShape.width) / Number(newShape.width);
            var scaleY = Number(targetShape.height) / Number(newShape.height);
            var top_1 = targetShape.top;
            var left = targetShape.left;
            newShape.set({
                top: targetShape.top,
                left: targetShape.left,
                width: targetShape.width,
                height: targetShape.height,
                scaleX: scaleX,
                scaleY: scaleY,
            });
            if (brushType === 'paintbrush') {
                var brush = new PaintBrush(this.tempCanvas, this.canvas.id);
                var newPoints = ((_a = newShape.basePath) === null || _a === void 0 ? void 0 : _a.points).map(function (point) {
                    return {
                        x: point.x * Number(newShape === null || newShape === void 0 ? void 0 : newShape.scaleX),
                        y: point.y * Number(newShape === null || newShape === void 0 ? void 0 : newShape.scaleY),
                    };
                });
                var newPath = brush.modifyPaintBrushPath('provisional', newPoints, Number((_b = newShape.basePath) === null || _b === void 0 ? void 0 : _b.strokeWidth), String((_c = newShape.basePath) === null || _c === void 0 ? void 0 : _c.stroke), ((_d = newShape.basePath) === null || _d === void 0 ? void 0 : _d.bristles) || []);
                newShape.set(__assign({}, newPath));
                newShape.addWithUpdate();
                newShape.set({
                    top: top_1,
                    left: left,
                });
                newShape.addWithUpdate();
            }
            else {
                newShape.forEachObject(function (line) {
                    line.set({
                        top: Number(line.top) / Number(newShape === null || newShape === void 0 ? void 0 : newShape.scaleY),
                        left: Number(line.left) / Number(newShape === null || newShape === void 0 ? void 0 : newShape.scaleX),
                    });
                });
                newShape.addWithUpdate();
                newShape.set({
                    top: top_1,
                    left: left,
                });
                newShape.addWithUpdate();
            }
        }
        return newShape;
    };
    /**
     * Draws a custom brush shape in tempCanvas
     * @param shape - Shape to draw
     * @param target - Object with the required properties to render the shape
     */
    Realtime.prototype.customBrushShape = function (shape, target) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, original, brushType, lineWidth, penColor, brush, newShape, _a, _b, min_1, max_1, penPoints, imagePromise;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        userId = this.canvas.id;
                        original = shapePoints[shape];
                        brushType = target.shape.basePath.type;
                        lineWidth = target.shape.basePath.strokeWidth;
                        penColor = target.shape.basePath.stroke;
                        newShape = null;
                        if (!original) {
                            return [2 /*return*/];
                        }
                        _a = brushType;
                        switch (_a) {
                            case 'pen': return [3 /*break*/, 1];
                            case 'marker': return [3 /*break*/, 2];
                            case 'felt': return [3 /*break*/, 2];
                            case 'paintbrush': return [3 /*break*/, 3];
                            case 'chalk': return [3 /*break*/, 4];
                            case 'crayon': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        brush = new PenBrush(this.tempCanvas, userId);
                        _b = brush.setMinMaxWidth(lineWidth), min_1 = _b.min, max_1 = _b.max;
                        penPoints = original.points.map(function (point) {
                            return {
                                x: point.x,
                                y: point.y,
                                width: brush.getRandomInt(min_1, max_1),
                            };
                        });
                        newShape = brush.createPenPath('provisional', penPoints, lineWidth, penColor);
                        return [3 /*break*/, 6];
                    case 2:
                        brush = new MarkerBrush(this.tempCanvas, userId, brushType);
                        newShape = brush.createMarkerPath('provisional', original.points, lineWidth, penColor);
                        return [3 /*break*/, 6];
                    case 3:
                        brush = new PaintBrush(this.tempCanvas, userId);
                        newShape = brush.modifyPaintBrushPath('provisional', original.points, lineWidth, penColor, target.shape.basePath.bristles);
                        return [3 /*break*/, 6];
                    case 4:
                        imagePromise = new Promise(function (resolve, reject) {
                            try {
                                fabric.fabric.Image.fromURL(target.shape.basePath.imageData, function (image) {
                                    resolve(image);
                                });
                            }
                            catch (e) {
                                reject(e);
                            }
                        });
                        return [4 /*yield*/, imagePromise];
                    case 5:
                        newShape = _c.sent();
                        _c.label = 6;
                    case 6:
                        if (!newShape)
                            return [2 /*return*/];
                        newShape = this.fixCustomBrushShapeDimensions(newShape, target.shape, brushType);
                        return [2 /*return*/, newShape];
                }
            });
        });
    };
    /**
     * Draws a custom brush path in tempCanvas
     * @param target - Object with the required properties to render the shape
     */
    Realtime.prototype.customBrushPath = function (target) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var brush, newPath, _c, _d, min_2, max_2, points, bristles, clearRects;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this.tempCanvas)
                            return [2 /*return*/];
                        this.clear();
                        _c = target.type;
                        switch (_c) {
                            case 'dashed': return [3 /*break*/, 1];
                            case 'pen': return [3 /*break*/, 2];
                            case 'marker': return [3 /*break*/, 3];
                            case 'felt': return [3 /*break*/, 3];
                            case 'paintbrush': return [3 /*break*/, 4];
                            case 'chalk': return [3 /*break*/, 5];
                            case 'crayon': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        brush = new DashedBrush(this.tempCanvas, this.canvas.id);
                        newPath = brush.createDashedPath('provisional', target.coordinates, target.lineWidth, target.color);
                        return [3 /*break*/, 7];
                    case 2:
                        brush = new PenBrush(this.tempCanvas, this.canvas.id);
                        _d = brush.setMinMaxWidth(target.lineWidth), min_2 = _d.min, max_2 = _d.max;
                        points = target.coordinates.map(function (point) {
                            return {
                                x: point.x,
                                y: point.y,
                                width: brush.getRandomInt(min_2, max_2),
                            };
                        });
                        newPath = brush.createPenPath('provisional', points, target.lineWidth, target.color);
                        return [3 /*break*/, 7];
                    case 3:
                        brush = new MarkerBrush(this.tempCanvas, this.canvas.id, target.type);
                        newPath = brush.createMarkerPath('provisional', target.coordinates, target.lineWidth, target.color);
                        return [3 /*break*/, 7];
                    case 4:
                        brush = new PaintBrush(this.tempCanvas, this.canvas.id);
                        bristles = brush.makeBrush(target.color, target.lineWidth);
                        newPath = brush.modifyPaintBrushPath('provisional', target.coordinates, target.lineWidth, target.color, bristles);
                        return [3 /*break*/, 7];
                    case 5:
                        // const currentCanvas = new fabric.Canvas(this.canvas);
                        // currentCanvas.freeDrawingBrush = new ChalkBrush(
                        //   currentCanvas,
                        //   this.canvas.id,
                        //   target.type
                        // );
                        // currentCanvas.freeDrawingBrush.color = target.color;
                        // currentCanvas.freeDrawingBrush.width = target.lineWidth;
                        // currentCanvas.isDrawingMode = true;
                        // (target.coordinates as ICoordinate[]).forEach(
                        //   (coordinate: { x: number; y: number }, index: number) => {
                        //     if (!index) {
                        //       currentCanvas?.trigger('mouse:down', {
                        //         pointer: {
                        //           x: coordinate.x,
                        //           y: coordinate.y,
                        //         },
                        //       });
                        //       return;
                        //     }
                        //     currentCanvas?.trigger('mouse:move', {
                        //       pointer: {
                        //         x: coordinate.x,
                        //         y: coordinate.y,
                        //       },
                        //     });
                        //   }
                        // );
                        brush = new ChalkBrush(this.tempCanvas, this.canvas.id, target.type);
                        clearRects = brush.createChalkEffect(target.coordinates, target.lineWidth);
                        return [4 /*yield*/, brush.createChalkPath('provisional', target.coordinates, target.lineWidth, target.color, clearRects)];
                    case 6:
                        newPath = _e.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        if (!newPath)
                            return [2 /*return*/];
                        (_a = this.tempCanvas) === null || _a === void 0 ? void 0 : _a.add(newPath);
                        (_b = this.tempCanvas) === null || _b === void 0 ? void 0 : _b.renderAll();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Realtime;
}());

/**
 * Handles laser pointer events.
 * @param canvas Canvas
 * @param shouldHandleRemoteEvent Method that checks if an event should be handled.
 * @param userId User ID.
 */
var useSynchronizedRealtime = function (canvas, shouldHandleRemoteEvent, userId) {
    var eventController = useSharedEventSerializer().state.eventController;
    var rt;
    rt = new Realtime(canvas === null || canvas === void 0 ? void 0 : canvas.getWidth(), canvas === null || canvas === void 0 ? void 0 : canvas.getHeight(), userId);
    /** Register and handle remote moved event. */
    React.useEffect(function () {
        /**
         * Handles moving event for objects. Receives event.
         * @param id User ID. Used for determining if event should be handled.
         * @param target Properites for object.
         */
        var moved = function (
        // Event emitter automatically sends ID, required but not needed in this case.
        // @ts-ignore
        id, target) {
            if (target.eventType !== 'added' && userId !== id) {
                if (rt && !rt.isInitiated() && target.type === 'pencil') {
                    rt.init(canvas, 'pencil', target.color, target.lineWidth);
                }
                else if (rt && !rt.isInitiated() && target.type === 'rectangle') {
                    rt.init(canvas, 'rectangle', target.shape.stroke, target.shape.strokeWidth);
                }
                else if (rt && !rt.isInitiated() && target.type === 'circle') {
                    rt.init(canvas, 'circle', target.shape.stroke, target.shape.strokeWidth);
                }
                else if (rt && !rt.isInitiated() && target.type === 'text') {
                    rt.init(canvas, 'text', target.shape.stroke, target.shape.strokeWidth);
                }
                else if (rt && !rt.isInitiated() && target.type === 'triangle') {
                    rt.init(canvas, 'triangle', target.shape.stroke, target.shape.strokeWidth);
                }
                else if (rt && !rt.isInitiated() && target.type === 'pentagon') {
                    rt.init(canvas, 'pentagon', target.shape.stroke, target.shape.strokeWidth);
                }
                else if (rt && !rt.isInitiated() && target.type === 'hexagon') {
                    rt.init(canvas, 'hexagon', target.shape.stroke, target.shape.strokeWidth);
                }
                else if (rt && !rt.isInitiated() && target.type === 'arrow') {
                    rt.init(canvas, 'arrow', target.shape.stroke, target.shape.strokeWidth);
                }
                else if (rt && !rt.isInitiated() && target.type === 'star') {
                    rt.init(canvas, 'star', target.shape.stroke, target.shape.strokeWidth);
                }
                else if (rt && !rt.isInitiated() && target.type === 'chatBubble') {
                    rt.init(canvas, 'chatBubble', '#555555', target.shape.strokeWidth);
                }
                else if (rt && !rt.isInitiated()) {
                    rt.init(canvas, target.type, target.color, target.lineWidth);
                }
            }
            rt === null || rt === void 0 ? void 0 : rt.draw(target);
        };
        /**
         * Real time functionality for text.
         * @param id ID of objects.
         * @param target Text properties.
         */
        var textEdit = function (
        // Event emitter automatically sends ID, required but not needed in this case.
        // @ts-ignore
        id, target) {
            if (rt && !rt.isInitiated() && target.type === 'i-text') {
                rt.init(canvas, 'text', target.fill, target.fontweight);
            }
            if (rt) {
                rt.textDraw(target);
            }
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('moving', moved);
        eventController === null || eventController === void 0 ? void 0 : eventController.on('textEdit', textEdit);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('moving', moved);
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('textEdit', textEdit);
            if (rt && rt.isInitiated()) {
                rt.remove();
                // eslint-disable-next-line react-hooks/exhaustive-deps
                rt = null;
            }
        };
    }, [canvas, eventController, shouldHandleRemoteEvent, rt]);
};

/**
 * Logic for change lineWidth in special brushes local and remote
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that is drawing
 * @param {ICanvasBrush} object - Path to change its line width
 * @param {number} lineWidth - New line width to set in path
 * @param {ICanvasBrush} target - Target to copy properties and set itin a remote path
 */
var changeLineWidthInSpecialBrushes = function (canvas, userId, object, lineWidth, target) { return __awaiter(void 0, void 0, void 0, function () {
    var brush, newObject, basePath, brushType, _a, points, _b, min_1, max_1, newBrush, newClearRects, id, e_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                newObject = null;
                basePath = object.basePath;
                brushType = (_c = object.basePath) === null || _c === void 0 ? void 0 : _c.type;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 9, , 10]);
                if (lineWidth === (basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth))
                    throw new Error('lineWidth is the same');
                if (target) {
                    basePath = target.basePath;
                }
                _a = brushType;
                switch (_a) {
                    case 'dashed': return [3 /*break*/, 2];
                    case 'pen': return [3 /*break*/, 3];
                    case 'marker': return [3 /*break*/, 4];
                    case 'felt': return [3 /*break*/, 4];
                    case 'paintbrush': return [3 /*break*/, 5];
                    case 'chalk': return [3 /*break*/, 6];
                    case 'crayon': return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2:
                brush = new DashedBrush(canvas, userId);
                newObject = brush.createDashedPath(String(object.id), (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], lineWidth, String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke));
                return [3 /*break*/, 8];
            case 3:
                points = (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [];
                brush = new PenBrush(canvas, userId);
                _b = brush.setMinMaxWidth(lineWidth), min_1 = _b.min, max_1 = _b.max;
                if (!target) {
                    points = points.map(function (point) {
                        return {
                            x: point.x,
                            y: point.y,
                            width: brush.getRandomInt(min_1, max_1),
                        };
                    });
                }
                newObject = brush.createPenPath(String(object.id), points, lineWidth, String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke));
                return [3 /*break*/, 8];
            case 4:
                brush = new MarkerBrush(canvas, userId, brushType);
                newObject = brush.createMarkerPath(String(object.id), (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], lineWidth, String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke));
                return [3 /*break*/, 8];
            case 5:
                brush = new PaintBrush(canvas, userId);
                newBrush = (basePath === null || basePath === void 0 ? void 0 : basePath.bristles) || [];
                if (!target) {
                    newBrush = brush.makeBrush(String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke), lineWidth);
                }
                newObject = brush.modifyPaintBrushPath(String(object.id), (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], lineWidth, String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke), newBrush);
                return [3 /*break*/, 8];
            case 6:
                brush = new ChalkBrush(canvas, userId, brushType);
                newClearRects = brush.createChalkEffect((basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], lineWidth);
                return [4 /*yield*/, brush.createChalkPath(String(object.id), (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [], lineWidth, String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke), newClearRects)];
            case 7:
                newObject = _d.sent();
                return [3 /*break*/, 8];
            case 8:
                if (newObject) {
                    id = newObject.id;
                    newObject.set({
                        angle: object.angle,
                        top: object.top,
                        left: object.left,
                        scaleX: object.scaleX,
                        scaleY: object.scaleY,
                        flipX: object.flipX,
                        flipY: object.flipY,
                        originX: object.originX || 'left',
                        originY: object.originY || 'top',
                        evented: !target,
                        selectable: !target,
                    });
                    delete object.id;
                    delete newObject.id;
                    canvas.remove(object);
                    canvas.add(newObject);
                    newObject.set({ id: id });
                    if (!target) {
                        canvas.setActiveObject(newObject);
                    }
                }
                else if (!target) {
                    throw new Error('newObject was not created');
                }
                canvas.renderAll();
                return [2 /*return*/, newObject || object];
            case 9:
                e_1 = _d.sent();
                throw e_1;
            case 10: return [2 /*return*/];
        }
    });
}); };

var useSynchronizedLineWidthChanged = function (canvas, userId, shouldHandleRemoteEvent, undoRedoDispatch) {
    var eventController = useSharedEventSerializer().state.eventController;
    React.useEffect(function () {
        var widthChanged = function (id, objectType, target) {
            var validTypes = [
                'rect',
                'ellipse',
                'triangle',
                'polygon',
                'path',
                'group',
                'image',
            ];
            if (id && !shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                var _a, _b;
                if (obj.id && obj.id === id) {
                    if (validTypes.includes(objectType)) {
                        // Line width Synchronization in special brushes
                        if (objectType === 'group' ||
                            objectType === 'image' ||
                            (objectType === 'path' &&
                                ((_a = obj.basePath) === null || _a === void 0 ? void 0 : _a.type) === 'dashed')) {
                            var lineWidth = Number((_b = target.basePath) === null || _b === void 0 ? void 0 : _b.strokeWidth);
                            changeLineWidthInSpecialBrushes(canvas, userId, obj, lineWidth, target)
                                .then()
                                .catch(function (e) {
                                if (e.message !== 'lineWidth is the same') {
                                    console.warn(e);
                                }
                            });
                        }
                        else {
                            obj.set({
                                strokeWidth: target.strokeWidth,
                            });
                        }
                    }
                }
            });
            undoRedoDispatch({
                type: SET_OTHER,
                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                canvasId: userId,
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('lineWidthChanged', widthChanged);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('lineWidthChanged', widthChanged);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
    ]);
};

var useSynchronizedModified = function (canvas, shouldSerializeEvent, shouldHandleRemoteEvent, userId, undoRedoDispatch) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    /** Register and handle remote event. */
    React.useEffect(function () {
        var modified = function (id, objectType, target) {
            if (!shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                var _a;
                if (obj.id && obj.id === id) {
                    if (objectType === 'textbox' && target.left && obj.left) {
                        obj.set({
                            text: target.text,
                            fontFamily: target.fontFamily,
                            stroke: (_a = target.fill) === null || _a === void 0 ? void 0 : _a.toString(),
                            top: target.top,
                            left: target.left + 1,
                            width: target.width,
                        });
                        obj.set({ left: obj.left - 1 });
                        obj.setCoords();
                    }
                }
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        var payload = {
            id: modified.id,
        };
        if (canvas && payload.id) {
            var event_1 = { event: payload, type: 'modified' };
            undoRedoDispatch({
                type: SET,
                payload: canvas.getObjects(),
                canvasId: userId,
                event: event_1,
            });
        }
        eventController === null || eventController === void 0 ? void 0 : eventController.on('modified', modified);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('modified', modified);
        };
    }, [
        canvas,
        eventController,
        shouldHandleRemoteEvent,
        undoRedoDispatch,
        userId,
    ]);
    /** Register and handle local events. */
    React.useEffect(function () {
        var objectModified = function (e) {
            if (!e.target)
                return;
            if (e.target.id &&
                !shouldSerializeEvent(e.target.id))
                return;
            var type = e.target.get('type');
            // If text has been modified
            if (type === 'textbox' && e.target.id) {
                var target = __assign({}, (type === 'textbox' && {
                    text: e.target.text,
                    fontFamily: e.target.fontFamily,
                    stroke: e.target.fill,
                    top: e.target.top,
                    left: e.target.left,
                    width: e.target.width,
                }));
                var payload = {
                    type: type,
                    target: target,
                    id: e.target.id,
                };
                var event_2 = { event: payload, type: 'modified' };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                    event: event_2,
                });
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('modified', payload);
            }
        };
        canvas === null || canvas === void 0 ? void 0 : canvas.on('object:modified', objectModified);
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('object:modified', objectModified);
        };
    }, [canvas, eventSerializer, shouldSerializeEvent, undoRedoDispatch, userId]);
};

function useFixedAspectScaling(parent, aspectRatio, scaleMode) {
    var _a = React.useState(0.0), top = _a[0], setTop = _a[1];
    var _b = React.useState(0.0), left = _b[0], setLeft = _b[1];
    var _c = React.useState(0.0), width = _c[0], setWidth = _c[1];
    var _d = React.useState(0.0), height = _d[0], setHeight = _d[1];
    var updateLocationAndSize = React.useCallback(function (containerWidth, containerHeight) {
        var width = 0.0;
        var height = 0.0;
        var aspectCorrectedWidth = containerHeight * aspectRatio;
        var aspectCorrectedHeight = containerWidth / aspectRatio;
        if (scaleMode === "ScaleToFill") {
            if (aspectCorrectedWidth < containerWidth) {
                width = containerWidth;
                height = aspectCorrectedHeight;
            }
            else {
                width = aspectCorrectedWidth;
                height = containerHeight;
            }
        }
        else if (scaleMode === "ScaleToFit") {
            if (aspectCorrectedWidth >= containerWidth) {
                width = containerWidth;
                height = aspectCorrectedHeight;
            }
            else {
                width = aspectCorrectedWidth;
                height = containerHeight;
            }
        }
        else if (scaleMode === "ScaleFitVertically") {
            width = aspectCorrectedWidth;
            height = containerHeight;
        }
        else if (scaleMode === "ScaleFitHorizontally") {
            width = containerWidth;
            height = aspectCorrectedHeight;
        }
        var offsetLeft = (containerWidth - width) / 2;
        setLeft(offsetLeft);
        var offsetTop = (containerHeight - height) / 2;
        setTop(offsetTop);
        setWidth(width);
        setHeight(height);
    }, [aspectRatio, scaleMode]);
    // NOTE: Set up resize observer.
    React.useEffect(function () {
        if (!parent)
            return;
        var ro = new ResizeObserver__default['default'](function (entries, _observer) {
            entries.forEach(function (entry) {
                updateLocationAndSize(entry.contentRect.width, entry.contentRect.height);
            });
        });
        ro.observe(parent);
        return function () {
            ro.disconnect();
        };
    }, [parent, updateLocationAndSize]);
    return {
        top: top,
        left: left,
        width: width,
        height: height,
    };
}

/**
 * Generates link to download canvas as image.
 * @param img Generated image from canvas.
 * @param ext Image extension
 * @param type Image type
 */
var generateLink = function (img, ext, type) {
    var link = document.createElement('a'); // document.getElementById('canvasDownloader');
    var date = new Date();
    link.setAttribute('download', "canvas" + date.getTime() + "." + ext);
    link.setAttribute('href', img.replace(type, 'image/octet-stream'));
    link.click();
};
/**
 * Download method for canvas.
 * @param type Type of image, either png or jpg.
 */
var downloadCanvas = function (props, type) {
    if (props.backgroundImage || props.localImage) {
        var canvas_1 = document.createElement('canvas');
        var ctx_1 = canvas_1.getContext('2d');
        canvas_1.width = props.width;
        canvas_1.height = props.height;
        var background = new Image();
        background.src =
            props.backgroundImage || props.localImage;
        background.onload = function () {
            var ext = type === 'image/png' ? 'png' : 'jpg';
            if (ext === 'jpg' && ctx_1) {
                ctx_1.fillStyle = '#fff';
                ctx_1.fillRect(0, 0, props.width, props.height);
                ctx_1.restore();
            }
            ctx_1 === null || ctx_1 === void 0 ? void 0 : ctx_1.drawImage(background, 0, 0, props.width, props.height);
            ctx_1 === null || ctx_1 === void 0 ? void 0 : ctx_1.drawImage(props.canvas.getElement(), 0, 0, props.width, props.height);
            var img = canvas_1.toDataURL(type, 1);
            generateLink(img, ext, type);
            props.onClose(false);
        };
    }
    else if (props.backgroundColor) {
        var currentColor = props.canvas.backgroundColor;
        props.canvas.backgroundColor = props.backgroundColor;
        var ext = type === 'image/png' ? 'png' : 'jpg';
        var img = props.canvas.toDataURL(type, 1);
        generateLink(img, ext, type);
        props.onClose(false);
        props.canvas.backgroundColor = currentColor;
    }
    else {
        var ext = type === 'image/png' ? 'png' : 'jpg';
        var img = props.canvas.toDataURL(type, 1);
        generateLink(img, ext, type);
        props.onClose(false);
    }
};

/**
 * Modal styles
 */
var useStyles$1 = makeStyles__default['default'](function (theme) { return ({
    confirm: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '100px',
        left: 'calc(50% - 200px)',
        textAlign: 'center',
    },
    button: {
        border: '1px solid black',
        borderRadius: '5px',
        margin: '0 5px',
    },
    cancel: {
        border: '2px solid red',
        borderRadius: '5px',
        margin: '0 5px',
    },
    a: {
        visibility: 'hidden',
    },
}); });
/**
 * Modal component to confirm download.
 * @param props Component props.
 */
var CanvasDownloadConfirm = function (props) {
    /**
     * Modal styles
     */
    var css = useStyles$1();
    /**
     * Click event to download png image.
     */
    var downloadCanvasPNG = function () {
        downloadCanvas(props, 'image/png');
    };
    /**
     * Click event to downloag jpg image.
     */
    var downloadCanvasJPG = function () {
        downloadCanvas(props, 'image/jpeg');
    };
    return (React__default['default'].createElement(core.Modal, { open: props.open, "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description" },
        React__default['default'].createElement("div", { className: css.confirm },
            React__default['default'].createElement("h2", null, "Select Format"),
            React__default['default'].createElement(core.Button, { className: css.button, onClick: downloadCanvasPNG }, "PNG"),
            React__default['default'].createElement(core.Button, { className: css.button, onClick: downloadCanvasJPG }, "JPG"),
            React__default['default'].createElement(core.Button, { className: css.cancel, onClick: function () {
                    props.onClose(false);
                } }, "Cancel"))));
};

/**
 * Mnages the logic for set canvas properties
 * @param {string} instanceId - Unique ID for current canvas
 * @param {(instance: fabric.Canvas) => void} setCanvas - Creates a new canvas
 * @param {fabric.Canvas} canvas - Canvas to set
 * @param {HTMLElement} wrapper - Canvas wrapper
 * @param {(wrapper: HTMLElement) => void} setWrapper - Creates wrapper
 * for canvas
 * @param {number} pixelWidth - Canvas width
 * @param {number} pixelHeight - Canvas height
 * @param {boolean} pointerEvents - Enable or disable pointer interaction
 * @param {ScaleMode} scaleMode - Determines how the canvas should scale
 * if parent element doesn't match aspect ratio.
 * @param {boolean} display - Flag to display elements.
 * @param {React.CSSProperties} initialStyle - Canvas initial style.
 */
var useSetCanvas = function (instanceId, setCanvas, canvas, wrapper, setWrapper, pixelWidth, pixelHeight, pointerEvents, scaleMode, display, initialStyle) {
    var requestAllEvents = useSharedEventSerializer().requestAllEvents;
    var _a = useFixedAspectScaling(wrapper === null || wrapper === void 0 ? void 0 : wrapper.parentElement, pixelWidth / pixelHeight, scaleMode || 'ScaleToFit'), width = _a.width, height = _a.height, top = _a.top, left = _a.left;
    var _b = React.useState(), lowerCanvas = _b[0], setLowerCanvas = _b[1];
    var _c = React.useState(), upperCanvas = _c[0], setUpperCanvas = _c[1];
    /**
     * Creates Canvas/Whiteboard instance
     */
    React.useEffect(function () {
        var canvasInstance = new fabric.fabric.Canvas(instanceId, {
            backgroundColor: undefined,
            isDrawingMode: false,
            allowTouchScrolling: false,
            selectionBorderColor: 'rgba(100, 100, 255, 1)',
            selectionLineWidth: 2,
            selectionColor: 'rgba(100, 100, 255, 0.1)',
            selectionDashArray: [10],
        });
        setCanvas(canvasInstance);
    }, [instanceId, setCanvas]);
    /**
     * Enable or disable allow touch scroll based on pointer events.
     */
    React.useEffect(function () {
        if (!canvas)
            return;
        canvas.allowTouchScrolling = !pointerEvents;
    }, [pointerEvents, canvas]);
    /**
     * Request all events to be resent after canvas is created.
     */
    React.useEffect(function () {
        if (!canvas)
            return;
        requestAllEvents();
    }, [canvas, requestAllEvents]);
    /**
     * Retrieve references to elements created by fabricjs. We'll need these to
     * tweak the style after canvas have been initialized.
     */
    React.useEffect(function () {
        if (!canvas)
            return;
        var lowerCanvas = document.getElementById(instanceId);
        var wrapper = lowerCanvas === null || lowerCanvas === void 0 ? void 0 : lowerCanvas.parentElement;
        var upperCanvas = wrapper === null || wrapper === void 0 ? void 0 : wrapper.getElementsByClassName('upper-canvas')[0];
        if (wrapper) {
            setWrapper(wrapper);
            // TODO: We may want to make the position style
            // controlled by property or variable.
            wrapper.style.position = 'absolute';
            if (initialStyle && initialStyle.zIndex) {
                wrapper.style.zIndex = String(initialStyle.zIndex);
            }
        }
        if (lowerCanvas)
            setLowerCanvas(lowerCanvas);
        if (upperCanvas)
            setUpperCanvas(upperCanvas);
    }, [canvas, initialStyle, instanceId, setWrapper]);
    /**
     * Update wrapper display state.
     */
    React.useEffect(function () {
        if (!wrapper)
            return;
        if (display === false) {
            wrapper.style.display = 'none';
        }
        else {
            wrapper.style.removeProperty('display');
        }
    }, [wrapper, display]);
    /**
     * Update the CSS Width/Height
     */
    React.useEffect(function () {
        if (wrapper && lowerCanvas && upperCanvas) {
            var widthStyle = width + "px";
            wrapper.style.width = widthStyle;
            lowerCanvas.style.width = widthStyle;
            upperCanvas.style.width = widthStyle;
            var heightStyle = height + "px";
            wrapper.style.height = heightStyle;
            lowerCanvas.style.height = heightStyle;
            upperCanvas.style.height = heightStyle;
            var wrapperTransform = "translate(" + left + "px, " + top + "px)";
            wrapper.style.transform = wrapperTransform;
            wrapper.style.top = '0px';
            wrapper.style.left = '0px';
        }
    }, [wrapper, lowerCanvas, upperCanvas, width, height, left, top]);
    /**
     * Update the pointer events to make canvas click through.
     */
    React.useEffect(function () {
        if (wrapper && lowerCanvas && upperCanvas) {
            var pointerEventsStyle = pointerEvents ? 'auto' : 'none';
            wrapper.style.pointerEvents = pointerEventsStyle;
            lowerCanvas.style.pointerEvents = pointerEventsStyle;
            upperCanvas.style.pointerEvents = pointerEventsStyle;
        }
    }, [lowerCanvas, pointerEvents, upperCanvas, wrapper]);
};

/**
 * Handles the logic for set/unset objects selectable/eventable
 * depending of the circunstances
 * @param {fabric.Canvas} canvas - Canvas in which the objects are.
 * @param {string} userId - User that is making changes in whiteboard.
 * @param {ICanvasActions} actions - Shared functions that this file needs.
 * @param {boolean} pointerEvents - Flag to know if
 * pointerEvents are active or not
 */
var useObjectManipulation = function (canvas, userId, actions, pointerEvents, permissions) {
    // Getting context variables
    var _a = React.useContext(WhiteboardContext), allToolbarIsEnabled = _a.allToolbarIsEnabled, shapesAreSelectable = _a.shapesAreSelectable, shapesAreEvented = _a.shapesAreEvented, eraseType = _a.eraseType, isLocalObject = _a.isLocalObject, eventedObjects = _a.eventedObjects, brushIsActive = _a.brushIsActive, lineWidthIsActive = _a.lineWidthIsActive, shapeIsActive = _a.shapeIsActive, textIsActive = _a.textIsActive;
    /**
     * Gets permissions for objects in Objects UseEffect
     */
    var getObjectPermissions = React.useCallback(function () {
        return {
            teacherHasPermission: allToolbarIsEnabled && shapesAreSelectable,
            studentHasPermission: permissions.move && shapesAreSelectable,
            isEvented: (shapesAreSelectable || shapesAreEvented) &&
                (allToolbarIsEnabled || permissions.move),
        };
    }, [
        allToolbarIsEnabled,
        permissions.move,
        shapesAreEvented,
        shapesAreSelectable,
    ]);
    /**
     * Gets permissions for objects in PointerMove UseEffect
     */
    var getPointerMoveToolPermissions = React.useCallback(function () {
        return {
            teacherHasPermission: allToolbarIsEnabled && eventedObjects,
            studentHasPermission: permissions.move && eventedObjects,
            isEvented: allToolbarIsEnabled || permissions.move,
        };
    }, [allToolbarIsEnabled, eventedObjects, permissions.move]);
    /**
     * Gets permissions for local objects in LocalObjects UseEffect
     */
    var getLocalObjectPermissions = React.useCallback(function () {
        var toolbarIsEnabled = getToolbarIsEnabled();
        var studentHasPermission = toolbarIsEnabled && (permissions.move || permissions.erase);
        return {
            isEvented: allToolbarIsEnabled || studentHasPermission,
        };
    }, [allToolbarIsEnabled, permissions.erase, permissions.move]);
    /**
     * Objects UseEffect.
     * Update objects selectable/evented state.
     */
    React.useEffect(function () {
        if (!canvas)
            return;
        var _a = getObjectPermissions(), teacherHasPermission = _a.teacherHasPermission, studentHasPermission = _a.studentHasPermission, isEvented = _a.isEvented;
        canvas.forEachObject(function (object) {
            if (object.id && isLocalObject(object.id, userId) && !eraseType) {
                object.set({
                    selectable: teacherHasPermission || studentHasPermission,
                    evented: isEvented,
                    lockMovementX: !shapesAreSelectable,
                    lockMovementY: !shapesAreSelectable,
                    hoverCursor: shapesAreSelectable ? 'move' : 'default',
                });
            }
        });
        canvas.selection = shapesAreSelectable;
        canvas.renderAll();
    }, [
        canvas,
        eraseType,
        isLocalObject,
        shapesAreEvented,
        shapesAreSelectable,
        userId,
        allToolbarIsEnabled,
        permissions.move,
        getObjectPermissions,
    ]);
    /**
     * PointerMove UseEffect.
     * Set the objects like evented if you select pointer or move tool.
     */
    React.useEffect(function () {
        var _a = getPointerMoveToolPermissions(), teacherHasPermission = _a.teacherHasPermission, studentHasPermission = _a.studentHasPermission, isEvented = _a.isEvented;
        if (!isEvented || (!permissions.shape && !isEvented)) {
            canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject().renderAll();
        }
        if (teacherHasPermission || studentHasPermission) {
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
                if (object.id && isLocalObject(object.id, userId)) {
                    object.set({
                        evented: isEvented,
                        selectable: isEvented,
                        lockMovementX: false,
                        lockMovementY: false,
                    });
                }
            });
            actions.setHoverCursorObjects('move');
        }
    }, [
        actions,
        canvas,
        eventedObjects,
        isLocalObject,
        userId,
        allToolbarIsEnabled,
        permissions.move,
        getPointerMoveToolPermissions,
        permissions.shape,
    ]);
    /**
     * Manage the states for setting local objects like selectable/modifiable.
     */
    React.useEffect(function () {
        if (permissions &&
            canvas &&
            !eraseType &&
            !brushIsActive &&
            !lineWidthIsActive &&
            !shapeIsActive) {
            canvas.forEachObject(function (object) {
                var isTextObject = Boolean(isText(object));
                var isEvented = eventedObjects || (isTextObject && textIsActive);
                var isEditable = isTextObject && textIsActive;
                if (object.id && isLocalObject(object.id, userId)) {
                    actions.setObjectControlsVisibility(object, isEvented);
                    object.set({
                        evented: isEvented,
                        selectable: isEvented,
                        hasBorders: isEvented,
                        editable: isEditable,
                        lockMovementX: !eventedObjects,
                        lockMovementY: !eventedObjects,
                        hasRotatingPoint: eventedObjects,
                    });
                }
            });
        }
    }, [
        actions,
        brushIsActive,
        canvas,
        eraseType,
        eventedObjects,
        isLocalObject,
        lineWidthIsActive,
        permissions,
        shapeIsActive,
        textIsActive,
        userId,
    ]);
    /**
     * If pointerEvents changes to false, all the selected objects
     * will be unselected
     */
    React.useEffect(function () {
        if (!pointerEvents && canvas) {
            canvas.discardActiveObject().renderAll();
        }
    }, [pointerEvents, canvas]);
    /**
     * LocalObjects UseEffect.
     * Makes local objects unselectable when toolbar is disabled by the teacher.
     * */
    React.useEffect(function () {
        var isEvented = getLocalObjectPermissions().isEvented;
        canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
            if (object.id &&
                isLocalObject(object.id, userId) &&
                shapesAreSelectable) {
                object.set({
                    evented: isEvented,
                    selectable: isEvented,
                });
            }
        });
    }, [
        canvas,
        isLocalObject,
        userId,
        allToolbarIsEnabled,
        permissions,
        shapesAreSelectable,
        getLocalObjectPermissions,
    ]);
    /**
     * Is executed each time that the permissions changes
     * to set the current objects in the correct status
     */
    React.useEffect(function () {
        if (!permissions.move) {
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (obj) {
                obj.set({
                    selectable: false,
                    evented: false,
                    lockMovementX: true,
                    lockMovementY: true,
                });
            });
        }
    }, [permissions, canvas]);
};

/**
 * Handles logic for Free Hand Drawing Feature
 * @param {fabric.Canvas} canvas - Canvas to draw
 * @param {string} userId - User that will draw in Whiteboard
 */
var useFreeHandDrawing = function (canvas, userId, serializerToolbarState) {
    // Getting necessary context variables
    var _a = React.useContext(WhiteboardContext), brushIsActive = _a.brushIsActive, penColor = _a.penColor, lineWidth = _a.lineWidth, brushType = _a.brushType, allToolbarIsEnabled = _a.allToolbarIsEnabled, partialEraseIsActive = _a.partialEraseIsActive;
    // Getting event serializer for synchronize objects in remote whiteboards
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    /**
     * Checks current brushType selected
     * to set it like current path style
     */
    var setBrushType = React.useCallback(function () {
        switch (brushType) {
            case 'pen':
                canvas.freeDrawingBrush = new PenBrush(canvas, userId);
                break;
            case 'marker':
            case 'felt':
                canvas.freeDrawingBrush = new MarkerBrush(canvas, userId, brushType);
                break;
            case 'paintbrush':
                canvas.freeDrawingBrush = new PaintBrush(canvas, userId);
                break;
            case 'chalk':
            case 'crayon':
                canvas.freeDrawingBrush = new ChalkBrush(canvas, userId, brushType);
                break;
            case 'dashed':
                canvas.freeDrawingBrush = new DashedBrush(canvas, userId);
                break;
            default:
                canvas.freeDrawingBrush = new fabric.fabric.PencilBrush();
                break;
        }
    }, [brushType, canvas, userId]);
    /**
     * Activates or deactivates drawing mode.
     */
    React.useEffect(function () {
        var coordinates = [];
        var toolbarIsEnabled = getToolbarIsEnabled();
        /**
         * When a path object is recently created set its stroke like uniform
         * @param {ICanvasDrawingEvent} e - Event that contains
         * the recent created path
         */
        var pathCreated = function (e) {
            if (e.path) {
                setBasePathInNormalBrushes(e.path);
                e.path.strokeUniform = true;
                canvas.renderAll();
            }
        };
        var realTimePath = function (e) {
            var hasPermission = allToolbarIsEnabled || (toolbarIsEnabled && serializerToolbarState.pen);
            if (e.e.which &&
                e.e.buttons &&
                canvas &&
                hasPermission) {
                coordinates.push(e.pointer);
                if (coordinates.length && coordinates.length % 10 === 0) {
                    var payload = {
                        type: 'path',
                        target: {
                            coordinates: coordinates,
                            color: penColor || DEFAULT_VALUES.PEN_COLOR,
                            lineWidth: lineWidth,
                            id: userId,
                            type: brushType,
                        },
                        id: userId,
                    };
                    eventSerializer.push('moving', payload);
                }
            }
            else {
                coordinates = [];
            }
        };
        /* When free hand drawing option is selected on toolbar,
        freeDrawingBrush is created */
        if (brushIsActive && canvas) {
            var canDraw = allToolbarIsEnabled || (toolbarIsEnabled && serializerToolbarState.pen);
            coordinates = [];
            setBrushType();
            canvas.freeDrawingBrush.canvas = canvas;
            canvas.freeDrawingBrush.color = penColor || DEFAULT_VALUES.PEN_COLOR;
            canvas.freeDrawingBrush.width = lineWidth;
            canvas.freeDrawingCursor = 'crosshair';
            canvas.isDrawingMode = canDraw;
            canvas.on('mouse:move', realTimePath);
            canvas.on('path:created', pathCreated);
        }
        else if (canvas && !brushIsActive && !partialEraseIsActive) {
            canvas.isDrawingMode = false;
        }
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('path:created');
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:move');
        };
    }, [
        allToolbarIsEnabled,
        brushIsActive,
        brushType,
        canvas,
        eventSerializer,
        lineWidth,
        partialEraseIsActive,
        penColor,
        serializerToolbarState.pen,
        setBrushType,
        userId,
    ]);
};

/**
 * Handles the logic for shape creation
 * @param {fabric.Canvas} canvas - Canvas to add the shape
 * @param {string} userId - User that will create the shape
 * @param {ICanvasActions} actions - Shared functions necessaries
 * to work shape creation logic
 * @param {(specific: string, color?: string) => void} mouseDown - Mouse Event
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher
 * to save shapes states and could make und/redo over them
 */
var useShapeFeature = function (canvas, userId, actions, mouseDown, undoRedoDispatch, serializerToolbarState) {
    // Getting context variables
    var _a = React.useContext(WhiteboardContext), shapeIsActive = _a.shapeIsActive, brushIsActive = _a.brushIsActive, allToolbarIsEnabled = _a.allToolbarIsEnabled, isLocalObject = _a.isLocalObject, textIsActive = _a.textIsActive, floodFillIsActive = _a.floodFillIsActive, shapesAreEvented = _a.shapesAreEvented, eraseType = _a.eraseType, laserIsActive = _a.laserIsActive, shape = _a.shape, perfectShapeIsActive = _a.perfectShapeIsActive, perfectShapeIsAvailable = _a.perfectShapeIsAvailable, updatePerfectShapeIsActive = _a.updatePerfectShapeIsActive, pointerEvents = _a.pointerEvents;
    // Getting event serializer to synchronize objects
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    /**
     * Multiplies the width by scaleX of the given shape
     * to obtain the real current width
     * @param {TypedShape} shape - Shape to calculate its real width
     */
    var getShapeRealWidth = function (shape) {
        return Number(shape.width) * Number(shape.scaleX);
    };
    /**
     * Multiplies the height by scaleY of the given shape
     * to obtain the real current height
     * @param {TypedShape} shape - Shape to calculate its real height
     */
    var getShapeRealHeight = function (shape) {
        return Number(shape.height) * Number(shape.scaleY);
    };
    /**
     * Checks if the given object is a local shape
     * @param {TypedShape} shape - Object to check
     */
    var isLocalShape = React.useCallback(function (shape) {
        return shape.id && isEmptyShape(shape) && isLocalObject(shape.id, userId);
    }, [isLocalObject, userId]);
    /**
     * Checks if is possible resize the active object perfectly
     */
    var activeShapeCanBePerfectSized = React.useCallback(function () {
        return (perfectShapeIsActive &&
            canvas.getActiveObject() &&
            isEmptyShape(canvas.getActiveObject()));
    }, [canvas, perfectShapeIsActive]);
    /**
     * Get the permissions for students and teacher to use shape feature.
     */
    var getPermissions = React.useCallback(function () {
        var toolbarIsEnabled = getToolbarIsEnabled();
        return {
            teacherHasPermission: allToolbarIsEnabled && shape && shapeIsActive,
            studentHasPermission: shape &&
                shapeIsActive &&
                toolbarIsEnabled &&
                serializerToolbarState.shape,
        };
    }, [allToolbarIsEnabled, shape, shapeIsActive, serializerToolbarState]);
    /**
     * Synchronizes and dispatches undo/redo for pperfect shape scaling
     */
    var syncAndDispatchPerfectShapeScaling = React.useCallback(function (shape) {
        var id = String(shape.id);
        var type = shape.get('type');
        var target = {
            top: shape.top,
            left: shape.left,
            angle: shape.angle,
            scaleX: shape.scaleX,
            scaleY: shape.scaleY,
            flipX: shape.flipX,
            flipY: shape.flipY,
            originX: shape.originX,
            originY: shape.originY,
        };
        var payload = {
            id: id,
            type: type,
            target: { eTarget: target, isGroup: false },
        };
        eventSerializer.push('scaled', payload);
        if (canvas) {
            var event_1 = { event: payload, type: 'scaled' };
            undoRedoDispatch({
                type: SET,
                payload: canvas.getObjects(),
                canvasId: userId,
                event: event_1,
            });
        }
    }, [canvas, eventSerializer, undoRedoDispatch, userId]);
    /**
     * Disables canvas mouse events when shape is inactive.
     */
    React.useEffect(function () {
        if (!shapeIsActive && canvas) {
            canvas.off('mouse:move');
            canvas.off('mouse:up');
        }
    }, [shapeIsActive, canvas]);
    /**
     * Sets local objects like no evented and no selectable
     * to could draw shapes over whiteboard
     */
    React.useEffect(function () {
        var _a = getPermissions(), teacherHasPermission = _a.teacherHasPermission, studentHasPermission = _a.studentHasPermission;
        if (teacherHasPermission || studentHasPermission) {
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
                if (object.id && isLocalObject(object.id, userId)) {
                    object.set({
                        evented: false,
                        selectable: false,
                    });
                }
            });
            actions.addShape(shape);
        }
        return function () {
            if (!textIsActive && !floodFillIsActive && !shapesAreEvented) {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down');
            }
            if (eraseType !== 'object') {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:up');
            }
            if (!laserIsActive && !brushIsActive && pointerEvents) {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:move');
            }
        };
    }, [
        canvas,
        shape,
        shapeIsActive,
        actions,
        textIsActive,
        userId,
        floodFillIsActive,
        eraseType,
        shapesAreEvented,
        isLocalObject,
        laserIsActive,
        allToolbarIsEnabled,
        serializerToolbarState.shape,
        getPermissions,
        brushIsActive,
        pointerEvents,
    ]);
    /**
     * Set a selected shape like perfect if perfectShapeIsActive
     */
    React.useEffect(function () {
        if (!canvas)
            return;
        /*
          Hide/Show resize middle controls in local shapes.
          When perfectShapeIsActive controls will be hidden
          and when not will be showed
        */
        canvas.forEachObject(function (object) {
            if (isLocalShape(object)) {
                object.set('lockUniScaling', perfectShapeIsActive);
            }
        });
        // Resets active shape like perfect
        if (activeShapeCanBePerfectSized()) {
            var scaling = void 0;
            var shapeToFix = canvas.getActiveObject();
            var width = getShapeRealWidth(shapeToFix);
            var heigth = getShapeRealHeight(shapeToFix);
            if (width > heigth) {
                scaling = { scaleY: width / Number(shapeToFix.height) };
            }
            else if (heigth > width) {
                scaling = { scaleX: heigth / Number(shapeToFix.width) };
            }
            if (scaling) {
                shapeToFix.set(scaling);
                syncAndDispatchPerfectShapeScaling(shapeToFix);
            }
            shapeToFix.setCoords();
        }
        /* If isLocalObject is added on dependencies
        an unexpected event is triggered */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvas, perfectShapeIsActive, userId]);
    /**
     * Reset perfectShapeIsActive to false when the shape
     * or move tool permissions are revoked
     */
    React.useEffect(function () {
        if (!perfectShapeIsAvailable()) {
            updatePerfectShapeIsActive(false);
        }
    }, [perfectShapeIsAvailable, updatePerfectShapeIsActive]);
};

var FloodFiller = /** @class */ (function () {
    /**
     * Class constructor
     * @param imageData Canvas ImageData
     */
    function FloodFiller(imageData) {
        var _this = this;
        this.queue = [];
        this.coords = [];
        this.maxX = -1;
        this.minX = -1;
        this.maxY = -1;
        this.minY = -1;
        this.coordsFilled = [];
        this.RGBA2Hex = function () {
            if (!_this.replacedColor) {
                throw new Error('Color has not been selected!');
            }
            var partials = [
                _this.replacedColor.r.toString(16),
                _this.replacedColor.g.toString(16),
                _this.replacedColor.b.toString(16),
                Math.round(_this.replacedColor.a * 255)
                    .toString(16)
                    .substring(0, 2),
            ];
            var hexList = partials.map(function (part) {
                if (part.length === 1) {
                    return "0" + part;
                }
                return part;
            });
            return "#" + hexList.join('');
        };
        this.getReplacedColor = function () {
            return _this.RGBA2Hex();
        };
        /**
         * Gets color of specific pixel.
         * @param imageData Canvas ImageData
         * @param x X coordinate
         * @param y Y coordinate
         */
        this.getColorAtPixel = function (x, y) {
            var _a = _this.imageData, width = _a.width, data = _a.data;
            var startPos = 4 * (y * width + x);
            if (data[startPos + 3] === undefined) {
                throw new Error("Invalid pixel coordinates: x=" + x + "; y=" + y);
            }
            return {
                r: data[startPos],
                g: data[startPos + 1],
                b: data[startPos + 2],
                a: data[startPos + 3],
            };
        };
        /**
         * Checks if colors are the same.
         * @param a Color to compare
         * @param b Color to compare
         * @param tolerance Color tolerance. If not 0, will return true to slight variations.
         */
        this.isSameColor = function (a, b, tolerance) {
            if (tolerance === void 0) { tolerance = 0; }
            return !(Math.abs(a.r - b.r) > tolerance ||
                Math.abs(a.g - b.g) > tolerance ||
                Math.abs(a.b - b.b) > tolerance ||
                Math.abs(a.a - b.a) > 150);
        };
        /**
         * When conversion to image is done, similar colors may blend in.
         * This is to allow some level of tolerance when detecting pixel
         * colors and changing them from one color to another. This tends to
         * occur in the edge of a shape.
         * @param a Color to compare
         * @param b Color to compare.
         */
        this.setAutoTolerance = function (a, b) {
            var differenceList = [
                Math.abs(a.r - b.r),
                Math.abs(a.g - b.g),
                Math.abs(a.b - b.b),
                Math.abs(a.a - b.a),
            ];
            var max = 0;
            differenceList.forEach(function (n) {
                max = n > max ? n : max;
            });
            return max > 10 ? 10 : max;
        };
        /**
         * Executes flood fill.
         * @param point Mouse click location coordinates
         * @param colorHex Color to change to.
         * @param tolerance Color tolerance.
         */
        this.fill = function (point, colorHex, tolerance) { return __awaiter(_this, void 0, void 0, function () {
            var edges, edgeCoordinates;
            return __generator(this, function (_a) {
                try {
                    this.color = this.hex2RGBA(colorHex);
                    this.replacedColor = this.getColorAtPixel(point.x, point.y);
                    this.tolerance = tolerance;
                    if (this.isSameColor(this.replacedColor, this.color, this.tolerance)) {
                        return [2 /*return*/, null];
                    }
                    this.autoTolerance = this.setAutoTolerance(this.replacedColor, this.color);
                    this.addToQueue([point.x, point.x, point.y, -1]);
                    this.fillQueue();
                    edges = this.coordsFilled.filter(function (line, i) {
                        return line && (i === 0 || i % 10 === 0);
                    });
                    edgeCoordinates = edges.map(function (item) {
                        return [{ x: item[0], y: item[2] }, { x: item[1], y: item[3] }];
                    });
                    return [2 /*return*/, {
                            coords: this.coords,
                            x: this.minX,
                            y: this.minY,
                            width: this.maxX - this.minX,
                            height: this.maxY - this.minY,
                            edgeCoordinates: edgeCoordinates
                        }];
                }
                catch (e) {
                    throw e;
                }
                return [2 /*return*/];
            });
        }); };
        this.imageData = imageData;
        this.tolerance = 0;
        this.autoTolerance = 0;
    }
    /**
     * Changes hex color to rgba
     * @param hex color hex string
     * @param alpha Opacity
     */
    FloodFiller.prototype.hex2RGBA = function (hex, alpha) {
        if (alpha === void 0) { alpha = 255; }
        var parsedHex = hex;
        if (hex.indexOf('#') === 0) {
            parsedHex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (parsedHex.length === 3) {
            parsedHex =
                parsedHex[0] +
                    parsedHex[0] +
                    parsedHex[1] +
                    parsedHex[1] +
                    parsedHex[2] +
                    parsedHex[2];
        }
        if (parsedHex.length !== 6 && parsedHex !== 'transparent') {
            throw new Error("Invalid HEX color " + parsedHex + ".");
        }
        else if (parsedHex === 'transparent') {
            return {
                r: 255,
                g: 255,
                b: 255,
                a: 0,
            };
        }
        var r = parseInt(parsedHex.slice(0, 2), 16);
        var g = parseInt(parsedHex.slice(2, 4), 16);
        var b = parseInt(parsedHex.slice(4, 6), 16);
        return {
            r: r,
            g: g,
            b: b,
            a: alpha,
        };
    };
    /**
     * Adds line to color fill to queue
     * @param line Line to color fill
     */
    FloodFiller.prototype.addToQueue = function (line) {
        this.queue.push(line);
    };
    /**
     * Removes line to color fill from queue
     */
    FloodFiller.prototype.popFromQueue = function () {
        if (!this.queue.length) {
            return null;
        }
        //@ts-ignore
        return this.queue.pop();
    };
    /**
     * Checks if coordinates and pixel are valid.
     * @param pixel Coordinates of pixel.
     */
    FloodFiller.prototype.isValidTarget = function (pixel) {
        if (pixel === null) {
            //@ts-ignore
            return;
        }
        var pixelColor = this.getColorAtPixel(pixel.x, pixel.y);
        var tempTolerance = 60; // If set at 0, crashes when colors are too similar.
        return this.isSameColor(this.replacedColor, pixelColor, tempTolerance);
    };
    /**
     * Changes color of pixel at specific coordinates.
     * @param imageData Canvas ImageData
     * @param color New color of pixel.
     * @param x X coordinate
     * @param y Y coordinate
     */
    FloodFiller.prototype.setColorAtPixel = function (imageData, color, x, y) {
        var width = imageData.width, data = imageData.data;
        var startPos = 4 * (y * width + x);
        if (data[startPos + 3] === undefined) {
            throw new Error('Invalid pixel coordinates. Cannot set color at: x=' + x + '; y=' + y);
        }
        if (x > this.maxX) {
            this.maxX = x;
        }
        if (y > this.maxY) {
            this.maxY = y;
        }
        if (x < this.minX || this.minX === -1) {
            this.minX = x;
        }
        if (y < this.minY || this.minY === -1) {
            this.minY = y;
        }
        data[startPos + 0] = color.r & 0xff;
        data[startPos + 1] = color.g & 0xff;
        data[startPos + 2] = color.b & 0xff;
        data[startPos + 3] = color.a & 0xff;
        this.coords[startPos + 0] = color.r & 0xff;
        this.coords[startPos + 1] = color.g & 0xff;
        this.coords[startPos + 2] = color.b & 0xff;
        this.coords[startPos + 3] = color.a & 0xff;
    };
    /**
     * Begins process to change color of pixel
     * @param color Color to change to
     * @param pixel Pixel at specific coordinate
     */
    FloodFiller.prototype.setPixelColor = function (color, pixel) {
        this.setColorAtPixel(this.imageData, color, pixel.x, pixel.y);
    };
    /**
     * Checks neighboring pixels.
     * @param direction Direction to check to
     * @param x X coordinate
     * @param y Y coordinate
     */
    FloodFiller.prototype.getPixelNeighbour = function (direction, x, y) {
        x = x | 0;
        y = y | 0;
        var coords = null;
        switch (direction) {
            case 'right':
                coords = { x: (x + 1) | 0, y: y };
                break;
            case 'left':
                coords = { x: (x - 1) | 0, y: y };
                break;
        }
        if (coords && coords.x >= 0 && coords.x < this.imageData.width) {
            return coords;
        }
        return null;
    };
    /**
     * Start filling line at specific coordinate.
     * @param x X coordinate
     * @param y Y coordinate
     */
    FloodFiller.prototype.fillLineAt = function (x, y) {
        if (!this.isValidTarget({ x: x, y: y })) {
            return [-1, -1];
        }
        this.setPixelColor(this.color, { x: x, y: y });
        var minX = x;
        var maxX = x;
        var px = this.getPixelNeighbour('left', minX, y);
        while (px && this.isValidTarget(px)) {
            this.setPixelColor(this.color, px);
            minX = px.x;
            px = this.getPixelNeighbour('left', minX, y);
        }
        px = this.getPixelNeighbour('right', maxX, y);
        // prevPx = null;
        while (px && this.isValidTarget(px)) {
            this.setPixelColor(this.color, px);
            maxX = px.x;
            px = this.getPixelNeighbour('right', maxX, y);
        }
        return [minX, maxX];
    };
    /**
     * While lines in queue, keeps checking if pixels need to color modified.
     */
    FloodFiller.prototype.fillQueue = function () {
        var line = this.popFromQueue();
        while (line) {
            var start = line[0], end = line[1], y = line[2], parentY = line[3];
            var currX = start;
            while (currX !== -1 && currX <= end) {
                var _a = this.fillLineAt(currX, y), lineStart = _a[0], lineEnd = _a[1];
                if (lineStart !== -1) {
                    this.coordsFilled.push([lineStart, lineEnd, y, y]);
                    if (lineStart >= start && lineEnd <= end && parentY !== -1) {
                        if (parentY < y && y + 1 < this.imageData.height) {
                            this.addToQueue([lineStart, lineEnd, y + 1, y]);
                        }
                        if (parentY > y && y > 0) {
                            this.addToQueue([lineStart, lineEnd, y - 1, y]);
                        }
                    }
                    else {
                        if (y > 0) {
                            this.addToQueue([lineStart, lineEnd, y - 1, y]);
                        }
                        if (y + 1 < this.imageData.height) {
                            this.addToQueue([lineStart, lineEnd, y + 1, y]);
                        }
                    }
                }
                if (lineEnd === -1 && currX <= end) {
                    currX += 1;
                }
                else {
                    currX = lineEnd + 1;
                }
            }
            line = this.popFromQueue();
        }
    };
    return FloodFiller;
}());

var changeBackgroundColor = function (canvas, eventSerializer, undoRedoDispatch, color, userId) {
    canvas.backgroundColor = color;
    var payload = {
        type: 'background',
        target: {
            fill: color,
        },
        id: '',
    };
    var eventState = {
        event: __assign(__assign({}, payload), { id: userId + ":background" }),
        type: 'colorChanged',
    };
    undoRedoDispatch({
        type: SET,
        payload: canvas.getObjects(),
        canvasId: userId,
        event: eventState,
    });
    eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('colorChanged', payload);
};

/**
 * Checks the objects in objectsList
 * to know if are really intersecting mainObject
 * @param {TypedShape} mainObject - Flood-fill object
 * @param {TypedShape} objectsList - Objects to compare with mainObject
 * @param {fabric.Canvas} canvas - Canvas in which the objects are
 */
var findIntersectedObjects = function (mainObject, objectsList, canvas) {
    /**
     * Maps the object's ubication to find its pixels
     * @param {TypedShape} object - Object to find pixels
     * @param {number} resolution - Resolution image. A bigger number
     * means better performance but worse precision.
     */
    var pixelMapping = function (object, resolution) {
        // Hiding the the rest of objects to get just iamge data for this object
        toogleOtherObjects(object, false);
        var pixelMap = [];
        var ctx = canvas.getContext();
        // Getting bounding rect in case of object is rotated
        var bound = object.getBoundingRect();
        var width = Number(object.width) * Number(object.scaleX);
        var height = Number(object.height) * Number(object.scaleY);
        var startPoint = {
            x: Number(bound.left),
            y: Number(bound.top),
        };
        // Mapping each pixel in object to get the no transparent pixels
        for (var y = startPoint.y; y <= startPoint.y + height; y += resolution) {
            for (var x = startPoint.x; x <= startPoint.x + width; x += resolution) {
                var pixel = ctx.getImageData(x * window.devicePixelRatio, y * window.devicePixelRatio, resolution * window.devicePixelRatio, resolution * window.devicePixelRatio);
                if (!isTransparent(pixel)) {
                    pixelMap.push({ x: x, y: y });
                }
            }
        }
        // Showing again the previous hidden objects
        toogleOtherObjects(object, true);
        return {
            x: startPoint.x,
            y: startPoint.y,
            pixelMap: {
                data: pixelMap,
                resolution: resolution,
            },
        };
    };
    /**
     * Checks if exists a collision in the given pixels
     * @param {IPixel} source - Pixel to compare
     * @param {IPixel} target - Pixel to compare
     */
    var isPixelCollision = function (source, target) {
        return !(source.y + source.height < target.y ||
            source.y > target.y + target.height ||
            source.x + source.width < target.x ||
            source.x > target.x + target.width);
    };
    /**
     * Compares each source pixel with each target pixel
     * to find a collision in one of them
     * @param {IPixeledObject} source - Object to compare
     * @param {IPixeledObject} target - Object to compare
     */
    var findPixelCollision = function (source, target) {
        // Checking each colored pixel coordinate in source object
        for (var s = 0; s < source.pixelMap.data.length; s += 1) {
            var sourcePixel = source.pixelMap.data[s];
            var sourceArea = {
                x: sourcePixel.x,
                y: sourcePixel.y,
                width: target.pixelMap.resolution,
                height: target.pixelMap.resolution,
            };
            // Checking each colored pixel coordinate in target object
            for (var t = 0; t < target.pixelMap.data.length; t += 1) {
                var targetPixel = target.pixelMap.data[t];
                var targetArea = {
                    x: targetPixel.x,
                    y: targetPixel.y,
                    width: target.pixelMap.resolution,
                    height: target.pixelMap.resolution,
                };
                // Comparing source and target's current pixel
                if (isPixelCollision(sourceArea, targetArea)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Show/hide all the objects in canvas except the current object
     * @param {TypedShape} currentObject - Object to ignore
     * @param {boolean} status - Flag to show or hide objects
     * (true: show, false: hide)
     */
    var toogleOtherObjects = function (currentObject, status) {
        objectsList.forEach(function (obj) {
            if (currentObject !== obj) {
                obj.set({
                    visible: status,
                });
            }
        });
        canvas.renderAll();
    };
    /**
     * Checks the given image data to know if represents a transparent color
     * @param {ImageData} image - Data to check
     */
    var isTransparent = function (image) {
        // Checking each alpha channel in image data
        for (var i = 0; i < image.data.length; i += 4) {
            if (image.data[i + 3] !== 0) {
                return false;
            }
        }
        return true;
    };
    // Pixels Data in Flood-fill object
    var mainObjectPixels = pixelMapping(mainObject, 2);
    return objectsList.filter(function (o) {
        var collision = false;
        // if current object is flood-fill object, filter is no needed
        if (o === mainObject)
            return true;
        // If bounding box collision happens, the next step is check pixel collision
        if (mainObject.intersectsWithObject(o) && o !== mainObject) {
            // Pixels Data in current object
            var pixels = pixelMapping(o, 2);
            collision = findPixelCollision(pixels, mainObjectPixels);
        }
        return collision;
    });
};

var img$3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAMgAAADIAGP6560AAAAHdElNRQfkCBUWCC2DGxbnAAAAEGNhTnYAAAAgAAAAIAAAAAAAAAAAYrnu+gAAAJFJREFUKM91kb0VgCAMhDMFA1BSWtlQWzKC+y/hmeMnBsXzCU/uCx5ELpkfQYLAvuRlq1lV8AOIVldiDdAGApbAXk2+HF8AF1K1CtARByTkXgmbB6IKkMk+Dcm4Wt6M6Ba9DsaNeBJ8pR5/EbjZEth0D8QRaFXfMtihJjuOkOKbM52h34MHeCuj+gGsh02JqUw38OcwJH76GZAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDgtMjFUMjI6MDg6NDUrMDA6MDA7/mpuAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA4LTIxVDIyOjA4OjQ1KzAwOjAwSqPS0gAAAABJRU5ErkJggg==";

var updateAfterCustomFloodFill = function (itemId, image, target, clickedColor, canvas, userId, data, eventSerializer) { return __awaiter(void 0, void 0, void 0, function () {
    var id, objectsAtPoint, singleObject, joinedIds, bounds, top, left, clonedImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = itemId;
                if (!id || target.color !== clickedColor) {
                    // generate new ID, which will be for the image created by the new color.
                    id = userId + ":" + uuid.v4();
                }
                else if (target.color === clickedColor) {
                    canvas.remove(target);
                }
                image.set({
                    top: data.y / window.devicePixelRatio,
                    left: data.x / window.devicePixelRatio,
                    scaleX: 0.5 * (2 / window.devicePixelRatio),
                    scaleY: 0.5 * (2 / window.devicePixelRatio),
                    selectable: false,
                    evented: false,
                    id: id,
                });
                canvas.add(image);
                canvas.discardActiveObject();
                objectsAtPoint = findIntersectedObjects(image, findLocalObjects(userId, canvas.getObjects()), canvas);
                singleObject = new fabric.fabric.Group(objectsAtPoint);
                joinedIds = [];
                bounds = singleObject.getBoundingRect();
                top = bounds.top;
                left = bounds.left;
                objectsAtPoint.forEach(function (o) {
                    o.set({
                        skipState: true,
                    });
                    if (o.id && o.id !== id) {
                        joinedIds.push(o.id);
                    }
                    canvas.remove(o);
                    eventSerializer.push('removed', { id: o.id });
                });
                clonedImage = new Promise(function (resolve, reject) {
                    singleObject.cloneAsImage(function (cloned) {
                        if (!cloned) {
                            reject();
                        }
                        cloned.set({
                            top: top,
                            left: left,
                            lockMovementX: true,
                            lockMovementY: true,
                            hoverCursor: "url(\"" + img$3 + "\") 2 15, default",
                            selectable: false,
                            id: id,
                            joinedIds: joinedIds,
                        });
                        canvas.add(cloned);
                        canvas.renderAll();
                        var payload = {
                            type: 'image',
                            target: cloned,
                            id: id,
                        };
                        eventSerializer.push('added', payload);
                        resolve(cloned);
                    });
                });
                return [4 /*yield*/, clonedImage];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };

/**
 * Sets up a temporary canvas to be used for object manipulation
 * @param height Canvas height
 * @param width Canvas width
 */
var setTemporaryCanvas = function (height, width) {
    var tempCanvas = document.createElement('canvas');
    var tempContext = tempCanvas.getContext('2d');
    tempCanvas.height = height;
    tempCanvas.width = width;
    return { tempCanvas: tempCanvas, tempContext: tempContext };
};
/**
 * Updates temporary canvas with data from permanent canvas.
 * @param palette
 * @param tempCanvas
 * @param tempContext
 * @param data
 */
var updateTemporary = function (palette, tempCanvas, tempContext, data) {
    tempContext.putImageData(palette, 0, 0);
    var newImgData = tempContext.getImageData(data.x, data.y, data.width, data.height);
    tempCanvas.width = data.width;
    tempCanvas.height = data.height;
    tempContext.putImageData(newImgData, 0, 0);
};
/**
 * Removes foreign objects from local board.
 * @param canvas
 * @param isLocalObject
 * @param userId
 */
var stripForeignObjects = function (canvas, isLocalObject, userId) {
    var placeholderNonLocal = [];
    canvas.getObjects().forEach(function (o) {
        if (!isLocalObject(o.id, userId)) {
            placeholderNonLocal.push(o);
            canvas.remove(o);
        }
    });
    canvas.renderAll();
    return placeholderNonLocal;
};
/**
 * Adds foreign objects to local board.
 * @param canvas
 * @param placeholderNonLocal
 */
var addForeignObjects = function (canvas, placeholderNonLocal) {
    placeholderNonLocal.forEach(function (o) {
        canvas.add(o);
    });
    canvas.renderAll();
};
/**
 * Handles flood fill on mouse click for background color or custom paths.
 * @param event
 * @param canvas
 * @param userId
 * @param isLocalObject
 * @param color
 * @param eventSerializer
 * @param undoRedoDispatch
 */
var floodFillMouseEvent = function (event, canvas, userId, isLocalObject, color, eventSerializer, undoRedoDispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, tempCanvas, tempContext, placeholderNonLocal, palette, context, imgData, floodFiller, id, data, clickedColor, tempData, target;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = setTemporaryCanvas(canvas.getHeight() * 2, canvas.getWidth() * 2), tempCanvas = _a.tempCanvas, tempContext = _a.tempContext;
                if (!canvas) {
                    throw new Error('Canvas does not exist!');
                }
                // Preserve object stacking while flood filling.
                canvas.preserveObjectStacking = true;
                placeholderNonLocal = stripForeignObjects(canvas, isLocalObject, userId);
                palette = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                context = canvas.getContext();
                imgData = context.getImageData(0, 0, canvas.getWidth() * 2, canvas.getHeight() * 2);
                floodFiller = new FloodFiller(imgData);
                id = event.target && event.target.get('type') !== 'path'
                    ? event.target.id
                    : null;
                return [4 /*yield*/, floodFiller.fill({
                        x: Math.round(event.pointer.x * window.devicePixelRatio),
                        y: Math.round(event.pointer.y * window.devicePixelRatio),
                    }, color, 0)];
            case 1:
                data = _b.sent();
                if (!data) {
                    return [2 /*return*/];
                }
                clickedColor = floodFiller.getReplacedColor();
                palette.data.set(new Uint8ClampedArray(data.coords));
                updateTemporary(palette, tempCanvas, tempContext, data);
                placeholderNonLocal.forEach(function (o) {
                    canvas.add(o);
                });
                canvas.renderAll();
                if (
                // @ts-ignore - TS is ignoring previous error throw if Canvas is undefined.
                canvas.width - data.width / 2 <= 4 &&
                    // @ts-ignore - TS is ignoring previous error throw if Canvas is undefined.
                    canvas.height - data.height / 2 <= 4) {
                    changeBackgroundColor(canvas, eventSerializer, undoRedoDispatch, color, userId);
                    return [2 /*return*/];
                }
                tempData = tempCanvas.toDataURL();
                fabric.fabric.Image.fromURL(tempData, function (image) { return __awaiter(void 0, void 0, void 0, function () {
                    var payload, eventData, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, updateAfterCustomFloodFill(id, image, event.target, clickedColor, canvas, userId, data, eventSerializer)];
                            case 1:
                                target = _a.sent();
                                payload = {
                                    id: target.id,
                                    type: 'image',
                                    target: target,
                                };
                                eventData = { event: payload, type: 'added' };
                                undoRedoDispatch({
                                    type: SET,
                                    payload: canvas.getObjects(),
                                    canvasId: userId,
                                    event: eventData,
                                });
                                return [3 /*break*/, 3];
                            case 2:
                                e_1 = _a.sent();
                                throw e_1;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                addForeignObjects(canvas, placeholderNonLocal);
                tempCanvas.remove();
                canvas.preserveObjectStacking = true;
                return [2 /*return*/];
        }
    });
}); };

/**
 * Handles the logic for Flood-fill Feature
 * @param {fabric.Canvas} canvas - Canvas in which objects to flood-fill are
 * @param {string} userId - User that will flood-fill objects
 * @param {ICanvasActions} actions - Shared functions
 * that are necessaries here to flood-fill objects
 * @param {PaintEventSerializer} eventSerializer - Serializer for synchronize
 * flood-fill in the other whiteboards
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher to
 * save the ocurred events and could make undo/redo over them
 */
var useFloodFill = function (canvas, serializerToolbarState, userId, actions, eventSerializer, undoRedoDispatch) {
    // Getting context variables
    var _a = React.useContext(WhiteboardContext), isLocalObject = _a.isLocalObject, allToolbarIsEnabled = _a.allToolbarIsEnabled, floodFillIsActive = _a.floodFillIsActive, floodFill = _a.floodFill, eraseType = _a.eraseType, laserIsActive = _a.laserIsActive, textIsActive = _a.textIsActive, pointerEvents = _a.pointerEvents;
    var paintBucket = "url(\"" + img$3 + "\") 2 15, default";
    var laserPointerIsActive = React.useMemo(function () { return laserIsActive; }, [laserIsActive]);
    /**
     * Checks if the given object exists in the given point
     * and if is a flood-fillable object.
     * @param {fabric.Object} object - Object to check
     * @param {fabric.Point} pointer - Point to find the given object
     */
    var objectExistsAtPoint = function (object, pointer) {
        return ((isEmptyShape(object) || isFreeDrawing(object)) &&
            object.containsPoint(pointer));
    };
    /**
     * Checks if target in given event is different than a shape
     * to apply on it the flood-fill algorithm for paths and images
     * @param {fabric.IEvent} event - Event in which mouse down is happening
     */
    var needsFloodFillAlgorithm = function (event) {
        return (!event.target ||
            (event.target.get('type') === 'path' && !isEmptyShape(event.target)) ||
            (event.target.get('type') === 'group' &&
                event.target.basePath) ||
            event.target.get('type') === 'image');
    };
    /**
     * Manages the logic for Flood-fill Feature
     */
    React.useEffect(function () {
        if (!canvas)
            return;
        var toolbarIsEnabled = getToolbarIsEnabled();
        /**
         * Logic for flood-fill a shape
         * @param {fabric.IEvent} event - Event in which mouse down is happening
         */
        var floodFillInShape = function (event) {
            if (!event.target || !event.pointer)
                return;
            var differentFill = '#dcdcdc';
            var differentStroke = '#dbdbdb';
            var differentBackground = '#dadada';
            /* Storing the current stroke, fill
            and canvas background colors to reset them */
            var originalStroke = event.target.stroke;
            var originalFill = event.target.fill;
            var originalBackground = canvas.backgroundColor;
            // Change stroke and fill to provisional colors to be identified
            event.target.set({
                stroke: differentStroke,
                fill: differentFill,
            });
            // Change canvas background to a provional color to be identified
            canvas.backgroundColor = differentBackground;
            canvas.renderAll();
            var clickedColor = getColorInCoord(event.pointer.x, event.pointer.y);
            if (clickedColor === differentFill) {
                // If user click inside of the shape
                event.target.set({
                    fill: floodFill,
                    stroke: originalStroke,
                });
                canvas.discardActiveObject();
                canvas.backgroundColor = originalBackground;
                var payload = {
                    type: 'shape',
                    target: {
                        fill: event.target.fill,
                        objectsOrdering: canvas
                            .getObjects()
                            .map(function (obj, index) {
                            return { id: obj.id, index: index };
                        }),
                    },
                    id: event.target.id || '',
                };
                var eventState = {
                    event: payload,
                    type: 'colorChanged',
                };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas.getObjects(),
                    canvasId: userId,
                    event: eventState,
                });
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('colorChanged', payload);
            }
            else if (clickedColor === differentStroke) {
                // If user click in the border of the shape
                event.target.set({
                    stroke: originalStroke,
                    fill: originalFill,
                });
                canvas.backgroundColor = originalBackground;
            }
            else {
                // If user click outside of the shape
                event.target.set({
                    stroke: originalStroke,
                    fill: originalFill,
                });
                canvas.backgroundColor = originalBackground;
                if (event.e) {
                    manageShapeOutsideClick(event);
                }
            }
        };
        /**
         * Prepares objects to be evented and could flood-fill them
         */
        var prepareObjects = function () {
            canvas.defaultCursor = paintBucket;
            canvas.forEachObject(function (object) {
                actions.setObjectControlsVisibility(object, false);
                if (!isLocalShape(object))
                    return;
                object.set({
                    evented: true,
                    selectable: object.get('type') !== 'image',
                    lockMovementX: true,
                    lockMovementY: true,
                    hasBorders: false,
                    hoverCursor: paintBucket,
                    perPixelTargetFind: !isShape(object),
                });
            });
            actions.reorderShapes();
            canvas.renderAll();
        };
        /**
         * Make a mouse down event below of the clicked shape
         * @param {IEvent} event - Contains the x, y coords of the clicked point
         */
        var manageShapeOutsideClick = function (event) {
            if (!event.pointer || !event.target)
                return;
            var pointer = event.pointer;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
                if (object !== event.target && objectExistsAtPoint(object, pointer)) {
                    canvas === null || canvas === void 0 ? void 0 : canvas.trigger('mouse:down', {
                        target: object,
                        pointer: {
                            x: pointer.x,
                            y: pointer.y,
                        },
                    });
                }
            });
        };
        /**
         * Checks if the given shape object is local for current user
         * @param {TypedShape} shape - Shape Object to check
         */
        var isLocalShape = function (shape) {
            return shape.id && isLocalObject(shape.id, userId);
        };
        /**
         * Get the color of the clicked area in the Whiteboard
         * and returns it in hexadecimal code
         * @param {IEvent} event - click event
         */
        var getColorInCoord = function (x, y) {
            if (!canvas)
                return;
            var colorData = canvas
                .getContext()
                .getImageData(x * window.devicePixelRatio, y * window.devicePixelRatio, 1, 1)
                .data.slice(0, 3);
            return ('#' +
                ((1 << 24) + (colorData[0] << 16) + (colorData[1] << 8) + colorData[2])
                    .toString(16)
                    .slice(1));
        };
        var teacherHasPermission = allToolbarIsEnabled && floodFillIsActive;
        var studentHasPermission = floodFillIsActive && toolbarIsEnabled && serializerToolbarState.floodFill;
        var mouseDownFill = function (event) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!event.pointer)
                    return [2 /*return*/];
                // Flood-fill for no shape objects
                if (needsFloodFillAlgorithm(event)) {
                    floodFillMouseEvent(event, canvas, userId, isLocalObject, floodFill, eventSerializer, undoRedoDispatch);
                    return [2 /*return*/];
                }
                // Click on shape object
                if (event.target && isEmptyShape(event.target)) {
                    floodFillInShape(event);
                }
                canvas.renderAll();
                return [2 /*return*/];
            });
        }); };
        if (teacherHasPermission || studentHasPermission) {
            prepareObjects();
            canvas.on('mouse:down', mouseDownFill);
        }
        return function () {
            if (pointerEvents) {
                canvas.defaultCursor = 'default';
            }
            // Returning objects to their normal state
            if (!floodFillIsActive && eraseType !== 'object') {
                canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) {
                    object.set({
                        hoverCursor: laserPointerIsActive ? 'none' : 'default',
                        evented: false,
                        perPixelTargetFind: false,
                    });
                });
            }
            // Removing mouse:down event when it is not necessary
            if (!textIsActive && eraseType !== 'object') {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down', mouseDownFill);
            }
        };
    }, [
        actions,
        allToolbarIsEnabled,
        canvas,
        eraseType,
        eventSerializer,
        floodFill,
        floodFillIsActive,
        isLocalObject,
        laserPointerIsActive,
        paintBucket,
        pointerEvents,
        serializerToolbarState.floodFill,
        textIsActive,
        undoRedoDispatch,
        userId,
    ]);
};

/**
 * Handles the logic for change Whiteboard states when an object is selected
 * @param {fabric.Canvas} canvas - Canvas in which the objects are selected
 * @param {ICanvasActions} actions - Shared functions that are necessaries
 * to work this logic
 */
var useObjectSelection = function (canvas, actions) {
    // Getting the necessary context variables
    var _a = React.useContext(WhiteboardContext), shapeIsActive = _a.shapeIsActive, brushIsActive = _a.brushIsActive, eventedObjects = _a.eventedObjects, penColor = _a.penColor, updatePenColor = _a.updatePenColor, lineWidth = _a.lineWidth, updateLineWidth = _a.updateLineWidth, brushType = _a.brushType, updateBrushType = _a.updateBrushType, shape = _a.shape, updateShape = _a.updateShape, fontFamily = _a.fontFamily, updateFontFamily = _a.updateFontFamily, fontColor = _a.fontColor, updateFontColor = _a.updateFontColor;
    /**
     * Gets stroke, strokeWidth and brushType properties
     * from path and custom path objects
     * @param {ICanvasBrush} object - Object to get its properties
     */
    var getBrushObjectProperties = React.useCallback(function (object) {
        var _a, _b, _c, _d;
        if (isFreeDrawing(object) || isEmptyShape(object)) {
            return {
                objectStroke: String(object.stroke),
                objectStrokeWidth: Number(object.strokeWidth),
                objectBrushType: ((_a = object.strokeDashArray) === null || _a === void 0 ? void 0 : _a.length) ? 'dashed' : 'pencil',
            };
        }
        return {
            objectStroke: String((_b = object.basePath) === null || _b === void 0 ? void 0 : _b.stroke),
            objectStrokeWidth: Number((_c = object.basePath) === null || _c === void 0 ? void 0 : _c.strokeWidth),
            objectBrushType: String((_d = object.basePath) === null || _d === void 0 ? void 0 : _d.type),
        };
    }, []);
    /**
     * Trigger the changes in the required variables
     * when a certain object is selected
     * @param {IEvent} event - event that contains the selected object
     */
    var manageChanges = React.useCallback(function (event) {
        if (!event.target)
            return;
        var selected = event.target;
        actions.reorderShapes();
        // Shape or Path selected
        if (!shapeIsActive &&
            !brushIsActive &&
            eventedObjects &&
            (isFreeDrawing(selected) ||
                isEmptyShape(selected) ||
                isSpecialFreeDrawing(selected))) {
            var _a = getBrushObjectProperties(selected), objectStroke = _a.objectStroke, objectStrokeWidth = _a.objectStrokeWidth, objectBrushType = _a.objectBrushType;
            // Change pen color
            if (objectStroke !== penColor) {
                updatePenColor(objectStroke);
            }
            // Change line width
            if (objectStrokeWidth !== lineWidth) {
                updateLineWidth(objectStrokeWidth);
            }
            // Change brush type
            if (objectBrushType !== brushType) {
                updateBrushType(objectBrushType);
            }
        }
        // Shape selected, change shape
        if (isShape(selected) &&
            !shapeIsActive &&
            eventedObjects &&
            selected.name !== shape) {
            updateShape(selected.name);
        }
        // Text Selected
        if (isText(selected)) {
            var newFont = selected.fontFamily;
            var newFontColor = selected.fill;
            // Change font family
            if (newFont !== fontFamily) {
                updateFontFamily(newFont);
            }
            // Change text color
            if (newFontColor !== fontColor) {
                updateFontColor(newFontColor);
            }
        }
    }, [
        actions,
        brushIsActive,
        brushType,
        eventedObjects,
        fontColor,
        fontFamily,
        getBrushObjectProperties,
        lineWidth,
        penColor,
        shape,
        shapeIsActive,
        updateBrushType,
        updateFontColor,
        updateFontFamily,
        updateLineWidth,
        updatePenColor,
        updateShape,
    ]);
    // Set up manageChanges callback.
    React.useEffect(function () {
        if (!canvas)
            return;
        canvas.on('selection:created', manageChanges);
        canvas.on('selection:updated', manageChanges);
        return function () {
            canvas.off('selection:created', manageChanges);
            canvas.off('selection:updated', manageChanges);
        };
    }, [canvas, manageChanges]);
};

/**
 * Handles the logic for keyboard events
 * @param {fabric.Canvas} canvas - Canvas to interact
 * @param {string} instanceId - Id of the current canvas
 */
var useKeyHandlers = function (canvas, instanceId, permissions, allToolbarIsEnabled) {
    // Getting context variables
    var _a = React.useContext(WhiteboardContext), activeCanvas = _a.activeCanvas, perfectShapeIsActive = _a.perfectShapeIsActive, updatePerfectShapeIsActive = _a.updatePerfectShapeIsActive, perfectShapeIsAvailable = _a.perfectShapeIsAvailable, redo = _a.redo, undo = _a.undo;
    // Event serialization for synchronizing whiteboard state.
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    /**
     * General handler for keydown keyboard events
     * 'Backspace' event for removing selected element from whiteboard.
     * 'Escape' event for deselect active objects.
     * 'Shift' event for active the perfect shapes creation.
     * */
    var keyDownHandler = React.useCallback(function (e) {
        if (!(permissions.undoRedo || allToolbarIsEnabled))
            return;
        /**
         * Removes the current active objects in canvas
         */
        var removeSelectedObjects = function () {
            var _a, _b;
            var active = canvas.getActiveObject();
            if ((_a = active) === null || _a === void 0 ? void 0 : _a.isEditing)
                return;
            canvas.discardActiveObject();
            if ((active === null || active === void 0 ? void 0 : active.type) === 'activeSelection') {
                var objectIds_1 = [];
                active.forEachObject(function (object) {
                    var _a;
                    if (!((_a = object) === null || _a === void 0 ? void 0 : _a.isEditing)) {
                        object.groupClear = true;
                        objectIds_1.push(object.id);
                        canvas.remove(object);
                    }
                });
                var target = {
                    target: {
                        strategy: 'removeGroup',
                        objectIds: objectIds_1,
                    },
                };
                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('removed', target);
            }
            else {
                if (!((_b = active) === null || _b === void 0 ? void 0 : _b.isEditing)) {
                    canvas.remove(active);
                }
            }
        };
        /**
         * Checks if client's OS is MacOS or not
         */
        var isMacOS = function () {
            return navigator.appVersion.indexOf('Mac') !== -1;
        };
        /**
         * Checks if an Undo Shortcut is executed
         */
        var isUndoShortcut = function () {
            return ((event.ctrlKey || (isMacOS() && event.metaKey)) &&
                event.keyCode === 90 &&
                !event.shiftKey &&
                activeCanvas.current === instanceId);
        };
        /**
         * Checks if a Redo Shortcut is executed
         */
        var isRedoShortcut = function () {
            return (((event.keyCode === 89 && event.ctrlKey) ||
                (isMacOS() &&
                    event.metaKey &&
                    event.shiftKey &&
                    event.keyCode === 90)) &&
                activeCanvas.current === instanceId);
        };
        var event = e;
        // UNDO Keyboard Shortcut
        if (isUndoShortcut()) {
            undo();
            return;
        }
        // REDO Keyboard Shortcut
        if (isRedoShortcut()) {
            redo();
            return;
        }
        // Erase Object Keyboard Shortcut
        if (event.key === 'Backspace') {
            removeSelectedObjects();
            return;
        }
        // Deselect Active Object Keyboard Shortcut
        if (event.key === 'Escape') {
            canvas.discardActiveObject();
            canvas.renderAll();
        }
        // Active Perfect Shape
        if (event.key === 'Shift' &&
            !perfectShapeIsActive &&
            window.innerWidth > 768 &&
            perfectShapeIsAvailable()) {
            updatePerfectShapeIsActive(true);
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        permissions.undoRedo,
        allToolbarIsEnabled,
        perfectShapeIsActive,
        perfectShapeIsAvailable,
        canvas,
        eventSerializer,
        activeCanvas,
        instanceId,
        undo,
        redo,
        updatePerfectShapeIsActive,
    ]);
    /**
     * General handler for keyup keyboard events
     * 'Shift' event for deactive the perfect shapes creation
     */
    var keyUpHandler = React.useCallback(function (e) {
        var event = e;
        // Deactive Perfect Shape
        if (event.key === 'Shift' &&
            perfectShapeIsActive &&
            window.innerWidth > 768) {
            updatePerfectShapeIsActive(false);
        }
    }, [perfectShapeIsActive, updatePerfectShapeIsActive]);
    return {
        keyDownHandler: keyDownHandler,
        keyUpHandler: keyUpHandler,
    };
};

/**
 * Manages the logic for text object creation and edition
 * @param {fabric.Canvas} canvas - Canvas in which text object will be created
 * @param {string} instanceId - Canvas instance identifier
 * @param {string} userId - User that will create/edit the text objects
 * @param {ICanvasActions} actions - Shared functions for canvas
 * @param {IPermissions} permissions - User permissions in whiteboard tools
 */
var useTextObject = function (canvas, instanceId, userId, actions, permissions) {
    // Getting context data
    var _a = React.useContext(WhiteboardContext), allToolbarIsEnabled = _a.allToolbarIsEnabled, textIsActive = _a.textIsActive, fontFamily = _a.fontFamily, fontColor = _a.fontColor, eraseType = _a.eraseType, isLocalObject = _a.isLocalObject, text = _a.text;
    // Getting Event Serializer
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    // Getting Undo/Redo Dispatcher
    var undoRedoDispatch = UndoRedo(canvas, eventSerializer, userId).dispatch;
    // Getting Key Handlers
    var _b = useKeyHandlers(canvas, instanceId, permissions, allToolbarIsEnabled), keyUpHandler = _b.keyUpHandler, keyDownHandler = _b.keyDownHandler;
    /**
     * Loads selected font. Default is Arial
     * Send synchronization event for fontFamily changes.
     * */
    var fontFamilyLoader = React.useCallback(function (font) {
        var myFont = new FontFaceObserver__default['default'](font);
        myFont
            .load()
            .then(function () {
            var activeObject = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
            if (activeObject && activeObject.fontFamily !== font) {
                activeObject.set({ fontFamily: font });
                canvas.requestRenderAll();
                var objects_1 = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObjects();
                canvas.discardActiveObject();
                if (objects_1 && objects_1.length) {
                    objects_1.forEach(function (obj) {
                        if (obj.id && isLocalObject(obj.id, userId)) {
                            var type = obj.get('type');
                            if (type === 'textbox') {
                                var target = {
                                    fontFamily: obj.fontFamily,
                                };
                                var payload = {
                                    type: type,
                                    target: target,
                                    id: obj.id,
                                };
                                eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('fontFamilyChanged', payload);
                            }
                        }
                        if (objects_1.length === 1) {
                            var target = {
                                fontFamily: fontFamily,
                            };
                            var payload = {
                                type: obj.type,
                                target: target,
                                id: obj === null || obj === void 0 ? void 0 : obj.id,
                            };
                            var event_1 = { event: payload, type: 'fontFamilyChanged' };
                            undoRedoDispatch({
                                type: SET,
                                payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                                canvasId: userId,
                                event: event_1,
                            });
                        }
                    });
                }
                if (objects_1.length === 1) {
                    canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(objects_1[0]);
                }
                else if (objects_1.length >= 2) {
                    var activesGroup = new fabric.fabric.ActiveSelection(objects_1);
                    canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(activesGroup);
                }
            }
        })
            .catch(function (e) {
            console.log(e);
        });
    }, 
    /* If isLocalObject is added on dependencies,
    an unecessary event is triggered */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canvas, eventSerializer, userId]);
    /**
     * Handles the logic to write text on the whiteboard
     * */
    React.useEffect(function () {
        var toolbarIsEnabled = getToolbarIsEnabled();
        var teacherHasPermission = allToolbarIsEnabled && textIsActive;
        var studentHasPermission = toolbarIsEnabled && permissions.text && textIsActive;
        var mouseDown = function (e) {
            var _a;
            if (!e.pointer)
                return;
            var target = e.target, pointer = e.pointer;
            var type = target === null || target === void 0 ? void 0 : target.type;
            // If Click is made over anything except a text object
            if (!target || (type !== 'textbox' && type !== 'i-text')) {
                var text_1 = new fabric.fabric.IText(' ', {
                    fontFamily: fontFamily,
                    fontSize: 30,
                    fontWeight: 400,
                    fill: fontColor,
                    fontStyle: 'normal',
                    top: pointer.y,
                    left: pointer.x,
                    cursorDuration: 500,
                    lockMovementX: true,
                    lockMovementY: true,
                    hasRotatingPoint: false,
                    hoverCursor: 'default',
                });
                canvas.add(text_1);
                canvas.setActiveObject(text_1);
                text_1.enterEditing();
                (_a = text_1 === null || text_1 === void 0 ? void 0 : text_1.hiddenTextarea) === null || _a === void 0 ? void 0 : _a.focus();
                // When text edition is out
                text_1.on('editing:exited', function () {
                    var _a, _b;
                    var textCopy = (_a = text_1.text) === null || _a === void 0 ? void 0 : _a.trim();
                    var toObject = text_1.toObject();
                    delete toObject.text;
                    delete toObject.type;
                    var clonedTextObj = JSON.parse(JSON.stringify(toObject));
                    clonedTextObj.id = userId + ":" + uuid.v4();
                    clonedTextObj.lockMovementX = true;
                    clonedTextObj.lockMovementY = true;
                    clonedTextObj.hasRotatingPoint = false;
                    clonedTextObj.hoverCursor = 'default';
                    // IText is converted to Textbox to could resise it
                    if (typeof textCopy === 'string') {
                        text_1 = new fabric.fabric.Textbox(textCopy, clonedTextObj);
                    }
                    // IText object is removed
                    canvas.remove(canvas.getActiveObject());
                    // Textbox is added is setted like active object
                    canvas.add(text_1);
                    canvas.setActiveObject(text_1);
                    // If Textbox is empty, it will be removed from canvas
                    if (((_b = text_1 === null || text_1 === void 0 ? void 0 : text_1.text) === null || _b === void 0 ? void 0 : _b.replace(/\s/g, '').length) === 0) {
                        canvas.remove(canvas.getActiveObject());
                        return;
                    }
                    /* If a created Textbox is modified,
                    it will be removed because a new Textbox object was be created */
                    text_1.on('modified', function () {
                        var _a;
                        if (((_a = text_1 === null || text_1 === void 0 ? void 0 : text_1.text) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, '').length) === 0) {
                            canvas.remove(canvas.getActiveObject());
                        }
                    });
                });
            }
        };
        if (teacherHasPermission || studentHasPermission) {
            canvas.on('mouse:down', mouseDown);
        }
        else {
            var active = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
            if (active && active.isEditing) {
                canvas.discardActiveObject();
                canvas.renderAll();
            }
        }
        return function () {
            if (!eraseType) {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down', mouseDown);
            }
        };
    }, [
        allToolbarIsEnabled,
        canvas,
        eraseType,
        fontColor,
        fontFamily,
        permissions.text,
        textIsActive,
        userId,
    ]);
    /**
     * Handles the logic to set the Textbox auto grownable and text responsive
     */
    React.useEffect(function () {
        var currentTextbox;
        var textboxCopy;
        if (textIsActive) {
            /**
             * Entering to edit a text object
             * Textbox transformed in IText
             */
            canvas === null || canvas === void 0 ? void 0 : canvas.on('text:editing:entered', function (e) {
                var _a;
                if (((_a = e.target) === null || _a === void 0 ? void 0 : _a.type) === 'textbox') {
                    var counter_1 = 0;
                    var textCopy_1 = '';
                    /**
                     * Emulates the aspect of a Textbox keeping the lines
                     * that this had in the new IText object
                     */
                    var setLines = function () {
                        currentTextbox.textLines.forEach(function (line, index) {
                            var _a;
                            var separator = ((_a = currentTextbox.text) === null || _a === void 0 ? void 0 : _a.charCodeAt(counter_1 + line.length)) === 10
                                ? '\n'
                                : ' \n';
                            if (index === currentTextbox.textLines.length - 1) {
                                separator = '';
                            }
                            textCopy_1 += "" + line + separator;
                            counter_1 += line.length + 1;
                        });
                    };
                    canvas.remove(textboxCopy);
                    currentTextbox = e.target;
                    setLines();
                    // Preparing Textbox properties to be setted in IText object
                    var textboxProps = JSON.parse(JSON.stringify(currentTextbox));
                    delete textboxProps.text;
                    delete textboxProps.type;
                    textboxProps.type = 'i-text';
                    textboxProps.visible = true;
                    textboxProps.width = currentTextbox.width;
                    textboxProps.height = currentTextbox.height;
                    if (currentTextbox.id) {
                        textboxProps.id = currentTextbox.id;
                    }
                    // Adding the IText and hiding the Textbox
                    if (typeof textCopy_1 === 'string') {
                        textboxCopy = new fabric.fabric.IText(textCopy_1.trim(), textboxProps);
                        canvas.add(textboxCopy);
                        canvas.setActiveObject(textboxCopy);
                        textboxCopy.enterEditing();
                        currentTextbox.set({
                            visible: false,
                        });
                        canvas.renderAll();
                    }
                }
            });
            /**
             * Text has been changed is some Text Object in canvas
             */
            canvas === null || canvas === void 0 ? void 0 : canvas.on('text:changed', function (e) {
                if (!(e === null || e === void 0 ? void 0 : e.target).id) {
                    // use native canvas to show new text box in realtime
                    var payload = {
                        type: 'textbox',
                        target: e.target,
                        id: 'teacher',
                    };
                    eventSerializer.push('textEdit', payload);
                }
                else {
                    var payload = {
                        type: 'textbox',
                        target: e.target,
                        id: e.target.id,
                    };
                    eventSerializer.push('modified', payload);
                }
            });
            /**
             * Text Edition finished on IText object
             * IText transformed in Textbox
             */
            canvas === null || canvas === void 0 ? void 0 : canvas.on('text:editing:exited', function (e) {
                var _a, _b;
                if (!textboxCopy || !textboxCopy.width)
                    return;
                var textboxWidth = textboxCopy.width;
                // Updating/showing the Textbox and hiding the IText
                if (currentTextbox && ((_a = e.target) === null || _a === void 0 ? void 0 : _a.type) === 'i-text') {
                    textboxCopy.set('isEditing', false);
                    currentTextbox.set({
                        width: textboxWidth + 10,
                        height: textboxCopy.height,
                        visible: true,
                        text: (_b = textboxCopy.text) === null || _b === void 0 ? void 0 : _b.trim(),
                    });
                    canvas.setActiveObject(currentTextbox);
                    currentTextbox.set({ isEditing: true });
                    textboxCopy.set({ visible: false });
                    canvas.discardActiveObject();
                    canvas.renderAll();
                }
            });
        }
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('text:editing:entered');
            canvas === null || canvas === void 0 ? void 0 : canvas.off('text:editing:exited');
        };
    }, [canvas, eventSerializer, textIsActive]);
    /**
     * Is executed when textIsActive changes its value,
     * basically to deselect any selected object
     */
    React.useEffect(function () {
        if (!textIsActive) {
            canvas === null || canvas === void 0 ? void 0 : canvas.discardActiveObject();
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        }
    }, [canvas, textIsActive]);
    /**
     * If the input field (text) has length
     * will unselect whiteboard active objects
     * */
    React.useEffect(function () {
        if (text === null || text === void 0 ? void 0 : text.length) {
            actions.discardActiveObject();
        }
    }, [actions, text, textIsActive]);
    /**
     * Add keyboard keydown event listener. It listen keyDownHandler function
     * Invokes fontFamilyLoader to set default and selected font family
     * */
    React.useEffect(function () {
        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);
        fontFamilyLoader(fontFamily);
        return function () {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, [fontFamily, fontFamilyLoader, keyDownHandler, keyUpHandler]);
};

/**
 * Function to create gif as object
 *
 * @param image Image to upload
 * @param userId User id
 * @param canvas Canvas instance
 */
function createGif(image, userId, canvas) {
    return __awaiter(this, void 0, void 0, function () {
        var gif, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fabricGif(image, 200, 200, 2000)];
                case 1:
                    gif = _a.sent();
                    gif.set({ top: 0, left: 0 });
                    gif.id = userId + ":" + uuid.v4();
                    canvas.add(gif);
                    fabric.fabric.util.requestAnimFrame(function render() {
                        canvas.renderAll();
                        fabric.fabric.util.requestAnimFrame(render);
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Function to create an image object
 *
 * @param image Image to upload
 * @param userId User id
 * @param canvas Canvas instance
 * @param laserIsActive Indicates if laser is active, if so, image will not be selectable
 */
function createImageAsObject(image, userId, canvas, laserIsActive) {
    return fabric.fabric.Image.fromURL(image, function (img) {
        var objectImage = img.set({
            left: 0,
            top: 0,
            selectable: !laserIsActive,
        });
        img.scaleToHeight(250);
        img.scaleToWidth(250);
        objectImage.id = userId + ":" + uuid.v4();
        canvas === null || canvas === void 0 ? void 0 : canvas.add(objectImage);
    });
}
/**
 * Function to create a Background Image
 *
 * @param image Image to upload
 * @param userId User id
 * @param canvas Canvas instance
 */
function createBackgroundImage(image, userId, canvas) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    fabric.fabric.Image.fromURL(image, function (img) {
                        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                            scaleX: (canvas.width || 0) / (img.width || 0),
                            scaleY: (canvas.height || 0) / (img.height || 0),
                            originX: 'left',
                            originY: 'top',
                            id: userId + ":" + uuid.v4(),
                        });
                        resolve();
                    });
                })];
        });
    });
}

/**
 * Handles the logic for upload images on Whiteboard
 * (image objects and background images)
 * @param {fabric.Canvas} canvas - Canvas to set the image
 * @param {string} userId - User that will set the image
 */
var useAddImage = function (canvas, userId) {
    // Getting context variables
    var _a = React.useContext(WhiteboardContext), isBackgroundImage = _a.isBackgroundImage, setIsBackgroundImage = _a.setIsBackgroundImage, backgroundImageIsPartialErasable = _a.backgroundImageIsPartialErasable, backgroundImage = _a.backgroundImage, setLocalImage = _a.setLocalImage, setLocalBackground = _a.setLocalBackground, updateBackgroundColor = _a.updateBackgroundColor, isGif = _a.isGif, image = _a.image, laserIsActive = _a.laserIsActive;
    /**
     * Handles the logic to add images and gifs as objects
     * and background images to the whiteboard.
     */
    React.useEffect(function () {
        if (!canvas)
            return;
        var imageSetup = function () { return __awaiter(void 0, void 0, void 0, function () {
            var payload_1, id, payload, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!isBackgroundImage) return [3 /*break*/, 4];
                        updateBackgroundColor('#000000');
                        setLocalBackground(false);
                        canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
                        if (!backgroundImageIsPartialErasable) return [3 /*break*/, 2];
                        return [4 /*yield*/, createBackgroundImage(backgroundImage.toString(), userId, canvas)];
                    case 1:
                        _a.sent();
                        if (!canvas.backgroundImage)
                            return [2 /*return*/];
                        payload_1 = {
                            id: canvas.backgroundImage.id,
                            type: 'backgroundImage',
                            target: canvas.backgroundImage,
                        };
                        canvas.trigger('object:added', payload_1);
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, setLocalImage(backgroundImage)];
                    case 3:
                        _a.sent();
                        id = userId + ":" + uuid.v4();
                        payload = {
                            type: 'localImage',
                            target: { backgroundImage: backgroundImage, id: id },
                            id: id,
                        };
                        canvas.trigger('object:added', payload);
                        setIsBackgroundImage(false);
                        return [2 /*return*/];
                    case 4:
                        if (!(isGif && image)) return [3 /*break*/, 6];
                        /*
                          We use then to avoid inspector warning
                          about ignoring the promise returned
                        */
                        return [4 /*yield*/, createGif(image, userId, canvas)];
                    case 5:
                        /*
                          We use then to avoid inspector warning
                          about ignoring the promise returned
                        */
                        _a.sent();
                        return [2 /*return*/];
                    case 6:
                        if (image && !isGif) {
                            createImageAsObject(image.toString(), userId, canvas, laserIsActive);
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        imageSetup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        image,
        backgroundImage,
        canvas,
        setIsBackgroundImage,
        isGif,
        setLocalBackground,
        setLocalImage,
        updateBackgroundColor,
        userId,
    ]);
};

/**
 * Handles the logic for change lineWidth in path and shape objects
 * @param {fabric.Canvas} canvas - Canvas in which the objects to modify are.
 * @param {string} userId - User that will modify lineWidth in objects.
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher to
 * save lineWidth changes and could make undo/redo over them
 */
var useChangeLineWidth = function (canvas, userId, undoRedoDispatch) {
    // Getting lineWidth context variable
    var _a = React.useContext(WhiteboardContext), lineWidth = _a.lineWidth, lineWidthIsActive = _a.lineWidthIsActive;
    // Getting lineWidth change synchronization effect
    var changeLineWidthSync = useSynchronization(userId).changeLineWidthSync;
    // Getting event serializer to synchronize lineWidth changes
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    /**
     * Checks if the given object is a common path object
     * @param {ICanvasObject} object - Object to check
     */
    var isCommonBrush = React.useCallback(function (object) {
        var _a;
        return ((isEmptyShape(object) || isFreeDrawing(object)) &&
            ((_a = object.basePath) === null || _a === void 0 ? void 0 : _a.type) === 'pencil');
    }, []);
    /**
     * Checks if the given object is a custom path object
     * @param {ICanvasBrush} object - Object to check
     */
    var isCustomBrush = React.useCallback(function (object) {
        var _a;
        return ((object.type === 'group' && object.basePath) ||
            (object.type === 'image' && object.basePath) ||
            (object.type === 'path' &&
                ((_a = object.basePath) === null || _a === void 0 ? void 0 : _a.type) === 'dashed'));
    }, []);
    /**
     * If lineWidth variable changes and a free line drawing is selected
     * that drawing line width will change to the selected width on Toolbar
     */
    React.useEffect(function () {
        var newActives = [];
        var activeObjects = [];
        /**
         * Handles the logic for change strokeWidth property
         * in a custom path object
         * @param {ICanvasBrush} object - Custom Path Object to change its width
         */
        var customBrushChange = function (object, isUnique) { return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, changeLineWidthInSpecialBrushes(canvas, userId, object, lineWidth)
                            .then(function (newObject) {
                            var basePath = newObject.basePath;
                            newActives.push(newObject);
                            payload = {
                                type: newObject.type,
                                target: {
                                    basePath: {
                                        points: (basePath === null || basePath === void 0 ? void 0 : basePath.points) || [],
                                        strokeWidth: Number(basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth),
                                        stroke: String(basePath === null || basePath === void 0 ? void 0 : basePath.stroke),
                                        bristles: basePath === null || basePath === void 0 ? void 0 : basePath.bristles,
                                        imageData: basePath === null || basePath === void 0 ? void 0 : basePath.imageData,
                                    },
                                },
                                id: String(newObject.id),
                            };
                            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('lineWidthChanged', payload);
                            if (isUnique) {
                                // Payload for undo/redo dispatcher
                                var undoRedoPayload = {
                                    type: newObject.type,
                                    target: { strokeWidth: basePath === null || basePath === void 0 ? void 0 : basePath.strokeWidth },
                                    id: newObject === null || newObject === void 0 ? void 0 : newObject.id,
                                };
                                // Event for undo/redo dispatcher
                                var event_1 = {
                                    event: undoRedoPayload,
                                    type: 'lineWidthChanged',
                                };
                                // Disptaching line width change for custom paths
                                undoRedoDispatch({
                                    type: SET,
                                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                                    canvasId: userId,
                                    event: event_1,
                                });
                            }
                        })
                            .catch(function (e) {
                            if (e.message === 'lineWidth is the same') {
                                newActives.push(object);
                            }
                            else {
                                console.warn(e);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Handles the logic for change strokeWidth property
         * in a common path object
         * @param {ICanvasObject} object - Path Object to change its width
         * @param {boolean} isUnique - Flag to know if is a single active object
         * or has sibling active objects
         */
        var commonBrushChange = function (object, isUnique) {
            var _a, _b;
            var target = { strokeWidth: lineWidth };
            object.set(target);
            newActives.push(object);
            changeLineWidthSync(object);
            if (((_a = object.basePath) === null || _a === void 0 ? void 0 : _a.type) === 'dashed') {
                object.set({
                    strokeDashArray: [lineWidth * 2],
                });
            }
            // Updating basePath
            if (isFreeDrawing(object) &&
                ((_b = object.basePath) === null || _b === void 0 ? void 0 : _b.type) !== 'dashed') {
                var basePath = object.basePath;
                object.set({
                    basePath: {
                        type: basePath === null || basePath === void 0 ? void 0 : basePath.type,
                        points: basePath === null || basePath === void 0 ? void 0 : basePath.points,
                        stroke: basePath === null || basePath === void 0 ? void 0 : basePath.stroke,
                        strokeWidth: lineWidth,
                    },
                });
            }
            if (isUnique) {
                var type = object.get('type');
                var payload = {
                    type: type,
                    target: target,
                    id: object.id,
                };
                var event_2 = { event: payload, type: 'lineWidthChanged' };
                undoRedoDispatch({
                    type: SET,
                    payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                    canvasId: userId,
                    event: event_2,
                });
            }
        };
        var changeLineWidth = function () { return __awaiter(void 0, void 0, void 0, function () {
            var selection, isUniqueObject, _i, activeObjects_1, object, activesGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!canvas)
                            return [2 /*return*/];
                        selection = canvas.getActiveObject();
                        if ((selection === null || selection === void 0 ? void 0 : selection.type) === 'activeSelection') {
                            activeObjects = selection._objects;
                        }
                        else {
                            activeObjects = canvas.getActiveObjects();
                        }
                        isUniqueObject = activeObjects.length === 1;
                        if (!activeObjects)
                            return [2 /*return*/];
                        canvas.discardActiveObject();
                        _i = 0, activeObjects_1 = activeObjects;
                        _a.label = 1;
                    case 1:
                        if (!(_i < activeObjects_1.length)) return [3 /*break*/, 5];
                        object = activeObjects_1[_i];
                        canvas.discardActiveObject();
                        if (!isCommonBrush(object)) return [3 /*break*/, 2];
                        commonBrushChange(object, isUniqueObject);
                        return [3 /*break*/, 4];
                    case 2:
                        if (!isCustomBrush(object)) return [3 /*break*/, 4];
                        return [4 /*yield*/, customBrushChange(object, isUniqueObject)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        if (newActives.length === 1) {
                            canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(newActives[0]);
                        }
                        else if (newActives.length >= 2) {
                            activesGroup = new fabric.fabric.ActiveSelection(newActives);
                            canvas === null || canvas === void 0 ? void 0 : canvas.setActiveObject(activesGroup);
                        }
                        canvas.renderAll();
                        return [2 /*return*/];
                }
            });
        }); };
        if (!lineWidthIsActive)
            return;
        changeLineWidth();
        /* If commonBrushChange is added on dependencies
        useEffect is loading more than the necesary times
        and some issues are happening */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        lineWidth,
        canvas,
        undoRedoDispatch,
        userId,
        isCommonBrush,
        isCustomBrush,
        eventSerializer,
    ]);
};

/**
 * Handles the logic for lineWidth, fontFamily and fontColor undo/redo actions
 * @param {fabric.Canvas} canvas - Canvas in which the action is made
 * @param {string} userId - User that will do the action
 * @param {(action: CanvasAction) => void} undoRedoDispatch - Dispatcher to save
 * the events to could make undo/redo over them.
 */
var useUndoRedo = function (canvas, userId, undoRedoDispatch) {
    // Getting context variables
    var _a = React.useContext(WhiteboardContext), lineWidth = _a.lineWidth, fontFamily = _a.fontFamily, fontColor = _a.fontColor;
    /**
     * Maps the current objects in canvas to set the correct
     * properties in activeSelection objects
     */
    var setMappedObjects = React.useCallback(function (events) {
        return canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().map(function (object) {
            /* If object doesn't belongs to an activeSelection
            it's just passed directly for the filter */
            if (!object.group) {
                return object.toJSON(CANVAS_OBJECT_PROPS);
            }
            var matrix = object.calcTransformMatrix();
            var options = fabric.fabric.util.qrDecompose(matrix);
            var transformed = object.toJSON(CANVAS_OBJECT_PROPS);
            // Getting correct top and left properties
            var top = Number(object.group.height) / 2 +
                Number(object.top) +
                Number(object.group.top);
            var left = Number(object.group.width) / 2 +
                Number(object.left) +
                Number(object.group.left);
            // Setting correct top and left properties
            events.forEach(function (event) {
                var singleEvent = event.event;
                if (singleEvent.id === object.id) {
                    singleEvent.target.top = top;
                    singleEvent.target.left = left;
                }
            });
            return __assign(__assign({}, transformed), { top: top,
                left: left, scaleX: options.scaleX, scaleY: options.scaleY });
        });
    }, [canvas]);
    // LineWidth Property undo/redo in group of objects
    React.useEffect(function () {
        if (lineWidth && canvas) {
            var obj = canvas.getActiveObject();
            var type = obj === null || obj === void 0 ? void 0 : obj.get('type');
            if (!obj || type !== 'activeSelection')
                return;
            var activeIds = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject().getObjects().map(function (o) { return o.id; });
            var payload = {
                type: type,
                svg: true,
                target: null,
                id: userId + ":group",
            };
            var event_1 = { event: payload, type: 'activeSelection', activeIds: activeIds };
            var filtered = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (o) {
                return !o.group;
            });
            var active = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject();
            active === null || active === void 0 ? void 0 : active.set({ id: userId + ":group" });
            undoRedoDispatch({
                type: SET_GROUP,
                payload: __spreadArrays(filtered, [active]),
                canvasId: userId,
                event: event_1,
            });
        }
    }, [lineWidth, canvas, undoRedoDispatch, userId]);
    // FontFamily Property undo/redo in group of objects
    React.useEffect(function () {
        var _a;
        if (fontFamily && canvas) {
            var obj = canvas.getActiveObject();
            var type_1 = obj === null || obj === void 0 ? void 0 : obj.get('type');
            var target_1 = { fontFamily: fontFamily };
            if (type_1 === 'activeSelection') {
                var events_1 = [];
                var eventId_1 = uuid.v4();
                (_a = obj._objects) === null || _a === void 0 ? void 0 : _a.forEach(function (object) {
                    var payload = {
                        type: type_1,
                        target: target_1,
                        id: object.id,
                    };
                    var event = { event: payload, type: 'activeSelection', eventId: eventId_1 };
                    events_1.push(event);
                    object.set(target_1);
                });
                var mappedObjects = setMappedObjects(events_1);
                undoRedoDispatch({
                    type: SET_GROUP,
                    payload: mappedObjects,
                    canvasId: userId,
                    event: events_1,
                });
            }
        }
    }, [canvas, fontFamily, setMappedObjects, undoRedoDispatch, userId]);
    // FontColor Property undo/redo in group of objects
    React.useEffect(function () {
        if (fontColor && canvas) {
            var object = canvas.getActiveObject();
            var type = object === null || object === void 0 ? void 0 : object.get('type');
            if (type === 'activeSelection') {
                var events_2 = [];
                var eventId_2 = uuid.v4();
                object.forEachObject(function (obj) {
                    var type = obj === null || obj === void 0 ? void 0 : obj.get('type');
                    if (type !== 'textbox')
                        return;
                    var payload = {
                        type: type,
                        target: { fill: obj === null || obj === void 0 ? void 0 : obj.fill },
                        id: obj === null || obj === void 0 ? void 0 : obj.id,
                    };
                    var event = { event: payload, type: 'activeSelection', eventId: eventId_2 };
                    events_2.push(event);
                });
                var mappedObjects = setMappedObjects(events_2);
                undoRedoDispatch({
                    type: SET_GROUP,
                    payload: mappedObjects,
                    canvasId: userId,
                    event: events_2,
                });
            }
        }
    }, [fontColor, canvas, undoRedoDispatch, userId, setMappedObjects]);
};

var useSynchronizedBrushTypeChanged = function (canvas, userId, shouldHandleRemoteEvent) {
    var eventController = useSharedEventSerializer().state.eventController;
    // Handling remote events
    React.useEffect(function () {
        /**
         * Add the given path in current canvas
         * @param {ICanvasBrush} path - Path to add
         * @param {ICanvasObject} oldPath - Previous path
         * with properties to set in the new one
         * @param {ICanvasBrush} target - received target from event
         */
        var addPathInCanvas = function (path, oldPath, target) {
            path.set({
                id: oldPath.id,
                top: target.top,
                left: target.left,
                angle: oldPath.angle,
                scaleX: oldPath.scaleX,
                scaleY: oldPath.scaleY,
                flipX: oldPath.flipX,
                flipY: oldPath.flipY,
                selectable: false,
                evented: false,
            });
            delete oldPath.id;
            canvas === null || canvas === void 0 ? void 0 : canvas.remove(oldPath);
            canvas === null || canvas === void 0 ? void 0 : canvas.add(path);
        };
        var brushTypeChanged = function (id, target) {
            if (!shouldHandleRemoteEvent(id))
                return;
            canvas === null || canvas === void 0 ? void 0 : canvas.forEachObject(function (object) { return __awaiter(void 0, void 0, void 0, function () {
                var brush, newPath_1, basePath_1, type, points, original_1, _a, imageSrc;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(object.id && object.id === id)) return [3 /*break*/, 8];
                            brush = void 0;
                            basePath_1 = target.basePath;
                            type = basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.type;
                            points = (basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.points).map(function (point) {
                                return new fabric.fabric.Point(point.x, point.y);
                            });
                            if (isEmptyShape(object) &&
                                !object.basePath) {
                                original_1 = shapePoints[object.name];
                                points = original_1.points.map(function (point) {
                                    var scaleX = (point.x / original_1.width) * Number(object.width);
                                    var scaleY = (point.y / original_1.height) * Number(object.height);
                                    return new fabric.fabric.Point(scaleX, scaleY);
                                });
                            }
                            _a = type;
                            switch (_a) {
                                case 'dashed': return [3 /*break*/, 1];
                                case 'pencil': return [3 /*break*/, 1];
                                case 'pen': return [3 /*break*/, 2];
                                case 'marker': return [3 /*break*/, 3];
                                case 'felt': return [3 /*break*/, 3];
                                case 'paintbrush': return [3 /*break*/, 4];
                                case 'chalk': return [3 /*break*/, 5];
                                case 'crayon': return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 7];
                        case 1:
                            brush = new fabric.fabric.PencilBrush();
                            newPath_1 = brush.createPath(brush.convertPointsToSVGPath(points).join(''));
                            newPath_1.set({
                                stroke: basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.stroke,
                                strokeWidth: basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.strokeWidth,
                                strokeUniform: true,
                                strokeDashArray: type === 'dashed' ? [Number(basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.strokeWidth) * 2] : [],
                                basePath: {
                                    type: type,
                                    points: (basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.points) || [],
                                    stroke: String(basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.stroke),
                                    strokeWidth: Number(basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.strokeWidth),
                                },
                            });
                            return [3 /*break*/, 7];
                        case 2:
                            brush = new PenBrush(canvas, userId);
                            newPath_1 = brush.createPenPath(String(object.id), basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.points, Number(basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.strokeWidth), String(basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.stroke));
                            return [3 /*break*/, 7];
                        case 3:
                            brush = new MarkerBrush(canvas, userId, type);
                            newPath_1 = brush.createMarkerPath(String(object.id), points, Number(basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.strokeWidth), String(basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.stroke));
                            return [3 /*break*/, 7];
                        case 4:
                            brush = new PaintBrush(canvas, userId);
                            newPath_1 = brush.modifyPaintBrushPath(String(object.id), points, Number(basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.strokeWidth), String(basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.stroke), (basePath_1 === null || basePath_1 === void 0 ? void 0 : basePath_1.bristles) || []);
                            return [3 /*break*/, 7];
                        case 5:
                            imageSrc = String((_b = target.basePath) === null || _b === void 0 ? void 0 : _b.imageData);
                            return [4 /*yield*/, fabric.fabric.Image.fromURL(imageSrc, function (data) {
                                    newPath_1 = data;
                                    newPath_1.set({
                                        basePath: basePath_1,
                                    });
                                    addPathInCanvas(newPath_1, object, target);
                                })];
                        case 6:
                            _c.sent();
                            return [3 /*break*/, 7];
                        case 7:
                            if (!newPath_1)
                                return [2 /*return*/];
                            addPathInCanvas(newPath_1, object, target);
                            _c.label = 8;
                        case 8: return [2 /*return*/];
                    }
                });
            }); });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('brushTypeChanged', brushTypeChanged);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('brushTypeChanged', brushTypeChanged);
        };
    }, [canvas, eventController, shouldHandleRemoteEvent, userId]);
};

/**
 * Handles the logic for pointer feature
 * @param {fabric.Canvas} canvas - Canvas in which pointer will change
 * @param {string} userId - Current user
 */
var usePointerFeature = function (canvas, userId, permissions) {
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    var _a = React.useContext(WhiteboardContext), pointerEvents = _a.pointerEvents, floodFillIsActive = _a.floodFillIsActive, updatePointer = _a.updatePointer, setPointerEvents = _a.setPointerEvents, allToolbarIsEnabled = _a.allToolbarIsEnabled, findObjectById = _a.findObjectById;
    // Changes canvas defaultCursor to selected pointer or default cursor
    React.useEffect(function () {
        if (!canvas || floodFillIsActive)
            return;
        if (pointerEvents) {
            var pointer = findObjectById(userId + ":cursor");
            canvas === null || canvas === void 0 ? void 0 : canvas.remove(pointer);
        }
        canvas.defaultCursor = pointerEvents ? 'default' : 'none';
    }, [canvas, findObjectById, floodFillIsActive, pointerEvents, userId]);
    // Updates the involucrated states when permission is revoked
    React.useEffect(function () {
        if (canvas && !(permissions.cursorPointer || allToolbarIsEnabled)) {
            var pointer = findObjectById(userId + ":cursor");
            updatePointer('arrow');
            setPointerEvents(true);
            canvas.defaultCursor = 'default';
            canvas.remove(pointer);
        }
    }, [
        allToolbarIsEnabled,
        canvas,
        findObjectById,
        permissions.cursorPointer,
        setPointerEvents,
        updatePointer,
        userId,
    ]);
    // Send an event to remove the current cursor when permission is revoked
    React.useEffect(function () {
        if (pointerEvents) {
            var cursorId = userId + ":cursor";
            var payload = {
                type: 'cursorPointer',
                target: { top: 0, left: 0, cursorPointer: 'none' },
                id: cursorId,
            };
            eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('cursorPointer', payload);
        }
    }, [eventSerializer, pointerEvents, userId]);
};

var img$2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAMAAACTKxybAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAASFBMVEUAAAAAAQ4CBRYBAhAAAA4BAhACBBUBAQ8BAhEAAQ8BAQ8BARADBRgBAhICBRf////09Pf4+fvw8PPo6Orh4eOztLzCwsnW1tie05h6AAAAD3RSTlMA5ze99LxN07TX0cwanjErspFPAAAAAWJLR0QPGLoA2QAAAAlwSFlzAAAAyAAAAMgAY/rnrQAAAAd0SU1FB+UBGhE7LewQxNAAAAABb3JOVAHPoneaAAAAEGNhTnYAAAAgAAAAIAAAAAAAAAAAYrnu+gAAAGNJREFUCNdNzlkOgCAMBNCyKOA2qCj3v6lllX7NyySTkpD0n1CDBAYJDGJA+QG9y2gqqKo4sypwJTXgZnUgqAzPA+kSvH4wzWXNa2kQTAZnsi9sqhRnkg5x6b/biLVjc/tB9AFp+gW83/IGegAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMS0yNlQxNzo1OTo0NSswMDowMPC3OrIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDEtMjZUMTc6NTk6NDQrMDA6MDAnnYm6AAAAAElFTkSuQmCC";

var img$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAVCAQAAAAK9c1nAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAMgAAADIAGP6560AAAAHdElNRQflARoROy51GZVqAAAAAW9yTlQBz6J3mgAAABBjYU52AAAAIAAAACAAAAAGAAAACOMik2gAAABNSURBVCjPvdExDgAgCANA/v/pilFRIlYHYlnPpILIDHRoUMPRd0JYJww6YtC2gZiMbvYiIg3hlPWPYLE+KYQ2uhC/wBwSoP1OLyQYTQHy0HCePatVlAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMS0yNlQxNzo1OTo0NSswMDowMPC3OrIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDEtMjZUMTc6NTk6NDQrMDA6MDAnnYm6AAAAAElFTkSuQmCC";

var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAQAAAA3m5V5AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAMgAAADIAGP6560AAAAHdElNRQflARoSAwJSGPsrAAAAAW9yTlQBz6J3mgAAABBjYU52AAAAIAAAACAAAAAIAAAAB8ytMJgAAAAdSURBVCjPY2BABf/BkAAYkYr+EwGpqGg0xIlRBACI2mWbGaZnQgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMS0yNlQxODowMzowMCswMDowMGfA8lEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDEtMjZUMTg6MDE6NDkrMDA6MDADutH5AAAAAElFTkSuQmCC";

/**
 * Handles Cursor Pointer Events
 * @param {fabric.Canvas | undefined} canvas - Current Canvas
 * @param {string} userId - User that send the event
 * @param {(id: string) => boolean} shouldHandleRemoteEvent - Checks if
 * an event should be handled
 */
var useSynchronizedCursorPointer = function (canvas, userId, shouldHandleRemoteEvent) {
    var _a = React.useContext(WhiteboardContext), pointerEvents = _a.pointerEvents, pointer = _a.pointer, findObjectById = _a.findObjectById;
    var _b = useSharedEventSerializer().state, eventSerializer = _b.eventSerializer, eventController = _b.eventController;
    /**
     * Creates an image of the current cursor to be rendered in remote canvases
     * @param {string} id - Id to set in the image
     * @param {number} top - Vertical position for the image
     * @param {number} left - Horizontal position for the image
     * @param {IPointerType} cursorPointer - Cursor pointer to render
     */
    var createCursor = React.useCallback(function (id, top, left, cursorPointer) { return __awaiter(void 0, void 0, void 0, function () {
        var imagePath;
        return __generator(this, function (_a) {
            imagePath = getImagePath(cursorPointer);
            return [2 /*return*/, new Promise(function (resolve) {
                    fabric.fabric.Image.fromURL(imagePath, function (img) {
                        // Setting image's position
                        var objectImage = img.set({
                            left: left,
                            top: top,
                            evented: false,
                            selectable: false,
                        });
                        // Finding for an existing object with the same id
                        var existentPointer = findObjectById(id);
                        // If another object exists it will be removed
                        if (existentPointer) {
                            canvas === null || canvas === void 0 ? void 0 : canvas.remove(existentPointer);
                            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                        }
                        // Adding cursor on remote canvases
                        objectImage.set({ id: id, cursorPointer: cursorPointer });
                        canvas === null || canvas === void 0 ? void 0 : canvas.add(objectImage);
                        resolve();
                    });
                })];
        });
    }); }, [canvas, findObjectById]);
    /**
     * Returns the image path according with the given cursorPointer
     * @param {IPointerType} cursorPointer - Cursor Pointer Type
     * to get its image path
     */
    var getImagePath = function (cursorPointer) {
        switch (cursorPointer) {
            case 'arrow':
                return img$2;
            case 'hand':
                return img$1;
            case 'crosshair':
                return img;
        }
    };
    /**
     * Renders the given cursor in the given point in the current canvas
     * @param {number} top - Vertical position to render the pointer
     * @param {number} left - Horizontal position to render the pointer
     * @param {IPointerType} cursorPointer - Pointer type to render
     * @param {string} cursorId - Id for the pointer object
     */
    var renderPointer = React.useCallback(function (top, left, cursorPointer, cursorId) { return __awaiter(void 0, void 0, void 0, function () {
        var pointerImage, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pointerImage = findObjectById(cursorId);
                    /*
                      If cursor pointer type is 'none', current pointer will be removed.
                      If a cursor pointer type occurs, current pointer will be removed.
                    */
                    if (pointerImage &&
                        (cursorPointer === 'none' ||
                            pointerImage.cursorPointer !== cursorPointer)) {
                        canvas === null || canvas === void 0 ? void 0 : canvas.remove(pointerImage);
                        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                    }
                    if (!pointerImage) return [3 /*break*/, 1];
                    pointerImage.set({ top: top, left: left });
                    canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                    return [3 /*break*/, 4];
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, createCursor(cursorId, top, left, cursorPointer)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.warn(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [canvas, createCursor, findObjectById]);
    /** Emits local event. */
    React.useEffect(function () {
        var id = userId + ":cursor";
        /**
         * Handles moving event for cursor pointer. Emits event to other users.
         * @param {CanvasEvent} event - Canvas event.
         */
        var move = function (event) {
            var top = event.pointer.y;
            var left = event.pointer.x;
            renderPointer(top, left, pointer, id);
            var payload = {
                type: 'cursorPointer',
                target: { top: top, left: left, cursorPointer: pointer },
                id: id,
            };
            eventSerializer.push('cursorPointer', payload);
        };
        if (!pointerEvents) {
            canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:move', move);
        }
        return function () {
            canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:move', move);
        };
    }, [canvas, eventSerializer, pointer, pointerEvents, renderPointer, userId]);
    /** Register and handle remote moved event. */
    React.useEffect(function () {
        /**
         * Handles moving event for cursor pointer. Receives event.
         * @param {string} id - User ID.
         * Used for know who's send the event.
         * @param {IPointerTarget} target - Properites for laser pointer.
         */
        var moved = function (id, target) { return __awaiter(void 0, void 0, void 0, function () {
            var top, left, cursorPointer;
            return __generator(this, function (_a) {
                if (!shouldHandleRemoteEvent(id))
                    return [2 /*return*/];
                top = target.top, left = target.left, cursorPointer = target.cursorPointer;
                renderPointer(top, left, cursorPointer, id);
                return [2 /*return*/];
            });
        }); };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('cursorPointer', moved);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('cursorPointer', moved);
        };
    }, [eventController, renderPointer, shouldHandleRemoteEvent]);
};

/**
 * Synchronize to remote canvases background color changes
 * @param shouldHandleRemoteEvent - Validator to know
 * if synchronization is needed
 */
var useSynchronizedBackgroundColorChanged = function (shouldHandleRemoteEvent) {
    var eventController = useSharedEventSerializer().state.eventController;
    var _a = React.useContext(WhiteboardContext), backgroundColor = _a.backgroundColor, setBackgroundColorInCanvas = _a.setBackgroundColorInCanvas;
    React.useEffect(function () {
        var backgroundColorChanged = function (id, target) {
            if (id && !shouldHandleRemoteEvent(id) && backgroundColor === target)
                return;
            setBackgroundColorInCanvas(target);
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('backgroundColorChanged', backgroundColorChanged);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('backgroundColorChanged', backgroundColorChanged);
        };
    }, [
        backgroundColor,
        eventController,
        setBackgroundColorInCanvas,
        shouldHandleRemoteEvent,
    ]);
};

/**
 * Customizes payload for shape or object.
 * @param shape Canvas shape or object
 * @param target Custom props to emit
 * @param type Shape type
 * @param id Object Id.
 */
var formatShape = function (shape, target, type, id) {
    requiredProps.forEach(function (prop) {
        var _a;
        if (shape && shape[prop]) {
            target = __assign(__assign({}, target), (_a = {}, _a[prop] = shape[prop], _a));
        }
    });
    return {
        type: type,
        target: target,
        id: id,
    };
};
/**
 * Customizes payload for shape or object.
 * @param shape Canvas shape or object
 * @param target Custom props to emit
 * @param type Shape type
 * @param id Object Id.
 */
var formatEllipse = function (shape, target, type, id) {
    requiredEllipseProps.forEach(function (prop) {
        var _a;
        if (shape && shape[prop]) {
            target = __assign(__assign({}, target), (_a = {}, _a[prop] = shape[prop], _a));
        }
    });
    return {
        type: type,
        target: target,
        id: id,
    };
};
/**
 * Customizes payload for shape or object.
 * @param shape Canvas shape or object
 * @param target Custom props to emit
 * @param type Shape type
 * @param id Object Id.
 */
var formatNonStandardBrush = function (shape, target, type, id) {
    requiredPencilDashedProps.forEach(function (prop) {
        var _a;
        if (shape && shape[prop]) {
            target = __assign(__assign({}, target), (_a = {}, _a[prop] = shape[prop], _a));
        }
    });
    return {
        type: type,
        target: target,
        id: id,
    };
};
/**
 * Formats payload for a cloned object for real time features.
 * @param shape Shape or object that is being cloned
 * @param brushType Brush type used for object
 * @param id Object id.
 */
var objectSerializerFormatter = function (shape, brushType, id, fromGroup) {
    var type = (shape.get('type') || 'path');
    if (shape.shapeType === 'shape') {
        var type_1 = shape.type;
        var target = {
            type: type_1,
            id: id ? id : shape.id,
        };
        if (brushType !== 'pencil' && brushType !== 'dashed') {
            return formatNonStandardBrush(shape, target, type_1, id);
        }
        else {
            if (type_1 !== 'ellipse') {
                return formatShape(shape, target, type_1, id);
            }
            else {
                return formatEllipse(shape, target, type_1, id);
            }
        }
    }
    else {
        var target = shape;
        var payload = {
            type: type,
            target: __assign(__assign({}, target.toJSON(CANVAS_OBJECT_PROPS)), { top: !fromGroup ? 0 : target.top, left: !fromGroup ? 0 : target.left, originX: 'left', originY: 'top' }),
            id: id ? id : shape.id,
        };
        return payload;
    }
};

/**
 * Handles copy past functionality
 * @param canvas
 * @param userId
 * @param permissions
 * @param allToolbarIsEnabled
 * @param undoRedoDispatch
 * @param eventSerializer
 * @param activeTool
 */
var useCopy = function (canvas, userId, allToolbarIsEnabled, undoRedoDispatch, eventSerializer, activeTool) {
    /**
     *
     * @param permissions
     * @param shape
     */
    var checkPermission = function (permissions, shape) {
        if (shape.shapeType === 'shape') {
            return permissions.shape;
        }
        if (shape.type === 'path') {
            return permissions.pen;
        }
        if (shape.type === 'image') {
            return permissions.uploadImage;
        }
        if (shape.type === 'textbox') {
            return permissions.text;
        }
    };
    var copyGroup = function (clipboard, permissions) { return (new Promise(function (resolve) {
        var ids = [];
        clipboard.forEachObject(function (obj) {
            var allowed = checkPermission(permissions, obj);
            if (allowed || allToolbarIsEnabled) {
                var id = userId + ":" + uuid.v4();
                obj.set({
                    active: true,
                    id: id,
                });
                ids.push(id);
                canvas.add(obj);
            }
        });
        resolve(ids);
    })); };
    var copied = null;
    var target = null;
    var unevented = [];
    var clipboard;
    var keyDownHandler = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var event, permissions, allowed, payload, event_1, ids_1, objects, payloads_1, event_2;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    event = e;
                    if (event.ctrlKey && event.key === 'c') {
                        if ((_b = (_a = canvas.getActiveObject()) === null || _a === void 0 ? void 0 : _a._objects) === null || _b === void 0 ? void 0 : _b.length) {
                            canvas.getActiveObject().clone(function (cloneGroup) {
                                clipboard = cloneGroup;
                                copied = null;
                            }, CANVAS_OBJECT_PROPS);
                        }
                        else {
                            (_c = canvas === null || canvas === void 0 ? void 0 : canvas.getActiveObject()) === null || _c === void 0 ? void 0 : _c.clone(function (cloned) {
                                cloned.set({
                                    top: 0,
                                    left: 0,
                                    id: userId + ":" + uuid.v4()
                                });
                                copied = cloned;
                                clipboard = null;
                            }, CANVAS_OBJECT_PROPS);
                        }
                    }
                    permissions = store.getState().permissionsState;
                    if (!(event.ctrlKey && event.key === 'v' && copied)) return [3 /*break*/, 1];
                    allowed = checkPermission(permissions, copied);
                    if (allToolbarIsEnabled || allowed) {
                        canvas === null || canvas === void 0 ? void 0 : canvas.add(copied);
                        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                        payload = objectSerializerFormatter(copied, (_d = copied.basePath) === null || _d === void 0 ? void 0 : _d.type, copied.id);
                        event_1 = { event: payload, type: 'added' };
                        undoRedoDispatch({
                            type: SET,
                            payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                            canvasId: userId,
                            event: event_1,
                        });
                        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload);
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 3];
                case 1:
                    if (!(event.ctrlKey && event.key === 'v' && clipboard)) return [3 /*break*/, 3];
                    clipboard.set({
                        left: 0,
                        top: 0,
                        evented: true
                    });
                    return [4 /*yield*/, copyGroup(clipboard, permissions)];
                case 2:
                    ids_1 = _e.sent();
                    clipboard.destroy();
                    canvas.discardActiveObject();
                    objects = canvas.getObjects().filter(function (o) { return (ids_1.indexOf(o.id) !== -1); });
                    payloads_1 = [];
                    objects.forEach(function (copied) {
                        var _a;
                        var payload = objectSerializerFormatter(copied, (_a = copied.basePath) === null || _a === void 0 ? void 0 : _a.type, copied.id, true);
                        payloads_1.push(payload);
                        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('added', payload);
                    });
                    event_2 = { event: payloads_1, type: 'added' };
                    undoRedoDispatch({
                        type: SET,
                        payload: canvas === null || canvas === void 0 ? void 0 : canvas.getObjects(),
                        canvasId: userId,
                        event: event_2,
                    });
                    _e.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var mouseDown = function (e) {
        canvas.getObjects().forEach(function (o) {
            if (!o.evented) {
                o.set({
                    evented: true,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    lockRotation: true,
                });
                unevented.push(o);
            }
        });
        // @ts-ignore findTarget expects a point, not Event.
        target = canvas.findTarget(e.pointer, false);
        if (target) {
            canvas.setActiveObject(target);
            canvas.renderAll();
        }
    };
    var deactivateOther = function () {
        unevented.forEach(function (o) {
            o.set({
                evented: false,
                lockMovementX: false,
                lockMovementY: false,
                lockScalingX: false,
                lockScalingY: false,
                lockRotation: false,
            });
        });
        unevented = [];
    };
    React.useEffect(function () {
        if (!canvas)
            return;
        if (activeTool === ELEMENTS.MOVE_OBJECTS_TOOL) {
            document.addEventListener('keydown', keyDownHandler, false);
            if (allToolbarIsEnabled) {
                canvas === null || canvas === void 0 ? void 0 : canvas.on('mouse:down:before', mouseDown);
            }
        }
        return function () {
            document.removeEventListener('keydown', keyDownHandler);
            if (allToolbarIsEnabled) {
                canvas === null || canvas === void 0 ? void 0 : canvas.off('mouse:down:before', mouseDown);
            }
            if (activeTool !== ELEMENTS.MOVE_OBJECTS_TOOL && unevented.length) {
                deactivateOther();
                canvas.discardActiveObject();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvas, activeTool]);
};

var useStampFeature = function () {
    var _a = React.useContext(WhiteboardContext), stampIsActive = _a.stampIsActive, openStampModal = _a.openStampModal, updateStampIsActive = _a.updateStampIsActive, stamp = _a.stamp;
    /**
     * Checks stampIsActive to show the assignation stamp modal
     */
    React.useEffect(function () {
        if (stampIsActive && stamp) {
            openStampModal();
            updateStampIsActive(false);
        }
    }, [openStampModal, stamp, stampIsActive, updateStampIsActive]);
};

var useSynchronizedSendStamp = function (canvas, userId, shouldHandleRemoteEvent) {
    var _a = useSharedEventSerializer().state, eventSerializer = _a.eventSerializer, eventController = _a.eventController;
    var _b = React.useContext(WhiteboardContext), stampAssignedStudents = _b.stampAssignedStudents, stamp = _b.stamp, stampMode = _b.stampMode, updateStampAssignedStudents = _b.updateStampAssignedStudents;
    /**
     * Durations for each stage of the animation
     */
    var animationDurations = {
        growing: 1000,
        staying: 3000,
        reducing: 500,
        afterShowing: 500,
        stampGap: 500,
    };
    /**
     * Duration of the complete animation
     */
    var totalDuration = animationDurations.growing +
        animationDurations.staying +
        animationDurations.reducing +
        animationDurations.afterShowing +
        animationDurations.stampGap;
    // State for register the time in that the animation started
    var _c = React.useState(null), startTime = _c[0], setStartTime = _c[1];
    /**
     * Checks the received stamp and find its image src
     * @param stamp - Stamp to find
     */
    var getStampURLImage = function (stamp) {
        switch (stamp) {
            case 'good':
                return img$7;
            case 'wellDone':
                return img$6;
            case 'excellent':
                return img$5;
        }
    };
    /**
     * Checks the current stamp objects to set the position of the next stamp
     */
    var determineStampPosition = React.useCallback(function (stampWidth, stampHeight) {
        var top;
        var left;
        var canvasWidth = Number(canvas === null || canvas === void 0 ? void 0 : canvas.width);
        var canvasHeight = Number(canvas === null || canvas === void 0 ? void 0 : canvas.height);
        var stampsInRow = Math.floor(Number(canvas === null || canvas === void 0 ? void 0 : canvas.width) / (stampWidth + 10));
        var stampsInColumn = Math.floor(Number(canvas === null || canvas === void 0 ? void 0 : canvas.height) / stampHeight);
        var existentStamps = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().filter(function (obj) { return obj.stampObject && !obj.fontFamily && obj.id; }).length;
        if (existentStamps <= stampsInRow * stampsInColumn) {
            top = Math.floor(existentStamps / stampsInRow) * stampHeight + 10;
            left =
                canvasWidth -
                    (existentStamps % stampsInRow) * (stampWidth + 10) -
                    (stampWidth + 10);
        }
        else {
            top = canvasHeight - stampHeight;
            left = canvasHeight - (stampWidth + 10);
        }
        return {
            top: top,
            left: left,
        };
    }, [canvas]);
    /**
     * Animates the received object
     * @param object - Object to animate
     * @param valuesToChange - Properties and values to change in the object
     * @param duration - Animation duration in milliseconds
     * @param easeEffect - Effect to run the animation
     * @param onComplete - Callback to execute once the animation is finished
     */
    var animateObject = React.useCallback(function (object, valuesToChange, duration, easeEffect, onComplete) {
        object.animate(valuesToChange, {
            duration: duration,
            easing: easeEffect,
            onChange: canvas === null || canvas === void 0 ? void 0 : canvas.renderAll.bind(canvas),
            onComplete: onComplete,
        });
    }, [canvas]);
    // Handling remote. Receives the event.
    React.useEffect(function () {
        /**
         * Handler for sendStamp event
         * @param id - user id of the user that sent the stamp
         * @param target - Object with data for render the stamp
         */
        var showStamp = function (id, target) {
            var stampWidth = 50;
            var stampHeight = 50;
            var stamp = target.stamp, assignTo = target.assignTo, stampMode = target.stampMode;
            // If teacher receives event ignore it
            if (!shouldHandleRemoteEvent(id))
                return;
            /**
             * If current user is not the assigned
             * and stamp mode is student, ignore it
             */
            if (userId !== assignTo && stampMode === 'student')
                return;
            // Getting image URL of the received stamp
            var imageURL = getStampURLImage(stamp);
            if (!imageURL)
                return;
            fabric.fabric.Image.fromURL(imageURL, function (image) {
                try {
                    if (!canvas)
                        return;
                    var presentText_1 = null;
                    var canvasWidth = Number(canvas === null || canvas === void 0 ? void 0 : canvas.width);
                    var canvasHeight = Number(canvas === null || canvas === void 0 ? void 0 : canvas.height);
                    // Setting properties for the created stamp
                    image.set({
                        top: canvasHeight / 2 - stampHeight / 2,
                        left: canvasWidth / 2 - stampWidth / 2,
                        scaleX: stampWidth / canvasWidth,
                        scaleY: stampHeight / canvasHeight,
                        originX: 'center',
                        originY: 'center',
                        selectable: false,
                        evented: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        stampObject: true,
                    });
                    canvas === null || canvas === void 0 ? void 0 : canvas.add(image);
                    if (stampMode === 'present' && userId !== assignTo) {
                        // Getting the name of the assigned user
                        var assignedUser = store.getState().usersState.find(function (student) {
                            return student.id === assignTo;
                        });
                        // Message for present in presentText
                        var presentMessage = "Stamp for " + (assignedUser === null || assignedUser === void 0 ? void 0 : assignedUser.name);
                        // Setting the properties for render the presentText
                        presentText_1 = new fabric.fabric.IText(presentMessage, {
                            fontFamily: 'Crayon',
                            top: canvasHeight / 2 - stampHeight / 2,
                            left: canvasWidth / 2 - stampWidth / 2,
                            fill: '#444444',
                            textAlign: 'center',
                            scaleX: stampWidth / canvasWidth,
                            scaleY: stampHeight / canvasHeight,
                            originX: 'center',
                            originY: 'center',
                            selectable: false,
                            evented: false,
                            lockMovementX: true,
                            lockMovementY: true,
                        });
                        presentText_1.set({
                            stampObject: true,
                        });
                        canvas.add(presentText_1);
                    }
                    canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                    /**
                     * Decides which after showing animation will do
                     * according with the current stamp state
                     */
                    var afterShowingAction_1 = function () {
                        if (assignTo === userId) {
                            moveToCorner_1();
                        }
                        else {
                            removeStamp_1();
                        }
                    };
                    /**
                     * After showing animation for the stamp
                     * when this stamp is for the current user
                     */
                    var moveToCorner_1 = function () {
                        var _a = determineStampPosition(stampWidth, stampHeight), top = _a.top, left = _a.left;
                        var valuesToChange = { top: top, left: left };
                        var duration = animationDurations.afterShowing;
                        var easeEffect = fabric.fabric.util.ease.easeInQuad;
                        image.set({
                            id: userId + ":" + uuid.v4(),
                            originX: 'left',
                            originY: 'top',
                        });
                        animateObject(image, valuesToChange, duration, easeEffect);
                        if (presentText_1) {
                            canvas.remove(presentText_1);
                        }
                        store.dispatch({
                            type: 'ADD_STAMP',
                            payload: { studentId: assignTo, stamp: stamp },
                        });
                    };
                    /**
                     * After showing animation for stamp and presentText
                     * when this stamp is not for the current user
                     */
                    var removeStamp_1 = function () {
                        var valuesToChange = { scaleX: 0, scaleY: 0 };
                        var duration = animationDurations.afterShowing;
                        var easeEffectStamp = fabric.fabric.util.ease.easeInQuad;
                        var easeEffectText = fabric.fabric.util.ease.easeInQuad;
                        var onCompleteStamp = function () {
                            canvas.remove(image);
                            canvas.renderAll();
                        };
                        var onCompleteText = function () {
                            if (!presentText_1)
                                return;
                            canvas.remove(presentText_1);
                            canvas.renderAll();
                        };
                        animateObject(image, valuesToChange, duration, easeEffectStamp, onCompleteStamp);
                        if (!presentText_1)
                            return;
                        animateObject(presentText_1, valuesToChange, duration, easeEffectText, onCompleteText);
                    };
                    /**
                     * Reducing animation for stamp and presentText
                     */
                    var reduce_1 = function () {
                        var scaleX = stampWidth / Number(image.width);
                        var scaleY = stampHeight / Number(image.height);
                        var valuesToChangeStamp = { scaleX: scaleX, scaleY: scaleY };
                        var valuesToChangeText = { scaleX: 0.5, scaleY: 0.5 };
                        var duration = animationDurations.reducing;
                        var easeEffect = fabric.fabric.util.ease.easeInQuad;
                        var onComplete = afterShowingAction_1;
                        window.setTimeout(function () {
                            animateObject(image, valuesToChangeStamp, duration, easeEffect, onComplete);
                            if (!presentText_1)
                                return;
                            animateObject(presentText_1, valuesToChangeText, duration, easeEffect, onComplete);
                        }, animationDurations.staying);
                    };
                    /**
                     * Growing animation for stamp and presentText
                     */
                    var growing = function () {
                        var valuesToChange = { scaleX: 2, scaleY: 2 };
                        var duration = animationDurations.growing;
                        var easeEffect = fabric.fabric.util.ease.easeInQuad;
                        var onComplete = reduce_1;
                        animateObject(image, valuesToChange, duration, easeEffect, onComplete);
                        if (!presentText_1)
                            return;
                        animateObject(presentText_1, valuesToChange, duration, easeEffect, onComplete);
                    };
                    growing();
                }
                catch (error) {
                    console.error(error);
                }
            });
        };
        eventController === null || eventController === void 0 ? void 0 : eventController.on('sendStamp', showStamp);
        return function () {
            eventController === null || eventController === void 0 ? void 0 : eventController.removeListener('sendStamp', showStamp);
        };
    }, [
        animateObject,
        animationDurations.afterShowing,
        animationDurations.growing,
        animationDurations.reducing,
        animationDurations.staying,
        canvas,
        determineStampPosition,
        eventController,
        shouldHandleRemoteEvent,
        userId,
    ]);
    // Handling local. Send the event
    React.useEffect(function () {
        if (stampAssignedStudents.length) {
            /**
             * Checks if is necessary wait for send the next stamp event or not
             * @param index - Current stamp assigned students array index
             */
            var determineTimeout_1 = function (index) {
                return !index || stampMode === 'student' ? 0 : totalDuration;
            };
            // Taking the current time
            var currentTime = new Date();
            var timeLeft = 0;
            if (startTime) {
                // Calculating timeElapsed since current animation start to now
                var timeElapsed = currentTime.getTime() - startTime.getTime();
                // Calculating time left to finish current animation
                if (stampMode === 'present') {
                    timeLeft = stampAssignedStudents.length * totalDuration - timeElapsed;
                }
                else {
                    timeLeft = totalDuration - timeElapsed;
                }
            }
            // Timeout for wait the end of the current animation
            setTimeout(function () {
                setStartTime(new Date());
                // Iterates over all the students that will recieve a stamp
                stampAssignedStudents.forEach(function (studentId, index) {
                    // Timeout to show stamps in a properly ordered way
                    setTimeout(function () {
                        var payload = {
                            id: userId + ":stamp",
                            target: {
                                stamp: stamp,
                                assignTo: studentId,
                                stampMode: stampMode,
                            },
                        };
                        eventSerializer.push('sendStamp', payload);
                    }, determineTimeout_1(index));
                });
            }, timeLeft);
            updateStampAssignedStudents([]);
        }
    }, [
        eventSerializer,
        stamp,
        stampAssignedStudents,
        stampMode,
        startTime,
        totalDuration,
        updateStampAssignedStudents,
        userId,
    ]);
};

var WhiteboardCanvas = function (_a) {
    var children = _a.children, instanceId = _a.instanceId, userId = _a.userId, initialStyle = _a.initialStyle, pointerEvents = _a.pointerEvents, pixelWidth = _a.pixelWidth, pixelHeight = _a.pixelHeight, scaleMode = _a.scaleMode, display = _a.display, permissions = _a.permissions, updatePermissions = _a.updatePermissions;
    var _b = React.useState(), canvas = _b[0], setCanvas = _b[1];
    var _c = React.useState(), wrapper = _c[0], setWrapper = _c[1];
    var _d = React.useState(uuid.v4()), generatedBy = _d[0], setGeneratedBy = _d[1];
    var _e = useFixedAspectScaling(wrapper === null || wrapper === void 0 ? void 0 : wrapper.parentElement, pixelWidth / pixelHeight, scaleMode || 'ScaleToFit'), width = _e.width, height = _e.height;
    var serializerToolbarState = permissions;
    // Getting context variables for this file
    var _f = React.useContext(WhiteboardContext), penColor = _f.penColor, isLocalObject = _f.isLocalObject, shape = _f.shape, canvasActions = _f.canvasActions, updateCanvasActions = _f.updateCanvasActions, laserIsActive = _f.laserIsActive, allToolbarIsEnabled = _f.allToolbarIsEnabled, imagePopupIsOpen = _f.imagePopupIsOpen, updateImagePopupIsOpen = _f.updateImagePopupIsOpen, backgroundImage = _f.backgroundImage, backgroundImageIsPartialErasable = _f.backgroundImageIsPartialErasable, localImage = _f.localImage, localBackground = _f.localBackground, backgroundColor = _f.backgroundColor, eventSerializer = _f.eventSerializer, eventController = _f.eventController, setLocalBackground = _f.setLocalBackground, setLocalImage = _f.setLocalImage, activeTool = _f.activeTool;
    var undoRedoDispatch = UndoRedo(canvas, eventSerializer, userId).dispatch;
    // useEffects and logic to set canvas properties
    useSetCanvas(instanceId, setCanvas, canvas, wrapper, setWrapper, pixelWidth, pixelHeight, pointerEvents, scaleMode, display, initialStyle);
    // Getting Canvas shared functions
    var _g = useCanvasActions(canvas, undoRedoDispatch, instanceId, eventSerializer, userId), actions = _g.actions, mouseDown = _g.mouseDown;
    var filterOutgoingEvents = React.useCallback(function (id) {
        if (!id)
            return false;
        var apply = isLocalObject(id, userId);
        if (apply) {
            //console.log(`send local event ${id} to remote`);
            return apply;
        }
        return false;
    }, [isLocalObject, userId]);
    var filterIncomingEvents = React.useCallback(function (id) {
        if (!id)
            return false;
        // TODO: isLocalObject will not work in case we're reloading
        // the page and server resends all our events. They would be
        // discarded when they shouldn't be discarded. Another solution
        // could be to keep track of all 'local' objects we've created
        // this session and only filter those.
        // TODO: Filter based on the filterUsers list. We should only
        // display events coming from users in that list if the list
        // isn't undefined.
        var apply = !isLocalObject(id, userId);
        return apply;
    }, [isLocalObject, userId]);
    /**
     * Reset the canvas state in case the event controller will replay all events.
     */
    React.useEffect(function () {
        if (!canvas)
            return;
        if (!eventController)
            return;
        var reset = function () {
            canvas.clear();
            // NOTE: Regenerate generatedBy so our own events gets applied again after the clear.
            setGeneratedBy(uuid.v4());
            // This is just to avoid typescript unused variables error
            console.log(generatedBy);
        };
        eventController.on('aboutToReplayAll', reset);
        return function () {
            eventController.removeListener('aboutToReplayAll', reset);
        };
    }, [canvas, eventController, generatedBy]);
    var getObjects = React.useCallback(function () {
        var objects = canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().map(function (object) {
            return object.toJSON(['basePath']);
        });
        localStorage.setItem('objects', JSON.stringify(objects));
        return canvas === null || canvas === void 0 ? void 0 : canvas.getObjects();
    }, [canvas]);
    // useEffects and logic for manage the object manipulation in canvas
    useObjectManipulation(canvas, userId, actions, pointerEvents, permissions);
    // useEffects and logic for manage free hand drawing feature
    useFreeHandDrawing(canvas, userId, permissions);
    // useEffects and logic for shape creation feature
    useShapeFeature(canvas, userId, actions, mouseDown, undoRedoDispatch, permissions);
    // useEffects and logic for flood-fill feature
    useFloodFill(canvas, permissions, userId, actions, eventSerializer, undoRedoDispatch);
    /* useEffects and logic for manage the changes that would happen
    when an object is selected */
    useObjectSelection(canvas, actions);
    // useEffects and logic for manage text object creation/edition
    useTextObject(canvas, instanceId, userId, actions, permissions);
    // useEffects and logic for manage image adding feature
    useAddImage(canvas, userId);
    // useEffects and logic for manage line width changes in objects
    useChangeLineWidth(canvas, userId, undoRedoDispatch);
    // useEffects and logic for manage undo/redo feature
    useUndoRedo(canvas, userId, undoRedoDispatch);
    useCopy(canvas, userId, allToolbarIsEnabled, undoRedoDispatch, eventSerializer, activeTool);
    // useEffects and logic for stamp feature
    useStampFeature();
    // useEffects and logic for manage pointers
    usePointerFeature(canvas, userId, permissions);
    useSynchronizedMoved(canvas, userId, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedRemoved(canvas, userId, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedModified(canvas, filterOutgoingEvents, filterIncomingEvents, userId, undoRedoDispatch);
    useSynchronizedRotated(canvas, userId, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedScaled(canvas, userId, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedSkewed(canvas, filterOutgoingEvents, filterIncomingEvents);
    useSynchronizedReconstruct(canvas, filterIncomingEvents, userId, undoRedoDispatch, setLocalImage, setLocalBackground);
    useSynchronizedColorChanged(canvas, userId, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedFontFamilyChanged(canvas, filterIncomingEvents);
    useSynchronizedPointer(canvas, allToolbarIsEnabled || serializerToolbarState.pointer, filterIncomingEvents, userId, penColor, laserIsActive);
    useSynchronizedSetToolbarPermissions(canvas, userId, filterIncomingEvents, mapDispatchToProps$1);
    useSynchronizedFontColorChanged(canvas, userId, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedLineWidthChanged(canvas, userId, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedRealtime(canvas, filterIncomingEvents, userId);
    useSynchronizedBrushTypeChanged(canvas, userId, filterIncomingEvents);
    useSynchronizedAdded(canvas, userId, filterOutgoingEvents, filterIncomingEvents, undoRedoDispatch);
    useSynchronizedSetToolbarPermissions(canvas, userId, filterIncomingEvents, updatePermissions);
    useSynchronizedCursorPointer(canvas, userId, filterIncomingEvents);
    useSynchronizedBackgroundColorChanged(filterIncomingEvents);
    useSynchronizedSendStamp(canvas, userId, filterIncomingEvents);
    // NOTE: Register canvas actions with context.
    React.useEffect(function () {
        if (!canvasActions && canvas) {
            updateCanvasActions(actions);
        }
    }, [actions, updateCanvasActions, canvas, canvasActions]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(CanvasDownloadConfirm, { open: imagePopupIsOpen, onClose: updateImagePopupIsOpen, canvas: canvas, backgroundImage: backgroundImage, localImage: localImage, width: width, height: height, backgroundColor: localBackground ? backgroundColor : undefined }),
        React__default['default'].createElement("button", { id: "get-objects-button", onClick: function () { return getObjects(); }, hidden: true, disabled: !(canvas === null || canvas === void 0 ? void 0 : canvas.getObjects().length) }, "Picale bro"),
        React__default['default'].createElement("canvas", { width: pixelWidth, height: pixelHeight, id: instanceId, placeholder: instanceId, style: __assign(__assign({}, initialStyle), { backgroundColor: 'transparent' }), tabIndex: 0, onClick: function () {
                actions.addShape(shape);
            } }, children),
        !backgroundImageIsPartialErasable && localImage && (React__default['default'].createElement("img", { style: {
                height: '100%',
                width: '100%',
            }, alt: "background", src: localImage.toString() })),
        !localImage && localBackground && (React__default['default'].createElement("div", { style: {
                height: '100%',
                width: '100%',
                backgroundColor: backgroundColor,
            } }))));
};
var mapStateToProps$1 = function (state, ownProps) { return (__assign(__assign({}, ownProps), { permissions: state.permissionsState, toolbarIsEnabled: function (state) {
        for (var key in state.permissionsState) {
            if (state.permissionsState[key] === true) {
                return true;
            }
        }
        return false;
    } })); };
var mapDispatchToProps$1 = function (dispatch) { return ({
    updatePermissions: function (tool, payload) {
        return dispatch({ type: tool, payload: payload });
    },
}); };
var WhiteboardCanvas$1 = reactRedux.connect(mapStateToProps$1, mapDispatchToProps$1)(WhiteboardCanvas);

/**
 * Container for WhiteboardCanvas used to resize
 * proportionally the canvas background
 * @param props - Properties needed to render the component:
 * @field {number} width: initial width for the container
 * @field {number} height: initial heigth for the container
 * @field {React.ReactNode} children: container's content
 */
function WhiteboardContainer(props) {
    var width = props.width, height = props.height, children = props.children;
    /**
     * Calculates the padding in the container to resize it proportionally
     */
    var calcProportionalPadding = function () {
        return ((height / width) * 100) / 2;
    };
    var wrapperStyle = {
        width: width + "px",
        height: height + "px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '0 13px 0 8px',
    };
    var resizeDivStyle = {
        width: '100%',
        height: '0',
        position: 'relative',
        paddingBottom: calcProportionalPadding() + "%",
        paddingTop: calcProportionalPadding() + "%",
    };
    var containerStyle = {
        border: '2px blue solid',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    };
    return (React__default['default'].createElement("div", { style: wrapperStyle },
        React__default['default'].createElement("div", { style: resizeDivStyle },
            React__default['default'].createElement("div", { style: containerStyle }, children))));
}

var useStyles = styles.makeStyles(function (theme) {
    return styles.createStyles({
        root: {
            display: 'flex',
        },
        formControl: {
            margin: theme.spacing(3),
        },
    });
});
function AuthMenu(props) {
    console.log('PROPS:::::', props);
    console.log('USER ID: ', props.userId);
    var userId = props.userId;
    var isTeacher = userId === 'teacher';
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var eventSerializer = useSharedEventSerializer().state.eventSerializer;
    var handleClickListItem = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var classes = useStyles();
    var _b = props.permissions, cursorPointer = _b.cursorPointer, pointer = _b.pointer, move = _b.move, erase = _b.erase, partialErase = _b.partialErase, pen = _b.pen, floodFill = _b.floodFill, text = _b.text, shape = _b.shape, undoRedo = _b.undoRedo, clearWhiteboard = _b.clearWhiteboard, downloadCanvas = _b.downloadCanvas, uploadImage = _b.uploadImage, backgroundColor = _b.backgroundColor;
    var handleToolbarChange = function (event) {
        var _a;
        props.updatePermissions(event.target.name, event.target.checked);
        var payload = {
            id: userId,
            target: (_a = {},
                _a[event.target.name] = event.target.checked,
                _a),
        };
        eventSerializer === null || eventSerializer === void 0 ? void 0 : eventSerializer.push('setToolbarPermissions', payload);
    };
    var tools = [
        {
            checked: cursorPointer,
            name: 'cursorPointer',
            label: 'Cursor pointer tool',
        },
        {
            checked: pointer,
            name: 'pointer',
            label: 'Laser pointer tool',
        },
        {
            checked: move,
            name: 'move',
            label: 'Move tool',
        },
        {
            checked: erase,
            name: 'erase',
            label: 'Erase tool',
        },
        {
            checked: partialErase,
            name: 'partialErase',
            label: 'Partial Erase tool',
        },
        {
            checked: pen,
            name: 'pen',
            label: 'Pen tool',
        },
        {
            checked: floodFill,
            name: 'floodFill',
            label: 'Flood-fill tool',
        },
        {
            checked: backgroundColor,
            name: 'backgroundColor',
            label: 'Background Color tool',
        },
        {
            checked: text,
            name: 'text',
            label: 'Text tool',
        },
        {
            checked: shape,
            name: 'shape',
            label: 'Shape tool',
        },
        {
            checked: undoRedo,
            name: 'undoRedo',
            label: 'Undo-redo tool',
        },
        {
            checked: clearWhiteboard,
            name: 'clearWhiteboard',
            label: 'Clear whiteboard tool',
        },
        {
            checked: downloadCanvas,
            name: 'downloadCanvas',
            label: 'Save Canvas As Image',
        },
        {
            checked: uploadImage,
            name: 'uploadImage',
            label: 'Upload Image tool',
        },
    ];
    if (!isTeacher) {
        return null;
    }
    return (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { style: {
                display: 'flex',
            }, className: classes.root },
            React__default['default'].createElement(List__default['default'], { component: "nav", "aria-label": "Device settings" },
                React__default['default'].createElement(ListItem__default['default'], { button: true, "aria-haspopup": "true", "aria-controls": "lock-menu-2", onClick: handleClickListItem },
                    React__default['default'].createElement(ListItemText__default['default'], { primary: "Authorize Tools" }))),
            React__default['default'].createElement(Menu__default['default'], { id: "lock-menu-2", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose },
                React__default['default'].createElement(FormControl__default['default'], { component: "fieldset", className: classes.formControl },
                    React__default['default'].createElement(FormGroup__default['default'], null, tools.map(function (el) { return (React__default['default'].createElement(FormControlLabel__default['default'], { key: el.name, control: React__default['default'].createElement(Checkbox__default['default'], { checked: el.checked, onChange: handleToolbarChange, name: el.name }), label: el.label })); })))))));
}
// TEMPORARY : once we have an actual login, this will have to be mapped to the login data for the user state and isAdmin properties. 
var mapStateToProps = function (state, ownProps) { return (__assign(__assign({}, ownProps), { permissions: state.permissionsState, user: state.userState, isAdmin: ownProps.userId === 'teacher' })); };
var mapDispatchToProps = function (dispatch) { return ({
    updatePermissions: function (tool, payload) { return dispatch({ type: tool, payload: payload }); },
    updateUser: function (id) { return dispatch({ type: 'UPDATE_USER', id: id }); },
}); };
var AuthMenu$1 = reactRedux.connect(mapStateToProps, mapDispatchToProps)(AuthMenu);

var teacher = {
    allowClearAll: true,
    allowClearOthers: true,
    allowClearMyself: true,
};
var student = {
    allowClearAll: false,
    allowClearOthers: false,
    allowClearMyself: true,
};
function Whiteboard() {
    var whiteboardWidth = 740;
    var whiteboardHeight = 460;
    var canvasStyle = {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
    };
    var activeCanvas = React.useRef(null);
    /**
     * Blocks the Firefox previous page action triggered when the Backspace key is pressed
     */
    React.useEffect(function () {
        var keydownHandler = function (event) {
            if (event.key === 'Backspace' &&
                event.target.nodeName !== 'TEXTAREA') {
                event.preventDefault();
            }
        };
        window.addEventListener('keydown', keydownHandler);
        // Remove event listeners on cleanup
        return function () {
            window.removeEventListener('keydown', keydownHandler);
        };
    }, []);
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(WhiteboardProvider, { clearWhiteboardPermissions: teacher, allToolbarIsEnabled: true, activeCanvas: activeCanvas, userId: 'teacher' },
            React__default['default'].createElement(reactRedux.Provider, { store: store },
                React__default['default'].createElement(AuthMenu$1, { userId: 'teacher' }),
                React__default['default'].createElement("div", { className: "whiteboard", onClick: function () {
                        activeCanvas.current = 'canvas1';
                    } },
                    React__default['default'].createElement(Toolbar$1, null),
                    React__default['default'].createElement(WhiteboardContainer, { width: whiteboardWidth, height: whiteboardHeight },
                        React__default['default'].createElement(WhiteboardCanvas$1, { instanceId: "canvas1", userId: "teacher", initialStyle: canvasStyle, pointerEvents: true, clearWhiteboardPermissions: teacher, pixelWidth: whiteboardWidth, pixelHeight: whiteboardHeight },
                            React__default['default'].createElement("button", null, "Teacher")))))),
        React__default['default'].createElement(WhiteboardProvider, { clearWhiteboardPermissions: student, allToolbarIsEnabled: false, activeCanvas: activeCanvas, userId: 'student' },
            React__default['default'].createElement(reactRedux.Provider, { store: store },
                React__default['default'].createElement("div", { className: "whiteboard", onClick: function () {
                        activeCanvas.current = 'canvas2';
                    } },
                    React__default['default'].createElement(Toolbar$1, null),
                    React__default['default'].createElement(WhiteboardContainer, { width: whiteboardWidth, height: whiteboardHeight },
                        React__default['default'].createElement(WhiteboardCanvas$1, { instanceId: "canvas2", userId: "student", initialStyle: canvasStyle, pointerEvents: true, clearWhiteboardPermissions: student, pixelWidth: whiteboardWidth, pixelHeight: whiteboardHeight },
                            React__default['default'].createElement("button", null, "Student")))))),
        React__default['default'].createElement(WhiteboardProvider, { clearWhiteboardPermissions: student, allToolbarIsEnabled: false, activeCanvas: activeCanvas, userId: 'student2' },
            React__default['default'].createElement(reactRedux.Provider, { store: store },
                React__default['default'].createElement("div", { className: "whiteboard", onClick: function () {
                        activeCanvas.current = 'canvas3';
                    } },
                    React__default['default'].createElement(Toolbar$1, null),
                    React__default['default'].createElement(WhiteboardContainer, { width: whiteboardWidth, height: whiteboardHeight },
                        React__default['default'].createElement(WhiteboardCanvas$1, { instanceId: "canvas3", userId: "student2", initialStyle: canvasStyle, pointerEvents: true, clearWhiteboardPermissions: student, pixelWidth: whiteboardWidth, pixelHeight: whiteboardHeight },
                            React__default['default'].createElement("button", null, "Student"))))))));
}

function App() {
    return (React__default['default'].createElement("div", { className: "App" },
        React__default['default'].createElement("div", null,
            React__default['default'].createElement(SharedEventSerializerContextProvider, { simulateNetworkSynchronization: true, simulatePersistence: false },
                React__default['default'].createElement(Whiteboard, null)))));
}

// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then(function (registration) {
            registration.unregister();
        })
            .catch(function (error) {
            console.error(error.message);
        });
    }
}

ReactDOM__default['default'].render(React__default['default'].createElement(React__default['default'].StrictMode, null,
    React__default['default'].createElement(App, null)), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
//# sourceMappingURL=exports.js.map
