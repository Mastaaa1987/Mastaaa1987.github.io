'use strict';
angular.module('mbApp.controllers').controller('uploadCtrl', ['$scope', '$modalInstance', '$timeout', 'fileStorage', 'Facebook', function($scope, $modalInstance, $timeout, fileStorage, Facebook) {

	$scope.img = {src: ''};

	$scope.uploadFromPc = function () {
		$timeout(function() {
			angular.element('#file').trigger('click');
		});
	};

	$scope.uploadFromFb = function () {

		$scope.showAlbum = function (albumId) {
			$scope.fbAlbum = false;
			$scope.fbAlbumPhotos = true;
			Facebook.api('/'+albumId+'/photos',  function(photos) {
				$scope.photos = photos.data;
			});
		};

		$scope.previewFbPhoto = function (photoSrc) {
			$scope.fbAlbum = false;
			$scope.fbAlbumPhotos = false;
			var img = new Image,
				canvas = document.createElement("canvas"),
				ctx = canvas.getContext("2d");
			img.crossOrigin = "Anonymous";
			img.src = photoSrc;
			img.onload = function() {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage( img, 0, 0 );
				$scope.img.src = canvas.toDataURL("image/png");
				$scope.$apply();
			};
		};

		Facebook.getLoginStatus(function(response) {
			$scope.loggedIn = response.status === 'connected';
			if (!$scope.loggedIn) {
				Facebook.login(function(response) {
					$scope.loggedIn = true;
				},{scope: 'user_photos'});
			}
		});

		$scope.$watch('loggedIn', function (status) {
			if (status) {
				Facebook.api('/me/albums',  function(albums) {
					if (albums.data.length) {
						$scope.fbAlbum = true;
						$scope.albums = albums.data;
						angular.forEach(albums.data, function (obj, ind) {
							if (!obj.cover_photo) {
								$scope.albums[ind].cover = 'https://www.facebook.com/images/photos/empty-album.png';
							}
							else
								Facebook.api('/'+obj.cover_photo,  function(cover) {
									$scope.albums[ind].cover = cover.images[0].source;
								});
						});
					}
				});
			}
		});
	};

	$scope.saveImg = function (img) {
		debugger;
		var data = img.src.split(',')[1];
		$modalInstance.close({ id: guid(), name: img.name || 'new file', type: 'image', data: data });
	};

}]);
