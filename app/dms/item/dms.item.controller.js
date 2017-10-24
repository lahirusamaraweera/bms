myapp.controller('dms_item_stock', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }


        $scope.labels = ['Loading'];
        $scope.datae = [
            [0]

        ];

        // getting stock
        $http.post(restful.apiurl + restful.list.getstock, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.stocks = response;

                    for (x = 0; x < response.length; x++) {
                        console.log(6);
                        $scope.labels[x] = response[x].name;
                        $scope.datae[0][x] = parseFloat(response[x].stock);
                    }


                }
                else {
                    $scope.stocks = [];
                }




            }).error(function (err) {
                $scope.stocks = []
            });



        // getting all items
        $http.post(restful.apiurl + restful.list.getitempo, datas)
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
    else {
        $state.go('home');
    }
});

// item home page
myapp.controller('dms_item', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {
        $scope.admin = $rootScope.admin;

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey,
            intval: 30

        }


        // getting expire stocks
        $http.post(restful.apiurl + restful.list.expirestocks, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.expire = response;
                }
                else {
                    $scope.expire = [];
                }

            }).error(function (err) {
                $scope.expire = [];
            });


        // getting all items
        $http.post(restful.apiurl + restful.list.getstockmatch, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.sm = response;
                }
                else {
                    $scope.sm = [];
                }

            }).error(function (err) {
                $scope.sm = []
            });










    }
    else {
        $state.go('home');
    }
});

myapp.controller('dms_item_item', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }


        // getting all categories
        $http.post(restful.apiurl + restful.list.getcategory, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.cats = response;
                }
                else {
                    $scope.cats = [];
                }

            }).error(function (err) {
                $scope.cats = []
            });


        // getting user details for invoice
        $http.post(restful.apiurl + restful.list.userdetails, datas)
            .success(function (response) {

                if (response != 0) {
                    $scope.userd = response[0];
                }
                else {

                }

            }).error(function (err) {

            });


        $scope.fetch = function () {
            if ($scope.category) {
                $scope.prog = true;

                var datast = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    category: $scope.category
                }

                $http.post(restful.apiurl + restful.list.getitemsforcat, datast)
                    .success(function (response) {

                        if (response != 0) {
                            $scope.items = response;
                        }
                        else {
                            $scope.items = [];
                        }

                    }).error(function (err) {
                        $scope.items = [];
                    });
                $scope.prog = false;
            }
            else {
                $scope.prog = true;;
                var datass = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey
                }
                // getting all items
                $http.post(restful.apiurl + restful.list.getitempo, datass)
                    .success(function (response) {

                        if (response != 0) {
                            $scope.items = response;
                        }
                        else {
                            $scope.items = [];
                        }

                    }).error(function (err) {
                        $scope.items = [];
                    });
                $scope.prog = false;
            }
        }
        $scope.fetch();
        //dowload price list
        $scope.down = function () {
            if ($scope.items) {
                $scope.prog = true;
                var dd = [];
                dd.push(['Code', 'Name', 'Packsize', 'Price']);

                var tota = 0.00;
                for (var i = 0; i < $scope.items.length; i++) {

                    if ($scope.items[i].status == 0) {
                        continue;
                    }
                    dd.push(
                        [
                            {
                                text: $scope.items[i].barcode,
                                fontSize: 9
                            },
                            {
                                text: $scope.items[i].name,
                                fontSize: 9
                            },
                            {
                                text: $scope.items[i].packsize,
                                fontSize: 9,
                                alignment: 'center'
                            },

                            {
                                text: commasep($scope.items[i].price),
                                fontSize: 9,
                                alignment: 'right'
                            }
                        ]);


                }



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
                                    text: ' ',
                                    width: 10
                                },
                                ['\n',
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


                        '\n\n',
                        {
                            text: 'Price List',
                            style: 'header',
                            bold: true,
                            alignment: "center",
                            fontSize: 10
                        },
                        '\n',
                        {
                            style: 'tableExample',
                            table: {
                                widths: [90, '*', 60, 60],
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
                                        text: $scope.userd.note,
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
                        }
                    ]

                }
                console.log(docDefinition);
                pdfMake.createPdf(docDefinition).download("Pricelist.pdf");
                $scope.prog = false;
            }
        }

        //dowload stock list
        $scope.downs = function () {
            if ($scope.items) {
                $scope.prog = true;
                var dd = [];
                dd.push(['Code', 'Item', 'Price', 'Stock']);

                var tota = 0.00;
                for (var i = 0; i < $scope.items.length; i++) {

                    if ($scope.items[i].status == 0) {
                        continue;
                    }
                    dd.push(
                        [{
                            text: $scope.items[i].barcode,
                            fontSize: 9
                        },
                        {
                            text: $scope.items[i].name + ' -  ' + $scope.items[i].packsize,
                            fontSize: 9
                        },

                        {
                            text: commasep($scope.items[i].price),
                            fontSize: 9,
                            alignment: 'right'
                        }
                            ,

                        {
                            text: $scope.items[i].stock_qty,
                            fontSize: 9,
                            alignment: 'center'
                        }
                        ]);


                }




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



                        '\n\n',
                        {
                            text: 'STOCK List',
                            style: 'header',
                            bold: true,
                            alignment: "center",
                            fontSize: 10
                        },
                        '\n',
                        {
                            style: 'tableExample',
                            table: {
                                widths: [90, '*', 60, 60],
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
                                        text: $scope.userd.note,
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
                        }
                    ]

                }
                console.log(docDefinition);
                pdfMake.createPdf(docDefinition).download("Stocklist.pdf");
                $scope.prog = false;
            }
        }
        function commasep(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

    }
    else {
        $state.go('home');
    }
});

