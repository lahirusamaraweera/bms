myapp.controller('login', function ($scope, $base64, $state, $http, $rootScope, loginservice, restful) {

	if ($rootScope.login == 1) {
		$state.go('home');
	}
	
	
	$scope.check = function () {

		if ($scope.lemail && $scope.pass) {
			$scope.emty = false;
			$scope.prog = true;
			$scope.alerta = false;

			var logindata = {
				email: $scope.lemail,
				pass: $scope.pass
			}

			$http.post(restful.apiurl + restful.list.loginapi, logindata)
				.success(function (response) {
					if (response.status == 'success') {
						console.log('Authorization successful');
						$scope.prog = false;
						$scope.alerta = false;

						$rootScope.login = 1;
						$rootScope.apikey = response.apikey;
						$rootScope.loggedemail = response.email;
						$rootScope.cashflow = response.cashflow;
						$rootScope.rentacar = response.rentacar;
						$rootScope.cpanel = response.cpanel;
						$rootScope.dms = response.dms;
						$rootScope.user = response.user;
						if (response.email == response.user) {
							$rootScope.admin = true;
						}
						else {
							$rootScope.admin = false;
						}




						$state.go('home');
					}
					else {
						console.log('Authorization failed !');
						$scope.alerta = true;
						$scope.prog = false;


					}



				}).error(function (err) {

				});
		}
		else {
			$scope.emty = true;
		}

	}

	$scope.logout = function () {


		$rootScope.login = 0;
		console.log('successfully logged out');
		$state.go('login');


	}

	// sign up 
	$scope.trial = function () {
		if ($scope.spass == $scope.spass1) {

			$scope.prog1 = true;
			$scope.passmat = false;
			$scope.success1 = false;
			$scope.fail = false;

			var ss = {
				email: $scope.semail,
				pass: $scope.spass,
				tp: $scope.stp,
				app: $scope.req,
				name: $scope.sname,

			}

			$http.post(restful.apiurl + restful.list.signup, ss)
				.success(function (response) {
					if (response == 'success') {
						$scope.prog1 = false;
						$scope.passmat = false;
						$scope.success1 = true;
						$scope.fail = false;

					}
					else {

						$scope.prog1 = false;
						$scope.passmat = false;
						$scope.success1 = false;
						$scope.fail = true;
					}



				}).error(function (err) {
					$scope.prog1 = false;
					$scope.passmat = false;
					$scope.success1 = false;
					$scope.fail = true;
				});



		}
		else {
			$scope.passmat = true;
		}




	}




});