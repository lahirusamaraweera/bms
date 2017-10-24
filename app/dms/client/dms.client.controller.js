myapp.controller('dms_client', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {
        $scope.admin = $rootScope.admin;
        /*
        var datas = {
            email : $rootScope.loggedemail,
            apikey : $rootScope.apikey
        }


        // getting suppliers
        $http.post(restful.apiurl+restful.list.getpo,datas)
            .success(function(response){

            if(response!=0){
                $scope.po = response;
            } 
            else{
                $scope.po = [];
            }

        }).error(function(err){
            $scope.po = []
        });	


    */







    }
    else {
        $state.go('home');
    }
});

// clients
myapp.controller('dms_client_all', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {
        $scope.admin = $rootScope.admin;
        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }


        // getting pending sales orders
        $http.post(restful.apiurl + restful.list.getcli, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.client = response;
                }
                else {
                    $scope.client = [];
                }

            }).error(function (err) {
                $scope.client = []
            });

        $scope.labelsc = [];
        $scope.seriesc = ['Sale', 'Profit'];

        $scope.datac = [
            [],
            []
        ];
        $scope.colors = ["#ffaa44", "#11aa44"];
        // profit and sale data
        $http.post(restful.apiurl + restful.list.clprofit, datas)
            .success(function (response) {

                if (response != 0) {


                    for (v = response.length - 1; v > -1; v--) {

                        $scope.labelsc[v] = response[v].name;
                        $scope.datac[0][v] = parseFloat(response[v].sale);
                        $scope.datac[1][v] = parseFloat(response[v].profit);
                    }


                }
                else {

                }

            }).error(function (err) {

            });







    }
    else {
        $state.go('home');
    }
});

// clients new
myapp.controller('dms_client_new', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }


        // loading regions
        $http.post(restful.apiurl + restful.list.getregion, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.regions = response;
                }
                else {
                    $scope.regions = [];
                }

            }).error(function (err) {
                $scope.regions = []
            });


        // Save client
        $scope.save = function () {

            if ($scope.name && $scope.address && $scope.tp && $scope.region) {

                $scope.prog = true;
                $scope.savefail = false;
                $scope.savesuccess = false;


                var datas = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    name: $scope.name,
                    address: $scope.address,
                    region: $scope.region,
                    tp: $scope.tp,
                    mail: ($scope.mail) ? $scope.mail : 'NA',
                    contact1: ($scope.contact1) ? $scope.contact1 : 'NA',
                    contact1tp: ($scope.contact1tp) ? $scope.contact1tp : 'NA',
                    contact2: ($scope.contact2) ? $scope.contact2 : 'NA',
                    contact2tp: ($scope.contact2tp) ? $scope.contact2tp : 'NA'
                }

                $http.post(restful.apiurl + restful.list.ccli, datas)
                    .success(function (response) {

                        if (response > 0) {
                            $scope.prog = false;
                            $scope.savefail = false;
                            $scope.savesuccess = true;

                            $state.go('dms_client.edit', { cl_id: response });
                        }
                        else {
                            $scope.prog = false;
                            $scope.savefail = true;
                            $scope.savesuccess = false;
                        }

                    }).error(function (err) {
                        $scope.prog = false;
                        $scope.savefail = true;
                        $scope.savesuccess = false;
                    });





            }

        }









    }
    else {
        $state.go('home');
    }
});

