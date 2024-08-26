'use strict';
angular.module('mbApp.controllers').controller('indexCtrl', ['$scope', '$modal', 'fileStorage', function($scope, $modal, fileStorage) {
	$scope.files = fileStorage;

	function imgDataUrl(file) {
		return 'data:image/png;base64,' + file.data;
	}

	// File size calculation
	$scope.fileSize = function (file) {
		return atob(file.data).length;
	};

	$scope.download = function (file) {
		var blob;
		switch (file.type) {
			case 'text':
				var doc = '<!DOCTYPE html><body>'+atob(file.data)+'</body>';
				saveAs(htmlDocx.asBlob(doc), file.name);
				break;
			case 'html':
				blob = new Blob([atob(file.data)], {type: 'text/html'});
				saveAs(blob, file.name);
				break;
			case 'image':
				var ctx,
					img = new Image,
					canvas = document.createElement("canvas");
				img.src = imgDataUrl(file);
				canvas.width = img.width;
				canvas.height = img.height;
				ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0);
				canvas.toBlob(function (blob) {
					saveAs(blob, file.name);
				});
				break;
		}
	};

	$scope.bookmark = function (file) {
		file.bookmarked = file.bookmarked ? false : true;
		$scope.$root.$broadcast('fileChanged');
	};

	$scope.preview = function (file) {
		var previewModal = $modal.open({
			templateUrl: '/partials/preview.html',
			controller: 'editCtrl',
			resolve: {
				document: function () {
					return file;
				}
			}
		});
	};

	$scope.edit = function (file) {
		var editModal = $modal.open({
			templateUrl: '/partials/edit.html',
			controller: 'editCtrl',
			resolve: {
				document: function () {
					return file;
				}
			}
		});
	};

	$scope.upload = function () {
		var uploadModal = $modal.open({
			templateUrl: '/partials/upload.html',
			controller: 'uploadCtrl'
		});
		uploadModal.result.then(function(file) {
			fileStorage.push(file);
		});
	};

	$scope.add = function (fileType) {
		var addModal = $modal.open({
			templateUrl: '/partials/edit.html',
			controller: 'editCtrl',
			resolve: {
				document: function () {
					return { name: '', type: fileType, data: '' };
				}
			}
		});
		addModal.result.then(function(file) {
			fileStorage.push(file);
		});
	};
}]);