myapp.controller('dms_item_new', function ($window, $scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey,

        }

        $scope.bad = false;
        //getting brands
        $http.post(restful.apiurl + restful.list.getbrand, datas)
            .success(function (response) {

                if (response != 0) {

                    $scope.brands = response;

                }
                else {

                }

            }).error(function (err) {

            });


        //getting cats
        $http.post(restful.apiurl + restful.list.getcategory, datas)
            .success(function (response) {

                if (response != 0) {

                    $scope.cats = response;

                }
                else {

                }

            }).error(function (err) {

            });







        // Save new items
        $scope.save = function () {

            if ($scope.barcode && $scope.pp && $scope.name && $scope.b_id && $scope.packsize && $scope.price && $scope.cat_id && $scope.cost && $scope.reorderlimit) {
                $scope.prog = true;
                $scope.savesuccess = false;
                $scope.savefail = false;


                var datas = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    name: $scope.name,
                    b_id: $scope.b_id,
                    packsize: $scope.packsize,
                    price: $scope.price,
                    cost: $scope.cost,
                    cat_id: $scope.cat_id,
                    barcode: $scope.barcode,
                    reorderlimit: $scope.reorderlimit,
                    pp: $scope.pp

                }



                $http.post(restful.apiurl + restful.list.citem, datas)
                    .success(function (response) {

                        if (response != 0) {
                            $scope.prog = false;
                            $scope.savesuccess = true;
                            $scope.savefail = false;

                            $scope.name = undefined;
                            $scope.b_id = undefined;
                            $scope.cat_id = undefined;
                            $scope.packsize = undefined;
                            $scope.price = undefined;
                            $scope.cost = undefined;
                            $scope.barcode = undefined;
                            $scope.reorderlimit = undefined;
                            $scope.prof = undefined;
                            document.getElementById("barcode").focus();

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
            }
            else {
                $window.alert('Please fill the missing details');
            }
        }

        $scope.check = function () {
            if ($scope.barcode) {
                var datass = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    barcode: $scope.barcode,
                }

                $http.post(restful.apiurl + restful.list.getbybar, datass)
                    .success(function (response) {

                        if (response != 0) {

                            $scope.bcf = true;
                            $scope.tbc = response[0].name;
                            $scope.barcodec = $scope.barcode;
                            $scope.barcode = undefined;

                        }
                        else {
                            $scope.bcf = false;
                            $scope.save();
                        }

                    }).error(function (err) {

                    });


            }





        }

        $scope.pricecal = function () {
            $scope.price = Math.round(parseFloat($scope.cost) + (parseFloat($scope.cost) * parseFloat($scope.pp) / 100));

        }




    }
    else {
        $state.go('home');
    }
});

