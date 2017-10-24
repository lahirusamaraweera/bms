// For purchase order
myapp.controller('dms_po', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


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

// for pending purchase orders
myapp.controller('dms_po_pending', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }


        // getting suppliers
        $http.post(restful.apiurl + restful.list.getpo, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.po = response;
                }
                else {
                    $scope.po = [];
                }

            }).error(function (err) {
                $scope.po = []
            });










    }
    else {
        $state.go('home');
    }
});

// for completed purchase orders
myapp.controller('dms_po_complete', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


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

                var datass = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    month: $scope.month,
                    year: $scope.year
                }



                $http.post(restful.apiurl + restful.list.getcpo, datass)
                    .success(function (response) {

                        if (response != 0) {
                            $scope.po = response;
                        }
                        else {
                            $scope.po = [];
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

// for new Purchase order
myapp.controller('dms_po_new', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }


        // getting suppliers
        $http.post(restful.apiurl + restful.list.getsup, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.suppliers = response;
                }
                else {
                    $scope.suppliers = [];
                }

            }).error(function (err) {
                $scope.suppliers = []
            });

        // saving purchase orders
        $scope.save = function () {



            if ($scope.sup_id) {

                var podata = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    sup_id: $scope.sup_id,
                    remarks: ($scope.remarks) ? $scope.remarks : 'NA',

                }

                $scope.prog = true;
                $scope.savesuccess = false;
                $scope.savefail = false;

                $http.post(restful.apiurl + restful.list.cpo, podata)
                    .success(function (response) {

                        if (response > 0) {
                            console.log(response);
                            $scope.prog = false;
                            $scope.savesuccess = true;
                            $scope.savefail = false;
                            $scope.sup_id = undefined;
                            $state.go('dms_po.edit', { po_id: response });
                        }
                        else {
                            $scope.prog = false;
                            $scope.savesuccess = false;
                            $scope.savefail = true;
                        }




                    }).error(function (err) {

                    });



            }


            $scope.prog = false;


        }

        $scope.getouts = function () {

            var datass = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                sup_id: $scope.sup_id,

            }

            $http.post(restful.apiurl + restful.list.outssup, datass)
                .success(function (response) {

                    if (response != 0) {
                        $scope.outs = response[0].total;
                    }
                    else {
                        $scope.outs = undefined;
                    }

                }).error(function (err) {
                    $scope.outs = undefined;
                });

        }




    }
    else {
        $state.go('home');
    }
});

// for editing purchase orders
myapp.controller('dms_po_edit', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {


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

        // getting stock
        $http.post(restful.apiurl + restful.list.getstock, datai)
            .success(function (response) {

                if (response != 0) {
                    $scope.stocks = response;

                }
                else {
                    $scope.stocks = [];
                }




            }).error(function (err) {
                $scope.stocks = []
            });


        $scope.getitems = function () {


            // getting suppliers
            var datas = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                po_id: $stateParams.po_id
            }

            $http.post(restful.apiurl + restful.list.getpo1, datas)
                .success(function (response) {

                    if (response != 0) {
                        $scope.po = response[0];
                        if ($scope.po.status == 1) {
                            $state.go('dms');
                        }
                    }
                    else {
                        $scope.po = [];
                        $state.go('dms');
                    }

                }).error(function (err) {
                    $scope.po = []
                    $state.go('dms');
                });


            // getting items
            var datass = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                po_id: $stateParams.po_id
            }


            $http.post(restful.apiurl + restful.list.getpoitem1, datass)
                .success(function (response) {

                    if (response != 0) {
                        $scope.poitems = response;
                    }
                    else {
                        $scope.poitems = [];
                    }

                }).error(function (err) {
                    $scope.poitems = []
                });



        }

        // loading and name in barcode mode
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
                            console.log(1);
                            $scope.i_id = parseFloat(response[0].i_id);

                            $scope.name = response[0].name + ' | ' + response[0].brand + ' | ' + response[0].packsize + ' | ' + response[0].i_id;
                        }
                        else {

                        }

                    }).error(function (err) {

                    });


            }





        }


        $scope.getitems();


        // saving purchase orders
        $scope.itemsave = function () {


            if ($scope.i_id && $scope.price && $scope.qty) {
                var dates = '0000-00-00';
                if ($scope.day && $scope.month && $scope.year) {

                    var dates = $scope.year + '-' + $scope.month + '-' + $scope.day;

                }

                var podata = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    sup_id: $scope.po.sup_id,
                    po_id: $stateParams.po_id,
                    i_id: $scope.i_id,
                    qty: $scope.qty,
                    price: $scope.price * $scope.qty,
                    ed: dates

                }

                $scope.prog = true;


                $http.post(restful.apiurl + restful.list.cpoitem, podata)
                    .success(function (response) {

                        if (response > 0) {
                            console.log(response);
                            $scope.prog = false;
                            $scope.qty = undefined;
                            $scope.price = undefined;
                            $scope.i_id = undefined;
                            $scope.barcode = undefined;
                            $scope.name = undefined;
                            $scope.day = undefined;
                            $scope.month = undefined;
                            $scope.year = undefined;


                            $scope.getitems();

                        }
                        else {
                            $scope.prog = false;

                        }




                    }).error(function (err) {

                    });



            }


        }


        // Completing purchase order
        $scope.complete = function () {

            // completing
            $scope.prog = true;
            $scope.savesuccess = false;
            $scope.savefail = false;

            var datasw = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                po_id: $stateParams.po_id
            }

            $http.post(restful.apiurl + restful.list.compo, datasw)
                .success(function (response) {

                    if (response != 0) {
                        $scope.prog = false;
                        $scope.savesuccess = true;
                        $scope.savefail = false;
                        $state.go('dms_po.com1', { po_id: $stateParams.po_id });
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

        // print purchase order documnet
        $scope.invoice = function () {



            var dd = [];
            dd.push(['#', 'Item', 'Qty', 'Unit price', 'Total Amount']);

            for (i = 0; i < $scope.poitems.length; i++) {
                dd.push([(i + 1), $scope.poitems[i].name, $scope.poitems[i].qty, '', '']);
            }


            var docDefinition = {
                content: [
                    {
                        text: 'Purchase Invoice',
                        style: 'header',
                        bold: true,
                        alignment: "right",
                        fontSize: 25
                    },
                    {
                        text: $scope.po.timestamp,
                        style: 'header',
                        bold: true,
                        alignment: "right",
                        fontSize: 14
                    },
                    'PO Id : ' + $scope.po.po_id,
                    '\n',
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: 'To : \n'
                            },
                            {
                                text: 'From :'
                            }
                        ]
                    },
                    {
                        alignment: 'left',
                        columns: [
                            {
                                text: $scope.po.name
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
                                text: $scope.po.address
                            },
                            {
                                text: ''
                            }
                        ]
                    },
                    '\n\n\n',
                    {
                        text: 'Order Items Description',
                        style: 'header',
                        bold: true,
                        alignment: "center",
                        fontSize: 12
                    },
                    '\n',
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*', 100, '*', 130, 150],
                            body: dd
                        }
                    },
                    '\n\n\n\n\n\n\n\n',
                    '................................',
                    'Authorized Signatory'
                ]

            }
            console.log(docDefinition);
            pdfMake.createPdf(docDefinition).download("Score_Details.pdf");


        }


    }
    else {
        $state.go('home');
    }
});

