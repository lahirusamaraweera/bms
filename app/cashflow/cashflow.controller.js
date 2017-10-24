myapp.controller('cashflow', function($scope, $rootScope, $state, $http, restful){

	if($rootScope.login != 1){
		$state.go('login');
	}else{
		$scope.email= $rootScope.loggedemail;

		var logindata = {
			email : $scope.email,
			apikey : $rootScope.apikey

		}
		//getting balance
		$http.post(restful.apiurl+restful.list.cashflowbal,logindata)
			.success(function(response){
			if(response==false){
				$scope.balance = 0.00;
			}
			else{
				$scope.balance = response[0].total;
			}


		}).error(function(err){


		});

		// getting transactions
		$http.post(restful.apiurl+restful.list.trans,logindata)
			.success(function(response){
			if(response==false){
				$scope.transdata = {}
			}
			else{
				$scope.transdata = response;
			}

		}).error(function(err){


		});

	}

	//save debit
	$scope.savedebit = function(){


		if($scope.descrip && $scope.debitamt){
			var debitdata = {
				email : $scope.email,
				con : 'debit',
				apikey : $rootScope.apikey,
				descrip : $scope.descrip,
				amt : $scope.debitamt

			}

			$http.post(restful.apiurl+restful.list.debit,debitdata)
				.success(function(response){
				if(response=="success"){
					$scope.savesuccess = true;
					$scope.savefail=false;
					
					$scope.amt = undefined;
					$scope.descrip = undefined;
				}
				else{
					$scope.savesuccess = false;
					$scope.savefail=true;

				}


			}).error(function(err){


			});

		}



	}
	
	//save credit
	$scope.savecredit = function(){

		if($scope.descrip && $scope.creditamt){

			var debitdata = {
				email : $scope.email,
				con : 'credit',
				apikey : $rootScope.apikey,
				descrip : $scope.descrip,
				amt : $scope.creditamt*(-1)

			}

			$http.post(restful.apiurl+restful.list.debit,debitdata)
				.success(function(response){
				if(response=="success"){
					$scope.savesuccess = true;
					$scope.savefail=false;
					
					$scope.amt = undefined;
					$scope.descrip = undefined;
				}
				else{
					$scope.savesuccess = false;
					$scope.savefail=true;

				}


			}).error(function(err){


			});



		}

	}




});