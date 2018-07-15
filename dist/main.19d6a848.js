// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../assets/curves.svg":[["curves.10715560.svg","assets/curves.svg"],"assets/curves.svg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function getRatio(img) {
    var swap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var division = swap ? img.naturalHeight / img.naturalWidth : img.naturalWidth / img.naturalHeight;
    return +division.toFixed(2);
}

exports.default = { getRatio: getRatio };
},{}],"js/main.js":[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('../scss/main.scss');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Scss

// Scripts


var DomiColor = function () {
    function DomiColor() {
        var _this = this;

        _classCallCheck(this, DomiColor);

        this.parentGrid = document.querySelector('.container');
        this.container = document.querySelector('.image');
        this.imageCanvas = document.querySelector('.image__canvas');
        this.imageInput = document.querySelector('.image__input');
        this.$image__border = document.querySelector('.image__border');
        this.$palette = document.querySelector('.palette');
        this.imageIsPortrait = false;
        this.containerDimensions = [this.container.offsetWidth, this.container.offsetHeight];
        this.events = [{
            'handler': function handler(e) {
                return _this.read(e.target.files[0]).bind(_this);
            },
            'element': this.imageInput,
            'event': 'input'
        }, {
            'handler': function handler(event) {
                event.stopPropagation();
                event.preventDefault();
                _this.$image__border.classList.add('active');
            },
            'element': document.querySelector('.image__label'),
            'event': 'dragenter'
        }, {
            'handler': function handler(event) {
                _this.$image__border.classList.remove('active');
                event.stopPropagation();
                event.preventDefault();
            },
            'element': document.querySelector('.image__label'),
            'event': 'dragleave'
        }, {
            'handler': function handler(e) {
                e.stopPropagation();e.preventDefault();
            },
            'element': document.querySelector('.image__label'),
            'event': 'dragover'
        }, {
            'handler': this.dropImage.bind(this),
            'element': document.querySelector('.image__label'),
            'event': 'drop'
        }, {
            'handler': this.showImage.bind(this),
            'element': this.imageCanvas,
            'event': 'load'
        }, {
            'handler': this.resizeImage.bind(this),
            'element': window,
            'event': 'resize'
        }, {
            'handler': this.containerTransition.bind(this),
            'element': this.container,
            'event': 'transitionend'
        }];
    }

    _createClass(DomiColor, [{
        key: 'isPortraitAndBigScreen',
        value: function isPortraitAndBigScreen() {
            return window.innerWidth > 760 && this.imageIsPortrait;
        }
    }, {
        key: 'containerTransition',
        value: function containerTransition(e) {
            console.log(e);
            this.imageCanvas.style.opacity = 1;
        }
    }, {
        key: 'resizeImage',
        value: function resizeImage() {
            if (this.isPortraitAndBigScreen()) {
                this.container.classList.remove('landscape');
                this.container.classList.add('portrait');
            } else {
                this.container.classList.remove('portrait');
                this.container.classList.add('landscape');
            }
        }
    }, {
        key: 'showImage',
        value: function showImage() {
            this.container.classList.add('active');
            this.imageIsPortrait = _utils2.default.getRatio(this.imageCanvas) < 1;
            this.resizeImage();
        }
    }, {
        key: 'dropImage',
        value: function dropImage(e) {
            e.stopPropagation();
            e.preventDefault();
            // Validate it is a image
            var file = e.dataTransfer.files[0];
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                alert('File type not supported.');
                return false;
            }
            this.$image__border.classList.remove('active');
            this.read(file);
        }
    }, {
        key: 'read',
        value: function read(file) {
            var _this2 = this;

            var reader = new FileReader();
            reader.onload = function (data) {
                var src = data.target.result;
                _this2.imageCanvas.style.opacity = 0;
                _this2.imageCanvas.src = src;
                var v = Vibrant.from(src).useQuantizer(Vibrant.Quantizer.WebWorker);
                v.getPalette().then(_this2.processPalette.bind(_this2));
            };
            reader.readAsDataURL(file);
        }
    }, {
        key: 'processPalette',
        value: function processPalette(palette) {
            var colors = Object.values(palette).filter(function (c) {
                return c != null;
            });
            var fragment = document.createDocumentFragment();
            colors.forEach(function (color) {
                var colorElement = document.createElement('div');
                colorElement.classList.add('color');
                colorElement.style.background = color.getHex();
                colorElement.style.color = color.getBodyTextColor();
                colorElement.innerText = color.getHex();
                fragment.appendChild(colorElement);
            });
            this.$palette.innerHTML = '';
            this.$palette.appendChild(fragment);
            this.$palette.style.opacity = 1;
        }
    }, {
        key: 'run',
        value: function run() {
            this.events.forEach(function (event) {
                event.element.addEventListener(event.event, event.handler);
            });
        }
    }]);

    return DomiColor;
}();

var domicolor = new DomiColor();
domicolor.run();
},{"../scss/main.scss":"scss/main.scss","./utils":"js/utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '38623' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.19d6a848.map