/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _paper = __webpack_require__(3);

var _paper2 = _interopRequireDefault(_paper);

var _react = __webpack_require__(0);

var _reactDom = __webpack_require__(1);

var _window = __webpack_require__(5);

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var c = new _paper2.default();

c.drawGird();
//c.setAxies(250, 250)

var _require = __webpack_require__(6),
    remote = _require.remote;

var Menu = remote.Menu,
    MenuItem = remote.MenuItem;


var menu = new Menu();

var _trigger = void 0;

menu.append(new MenuItem({
    label: 'DrawLine',
    submenu: [{
        label: "DDA", click: function click() {
            _trigger(['point1.x', 'point1.y', 'point2.x', 'point2.y'], true, function (v) {
                //console.log(v)
                c.drawDDALine(new Point(v['point1.x'], v['point1.y']), new Point(v['point2.x'], v['point2.y']));
            });
        }
    }, {
        label: "Bresenham", click: function click() {
            _trigger(['point1.x', 'point1.y', 'point2.x', 'point2.y'], true, function (v) {
                //console.log(v)
                c.drawBresenhamLine(new Point(v['point1.x'], v['point1.y']), new Point(v['point2.x'], v['point2.y']));
            });
        }
    }]
}));
menu.append(new MenuItem({
    label: 'DrawCircle',
    submenu: [{
        label: "Circle", click: function click() {
            _trigger(['x', 'y', 'r'], true, function (v) {
                //console.log(v)
                c.drawCircle(new Point(v['x'], v['y']), v['r']);
            });
        }
    }, {
        label: "Ellipse", click: function click() {
            _trigger(['x', 'y', 'rx', 'ry'], true, function (v) {
                //console.log(v)
                c.drawEllipse(new Point(v['x'], v['y']), v['rx'], v['ry']);
            });
        }
    }]
}));

menu.append(new MenuItem({
    label: 'Config',
    submenu: [{
        label: "setAxie", click: function click() {
            _trigger(['x', 'y'], true, function (v) {
                //console.log(v)
                c.setAxies(v['x'], v['y']);
            });
        }
    }, {
        label: "setGird", click: function click() {
            _trigger(['distance'], true, function (v) {
                //console.log(v)
                c.setGird(v['distance']);
            });
        }
    }, {
        label: "moveCanvas", click: function click() {
            _trigger(['x', 'y'], true, function (v) {
                //console.log(v)
                c.translate(v['x'], v['y']);
            });
        }
    }, {
        label: "setDelay", click: function click() {
            _trigger(['print delay(ms)'], true, function (v) {
                //console.log(v)
                c.delay = parseInt(v['print delay(ms)']);
            });
        }
    }, {
        label: "clearCanvas", click: function click() {
            c.clear();
        }
    }]
}));

menu.append(new MenuItem({
    label: 'Scale',
    submenu: [{
        label: "0.5", click: function click() {
            c.setScale(0.5);
        }
    }, {
        label: "1", click: function click() {
            c.setScale(1);
        }
    }, {
        label: "2", click: function click() {
            c.setScale(2);
        }
    }, {
        label: "3", click: function click() {
            c.setScale(3);
        }
    }, {
        label: "4", click: function click() {
            c.setScale(4);
        }
    }]
}));

menu.append(new MenuItem({
    label: 'View',
    submenu: [{ role: 'reload' }, { role: 'forcereload' }, { role: 'toggledevtools' }, { type: 'separator' }, { role: 'zoomin' }, { role: 'zoomout' }, { role: 'resetzoom' }, { type: 'separator' }, { role: 'togglefullscreen' }, { role: 'minimize' }, { role: 'close' }]
}));

Menu.setApplicationMenu(menu);

