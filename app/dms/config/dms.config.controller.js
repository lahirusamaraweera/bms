"use strict";

// config controller
myapp.controller('config', function ($scope, $state, $stateParams, $http, $rootScope, restful) {



    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms && $rootScope.dms) {



    }
    else {
        $state.go('home');
    }
});

//profile controller
myapp.controller('profile', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        // getting data
        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
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
                        $scope.regno = response[0].regno;
                        $scope.bank = response[0].bank;
                        $scope.branch = response[0].branch;
                        $scope.accno = response[0].accno;

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
                noteq: $scope.noteq,
                regno: $scope.regno,
                bank: $scope.bank,
                branch: $scope.branch,
                accno: $scope.accno
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

        // get outstandng income
        $scope.outsprnt = function () {

            $http.post(restful.apiurl + restful.list.outstament, datas)
                .success(function (response) {

                    if (response != 0) {

                        $scope.vs = response;

                        var dd = [];
                        dd.push(['#', 'Region', 'Client', 'so_id', 'Order Date', 'Outstanding']);

                        var tota = 0.00;
                        for (var i = 0; i < $scope.vs.length; i++) {
                            dd.push(
                                [
                                    {
                                        text: (i + 1),
                                        fontSize: 9
                                    },
                                    {
                                        text: $scope.vs[i].region,
                                        fontSize: 9
                                    },
                                    {
                                        text: $scope.vs[i].clname,
                                        fontSize: 9
                                    },
                                    {
                                        text: $scope.vs[i].so_id,
                                        fontSize: 9
                                    },
                                    {
                                        text: $scope.vs[i].timestamp,
                                        fontSize: 9
                                    },

                                    {
                                        text: commasep($scope.vs[i].outs), 
                                        alignment: 'right',
                                        fontSize: 9
                                    }
                                ]);

                            tota = tota + parseFloat($scope.vs[i].outs);
                        }

                        dd.push([{ text: 'Total Outstanding', style: 'tableHeader', fontSize: 11, bold: true, colSpan: 5, alignment: 'center' }, '', '', '', '', { text: commasep(tota), alignment: 'right' }]);





                        var docDefinition = {
                            content: [
                                {
                                    alignment: 'left',
                                    columns: [
                                        {
                                            image: $scope.userd.logo,
                                            width: 120
                                        },
                                        {
                                            text: '',
                                            width: 10
                                        },
                                        [
                                            '\n',
                                            {
                                                text: $scope.userd.name,
                                                style: 'header',
                                                bold: true,
                                                alignment: "left",
                                                fontSize: 18
                                            },
                                            {
                                                text: 'Registered Number : ' + $scope.userd.regno,
                                                style: 'header',
                                                bold: true,
                                                alignment: "left",
                                                fontSize: 10
                                            },
                                            {
                                                text: $scope.userd.moto,
                                                style: 'header',
                                                bold: true,
                                                alignment: "left",
                                                fontSize: 10
                                            },
                                            {
                                                text: $scope.userd.address1 + ', ' + $scope.userd.address2 + ', ' + $scope.userd.city + '. ',
                                                style: 'header',
                                                bold: true,
                                                alignment: "left",
                                                fontSize: 10
                                            },
                                            {
                                                text: ' Phone : ' + $scope.userd.tp + ' | email : ' + $scope.userd.mail,
                                                style: 'header',
                                                bold: true,
                                                alignment: "left",
                                                fontSize: 10
                                            },

                                        ]
                                    ]
                                },

                                '\n',
                                {
                                    text: 'Outstanding Statement',
                                    style: 'header',
                                    bold: true,
                                    alignment: "center",
                                    fontSize: 13
                                },


                                '\n\n',
                                {
                                    style: 'tableExample',
                                    table: {
                                        widths: [20, '*', '*', 30, 80, '*'],
                                        body: dd,


                                    }
                                },
                                '\n\n'

                            ]

                        }

                        pdfMake.createPdf(docDefinition).download("Outanding_income.pdf");




                    }
                    else {

                    }

                });





        }

        // print sales order documnet
        $scope.prof = function () {




            var dd = [];
            dd.push(['Bank', 'Branch', 'Account #']);
            dd.push(
                [
                    {
                        text: $scope.userd.bank,
                        fontSize: 9
                    },
                    {
                        text: $scope.userd.branch,
                        fontSize: 9
                    },
                    {
                        text: $scope.userd.accno,
                        fontSize: 9
                    },


                ]
            );





            var docDefinition = {
                pageSize: 'A5',
                content: [
                    {
                        alignment: 'left',
                        columns: [
                            {
                                image: $scope.userd.logo,
                                width: 120
                            },
                            {
                                text: '',
                                width: 10
                            },
                            [
                                '\n',
                                {
                                    text: $scope.userd.name,
                                    style: 'header',
                                    bold: true,
                                    alignment: "left",
                                    fontSize: 13
                                },
                                {
                                    text: 'Registered Number : ' + $scope.userd.regno,


                                    alignment: "left",
                                    fontSize: 9
                                },
                                {
                                    text: $scope.userd.moto,


                                    alignment: "left",
                                    fontSize: 9
                                },
                                {
                                    text: $scope.userd.address1 + ', ' + $scope.userd.address2 + ', ' + $scope.userd.city + '. ',


                                    alignment: "left",
                                    fontSize: 9
                                },
                                {
                                    text: ' Phone : ' + $scope.userd.tp + ' | email : ' + $scope.userd.mail,


                                    alignment: "left",
                                    fontSize: 9
                                },

                            ]
                        ]
                    },



                    '\n\n',
                    {
                        text: 'Account Details',
                        style: 'header',
                        bold: true,
                        alignment: "left",
                        fontSize: 10
                    },
                    '\n',
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*', '*', '*'],
                            body: dd
                        }
                    },
                    '\n',
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*'],
                            body: [

                                [{
                                    text: 'Notes and conditions',
                                    fontSize: 9
                                }
                                ],
                                [{
                                    text: $scope.userd.note,
                                    fontSize: 9
                                }
                                ]

                            ],

                        }
                    },

                ]

            }

            pdfMake.createPdf(docDefinition).download("MyInfo.pdf");


        }

        function commasep(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }


    }
    else {
        $state.go('home');
    }
});

// config controller
myapp.controller('dms_config_useracc', function ($scope, $state, $stateParams, $http, $rootScope, restful) {



    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms && $rootScope.admin) {


        //getting user Accounts
        $scope.getusers = function () {

            var datas = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey
            }

            $http.post(restful.apiurl + restful.list.getsubusers, datas)
                .success(function (response) {

                    if (response != 0) {
                        $scope.users = response;
                    }
                    else {

                    }

                }).error(function (err) {

                });
        }
        $scope.getusers();

        $scope.save = function () {
            console.log('s');
            if ($scope.uname && $scope.pass && $scope.pass2 && ($scope.pass == $scope.pass2)) {

                $scope.prog = true;
                $scope.savefail = false;
                $scope.savesuccess = false;

                var datas = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    uname: $scope.uname,
                    pass: $scope.pass
                }

                $http.post(restful.apiurl + restful.list.cuseracc, datas)
                    .success(function (response) {

                        if (response.status == 1) {
                            $scope.prog = false;
                            $scope.savefail = false;
                            $scope.savesuccess = true;
                            $scope.getusers();
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

                $scope.getusers();
            }


        }

    }
    else {
        $state.go('home');
    }
});