myapp.controller('dms_item_edit', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        $scope.bardis = true;
        $scope.editl = true;
        $scope.saveblock = false;

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey,
            i_id: $stateParams.i_id
        }


        // getting item details
        $http.post(restful.apiurl + restful.list.getitem1, datas)
            .success(function (response) {

                if (response != 0) {

                    $scope.name = response[0].name;
                    $scope.brand = response[0].brand;
                    $scope.packsize = response[0].packsize;
                    $scope.price = parseFloat(response[0].price);
                    $scope.i_id = response[0].i_id;
                    $scope.cost = parseFloat(response[0].cost);
                    $scope.category = response[0].category;
                    $scope.barcode = response[0].barcode;
                    $scope.b_id = response[0].b_id;
                    $scope.cat_id = response[0].cat_id;
                    $scope.reorderlimit = response[0].reorderlimit;
                    //$scope.prof = (parseFloat($scope.price) - parseFloat($scope.cost)) / parseFloat($scope.cost) * 100;
                    $scope.stockqty = parseInt(response[0].stock_qty);
                    $scope.status = parseInt(response[0].status);
                    $scope.prof = parseFloat(response[0].pp);

                }
                else {

                }

            }).error(function (err) {

            });



        $scope.labels1 = [];
        $scope.datae1 = [
            []

        ];

        $scope.color = ['#ff8000'];


        $http.post(restful.apiurl + restful.list.dayitemsale, datas)
            .success(function (response) {

                if (response != 0) {


                    for (x = 0; x < response.length; x++) {

                        $scope.labels1[x] = response[x].date;
                        $scope.datae1[0][x] = (-1) * parseFloat(response[x].sale);
                    }

                }
                else {

                }

            }).error(function (err) {

            });


        // getting purchase history
        $http.post(restful.apiurl + restful.list.itempurhis, datas)
            .success(function (response) {

                if (response != 0) {

                    $scope.history = response;

                }
                else {

                }

            }).error(function (err) {

            });



        $scope.save = function () {

            if ($scope.name && $scope.brand && $scope.packsize && $scope.price && $scope.reorderlimit && $scope.cost && $scope.barcode) {
                $scope.saveblock = true;
                $scope.prog = true;
                $scope.savesuccess = false;
                $scope.savefail = false;


                var datas = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    name: $scope.name,
                    b_id: $scope.b_id,
                    packsize: $scope.packsize,
                    price: $scope.price,
                    i_id: $scope.i_id,
                    cost: $scope.cost,
                    cat_id: $scope.cat_id,
                    barcode: $scope.barcode,
                    reorderlimit: $scope.reorderlimit,
                    status: $scope.status,
                    cat_id: $scope.cat_id,
                    b_id: $scope.b_id,
                    pp : parseFloat($scope.prof),
                }



                $http.post(restful.apiurl + restful.list.uitem, datas)
                    .success(function (response) {

                        if (response != 0) {
                            $scope.prog = false;
                            $scope.savesuccess = true;
                            $scope.savefail = false;
                            $scope.bardis = true;

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
            }
            $scope.bardis = true;
            $scope.saveblock = false;
        }

        $scope.check = function () {
            if ($scope.barcode) {
                var datass = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    barcode: $scope.barcode,
                }

                $http.post(restful.apiurl + restful.list.getbybar, datass)
                    .success(function (response) {

                        if (response != 0) {
                            if (response[0].i_id == $scope.i_id) {

                                $scope.bcf = false;
                                $scope.save();

                            }
                            else {

                                $scope.bcf = true;
                                $scope.tbc = response[0].barcode;
                                $scope.paname = response[0].name;
                                $scope.barcode = undefined;

                            }
                        }
                        else {

                            $scope.bcf = false;
                            $scope.save();
                        }

                    }).error(function (err) {

                    });


            }





        }

        $scope.pricecal = function () {
            $scope.price = Math.round(parseFloat($scope.cost) + (parseFloat($scope.cost) * parseFloat($scope.prof) / 100));

        }
        //getting brands
        $http.post(restful.apiurl + restful.list.getbrand, datas)
            .success(function (response) {

                if (response != 0) {

                    $scope.brands = response;

                }
                else {

                }

            }).error(function (err) {

            });


        //getting cats
        $http.post(restful.apiurl + restful.list.getcategory, datas)
            .success(function (response) {

                if (response != 0) {

                    $scope.cats = response;

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

myapp.controller('dms_item_minus', function ($scope, $window, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey,

        }

        // get items
        $scope.getitemss = function () {

            // getting stock
            $http.post(restful.apiurl + restful.list.getminus, datas)
                .success(function (response) {

                    if (response != 0) {

                        $scope.stok = response;

                    }
                    else {

                    }

                }).error(function (err) {

                });

        }

        $scope.getitemss();


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





        // get item list
        $http.post(restful.apiurl + restful.list.getitempo, datas)
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
                    }
                    else {

                    }

                }).error(function (err) {

                });



            $scope.getst();

        }

        // saving items
        $scope.itemsave = function () {


            if ($scope.i_id && $scope.price && $scope.cost && $scope.qty && $scope.desc) {

                var podata = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    i_id: $scope.i_id,
                    qty: (-1) * $scope.qty,
                    price: $scope.price * $scope.qty,
                    cost: $scope.cost * $scope.qty,
                    desc: $scope.desc,
                    st_id: $scope.st_id

                }


                $scope.prog = true;

                $http.post(restful.apiurl + restful.list.cminus, podata)
                    .success(function (response) {

                        if (response.status == 1) {


                            $scope.qty = undefined;
                            $scope.price = undefined;
                            $scope.i_id = undefined;
                            $scope.cost = undefined;
                            $scope.desc = undefined;
                            $scope.st_id = undefined;

                            $scope.getitemss();

                        }
                        else if (response.status == 409) {

                            $window.alert('Not having enough Stocks to proceed');

                        }
                        else {
                            $window.alert('Oops! Something Went wrong');
                        }




                    }).error(function (err) {


                    });

                $scope.prog = false;
                $scope.getitemss();
            }


        }





    }
    else {
        $state.go('home');
    }
});