ReactDOM.render(React.createElement(_window2.default, { component: ['point1.x', 'point1.y', 'point2.x', 'point2.y'], display: false, call: function call(v) {},
    trigger: function trigger(func) {
        _trigger = func;
    }
}), document.getElementById('main'));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var myCanvas = function () {
    function myCanvas() {
        _classCallCheck(this, myCanvas);

        this.project = paper.project;
        this.gird = new Layer();
        this.axies = new Layer();
        this.drawing = new Layer();
        this.offset = new Point(0, 0);
        this.scale = 1;
        this.girdDistance = 100;
        this.trans = new Point(0, 0);
        this.pixelQueue = [];
        this.onDrawing = false;
        this.delay = 100;
        this.init();
        this.project.view.scale(this.scale, new Point(0, 0));
    }

    _createClass(myCanvas, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.project.view.onResize = function (event) {
                _this.drawGird();
                _this.drawAxie();
                _this.drawing.activate();
                // let path = new Path.Line(0, 0,1000,1000)
                // path.strokeColor = 'black'
                // path.closePath()
            };
            //console.log(this.project.view.scaling)
        }
    }, {
        key: 'setScale',
        value: function setScale(i) {
            this.gird.view.translate(this.trans * -1);
            this.trans *= 0;

            this.project.view.scale(i / this.scale, new Point(0, 0));
            this.scale = i;
            this.drawAxie();
            this.drawGird();
        }
    }, {
        key: 'drawAxie',
        value: function drawAxie() {
            this.axies.removeChildren();
            this.axies.activate();
            if (this.offset.x == 0 && this.offset.y == 0) return;
            var path = new Path.Line({
                from: [this.offset.x, 0],
                to: [this.offset.x, this.project.view.size.height - this.trans.y],
                strokeColor: 'red',
                strokeWidth: 1
            });
            var path2 = new Path.Line({
                from: [0, this.offset.y],
                to: [this.project.view.size.width - this.trans.x, this.offset.y],
                strokeColor: 'red',
                strokeWidth: 1
            });
        }
    }, {
        key: 'setAxies',
        value: function setAxies(x, y) {
            this.offset = new Point(x, y);
            this.drawAxie();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.drawing.removeChildren();
        }
    }, {
        key: 'translate',
        value: function translate(x, y) {
            this.gird.view.translate(this.trans * -1);
            this.trans = new Point(-x, -y);
            this.gird.view.translate(this.trans);
            this.drawGird();
            this.drawAxie();
        }
    }, {
        key: 'setGird',
        value: function setGird(i) {
            this.girdDistance = i;
            this.drawGird();
        }
    }, {
        key: 'drawGird',
        value: function drawGird() {
            this.gird.removeChildren();
            this.gird.activate();
            if (this.girdDistance <= 0) {
                return;
            }
            // Create a Paper.js Path to draw a line into it:
            for (var i = this.girdDistance; i < this.project.view.size.width / 0.5; i += this.girdDistance) {
                var path = new Path.Line({
                    from: [i, 0],
                    to: [i, this.project.view.size.height / 0.5],
                    strokeColor: '#ddd',
                    strokeWidth: 1
                });
            }
            for (var _i = this.girdDistance; _i < this.project.view.size.height / 0.5; _i += this.girdDistance) {
                var _path = new Path.Line({
                    from: [0, _i],
                    to: [this.project.view.size.width / 0.5, _i],
                    strokeColor: '#ddd',
                    strokeWidth: 1
                });
            }
        }
    }, {
        key: '_translate',
        value: function _translate() {
            var _this2 = this;

            var flag = 1;
            if (this.offset.x != 0 && this.offset.y != 0) flag = -1;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return args.map(function (v) {
                return new Point(v.x + _this2.offset.x, v.y * flag + _this2.offset.y);
            });
        }
    }, {
        key: 'drawDDALine',
        value: function drawDDALine(p1, p2) {
            var _translate2 = this._translate(p1, p2);

            var _translate3 = _slicedToArray(_translate2, 2);

            p1 = _translate3[0];
            p2 = _translate3[1];

            if (Math.abs((p1.y - p2.y) / (p1.x - p2.x)) < 1) {
                var _assumex2 = this._assumex(p1, p2);

                var _assumex3 = _slicedToArray(_assumex2, 2);

                p1 = _assumex3[0];
                p2 = _assumex3[1];

                var m = this._slope(p1, p2);
                var base = p1.y;
                for (var i = p1.x; i <= p2.x; i++) {
                    this.setPixel(i, base);
                    base += m;
                }
            } else {
                var _assumey2 = this._assumey(p1, p2);

                var _assumey3 = _slicedToArray(_assumey2, 2);

                p1 = _assumey3[0];
                p2 = _assumey3[1];

                var _m = this._slope(p1, p2);
                var _base = p1.x;
                for (var _i2 = p1.y; _i2 <= p2.y; _i2++) {
                    this.setPixel(_base, _i2);
                    _base += 1 / _m;
                }
            }
        }
    }, {
        key: 'drawBresenhamLine',
        value: function drawBresenhamLine(p1, p2) {
            var _translate4 = this._translate(p1, p2);

            var _translate5 = _slicedToArray(_translate4, 2);

            p1 = _translate5[0];
            p2 = _translate5[1];

            if (Math.abs((p1.y - p2.y) / (p1.x - p2.x)) < 1) {
                var _assumex4 = this._assumex(p1, p2);

                var _assumex5 = _slicedToArray(_assumex4, 2);

                p1 = _assumex5[0];
                p2 = _assumex5[1];

                var dx = Math.abs(p2.x - p1.x),
                    dy = Math.abs(p2.y - p1.y);
                var p = 2 * dy - dx,
                    y = p1.y;
                this.setPixel(p1.x, p1.y);
                for (var i = p1.x; i < p2.x; i++) {
                    if (p < 0) {
                        // console.log(p)
                        p += 2 * dy;
                        this.setPixel(i + 1, y);
                    } else {
                        // console.log(p)
                        p += 2 * dy - 2 * dx;
                        y += p1.y < p2.y ? 1 : -1;
                        this.setPixel(i + 1, y);
                    }
                }
            } else {
                var _assumey4 = this._assumey(p1, p2);

                var _assumey5 = _slicedToArray(_assumey4, 2);

                p1 = _assumey5[0];
                p2 = _assumey5[1];

                var _dx = Math.abs(p2.x - p1.x),
                    _dy = Math.abs(p2.y - p1.y);
                var _p2 = 2 * _dx - _dy,
                    x = p1.x;
                this.setPixel(p1.x, p1.y);
                for (var _i3 = p1.y; _i3 < p2.y; _i3++) {
                    if (_p2 < 0) {
                        // console.log(p)
                        _p2 += 2 * _dx;
                        this.setPixel(x, _i3 + 1);
                    } else {
                        // console.log(p)
                        _p2 += 2 * _dx - 2 * _dy;
                        x += p1.x < p2.x ? 1 : -1;
                        this.setPixel(x, _i3 + 1);
                    }
                }
            }
        }
    }, {
        key: 'drawCircle',
        value: function drawCircle(p, r) {
            var _this3 = this;

            var _translate6 = this._translate(p);

            var _translate7 = _slicedToArray(_translate6, 1);

            p = _translate7[0];

            var drawAll = function drawAll(x, y) {
                _this3.setPixel(p.x + x, p.y + y);
                _this3.setPixel(p.x - x, p.y - y);
                _this3.setPixel(p.x + x, p.y - y);
                _this3.setPixel(p.x - x, p.y + y);
                _this3.setPixel(p.x + y, p.y + x);
                _this3.setPixel(p.x - y, p.y + x);
                _this3.setPixel(p.x + y, p.y - x);
                _this3.setPixel(p.x - y, p.y - x);
            };
            var x = 0,
                y = r;
            var _p = 5 / 4 - r;
            drawAll(x, y);
            while (x < y) {
                if (_p < 0) {
                    drawAll(++x, y);
                    _p += 2 * x + 1;
                } else {
                    drawAll(++x, --y);
                    _p += 2 * x + 1 - 2 * y;
                }
            }
        }
    }, {
        key: 'drawEllipse',
        value: function drawEllipse(p, rx, ry) {
            var _this4 = this;

            var _translate8 = this._translate(p);

            var _translate9 = _slicedToArray(_translate8, 1);

            p = _translate9[0];

            var drawAll = function drawAll(x, y) {
                _this4.setPixel(p.x + x, p.y + y);
                _this4.setPixel(p.x - x, p.y - y);
                _this4.setPixel(p.x + x, p.y - y);
                _this4.setPixel(p.x - x, p.y + y);
            };
            var x = 0,
                y = ry;
            var ry2 = ry * ry,
                rx2 = rx * rx;
            var _p = ry2 - rx2 * ry + 0.25 * rx2;
            drawAll(x, ry);
            while (x * ry2 < rx2 * y) {
                if (_p < 0) {
                    drawAll(++x, y);
                    _p += 2 * x * ry2 + ry2;
                } else {
                    drawAll(++x, --y);
                    _p += 2 * x * ry2 + ry2 - 2 * y * rx2;
                }
            }
            while (y >= 0) {
                _p = ry2 * (x + 0.5) * (x + 0.5) + rx2 * (y - 1) * (y - 1) - rx2 * ry2;
                if (_p > 0) {
                    drawAll(x, --y);
                    _p += -rx2 * y + rx2;
                } else {
                    drawAll(++x, --y);
                    _p += 2 * ry2 * x - 2 * rx2 * y + rx2;
                }
            }
        }
    }, {
        key: '_assumex',
        value: function _assumex(p1, p2) {
            if (p1.x > p2.x) return [p2, p1];else return [p1, p2];
        }
    }, {
        key: '_assumey',
        value: function _assumey(p1, p2) {
            if (p1.y > p2.y) return [p2, p1];else return [p1, p2];
        }
    }, {
        key: '_slope',
        value: function _slope(p1, p2) {
            return (p1.y - p2.y) / (p1.x - p2.x);
        }
    }, {
        key: 'drawPixel',
        value: function drawPixel() {
            if (this.pixelQueue.length > 0) {
                this.onDrawing = true;
                var point = this.pixelQueue.shift();
                this.drawing.activate();
                console.log("point : " + point.x + "," + point.y);
                var path = new Path.Rectangle(point, point + [.001, .001]);
                path.strokeColor = 'black';
                path.closePath();
                //console.log(this.pixelQueue)
                if (this.pixelQueue.length > 0) setTimeout(this.drawPixel.bind(this), this.delay);else this.onDrawing = false;
            } else {
                this.onDrawing = false;
            }
        }
    }, {
        key: 'setPixel',
        value: function setPixel(x, y) {
            var start = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
            this.pixelQueue.push(start);
            //console.log(this.pixelQueue)
            if (!this.onDrawing) setTimeout(this.drawPixel.bind(this), this.delay);
            this.onDrawing = true;
        }
    }]);

    return myCanvas;
}();

