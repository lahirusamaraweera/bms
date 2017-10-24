"use strict";

myapp.controller('dms', function ($uibModal,$scope, $state, $stateParams, $http, $rootScope, restful) {

    var self = this;
    self.toto = 1;
    self.inc = 1;
    var v = 0;

    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

       

        $scope.admin = $rootScope.admin;
        $scope.emailm = $rootScope.loggedemail;
        $scope.userm = $rootScope.user;

        var a = 0;
        // pie chart datas
        $scope.labels = ["Outs. Payments", "Outs. Income"];
        $scope.colors = ["#ff4444", "#11aa44"];
        $scope.colorss = ["#ffaa44", "#11aa44"];
        $scope.data = [2, 2];


        // sale and profit chart data
        $scope.labels1 = [];
        $scope.series1 = ['Sale', 'Profit'];
        $scope.data1 = [
            [],
            []
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverride1 = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        $scope.options1 = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };



        // getting data
        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }

        // getting users
        $http.post(restful.apiurl + restful.list.getitems, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.datas = response;
                }
                else {
                    $scope.datas = [];
                }

            }).error(function (err) {
                $scope.datas = []
            });

        //gettin dashdatas
        $scope.getdd = function () {

            // getting outstanding collections
            $http.post(restful.apiurl + restful.list.outspayemt, datas)
                .success(function (response) {

                    if (response != 0) {

                        $scope.totalouts = (response[0].total) ? response[0].total : 0;
                        $scope.data[0] = parseFloat((response[0].total) ? response[0].total : 0);


                    }
                    else {
                        $scope.totalouts = [];
                    }

                }).error(function (err) {
                    $scope.totalouts = []
                });

            // getting outstanding payments
            $http.post(restful.apiurl + restful.list.outsincom, datas)
                .success(function (response) {

                    if (response != 0) {

                        $scope.totalincom = (response[0].total) ? response[0].total : 0;
                        $scope.data[1] = parseFloat((response[0].total) ? response[0].total : 0);



                    }
                    else {
                        $scope.totalouts = [];
                    }

                }).error(function (err) {
                    $scope.totalincom = []
                });

            // getting profit
            $http.post(restful.apiurl + restful.list.profit, datas)
                .success(function (response) {

                    if (response != 0) {
                        $scope.profit = response[0];
                    }
                    else {
                        $scope.profit = [];
                    }

                }).error(function (err) {
                    $scope.profit = []
                });

            // profit and sale data
            $http.post(restful.apiurl + restful.list.dayprofit, datas)
                .success(function (response) {

                    if (response != 0) {


                        for (var v = 0; v < response.length; v++) {

                            $scope.labels1[v] = response[v].date;
                            $scope.data1[0][v] = parseFloat(response[v].sale);
                            $scope.data1[1][v] = parseFloat(response[v].profit);
                        }


                    }
                    else {

                    }

                }).error(function (err) {

                });

            // getting top items
            $http.post(restful.apiurl + restful.list.topitemsale, datas)
                .success(function (response) {

                    if (response != 0) {

                        $scope.topitems = response;

                    }
                    else {

                    }

                }).error(function (err) {

                });

            // getting to 
            $http.post(restful.apiurl + restful.list.col, datas)
                .success(function (response) {

                    if (response != 0) {

                        $scope.col = response;

                    }
                    else {

                    }

                }).error(function (err) {

                });




        }



        $scope.getdd();


        $scope.cartt = function () {

            var icom = parseFloat($scope.totalincom.total);
            var outs = parseFloat($scope.totalouts.total);

            $scope.data = [icom, outs];

        }


        $scope.nso = function () {

            if ($scope.qcl_id) {


                var podata = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    cl_id: $scope.qcl_id,

                }

                $scope.prog = true;
                $scope.savesuccess = false;
                $scope.savefail = false;

                $http.post(restful.apiurl + restful.list.cso, podata)
                    .success(function (response) {

                        if (response > 0) {
                            console.log(response);
                            $state.go('dms_so.edit', { so_id: response });
                        }




                    }).error(function (err) {

                    });



            }


        }


        // getting user datas
        $scope.getdat = function () {

            $http.post(restful.apiurl + restful.list.userdetails, datas)
                .success(function (response) {

                    if (response != 0) {
                        $scope.name = response[0].name;
                        $scope.id = response[0].id;
                        $scope.address1 = response[0].address1;
                        $scope.address2 = response[0].address2;
                        $scope.city = response[0].city;
                        $scope.postalcode = response[0].postalcode;
                        $scope.tp = response[0].tp;
                        $scope.mail = response[0].mail;
                        $scope.note = response[0].note;
                        $scope.moto = response[0].moto;
                        $scope.noteq = response[0].noteq;
                        $scope.qcl_id = response[0].qcl_id;
                        
                        $scope.userd = response[0];

                    }
                    else {

                    }

                }).error(function (err) {

                });



        }

        $scope.getdat();

        // update user details
        $scope.save = function () {

            $scope.prog = true;
            $scope.savesuccess = false;
            $scope.savefail = false;

            var datasss = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                id: $scope.id,
                name: $scope.name,
                address1: $scope.address1,
                address2: $scope.address2,
                city: $scope.city,
                tp: $scope.tp,
                postalcode: $scope.postalcode,
                moto: $scope.moto,
                mail: $scope.mail,
                note: $scope.note,
                noteq: $scope.noteq
            }


            $http.post(restful.apiurl + restful.list.uuserdata, datasss)
                .success(function (response) {

                    if (response != 0) {
                        $scope.getdat();
                        $scope.prog = false;
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

            $scope.getdat();

        }

        console.log(a);

        /// Profitable chart




    }
    else {
        $state.go('home');
    }
});