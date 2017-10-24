myapp.controller('usercontrol', function($scope, $state, $stateParams, $http, $rootScope, restful){



	if($rootScope.login != 1){
		$state.go('login');
	}
	else if($rootScope.cpanel){

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
		
		
		// pdf generation test
		$scope.te = function(){

			console.log(1);
			var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
			pdfMake.createPdf(docDefinition).download('optionalName.pdf');


		}




	}
	else{ 
		$state.go('home');
	}
});