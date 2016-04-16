var Location = function(data) {
	this.name = ko.observable(data.name);
	this.latitude = ko.observable(data.latitude);
	this.longitude = ko.observable(data.longitude)
}

var ViewModel = function() {
	var self = this;
	this.locationList = ko.observableArray([]);
	//iterate over location list from map.js
	locations.forEach(function(locationItem){
		self.locationList.push(new Location(locationItem));
	});
	//point to the first location in the list
	this.currentLocation = ko.observable(this.locationList()[0]);

}

$( document ).ready( function() {
   ko.applyBindings(new ViewModel());
});