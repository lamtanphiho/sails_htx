

app.controller('countryCtrl', function(Excel, $timeout, $http, $scope,$General) {
	$scope.init = function(){
	var req = {
            method: 'GET',
            url: 'country'
        };
        $http(req)
        .then(function(response) {
            $scope.countries = response.data;
            // console.log(response.data)
         }, function(error) {
            console.log(error);
        });
    }
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            $scope.exportHref= Excel.tableToExcel(tableId,'sheet name');
            $timeout(function(){location.href=$scope.exportHref;},100); // trigger download
        }
    $scope.delete_country = function(x){
		
    	var req = {
            method: 'DELETE',
            url: 'country/'+x
        };
		 $http(req)
        .then(function(response) {
        	
            $scope.init()
        }, function(error) {
            console.log(error);
        });
	    
	}
	$scope.add_country = function(){
		var country={
			vietname_name : $('#new-vietname_name').val(),
			english_name : $('#new-english_name').val()
		}
		var listRequireCountry ='vietname_name english_name';
		var checkRequire = $General.checkRequire(country, listRequireCountry);
	    if(checkRequire.result == true){
	    	var req = {
	            method: 'POST',
	            url: 'country/create',
	            data: country
	        };
			 $http(req)
	        .then(function(response) {
	        	$('#new-vietname_name').val('');
				$('#new-english_name').val('');
	        	$('#new-tr-input').hide();
	            $scope.init()
	        }, function(error) {
	            console.log(error);
	        });
	    }
	}
    $scope.show_add_country = function(){
    	$('#new-tr-input').show();
    }
    $scope.update_country = function(x){
    	var country ={
    		id: $('#id-'+x).attr('value'),
    		vietname_name: $('#vietname_name-'+x).text(),
    		english_name: $('#english_name-'+x).text()
    	}
    	var req = {
            method: 'POST',
            url: 'country/'+x,
            data: country
        };
		 $http(req)
        .then(function(response) {
            
            // console.log(response.data)
         }, function(error) {
            console.log(error);
        });
    }
    $scope.init();
});