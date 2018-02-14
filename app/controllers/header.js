'use strict';

(function () {
angular.module('polllist', [])
.controller('headercontroller', ['$scope','$http',function ($scope,$http) {



  $scope.hide = function(){
    $scope.getPoll1();
    return $scope.isAuthenticated1;
  };
  $scope.show = function(){
    $scope.getPoll1();
    console.log('Show function',!$scope.isAuthenticated1);
    return !$scope.isAuthenticated1;
  };

  $scope.getPoll1 = function(){
        $scope.isAuthenticated1 = true;
        $http.get('/isAuth').then(function(response){
          console.log(response.data);
          $scope.isAuthenticated1 = response.data.withCredentials;
          console.log($scope.isAuthenticated1);
        });

};



$scope.getPoll1();



}]);

})();
