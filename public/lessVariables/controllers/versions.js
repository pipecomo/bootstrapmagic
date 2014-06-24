'use strict';

angular.module('mean.versions').controller('VersionsController', ['$scope', '$stateParams', '$location', 'Global', 'Versions', function ($scope, $stateParams, $location, Global, Versions) {
    $scope.global = Global;

    $scope.create = function() {
       
        var version = new Versions({
            title: this.title,
            description: this.description,
            variables: ['abc','def','ghi']
        });
       
        version.$save(function(response) {
           
            $location.path('versions/' + response._id);
            //$location.path('versions/create');
        });

        this.title = '';
        this.description = '';
    };

    $scope.remove = function(version) {
        if (version) {
            version.$remove();

            for (var i in $scope.versions) {
                if ($scope.versions[i] === version) {
                    $scope.versions.splice(i, 1);
                }
            }
        }
        else {
            $scope.version.$remove();
            $location.path('versions');
        }
    };

    $scope.update = function() {
        var version = $scope.version;
        if (!version.updated) {
            version.updated = [];
        }
        version.updated.push(new Date().getTime());

        version.$update(function() {
            $location.path('versions/' + version._id);
        });
    };

    $scope.find = function() {
      
        Versions.query(function(versions) {
            $scope.versions = versions;
        });
    };

    $scope.findOne = function() {
        Versions.get({
            versionId: $stateParams.versionId
        }, function(version) {
            $scope.version = version;
            console.log(version);
        });
    };
}]);