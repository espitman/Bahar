$(document).on('pageinit', '#home', function() {

	$.ajax({
		type : "POST",
		url : "http://baharnewspaper.com/app/index.php",
		dataType : "json",
		success: function(data) {
			for(var x in data["data"]) {
				$("div#ppp").append(data["data"][x]["category"]+"<br/>");
			}
		}
	});

});
