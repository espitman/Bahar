function dbManager() {
	
	this.populateDB = function(tx) {
		//tx.executeSql('DROP TABLE IF EXISTS DEMO');
		tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (3, "3 row")');
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (4, "4 row")');
	}

	// Query the database
	//
	this.queryDB = function(tx) {
		tx.executeSql('SELECT * FROM DEMO', [], this.querySuccess, this.errorCB);
	}

	// Query the success callback
	//
	this.querySuccess = function(tx, results) {
		var len = results.rows.length;
		alert("DEMO table: " + len + " rows found.");
		for (var i = 0; i < len; i++) {
			alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
		}
	}

	// Transaction error callback
	//
	this.errorCB = function(err) {
		alert("Error processing SQL: " + err.code);
	}

	// Transaction success callback
	//
	this.successCB = function() {
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(this.queryDB, this.errorCB);
	}

	// Cordova is ready
	//
	this.testDB = function() {
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(this.populateDB, this.errorCB);
	}

}