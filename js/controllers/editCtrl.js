'use strict';
angular.module('mbApp.controllers').controller('editCtrl', ['$scope', '$modalInstance', '$timeout', 'fileStorage', 'document', 'utils', function($scope, $modalInstance, $timeout, fileStorage, document, utils) {
	$scope.file = document;
	switch (document.type) {
		case 'text':
			$scope.content = atob(document.data);
			break;
		case 'html':
			$scope.content = atob(document.data);
			break;
		case 'image':
			$scope.dataUrl = 'data:image/png;base64,' + document.data;
			break;
	}

	$scope.save = function () {
		document.data = utils.b64EncodeUnicode($scope.content);
		if(document.id) {
			$scope.$root.$broadcast('fileChanged');
			$modalInstance.dismiss();
		}
		else {
			document.id = guid()
			document.name = document.name || 'new file';
			$modalInstance.close(document);
		}
	};
}]);