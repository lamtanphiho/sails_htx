/**
 * Created by lamtanphiho on 3/30/2016.
 */
app.controller('memberCtrl', function( $auth, $state, $http, $rootScope, $scope, ngDialog) {
    $scope.init = function() {
        $scope.child = '';
        $http({
            url: 'users',
            method: "GET"
        }).success(function (data) {
            $scope.memberList = data;
            // console.log(data)
        }).error(function (response) {// ?�y nek
            console.log(response.error);
            if (response.error == 'token_not_provided')
                $state.go('login');
        });
    }
    $scope.reset = function () {
        $scope.error = {
            old_password : '',
            password    : '',
            password_confirmation : '',
        }
    }
    $scope.showEditInfo = function(mem)
    {
        $http({
            url:  'api/public/index.php/assign/getListBank',
            method: "POST"
        }).error(function(response){// ?�y nek
            console.log(response.error);
            if( response.error == 'token_not_provided')
                $state.go('login');
        }).then(function(data) {
            var html = '' ;

            // console.log(mem);
            $.each(data.data.listBank, function( index, value )
            {
                var select = "";
                if(value.id == mem.bank_id)
                    select = "selected";
                html +='<option value="'+value.id+'" '+select+'>'+value.bank_name+'</option>';
            });
            $('#editInfo .modal-body #bankName').html(html);
            $('#editInfo .modal-body #bankAccount').val(mem.bank_account_name);
            $('#editInfo .modal-body #bankNo').val(mem.bank_account_number);
            $('#editInfo .modal-body #user_id').val(mem.user_id);
            $('#editInfo').modal('show');
        })

    }
    $scope.saveEditInfo = function () {
        $scope.reset();
        var info={
            user_id:$('#editInfo .modal-body #user_id').val(),
            password: $('#editInfo .modal-body #pass').val(),
            passConfirm: $('#editInfo .modal-body #passConfirm').val(),
            bankName: $('#editInfo .modal-body #bankName').val(),
            bankAccount: $('#editInfo .modal-body #bankAccount').val(),
            bankNo: $('#editInfo .modal-body #bankNo').val(),

        };//console.log(info);
        $http({
            url:  'api/public/index.php/assign/saveEditInfo',
            method: "POST",
            data: info
        }).error(function(response){
            //console.log(response);
        }).then(function(data) {
            $('#editInfo').modal('hide');
            $scope.init();
            $scope.message = data.data.result;
            ngDialog.open({

                // Config dialog
                template: 'app/views/dialog/popupSuccess.html',
                className: 'ngdialog-theme-flat ngdialog-theme-custom',
                scope: $scope
            });
        }, function(error) {
            // console.log(error);
            angular.forEach(error.data.data, function(value, key) {
                // console.log(key);
                $scope.error[key] = value[0];

            });
        });
    }
        $scope.getlistPermission = function(mem)
        {
            $http({
                url:  'api/public/index.php/assign/list',
                method: "POST",
                data: mem
            }).error(function(response){// ?�y nek
                console.log(response.error);
                if( response.error == 'token_not_provided')
                    $state.go('login');
            }).then(function(data) {
                var html = '' ;
                // console.log(data.data.listperofuser);
                $.each(data.data.listPer, function( index, value )
                {
                    var html1 =  '<input name=check-per type="checkbox" class="group-permission" value="'+value.name+'">' + value.description ;
                    $.each(data.data.listperofuser, function( index1, value1 ){

                        if(value.name == value1.name)
                            html1 =  '<input checked="checked" name=check-per type="checkbox" class="group-permission" value="'+value.name+'">' + value.description ;

                    });
                    //console.log(index)
                    html += '<div class="form-group"> ' +
                        '<div class="checkbox"> ' +
                        '<label> ' + html1+
                        '</label> ' +
                        '</div> ' +

                        '</div>' ;
                });


                $('#assignPermission .modal-body').html(html);
                $scope.child = mem.username;
                $('#assignPermission').modal('show');
            })

        }
        $scope.searchMember = function () {
            var member_id = $('#search-member-id').val();
            if(member_id == '')
            {
                $scope.msg = 'please input a username !'
                ngDialog.open({

                    // Config dialog
                    template: 'app/views/dialog/popupWarning.html',
                    className: 'ngdialog-theme-flat ngdialog-theme-custom',
                    scope: $scope
                });
            }
            else{
                var data1 = {
                    member_id: $('#search-member-id').val()
                }

                $http({
                    url: 'api/public/index.php/member/searchMember',
                    method: "POST",
                    data: data1,
                }).success(function (data) {
                    //console.log(data);
                    $scope.memberList = data;
                })
            }

        }
        $scope.showDetailmember = function (data) {
            // console.log(data);
            $http({
                url: 'api/public/index.php/callApi/balance-all-game',
                method: "POST",
                data: data
            }).success(function (data) {
                if(data.wft.errcode == 1)
                    data.wft.result = data.wft.result+' ('+data.wft.errtext +')'
                $scope.memberBalance = data;
                // console.log(data);
            }).error(function (response) {
                console.log(response);
            }).then(function(){
                var html1 = '';
            if(data.name != 'Member')
                html1 = '<tr>' +
                            '<th>Date create</th>' +
                            '<td>' + data.created_at + '</td>' +
                            '<th>Permission info</th>' +
                            '<td colspan="3"></td>' +
                        '</tr>' ;
            else
                html1 = '<tr>' +
                            '<th rowspan="3">Date create</th>' +
                            '<td rowspan="3">' + data.created_at + '</td>' +
                            '<th style="vertical-align:middle;" rowspan="3">Game Balance</th>' +
                            '<th>Wft</th>' +
                            '<td  colspan="2">' + $scope.memberBalance.wft.result + '</td>' +
                        '</tr>'+
                        '<tr>'+
                            '<th>Playtech</th>' +
                            '<td colspan="2">' + $scope.memberBalance.pt.CheckBalance.BALANCE / 1000 + '</td>' +
                        '</tr>'+
                        '<tr>'+
                            '<th>All bet</th>' +
                            '<td colspan="2">' + $scope.memberBalance.allbet.balance + '</td>' +
                        '</tr>'+
                        '<tr></tr>';
            var html = '<table id="modal-tran"  width="100%" class="table table-striped table-bordered table-hover">' +
                '<tr>' +
                '<th>Username</th>' +
                '<td>' + data.username + '</td>' +
                '<th>Email</th>' +
                '<td>' + data.email + '</td>' +
                '<th>Phone</th>' +
                '<td>' + data.phone + '</td>' +
                '</tr>' +

                '<tr>' +
                '<th>Parent ID</th>' +
                '<td>' + data.parent_id + '</td>' +
                '<th>Role</th>' +
                '<td>' + data.name + '</td>' +

                '<th>Description</th>' +
                '<td>' + data.description + '</td>' +
                '</tr>' +
                '<th>Bank name</th>' +
                '<td>' + data.bank_name + '</td>' +
                '<th>Bank account name</th>' +
                '<td>' + data.bank_account_name + '</td>' +

                '<th>Bank account no</th>' +
                '<td>' + data.bank_account_number + '</td>' +

                '</tr>' +


                '<tr>' +
                '<th>Currency</th>' +
                '<td>' + data.currency + '</td>' +
                '<th>Main balance</th>' +
                '<td>' + data.main_balance + '</td>' +
                '<th>Turnover</th>' +
                '<td>' + data.turnover + '</td>' +
                '</tr>' +html1;
                
            $('#myModal .modal-body').html(html);
            $('#myModal').modal('show');
        });
            
        }
        $scope.showAssignPermissions = function (mem) {
            //console.log(mem);
            $scope.getlistPermission(mem);

        }
        $scope.assignPermission = function(){
           //console.log($scope.child);
            var perr = '';
            $("[name='check-per']:checked").each(function (_key, _val) {

                if (perr == '')
                    perr = $(this).val();
                else
                    perr += '-' + $(this).val();
            });
            //console.log(perr);
            $http({
                url:  'api/public/index.php/assign/permission',
                method: "POST",
                data    :{username: $scope.child, per: perr}
            }).success(function (data) {
                //console.log(data);
                $scope.message = 'Assign permission success !';
                ngDialog.open({

                    // Config dialog
                    template: 'app/views/dialog/popupSuccess.html',
                    className: 'ngdialog-theme-flat ngdialog-theme-custom',
                    scope: $scope
                });
            }).error(function(response) {
                console.log(response.error);
            });
        }

    $scope.init();
})