angular.module('mbApp.services').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/partials/edit.html',
    "<div class=\"row\" style=\"min-height:160px; padding: 30px;\">\n" +
    "    <div text-angular ng-model=\"content\" ta-toolbar=\"[file.type=='html' ? ['bold','italics', 'underline', 'strikethrough', 'localImage'] : ['bold','italics', 'underline', 'strikethrough']]\"></div>\n" +
    "    <div class=\"row margin-top-15\">\n" +
    "        <div class=\"col-sm-4 col-md-offset-4\">\n" +
    "            <div ng-if=\"!file.id\" class=\"input-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"file.name\" placeholder=\"file name\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                    <button class=\"btn btn-default\" type=\"button\" ng-click=\"save()\">Save</button>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-4\">\n" +
    "            <button ng-if=\"file.id\" class=\"btn btn-default\" ng-click=\"save()\">Save</button>\n" +
    "            <button class=\"btn btn-default\" ng-click=\"$dismiss()\">Cancel</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/partials/preview.html',
    "<div class=\"row\" style=\"min-height:160px; padding: 30px;text-align: center;\">\n" +
    "    <img ng-src=\"{{dataUrl}}\" style=\"max-width: 500px;\"/>\n" +
    "    <div ng-bind-html=\"content\" style=\"text-align: start\"></div>\n" +
    "</div>"
  );


  $templateCache.put('/partials/select.html',
    "<div style=\"padding:20px;\">\n" +
    "    <div class=\"row\" style=\"margin:0\">\n" +
    "        <a ng-repeat=\"photo in photos\" href=\"javascript:\" ng-click=\"$close(imgSrc(photo.data))\" style=\"width: 50px; height: 50px; margin: 0 14px 14px 0; display: inline-block;\">\n" +
    "            <img ng-src=\"{{imgSrc(photo.data)}}\" style=\"max-width: 50px; height: 50px;\"/>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/partials/upload.html',
    "<div class=\"row\" style=\"min-height:160px; text-align: center; padding: 30px;\">\n" +
    "    <div ng-if=\"!img.src && !fbAlbum && !fbAlbumPhotos\" style=\"margin: 5% 0;\">\n" +
    "        <button class=\"btn btn-default\" ng-click=\"uploadFromFb()\">Upload from Facebook</button>\n" +
    "        <button class=\"btn btn-default\" ng-click=\"uploadFromPc()\">Upload from PC</button>\n" +
    "        <input type=\"file\" style=\"display:none\" accept=\"image/*\" id=\"file\" name='file' ng-model=\"img.src\" input-file-change/>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"img.src && !fbAlbum && !fbAlbumPhotos\">\n" +
    "        <img id=\"imgPreview\" ng-src=\"{{img.src}}\" style=\"max-width: 500px;\"/>\n" +
    "    </div>\n" +
    "    <div ng-if=\"fbAlbum\">\n" +
    "        <a ng-repeat=\"album in albums\" href=\"javascript:\" ng-click=\"showAlbum(album.id)\" style=\"width: 100px; height: 100px; margin: 0 30px 40px 0; display: inline-block;\">\n" +
    "            <img ng-src=\"{{album.cover}}\" style=\"max-width: 100px; height: 100px;\"/><span style=\"display: inline-block; width: 100px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;\">{{album.name}}</span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div ng-if=\"fbAlbumPhotos\">\n" +
    "        <a ng-repeat=\"photo in photos\" href=\"javascript:\" ng-click=\"previewFbPhoto(photo.source)\" style=\"width: 100px; height: 100px; margin: 0 30px 40px 0; display: inline-block;\">\n" +
    "            <img ng-src=\"{{photo.source}}\" style=\"max-width: 100px; height: 100px;\"/>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"row margin-top-15\">\n" +
    "        <div class=\"col-sm-4 col-md-offset-6\">\n" +
    "            <div ng-if=\"img.src\" class=\"input-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"img.name\" placeholder=\"file name\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                    <button class=\"btn btn-default\" type=\"button\" ng-click=\"saveImg(img)\">Save</button>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-2\">\n" +
    "            <button class=\"btn btn-default\" ng-click=\"$dismiss()\">Cancel</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
