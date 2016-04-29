//set click event for hamburger
$(document).ready(function(){ 

	//init state
	var hamburgerClicked = false;

	jQuery("#hamburger").click(function() {
        if(!hamburgerClicked) {
			$("#location_bar").show();
        	hamburgerClicked = true;
        } else {
        	$("#location_bar").hide();
        	hamburgerClicked = false;
        }
	});

	$(window).resize(function(){
		if(!$("#hamburger").is(":visible")) {
			$("#location_bar").show();
		} else {
			if(hamburgerClicked){
				$("#location_bar").show();
			} else {
				$("#location_bar").hide();
			}
		}
	});
});
