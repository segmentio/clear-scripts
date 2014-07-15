
/**
 * Module dependencies.
 */

var query = require('query');
var each = require('each');
var indexOf = require('indexof');

/**
 * Initial scripts.
 */

var initialScripts;

/**
 * Remove all scripts not initially present.
 *
 * @api private
 */

exports = module.exports = function(){
  var finalScripts = query.all('script');
  each(finalScripts, function(script){
    if (-1 == indexOf(initialScripts, script)) {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }
  });
};

/**
 * Capture initial scripts, the ones not to remove.
 *
 * @api public
 */

exports.bind = function(scripts){
  initialScripts = scripts || query.all('script');
};