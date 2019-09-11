var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest", 
		image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	}
];

function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed campgrounds!");
		Comment.remove({}, function(err) {
			if(err){
				console.log(err);
			}
			console.log("Removed comments!");
			
			// Add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if (err){
						console.log(err);
					}else{
						console.log("Added a campground!");
						// Create a comment
						Comment.create(
							{
								text: "This place is great, but I wish there was internet",
								author: "Garrett"		
							}, function(err, comment){
								if(err){
									console.log(err);
								} else {
									campground.comments.push(comment);
									campground.save();
									console.log("Created new comment");
								}
							});
					}
				});
			});
		});
	});
	// Add a few comments
}

module.exports = seedDB;