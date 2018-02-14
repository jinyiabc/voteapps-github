'use strict';

(function () {
angular.module('mypoll', ['ngResource'])
       // .factory('Users',['$resource',function($resource){
       //        return $resource('/api/:id/polls', null,
       //        'query':  {method:'GET', isArray:true}
       //         // {'save': {method:'POST', isArray: true}
       //        });
       //      }])
.controller('mypollcontroller', ['$scope','$http','$resource',function ($scope,$http,$resource) {

  // Add index to each polls.
  $scope.selected = {value: 0};


  $scope.getPoll = function(){
    $http.get('/api/jinyiabc/polls').then(function(response){
      $scope.polls = response.data[0].polls;
      console.log($scope.polls)
        });
  };

  $scope.getPoll();

  $scope.removePoll = function(poll){
    console.log(poll.title);   //"thor or captain?",
    console.log(poll.options); //["thor","captain","iron man"]
    var deletepoll =
                        {
                      	"title":"thor or captain?",
                      	"options":["thor","captain","iron man"]
                      };
    $http.put('/api/jinyiabc/polls',deletepoll).then(function(response){
    console.log('delete');
    $scope.getPoll();
    });
  };





}]);

})();