// for completed purchase po
myapp.controller('dms_po_com1', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        $scope.po = {};


        $scope.getitems = function () {


            // getting suppliers
            var datas = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                po_id: $stateParams.po_id
            }

            $http.post(restful.apiurl + restful.list.getpo1, datas)
                .success(function (response) {

                    if (response != 0) {
                        $scope.po = response[0];
                    }
                    else {
                        $scope.po = [];
                        $state.go('dms');
                    }

                }).error(function (err) {
                    $scope.po = [];
                    $state.go('dms');
                });


            // getting items
            var datass = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                po_id: $stateParams.po_id
            }


            $http.post(restful.apiurl + restful.list.getpoitem1, datass)
                .success(function (response) {

                    if (response != 0) {
                        $scope.poitems = response;
                    }
                    else {
                        $scope.poitems = [];
                    }

                }).error(function (err) {
                    $scope.poitems = []
                });


        }
        $scope.getitems();

        $scope.complete = function () {


            var datas = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                po_id: $stateParams.po_id
            }

            $http.post(restful.apiurl + restful.list.paymentpo, datas)
                .success(function (response) {

                    console.log(response.status);
                    if (response.status = 1) {
                        console.log('success');
                        $scope.getitems();


                    }
                    else {
                        console.log('failed');
                    }

                }).error(function (err) {
                    console.log('failed');

                });

            $scope.getitems();
        }



    }
    else {
        $state.go('home');
    }
});

// for edit one item - pending po
myapp.controller('dms_po_edititem', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        $scope.poitems = {};

        $scope.s_id = $stateParams.s_id;
        $scope.po_id = $stateParams.po_id;

        // get poitem
        $scope.getitems = function () {



            var datas = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                po_id: $stateParams.po_id,
                s_id: $stateParams.s_id
            }

            $http.post(restful.apiurl + restful.list.getpoitemedit, datas)
                .success(function (response) {

                    if (response != 0) {
                        $scope.poitem = response[0];
                        $scope.qtyw = parseFloat(response[0].qty);
                        $scope.price = response[0].price / response[0].qty;
                        $scope.date = response[0].ed;
                    }
                    else {
                        $scope.poitem = [];
                        $state.go('dms');
                    }

                }).error(function (err) {
                    $scope.poitem = [];
                    $state.go('dms');
                });



        }
        // method call
        $scope.getitems();

        $scope.save = function () {

            if ($scope.qtyw && $scope.price) {

                $scope.prog = true;
                $scope.savefail = false;
                $scope.savesuccess = false;


                var datas = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    s_id: $stateParams.s_id,
                    qty: $scope.qtyw,
                    price: $scope.qtyw * $scope.price,
                    i_id: $scope.poitem.i_id,
                    ed: $scope.date
                }

                $http.post(restful.apiurl + restful.list.upoitem, datas)
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

        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
           
        }

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.date = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }


    }
    else {
        $state.go('home');
    }
});

// for edit one item - pending po
myapp.controller('dms_po_deleteitem', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var pid = $stateParams.po_id;
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
                        $state.go('dms_po.edit', { po_id: pid })
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