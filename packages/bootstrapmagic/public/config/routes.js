'use strict';

angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
      
       var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0')
                    $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };
      
      
    $stateProvider
      .state('bootstrapmagic editor page', {
        url: '/editor/:versionId',
        templateUrl: 'bootstrapmagic/views/editor.html'
      })
//      .state('bootstrapmagic editor page', {
//        url: '/editor',
//        templateUrl: 'bootstrapmagic/views/editor.html'
//      })
      
      .state('all versions', {
                url: '/versions',
                templateUrl: 'bootstrapmagic/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create version', {
                url: '/versions/create',
                templateUrl: 'bootstrapmagic/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit versions', {
                url: '/versions/:versionId/edit',
                templateUrl: 'bootstrapmagic/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('version by id', {
                url: '/versions/:versionId',
                templateUrl: 'bootstrapmagic/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
  }
])