var Promise = require('bluebird');

// Code starts
var key = "AIzaSyApmQaPNP838cZOeIGCibeq9cmAn7Tv8aQ";

var https = require('https');


module.exports = {
    searchHotels: function (country,session) {
        return new Promise(function (resolve) {
            
             var resp = "";
              //---- Start - Consuming google api for geocoding & timezonedb for getting time.
        console.log(">>>>>> Country: ",country)
        var url1 = "https://maps.googleapis.com/maps/api/geocode/json?address="+country.entity+"&key=AIzaSyC32xjSB9u0NsivbW6bA-qy6o7spmVko_U";
        console.log("URL>>:",url1);
        https.get(url1, function(response) {
    		console.log("<<<Body "+resp);
    		response.on('data', function(data) {
                resp += data;
    				
    			
    		});
				
			response.on('end', function() {
                var places = JSON.parse(resp);
				console.log(places.results[0].geometry.location);
				var lat = places.results[0].geometry.location.lat;
                var lng = places.results[0].geometry.location.lng;
				console.log(">> Loc >>",places.results[0].geometry.location);
				var url = "https://api.timezonedb.com/v2/get-time-zone?key=E3MNOE29SUJD&format=json&by=position&lat="+lat+"&lng="+lng;
			
        		https.get(url, function(response) {
                    var body ='';
                    response.on('data', function(chunk) {
            		      body += chunk;
            		});
                    response.on('end', function() {
                        var timeZone = JSON.parse(body);
                        var time = timeZone.formatted;
                        console.log(">>>>>>>> timezone>",time);
                         session.endDialog("Current time in "+country.entity+" is "+time);
                    });
                });
            });
        });
        });
    }
};