(function() {
    angular.module('myapp', ['ngRoute','ngMaterial', 'ngMap'])
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

	.controller('PlacesCtrl', function(NgMap, $scope) {
		$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQHc8aZoBXkQumkO4xpqYxklRj2RG9Lb8";
		this.cities = [
		{ 
		destination: 'SLC',
		 departure_date: '2017-05-03',
		 return_date: '2017-05-07',
		 price: '222.40',
		 airline: 'DL',
		 city: 'Salt Lake City',
		 country: 'US',
		 lat: 40.7767833,
		 lon: -112.0605697
		},
		 { destination: 'SRQ',
		 departure_date: '2017-04-29',
		 return_date: '2017-05-03',
		 price: '223.60',
		 airline: 'DL',
		 city: 'Sarasota',
		 country: 'US',
		 lat: 27.3411408,
		 lon: -82.5688899
		}
		];
		$scope.click = function() {console.log('click')};
	  NgMap.getMap().then(function(map) {
	    console.log(map.getCenter());
	    console.log('markers', map.markers);
	    console.log('shapes', map.shapes);
	  });
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
