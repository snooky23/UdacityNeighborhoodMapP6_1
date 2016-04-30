/**
* @description load wikipedia links into a special place in the dom
*/
function loadWiki(place) {

    var $wikiElem = $('#wikipedia-links');
    
    // clear out old data before new request
    $wikiElem.text("");
    
    // act on faliuer after 8 sec
    var wikiReqTimeout = setTimeout(function(){
        $wikiElem.append('failed to get wiki resources');
    }, 8000);

    // Load wikipedia api
    $.ajax( {
        url: getWikipediaUrl('tel-aviv'),
        dataType: 'jsonp',
        success: function(res) {
           // do something with data
           var aritcleList = res[1];

           for(var i=0, len = aritcleList.length; i<len ; i++){
                var articleStr = aritcleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
           }

           clearTimeout(wikiReqTimeout);
        }
    } );

    return false;
};

/**
* @description get the wikipedia request url
* @constructor
* @param {string} city - a city to search
*/
function getWikipediaUrl(city){
    return 'https://en.wikipedia.org/w/api.php?&action=opensearch&search=' + city + '&format=json&callback=wikiCallback';
}

$( document ).ready( function() {
    loadWiki();
});