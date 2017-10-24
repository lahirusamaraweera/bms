myapp.controller('newrent', function($scope, $state, $stateParams, $http, $rootScope, restful){

	if($rootScope.login != 1){
		$state.go('login');
	}else if($rootScope.rentacar){

		// to get data of the vehicle
		var datas = {
			email : $rootScope.loggedemail,
			c_id	: $stateParams.cid,
			apikey : $rootScope.apikey
		}

		$http.post(restful.apiurl+restful.list.car,datas)
			.success(function(response){
			$scope.car = response[0];


		}).error(function(err){
			$scope.car = {}
		});



		// Sending data to the back end.
		$scope.saverent = function(){

			$scope.prog = true;
			$scope.savesuccess = false;
			$scope.savefail = false;

			if($scope.im && $scope.cx_name && $scope.cx_nic && $scope.cx_address && $scope.cx_tp){
				var rentdata = {
					email : $rootScope.loggedemail,
					c_id	: $stateParams.cid,
					apikey : $rootScope.apikey,
					cx_name : $scope.cx_name,
					cx_nic : $scope.cx_nic,
					cx_address : $scope.cx_address,
					cx_tp : $scope.cx_tp,
					im : $scope.im,
					pkg : $scope.pkg

				}

				console.log(rentdata);
				$http.post(restful.apiurl+restful.list.saverent,rentdata)
					.success(function(response){
					
					$scope.prog = false;
					$scope.savesuccess = true;
					$scope.savefail = false;
					$scope.cx_name = undefined;
					$scope.cx_nic = undefined;
					$scope.cx_address = undefined;
					$scope.cx_tp = undefined;
					$scope.im = undefined;
					$scope.pkg = undefined;



				}).error(function(err){
					$scope.savefail = true;

				});
			}
		}

	}
	else{
		$state.go('home');
	}


});
