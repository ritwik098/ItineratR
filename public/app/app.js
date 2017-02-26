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
	    })
	    .when("/place", {
	        templateUrl : "place.html"
	    });
	  $locationProvider.html5Mode(true);

	})

    .controller("HomeCtrl", function($scope, $rootScope, $location, $http, $mdDialog) {
    	this.minDate = new Date();
    	this.budget = 500;
    	$scope.loading = false;
  		$scope.gPlace;

  		this.submit = function(){
  			$scope.loading = true;
  			console.log($rootScope.details);
  			var req = {
  					"origin": $rootScope.details[0],
				   	"departure": this.startDate.toISOString().substring(0, 10),
				   	"duration": (this.endDate - this.startDate)/86400000,
				   	"max_price": this.budget
				   };
			console.log(req);

			$http.post('/api/sendTravelInformation', req).
				    success(function(data, status, headers, config) {
				        // this callback will be called asynchronously
				        // when the response is available
				        $scope.loading = false;
				        $location.path("/places");
				        $rootScope.places = data;
				        console.log(data);
				      }).
				      error(function(data, status, headers, config) {
				        	$scope.loading = false;
				        	$mdDialog.show(
						      $mdDialog.alert()
						        .parent(angular.element(document.querySelector('#popupContainer')))
						        .clickOutsideToClose(true)
						        .title('Oops! :/')
						        .textContent('We couldn\'t find locations awesome enough for you! Try searching a location nearby to airport maybe?')
						        .ok('Okay!')
						    );

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

	.controller('PlacesCtrl', function(NgMap, $scope, $rootScope, $location) {
		$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQHc8aZoBXkQumkO4xpqYxklRj2RG9Lb8";
		
		this.cities = $rootScope.places;
		if($rootScope.places.length < 1){
			$location.path("/");
		}
		this.click = function(city) {console.log(city);};
	  NgMap.getMap().then(function(map) {
	    console.log(map.getCenter());
	    console.log('markers', map.markers);
	    console.log('shapes', map.shapes);
	  });
	})

	.controller('PlaceCtrl', function($scope, $rootScope, $location) {
		
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
