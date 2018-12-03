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
})({"leaflet-heat.js":[function(require,module,exports) {
/*
 (c) 2014, Vladimir Agafonkin
 simpleheat, a tiny JavaScript library for drawing heatmaps with Canvas
 https://github.com/mourner/simpleheat
*/
!function () {
  "use strict";

  function t(i) {
    return this instanceof t ? (this._canvas = i = "string" == typeof i ? document.getElementById(i) : i, this._ctx = i.getContext("2d"), this._width = i.width, this._height = i.height, this._max = 1, void this.clear()) : new t(i);
  }
  t.prototype = {
    defaultRadius: 25,
    defaultGradient: {
      .4: "blue",
      .6: "cyan",
      .7: "lime",
      .8: "yellow",
      1: "red"
    },
    data: function data(t, i) {
      return this._data = t, this;
    },
    max: function max(t) {
      return this._max = t, this;
    },
    add: function add(t) {
      return this._data.push(t), this;
    },
    clear: function clear() {
      return this._data = [], this;
    },
    radius: function radius(t, i) {
      i = i || 15;
      var a = this._circle = document.createElement("canvas"),
          s = a.getContext("2d"),
          e = this._r = t + i;
      return a.width = a.height = 2 * e, s.shadowOffsetX = s.shadowOffsetY = 200, s.shadowBlur = i, s.shadowColor = "black", s.beginPath(), s.arc(e - 200, e - 200, t, 0, 2 * Math.PI, !0), s.closePath(), s.fill(), this;
    },
    gradient: function gradient(t) {
      var i = document.createElement("canvas"),
          a = i.getContext("2d"),
          s = a.createLinearGradient(0, 0, 0, 256);
      i.width = 1, i.height = 256;
      for (var e in t) {
        s.addColorStop(e, t[e]);
      }return a.fillStyle = s, a.fillRect(0, 0, 1, 256), this._grad = a.getImageData(0, 0, 1, 256).data, this;
    },
    draw: function draw(t) {
      this._circle || this.radius(this.defaultRadius), this._grad || this.gradient(this.defaultGradient);
      var i = this._ctx;
      i.clearRect(0, 0, this._width, this._height);
      for (var a, s = 0, e = this._data.length; e > s; s++) {
        a = this._data[s], i.globalAlpha = Math.max(a[2] / this._max, t || .05), i.drawImage(this._circle, a[0] - this._r, a[1] - this._r);
      }var n = i.getImageData(0, 0, this._width, this._height);
      return this._colorize(n.data, this._grad), i.putImageData(n, 0, 0), this;
    },
    _colorize: function _colorize(t, i) {
      for (var a, s = 3, e = t.length; e > s; s += 4) {
        a = 4 * t[s], a && (t[s - 3] = i[a], t[s - 2] = i[a + 1], t[s - 1] = i[a + 2]);
      }
    }
  }, window.simpleheat = t;
}(),
/*
 (c) 2014, Vladimir Agafonkin
 Leaflet.heat, a tiny and fast heatmap plugin for Leaflet.
 https://github.com/Leaflet/Leaflet.heat
*/
L.HeatLayer = (L.Layer ? L.Layer : L.Class).extend({
  initialize: function initialize(t, i) {
    this._latlngs = t, L.setOptions(this, i);
  },
  setLatLngs: function setLatLngs(t) {
    return this._latlngs = t, this.redraw();
  },
  addLatLng: function addLatLng(t) {
    return this._latlngs.push(t), this.redraw();
  },
  setOptions: function setOptions(t) {
    return L.setOptions(this, t), this._heat && this._updateOptions(), this.redraw();
  },
  redraw: function redraw() {
    return !this._heat || this._frame || this._map._animating || (this._frame = L.Util.requestAnimFrame(this._redraw, this)), this;
  },
  onAdd: function onAdd(t) {
    this._map = t, this._canvas || this._initCanvas(), t._panes.overlayPane.appendChild(this._canvas), t.on('moveend', this._reset, this), t.options.zoomAnimation && L.Browser.any3d && t.on('zoomanim', this._animateZoom, this), this._reset();
  },
  onRemove: function onRemove(t) {
    t.getPanes().overlayPane.removeChild(this._canvas), t.off('moveend', this._reset, this), t.options.zoomAnimation && t.off('zoomanim', this._animateZoom, this);
  },
  addTo: function addTo(t) {
    return t.addLayer(this), this;
  },
  _initCanvas: function _initCanvas() {
    var t = this._canvas = L.DomUtil.create('canvas', 'leaflet-heatmap-layer leaflet-layer'),
        i = L.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
    t.style[i] = '50% 50%';
    var a = this._map.getSize();
    t.width = a.x, t.height = a.y;
    var s = this._map.options.zoomAnimation && L.Browser.any3d;
    L.DomUtil.addClass(t, 'leaflet-zoom-' + (s ? 'animated' : 'hide')), this._heat = simpleheat(t), this._updateOptions();
  },
  _updateOptions: function _updateOptions() {
    this._heat.radius(this.options.radius || this._heat.defaultRadius, this.options.blur), this.options.gradient && this._heat.gradient(this.options.gradient), this.options.max && this._heat.max(this.options.max);
  },
  _reset: function _reset() {
    var t = this._map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(this._canvas, t);
    var i = this._map.getSize();
    this._heat._width !== i.x && (this._canvas.width = this._heat._width = i.x), this._heat._height !== i.y && (this._canvas.height = this._heat._height = i.y), this._redraw();
  },
  _redraw: function _redraw() {
    var t,
        i,
        a,
        s,
        e,
        n,
        h,
        o,
        r,
        d = [],
        _ = this._heat._r,
        l = this._map.getSize(),
        m = new L.Bounds(L.point([-_, -_]), l.add([_, _])),
        c = void 0 === this.options.max ? 1 : this.options.max,
        u = void 0 === this.options.maxZoom ? this._map.getMaxZoom() : this.options.maxZoom,
        f = 1 / Math.pow(2, Math.max(0, Math.min(u - this._map.getZoom(), 12))),
        g = _ / 2,
        p = [],
        v = this._map._getMapPanePos(),
        w = v.x % g,
        y = v.y % g;
    for (t = 0, i = this._latlngs.length; i > t; t++) {
      if (a = this._map.latLngToContainerPoint(this._latlngs[t]), m.contains(a)) {
        e = Math.floor((a.x - w) / g) + 2, n = Math.floor((a.y - y) / g) + 2;
        var x = void 0 !== this._latlngs[t].alt ? this._latlngs[t].alt : void 0 !== this._latlngs[t][2] ? +this._latlngs[t][2] : 1;
        r = x * f, p[n] = p[n] || [], s = p[n][e], s ? (s[0] = (s[0] * s[2] + a.x * r) / (s[2] + r), s[1] = (s[1] * s[2] + a.y * r) / (s[2] + r), s[2] += r) : p[n][e] = [a.x, a.y, r];
      }
    }for (t = 0, i = p.length; i > t; t++) {
      if (p[t]) for (h = 0, o = p[t].length; o > h; h++) {
        s = p[t][h], s && d.push([Math.round(s[0]), Math.round(s[1]), Math.min(s[2], c)]);
      }
    }
    this._heat.data(d).draw(this.options.minOpacity), this._frame = null;
  },
  _animateZoom: function _animateZoom(t) {
    var i = this._map.getZoomScale(t.zoom),
        a = this._map._getCenterOffset(t.center)._multiplyBy(-i).subtract(this._map._getMapPanePos());
    L.DomUtil.setTransform ? L.DomUtil.setTransform(this._canvas, a, i) : this._canvas.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(a) + ' scale(' + i + ')';
  }
}), L.heatLayer = function (t, i) {
  return new L.HeatLayer(t, i);
};
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59295' + '/');
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
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","leaflet-heat.js"], null)
//# sourceMappingURL=/leaflet-heat.f659ccb4.map