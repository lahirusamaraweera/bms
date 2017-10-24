myapp.controller('newcar', function($scope, $state, $stateParams, $http, $rootScope, restful){
	if($rootScope.login != 1){
		$state.go('login');
	}
	else if($rootScope.rentacar){

		// Sending data to the back end.
		$scope.savecar = function(){

			if($scope.v_no && $scope.make && $scope.model && $scope.year && $scope.rpd && $scope.rpm && $scope.rpy && $scope.mpd && $scope.er){
				$scope.prog = true;
				$scope.savesuccess = false;
				$scope.savefail = false;

				var cardata = {
					email : $rootScope.loggedemail,
					apikey : $rootScope.apikey,
					v_no	: $scope.v_no,
					make : $scope.make,
					model : $scope.model,
					year : $scope.year,
					rpd : $scope.rpd,
					rpm : $scope.rpm,
					rpy : $scope.rpy,
					mpd : $scope.mpd,
					er : $scope.er

				}



				$http.post(restful.apiurl+restful.list.savecar,cardata)
					.success(function(response){

					if(response == "success"){
						$scope.prog = false;
						$scope.savesuccess = true;
						$scope.savefail = false;

						$scope.v_no = undefined;
						$scope.make = undefined;
						$scope.model = undefined;
						$scope.year = undefined;
						$scope.rpd = undefined;
						$scope.rpm = undefined;
						$scope.rpy = undefined;
						$scope.mpd = undefined;
						$scope.er = undefined;

						
					}
					else{
						$scope.prog = false;
						$scope.savefail = true;


					}




				}).error(function(err){
					$scope.prog = false;
					$scope.savefail = true;

				});
			}
			else{
				console.log("data not completed")
			}
		}







	}
	else{
		$state.go('home');
	}

});