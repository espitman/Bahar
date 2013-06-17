function localJsonpCallback(data) {
	for(var x in data["data"]) {
		$("#ppp").append(data["data"][x]["category"]+"<br/>");
	}
}
var URL = "http://baharnewspaper.com/app/index.php";
$(document).on('pageinit', '#home', function() {
	$.ajax({
		url : URL,
		dataType : "jsonp",
		type : 'post',
		processData : false,
		crossDomain : true,
		contentType : "application/json",
	});


}); 