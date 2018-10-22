const debug = require('debug')('mw-angular');

// TODO: Publish this into a separate package
module.exports = function(root, options) {

  var options = Object.assign({}, options, {});
  var root = root;
  debug('angular-route middleware, root:', root, ' options:', options);
  var universal = false;
  if (universal) {
    return function angularRoute(req, res, next) {
      debug('rendering angular universal based page:', req.url);
      res.render('index', {req});
    };
  } else {
    return function angularRoute(req, res, next) {
      debug('rendering plain angular page:', req.url);
      res.sendFile('index.html', {root});
    };
  }
};
