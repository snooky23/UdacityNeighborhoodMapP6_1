# UdacityNeighborhoodMapP6_1

Github pages link:
http://snooky23.github.io/UdacityNeighborhoodMapP6_1 

All application components render on-screen in a responsive manner.
The app include 3 sub layout: 
1. map
2. locations list-view
3. wikipidia links about my city, tel-aviv

There is a differance between phone, tablets and pc layouts.
On phone, tablets (less than 600px width) you will see an hamburger button which will show you all location and serach edittext.


Tasks requerments:

Filter Locations via Text Input: 
Includes a text input field that filters the map markers and list items to locations matching the text input. Filter function runs error-free.

List View:
A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied.
Clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g. bouncing, color change.)
List functionality is responsive and runs error free.

Map and Markers:
Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied.
Clicking a marker displays unique information about a location in either an infoWindow or DOM element.
Markers should animate when clicked (e.g. bouncing, color change.)

Proper Use of Knockout:
Code is properly separated based upon Knockout best practices (follow an MVVM pattern, avoid updating the DOM manually with jQuery or JS, use observables rather than forcing refreshes manually, etc). Knockout should not be used to handle the Google Map API.

There are at least 5 locations hard-coded in the model.

Asynchronous API Requests:
Application utilizes the Google Maps API and at least one non-Google third-party API.
All data requests are retrieved in an asynchronous manner.

Error Handling:
Data requests that fail are handled gracefully using common fallback techniques (i.e. AJAX error or fail methods). 'Gracefully' means the user isn’t left wondering why a component isn’t working. If an API doesn’t load there should be some visible indication on the page (an alert box is ok) that it didn’t load. Note: You do not need to handle cases where the user goes offline.

