'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Version Schema
 */
var VersionSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
        
    },
    description: {
        type: String
        
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    variables: { type : Object , "default" : {} }
});

/**
 * Validations
 */
VersionSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
VersionSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Version', VersionSchema);
