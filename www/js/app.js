(function () {
var app = angular.module('myreddit', ['ionic', 'angularMoment'])

app.controller('RedditCtrl', function($http, $scope) {

  $scope.stories = [];

  $scope.loadOlderStories = function() {
      var params = {};
      if($scope.stories.length > 0) {
        params['after'] = $scope.stories[$scope.stories.length - 1].name;
      }
      $http.get('https://www.reddit.com/r/Android/new/.json', {params: params})
        .success(function(response) {
          angular.forEach(response.data.children, function(child) {
            $scope.stories.push(child.data)
          });
           $scope.$broadcast('scroll.infiniteScrollComplete');
        });

    };

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);


      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());
