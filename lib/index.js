'use strict';

/*
 * Module dependencies.
 */

var each = require('@ndhoule/each');
var includes = require('@ndhoule/includes');
var query = require('component-query');

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
  var finalScripts = query.all('script');
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
  initialScripts = scripts || query.all('script');
}

/**
 * Default matching function, ignores saucelabs jsonp scripts.
 *
 * @param {Script} script
 * @api private
 * @return {Boolean}
 */

function saucelabs(script) {
  return !script.src.match(/localtunnel\.me\/saucelabs|\/duotest/);
}

/**
 * Automatically capture initial scripts.
 */

captureInitialScripts();

/*
 * Exports.
 */

module.exports = clearScripts;
module.exports.bind = captureInitialScripts;
