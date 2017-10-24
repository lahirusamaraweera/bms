// for home page
myapp.controller('rentacar', function($scope, $state, $http, $rootScope, restful){

	if($rootScope.login != 1){
		$state.go('login');
	}else if($rootScope.rentacar){

		$scope.email= $rootScope.loggedemail;


		var logindatas = {
			email : $rootScope.loggedemail,
			apikey : $rootScope.apikey

		}

		// get available cars
		$http.post(restful.apiurl+restful.list.cars,logindatas)
			.success(function(response){

			if(response!=0){
				$scope.cars = response;
			} 
			else{
				$scope.cars = [];
			}

		}).error(function(err){
			$scope.cars = []
		});





		// get pending rents
		$http.post(restful.apiurl+restful.list.prent,logindatas)
			.success(function(response){

			if(response!=0){
				$scope.prents = response;
			} 
			else{
				$scope.prents = [];
			}

		}).error(function(err){
			$scope.crents = []
		});





	}
	else{
		$state.go('home');
	}





});

// for pending rents
myapp.controller('rentacar_rent', function($scope, $state, $http, $rootScope, restful){

	if($rootScope.login != 1){
		$state.go('login');
	}else if($rootScope.rentacar){

		$scope.email= $rootScope.loggedemail;


		var logindatas = {
			email : $rootScope.loggedemail,
			apikey : $rootScope.apikey

		}

		

		// get pending rents
		$http.post(restful.apiurl+restful.list.prent,logindatas)
			.success(function(response){

			if(response!=0){
				$scope.prents = response;
			} 
			else{
				$scope.prents = [];
			}

		}).error(function(err){
			$scope.crents = []
		});





	}
	else{
		$state.go('home');
	}





});

// for avaiilable cars
myapp.controller('rentacar_car', function($scope, $state, $http, $rootScope, restful){

	if($rootScope.login != 1){
		$state.go('login');
	}else if($rootScope.rentacar){

		$scope.email= $rootScope.loggedemail;


		var logindatas = {
			email : $rootScope.loggedemail,
			apikey : $rootScope.apikey

		}

		// get available cars
		$http.post(restful.apiurl+restful.list.cars,logindatas)
			.success(function(response){

			if(response!=0){
				$scope.cars = response;
			} 
			else{
				$scope.cars = [];
			}

		}).error(function(err){
			$scope.cars = []
		});







	}
	else{
		$state.go('home');
	}





});

//completed rents
myapp.controller('crentss', function($scope, $state, $http, $rootScope, restful){

	if($rootScope.login != 1){
		$state.go('login');
	}else if($rootScope.rentacar){
		
		
		
		
		$scope.email= $rootScope.loggedemail;


		var logindatas = {
			email : $rootScope.loggedemail,
			apikey : $rootScope.apikey

		}
				 
		// get completed rents
		$http.post(restful.apiurl+restful.list.crentsl,logindatas)
			.success(function(response){

			if(response!=0){
				$scope.crents = response;
			} 
			else{
				$scope.crents = [];
			}

		}).error(function(err){
			$scope.crents = []
		});



		$scope.panelty = function(row){
			if((row.em - row.im)/row.nod > 100){

				return (((row.em - row.im)/row.nod)-100)*row.er;
			}
			else{

				return 0;
			}
		}

		$scope.totals = function(rowq){
			if((rowq.em - rowq.im)/rowq.nod > 100){

				return (rowq.nod*rowq.rpd)+((((rowq.em - rowq.im)/rowq.nod)-100)*rowq.er);
			}
			else{

				return 0;
			}

		}



	}
	else{
		$state.go('home');
	}

});



