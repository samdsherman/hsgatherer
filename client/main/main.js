angular.module('hsgatherer.main', [])
.controller('MainController', function($scope, $http) {
  $scope.update = function() {
    $http({
      method: 'GET',
      url: '/api/hs?name=' + $scope.search
    }).then(function(data) {
      $scope.data = data.data;
    });
  };
});