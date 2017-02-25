(function() {
    angular.module('myapp', ['ngRoute','ngMaterial'])
    .config(function($mdThemingProvider,$routeProvider,$locationProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('light-blue');

	  $mdThemingProvider.theme('altTheme')
	  	.dark()
	  	.primaryPalette('light-blue');
	  $routeProvider
	    .when("/", {
	        templateUrl : "main.html"
	    })
	    .when("/places", {
	        templateUrl : "places.html"
	    });
	  $locationProvider.html5Mode(true);

	})

    .controller("HomeCtrl", function($scope, $rootScope, $location, $http) {
    	this.minDate = new Date();
    	this.budget = 500;
    	this.lat;
    	this.lon;
    	$scope.$on('lat', function(response) {
			this.lat = response;
		});
		$scope.$on('lon', function(response) {
			this.lon = response;
		});
  		$scope.gPlace;
  		this.submit = function(){
  			console.log("budget: "+this.budget);
  			console.log($rootScope.details);
  			$http({
			  method: 'GET',
			  url: 'http://iatageo.com/getCode/'+$rootScope.details[3]+'/'+$rootScope.details[4]
			}).then(function successCallback(response) {
				   console.log(response);
				   var iata = response.data.IATA;
				   console.log(iata);

				   $http({
					  method: 'GET',
					  url: '/api/sendTravelInformation'
					}).then(function successCallback(response) {
						   
					}, function errorCallback(response) {

					});

			  }, function errorCallback(response) {
			   		console.log(response);
			  });
  		};
	})

	.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
	    $scope.close = function () {
	      // Component lookup should always be available since we are not using `ng-if`
	      $mdSidenav('left').close()
	        .then(function () {
	          $log.debug("close LEFT is done");
	        });

	    };
  	})

	.directive('googleplace', [ function() {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: ['(cities)'],
                componentRestrictions: {}
            };

            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                var geoComponents = scope.gPlace.getPlace();
                var latitude = geoComponents.geometry.location.lat();
                var longitude = geoComponents.geometry.location.lng();
                var addressComponents = geoComponents.address_components;

                addressComponents = addressComponents.filter(function(component){
                    switch (component.types[0]) {
                        case "locality": // city
                            return true;
                        case "administrative_area_level_1": // state
                            return true;
                        case "country": // country
                            return true;
                        default:
                            return false;
                    }
                }).map(function(obj) {
                    return obj.long_name;
                });

                addressComponents.push(latitude, longitude);

                scope.$apply(function() {
                    scope.$root.details = addressComponents; // array containing each location component
                    model.$setViewValue(element.val());
                });
            });
        }
    };
	}]);
	

})();
