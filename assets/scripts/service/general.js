(function() {
app.directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits,10);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});

app.factory('Excel',function($window){
        var uri='data:application/vnd.ms-excel;base64,',
            template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
            format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
        return {
            tableToExcel:function(tableId,worksheetName){
                var table=$(tableId),
                    ctx={worksheet:worksheetName,table:table.html()},
                    href=uri+base64(format(template,ctx));
                return href;
            }
        };
    })


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
              $('#error-'+key).html('');
                if(value == '' && fielt.indexOf(value) >-1){
                    result.result = false;
                    result.key.push(key) ;
                    $('#error-'+key).html('Vui lòng nhập ' + key);
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