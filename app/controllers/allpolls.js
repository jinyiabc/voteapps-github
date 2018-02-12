'use strict';

(function () {
angular.module('allPolls', ['ngResource'])

.controller('allPollscontroller', ['$scope','$http','$resource',function ($scope,$http,$resource) {

  // Add index to each polls.
  $scope.selected = {value: 0};


  $scope.getPoll = function(){
    $http.get('/api/polls').then(function(response){
      var length = response.data.length;
      $scope.polls = []
      for( var i =0 ; i< length; i++){
        var length1 = response.data[i].polls.length
        for( var j=0 ; j<length1; j++){
          $scope.polls.push(response.data[i].polls[j]);
        }
      }
      console.log($scope.polls)
        });
  };

  $scope.getPoll();


}]);

})();
