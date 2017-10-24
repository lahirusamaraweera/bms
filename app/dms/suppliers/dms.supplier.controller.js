myapp.controller('dms_supplier', function($scope, $state, $stateParams, $http, $rootScope, restful){


    if($rootScope.login != 1){
        $state.go('login');
    }
    else if($rootScope.dms){
        /*
        var datas = {
            email : $rootScope.loggedemail,
            apikey : $rootScope.apikey
        }


        // getting suppliers
        $http.post(restful.apiurl+restful.list.getsup,datas)
            .success(function(response){

            if(response!=0){
                $scope.sup = response;
            } 
            else{
                $scope.sup = [];
            }

        }).error(function(err){
            $scope.sup = []
        });
*/


    }
    else{ 
        $state.go('home');
    }
});

// for all suppliers
myapp.controller('dms_supplier_all', function($scope, $state, $stateParams, $http, $rootScope, restful){


    if($rootScope.login != 1){
        $state.go('login');
    }
    else if($rootScope.dms){

        var datas = {
            email : $rootScope.loggedemail,
            apikey : $rootScope.apikey
        }


        // getting suppliers
        $http.post(restful.apiurl+restful.list.getsup,datas)
            .success(function(response){

            if(response!=0){
                $scope.sup = response;
            } 
            else{
                $scope.sup = [];
            }

        }).error(function(err){
            $scope.sup = []
        });



    }
    else{ 
        $state.go('home');
    }
});

// For create supplier
myapp.controller('dms_supnew', function($scope, $state, $stateParams, $http, $rootScope, restful){


    if($rootScope.login != 1){
        $state.go('login');
    }
    else if($rootScope.dms){


        //saving 
        $scope.save = function(){

            if($scope.name && $scope.address && $scope.tp && $scope.tp && $scope.mail && $scope.contact1 && $scope.contact1tp && $scope.contact2 && $scope.contact2tp && $scope.bank && $scope.accno){

                $scope.prog = true;
                $scope.savesuccess = false;
                $scope.savefail = false;

                var datas = {
                    email : $rootScope.loggedemail,
                    apikey : $rootScope.apikey,
                    name : $scope.name,
                    address : $scope.address,
                    tp : $scope.tp,
                    mail : $scope.mail,
                    contact1 : $scope.contact1,
                    contact1tp : $scope.contact1tp,
                    contact2 : $scope.contact2,
                    contact2tp : $scope.contact2tp,
                    bank: $scope.bank,
                    accno : $scope.accno

                }
                console.log(datas);
                $http.post(restful.apiurl+restful.list.csup,datas)
                    .success(function(response){

                    if(response==1){
                        $scope.prog = false;
                        $scope.savesuccess = true;
                        $scope.savefail = false;


                        $scope.name = undefined;
                        $scope.address = undefined;
                        $scope.tp = undefined;
                        $scope.mail = undefined;
                        $scope.contact1 = undefined;
                        $scope.contact1tp = undefined;
                        $scope.contact2 = undefined;
                        $scope.contact2tp = undefined;
                        $scope.bank = undefined;
                        $scope.accno = undefined;
                    } 
                    else{
                        $scope.prog = false;
                        $scope.savesuccess = false;
                        $scope.savefail = true;
                    }

                }).error(function(err){
                    $scope.prog = false;
                    $scope.savesuccess = false;
                    $scope.savefail = true;
                });

            }
            else{
                console.log("Please fill");
            }

        }







    }
    else{ 
        $state.go('home');
    }
});

// For save updates
myapp.controller('dms_supedit', function($scope, $state, $stateParams, $http, $rootScope, restful){


    if($rootScope.login != 1){
        $state.go('login');
    }
    else if($rootScope.dms){

        $scope.sup_id = $stateParams.sup_id;

        var dd = {
            email : $rootScope.loggedemail,
            apikey : $rootScope.apikey,
            sup_id : $stateParams.sup_id,

        }

        $http.post(restful.apiurl+restful.list.getsup1,dd)
            .success(function(response){

            $scope.name = response[0].name;
            $scope.address = response[0].address;
            $scope.tp = response[0].tp;
            $scope.mail = response[0].mail;
            $scope.contact1 = response[0].contact1;
            $scope.contact1tp = response[0].contact1tp;
            $scope.contact2 = response[0].contact2;
            $scope.contact2tp = response[0].contact2tp;
            $scope.bank = response[0].bank;
            $scope.accno = response[0].accno;


        }).error(function(err){

        });


        //saving 
        $scope.save = function(){

            if($scope.name && $scope.address && $scope.tp && $scope.tp && $scope.mail && $scope.contact1 && $scope.contact1tp && $scope.contact2 && $scope.contact2tp && $scope.bank && $scope.accno){

                $scope.prog = true;
                $scope.savesuccess = false;
                $scope.savefail = false;

                var datas = {
                    email : $rootScope.loggedemail,
                    apikey : $rootScope.apikey,
                    name : $scope.name,
                    address : $scope.address,
                    tp : $scope.tp,
                    mail : $scope.mail,
                    contact1 : $scope.contact1,
                    contact1tp : $scope.contact1tp,
                    contact2 : $scope.contact2,
                    contact2tp : $scope.contact2tp,
                    bank: $scope.bank,
                    accno : $scope.accno,
                    sup_id : $stateParams.sup_id

                }
                console.log(datas);
                $http.post(restful.apiurl+restful.list.usup,datas)
                    .success(function(response){

                    if(response==1){
                        $scope.prog = false;
                        $scope.savesuccess = true;
                        $scope.savefail = false;


                    } 
                    else{
                        $scope.prog = false;
                        $scope.savesuccess = false;
                        $scope.savefail = true;
                    }

                }).error(function(err){
                    $scope.prog = false;
                    $scope.savesuccess = false;
                    $scope.savefail = true;
                });

            }
            else{
                console.log("Please fill");
            }

        }







    }
    else{ 
        $state.go('home');
    }
});