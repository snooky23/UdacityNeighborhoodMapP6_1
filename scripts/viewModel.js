/**
* @description represnt a location on google map
* @param {number} data - gets a json location object
* @returns {Location}
*/

var Location = function(data) {
	var that = this;
	this.name = ko.observable(data.name);
	this.latitude = ko.observable(data.latitude);
	this.longitude = ko.observable(data.longitude);
	this.info = ko.observable(this.getInfoFromWikipedia(data));
	this.marker = new google.maps.Marker({
	    position: {lat: this.latitude(), lng: this.longitude()},
	    map: map,
	    title: location.name,
	    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
	    animation: google.maps.Animation.DROP
	});

	this.marker.addListener('click', function() {
		animateCurrentMarker(that.marker);
		infowindow.setContent(that.info());
    	infowindow.open(map, that.marker);
  	});
};

/**
* @description hides marker from google map
*/
Location.prototype.hideMarker = function() {
  this.marker.setVisible(false);
};

/**
* @description show marker on google map
*/
Location.prototype.showMarker = function() {
  this.marker.setVisible(true);
};

/**
* @description show marker on google map
*/
Location.prototype.getInfoFromWikipedia = function(data) {
	var that = this;

    var listObject = ko.observable("");
    var initMsg = 
    	'<div id="content">'+ 
			'<div id="siteNotice"> </div>'+
			'<h4 id="firstHeading" class="firstHeading">' + data.name + '</h4>' +
			'<div id="bodyContent">'+ 
				'<p><b>' + data.info +'</b>, wiki links: not yet been computed' +
			'</div>'+
		'</div>';
    var contentString = ko.observable(initMsg);

    // act on faliuer after 5 sec
    var wikiReqTimeout = setTimeout(function(){
        listObject(' not avilable for this location due to server timeout');
        var ans =  
           	'<div id="content">'+ 
				'<div id="siteNotice"> </div>'+
				'<h4 id="firstHeading" class="firstHeading">' + data.name + '</h4>' +
				'<div id="bodyContent">'+ 
					'<p><b>' + data.info +'</b>, wiki links:' + listObject() +
				'</div>'+
			'</div>';

		contentString(ans);
    }, 5000);

    $.ajax( {
        url: 'https://en.wikipedia.org/w/api.php?&action=opensearch&search=' + data.info + '&format=json&callback=wikiCallback',
        dataType: 'jsonp',
        success: function(res) {
        	//clear timeout first
			clearTimeout(wikiReqTimeout);

			// do something with data
			var wikiArticels = "";
			var aritcleList = res[1];
			for(var i=0, len = aritcleList.length; i<len ; i++){
			    var articleStr = aritcleList[i];
			    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
			    wikiArticels =  wikiArticels + '<li><a href="' + url + '">' + articleStr + '</a></li>';
			}

           	if(wikiArticels.length > 0) {
           		listObject('<ul>' + wikiArticels + '</ul>');
           	} else {
           		listObject(' not avilable for this location');
           	}
           	
           	var ans =  
	           	'<div id="content">'+ 
					'<div id="siteNotice"> </div>'+
					'<h4 id="firstHeading" class="firstHeading">' + data.name + '</h4>' +
					'<div id="bodyContent">'+ 
						'<p><b>' + data.info +'</b>, wiki links:' + listObject() +
					'</div>'+
				'</div>';

			contentString(ans);
		    that.info(contentString());
        }
    } );
};
/**
* @description Knockout.js model view
*/
var ViewModel = function() {
	var self = this;
	this.locationList = ko.observableArray([]);
	this.filter = ko.observable("");
	this.map = ko.observable(map);

	//Get location from map.js
	locations.forEach(function(locationItem){
		self.locationList.push(new Location(locationItem));
	});
	
	//Bind search filter with the listview component
	this.visiblePlaces = ko.computed(function(){
       return this.locationList().filter(function(place){
           if(!self.filter() || place.name().toLowerCase().indexOf(self.filter().toLowerCase()) !== -1) {
           		//add marker to map
           		place.showMarker();
           		return place;
           } else {
           		//remove marker from map
           		place.hideMarker();
           }
       });
   	},this);  

   	//point to the first location in the list
	this.currentLocation = ko.observable(this.visiblePlaces()[0]);

	//Support clicked location event
	this.setLocation = function(clickedLocation) {
		self.currentLocation(clickedLocation);
		google.maps.event.trigger(self.currentLocation().marker, 'click');
	};
}