function localJsonpCallback(data) {
	for(var x in data["data"]) {
		$("#ppp").append(data["data"][x]["category"]+"<br/>");
	}
}

$(document).on('pageinit', '#home', function() {

	$.ajax({
		type : "POST",
		url : "http://baharnewspaper.com/app/index.php",
		dataType : "jsonp"
	});

});
