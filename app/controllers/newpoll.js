'use strict';

(function () {
angular.module('newpoll', ['ngResource'])
       // .factory('Users',['$resource',function($resource){
       //        return $resource('/api/:id/polls', null,
       //        'query':  {method:'GET', isArray:true}
       //         // {'save': {method:'POST', isArray: true}
       //        });
       //      }])
.controller('newpollcontroller', ['$scope','$http','$resource',function ($scope,$http,$resource) {



$scope.submit = function(){

  var array = $scope.options.split('\n')
  var newArray = []
  for( var i=0; i<array.length; i++){
    newArray.push({"name":array[i],"selected":0});
  }
  console.log(newArray);
  var newpoll = {
	"title": $scope.title,
	"options":newArray
  }
  $http.post('/api/jinyiabc/polls',newpoll).then(function(response){
  console.log(response.data.polls.length);
  $scope.index = response.data.polls.length - 1;
  window.location.href = '/'+ $scope.index;


  });



  };


}]);

})();
