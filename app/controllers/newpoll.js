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
  var newpoll = {
	"title": $scope.title,
	"options":$scope.options.split('\n')
  }
  $http.post('/api/jinyiabc/polls',newpoll).then(function(response){
  console.log('POST');
  });



  };


}]);

})();
