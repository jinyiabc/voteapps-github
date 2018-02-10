'use strict';

(function () {
angular.module('polllist', ['ngResource'])
.controller('polllistcontroller', ['$scope','$http','$resource',function ($scope,$http,$resource) {

  var index = +window.location.pathname.slice(1); // Returns path only
  console.log(index);

  // var url      = window.location.href;
  // console.log(url);

  $scope.getPoll = function(){

    $http.get('/api/jinyiabc/polls/poll',{params:{index: index}}).then(function(response){
      $scope.poll = response.data[0].polls[index];
      $scope.options = $scope.poll.options;
        });
      $scope.myValue = false;
  };

  $scope.getPoll();

  $scope.removePoll = function(){
    var deletepoll =
                        {
                      	"title":$scope.poll.title,
                      	"options":$scope.poll.options
                      };
    console.log(deletepoll);
    alert('are you sure you want to remove this poll?');
    $http.delete('/api/jinyiabc/polls',{params:deletepoll}).then(function(response){
    console.log('delete');
    $scope.getPoll();
    });
  };



  $scope.addNew = function() {

            $scope.myValue = true;
     // $scope.myValue = false;
  };




$scope.submit = function(){
  console.log($scope.myValue);
  if($scope.myValue){
  var newpoll = {
  "options": $scope.pool.options.push($scope.alternative),
  "title":$scope.poll.title }
};


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
