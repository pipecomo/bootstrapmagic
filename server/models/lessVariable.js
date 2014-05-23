'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var LessVariableSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    property: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
LessVariableSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

LessVariableSchema.path('property').validate(function(property) {
    return property.length;
}, 'property cannot be blank');

/**
 * Statics
 */
LessVariableSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('LessVariable', LessVariableSchema);
