'use strict';

// Articles routes use articles controller
var lessVariables = require('../controllers/lessVariables');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.lessVariable.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/lessVariables', lessVariables.all);
    app.post('/lessVariables', authorization.requiresLogin, lessVariables.create);
    app.get('/lessVariables/:lessVariableId', lessVariables.show);
    app.put('/lessVariables/:lessVariableId', authorization.requiresLogin, hasAuthorization, lessVariables.update);
    app.del('/lessVariables/:lessVariableId', authorization.requiresLogin, hasAuthorization, lessVariables.destroy);

    // Finish with setting up the articleId param
    app.param('lessVariableId', lessVariables.lessVariable);

};