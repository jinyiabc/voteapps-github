'use strict';

angular.
  module('polllist',['chart.js']).
  config(['ChartJsProvider',function config(ChartJsProvider) {
      ChartJsProvider.setOptions({ responsive: false });
// Does not work while chart-options & $scope.setOptions={responsive: false } works
// by checking through   console.log(Chart.defaults.global);
// By the way, this method is provided in jtblin/angular-chart.js ,Line 71-75;

    }]);
