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
    if ($scope.types) {
      var selectedTypes = Object.keys($scope.types).filter(key => $scope.types[key]);
      if (selectedTypes.length > 0) {
        params += '&type=' + selectedTypes.join(',');
      }
    }
    if ($scope.attack === 0 || $scope.attack) {
      params += '&attack=';
      if ($scope.attackComparator && $scope.attackComparator !== '=') {
        params += $scope.attackComparator;
      }
      params += $scope.attack;
    }
    if ($scope.health === 0 || $scope.health) {
      params += '&health=';
      if ($scope.healthComparator && $scope.healthComparator !== '=') {
        params += $scope.healthComparator;
      }
      params += $scope.health;
    }
    if ($scope.durability === 0 || $scope.durability) {
      params += '&durability=';
      if ($scope.durabilityComparator && $scope.durabilityComparator !== '=') {
        params += $scope.durabilityComparator;
      }
      params += $scope.durability;
    }
    if ($scope.cost === 0 || $scope.cost) {
      params += '&cost=';
      if ($scope.costComparator && $scope.costComparator !== '=') {
        params += $scope.costComparator;
      }
      params += $scope.cost;
    }
    if ($scope.sets) {
      var selectedSets = Object.keys($scope.sets).filter(key => $scope.sets[key]);
      if (selectedSets.length > 0) {
        params += '&cardSet=' + selectedSets.join(',');
      }
    }

    if ($scope.classes) {
      var selectedClasses = Object.keys($scope.classes).filter(key => $scope.classes[key]);
      if (selectedClasses.length > 0) {
        params += '&playerClass=' + selectedClasses.join(',');
      }
    }

    console.log(params);
    if (params) {
      $http({
        method: 'GET',
        url: '/api/hs?' + params
      }).then(function(response) {
        $scope.data = response.data;
      });
    } else {
      delete $scope.data;
    }
  };

  $scope.reset = function() {
    delete $scope.partial;
    delete $scope.name;
    delete $scope.types;
    delete $scope.cost;
    delete $scope.costComparator;
    delete $scope.attack;
    delete $scope.attackComparator;
    delete $scope.health;
    delete $scope.healthComparator;
    delete $scope.durability;
    delete $scope.durabilityComparator;
    delete $scope.classes;
    delete $scope.sets;
    $scope.update();
  };

  $scope.standardSets = function(show) {
    $scope.sets = $scope.sets || {};
    $scope.sets['Basic'] = 
    $scope.sets['Classic'] =
    $scope.sets['Blackrock Mountain'] =
    $scope.sets['The Grand Tournament'] =
    $scope.sets['The League of Explorers'] =
    $scope.sets['Whispers of the Old Gods'] =
    $scope.sets['Karazhan'] = show;
    $scope.update();
  };

});