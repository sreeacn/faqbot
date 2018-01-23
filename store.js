var Promise = require('bluebird');

var ReviewsOptions = [
    '“Very stylish, great stay, great staff”',
    '“good hotel awful meals”',
    '“Need more attention to little things”',
    '“Lovely small hotel ideally situated to explore the area.”',
    '“Positive surprise”',
    '“Beautiful suite and resort”'];


// Code starts
var key = "AIzaSyApmQaPNP838cZOeIGCibeq9cmAn7Tv8aQ";
  var location = "40.7127,-74.0059";
  var radius = 500;
  var sensor = false;
  var types = "restaurant";
  var keyword = "fast";

  var https = require('https');

/*	var url1 = "https://maps.googleapis.com/maps/api/geocode/json?address=Dublin&key=AIzaSyC32xjSB9u0NsivbW6bA-qy6o7spmVko_U";
			https.get(url1, function(response) {
		    var body ='';
		    response.on('data', function(chunk) {
		      body += chunk;
				
			
		    });
				
			response.on('end', function() {
		      var places = JSON.parse(body);
				console.log(places.results[0].geometry.location);
				location = places.results[0].geometry.location.lat+","+places.results[0].geometry.location.lng;
			});
				
			});

*/


  
/*  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + key + "&location=" + location + "&radius=" + radius + "&sensor=" + sensor + "&types=" + types + "&keyword=" + keyword;
    console.log(url);
  
  https.get(url, function(response) {
    var body ='';
    response.on('data', function(chunk) {
      body += chunk;
    });
  
	 response.on('end', function() {
      var places = JSON.parse(body);
      var locations = places.results;
      var randLoc = locations[Math.floor(Math.random() * locations.length)];
	console.log(randLoc.geometry.location);
		   console.log(">>>>>>>>>>>>>>>>>>>>>>");
		   //console.log(locations[0].geometry.location);
		 console.log(locations[0].name)
     // res.json(randLoc);
    });
  });   */

// Code ends





module.exports = {
    searchHotels: function (destination) {
        return new Promise(function (resolve) {
			
			console.log(">>>>  Searching for hotels",destination);
			var hotels =[];
			var geocode="";
			
			// Geocoding from the destination
			var url1 = "https://maps.googleapis.com/maps/api/geocode/json?address="+destination+"&key=AIzaSyC32xjSB9u0NsivbW6bA-qy6o7spmVko_U";
			https.get(url1, function(response) {
		    var body ='';
		    response.on('data', function(chunk) {
		      body += chunk;
				
			
		    });
				
			response.on('end', function() {
		      var places = JSON.parse(body);
				console.log(places.results[0].geometry.location);
				geocode = places.results[0].geometry.location.lat+","+places.results[0].geometry.location.lng;
				
				console.log(">>>",geocode);
				var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + key + "&location=" + geocode + "&radius=" + radius + "&sensor=" + sensor + "&types=" + types + "&keyword=" + keyword;
			
			https.get(url, function(response) {
		    var body ='';
		    response.on('data', function(chunk) {
		      body += chunk;
		    });
				
			
				
			response.on('end', function() {
				
				
		      var places = JSON.parse(body);
		      var locations = places.results;
		      var randLoc = locations[Math.floor(Math.random() * locations.length)];
			console.log(randLoc.geometry.location);
				   console.log(">>>>>>>>>>>>>>>>>>>>>>");
				console.log(locations[0].name);
				console.log(locations[1].name);
				
				for (var i = 0; i < locations.length; i++) {
				   hotels.push({
				   	name: locations[i].name,
					image: locations[i].icon,
					location: destination,
                    rating: Math.ceil(Math.random() * 5),
                    numberOfReviews: Math.floor(Math.random() * 5000) + 1,
                    priceStarting: Math.floor(Math.random() * 450) + 80
				   })
				}
				hotels.sort(function (a, b) { return a.priceStarting - b.priceStarting; });

	            // complete promise with a timer to simulate async response
	            setTimeout(function () { resolve(hotels); }, 1000);
				
				
		     // res.json(randLoc);
		    });
				
				
			});
				
			});
				
				
				
			});
				
			// Fetching the hotels in the destination
			

            // Filling the hotels results manually just for demo purposes
           /* var hotels = [];
            for (var i = 1; i <= 5; i++) {
                hotels.push({
                    name: destination + ' Hotel ' + i,
                    location: destination,
                    rating: Math.ceil(Math.random() * 5),
                    numberOfReviews: Math.floor(Math.random() * 5000) + 1,
                    priceStarting: Math.floor(Math.random() * 450) + 80,
                    image: 'https://placeholdit.imgix.net/~text?txtsize=35&txt=Hotel+' + i + '&w=500&h=260'
                });
            } */

            
        });
    },

    searchHotelReviews: function (hotelName) {
        return new Promise(function (resolve) {

            // Filling the review results manually just for demo purposes
            var reviews = [];
            for (var i = 0; i < 5; i++) {
                reviews.push({
                    title: ReviewsOptions[Math.floor(Math.random() * ReviewsOptions.length)],
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris odio magna, sodales vel ligula sit amet, vulputate vehicula velit. Nulla quis consectetur neque, sed commodo metus.',
                    image: 'https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif'
                });
            }

            // complete promise with a timer to simulate async response
            setTimeout(function () { resolve(reviews); }, 1000);
        });
    }
};