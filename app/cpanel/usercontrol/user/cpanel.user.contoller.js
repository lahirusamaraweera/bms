myapp.controller('userdata', function($scope, $state, $stateParams, $http, $rootScope, restful){



	if($rootScope.login != 1){
		$state.go('login');
	}
	else if($rootScope.cpanel){

		var datas = {
			email : $stateParams.email,
			apikey : $rootScope.apikey
		}

		// getting userdata
		$http.post(restful.apiurl+restful.list.userd,datas)
			.success(function(response){

			if(response!=0){
				$scope.user = response[0];
			} 
			else{
				$scope.user = [];
			}

		}).error(function(err){
			$scope.user = [];
		});
		
		//apps
		$http.post(restful.apiurl+restful.list.appss,datas)
			.success(function(response){

			if(response!=0){
				$scope.apps = response;
			} 
			else{
				$scope.apps = [];
			}

		}).error(function(err){
			$scope.apps = [];
		});

		







	}
	else{ 
		$state.go('home');
	}
});