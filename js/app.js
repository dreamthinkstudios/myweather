

angular.module("MyWeatherApp", [])
	.controller("WeatherController", ["$http", function($http) {
		var vm = this;
		var latitude;
		var longitude;
	// Options configuration object for use as a parameter of geolocation.getCurrentPosition.
	// High accuracy: If TRUE, device will use other resources to obtain more accurate results but may be slower to respond and use more power.
	// Timeout: how long the device is allowed to take to obtain a position.
	// maximumAge: indicates the maximum age of a cached position the device is allowed to return. If 0, device cannot use cached positon
	// and fetch a fresh position each time.

	var options = {
  	enableHighAccuracy: true,
  	timeout: 5000,
  	maximumAge: 0
	};

	function success(pos) {
		var coord = pos.coords;
		console.log("Current Latitude: " + coord.latitude);
		console.log("Current Longitude: " + coord.longitude);
		$(".latitude").append(coord.latitude);
		$(".longitude").append(coord.longitude);
		latitude = coord.latitude;
		longitude = coord.longitude;
	}

	function error(err) {
		console.warn("ERROR " + err.code + ": " + err.message);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);

	function getWeather() {
		var url = "https://api.openweathermap.org/data/2.5/weather";
		var	APIKEY = "3cf58566cfe72e04e12f3a19d54e08dd";

		$http({
			method: "GET",
			url: url,
			APPID: APIKEY,
			lat: latitude,
			lon: longitude
		}).then(function successCallback(response) {
			console.log("SUCCESS");
			console.log(response);
		}, function errorCallback(response) {
			console.log("ERROR");
			console.log(response);
		});
	}

	getWeather();

}]);
