myapp.controller('dms_so', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {
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

// pending sales orders
myapp.controller('dms_so_pending', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }


        // getting pending sales orders
        $http.post(restful.apiurl + restful.list.getpso, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.so = response;
                }
                else {
                    $scope.so = [];
                }

            }).error(function (err) {
                $scope.so = []
            });










    }
    else {
        $state.go('home');
    }
});

// for completed sales orders
myapp.controller('dms_so_completed', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {


        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }


        // getting years and months for query
        $http.post(restful.apiurl + restful.list.getmonthyear, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.years = response.year;
                    $scope.months = response.month;
                    console.log($scope.year);
                }
                else {

                }

            }).error(function (err) {

            });


        // getting results using a period
        $scope.getpsos = function () {
            if ($scope.month && $scope.year) {

                $scope.prog = true;

                var datas = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    month: $scope.month,
                    year: $scope.year
                }


                // getting sos
                $http.post(restful.apiurl + restful.list.getcso, datas)
                    .success(function (response) {

                        if (response != 0) {
                            $scope.so = response;
                        }
                        else {
                            $scope.prog = false;
                        }

                    }).error(function (err) {

                        $scope.prog = false;
                    });


                $scope.prog = false;

            }
        }






    }
    else {
        $state.go('home');
    }
});

// for paymnt pending sales orders
myapp.controller('dms_so_payment', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }


        // getting suppliers
        $http.post(restful.apiurl + restful.list.getpayso, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.so = response;
                }
                else {
                    $scope.so = [];
                }

            }).error(function (err) {
                $scope.so = []
            });










    }
    else {
        $state.go('home');
    }
});

