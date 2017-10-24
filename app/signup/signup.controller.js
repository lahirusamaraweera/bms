myapp.controller('signup', function ($scope, $base64, $state, $http, $rootScope, loginservice, restful) {

	if ($rootScope.login == 1) {
		$state.go('home');
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
						$scope.semail = $scope.spass =$scope.spass1 = $scope.sname = $scope.stp = undefined;
						

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