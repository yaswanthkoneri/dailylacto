// assuming express comes with loopback
const static = require('express').static;
const debug = require('debug')('mw-static');

module.exports = function(root, options) {

  var options = Object.assign({}, options, {});
  debug('static middleware root:', root, ' options:', options);
  return static(root, options);
}