exports.default = myCanvas;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = paper;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _reactDom = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = function (_React$Component) {
    _inherits(Window, _React$Component);

    function Window(props) {
        _classCallCheck(this, Window);

        var _this = _possibleConstructorReturn(this, (Window.__proto__ || Object.getPrototypeOf(Window)).call(this, props));

        props.trigger(_this.update.bind(_this));
        _this.state = {
            component: _this.createComponent(props.component),
            value: {},
            display: props.display ? 'visible' : 'hidden',
            call: props.call
        };
        return _this;
    }

    _createClass(Window, [{
        key: 'update',
        value: function update(component, display, func) {
            this.setState({
                component: this.createComponent(component),
                display: display ? 'visible' : 'hidden',
                call: func,
                value: []
            });
        }
    }, {
        key: 'createComponent',
        value: function createComponent(rule) {
            var _this2 = this;

            if (!rule) return React.createElement('div', null);
            var component = rule.map(function (t, i) {
                return React.createElement(
                    'div',
                    { className: 'row', key: Math.random() },
                    React.createElement(
                        'div',
                        { className: 'text' },
                        t,
                        ':'
                    ),
                    React.createElement('input', { type: 'text', onChange: function onChange(v) {
                            var o = Object.assign({}, _this2.state.value);
                            o[t] = parseFloat(v.target.value);
                            _this2.setState({ value: o });
                        } })
                );
            });
            //console.log(component)
            return component;
        }
    }, {
        key: 'handleAnswer',
        value: function handleAnswer() {
            if (this.state.value && this.state.value.length > 0) for (var i in this.state.value.keys()) {
                if (!this.state.value[i]) return;else return;
            }this.state.call(this.state.value);
            this.hide();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({ display: 'hidden' });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'window', style: { visibility: this.state.display } },
                this.state.component,
                React.createElement(
                    'div',
                    { className: 'row dock' },
                    React.createElement(
                        'button',
                        { onClick: this.handleAnswer.bind(this) },
                        'OK'
                    ),
                    React.createElement(
                        'button',
                        { onClick: this.hide.bind(this) },
                        'Hide'
                    )
                )
            );
        }
    }]);

    return Window;
}(React.Component);

exports.default = Window;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map