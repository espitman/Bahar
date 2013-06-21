function dbManager() {

	this.createDBexec = function() {
		tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
	}

	this.createDB = function() {
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(this.createDBexec, this.errorCB);
	}

	this.errorCB = function(err) {
		alert("Error processing SQL: " + err.code);
	}

	this.populateDB = function(tx) {
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
	}

	this.insertDB = function() {
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(this.populateDB, this.errorCB);
	}

	this.selectCB = function() {
		alert('selectCB');
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(this.selectQueryDB, this.errorCB);
	}

	this.selectQueryDB = function(tx) {
		alert('selectQueryDB');
		tx.executeSql('SELECT * FROM DEMO', [], this.selectQuerySuccess, this.errorCB);
	}

	this.selectQuerySuccess = function(tx, results) {
		alert('selectQuerySuccess');
		var len = results.rows.length;
		alert("DEMO table: " + len + " rows found.");
		for (var i = 0; i < len; i++) {
			alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
		}
	}
}
