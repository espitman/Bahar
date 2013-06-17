$(document).bind("mobileinit", function() {
	$.mobile.allowCrossDomainPages = true;
});

function localJsonpCallback(data) {
	for (var x in data["data"]) {
		$("#ppp").append(data["data"][x]["category"] + "<br/>");
	}
	$.mobile.hidePageLoadingMsg();
}

var URL = "http://baharnewspaper.com/app/index.php";
$(document).on('pageinit', '#home', function() {
	var url = URL;
	$.ajax({
		type : 'GET',
		data : {
			callback : 'localJsonpCallback'
		},
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		url : url,
		async : false,
		contentType : "application/json",
		dataType : 'jsonp'
	});

}); 