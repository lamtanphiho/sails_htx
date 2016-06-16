(function() {

  angular
      .module('betApp')
      .factory('$General', General);


  function General(ngDialog) {
    return {
      showMsgNotPermission : function(){

          $scope.loginErrorText = 'You are not authorized to access this resource !';
          ngDialog.open({

            // Config dialog
            template: 'app/views/dialog/popupTmpl.html',
            className: 'ngdialog-theme-flat ngdialog-theme-custom',
            scope: $scope
          });
      }
    }

  }

})();