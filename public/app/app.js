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

	.factory('p', ['$http', function ($http) {
	    return {
	      getImage: function (city) {

	        var promise = $http({method:'POST', url:'/api/getImage', data: {"city":city}})
			    .success(function (data, status, headers, config) {
			      return data.url;
			    })
			    .error(function (data, status, headers, config) {
			      return {"status": false};
			    });

			  return promise;
	      }
	    };
	  }])

    .controller("HomeCtrl", function($scope, $rootScope, $location, $http, $mdDialog) {
    	this.minDate = new Date();
    	this.budget = 1000;
    	$scope.loading = false;
  		$scope.gPlace;

  		this.submit = function(){
  			$scope.loading = true;
  			console.log($rootScope.details);
  			var req = {
  					"origin": $rootScope.details[0],
				   	"departure": this.startDate.toISOString().substring(0, 10),
				   	"duration": Math.round((this.endDate - this.startDate)/86400000),
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

	.controller('PlacesCtrl', function(NgMap, $scope, $rootScope, $location, p) {
		$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQHc8aZoBXkQumkO4xpqYxklRj2RG9Lb8";
		$scope.cities = $rootScope.places;
		/*for (let city of $rootScope.places){
			(function(city) {
				 return function() {
					p.getImage(city.city).then(function(promise) {
						console.log(promise);
						city.imgurl = promise.data.url;
						$scope.cities.push(city);
					});	
				};	
			})(city);	
		}*/
		if($rootScope.places.length < 1){
			$location.path("/");
		}
		this.click = function(city) {console.log(city);};

		this.goToPlace= function(city){
			console.log(city);
			$rootScope.city = city;
			$location.path("/place");
		};
	  NgMap.getMap().then(function(map) {
	    console.log(map.getCenter());
	    console.log('markers', map.markers);
	    console.log('shapes', map.shapes);
	  });
	})

	.controller('PlaceCtrl', function($scope, $rootScope, $location, $http) {
		this.city = $rootScope.city;
		this.depDate = new Date($rootScope.city.departure_date).toLocaleDateString();
		this.returnDate = new Date($rootScope.city.return_date).toLocaleDateString();
		this.price = Math.round($rootScope.city.price);
		$scope.bgUrl;
		var req = {
			"city" : this.city.city
		};

		if(this.city.country === "IN"){
			req.city = "India";
		}

		$http.post('/api/getImage', req).
				    success(function(data, status, headers, config) {
				        // this callback will be called asynchronously
				        // when the response is available
				        $scope.bgUrl = data.url;
				        var myEl = angular.element( document.querySelector( '#bgcontainer' ) );
							myEl.css('background-image','url("'+data.url+'")');
				      }).
				      error(function(data, status, headers, config) {
				        	console.log(data);
				      });
		this.airline = $rootScope.city.airline;
		this.destCode = $rootScope.city.destination;
		this.deptCode = $rootScope.city.departingCode;

		req.city = $rootScope.city.city;
		req.startDate = new Date($rootScope.city.departure_date);
		req.endDate = new Date($rootScope.city.return_date);
		$scope.itinerary;
		$http.post('/api/itinerary/generate', req).
				    success(function(data, status, headers, config) {
				        // this callback will be called asynchronously
				        // when the response is available
				        $scope.itinerary = data;
				        console.log(data);
				      }).
				      error(function(data, status, headers, config) {
				        	console.log(data);
				        	console.log(req);
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
