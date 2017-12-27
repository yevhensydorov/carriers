var express = require("express"),
		app = express(),
		bodyParser = require("body-parser"),
		mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/carriers");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//SCHEMA SETUP
var carrierSchema = new mongoose.Schema({
	name: String,
	image: String,
	price: Number,
	leavingDate: String
});

var Carrier = mongoose.model("Carrier", carrierSchema);

// Carrier.create({
// 	name: "twoPoundDeliver",
// 	image: "https://farm7.staticflickr.com/6115/6307194649_6ecbc7276b.jpg",
// 	price: 2,
// 	leavingDate: "2017-10-25"
// }, function(err, carrier){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("Newly created carrier: ");
// 		console.log(carrier);
// 	}
// });

// var carriers = [
// 	{name: "onePoundDeliver", image: "https://farm3.staticflickr.com/2815/33983473586_22f7e76511.jpg", price: 1, leavingDate: "2017-11-15"},
// 	{name: "twoPoundDeliver", image: "https://farm7.staticflickr.com/6115/6307194649_6ecbc7276b.jpg", price: 2, leavingDate: "2017-10-25"},
// 	{name: "threePoundDeliver", image: "https://farm1.staticflickr.com/147/410335673_260189d73f.jpg", price: 3, leavingDate: "2017-09-05"},
// ];

app.get("/", function(req, res){
	res.render("home");
});

app.get("/carriers", function(req, res){
	Carrier.find({}, function(err, allCarriers){
		if(err){
			console.log(err);
		} else {
			res.render("carriers", {carriers: allCarriers})
		}
	});
	//OLD RENDER FROM ARRAY res.render("carriers", {carriers: carriers});
});

app.post("/carriers", function(req, res){
	//get data from form and add to carriers array
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var leavingDate = req.body.leavingDate;
	var newCarrier = {name: name, image: image, price: price, leavingDate: leavingDate}
	//Create a new Carrier and save to DB
	Carrier.create(newCarrier, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/carriers");
		}
	});
	//OLD ADD TO ARRAY carriers.push(newCarrier);
	// //redirect back to carriers page
	// res.redirect("/carriers");
});

app.get("/carriers/new", function(req, res){
	res.render("new");
});

app.listen(5000, function(){
	console.log("The Carriers server has started");
});