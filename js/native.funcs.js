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

function downloadFile() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function onFileSystemSuccess(fileSystem) {
		
		var folder = "Bahar/1"
		createFolder(folder);

		fileSystem.root.getFile(folder+"dummy.html", {
			create : true,
			exclusive : false
		}, function gotFileEntry(fileEntry) {
			var sPath = fileEntry.fullPath.replace("dummy.html", "");
			var fileTransfer = new FileTransfer();
			fileEntry.remove();

			fileTransfer.download("http://www.baharnewspaper.com/Images/Logo/bahar.jpg", sPath + "bahar.jpg", function(theFile) {
				alert(">>" + theFile.toURI());
			}, function(error) {
				console.log("download error source " + error.source);
				console.log("download error target " + error.target);
				console.log("upload error code: " + error.code);
			});
		}, fail);
	}, fail);

}

function fail(evt) {
	console.log(evt.target.error.code);
}

