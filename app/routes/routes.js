var appRoutes = angular.module('app.routes', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('');

    $stateProvider
      .state('', {
        url: '/',
        templateUrl: 'app/views/app.html'
      })
      .state('hello', {
        url: '/hello',
        templateUrl: 'app/views/app.html'
      });
}]);