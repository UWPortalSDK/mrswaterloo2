angular.module('portalApp')

// Widget controller - runs every time widget is shown
.controller('mrswaterloo2Ctrl', ['$scope', '$http', '$q', 'mrswaterloo2Factory', function ($scope, $http, $q, mrswaterloo2Factory) {

    // Import variables and functions from service
    $scope.data = mrswaterloo2Factory.data;
	$scope.items = mrswaterloo2Factory.items;
	$scope.detailsItem = mrswaterloo2Factory.detailsItem;
    
    
    $scope.arr = mrswaterloo2Factory.resultClass;
	$scope.arrtime = mrswaterloo2Factory.resultTime;
    // initialize the service
    mrswaterloo2Factory.init($scope);

	// Show main view in the first column
	$scope.portalHelpers.showView('mrswaterloo2Main.html', 1);
	
	// This function gets called when user clicks an item in the list
	$scope.showDetails = function(item){
		// Make the item that user clicked available to the template
		$scope.detailsItem.value = item;		
		$scope.portalHelpers.showView('mrswaterloo2Details.html', 2);
	}
    
    $scope.getJSON = mrswaterloo2Factory.getJSON;
    $scope.getCourse = mrswaterloo2Factory.getCourse;
    
   //document.getElementById("time").innerHTML = "helllllllllllllo";

	
}])
// Factory maintains the state of the widget
.factory('mrswaterloo2Factory', ['$http', '$rootScope', '$filter', '$q', function ($http, $rootScope, $filter, $q) {
		
	var initialized = {value: false};

	// Your variable declarations
	var data = {value: null};
	var detailsItem = {value:null};
	// mock data
	var items = {value: null};
	
	var init = function ($scope) {
		if (initialized.value)
			return;
		
		initialized.value = true;

		// Place your init code here:
		data.value={message:"Welcome to Mrs Waterloo"};
		items.value = [
			{
				title:'Item 1',
				tags: ['tag A', 'tag B', 'tag C'],
				details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
			},
			{
				title:'Item 2',
				tags: ['tag D', 'tag E', 'tag F'],
				details: 'Mauris cursus, sapien et malesuada ultrices, purus sapien iaculis tellus, quis semper magna est at leo.'
			},
			{
				title:'Item 3',
				tags: ['tag A', 'tag H'],
				details: 'Donec id quam eu odio feugiat sagittis. Duis a tempus neque. Praesent elementum quis ante quis commodo. Sed tincidunt aliquet dolor sit amet laoreet. '
			},
			{
				title:'Item 4',
				tags: ['tag I'],
				details: 'Proin sem quam, rutrum id ante id, scelerisque tempor quam. Curabitur pharetra turpis at sem placerat, non vehicula ligula tincidunt.'
			},
			{
				title:'Item 5',
				tags: ['tag C', 'tag K', 'tag B'],
				details: 'Mauris nec ultricies metus. Cras et dictum justo. Nam a ullamcorper dolor. Cras fringilla metus vel facilisis vehicula.'
			},
			{
				title:'Item 6',
				tags: ['tag A', 'tag B', 'tag C'],
				details: 'Curabitur scelerisque lorem risus, in luctus orci hendrerit non. Praesent quis tellus dapibus dolor consectetur volutpat.'
			}
		];
	}
    
    var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.responseType = "json";
        xhr.onload = function() {
          var status = xhr.status;	
          if (status == 200) {
            callback(null, xhr.response);
          } else {
            callback(status);
          }
        };
        xhr.send();
	};
    
    function getCourse() {
        var apiKey = "495cd8d2ca5f93e44f1171f5b58e59a0";
        var course = document.getElementById("course");
        var code = document.getElementById("code");
        var url = 'https://api.uwaterloo.ca/v2/courses/'+course.value+'/'+code.value+'/schedule.json?key='+apiKey;
        getJSON(url, function(error,data){
             traverse(data);
            $rootScope.refresh();
             //document.getElementById("time").innerHTML = data;
         });
	};
    
    var resultClass = []
    var resultTime = []
    
    function traverse(data) {
        var array = data["data"];
        for (var i = 0;i < array.length;++i) {
            resultClass[i] = array[i]["classes"][0]["location"]["building"] + " " + array[i]["classes"][0]["location"]["room"];
        }
        for (var i = 0;i < array.length;++i) {
            resultTime[i] = array[i]["classes"][0]["date"]["weekdays"] + "-" + array[i]["classes"][0]["date"]["start_time"] + "-" + array[i]["classes"][0]["date"]["end_time"];
        }
        //document.getElementById("time").innerHTML = resultClass;
        //document.getElementById("time").innerHTML = resultTime;
        //return resultClass;
	}


	// Expose init(), and variables
	return {
		init: init,
		data: data,
		detailsItem: detailsItem,
		items: items,
        getJSON: getJSON,
        getCourse: getCourse,
        resultClass: resultClass,
        resultTime: resultTime,
        traverse: traverse
	};

}])
// Custom directive example
.directive('mrswaterloo2DirectiveName', ['$http', function ($http) {
	return {
		link: function (scope, el, attrs) {

		}
	};
}])
// Custom filter example
.filter('mrswaterloo2FilterName', function () {
	return function (input, arg1, arg2) {
		// Filter your output here by iterating over input elements
		var output = input;
		return output;
	}
});


