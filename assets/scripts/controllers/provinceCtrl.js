

app.controller('provinceCtrl', function(Excel, $timeout, $http, $scope,$General) {
	$scope.init = function(){
	var req = {
            method: 'GET',
            url: 'tinh'
        };
        $http(req)
        .then(function(response) {
            $scope.provinces = response.data;
            // console.log(response.data)
         }, function(error) {
            console.log(error);
        });
    }
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            $scope.exportHref= Excel.tableToExcel(tableId,'sheet name');
            $timeout(function(){location.href=$scope.exportHref;},100); // trigger download
        }
    $scope.delete_province = function(x){
		
    	var req = {
            method: 'DELETE',
            url: 'tinh/'+x
        };
		 $http(req)
        .then(function(response) {
        	
            $scope.init()
        }, function(error) {
            console.log(error);
        });
	    
	}
	$scope.add_province = function(){
		var province={
			name : $('#new-name').val(),
			decription : $('#new-decription').val()
		}
		var listRequireprovince ='name decription';
		var checkRequire = $General.checkRequire(province, listRequireprovince);
	    if(checkRequire.result == true){
	    	var req = {
	            method: 'POST',
	            url: 'tinh/create',
	            data: province
	        };
			 $http(req)
	        .then(function(response) {
	        	$('#new-name').val('');
				$('#new-decription').val('');
	        	$('#new-tr-input').hide();
	            $scope.init()
	        }, function(error) {
	            console.log(error);
	        });
	    }
	}
    $scope.show_add_province = function(){
    	$('#new-tr-input').show();
    }
    $scope.update_province = function(x){
    	var province ={
    		id: $('#id-'+x).attr('value'),
    		name: $('#name-'+x).text(),
    		decription: $('#decription-'+x).text()
    	}
    	var req = {
            method: 'POST',
            url: 'tinh/'+x,
            data: province
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