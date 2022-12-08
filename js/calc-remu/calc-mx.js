// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
            ? global
            : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({
  "dAvcT": [function (require, module, exports) {
    "use strict";
    var global = arguments[3];
    var HMR_HOST = null;
    var HMR_PORT = null;
    var HMR_SECURE = false;
    var HMR_ENV_HASH = "d6ea1d42532a7575";
    module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
    var OldModule = module.bundle.Module;
    function Module(moduleName) {
      OldModule.call(this, moduleName);
      this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function (fn) {
          this._acceptCallbacks.push(fn || function () { });
        },
        dispose: function (fn) {
          this._disposeCallbacks.push(fn);
        }
      };
      module.bundle.hotData = undefined;
    }
    module.bundle.Module = Module;
    var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */;
    function getHostname() {
      return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
    }
    function getPort() {
      return HMR_PORT || location.port;
    } // eslint-disable-next-line no-redeclare
    var parent = module.bundle.parent;
    if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
      var hostname = getHostname();
      var port = getPort();
      var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
      var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
      var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
      // eval may also be disabled via CSP, so do a quick check.
      var supportsSourceURL = false;
      try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
      } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
      } // $FlowFixMe
      ws.onmessage = async function (event) {
        checkedAssets = {} /*: {|[string]: boolean|} */;
        acceptedAssets = {} /*: {|[string]: boolean|} */;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
          // Remove error overlay if there is one
          if (typeof document !== "undefined") removeErrorOverlay();
          let assets = data.assets.filter((asset) => asset.envHash === HMR_ENV_HASH); // Handle HMR Update
          let handled = assets.every((asset) => {
            return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
          });
          if (handled) {
            console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
            await hmrApplyUpdates(assets);
            for (var i = 0; i < assetsToAccept.length; i++) {
              var id = assetsToAccept[i][1];
              if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
            }
          } else fullReload();
        }
        if (data.type === "error") {
          // Log parcel errors to console
          for (let ansiDiagnostic of data.diagnostics.ansi) {
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
          }
          if (typeof document !== "undefined") {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
            document.body.appendChild(overlay);
          }
        }
      };
      ws.onerror = function (e) {
        console.error(e.message);
      };
      ws.onclose = function () {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
      };
    }
    function removeErrorOverlay() {
      var overlay = document.getElementById(OVERLAY_ID);
      if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
      }
    }
    function createErrorOverlay(diagnostics) {
      var overlay = document.createElement("div");
      overlay.id = OVERLAY_ID;
      let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
      for (let diagnostic of diagnostics) {
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame) => {
          return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint) => "<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
      }
      errorHTML += "</div>";
      overlay.innerHTML = errorHTML;
      return overlay;
    }
    function fullReload() {
      if ("reload" in location) location.reload();
      else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    }
    function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
      var modules = bundle.modules;
      if (!modules) return [];
      var parents = [];
      var k, d, dep;
      for (k in modules) for (d in modules[k][1]) {
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
          bundle,
          k
        ]);
      }
      if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
      return parents;
    }
    function updateLink(link) {
      var newLink = link.cloneNode();
      newLink.onload = function () {
        if (link.parentNode !== null) // $FlowFixMe
          link.parentNode.removeChild(link);
      };
      newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
      link.parentNode.insertBefore(newLink, link.nextSibling);
    }
    var cssTimeout = null;
    function reloadCSS() {
      if (cssTimeout) return;
      cssTimeout = setTimeout(function () {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for (var i = 0; i < links.length; i++) {
          // $FlowFixMe[incompatible-type]
          var href = links[i].getAttribute("href");
          var hostname = getHostname();
          var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
          var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
          if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
      }, 50);
    }
    function hmrDownload(asset) {
      if (asset.type === "js") {
        if (typeof document !== "undefined") {
          let script = document.createElement("script");
          script.src = asset.url + "?t=" + Date.now();
          if (asset.outputFormat === "esmodule") script.type = "module";
          return new Promise((resolve, reject) => {
            var _document$head;
            script.onload = () => resolve(script);
            script.onerror = reject;
            (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
          });
        } else if (typeof importScripts === "function") {
          // Worker scripts
          if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
          else return new Promise((resolve, reject) => {
            try {
              importScripts(asset.url + "?t=" + Date.now());
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        }
      }
    }
    async function hmrApplyUpdates(assets) {
      global.parcelHotUpdate = Object.create(null);
      let scriptsToRemove;
      try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
          let promises = assets.map((asset) => {
            var _hmrDownload;
            return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err) => {
              // Web extension bugfix for Chromium
              // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
              if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                  extCtx.runtime.reload();
                  return;
                }
                asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                return hmrDownload(asset);
              }
              throw err;
            });
          });
          scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
      } finally {
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script) => {
          if (script) {
            var _document$head2;
            (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
          }
        });
      }
    }
    function hmrApply(bundle, asset) {
      var modules = bundle.modules;
      if (!modules) return;
      if (asset.type === "css") reloadCSS();
      else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
          if (modules[asset.id]) {
            // Remove dependencies that are removed and will become orphaned.
            // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
            let oldDeps = modules[asset.id][1];
            for (let dep in oldDeps) if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
              let id = oldDeps[dep];
              let parents = getParents(module.bundle.root, id);
              if (parents.length === 1) hmrDelete(module.bundle.root, id);
            }
          }
          if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
          // $FlowFixMe
          let fn = global.parcelHotUpdate[asset.id];
          modules[asset.id] = [
            fn,
            deps
          ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
      }
    }
    function hmrDelete(bundle, id) {
      let modules = bundle.modules;
      if (!modules) return;
      if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for (let dep in deps) {
          let parents = getParents(module.bundle.root, deps[dep]);
          if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id) => {
          hmrDelete(module.bundle.root, id);
        });
      } else if (bundle.parent) hmrDelete(bundle.parent, id);
    }
    function hmrAcceptCheck(bundle, id, depsByBundle) {
      if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
      // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
      let parents = getParents(module.bundle.root, id);
      let accepted = false;
      while (parents.length > 0) {
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
          accepted = true;
        else {
          // Otherwise, queue the parents in the next level upward.
          let p = getParents(module.bundle.root, v[1]);
          if (p.length === 0) {
            // If there are no parents, then we've reached an entry without accepting. Reload.
            accepted = false;
            break;
          }
          parents.push(...p);
        }
      }
      return accepted;
    }
    function hmrAcceptCheckOne(bundle, id, depsByBundle) {
      var modules = bundle.modules;
      if (!modules) return;
      if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
      }
      if (checkedAssets[id]) return true;
      checkedAssets[id] = true;
      var cached = bundle.cache[id];
      assetsToAccept.push([
        bundle,
        id
      ]);
      if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
    }
    function hmrAcceptRun(bundle, id) {
      var cached = bundle.cache[id];
      bundle.hotData = {};
      if (cached && cached.hot) cached.hot.data = bundle.hotData;
      if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function (cb) {
        cb(bundle.hotData);
      });
      delete bundle.cache[id];
      bundle(id);
      cached = bundle.cache[id];
      if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function (cb) {
        var assetsToAlsoAccept = cb(function () {
          return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
          assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      });
      acceptedAssets[id] = true;
    }

  }, {}], "8lqZg": [function (require, module, exports) {
    const calculateSubsidy = require("./subsidy");
    const calculateLisr = require("./rates");
    const calculateSecurity = require("./security");
    const { buttonState } = require("./periodButton");
    const minSueldoMap = {
      mensual: 5186.1,
      quincenal: 2593.05,
      diario: 172.87
    };
/**
 * Calculate the difference between the lisr and the subsidy.
 * @param lisr - The amount of ISR that the user has to pay.
 * @param subsidy - The subsidy amount that the user is requesting.
 * @returns The absolute value of the difference between the lisr and the subsidy.
 */ const calculateIsr = (lisr, subsidy) => {
      return Math.abs(lisr.lisr - subsidy);
    };
/**
 * It calculates the net salary of a worker given an amount and a period
 * @param amount - The amount of the salary
 * @param period - "quincenal" or "mensual"
 * @returns {
 *     "lisr": {
 *         "lisr": number,
 *         "amount": number,
 *         "period": "mensual" or "quincenal" o "diario",
 *         "tax": number,
 *         "taxPercentage": number,
 *         "taxAmount": number,
 *         "subsidy": number,
 *         "subsidyPercentage": number,
 */ function calculateSalary(amount, period, includeIMMS = false) {
      const lisr = calculateLisr(amount, period);
      const subsidy = calculateSubsidy(amount, period);
      const isr = calculateIsr(lisr, subsidy);
      const security = calculateSecurity(amount, period, "trabajador"); // TYPES: patron, trabajador
      const netSalaryWithoutSecurity = lisr.lisr > subsidy ? amount - isr : amount + isr;
      const netSalary = includeIMMS ? netSalaryWithoutSecurity - security : netSalaryWithoutSecurity;
      return {
        lisr,
        subsidy,
        isr,
        security,
        netSalary
      };
    }
    const getActivePeriod = (buttonState) => {
      for (const key in buttonState) {
        const value = buttonState[key];
        if (value) return key;
      }
    };
    const mxFormatter = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const displayValues = (salary) => {
      const limiteInferior = document.getElementById("limite-inferior");
      const excedente = document.getElementById("excedente-limite-inferior");
      const porcentaje = document.getElementById("porcentaje-excedente");
      const impuestoMarginal = document.getElementById("impuesto-marginal");
      const cuotaFija = document.getElementById("cuota-fija-impuesto");
      const isr = document.getElementById("isr");
      const imss = document.getElementById("imss");
      const subsidio = document.getElementById("subsidio");
      const sueldoNeto = document.getElementById("sueldo-neto");
      limiteInferior.innerHTML = mxFormatter.format(salary.lisr.limiteInferior);
      excedente.innerHTML = mxFormatter.format(salary.lisr.excedente);
      porcentaje.innerHTML = mxFormatter.format(salary.lisr.porcentajeSobreExcedente);
      impuestoMarginal.innerHTML = mxFormatter.format(salary.lisr.impuestoMarginal);
      cuotaFija.innerHTML = mxFormatter.format(salary.lisr.cuotaFija);
      isr.innerHTML = mxFormatter.format(salary.isr);
      imss.innerHTML = mxFormatter.format(salary.security);
      subsidio.innerHTML = mxFormatter.format(salary.subsidy);
      sueldoNeto.innerHTML = mxFormatter.format(salary.netSalary) + " MXN";
    };
    document.getElementById("calcular-sueldo").addEventListener("click", (e) => {
      const sueldoInput = document.getElementById("sueldo-bruto");
      const activePeriod = getActivePeriod(buttonState);
      const imssCheck = document.getElementById("imss-check")?.checked;
      if (!activePeriod) {
        alert("Debes seleccionar un per\xedodo");
        return;
      }
      const minSueldo = minSueldoMap[activePeriod];
      const sueldo = parseFloat(sueldoInput.value);
      if (sueldo < minSueldo) {
        alert(`El sueldo bruto no puede ser inferior a ${mxFormatter.format(minSueldo)} MXN para el período ${activePeriod}.`);
        return;
      }
      const salary = calculateSalary(sueldo, activePeriod, imssCheck);
      displayValues(salary);
    });

  }, { "./subsidy": "jJxU9", "./rates": "ejzMK", "./security": "hr43o", "./periodButton": "lQzs5" }], "jJxU9": [function (require, module, exports) {
    const diaryTable = [
      {
        min: 0.01,
        max: 58.0,
        amount: 13.34
      },
      {
        min: 58.01,
        max: 87.0,
        amount: 13.34
      },
      {
        min: 87.01,
        max: 113.86,
        amount: 13.33
      },
      {
        min: 113.87,
        max: 116.0,
        amount: 12.88
      },
      {
        min: 116.01,
        max: 145.78,
        amount: 12.54
      },
      {
        min: 145.79,
        max: 154.66,
        amount: 11.61
      },
      {
        min: 154.67,
        max: 174.93,
        amount: 10.65
      },
      {
        min: 174.94,
        max: 204.09,
        amount: 9.66
      },
      {
        min: 204.1,
        max: 233.24,
        amount: 8.31
      },
      {
        min: 233.25,
        max: 242.04,
        amount: 7.13
      },
      {
        min: 242.05,
        max: Infinity,
        amount: 0
      },
    ];
    const quincenalTable = [
      {
        min: 0.01,
        max: 884.48,
        amount: 203.51
      },
      {
        min: 884.49,
        max: 1326.69,
        amount: 203.42
      },
      {
        min: 1326.7,
        max: 1736.42,
        amount: 203.31
      },
      {
        min: 1736.43,
        max: 1768.94,
        amount: 196.39
      },
      {
        min: 1768.95,
        max: 2223.08,
        amount: 191.23
      },
      {
        min: 2223.09,
        max: 2358.59,
        amount: 177.12
      },
      {
        min: 2358.6,
        max: 2667.71,
        amount: 162.44
      },
      {
        min: 2667.72,
        max: 3112.34,
        amount: 147.32
      },
      {
        min: 3112.35,
        max: 3556.95,
        amount: 126.77
      },
      {
        min: 3556.96,
        max: 3691.17,
        amount: 108.81
      },
      {
        min: 3691.18,
        max: Infinity,
        amount: 0
      },
    ];
    const mensualTable = [
      {
        min: 0.01,
        max: 1768.96,
        amount: 407.02
      },
      {
        min: 1768.97,
        max: 2653.38,
        amount: 406.83
      },
      {
        min: 2653.39,
        max: 3472.84,
        amount: 406.62
      },
      {
        min: 3472.85,
        max: 3537.87,
        amount: 392.77
      },
      {
        min: 3537.88,
        max: 4446.15,
        amount: 382.46
      },
      {
        min: 4446.16,
        max: 4717.18,
        amount: 354.23
      },
      {
        min: 4717.19,
        max: 5335.42,
        amount: 324.87
      },
      {
        min: 5335.43,
        max: 6224.67,
        amount: 294.63
      },
      {
        min: 6224.68,
        max: 7113.9,
        amount: 253.54
      },
      {
        min: 7113.91,
        max: 7382.33,
        amount: 217.61
      },
      {
        min: 7382.34,
        max: Infinity,
        amount: 0
      },
    ];
/**
 * It returns a table based on the period
 * @param period - The period of the table to be returned.
 * @returns A function that takes a period and returns a table.
 */ const getTable = (period) => {
      switch (period) {
        case "diario":
          return diaryTable;
        case "quincenal":
          return quincenalTable;
        case "mensual":
          return mensualTable;
        default:
          throw new Error(`Periodo no valido: ${period}`);
      }
    };
/**
 * It takes an amount and a period, and returns the subsidy for that amount and period
 * @param amount - The amount of the gross income
 * @param period - The period of the subsidy. This is either "monthly" or "biweekly" or "daily".
 * @returns The amount of subsidy
 */ function calculateSubsidy(amount, period) {
      // get the table row
      const row = getTable(period).find((row) => amount >= row.min && amount <= row.max);
      // calculate the amount of subsidy
      return row.amount;
    }
    module.exports = calculateSubsidy;

  }, {}], "ejzMK": [function (require, module, exports) {
    const diaryRates = [
      {
        min: 0.01,
        max: 21.19,
        amount: 0,
        percent: 0.0192
      },
      {
        min: 21.2,
        max: 179.87,
        amount: 0.41,
        percent: 0.064
      },
      {
        min: 179.88,
        max: 316.1,
        amount: 10.56,
        percent: 0.1088
      },
      {
        min: 316.11,
        max: 367.45,
        amount: 25.38,
        percent: 0.16
      },
      {
        min: 367.46,
        max: 439.94,
        amount: 33.6,
        percent: 0.1792
      },
      {
        min: 439.95,
        max: 887.29,
        amount: 46.59,
        percent: 0.2136
      },
      {
        min: 887.3,
        max: 1398.5,
        amount: 142.15,
        percent: 0.2352
      },
      {
        min: 1398.51,
        max: 2669.96,
        amount: 262.38,
        percent: 0.3
      },
      {
        min: 2669.97,
        max: 3559.95,
        amount: 643.82,
        percent: 0.32
      },
      {
        min: 3559.96,
        max: 10679.84,
        amount: 928.61,
        percent: 0.34
      },
      {
        min: 10679.85,
        max: Infinity,
        amount: 3349.38,
        percent: 0.35
      },
    ];
    const quincenalRates = [
      {
        min: 0.01,
        max: 318,
        amount: 0,
        percent: 0.0192
      },
      {
        min: 318.01,
        max: 2699.4,
        amount: 6.15,
        percent: 0.064
      },
      {
        min: 2699.41,
        max: 4744.05,
        amount: 158.55,
        percent: 0.1088
      },
      {
        min: 4744.06,
        max: 5514.75,
        amount: 381,
        percent: 0.16
      },
      {
        min: 5514.76,
        max: 6602.7,
        amount: 504.3,
        percent: 0.1792
      },
      {
        min: 6602.71,
        max: 13316.7,
        amount: 699.3,
        percent: 0.2136
      },
      {
        min: 13316.71,
        max: 20988.9,
        amount: 2133.3,
        percent: 0.2352
      },
      {
        min: 20988.81,
        max: 40071.3,
        amount: 3937.8,
        percent: 0.3
      },
      {
        min: 40071.31,
        max: 53428.5,
        amount: 9662.55,
        percent: 0.32
      },
      {
        min: 53428.51,
        max: 160285.35,
        amount: 13936.8,
        percent: 0.34
      },
      {
        min: 160285.36,
        max: Infinity,
        amount: 50268.15,
        percent: 0.35
      },
    ];
    const mensualRates = [
      {
        min: 0.01,
        max: 644.58,
        amount: 0,
        percent: 0.0192
      },
      {
        min: 644.59,
        max: 5470.92,
        amount: 12.38,
        percent: 0.064
      },
      {
        min: 5470.93,
        max: 9614.66,
        amount: 321.26,
        percent: 0.1088
      },
      {
        min: 9614.67,
        max: 11176.62,
        amount: 772.1,
        percent: 0.16
      },
      {
        min: 11176.63,
        max: 13381.47,
        amount: 1022.01,
        percent: 0.1792
      },
      {
        min: 13381.48,
        max: 26988.5,
        amount: 1417.12,
        percent: 0.2136
      },
      {
        min: 26988.51,
        max: 42537.58,
        amount: 4323.58,
        percent: 0.2352
      },
      {
        min: 42537.59,
        max: 81211.25,
        amount: 7980.73,
        percent: 0.3
      },
      {
        min: 81211.26,
        max: 108281.67,
        amount: 19582.83,
        percent: 0.32
      },
      {
        min: 108281.68,
        max: 324845.01,
        amount: 28245.36,
        percent: 0.34
      },
      {
        min: 324845.02,
        max: Infinity,
        amount: 101876.9,
        percent: 0.35
      },
    ];
/**
 * It takes an income and a period and returns an object with the income tax information
 * @param income - The income to calculate the LISR for.
 * @param period - The period of the income. It can be "diario", "quincenal" or "mensual".
 * @returns An object with the following properties:
 * baseGravable,
 * limiteInferior,
 * excedente,
 * porcentajeSobreExcedente,
 * impuestoMarginal,
 * cuotaFija,
 * lisr,
 */ function calculateLisr(income, period) {
      let lisr = 0;
      let rates = null;
      let baseGravable = income;
      let limiteInferior = 0;
      let excedente = 0;
      let porcentajeSobreExcedente = 0;
      let impuestoMarginal = 0;
      let cuotaFija = 0;
      switch (period) {
        case "diario":
          rates = diaryRates;
          break;
        case "quincenal":
          rates = quincenalRates;
          break;
        case "mensual":
          rates = mensualRates;
          break;
        default:
          throw new Error(`Periodo no valido: ${period}`);
      }
      rates.forEach((rate) => {
        if (income >= rate.min && income <= rate.max) {
          limiteInferior = rate.min;
          excedente = income - limiteInferior;
          porcentajeSobreExcedente = rate.percent;
          impuestoMarginal = excedente * porcentajeSobreExcedente;
          cuotaFija = rate.amount;
          lisr = impuestoMarginal + cuotaFija;
        }
      });
      const lisrObject = {
        baseGravable,
        limiteInferior,
        excedente,
        porcentajeSobreExcedente,
        impuestoMarginal,
        cuotaFija,
        lisr
      };
      return lisrObject;
    }
    module.exports = calculateLisr;

  }, {}], "hr43o": [function (require, module, exports) {
    const securityTable = require("./getSecurityTable");
    const { getDays, getBenefit, getMedicalExpenses, getUnemploymentAndOldAge, getDisability, } = require("./utilsSecurity");
/**
 * It calculates the amount of money that an employer must pay to the Mexican government for a given
 * employee
 * @param amount - The amount of money the employee is being paid.
 * @param period - weekly, biweekly, monthly, bimonthly, quarterly, semiannually, annually
 * @param type - "patron" or "trabajador"
 * @returns The sum of the security data
 */ function calculateSecurity(amount, period, type) {
      const uma = 96.22;
      const factorIntegracion = 1.0452;
      const sueldoMinimoDiario = 172.87;
      const salarioDiario = amount / getDays(period);
      const salarioIntegradoTope = Math.min(salarioDiario * factorIntegracion, 25 * uma);
      const cuotaFija = uma * getDays(period) * securityTable.enfermedad.cuotaFija[type];
      const excedente = salarioIntegradoTope > 3 * uma ? (salarioIntegradoTope - 3 * uma) * securityTable.enfermedad.excedente[type] * getDays(period) : 0;
      const prestaciones = getBenefit(type, salarioDiario, sueldoMinimoDiario, salarioIntegradoTope, period);
      const gastosMedicos = getMedicalExpenses(type, salarioDiario, sueldoMinimoDiario, salarioIntegradoTope, period);
      const riesgo = salarioIntegradoTope * getDays(period) * securityTable.riesgo[type];
      const invalidez = getDisability(type, salarioDiario, sueldoMinimoDiario, salarioIntegradoTope, period);
      const guarderias = salarioIntegradoTope * getDays(period) * securityTable.guarderias[type];
      const retiro = salarioIntegradoTope * getDays(period) * securityTable.cesantia.retiro[type];
      const infonavit = salarioIntegradoTope * getDays(period) * securityTable.infonavit[type];
      const vejez = getUnemploymentAndOldAge(type, salarioDiario, sueldoMinimoDiario, salarioIntegradoTope, period);
      const securityData = {
        cuotaFija,
        excedente,
        prestaciones,
        gastosMedicos,
        riesgo,
        invalidez,
        guarderias,
        retiro,
        infonavit,
        vejez
      };
      const sumSecurityData = cuotaFija + excedente + prestaciones + gastosMedicos + riesgo + invalidez + guarderias + retiro + infonavit + vejez;
      return sumSecurityData;
    }
    module.exports = calculateSecurity;

  }, { "./getSecurityTable": "jbTKk", "./utilsSecurity": "xVeDt" }], "jbTKk": [function (require, module, exports) {
    const securityTable = {
      riesgo: {
        patron: 0.005,
        trabajador: 0
      },
      enfermedad: {
        cuotaFija: {
          patron: 0.204,
          trabajador: 0
        },
        excedente: {
          patron: 0.011,
          trabajador: 0.004
        },
        gastosMedicos: {
          patron: 0.0105,
          trabajador: 0.00375
        },
        prestaciones: {
          patron: 0.007,
          trabajador: 0.0025
        }
      },
      invalidez: {
        patron: 0.0175,
        trabajador: 0.00625
      },
      cesantia: {
        retiro: {
          patron: 0.02,
          trabajador: 0
        },
        vejez: {
          patron: 0.0315,
          trabajador: 0.01125
        }
      },
      guarderias: {
        patron: 0.01,
        trabajador: 0
      },
      infonavit: {
        patron: 0.05,
        trabajador: 0
      }
    };
    module.exports = securityTable;

  }, {}], "xVeDt": [function (require, module, exports) {
    const securityTable = require("./getSecurityTable");
/**
 * It takes a string and returns a number
 * @param period - The period, it can be "diario", "quincenal" or "mensual".
 */ const getDays = (period) => {
      switch (period) {
        case "diario":
          return 1;
        case "quincenal":
          return 15;
        case "mensual":
          return 30;
        default:
          throw new Error(`Periodo no valido: ${period}`);
      }
    };
/**
 * It returns the benefit for the employee or employer depending on the type of the user, the salary,
 * the minimum daily salary, the salary integrated to the top, and the period
 * @param type - "patron" or "trabajador"
 * @param salary - the salary of the employee
 * @param sueldoMinimoDiario - minimum wage in Mexico
 * @param salaryIntegradoTope - is the maximum amount daily that can be paid to the employee.
 * @param period - it can be "diario", "quincenal" or "mensual".
 * @returns The benefit of the employee or the employer.
 */ const getBenefit = (type, salary, sueldoMinimoDiario, salaryIntegradoTope, period) => {
      if (type === "patron") return salary === sueldoMinimoDiario ? salaryIntegradoTope * getDays(period) * securityTable.enfermedad.prestaciones.patron + sueldoMinimoDiario * getDays(period) * securityTable.enfermedad.prestaciones.trabajador : salaryIntegradoTope * getDays(period) * securityTable.enfermedad.prestaciones.patron;
      else return salary !== sueldoMinimoDiario ? salaryIntegradoTope * getDays(period) * securityTable.enfermedad.prestaciones.trabajador : 0;
    };
/**
 * It returns the medical expenses for a given type of worker (patron or trabajador), salary,
 * sueldoMinimoDiario, salaryIntegradoTope, and period
 * @param type - "patron" or "trabajador"
 * @param salary - the salary of the employee
 * @param sueldoMinimoDiario - minimum wage in Mexico
 * @param salaryIntegradoTope - is the maximum amount daily that can be paid to the employee.
 * @param period - it can be "diario", "quincenal" or "mensual".
 * @returns the value of the medical expenses.
 */ const getMedicalExpenses = (type, salary, sueldoMinimoDiario, salaryIntegradoTope, period) => {
      if (type === "patron") return salary === sueldoMinimoDiario ? salaryIntegradoTope * getDays(period) * securityTable.enfermedad.gastosMedicos.patron + sueldoMinimoDiario * getDays(period) * securityTable.enfermedad.gastosMedicos.trabajador : salaryIntegradoTope * getDays(period) * securityTable.enfermedad.gastosMedicos.patron;
      else return salary !== sueldoMinimoDiario ? salaryIntegradoTope * getDays(period) * securityTable.enfermedad.gastosMedicos.trabajador : 0;
    };
/**
 * It returns the amount of money that should be paid for unemployment and old age insurance, depending
 * on the type of the person (employer or employee), the salary, the minimum daily salary, the salary
 * integrated limit, and the period
 * @param type - "patron" or "trabajador"
 * @param salary - the salary of the employee
 * @param sueldoMinimoDiario - minimum wage in Mexico
 * @param salaryIntegradoTope - is the maximum amount daily that can be paid to the employee.
 * @param period - it can be "diario", "quincenal" or "mensual".
 * @returns the value of the unemployment and old age insurance.
 */ const getUnemploymentAndOldAge = (type, salary, sueldoMinimoDiario, salaryIntegradoTope, period) => {
      if (type === "patron") return salary === sueldoMinimoDiario ? salaryIntegradoTope * getDays(period) * securityTable.cesantia.vejez.patron + sueldoMinimoDiario * getDays(period) * securityTable.cesantia.vejez.trabajador : salaryIntegradoTope * getDays(period) * securityTable.cesantia.vejez.patron;
      else return salary !== sueldoMinimoDiario ? salaryIntegradoTope * getDays(period) * securityTable.cesantia.vejez.trabajador : 0;
    };
/**
 * It returns the disability amount for a given type of user (patron or trabajador), salary,
 * sueldoMinimoDiario, salaryIntegradoTope, and period
 * @param type - "patron" or "trabajador"
 * @param salary - the employee's salary
 * @param sueldoMinimoDiario - minimum wage in Mexico
 * @param salaryIntegradoTope - is the maximum amount daily that can be paid to the employee.
 * @param period - it can be "diario", "quincenal" or "mensual".
 */ const getDisability = (type, salary, sueldoMinimoDiario, salaryIntegradoTope, period) => {
      if (type === "patron") return salary === sueldoMinimoDiario ? salaryIntegradoTope * getDays(period) * securityTable.invalidez.patron + sueldoMinimoDiario * getDays(period) * securityTable.invalidez.trabajador : salaryIntegradoTope * getDays(period) * securityTable.invalidez.patron;
      else return salary !== sueldoMinimoDiario ? salaryIntegradoTope * getDays(period) * securityTable.invalidez.trabajador : 0;
    };
    module.exports = {
      getDays,
      getBenefit,
      getMedicalExpenses,
      getUnemploymentAndOldAge,
      getDisability
    };

  }, { "./getSecurityTable": "jbTKk" }], "lQzs5": [function (require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    parcelHelpers.export(exports, "buttonState", () => buttonState);
    const periodButtons = document.getElementsByClassName("btn-period");
    const buttonState = {};
    const setActive = (activeName) => {
      for (const button of periodButtons) {
        buttonState[button.name] = activeName === button.name;
        activeName === button.name ? button.classList.add("active") : button.classList.remove("active");
      }
      if (!activeName) return;
      const periodSpan = document.getElementsByClassName("SELECTED_PERIOD");
      console.log({
        activeName,
        periodSpan
      });
      for (const span of periodSpan) span.innerHTML = activeName;
    };
    setActive();
    for (const button of periodButtons) {
      console.log(button.name);
      buttonState[button.name] = false;
      button.addEventListener("click", onClickPeriod);
    }
    function onClickPeriod(e) {
      const name = e?.target?.name;
      if (!name) return;
      setActive(name);
    }

  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "9s9Aq" }], "9s9Aq": [function (require, module, exports) {
    exports.interopDefault = function (a) {
      return a && a.__esModule ? a : {
        default: a
      };
    };
    exports.defineInteropFlag = function (a) {
      Object.defineProperty(a, "__esModule", {
        value: true
      });
    };
    exports.exportAll = function (source, dest) {
      Object.keys(source).forEach(function (key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
          enumerable: true,
          get: function () {
            return source[key];
          }
        });
      });
      return dest;
    };
    exports.export = function (dest, destName, get) {
      Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
      });
    };

  }, {}]
}, ["dAvcT", "8lqZg"], "8lqZg", "parcelRequire94c2")

//# sourceMappingURL=index.975ef6c8.js.map
