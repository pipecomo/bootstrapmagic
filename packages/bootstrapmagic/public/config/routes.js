'use strict';

angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('bootstrapmagic example page', {
        url: '/editor',
        templateUrl: 'bootstrapmagic/views/editor.html'
      })
  }
])