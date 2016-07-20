var app = angular.module('mainController', [])
	.controller('MainController', function($scope, $location, Image, toastr){	
		$scope.imageList = {};

		//Fetch all the pics from the db
		Image.query(function(data){
			$scope.imageList = data;
		});

		//Send a Delete request to the db
		$scope.deleteImage = function(id){
			Image.delete({id : id}, function(){
				$scope.imageList = $scope.imageList.filter(function(image){
						return image._id != id;
					});
				toastr.success("Successfully deleted!");
			}); 
		};

		//Export your enhanced image
		$scope.saveImage = function(url) {
			filepicker.exportFile(
			 url,
			  {
			    mimetype:'image/*',
			    suggestedFilename: 'myCoolEnhancedPic',
			    services: ['COMPUTER', 'FACEBOOK']
			  },
			  function(Blob){
			    console.log(Blob.url);
			  }
			);
		}

	}); 