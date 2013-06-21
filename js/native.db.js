function populateDB(tx) {
	//tx.executeSql('DROP TABLE IF EXISTS DEMO');
	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
	tx.executeSql('INSERT INTO DEMO (data) VALUES ("3 row")');
	tx.executeSql('INSERT INTO DEMO (data) VALUES ("4 row")');
}

// Query the database
//
function queryDB(tx) {
	tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	var len = results.rows.length;
	alert("DEMO table: " + len + " rows found.");
	for (var i = 0; i < len; i++) {
		alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
	}
}

// Transaction error callback
//
function errorCB(err) {
	alert("Error processing SQL: " + err.code);
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
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(populateDB, errorCB);
}

//***********************************************************************************

function b_successCB() {
	var db = window.openDatabase("Bahar", "1.0", "BaharDB", 200000);
	db.transaction(b_queryDB, errorCB);
}

function b_queryDB(tx) {
	tx.executeSql('SELECT * FROM DATES', [], b_querySuccess, errorCB);
}

// Query the success callback
//
function b_querySuccess(tx, results) {
	var len = results.rows.length;
	alert("DATES table: " + len + " rows found.");
	for (var i = 0; i < len; i++) {
		alert("Row = " + i + " ID = " + results.rows.item(i).id + " Date =  " + results.rows.item(i).date);
	}
}

//**************************************Proflie*********************************************
function registerProfile(prfNo) {
	var db = window.openDatabase("Bahar", "1.0", "BaharDB", 200000);
	db.transaction(function(tx) {
		doRegisterProfile(tx, prfNo);
	}, errorCB);
}

function doRegisterProfile(tx, prfNo) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS profiles (id unique, prfNo, date)');
	tx.executeSql('SELECT * FROM profiles WHERE prfNo = "' + prfNo + '"', [], doingRegisterProfile, errorCB);
}

function getProfileDataFromServer(prfNo) {
	$.ajax({
		type : 'GET',
		data : {
			f : "pages_page",
			prfNo : prfNo,
			callback : 'show_pages'
		},
		url : url,
		async : false,
		contentType : "application/json",
		dataType : 'jsonp'
	});
}

function doingRegisterProfile(tx, results) {
	var len = results.rows.length;
	alert(len);
	if (len == 0) {
		getProfileDataFromServer(prfNo);
	} else {
		alert("get data from sqllite");
	}
}

function insertProfile(profileData) {
	var db = window.openDatabase("Bahar", "1.0", "BaharDB", 200000);
	db.transaction(function(tx) {
		doInsertProfile(tx, profileData);
	}, errorCB);

}

function doInsertProfile(tx, dates) {
	alert(profileData["prfNo"]+','+profileData["date"]);
	tx.executeSql('CREATE TABLE IF NOT EXISTS profiles (id unique, prfNo, date)');
	tx.executeSql('INSERT INTO profiles (prfNo,date) VALUES ("' + profileData["prfNo"] + ',' + profileData["date"] + '")');
}
