'use strict';

//LessVariables service used for lessVariables REST endpoint
angular.module('mean.lessVariables').factory('LessVariables', ['$resource', function($resource) {
    return $resource('lessVariables/:lessVariableId', {
        lessVariableId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);