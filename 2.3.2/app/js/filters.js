'use strict';

/* Filters */

angular.module('bootstrapVariablesEditor.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter('cssName', function() {
    return function(input) {
      return input.substring(1);
    }
  }).
  filter('labelName', function(){
      return function(input){
          var label = input.replace('@','').replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
          return label;
      }
  });
