'use strict';
angular.module('mbApp.directives').directive("inputFileChange", [function () {
	return {
		restrict: "A",
		scope: {
			ngModel: "="
		},
		link: function (scope, element, attrs) {
			element.bind("change", function (changeEvent) {
				var reader = new FileReader();
				reader.onload = function (loadEvent) {
					scope.$apply(function () {
						scope.ngModel = loadEvent.target.result;
					});
				};
				reader.readAsDataURL(changeEvent.target.files[0]);
			});
		}
	}
}]);