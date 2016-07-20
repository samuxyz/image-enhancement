var app = angular.module('addController', [])
	.controller('AddController', function($scope, $location, Image, toastr){	
		$scope.image = {};
		$scope.upscale = $scope.enhance = $scope.redeye = false;
		$scope.noise = "";
		// Save the picture
		$scope.postImage = function() {
			if($scope.image.hasOwnProperty("url")){
				// Do some manipulation according to the chosen enhancements
				$scope.image.urlEnhanced = imageManipulation($scope.image.url);
				Image.save($scope.image, function(){
					 toastr.success('You have successfully saved your picture!');
					 $location.path('/');
				});
			}else {
				toastr.error('Ops! Did you forget to upload a picture...?');
			}
		}
		// Filestack library in action
		$scope.filepicker = function() {
			var progressBar = document.getElementById('progress-bar');
			filepicker.pick(
			 {
			    mimetype: 'image/*',
			    hide: true,
			    services: ['COMPUTER', 'INSTAGRAM', 'FACEBOOK']
			  },
			  function(Blob){
			    setTimeout($scope.previewImage(Blob.url, progressBar), 2000);
			    console.log(JSON.stringify(Blob));
			    $scope.image.url = Blob.url;
			  },
			  function(FPError){
				console.log(FPError.toString());
			  },
			  function(FPProgress){
			  	console.log(parseInt(FPProgress.progress));
			  	progressPercentage = parseInt(FPProgress.progress) + '%';
			  	
			  	progressBar.style.width = progressPercentage;
			  	progressBar.innerHTML = progressPercentage;
			  }
			);
		}
		$scope.previewImage = function(url, progressBar){
			
			progressBar.classList.remove('progress-bar-striped');
			progressBar.classList.remove('active');
			progressBar.classList.add('progress-bar-success');
			var thumbnailClassList = document.getElementsByClassName('thumbnail')[0].classList;
			thumbnailClassList.remove('off');
			thumbnailClassList.add('on');
			document.getElementById('img-preview').src = url;
			
		}
		$scope.previewEnhanced = function(){
			if($scope.image.hasOwnProperty("url")){
				var previewUrl = imageManipulation($scope.image.url);
				window.open(previewUrl, '_blank');
			}else {
				toastr.error('Upload a picture first!');
			}	
		}
		var imageManipulation = function(url) {
			var url = "https://process.filestackapi.com/";
			if($scope.upscale) {
				url += "upscale";
				if($scope.noise != ""){
					url += "=n:" + $scope.noise + "/";
				}
			}
			if($scope.enhance) {
				url += "enhance/";
			}
			if($scope.redeye) {
				url += "redeye/";
			}
			url += $scope.image.url;
			return url;
		}
	}); 