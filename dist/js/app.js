'use strict';

var guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();

angular.module('mbApp.services', []);
angular.module('mbApp.controllers', []);
angular.module('mbApp.directives', []);

angular
    .module('mbApp', [
        'mbApp.controllers',
        'mbApp.services',
        'mbApp.directives',
        'ui.bootstrap',
        'textAngular',
        'facebook'
    ])
    .config([
        'FacebookProvider',
        function (FacebookProvider) {
            FacebookProvider.init('821914054533130');
        }])
    .config(['$provide', function ($provide) {
        $provide.decorator('taOptions', ['taRegisterTool', '$modal', '$delegate', function(taRegisterTool, $modal, taOptions){
            // add strikethrough to textAngular
            taRegisterTool('strikethrough', {
                iconclass: "fa fa-strikethrough",
                action: function(){
                    this.$editor().wrapSelection('strikethrough');
                }
            });

            // add image insert from localstorage to textAngular
            taRegisterTool('localImage', {
                iconclass: "fa fa-picture-o",
                action: function($deferred, restoreSelection) {
                    var textAngular = this;
                    var modalInstance = $modal.open({
                        // Put a link to your template here or whatever
                        templateUrl: '/partials/select.html',
                        size: 'sm',
                        controller: ['$modalInstance', '$scope', 'fileStorage',
                            function($modalInstance, $scope, fileStorage) {
                                $scope.photos = _.where(fileStorage, {type: 'image'});
                                $scope.imgSrc = function (fileData) {
                                    return 'data:image/png;base64,' + fileData;
                                };
                            }
                        ]
                    });

                    modalInstance.result.then(function(imgUrl) {
                        restoreSelection();
                        textAngular.$editor().wrapSelection('insertImage', imgUrl);
                        $deferred.resolve();
                    });
                    return false;
                }
            });

            taOptions.classes = {
                focussed: 'focussed',
                toolbar: 'btn-toolbar',
                toolbarGroup: 'btn-group',
                toolbarButton: 'btn btn-default',
                toolbarButtonActive: 'active',
                disabled: 'disabled',
                textEditor: 'form-control',
                htmlEditor: 'form-control'
            };

            return taOptions;
        }]);
    }])
    .run([
        '$rootScope',
        function ($rootScope) {

        }]);
