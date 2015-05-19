function AppCtrl($scope, $http) {
	

var refresh = function(){
	$http.get('/contactlist').success(function(response){
		console.log('i got the data');	
		$scope.contactlist = response;
		$scope.contact='';
	});
};

refresh();

$scope.addContact = function(){
	console.log($scope.contact);
	$http.post('/contactlist',$scope.contact).success(function(response){
		console.log("recieved");
		refresh();
	});

};

$scope.remove = function(id){
	$http.delete('/contactlist/'+ id).success(function(response) {
		refresh();
	});
};

$scope.edit = function(id){
	$http.get('/contactlist/' + id).success(function(response) {
		$scope.contact =response;
	});
};

$scope.update = function () {
	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
	refresh();
	});
	
};

$scope.deselect = function(){
	$scope.contact= "";
}

}