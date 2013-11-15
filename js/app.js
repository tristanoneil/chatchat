app = angular.module("app", ["ngRoute"]).config(function($routeProvider) {
  $routeProvider.
    when("/", {controller: HomeController, templateUrl: "views/home.html"}).
    when("/rooms/:slug", {controller: RoomController, templateUrl: "views/room.html"});
});

function HomeController($scope, $location) {
  $scope.enterRoom = function() {
    $location.path("/rooms/" + $scope.nameToSlug($scope.room.name));
  }

  $scope.nameToSlug = function(text) {
    return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
  }
}

function RoomController($scope, $routeParams) {
  $scope.init = function() {
    var webrtc = new SimpleWebRTC({
        localVideoEl: 'local',
        remoteVideosEl: 'remote',
        autoRequestMedia: true
    });

    webrtc.on('readyToCall', function () {
        webrtc.joinRoom($routeParams.slug);
    });
  }
}
