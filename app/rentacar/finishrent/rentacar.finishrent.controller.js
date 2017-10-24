myapp.controller('finishrent', function($scope, $state, $stateParams, $http, $rootScope, restful){

    var te = '';

    if($rootScope.login != 1){
        $state.go('login');
    }
    else if($rootScope.rentacar){


        var datas = {
            email : $rootScope.loggedemail,
            r_id	: $stateParams.rid,
            apikey : $rootScope.apikey
        }


        $http.post(restful.apiurl+restful.list.finishrent,datas)
            .success(function(response){

            if(response!=0){
                $scope.rent = response[0];
                var te = response[0].pkg;
                console.log(te);
                if(te=='rpd'){
                    $scope.cond = 'days';
                }
                if(te=='rpm'){
                    $scope.cond = 'months';
                }
                if(te=='rpy'){
                    $scope.cond = 'years';
                }



            } 
            else{
                $scope.rent = [];

            }

        }).error(function(err){
            $scope.rent = [];
        });


        // pakage wise calculation
        $scope.calc = function(){
            var rent = $scope.rent
            $scope.prog1 = true;


            if($scope.nod && $scope.em){

                // day basis calculation
                if($scope.rent.pkg=='rpd'){
                    if(($scope.em - rent.im)/$scope.nod > 100){

                        $scope.rt =  $scope.nod*rent.rpd;
                        $scope.ec = (($scope.em - rent.im)-(100*$scope.nod))*rent.er;
                        $scope.st = $scope.rt+$scope.ec;
                        $scope.amt = $scope.st;
                    }
                    else{
                        $scope.rt = $scope.nod*rent.rpd;
                        $scope.ec = 0;
                        $scope.st = $scope.rt+$scope.ec;
                        $scope.amt = $scope.st;

                    }

                    $scope.trip = $scope.em - rent.im;
                    $scope.extramilage = (($scope.em - rent.im)-(100*$scope.nod)>0 ? ($scope.em - rent.im)-(100*$scope.nod) : 0);

                }
                // montly basis calculation
                if($scope.rent.pkg=='rpm'){
                    if(($scope.em - rent.im)/$scope.nod>3000){

                        $scope.rt =  $scope.nod*rent.rpm;
                        $scope.ec = (($scope.em - rent.im)-(3000*$scope.nod))*rent.er;
                        $scope.st = $scope.rt+$scope.ec;
                        $scope.amt = $scope.st;
                    }
                    else{
                        $scope.rt = $scope.nod*rent.rpm;
                        $scope.ec = 0;
                        $scope.st = $scope.rt+$scope.ec;
                        $scope.amt = $scope.st;

                    }
                    
                    $scope.trip = $scope.em - rent.im;
                    $scope.extramilage = (($scope.em - rent.im)-(3000*$scope.nod)>0 ? ($scope.em - rent.im)-(3000*$scope.nod) : 0);

                }

                // year basis calculation
                if($scope.rent.pkg=='rpy'){
                    if(($scope.em - rent.im)/$scope.nod> 36000){

                        $scope.rt =  $scope.nod*rent.rpy;
                        $scope.ec = (($scope.em - rent.im)-(36000*$scope.nod))*rent.er;
                        $scope.st = $scope.rt+$scope.ec;
                        $scope.amt = $scope.st;
                    }
                    else{
                        $scope.rt = $scope.nod*rent.rpy;
                        $scope.ec = 0;
                        $scope.st = $scope.rt+$scope.ec;
                        $scope.amt = $scope.st;

                    }
                    
                    $scope.trip = $scope.em - rent.im;
                    $scope.extramilage = (($scope.em - rent.im)-(36000*$scope.nod)>0 ? ($scope.em - rent.im)-(36000*$scope.nod) : 0);

                }





                $scope.bill = true; 
                $scope.prog1 = false;





            }




        }

        //SAVING DETAILS
        $scope.saveand = function(){

            if($scope.em && $scope.nod && $scope.amt){
                $scope.prog = true;
                $scope.savesuccess = false;
                $scope.savefail = false;
                var datas = {
                    email : $rootScope.loggedemail,
                    r_id : $stateParams.rid,
                    apikey : $rootScope.apikey,
                    em : $scope.em,
                    nod : $scope.nod,
                    amt : $scope.amt,
                    c_id : $scope.rent.c_id

                }
                console.log(datas);

                $http.post(restful.apiurl+restful.list.savefinish,datas)
                    .success(function(response){

                    if(response == 1){

                        $scope.prog = false;
                        $scope.savesuccess = true;
                    }

                }).error(function(err){
                    $scope.savefail = true;
                    $scope.prog1 = false;
                    $scope.prog = false;
                    $scope.savesuccess = false;
                });



            }



        }









    }
    else{ 
        $state.go('home');
    }
});