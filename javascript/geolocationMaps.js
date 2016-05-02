/**
 *@author John Stahnke 
 */

//I saw this way of handling controls and jquery
var button = jQuery('#submitText');

//input divs
var inputLongitude;
var inputLattitude;
var inputZoom;

var locationLongitude;
var locationLattitude;

//result divs
var txtOutputLongitude = jQuery('.longitude');
var txtOutputLattitude = jQuery('.lattitude');
var txtOutputLocation = jQuery('.location');
var map = jQuery('#map');

//check if a valid input
var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;

button.click(function(e){
	
	e.preventDefault();
	//get values if they exist from input text boxes
	inputLongitude = $('#txtLongitude').val();
	inputLattitude = $('#txtLattitude').val();
	inputZoom = $('#txtZoom').val();
	

	
	//check to see if browser supports geolocation
	//if it does call foundLocation if not call nosuchLocation
	if(navigator.geolocation){
		//do a check for manual or gps/ip lookup
		if((numberRegex.test(inputLongitude))&& (numberRegex.test(inputLattitude))&&(numberRegex.test(inputZoom))){
			
			exportPosition(inputLongitude, inputLattitude, inputZoom);
		}
		//Automatically look up using GPS or IP
		else{
			//if no data in manual search then get location from gps or ip
			navigator.geolocation.getCurrentPosition(exportPosition, errorPosition);
			//can I get the lattitude and longitude and set to a position?
			latitude = position.coords.latitude;
    		longitude  = position.coords.longitude;
    		zoom = 11;
    		exportPosition(longitude, lattitude, zoom)
		}

	}
	//if it doesn't give alert drop out
	else{
		alert('Sorry your browser doesn\'t support Geolocation API');
	}
});

function errorPosition() {                  
    alert('Sorry couldn\'t find your location');                 
    pretext.show();         
}

function exportPosition(latitude, longitude, zoom) {
 
    // Get the geolocation properties and set them as variables

    
 	//Use the url to get the location a user manually puts in.
    // Insert the google maps iframe and change the location using the variables returned from the API
    mapOutput.html('<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.co.uk/?ie=UTF8&amp;ll='+latitude+','+longitude+'&amp;spn=0.332359,0.617294&amp;t=m&amp;z='+zoom+'&amp;output=embed"></iframe>');
    //jQuery('#map2').html('<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x400&center='+latitude+','+longitude+'&zoom='+zoom+'&markers=color:yellow|'+latitude+','+longitude+'" />')


    
    //Ajax function
    //Make a call to the Google maps api to get the name of the location
    jQuery.ajax({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true',
      type: 'POST',
      dataType: 'json',
      success: function(data) {
        //If Successful add the data to the 'location' div
     	txtOutputLocation.html('Location: '+data.results[0].address_components[2].long_name);
      },
      error: function(xhr, textStatus, errorThrown) {
             errorPosition();
      }
    });
     
}
