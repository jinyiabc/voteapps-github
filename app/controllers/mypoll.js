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



  // $scope.friends = [
  //   {name:'John', age:25, gender:'boy'},
  //   {name:'Jessie', age:30, gender:'girl'},
  //   {name:'Johanna', age:28, gender:'girl'},
  //   {name:'Joy', age:15, gender:'girl'},
  //   {name:'Mary', age:28, gender:'girl'},
  //   {name:'Peter', age:95, gender:'boy'},
  //   {name:'Sebastian', age:50, gender:'boy'},
  //   {name:'Erika', age:27, gender:'girl'},
  //   {name:'Patrick', age:40, gender:'boy'},
  //   {name:'Samantha', age:60, gender:'girl'}
  // ];


$scope.submit = function(){
  // $http.get('/api/jinyiabc/polls').then(function(response){
  // console.log('GET');
  // });

  var newpoll = {
	"title": $scope.title,
	"options":$scope.options.split('\n')
  }

  // var deletepoll =
  //                     {
  //                   	"title":"thor or captain?",
  //                   	"options":["thor","captain","iron man"]
  //                   };
  $http.post('/api/jinyiabc/polls',newpoll).then(function(response){
  console.log('POST');
  });
  //
  // $http.put('/api/jinyiabc/polls',newpoll).then(function(response){
  // console.log('POST');
  // });

  // $http.delete('/api/jinyiabc/polls',deletepoll).then(function(response){
  // console.log('delete');
  // });


  };


}]);

})();
