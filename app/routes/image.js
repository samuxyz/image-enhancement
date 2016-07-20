"use strict";
let mongoose = require('mongoose');
let Image = require('../models/image');

/*
 * GET /image route to retrieve all the images.
 */
function getImages(req, res) {
	//Query the DB and if no errors, send all the images
	let query = Image.find({});
	query.exec((err, images) => {
		if(err) res.send(err);
		//If no errors, send them back to the client in reverse order
		res.json(images.reverse());
	});
}

/*
 * POST /image to save a new image.
 */
function postImage(req, res) {
	//Creates a new image
	var newImage = new Image(req.body);
	//Save it into the DB.
	newImage.save((err,image) => {
		if(err) {
			res.send(err);
		}
		else { //If no errors, send it back to the client
			res.json({message: "Image successfully added!", image });
		}
	});
}
/*
 * DELETE /image/:id to delete a new image.
 */
function deleteImage(req, res) {
	Image.remove(
		{
			_id: req.params.id
		}, 
		(err, image) => {
			if(err){
				res.send(err);
			}
			res.json({message: 'successfully deleted'});
		}
	);
}


//export all the functions
module.exports = { getImages, postImage, deleteImage };