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
function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS DEMO');
	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
	tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
	tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

// Query the database
//
function queryDB(tx) {
	tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	alert("Returned rows = " + results.rows.length);
	// this will be true since it was a select statement and so rowsAffected was 0
	if (!results.rowsAffected) {
		alert('No rows affected!');
		return false;
	}
	// for an insert statement, this property will return the ID of the last inserted row
	console.log("Last inserted row ID = " + results.insertId);
}

// Transaction error callback
//
function errorCB(err) {
	console.log("Error processing SQL: "+err.code);
}

// Transaction success callback
//
function successCB() {
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(queryDB, errorCB);
}

// Cordova is ready
//
function testDB() {
	alert(testDB);
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(populateDB, errorCB, successCB);
}

