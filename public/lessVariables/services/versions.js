'use strict';

//LessVariables service used for lessVariables REST endpoint
angular.module('mean.versions').factory('Versions', ['$resource', function($resource) {
    return $resource('versions/:versionId', {
        versionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);