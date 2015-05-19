var express = require ('express');
var app = express();
var mongojs = require ('mongojs');
var db = mongojs('contact',['contact']);
var bodyParser =require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/contactlist', function(req,res) {
	console.log("recieve get request");
	db.contact.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contactlist',function(req, res){
	console.log(req.body);
	db.contact.insert(req.body, function(err,doc){
		res.json(doc);
	});
});
 

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contact.remove({_id: mongojs.ObjectId(id)},function(err,doc) {	
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res) {	
	var id = req.params.id;
	console.log(id);
	db.contact.findOne({_id: mongojs.ObjectId(id)},function(err, doc) {	
		res.json(doc);
	});
});

app.put('/contactlist/:id',function(req, res) {
	var id = req.params.id;
	db.contact.findAndModify({query:{_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true},function (err, doc) {
			res.json(doc);
		});
});

app.listen(7000);