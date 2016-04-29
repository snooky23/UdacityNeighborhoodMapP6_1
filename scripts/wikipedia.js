function loadWiki() {

    var $wikiElem = $('#wikipedia-links');
    
    // clear out old data before new request
    $wikiElem.text("");
    
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

function getWikipediaUrl(city){
    return 'https://en.wikipedia.org/w/api.php?&action=opensearch&search=' + city + '&format=json&callback=wikiCallback';
}

$( document ).ready( function() {
    loadWiki();
});