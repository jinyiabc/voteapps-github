'use strict';

(function () {
angular.module('polllist', ['chart.js'])
.controller('polllistcontroller', ['$scope','$http','$timeout',function ($scope,$http,$timeout) {

  var index = +window.location.pathname.slice(1); // Returns path only
  console.log(index);

  // var url      = window.location.href;
  // console.log(url);

  $scope.getPoll = function(){

    $http.get('/api/jinyiabc/polls/poll',{params:{index: index}}).then(function(response){
      $scope.poll = response.data[0].polls[index];
      $scope.options = $scope.poll.options;
      $scope.title = $scope.poll.title;
        });
      $scope.myValue = false;

      var array = $scope.options   // [{name:"", selected:1},...]
      $scope.data = [];
      $scope.labels = [];
      if($scope.options){
      for( var i=0; i<array.length; i++){
        $scope.data.push(array[i].selected);
        $scope.labels.push(array[i].name);
      }
console.log($scope.data);
console.log($scope.labels);
      // Angular-chart sandbox
      // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      // $scope.data = [300, 500, 100];
    }
  };


$scope.getPoll();

// Add chart
function createChart () {
  $scope.getPoll();
}
$timeout(createChart, 2000);



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

   $scope.number = 0

  $scope.addNew = function(option) {
      // console.log(option);  alex,chen bin and Bob ...
      $scope.myValue = true;
      console.log($scope.myValue);
  };




$scope.submit = function(){
  if($scope.alternative){
    $scope.options.push( {"name":$scope.alternative,"selected":1});
    console.log($scope.options);
} else {
  $scope.options[$scope.electOne].selected += 1 ;
  console.log($scope.options);
}

var newpoll = {
"options": $scope.options,
"title":$scope.title };



  $http.put('/api/jinyiabc/polls',newpoll).then(function(response){
  console.log('PUT');
  $scope.getPoll();

  });


  };

// Angular-chart sandbox
// $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
// $scope.data = [300, 500, 100];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };





}]);

})();