// for new sales order
myapp.controller('dms_so_new', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }


        // getting suppliers
        $http.post(restful.apiurl + restful.list.getcli, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.clients = response;
                }
                else {
                    $scope.clients = [];
                }

            }).error(function (err) {
                $scope.clients = []
            });

        // saving purchase orders
        $scope.save = function () {



            if ($scope.cl_id) {


                var podata = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    cl_id: $scope.cl_id,

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

// for editing purchase orders
myapp.controller('dms_so_edit', function ($uibModal, $scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        $scope.discount = 0;
        $scope.cterm = '';
        //load items for list
        var datai = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey

        }

        $http.post(restful.apiurl + restful.list.getitempo, datai)
            .success(function (response) {

                if (response != 0) {
                    $scope.items = response;
                }
                else {
                    $scope.items = [];
                }

            }).error(function (err) {
                $scope.items = []
            });


        // getting user details for invoice
        $http.post(restful.apiurl + restful.list.userdetails, datai)
            .success(function (response) {

                if (response != 0) {
                    $scope.userd = response[0];
                }
                else {

                }

            }).error(function (err) {

            });


        // loading cost and price
        $scope.pocost = function () {

            var datass = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                i_id: $scope.i_id,

            }

            $http.post(restful.apiurl + restful.list.getitem1, datass)
                .success(function (response) {

                    if (response != 0) {
                        console.log(1);
                        $scope.cost = parseFloat(response[0].cost);
                        $scope.price = parseFloat(response[0].price);
                        $scope.qty = 1;
                    }
                    else {

                    }

                }).error(function (err) {

                });





        }

        // loading and adding items through bacode mode
        $scope.lidname = function () {
            if ($scope.barcode) {

                var datass = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    barcode: $scope.barcode,
                }

                $http.post(restful.apiurl + restful.list.getbybar, datass)
                    .success(function (response) {

                        if (response != 0) {
                            $scope.barcodefail = false;
                            $scope.i_id = parseFloat(response[0].i_id);
                            $scope.price = parseFloat(response[0].price);
                            $scope.cost = parseFloat(response[0].cost);
                            $scope.qty = 1;
                            //$scope.name = response[0].name + ' | ' + response[0].brand + ' | ' + response[0].packsize + ' | ' + response[0].i_id;
                            $scope.itemsave();

                        }
                        else {
                            $scope.barcodefail = true;
                            $scope.barcode = undefined;
                        }

                    }).error(function (err) {

                    });


            }
            else {

            }





        }


        $scope.getitems = function () {

            var soitemt = [];

            var datas = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                so_id: $stateParams.so_id
            }

            $http.post(restful.apiurl + restful.list.getso1, datas)
                .success(function (response) {

                    if (response != 0) {
                        $scope.so = response[0];
                        $scope.discount = parseFloat(response[0].discount);
                        $scope.paidamount = parseFloat(response[0].total) - parseFloat(response[0].pamount);
                    }
                    else {
                        $scope.so = [];
                    }

                }).error(function (err) {
                    $scope.so = []
                });


            // getting items
            var datass = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                so_id: $stateParams.so_id
            }


            $http.post(restful.apiurl + restful.list.getsoitem1, datass)
                .success(function (response) {

                    if (response != 0) {
                        $scope.soitems = response;
                        soitemt = response;




                    }
                    else {
                        $scope.soitems = [];
                    }

                }).error(function (err) {
                    $scope.soitems = []
                });

            console.log(soitemt);








        }

        $scope.getitems();


        // total calc
        $scope.ptotal = function () {
            if ($scope.soitems) {
                var tt = 0.00;
                for (x = 0; x < $scope.soitems.length; x++) {
                    tt = tt + parseFloat($scope.soitems[x].price);
                }
                return tt;
            }

        }


        // saving items
        $scope.itemsave = function () {


            if ($scope.i_id && $scope.price && $scope.cost && $scope.qty) {


                var podata = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    cl_id: $scope.so.cl_id,
                    so_id: $stateParams.so_id,
                    i_id: $scope.i_id,
                    qty: (-1) * $scope.qty,
                    price: $scope.price * $scope.qty,
                    cost: $scope.cost * $scope.qty

                }


                $scope.prog = true;


                $http.post(restful.apiurl + restful.list.csoitem, podata)
                    .success(function (response) {

                        if (response > 0) {
                            console.log(response);
                            $scope.prog = false;
                            $scope.qty = undefined;
                            $scope.price = undefined;
                            $scope.i_id = undefined;
                            $scope.cost = undefined;
                            $scope.barcode = undefined;
                            $scope.name = undefined;


                            $scope.getitems();

                        }
                        else {
                            $scope.prog = false;

                        }




                    }).error(function (err) {

                    });

                $scope.prog = false;

            }


        }

        // Completing sales order
        $scope.complete = function () {

            // completing
            $scope.prog = true;
            $scope.savesuccess = false;
            $scope.savefail = false;

            var datasw = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                so_id: $stateParams.so_id,
                discount: $scope.discount
            }

            $http.post(restful.apiurl + restful.list.comso, datasw)
                .success(function (response) {

                    if (response != 0) {
                        $scope.prog = false;
                        $scope.savesuccess = true;
                        $scope.savefail = false;

                        $scope.getitems();
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

            $scope.com = false;
            $scope.prog = false;

        }

        // print sales order documnet
        $scope.invoice = function () {

            $scope.prog = true;


            var dd = [];
            dd.push(['#', 'Item', 'Qty', 'Unit price', 'Total Amount']);

            var tota = 0.00;
            for (var i = 0; i < $scope.soitems.length; i++) {
                dd.push(
                    [
                        {
                            text: (i + 1),
                            fontSize: 9
                        },
                        {
                            text: $scope.soitems[i].name,
                            fontSize: 9
                        },
                        {
                            text: ($scope.soitems[i].qty) * (-1),
                            fontSize: 9
                        },
                        {
                            text: commasep((-1) * ($scope.soitems[i].price / $scope.soitems[i].qty)),
                            fontSize: 9,
                            alignment: 'right'
                        },
                        {
                            text: commasep($scope.soitems[i].price),
                            alignment: 'right',
                            fontSize: 9
                        }
                    ]);

                tota = tota + parseFloat($scope.soitems[i].price);
            }

            dd.push([{ text: 'Sub Total', style: 'tableHeader', colSpan: 4, alignment: 'right', fontSize: 9 }, '', '', '', { text: commasep(tota), alignment: 'right', fontSize: 9 }]);
            dd.push([{ text: 'Discount', style: 'tableHeader', colSpan: 4, alignment: 'right', fontSize: 9 }, '', '', '', { text: commasep($scope.discount), alignment: 'right', fontSize: 9 }]);
            dd.push([{ text: 'Grand Total', style: 'tableHeader', colSpan: 4, alignment: 'right', fontSize: 9 }, '', '', '', { text: commasep(tota - $scope.discount), alignment: 'right', fontSize: 9 }]);
            dd.push([{ text: 'Paid Amount', style: 'tableHeader', colSpan: 4, alignment: 'right', fontSize: 9 }, '', '', '', { text: commasep($scope.so.pamount), alignment: 'right', fontSize: 9 }]);
            dd.push([{ text: 'Balance Amount', style: 'tableHeader', colSpan: 4, alignment: 'right', fontSize: 9 }, '', '', '', { text: commasep((tota - $scope.discount) - $scope.so.pamount), alignment: 'right', fontSize: 9 }]);




            var docDefinition = {
                pageSize: 'A4',
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



                    
                    {
                        text: $scope.so.timestamp + ' ',
                        style: 'header',
                        bold: true,
                        alignment: "right",
                        fontSize: 10
                    },
                    '\n',
                    {
                        text: 'Invoice',
                        style: 'header',
                        bold: true,
                        alignment: "center",
                        fontSize: 13
                    },
                    {
                        text: 'Sales Order ID : ' + $scope.so.so_id,
                        bold: false,
                        alignment: "left",
                        fontSize: 9
                    },

                    '\n',
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: 'Client Details: \n',
                                fontSize: 10
                            },
                            
                        ]
                    },
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: $scope.so.name+',\n'+$scope.so.address,
                                fontSize: 10,
                                bold: true
                            },
                            {
                                text: ''
                            }
                        ]
                    },
                    
                    '\n\n',
                    {
                        text: 'Items Description',
                        style: 'header',
                        bold: true,
                        alignment: "center",
                        fontSize: 9
                    },
                    '\n',
                    {
                        style: 'tableExample',
                        table: {
                            widths: [27, '*', 50, 90, 100],
                            body: dd

                        }
                    },
                    '\n\n',
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
                                    text: $scope.userd.note + '\n' + $scope.cterm,
                                    fontSize: 9
                                }
                                ]

                            ],

                        }
                    },
                    '\n\n\n',
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: 'Issued by\n\n\n......................',
                                fontSize: 9
                            },
                            {
                                text: 'Checked by\n\n\n......................',
                                fontSize: 9
                            },

                        ]
                    },

                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: '\n\n Goods were receved in good condition and correct order\n\n\n' + '...............................\n Customer signature',
                                fontSize: 9
                            }

                        ]
                    }
                ]

            }
            console.log(docDefinition);
            pdfMake.createPdf(docDefinition).download("Invoice so_id_" + $scope.so.so_id + ".pdf");
            $scope.prog = false;

        }

        // print sales order documnet
        $scope.recept = function (pamtt, ptypee) {

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;




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
                        text: 'receipt',
                        style: 'header',
                        bold: true,
                        alignment: "center",
                        fontSize: 10
                    },
                    '\n\n\n',
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: 'Date : ' + today,
                                fontSize: 9,
                                bold: false
                            }
                        ]
                    },
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: 'Ref : ' + $scope.so.name,
                                fontSize: 9,
                                bold: true
                            },
                            {
                                text: 'so_id : ' + $scope.so.so_id,
                                fontSize: 9,
                                bold: true
                            }
                        ]
                    },
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: 'Amount : ' + commasep(pamtt) + ' LKR',
                                fontSize: 9,
                                bold: true
                            },
                            {
                                text: 'Paymode : ' + ptypee,
                                fontSize: 9,
                                bold: true
                            },

                        ]
                    },
                    '\n\n\n',
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: 'Issued by\n\n......................',
                                fontSize: 9
                            },



                        ]
                    }

                ]

            }
            console.log(docDefinition);
            pdfMake.createPdf(docDefinition).download("receipt so_id_" + $scope.so.so_id + ".pdf");


        }
        // print quotation order documnet
        $scope.quote = function () {


            $scope.prog = true;

            var dd = [];
            dd.push(['#', 'Item', 'Qty', 'Unit price', 'Total Amount']);

            var tota = 0.00;
            for (i = 0; i < $scope.soitems.length; i++) {
                dd.push(
                    [
                        {
                            text: (i + 1),
                            fontSize: 9
                        },
                        {
                            text: $scope.soitems[i].name,
                            fontSize: 9
                        },
                        {
                            text: ($scope.soitems[i].qty) * (-1),
                            fontSize: 9
                        },
                        {
                            text: commasep((-1) * ($scope.soitems[i].price / $scope.soitems[i].qty)),
                            fontSize: 9,
                            alignment: 'right'
                        },
                        {
                            text: commasep($scope.soitems[i].price),
                            alignment: 'right',
                            fontSize: 9
                        }
                    ]);
                tota = tota + parseFloat($scope.soitems[i].price);
            }

            dd.push([{ text: 'Sub Total', fontSize : 10, style: 'tableHeader', colSpan: 4, alignment: 'center' }, '', '', '', { text: commasep(tota),fontSize : 10, alignment: 'right' }]);
            dd.push([{ text: 'Discount',fontSize : 10, style: 'tableHeader', colSpan: 4, alignment: 'center' }, '', '', '', { text: commasep($scope.discount),fontSize : 10, alignment: 'right' }]);
            dd.push([{ text: 'Grand Total', fontSize : 10, style: 'tableHeader', colSpan: 4, alignment: 'center' }, '', '', '', { text: commasep(tota - $scope.discount), fontSize : 10, alignment: 'right' }]);




            var docDefinition = {
                pageSize: 'A4',
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
                        text: $scope.so.timestamp + ' ',
                        style: 'header',
                        bold: true,
                        alignment: "right",
                        fontSize: 9
                    },
                    {
                        text: 'Quotation',
                        style: 'header',
                        bold: true,
                        alignment: "center",
                        fontSize: 13
                    },
                    '\n',
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: 'To : \n',
                                fontSize: 10
                            },
                            {
                                text: ''
                            }
                        ]
                    },
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: $scope.so.name+',\n'+ $scope.so.address,
                                fontSize: 11,
                                bold: true
                            }

                        ]
                    },
                    
                    '\n\n',
                    {
                        text: 'Items Description',
                        style: 'header',
                        bold: true,
                        alignment: "center",
                        fontSize: 11
                    },
                    '\n',
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*', 100, '*', 130, 150],
                            body: dd
                        }
                    },
                    '\n\n',
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*'],
                            body: [
                                ['Notes and conditions'],
                                [$scope.userd.noteq + '\n' + $scope.cterm]

                            ],

                        }
                    },
                    '\n\n\n',
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: 'Issued by\n\n\n......................',
                                fontSize: 10
                            },
                            {
                                text: 'Checked by\n\n\n......................',
                                fontSize: 10
                            },

                        ]
                    }
                ]

            }
            console.log(docDefinition);
            pdfMake.createPdf(docDefinition).download("Quotation_so_id_" + $scope.so.so_id + ".pdf");

            $scope.prog = false;

        }

        // getting payments 
        $scope.getpayments = function () {

            var datas = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                so_id: $stateParams.so_id
            }

            $http.post(restful.apiurl + restful.list.getsopayment, datas)
                .success(function (response) {
                    if (response != 0) {
                        $scope.payments = response;
                    }

                }).error(function (err) {



                });


        }

        $scope.getpayments();


        // payment complete
        $scope.payment = function () {


            if ($scope.paidamount && $scope.paidtype) {
                $scope.progp = true;
                $scope.savesuccessp = false;
                $scope.savefailp = false;

                var datas = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    so_id: $stateParams.so_id,
                    pamount: $scope.so.pamount,
                    amount: $scope.paidamount,
                    type: $scope.paidtype,
                    remarks: ($scope.paidremarks) ? $scope.paidremarks : 'NA',
                    total: $scope.so.total,

                }

                $http.post(restful.apiurl + restful.list.paymentso, datas)
                    .success(function (response) {

                        console.log(response.status);
                        if (response.status = 1) {

                            console.log('success');
                            $scope.getitems();
                            $scope.getpayments();
                            //$scope.recept($scope.paidamount, $scope.paidtype);
                            $scope.paidtype = undefined;
                            $scope.paidamount = undefined;
                            $scope.padiremarks = undefined;

                        }
                        else {
                            console.log('failed');
                            $scope.savesuccess = false;
                            $scope.savefail = true;

                        }

                    }).error(function (err) {
                        console.log('failed');
                        $scope.savesuccess = false;
                        $scope.savefail = true;


                    });
                $scope.progp = false;

                $scope.getitems();
                $scope.getpayments();

            }


        }


        function commasep(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // delete so
        $scope.deleteso = function () {

            var datade = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                so_id: $stateParams.so_id
            }

            $http.post(restful.apiurl + restful.list.dso, datade)
                .success(function (response) {
                    if (response.status != 0) {
                        $state.go('dms_so.allp');
                    }
                    else {
                        console.log('Error Occured');
                    }

                }).error(function (err) {



                });

        }

        $scope.ret = function (so_id) {

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-bottom',
                ariaDescribedBy: 'modal-body-bottom',
                controller: 'returnc',
                templateUrl: 'app/dms/so/modals/return.html',
                size: 'lg',
                resolve: {
                    so_id: function () {
                        return so_id;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.getitems();
            });


        }

    }
    else {
        $state.go('home');
    }
});