myapp.controller('dms_item_config', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey,

        }

        // getting getbrands
        $scope.getbrands = function () {


            $http.post(restful.apiurl + restful.list.getbrand, datas)
                .success(function (response) {

                    if (response != 0) {

                        $scope.brands = response;

                    }
                    else {

                    }

                }).error(function (err) {

                });

        }

        $scope.getbrands();



        // getting categories       
        $scope.getcat = function () {


            $http.post(restful.apiurl + restful.list.getcategory, datas)
                .success(function (response) {

                    if (response != 0) {

                        $scope.cats = response;

                    }
                    else {

                    }

                }).error(function (err) {

                });

        }

        $scope.getcat();



        // create brands
        $scope.savebrand = function () {
            if ($scope.bname) {
                $scope.progb = true;
                var dd = {
                    name: $scope.bname,
                    remarks: ($scope.bremarks) ? $scope.bremarks : 'NA',
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey
                }

                $http.post(restful.apiurl + restful.list.cbrand, dd)
                    .success(function (response) {

                        if (response = 'success') {

                            $scope.getbrands();

                        }
                        else {

                        }

                    }).error(function (err) {

                    });

                $scope.getbrands();
                $scope.progb = false;
                $scope.bname = undefined;
                $scope.bremarks = undefined;
            }


        }
        // create brands
        $scope.savecat = function () {
            if ($scope.cname) {
                $scope.progc = true;
                var dd = {
                    name: $scope.cname,
                    remarks: ($scope.cremarks) ? $scope.cremarks : 'NA',
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey
                }

                $http.post(restful.apiurl + restful.list.ccategory, dd)
                    .success(function (response) {

                        if (response = 'success') {

                            $scope.getcat();

                        }
                        else {

                        }

                    }).error(function (err) {

                    });

                $scope.getcat();
                $scope.cname = undefined;
                $scope.cremarks = undefined;
                $scope.progc = false;
            }


        }


    }
    else {
        $state.go('home');
    }
});

