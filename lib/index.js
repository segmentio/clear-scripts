'use strict';

/*
 * Module dependencies.
 */

var bind = require('component-bind');
var each = require('@ndhoule/each');
var includes = require('@ndhoule/includes');

// Polyfill querySelectorAll for IE7
var querySelectorAll = typeof document.querySelectorAll === 'function' ? bind(document, 'querySelectorAll') : function querySelectorAll(selectors) {
  var element;
  var elements = [];
  var style = document.createElement('style');

  document.documentElement.firstChild.appendChild(style);
  document._qsa = [];

  style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
  window.scrollBy(0, 0);
  style.parentNode.removeChild(style);

  while (document._qsa.length) {
    element = document._qsa.shift();
    element.style.removeAttribute('x-qsa');
    elements.push(element);
  }
  document._qsa = null;
  return elements;
};

/**
 * Initial scripts.
 */

var initialScripts = [];

/**
 * Remove all scripts not initially present.
 *
 * @param {Function} [match] Only remove ones that return true
 * @api public
 */
function clearScripts(match) {
  match = match || saucelabs;
  var finalScripts = querySelectorAll('script');
  each(function(script) {
    if (includes(script, initialScripts)) return;
    if (!script.parentNode) return;
    if (!match(script)) return;
    script.parentNode.removeChild(script);
  }, finalScripts);
}

/**
 * Capture initial scripts, the ones not to remove.
 *
 * @api public
 */
function captureInitialScripts(scripts) {
  initialScripts = scripts || querySelectorAll('script');
}

/**
 * Default matching function, ignores saucelabs jsonp scripts.
 *
 * @param {Script} script
 * @api private
 * @return {boolean}
 */
function saucelabs(script) {
  return !script.src.match(/localtunnel\.me\/saucelabs|\/duotest/);
}

/*
 * Automatically capture initial scripts.
 */

captureInitialScripts();

/*
 * Exports.
 */

module.exports = clearScripts;
module.exports.bind = captureInitialScripts;
