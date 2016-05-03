/**
 *@author John Stahnke 
 */

//I saw this way of handling controls and jquery
var button = jQuery('#submitText');

//input variables
var inputLongitude;
var inputLatitude;
var inputZoom;

//I am using these to hold location data whether from gps/ip or manual input
var locationLongitude;
var locationLatitude;
var locationZoom;

//result divs
var divLongitude = jQuery('.longitude');
var divLatitude = jQuery('.latitude');
var divLocation = jQuery('.location');
var mapOutput = jQuery('#map');

//check if a valid input
var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;

button.click(function(e){
	
	e.preventDefault();
	//get values if they exist from input text boxes
	inputLongitude = $('#inputLongitude').val();
	inputLatitude = $('#inputLatitude').val();
	inputZoom = $('#inputZoom').val();
	

	
	//check to see if browser supports geolocation
	//if it does call foundLocation if not call nosuchLocation
	if(navigator.geolocation){
		//do a check for manual or gps/ip lookup
		if((numberRegex.test(inputLongitude))&& (numberRegex.test(inputLatitude))&&(numberRegex.test(inputZoom))){
			
			exportPosition();
		}
		//Automatically look up using GPS or IP
		else{
			alert('Sorry either you did not input any values or one of them is not a valid number. Using GPS or IP Address');
			//if no data in manual search then get location from gps or ip
			navigator.geolocation.getCurrentPosition(exportPosition, errorPosition);
			//can I get the Latitude and longitude and set to a position?
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

function exportPosition(position) {
 
    // Get the geolocation properties and set them as variables
    if(typeof position != 'undefined'){
    	locationLatitude = position.coords.latitude;
    	locationLongitude  = position.coords.longitude;
    	locationZoom = 11;
    }
	else{
		locationLatitude = inputLattitude;
		locationLongitude = inputLongitude;
		locationZoom = inputZoom;
	}
    
 	//Use the url to get the location a user manually puts in.
    // Insert the google maps iframe and change the location using the variables returned from the API
    
    mapOutput.html('<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.co.uk/?ie=UTF8&amp;ll='+locationLatitude+','+locationLongitude+'&amp;spn=0.332359,0.617294&amp;t=m&amp;z='+locationZoom+'&amp;output=embed"></iframe>');
    //mapOutput.html('<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.co.uk/?ie=UTF8&amp;ll='+latitude+','+longitude+'&amp;spn=0.332359,0.617294&amp;t=m&amp;z=11&amp;output=embed"></iframe>');
    //mapOutput.html('<img src="https://maps.googleapis.com/maps/api/staticmap?size=600x400&center='+latitude+','+longitude+'&zoom='+zoom+'&markers=color:yellow|'+latitude+','+longitude+'" />')

	//output long, lat, location

	divLongitude.html('Longitude: '+locationLongitude);
	divLatitude.html('Lattitude: '+locationLatitude);
    
    //Ajax function
    //Make a call to the Google maps api to get the name of the location
    jQuery.ajax({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+locationLatitude+','+locationLongitude+'&sensor=true',
      type: 'POST',
      dataType: 'json',
      success: function(data) {
        //If Successful add the data to the 'location' div
     	divLocation.html('Location: '+data.results[0].address_components[2].long_name);
      },
      error: function(xhr, textStatus, errorThrown) {
             errorPosition();
      }
    });
    //Clear Values
    $('#inputLongitude').val('');
	$('#inputLattitude').val('');
	$('#inputZoom').val('');
	locationLatitude = 0;
	inputLatitude = 0;
	locationLongitude = 0;
	inputLongitude = 0;
	locationZoom = 0;
	inputZoom = 0;
	
	
	
}
