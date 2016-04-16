var Location = function(data) {
	this.name = ko.observable(data.name);
	this.latitude = ko.observable(data.latitude);
	this.longitude = ko.observable(data.longitude)
}

var ViewModel = function() {
	var self = this;
	this.locationList = ko.observableArray([]);
	this.filter = ko.observable("");

	//Get locations from map.js
	locations.forEach(function(locationItem){
		self.locationList.push(new Location(locationItem));
	});
	
	//Bind search filter with the listview component
	this.visiblePlaces = ko.computed(function(){
       return this.locationList().filter(function(place){
           if(!self.filter() || place.name().toLowerCase().indexOf(self.filter().toLowerCase()) !== -1)
             return place;
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

$( document ).ready( function() {
   ko.applyBindings(new ViewModel());
});