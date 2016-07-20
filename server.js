"use strict";
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let path = require('path');
let port = process.env.PORT || 8080;
let image = require('./app/routes/image');


//db options
let options = { 
				server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              }; 

//db connection      
mongoose.connect("YOUR_DB_CONNECTION", options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Static files
app.use(express.static(__dirname + '/public'));

app.use(morgan('combined')); //'combined' outputs the Apache style LOGs


//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  


app.route("/image")
	.get(image.getImages)
	.post(image.postImage);
app.route("/image/:id")
	.delete(image.deleteImage);
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, '/public/', 'index.html'));
});

app.listen(port);
console.log("Listening on port " + port);

