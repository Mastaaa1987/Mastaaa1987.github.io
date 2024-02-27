App = window.App || (function App() {
    var db = '0';

    function getDB() {
        return db;
    }

    function errorHandler(e) {
        console.log('Error: ' + e);
    }

    function writeFileToFS(file) {
        window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

        window.requestFileSystem(window.TEMPORARY, 25*1024*1024, function(fs) {
            fs.root.getFile(file.name, {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    console.log('write db');
                    fileWriter.write(file); // Note: write() can take a File or Blob object.
                }, errorHandler);
            }, errorHandler);
        }, errorHandler);
    }

    function readFileFromFS(file) {
        window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

        window.requestFileSystem(window.TEMPORARY, 25*1024*1024, function(fs) {
            fs.root.getFile(file, {}, function(fileEntry) {
                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        console.log('read db');
                        db = reader.result;
                    };
                    reader.readAsArrayBuffer(file);
                }, errorHandler);
            }, errorHandler);
        }, errorHandler);
    }

    function request(method, url, params, onSuccess) {
        var xhr = new window.XMLHttpRequest();
        var config = JSON.parse(params) || null;
        var body = config.body || null;
        var headers = config.headers || null;
        console.log(headers.length);

        try {
            xhr.open(method, url);
            if (headers) {
                for (var i = 0; i < headers.length; i += 1) {
                    console.log(i);
                    xhr.setRequestHeader(headers[i][0], headers[i][1]);
                }
            }
            xhr.onload = function () {
                if (xhr.status === 200) {
                    //onSuccess(JSON.parse(xhr.responseText));
                    onSuccess(xhr.responseText);
                } else {
                    console.log(JSON.parse(xhr.responseText));
                }
            };

            xhr.onerror = function () {
                console.log('[XHR] Connection refused');
            };
            xhr.send(JSON.stringify(body));
        } catch (e) {
            console.log(e);
        }
    }

    return {
        request: request,
        getDB: getDB,
        readFileFromFS: readFileFromFS,
        writeFileToFS: writeFileToFS
    };
}());

window.addEventListener('load', function () {
    App.readFileFromFS('vxplayer.db');
});