// for edit one item - pending so
myapp.controller('dms_so_edititem', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        $scope.poitems = {};

        $scope.s_id = $stateParams.s_id;
        $scope.so_id = $stateParams.so_id;

        // get poitem
        $scope.getitems = function () {



            var datas = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                so_id: $stateParams.so_id,
                s_id: $stateParams.s_id
            }

            $http.post(restful.apiurl + restful.list.getsoitemedit, datas)
                .success(function (response) {

                    if (response != 0) {
                        $scope.soitem = response[0];
                        $scope.qtyw = (-1) * parseFloat(response[0].qty);
                        $scope.price = (-1) * response[0].price / response[0].qty;
                        $scope.cost = (-1) * response[0].cost / response[0].qty;
                    }
                    else {
                        $scope.soitem = [];
                    }

                }).error(function (err) {
                    $scope.soitem = []
                });



        }
        // method call
        $scope.getitems();

        $scope.save = function () {

            if ($scope.qtyw && $scope.price && $scope.cost) {

                $scope.prog = true;
                $scope.savefail = false;
                $scope.savesuccess = false;


                var datas = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    s_id: $stateParams.s_id,
                    qty: (-1) * $scope.qtyw,
                    price: $scope.qtyw * $scope.price,
                    cost: $scope.cost * $scope.qtyw
                }

                $http.post(restful.apiurl + restful.list.usoitem, datas)
                    .success(function (response) {

                        if (response.status = 1) {

                            $scope.prog = false;
                            $scope.savefail = false;
                            $scope.savesuccess = true;
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
                console.log(datas);

            }


        }



    }
    else {
        $state.go('home');
    }
});

