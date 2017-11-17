var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

var carriers = [
	{name: "onePoundDeliver", image: "https://farm3.staticflickr.com/2815/33983473586_22f7e76511.jpg", price: 1, leavingDate: "2017-11-15"},
	{name: "twoPoundDeliver", image: "https://farm7.staticflickr.com/6115/6307194649_6ecbc7276b.jpg", price: 2, leavingDate: "2017-10-25"},
	{name: "threePoundDeliver", image: "https://farm1.staticflickr.com/147/410335673_260189d73f.jpg", price: 3, leavingDate: "2017-09-05"},
];

app.get("/", function(req, res){
	res.render("home");
});

app.get("/carriers", function(req, res){
	res.render("carriers", {carriers: carriers});
});

app.listen(4000, function(){
	console.log("The Carriers server has started");
});