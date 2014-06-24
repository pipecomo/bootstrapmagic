'use strict';

// Articles routes use articles controller
var versions = require('../controllers/versions');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.version.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/versions', versions.all);
    app.post('/versions', authorization.requiresLogin, versions.create);
    app.get('/versions/:versionId', versions.show);
    app.put('/versions/:versionId', authorization.requiresLogin, hasAuthorization, versions.update);
    app.del('/versions/:versionId', authorization.requiresLogin, hasAuthorization, versions.destroy);

    // Finish with setting up the articleId param
    app.param('versionId', versions.version);

};