myapp.controller('dms_item_itemsale', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        var datas = {
            email: $rootScope.loggedemail,
            apikey: $rootScope.apikey
        }

        /*
        // getting stock
        $http.post(restful.apiurl + restful.list.getstock, datas)
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
            
        // getting all items
        $http.post(restful.apiurl + restful.list.getitempo, datas)
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
            */
        // item wise sale

        $scope.labels1 = [];
        $scope.datae1 = [
            []

        ];

        $scope.colors = ['#1133f4']


        $http.post(restful.apiurl + restful.list.itemsale, datas)
            .success(function (response) {

                if (response != 0) {

                    var b = (response.length >= 10) ? 10 : response.length;
                    for (x = 0; x < b; x++) {

                        $scope.labels1[x] = response[x].name;
                        $scope.datae1[0][x] = (-1) * parseFloat(response[x].qty);
                    }
                    $scope.itemsale = response;

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

myapp.controller('dms_item_smatch', function ($scope, $uibModal, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        $scope.getsmatches = function () {
            var datas = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey
            }


            $http.post(restful.apiurl + restful.list.getstockmatch, datas)
                .success(function (response) {

                    if (response != 0) {
                        $scope.stm = response;
                    }
                    else {

                    }



                }).error(function (err) {

                });

        }


        $scope.getsmatches();

        $scope.tt = function (s_id, i_id, qty, name) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-bottom',
                ariaDescribedBy: 'modal-body-bottom',
                controller: 'stockmatch',
                templateUrl: 'app/dms/item/modal/define.html',
                size: 'lg',
                resolve: {
                    s_id: function () {
                        return s_id;
                    },
                    i_id: function () {
                        return i_id;
                    },
                    name: function () {
                        return name;
                    },
                    qty: function () {
                        return qty;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.getsmatches();
            });


        }




    }
    else {
        $state.go('home');
    }
});

myapp.controller('stockmatch', function ($uibModalInstance, $window, s_id, i_id, qty, name, $scope, $uibModal, $state, $stateParams, $http, $rootScope, restful) {
    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {
        $scope.prog = false;

        $scope.s_id = s_id;
        $scope.i_id = i_id;
        $scope.name = name;
        $scope.qty = (-1) * qty;

        // get available stocks
        $scope.getst = function () {

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

        $scope.getst();

        //saving stock match
        $scope.save = function () {
            if ($scope.s_id && $scope.i_id && $scope.qty && $scope.st_id) {

                $scope.prog = true;

                var datast = {
                    email: $rootScope.loggedemail,
                    apikey: $rootScope.apikey,
                    s_id: $scope.s_id,
                    st_id: $scope.st_id,
                    i_id: $scope.i_id,
                    qty: (-1) * $scope.qty

                }
                $http.post(restful.apiurl + restful.list.ustockmatch, datast)
                    .success(function (response) {

                        if (response.status == 1) {

                            $uibModalInstance.close();
                        }
                        else if (response.status == 409) {
                            $window.alert('not having enough stocks ');
                        }

                    }).error(function (err) {
                        $window.alert('Something went wrong! ');
                    });



                $scope.prog = false;


            }

        };




    }
    else {
        $state.go('home');
    }

});

myapp.controller('dms_item_expire', function ($window, $scope, $uibModal, $state, $stateParams, $http, $rootScope, restful) {
    if ($rootScope.login != 1) {
        $state.go('login');
    }
    else if ($rootScope.dms) {

        $scope.intval = 30;

        // get available stocks
        $scope.getst = function () {

            var datast = {
                email: $rootScope.loggedemail,
                apikey: $rootScope.apikey,
                intval: $scope.intval

            }
            $http.post(restful.apiurl + restful.list.expirestocks, datast)
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

        $scope.getst();



    }
    else {
        $state.go('home');
    }

});
