'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Version = mongoose.model('Version'),
    _ = require('lodash');


/**
 * Find version by id
 */
exports.version = function(req, res, next, id) {
    Version.load(id, function(err, version) {
        if (err) return next(err);
        if (!version) return next(new Error('Failed to load version ' + id));
        req.version = version;
        next();
    });
};

/**
 * Create an version
 */
exports.create = function(req, res) {
    var version = new Version(req.body);
    version.user = req.user;

    version.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                version: version
            });
        } else {
            res.jsonp(version);
        }
    });
};

/**
 * Update an version
 */
exports.update = function(req, res) {
    var version = req.version;

    version = _.extend(version, req.body);

    version.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                version: version
            });
        } else {
            res.jsonp(version);
        }
    });
};

/**
 * Delete an version
 */
exports.destroy = function(req, res) {
    var version = req.version;

    version.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                version: version
            });
        } else {
            res.jsonp(version);
        }
    });
};

/**
 * Show an version
 */
exports.show = function(req, res) {
    res.jsonp(req.version);
};

/**
 * List of Versions
 */
exports.all = function(req, res) {
    Version.find().sort('-created').populate('user', 'name username').exec(function(err, versions) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(versions);
        }
    });
};
