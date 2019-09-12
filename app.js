var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	flash = require("connect-flash"),
	seedDB = require("./seeds"),
	methodOverride = require("method-override");

// Requiring Routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

console.log(process.env.DATABASEURL);

// mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true });
mongoose.connect("mongodb+srv://webdever:Adidas0118@cluster0-ravqc.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true, 
	useCreateIndex: true
}).then(() => {
	console.log("Connected to DB!");
}).catch (err => {
	console.log("Error:", err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); // Seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "YELP CAMP FOR THE WIN!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("YelpCamp server started..");
});
