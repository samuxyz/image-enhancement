angular.module('imageService', ['ngResource'])
	.factory('Image', function($resource){
		return $resource('/image/:id', null, 
			{
				'update' : { method : 'PUT'}
			}
		);
	});