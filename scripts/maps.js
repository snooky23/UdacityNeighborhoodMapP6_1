/*this is my locations*/
var map;
var infowindow;
var locations = [
	{"name": "Arcaffe", "latitude": 32.107476 , "longitude": 34.795951, "info": "My study place"} , 
	{"name": "University","latitude": 32.113314 , "longitude": 34.804388, "info": "Tel-Aviv University"} ,
	{"name": "Basketball","latitude": 32.098755 , "longitude": 34.7878, "info": "Where I play Basketball"} ,
	{"name": "Running","latitude": 32.0964825 , "longitude": 34.773273700000004, "info": "Where I start running"},
	{"name": "Eretz Eir","latitude": 32.10997339999999 , "longitude": 34.842550200000005, "info": "Where I meet friends"},
];

function setMarkerOnMap(marker,showState) {
	if(showState) {
		marker.setMap(map);
	} else {
		marker.setMap(null);
	}
};

var isBindingApplied = false;

$( document ).ready( function() {
	
	//Google Maps JS
	//Set Map

	function initialize() {
		//set he map accoding to the window height
		var windowViewPort = $( window ).height();
		$("#map").height(windowViewPort - 30);

		var myLatlng = new google.maps.LatLng(32.125192,34.803180);
		var mapOptions = {
			zoom: 13,
			center: myLatlng,
			disableDoubleClickZoom: true,
			scrollwheel: false
		}
		
		map = new google.maps.Map(document.getElementById('map'), mapOptions);

		//Callout Content
		var contentString = '';
		//Set window width + content
		infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 500
		});
		
		// //Add Marker
		// var marker = new google.maps.Marker({
		// 	position: myLatlng,
		// 	map: map,
		// 	icon: imagePath,
		// 	title: 'image title'
		// });

		// google.maps.event.addListener(marker, 'click', function() {
		// 	infowindow.open(map,marker);
		// });

		//Resize Function
		//google.maps.event.addDomListener(window, "resize", initialize);

		if (!isBindingApplied) {
			ko.applyBindings(new ViewModel());
			isBindingApplied = true;
		}
	}

	google.maps.event.addDomListener(window, 'load', initialize);
});