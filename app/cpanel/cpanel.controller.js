myapp.controller('cpanel', function($scope, $state, $stateParams, $http, $rootScope, restful){


	$scope.lat = undefined;
	$scope.lon = undefined;

	var self = this;
	self.cords = [];

	if($rootScope.login != 1){
		$state.go('login');
	}
	else if($rootScope.cpanel){


		// LOCATION DETAILS
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){
				$scope.$apply(function(){
					$scope.lat = position.coords.latitude;
					$scope.lon = position.coords.longitude;
				});
			});
		}

		var datas = {
			email : $rootScope.loggedemail,
			apikey : $rootScope.apikey
		}

		
		
		// getting users
		$http.post(restful.apiurl+restful.list.users,datas)
			.success(function(response){

			if(response!=0){
				$scope.nous = response;
			} 
			else{
				$scope.nous = [];
			}

		}).error(function(err){
			$scope.nous = []
		});

		
		
		
		// getting bugs
		$http.post(restful.apiurl+restful.list.bugs,datas)
			.success(function(response){

			if(response!=0){
				$scope.bugs = response;
			} 
			else{
				$scope.bugs = [];
			}

		}).error(function(err){
			$scope.bugs = []
		});



		





	}
	else{ 
		$state.go('home');
	}
});