angular.module('hsgatherer.main', [])
.controller('MainController', function($scope, $http) {
  $scope.advanced = false;
  $scope.update = function() {
    var params = '';
    if ($scope.name) {
      params += '&name=' + $scope.name;
    }
    if ($scope.type) {
      params += '&type=' + $scope.type;
    }
    if ($scope.partial) {
      params += '&partial=' + $scope.partial;
    }
    console.log(params);

    $http({
      method: 'GET',
      url: '/api/hs?' + params
    }).then(function(data) {
      $scope.data = data.data;
    });
  };
});