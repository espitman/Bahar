var URL = "http://baharnewspaper.com/app/index.php";

$(document).bind("mobileinit", function() {
	$.mobile.allowCrossDomainPages = true;
});

//-----------------------------------------------------------

function first_page_callback(data) {
	for (var x in data) {
		$("#profiles").append("<li data-no='" + data[x]["fld_Profile_No"] + "'>" + data[x]["fld_Year"] + "/" + data[x]["fld_Month"] + "/" + data[x]["fld_Day"] + "</li>");
	}
	$.mobile.hidePageLoadingMsg();
}


$(document).on('pageinit', '#home', function() {
	var url = URL;
	$.ajax({
		type : 'GET',
		data : {
			f : "first_page",
			callback : 'first_page_callback'
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
//-----------------------------------------------------------
$(document).on("click", "#home ul li", function() {
	$.mobile.showPageLoadingMsg();
	var url = URL;
	$.ajax({
		type : 'GET',
		data : {
			f : "pages_page",
			callback : 'show_pages'
		},
		url : url,
		async : false,
		contentType : "application/json",
		dataType : 'jsonp'
	});

});

function show_pages(data) {
	for (var x in data["data"]) {
		$("#pages-ul").append("<li>"+data["data"][x]["category"] + "</li>");
	}
	$.mobile.changePage("#pages", {transition: "slide"});
	$.mobile.hidePageLoadingMsg();
}

