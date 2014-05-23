'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    LessVariable = mongoose.model('LessVariable'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.lessVariable = function(req, res, next, id) {
    LessVariable.load(id, function(err, lessVariable) {
        if (err) return next(err);
        if (!lessVariable) return next(new Error('Failed to load variable ' + id));
        req.lessVariable = lessVariable;
        next();
    });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
    var lessVariable = new LessVariable(req.body);
    lessVariable.user = req.user;

    lessVariable.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                lessVariable: lessVariable
            });
        } else {
            res.jsonp(lessVariable);
        }
    });
};

/**
 * Update an article
 */
exports.update = function(req, res) {
    var lessVariable = req.lessVariable;

    lessVariable = _.extend(lessVariable, req.body);

    lessVariable.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                lessVariable: lessVariable
            });
        } else { 
            res.jsonp(lessVariable);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var lessVariable = req.lessVariable;

    lessVariable.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                lessVariable: lessVariable
            });
        } else {
            res.jsonp(lessVariable);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.lessVariable);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    LessVariable.find().sort('-created').populate('user', 'name username').exec(function(err, lessVariables) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
             res.jsonp(lessVariables);
        }
    });
};
