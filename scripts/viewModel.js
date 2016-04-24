var Location = function(data) {
	this.name = ko.observable(data.name);
	this.latitude = ko.observable(data.latitude);
	this.longitude = ko.observable(data.longitude);
	this.marker = new google.maps.Marker({
	    position: {lat: this.latitude(), lng: this.longitude()},
	    map: map,
	    title: location.name
	});
}

var ViewModel = function() {
	var self = this;
	this.locationList = ko.observableArray([]);
	this.filter = ko.observable("");
	this.map = ko.observable(map);

	//Get locations from map.js
	locations.forEach(function(locationItem){
		self.locationList.push(new Location(locationItem));
	});
	
	//Bind search filter with the listview component
	this.visiblePlaces = ko.computed(function(){
       return this.locationList().filter(function(place){
           if(!self.filter() || place.name().toLowerCase().indexOf(self.filter().toLowerCase()) !== -1) {
           		//add marker to map
           		console.log("place: " + place);
           		console.dir(place);
           		setMarkerOnMap(place.marker,true);
           		return place;
           } else {
           		//remove marker from map
           		setMarkerOnMap(place.marker,false);
           }
       });
   	},this);  

   	//point to the first location in the list
	this.currentLocation = ko.observable(this.visiblePlaces()[0]);

	//Support clicked location event
	this.setLocation = function(clickedLocation) {
		self.currentLocation(clickedLocation);
		console.log(self.currentLocation().name());
	};
}

// $( document ).ready( function() {
//    ko.applyBindings(new ViewModel());
// });