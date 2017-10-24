myapp.controller('dms_reports', function ($scope, $state, $stateParams, $http, $rootScope, restful) {


    if ($rootScope.login != 1) {
        $state.go('login');
        console.log("test");
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