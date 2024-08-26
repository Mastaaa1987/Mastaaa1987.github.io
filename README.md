file-manager
============

Task for some company to build file manager demo, working solely on client side using localStorage, with ability to create/edit html and rich text documents and upload images from computer or facebook albums.

Task requirements are given in requirements.pdf.


Installation
============

None needed, just clone the repository.

Usage
============

Just open index.html file from dist directory in your browser (Facebook photos upload won't work this way, you need to serve files from dist directory from http server).


Technologies and libraries used
=====

[angular.js](https://github.com/angular/angular.js) as an application framework

[angular-ui/bootstrap](https://github.com/angular-ui/bootstrap) for modals and dropdown buttons

[angular-facebook](https://github.com/Ciul/angular-facebook) Facebook Javascript SDK wrapper for angular.js for Facebook photo upload

[textAngular](https://github.com/fraywing/textAngular) Text-Editor/Wysiwyg editor for angular.js for editing html/richtext files

[rangy](https://github.com/Dakuan/Rangy-bower) cross-browser JavaScript range and selection library as a dependency for textAngular

[html-docx-js](https://github.com/evidenceprime/html-docx-js) library for converting HTML documents to DOCX format

[FileSaver.js](https://github.com/eligrey/FileSaver.js) cross-browser HTML5 saveAs() FileSaver implementation for downloading text files

[canvas-toBlob.js](https://github.com/eligrey/canvas-toBlob.js) cross-browser HTML5 canvas.toBlob() implementation for downloading image files

[underscore](https://github.com/jashkenas/underscore) for data manipulation

[bootstrap](https://github.com/twbs/bootstrap) and [Font-Awesome](https://github.com/FortAwesome/Font-Awesome) for styling


Author
======

[Vlad Sternbach](http://github.com/gr82bu)
