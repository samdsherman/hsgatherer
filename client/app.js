angular.module('hsgatherer', ['hsgatherer.main', 'ngRoute'])
.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'main/main.html',
    controller: 'MainController'
  });
})
.run(function($location) {
  $location.url('/');
});
