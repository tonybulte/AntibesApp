(function () {
var directionsService = new google.maps.DirectionsService(),
	directionsDisplay = new google.maps.DirectionsRenderer(),
	createMap = function (start) {
		var travel = {
				origin : (start.coords)? new google.maps.LatLng(start.lat, start.lng) : start.address,
				destination : "Antibes, France",
				travelMode : google.maps.DirectionsTravelMode.DRIVING
				// Exchanging DRIVING to WALKING above can prove quite amusing :-)
			},
			mapOptions = {
				zoom: 10,
				// Default view: downtown Stockholm

				center : new google.maps.LatLng(43.5822815,7.1048475),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

		map = new google.maps.Map(document.getElementById("map"), mapOptions);
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById("map-directions"));
		directionsService.route(travel, function(result, status) {
			if (status === google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
			}
		});
	};

	// Check for geolocation support	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
				// Success!
				createMap({
					coords : true,
					lat : position.coords.latitude,
					lng : position.coords.longitude
				});
			}, 
			function () {
				// Gelocation fallback: Defaults to Stockholm, Sweden
				createMap({
					coords : false,
					address : "Antibes, France"
				});
			}
		);
	}
	else {
		// No geolocation fallback: Defaults to Lisbon, Portugal
		createMap({
			coords : false,
			address : "Antibes, France"
		});
	}
})();