// clients edit
myapp.controller('dms_client_edit', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey

        }


        // loading regions
        $http.post(restful.apiurl + restful.list.getregion, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.regions = response;
                }
                else {
                    $scope.regions = [];
                }

            }).error(function (err) {
                $scope.regions = []
            });




        // to selected region
        $scope.getreg = function () {
            if ($scope.regions) {
                for (var x = 0; x < $scope.regions.length; x++) {
                    if ($scope.region == $scope.regions[x].rid) {
                        return $scope.regions[x].name;
                    }
                }
            }

        }

        // getting client details
        $scope.getcli = function () {

            var datass = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                cl_id: $stateParams.cl_id
            }
            $http.post(restful.apiurl + restful.list.getcl1, datass)
                .success(function (response) {

                    $scope.name = response[0].name;
                    $scope.address = response[0].address;
                    $scope.tp = response[0].tp;
                    $scope.region = response[0].region;
                    $scope.mail = response[0].mail;
                    $scope.contact1 = response[0].contact1;
                    $scope.contact1tp = response[0].contact1tp;
                    $scope.contact2 = response[0].contact2;
                    $scope.contact2tp = response[0].contact2tp;

                }).error(function (err) {

                });
        }


        // Save client
        $scope.save = function () {

            if ($scope.name && $scope.address && $scope.tp && $scope.region) {

                $scope.prog = true;
                $scope.savefail = false;
                $scope.savesuccess = false;


                var datas = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    name: $scope.name,
                    address: $scope.address,
                    region: $scope.region,
                    tp: $scope.tp,
                    mail: ($scope.mail) ? $scope.mail : 'NA',
                    contact1: ($scope.contact1) ? $scope.contact1 : 'NA',
                    contact1tp: ($scope.contact1tp) ? $scope.contact1tp : 'NA',
                    contact2: ($scope.contact2) ? $scope.contact2 : 'NA',
                    contact2tp: ($scope.contact2tp) ? $scope.contact2tp : 'NA',
                    cl_id: $stateParams.cl_id
                }

                $http.post(restful.apiurl + restful.list.ucl, datas)
                    .success(function (response) {

                        if (response.status = 1) {
                            $scope.prog = false;
                            $scope.savefail = false;
                            $scope.savesuccess = true;

                            $scope.getcli();
                        }
                        else {
                            $scope.prog = false;
                            $scope.savefail = true;
                            $scope.savesuccess = false;
                        }

                    }).error(function (err) {
                        $scope.prog = false;
                        $scope.savefail = true;
                        $scope.savesuccess = false;
                    });


                $scope.getcli();

            }

        }

        $scope.getcli();

        //create new sales order
        $scope.nso = function () {

            if ($stateParams.cl_id) {


                var podata = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    cl_id: $stateParams.cl_id,

                }

                $scope.prog = true;
                $scope.savesuccess = false;
                $scope.savefail = false;

                $http.post(restful.apiurl + restful.list.cso, podata)
                    .success(function (response) {

                        if (response > 0) {
                            console.log(response);
                            $scope.prog = false;
                            $scope.savesuccess = true;
                            $scope.savefail = false;
                            $scope.cl_id = undefined;
                            $state.go('dms_so.edit', { so_id: response });

                        }
                        else {
                            $scope.prog = false;
                            $scope.savesuccess = false;
                            $scope.savefail = true;
                        }




                    }).error(function (err) {

                    });



            }


        }



    }
    else {
        $state.go('home');
    }
});

// clients new
myapp.controller('dms_client_region', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {


        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }

        $scope.getreg = function () {



            // loading regions
            $http.post(restful.apiurl + restful.list.getregion, datas)
                .success(function (response) {

                    if (response != 0) {
                        $scope.regions = response;
                    }
                    else {
                        $scope.regions = [];
                    }

                }).error(function (err) {
                    $scope.regions = []
                });

        }

        $scope.getreg();

        // Save region
        $scope.save = function () {

            if ($scope.name && $scope.remarks) {

                $scope.prog = true;
                $scope.savesuccess = false;
                $scope.savefail = false;

                var datas = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    name: $scope.name,
                    remarks: $scope.remarks,

                }

                $http.post(restful.apiurl + restful.list.cregion, datas)
                    .success(function (response) {

                        if (response.status = 1) {
                            $scope.prog = false;
                            $scope.getreg();
                            $scope.name = undefined;
                            $scope.remarks = undefined;
                            $scope.savesuccess = true;
                            $scope.savefail = false;
                        }
                        else {
                            $scope.prog = false;
                            $scope.savesuccess = false;
                            $scope.savefail = true;

                        }

                    }).error(function (err) {
                        $scope.prog = false;
                        $scope.savesuccess = false;
                        $scope.savefail = true;

                    });

                $scope.prog = false;

            }

        }


        $scope.labelsc = [];
        $scope.seriesc = ['Sale', 'Profit'];

        $scope.datac = [
            [],
            []
        ];
        $scope.colors = ["#ffaa44", "#11aa44"];

        // profit and sale data
        $http.post(restful.apiurl + restful.list.regprofit, datas)
            .success(function (response) {

                if (response != 0) {


                    for (v = response.length - 1; v > -1; v--) {

                        $scope.labelsc[v] = response[v].name;
                        $scope.datac[0][v] = parseFloat(response[v].sale);
                        $scope.datac[1][v] = parseFloat(response[v].profit);
                    }


                }
                else {

                }

            }).error(function (err) {

            });



    }
    else {
        $state.go('home');
    }
});
