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
	tx.executeSql('SELECT * FROM profiles WHERE prfNo = "' + prfNo + '"', [], function(tx, results) {
		doingRegisterProfile(tx, results, prfNo)
	}, errorCB);
}

function show_pages(data) {
	var w = $(".ui-content").width();
	$("#pages #pages-ul").empty();
	var i = 1;
	prfNo = data["prfNo"];

	profileData = {};
	profileData["prfNo"] = prfNo;
	profileData["date"] = date["date"];
	insertProfile(profileData);

	$("#pages #pages-ul").attr("data-prfNo", prfNo);

	for (var x in data["data"]) {
		$("#pages #pages-ul").append("<li data-title='" + data["data"][x]["category"] + "' data-page='" + i + "'>" + "<img src='http://www.baharnewspaper.com/Pdfax/" + data["date"] + "/" + data["data"][x]["page"] + ".jpg' />" + "</li>");
		$("#pages #pages-ul li:nth-child(1)").addClass("active");
		i++;
	}

	$("#pages #pages-ul").imageready(function() {
		var pageCount = i - 1;
		$("#pages #pages-ul li").css({
			"width" : w + "px"
		});
		var iw = parseInt($("#pages #pages-ul li img").width());

		if (iw > w) {
			$("#pages #pages-ul li img").css({
				"width" : (w - 30) + "px"
			});
		}

		$("#pages #pages-ul").css({
			"width" : (w * pageCount) + "px",
			"left" : (w * (pageCount - 1)) + "px"
		});

		$.mobile.changePage("#pages", {
			transition : "slide"
		});
		$.mobile.hidePageLoadingMsg();
	});
	setPageTitle(0);
}

function getProfileDataFromServer(prfNo) {
	$.ajax({
		type : "GET",
		dataType : "json",
		data : {
			f : "pages_page",
			prfNo : prfNo,
			callback : 'show_pages'
		},
		url : URL,
		async : true,
		success : function(response) {
			console.log(response);
			profileData = {};
			profileData["date"] = response["date"];
			profileData["prfNo"] = response["prfNo"];
			insertProfile(profileData);
		},
		error : function(response) {
			alert("error!!");
			console.log(response);
		}
	});
}

function doingRegisterProfile(tx, results, prfNo) {
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

function doInsertProfile(tx, profileData) {
	console.log(profileData);
	tx.executeSql('CREATE TABLE IF NOT EXISTS profiles (id unique, prfNo, date)');
	tx.executeSql('INSERT INTO profiles (prfNo,date) VALUES ("' + profileData["prfNo"] + ',' + profileData["date"] + '")');
}
