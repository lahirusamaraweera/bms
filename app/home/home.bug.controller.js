myapp.controller('bug', function($scope, $rootScope, $state, $http, restful){
	
	if($rootScope.login != 1){
		$state.go('login');
	}else{
		
		$scope.save = function(){
			if($scope.des){
				$scope.prog = true;
				$scope.savesuccess = false;
				$scope.savefail = false;
				var datas = {
					email : $rootScope.loggedemail,
					desc : $scope.des,
					apikey : $rootScope.apikey

				}

				$http.post(restful.apiurl+restful.list.bug,datas)
					.success(function(response){

					if(response == 1){
						$scope.des = undefined;
						$scope.prog = false;
						$scope.savesuccess = true;
					}

				}).error(function(err){
					$scope.savefail = true;
					$scope.prog = false;
					$scope.savesuccess = false;
				});



			}
			
			
			
		}
		
		
	}
	
	
	
});