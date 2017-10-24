myapp.controller('paper', function($scope, $rootScope, $state, restful){

	if ($rootScope.login != 1){
		$state.go('login');
	}
	$scope.getdetails = function(){

		var dataobj = { email : $scope.data1, pass : $scope.value1 }


		var test = "paper/getpaper";
		
		var res = restful.postdata(test, dataobj);
		console.log(res);
		$scope.urls = res;

	}

});