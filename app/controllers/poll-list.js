'use strict';

(function () {
angular.module('polllist', ['chart.js'])
.controller('polllistcontroller', ['$scope','$http','$timeout',function ($scope,$http,$timeout) {

  console.log(Chart.defaults.global);
  $scope.legend = {
     legend: {
       display: true,
       position: 'right'
             }
   };



  var index = +window.location.pathname.slice(1); // Returns path only   == response.params.index @14
  $scope.getPoll = function(){
       $scope.myValue = false;
       $scope.isAuthenticated = true;

            $http.get('/isAuth').then(function(response){
              console.log(response.data);
              $scope.isAuthenticated = response.data.withCredentials;
              // console.log($scope.isAuthenticated);
            });


            $http.get('/api/jinyiabc/polls/poll',{params:{index: index}}).then(function(response){
              // console.log(response);
              $scope.poll = response.data[0].polls[index];
              // console.log($scope.poll );
              // Should route after remove current poll
              $scope.options = $scope.poll.options;
              // console.log($scope.options);
              $scope.title = $scope.poll.title;

              var array = $scope.options   // [{name:"", selected:1},...]
              $scope.data = [];
              $scope.labels = [];
              $scope.series = [];
              if($scope.options) {
              for( var i=0; i<array.length; i++){
                $scope.data.push(array[i].selected);
                $scope.labels.push(array[i].name);
              }
              // $scope.legend = {
              //    legend: {
              //      display: true,
              //      position: 'right'
              //            }
              //  };
               $scope.newOptions = [{ name:"Select your option...",selected: null}].concat($scope.options).concat([{ name:"I'd like a custom option.",selected: null}]);
              // console.log($scope.newOptions);
              }

           });

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



  $scope.electOne = function() {
     if ($scope.newOptions[$scope.choice].name == "I'd like a custom option."){
       $scope.myValue = true;
       console.log($scope.myValue);
       console.log($scope.alt);
     } else {
       $scope.myValue = false;
     }
     console.log($scope.choice);
     console.log($scope.newOptions[$scope.choice]);
  };




$scope.submit = function(){
if($scope.choice == $scope.newOptions.length -1){
    $scope.export = $scope.options.concat([{ name:$scope.alt,selected: 1}]);
}
if ($scope.choice < $scope.newOptions.length-1 && $scope.choice >0 )
{
  $scope.newOptions[$scope.choice].selected += 1 ;
  $scope.export =   $scope.newOptions.slice(1,-1);
}

var newpoll = {
"options": $scope.export,
"title":$scope.title };



  $http.put('/api/jinyiabc/polls',newpoll).then(function(response){
if (response.data === 'match'){
  alert('You have already voted for this poll. You are allowed only once.')
}
  $scope.getPoll();

  });


  };

// Angular-chart sandbox
// $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
// $scope.data = [300, 500, 100];
  //
  // $scope.onClick = function (points, evt) {
  //   console.log(points, evt);
  // };





}]);

})();
