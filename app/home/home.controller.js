myapp.controller('home', function ($scope, $rootScope, $state, $http) {

	if ($rootScope.login != 1) {
		$state.go('login');
	} else {
		$scope.admin = $rootScope.admin;
		if ($rootScope.user == $rootScope.loggedemail) {
			$scope.email = ' Admin @ ' + $rootScope.loggedemail;
			$scope.se = $rootScope.loggedemail;
		}
		else {
			$scope.email = $rootScope.user + ' @ ' + $rootScope.loggedemail;
			$scope.se = $rootScope.loggedemail;
		}



	}



});


myapp.controller('cpasscon', function ($scope, restful, $rootScope, $stateParams, $state, $http) {

	if ($rootScope.login != 1) {
		$state.go('login');
	} else {

		if ($rootScope.admin) {
			$scope.acc = $stateParams.acc;
			$scope.change = function () {
				if ($scope.cpass && $scope.pass && $scope.pass == $scope.pass1 && $scope.acc) {

					$scope.prog = true;
					$scope.savesuccess = false;
					$scope.savefail = false;

					// getting data
					var datas = {
						email: $rootScope.loggedemail,
						apikey: $rootScope.apikey,
						user: $scope.acc,
						pass: $scope.pass,
						cpass: $scope.cpass

					}


					$http.post(restful.apiurl + restful.list.upass, datas)
						.success(function (response) {

							if (response.status == 1) {
								$scope.prog = false;
								$scope.savesuccess = true;
								$scope.savefail = false;

								$scope.cpass = $scope.pass = $scope.pass1 = undefined;
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

			}

		}
		else {
			$state.go('home');
		}














	}



});