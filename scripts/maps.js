/*Global variables and methods*/
var map;
var infowindow;
var currentMarker;

var locations = [
	{"name": "Arcaffe", "latitude": 32.107476 , "longitude": 34.795951, "info": "Arcaffe coffee"} , 
	{"name": "University","latitude": 32.113314 , "longitude": 34.804388, "info": "Tel-Aviv University"} ,
	{"name": "Basketball","latitude": 32.098755 , "longitude": 34.7878, "info": "Sportek baseball field"} ,
	{"name": "Running","latitude": 32.0964825 , "longitude": 34.773273700000004, "info": "Yarkon park"},
	{"name": "Eretz Eir","latitude": 32.10997339999999 , "longitude": 34.842550200000005, "info": "Eretz ir pub"},
];

var isBindingApplied = false;

/**
* @description the method show or remove markers from google map
* @param {string} marker - a relavent marker
* @param {string} showState - true to show, false to remove from the map
*/
function animateCurrentMarker(aMarker) {
	if(currentMarker != undefined) {
		//set back to red marker
		currentMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
		currentMarker.setAnimation(null);
	} 
	//get the new marker and set it green
	currentMarker = aMarker;
	currentMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
	currentMarker.setAnimation(google.maps.Animation.BOUNCE);
	//stop jumping animation after 2 sec
	window.setTimeout(function(){
		currentMarker.setAnimation(null);
	}, 2000);
}

function initialize() {
	//set he map accoding to the window height
	var windowViewPort = $( window ).height();
	$("#map").height(windowViewPort - 30);

	var myLatlng = new google.maps.LatLng(32.113314,34.804388);
	var mapOptions = {
		zoom: 13,
		center: myLatlng,
		disableDoubleClickZoom: true,
		scrollwheel: false
	};
	
	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	//Callout Content
	var contentString = '';
	//Set window width + content
	infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 500
	});

	//initialize model view after map is avilable
	if (!isBindingApplied) {
		ko.applyBindings(new ViewModel());
		isBindingApplied = true;
	}
}

function googleError() {
	alert("Couldn't upload google map, please contact the administrator :_(");
}