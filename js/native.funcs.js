function createFolder(name) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function onFileSystemSuccess(fileSystem) {

		fileSystem.root.getDirectory(name, {
			create : true,
			exclusive : false
		}, function createdDirectory(fileEntry) {
			return true;
		});
	}, fail);
}

function downloadFile(folder, file, name) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function onFileSystemSuccess(fileSystem) {

		fileSystem.root.getFile(folder + "dummy.html", {
			create : true,
			exclusive : false
		}, function gotFileEntry(fileEntry) {
			var sPath = fileEntry.fullPath.replace("dummy.html", "");
			var fileTransfer = new FileTransfer();
			fileEntry.remove();

			fileTransfer.download(file, sPath + name, function(theFile) {
				alert(">>" + theFile.toURI());
			}, function(error) {
				alert("download error source " + error.source);
				alert("download error target " + error.target);
				alert("upload error code: " + error.code);
			});
		}, fail);
	}, fail);

}

function fail(evt) {
	console.log(evt.target.error.code);
}

//===============================================================================================
function readFile(file) {
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		alert("read success");
		alert(evt.target.result);
	};
	reader.readAsText(file);

}

function noFile() {
	alert('File Not Found');
}

function doReadFile(mfile) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function onFileSystemSuccess(fileSystem) {
		fileSystem.root.getFile(mfile, {
			create : true
		}, readFile, noFile);
	}, fail);
}

//========================DB=======================================================================
