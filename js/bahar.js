$(document).bind("mobileinit", function() {
	$.mobile.allowCrossDomainPages = true;
});

function localJsonpCallback(data) {
	for (var x in data["data"]) {
		$("#ppp").append(data["data"][x]["category"] + "<br/>");
	}
}

var URL = "http://baharnewspaper.com/app/index.php";
$(document).on('pageinit', '#home', function() {
	(function($) {
		var url = URL;
		$.ajax({
			type : 'GET',
			url : url,
			async : false,
			contentType : "application/json",
			dataType : 'jsonp'
		});
	})(jQuery);

});
