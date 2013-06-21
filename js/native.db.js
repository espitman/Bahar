function createDBexec() {
	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
}

function createDB() {
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(createDBexec, errorCB);
}

function errorCB(err) {
	alert("Error processing SQL: " + err.code);
}

function populateDB(tx) {
	//tx.executeSql('DROP TABLE IF EXISTS DEMO');
	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
	tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
	tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

function insertDB() {
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(populateDB, errorCB);
}

function selectCB() {
	alert('selectCB');
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(selectQueryDB, errorCB);
}

function selectQueryDB(tx) {
	alert('selectQueryDB');
	tx.executeSql('SELECT * FROM DEMO', [], selectQuerySuccess, errorCB);
}

function selectQuerySuccess(tx, results) {
	alert('selectQuerySuccess');
	var len = results.rows.length;
	alert("DEMO table: " + len + " rows found.");
	for (var i = 0; i < len; i++) {
		alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
	}
}