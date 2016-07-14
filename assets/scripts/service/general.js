(function() {

  angular
      .module('htxApp')
      .factory('$General', General)
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
      },
      formatDate : function(date, format){
            var split = date.split('-');
            if(format == 'yyyy-MM-dd'){
              return split[2]+'-'+split[1]+'-'+split[0];
            }
            
        },
        checkRequire : function(arr, fielt){
            var result = {
                result: true,
                key:[]
            };
            $.each(arr, function(key, value){
                if(value == '' && fielt.indexOf(value) >-1){
                    result.result = false;
                    result.key.push(key) ;
                }

            });
            return result;
        },
        validateEmail : function(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        },
        validatePass : function(pass, pass_confirm){
            return (pass == pass_confirm);
        }
    }

  }

})();