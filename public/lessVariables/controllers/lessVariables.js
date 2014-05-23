'use strict';

angular.module('mean.lessVariables').controller('LessVariablesController', ['$scope', '$stateParams', '$location', 'Global', 'LessVariables', function ($scope, $stateParams, $location, Global, LessVariables) {
    $scope.global = Global;

    $scope.create = function() {
       
        var lessVariable = new LessVariables({
            name: this.name,
            property: this.property
        });
        lessVariable.$save(function(response) {
            $location.path('lessVariables/' + response._id);
        });

        this.name = '';
        this.property = '';
    };

    $scope.remove = function(lessVariable) {
        if (lessVariable) {
            lessVariable.$remove();

            for (var i in $scope.lessVariables) {
                if ($scope.lessVariables[i] === lessVariable) {
                    $scope.lessVariables.splice(i, 1);
                }
            }
        }
        else {
            $scope.lessVariable.$remove();
            $location.path('lessVariables');
        }
    };

    $scope.update = function() {
        var lessVariable = $scope.lessVariable;
        if (!lessVariable.updated) {
            lessVariable.updated = [];
        }
        lessVariable.updated.push(new Date().getTime());

        lessVariable.$update(function() {
            $location.path('lessVariables/' + lessVariable._id);
        });
    };

    $scope.find = function() {
        LessVariables.query(function(lessVariables) {
            $scope.lessVariables = lessVariables;
        });
    };

    $scope.findOne = function() {
        LessVariables.get({
            lessVariableId: $stateParams.lessVariableId
        }, function(lessVariable) {
            $scope.lessVariable = lessVariable;
        });
    };
}]);