// for edit one item - pending po
myapp.controller('dms_so_deleteitem', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var sid = $stateParams.so_id;
        $scope.sid = $stateParams.s_id;

        $scope.delete = function () {



            $scope.prog = true;
            $scope.savefail = false;
            $scope.savesuccess = false;


            var datas = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                s_id: $stateParams.s_id

            }

            $http.post(restful.apiurl + restful.list.dpoitem, datas)
                .success(function (response) {

                    if (response.status = 1) {

                        $scope.prog = false;
                        $scope.savefail = false;
                        $scope.savesuccess = true;
                        $state.go('dms_so.edit', { so_id: sid })
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
    else {
        $state.go('home');
    }
});

// retun controller
myapp.controller('returnc', function (so_id, $uibModalInstance, $window, $scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {


        $scope.bc = false;

        //load items for list
        $scope.getilist = function () {
            var datai = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                so_id: so_id

            }

            $http.post(restful.apiurl + restful.list.getsoitem1, datai)
                .success(function (response) {

                    if (response != 0) {
                        $scope.items = response;
                    }
                    else {
                        $scope.items = [];
                    }

                }).error(function (err) {
                    $scope.items = []
                });


        }
        $scope.getilist();

        // getting return items
        $scope.getret = function () {
            var datai = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                so_id: so_id

            }

            $http.post(restful.apiurl + restful.list.getreturn, datai)
                .success(function (response) {

                    if (response != 0) {
                        $scope.ret = response;
                    }
                    else {
                        $scope.ret = [];
                    }

                }).error(function (err) {
                    $scope.ret = []
                });
        }
        $scope.getret();

        // getting cost
        $scope.pocost = function () {

            var datass = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                i_id: $scope.i_id,

            }

            $http.post(restful.apiurl + restful.list.getitem1, datass)
                .success(function (response) {

                    if (response != 0) {
                        console.log(1);
                        $scope.cost = parseFloat(response[0].cost);
                        $scope.price = parseFloat(response[0].price);
                        $scope.qty = 1;
                    }
                    else {

                    }

                }).error(function (err) {

                });


            $scope.getst();



        }

        // get stocks
        $scope.getst = function () {
            $scope.st = undefined;
            var datast = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                i_id: $scope.i_id

            }
            $http.post(restful.apiurl + restful.list.getstockforid, datast)
                .success(function (response) {

                    if (response != 0) {

                        $scope.st = response;

                    }
                    else {
                        $scope.st = undefined;
                    }

                }).error(function (err) {
                    $scope.st = undefined;
                });

        }


        $scope.save = function () {

            if (so_id && $scope.st_id && $scope.qty && $scope.i_id && $scope.price && $scope.cost) {

                $scope.prog = true;
                var datast = {

                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    so_id: so_id,
                    st_id: $scope.st_id,
                    i_id: $scope.i_id,
                    qty: $scope.qty,
                    price: $scope.qty * $scope.price,
                    cost: $scope.qty * $scope.cost

                }

                $http.post(restful.apiurl + restful.list.creturn, datast)
                    .success(function (response) {

                        if (response.status == 1) {

                            $scope.prog = false;
                            $scope.getret();

                        }
                        else if (response.status == 409) {
                            $window.alert('Wrong Qty');
                        }
                        else {
                            $scope.prog = false;
                            $window.alert('Something went wrong');
                        }

                    }).error(function (err) {
                        $scope.prog = false;
                        $window.alert('Something went wrong');
                    });

                $scope.getret();

            }
            else {
                $window.alert('plz complete the form');
            }

        }

        $scope.close = function () {
            $uibModalInstance.close();
        }


    }
    else {
        $state.go('home');
    }
});