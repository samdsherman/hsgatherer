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
    if ($scope.attack !== undefined) {
      params += '&attack=';
      if ($scope.attackComparator && $scope.attackComparator !== '=') {
        params += $scope.attackComparator;
      }
      params += $scope.attack;
    }
    if ($scope.health !== undefined) {
      params += '&health=';
      if ($scope.healthComparator && $scope.healthComparator !== '=') {
        params += $scope.healthComparator;
      }
      params += $scope.health;
    }
    if ($scope.durability !== undefined) {
      params += '&durability=';
      if ($scope.durabilityComparator && $scope.durabilityComparator !== '=') {
        params += $scope.durabilityComparator;
      }
      params += $scope.durability;
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
    delete $scope.set;
    delete $scope.cost;
    delete $scope.costComparator;
    delete $scope.attack;
    delete $scope.attackComparator;
    delete $scope.health;
    delete $scope.healthComparator;
    delete $scope.durability;
    delete $scope.durabilityComparator;
    $scope.update();
  };

});