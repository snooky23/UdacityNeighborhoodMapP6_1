/*this is my locations*/
var locations = [
	{"name": "Arcaffe", "latitude": 32.107476 , "longitude": 34.795951} , 
	{"name": "University","latitude": 32.113314 , "longitude": 34.804388} ,
	{"name": "Basketball","latitude": 32.098755 , "longitude": 34.7878} ,
	{"name": "Running","latitude": 32.107476 , "longitude": 34.795951}
];

$( document ).ready( function() {
	//Google Maps JS
	//Set Map

	function initialize() {
		//set he map accoding to the window height
		var windowViewPort = $( window ).height();
		$("#map").height(windowViewPort - 30);

		var myLatlng = new google.maps.LatLng(32.125192,34.803180);
		var mapOptions = {
			zoom: 15,
			center: myLatlng,
			draggable: false, 
			zoomControl: false, 
			scrollwheel: false, 
			disableDoubleClickZoom: true
		}
		var map = new google.maps.Map(document.getElementById('map'), mapOptions);
		//Callout Content
		// var contentString = 'Some address here..';
		//Set window width + content
		// var infowindow = new google.maps.InfoWindow({
		// 	content: contentString,
		// 	maxWidth: 500
		// });

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
		google.maps.event.addDomListener(window, "resize", initialize);
	}

	google.maps.event.addDomListener(window, 'load', initialize);
});