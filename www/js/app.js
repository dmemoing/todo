// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic'])

.factory('Tasks', function() {
  return {
    all: function() {
      var taskString = window.localStorage['tasks'];
      if(taskString) {
        return angular.fromJson(taskString);
      }
      return [];
    },
    save: function(tasks) {
      window.localStorage['tasks'] = angular.toJson(tasks);
    }
  }
})

.controller('TodoCtrl', function($scope, $ionicModal, Tasks) {
  $scope.tasks = Tasks.all();

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    Tasks.save($scope.tasks);
    $scope.taskModal.hide();
    task.title = "";
  };

  $scope.deleteTask = function(task){
    var index = $scope.tasks.indexOf(task);
    $scope.tasks.splice(index, 1);
    Tasks.save($scope.tasks);
  };

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

})
