module.exports = function Route(app, server){

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/goosedashboard');

mongoose.Promise = global.Promise;
	var GooseSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 3 },
	color: { type: String, required: true, minlength: 3 },
	date: {type: Date, default: Date.now}
}, {timestamps: true});

mongoose.model("Goose", GooseSchema)
var Goose = mongoose.model('Goose');
// crate some fake data
// var goose = new Goose({ name: 'goose bumps', color: 'black' });
	//goose.save(function(err){});

app.get("/", function(req, res){
	Goose.find({}, function(err, results){
		if (err) {
			res.render("index", {err: err})
		}
		else{
			res.render("index", {data: results})
		}
	})
})

app.get("/edit/:id", function (req, res){
	if (req.params.id==="new"){
		var result = [{name:"", id:"new", color:"", date:''}];
		console.log(result)
		res.render("edit", { goosedetail: result });
	}
	else{
	Goose.find({ _id: req.params.id}, function(err, result){
		if (err){
			res.render("edit", {err:err})
		}else{
			
			console.log(result)
			res.render("edit", {goosedetail: result})
		}
		})
	}
})

app.get('/delete/:id', function (req, res){
	Goose.remove({_id: req.params.id}, function(err){
		if (err){
			console.log(err)
		}else{
			res.redirect("/")
		}
	})
})
app.post("/:id", function(req, res){
	var id = req.params.id;
	if (id==="new"){
		var newGoose = new Goose();
		newGoose.name = req.body.name;
		newGoose.color = req.body.color;
		newGoose.save(function (err) {
			if (err) {
				console.log("There was an error with the add");
				res.render("add", { error: err })
			} else {
				res.redirect("/");
			}
		})
	}else{
		console.log(req.body.color, req.body.name)
		Goose.update({ _id: req.params.id }, { name: req.body.name, color: req.body.color }, function (err) {
			if (err) {
				console.log(err);
			}
			else {
				console.log('successful');
				res.redirect('/');
			}
		})
	}

})
app.get("/goosedetail/:id", function(req, res){
	var id = req.params.id;
	Goose.find({_id: id}, function(err, results){
		if (err){
			res.render("/", {err: err});
		}else{
			console.log(results)
			res.render("goosedetail", { goosedetail: results});
		}
	})
})
//////////////////////////////////////////////
}