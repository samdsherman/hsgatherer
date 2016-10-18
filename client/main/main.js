angular.module('hsgatherer.main', [])
.controller('MainController', function($scope, $http) {
  $scope.advanced = false;

  $scope.update = function() {
    var params = '';
    if ($scope.partial) {
      params += '&partial=' + $scope.partial;
    }
    if ($scope.name) {
      params += '&name=' + $scope.name;
    }
    if ($scope.type) {
      params += '&type=' + $scope.type;
    }
    if ($scope.cost !== undefined) {
      params += '&cost=';
      if ($scope.costComparator && $scope.costComparator !== '=') {
        params += $scope.costComparator;
      }
      params += $scope.cost;
    }
    if ($scope.set) {
      params += '&cardSet=' + $scope.set;
    }
    console.log(params);

    $http({
      method: 'GET',
      url: '/api/hs?' + params
    }).then(function(data) {
      $scope.data = data.data;
    });
  };

  $scope.reset = function() {
    delete $scope.partial;
    delete $scope.name;
    delete $scope.type;
    delete $scope.cost;
    delete $scope.set;
    $scope.update();
  };

});