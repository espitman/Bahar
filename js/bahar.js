var URL = "http://baharnewspaper.com/app/index.php";


$(document).bind("mobileinit", function() {
	$.mobile.allowCrossDomainPages = true;
});






//-----------------------------------------------------------

function first_page_callback(data) {
	for (var x in data) {
		data[x]["fld_Year"] = parseInt(data[x]["fld_Year"])-1300;
		var date = data[x]["fld_Year"]+"/"+data[x]["fld_Month"]+"/"+data[x]["fld_Day"];
		$("#profiles").append("<li style='text-align:center;' data-date='"+date+"' data-prfNo='" + data[x]["fld_Profile_No"] + "'>" + data[x]["fld_Year"] + "/" + data[x]["fld_Month"] + "/" + data[x]["fld_Day"] + "</li>");
	}
	$("#home ul.mlist").listview("refresh");	
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
	var prfNo = $(this).attr("data-prfNo");
	$.mobile.showPageLoadingMsg();
	var url = URL;
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

});

function show_pages(data) {
	var w = $(".ui-content").width();
	
	$("#pages #pages-ul").empty();
	var i = 1;
	for (var x in data["data"]) {
		$("#pages #pages-ul").append("<li data-page='"+i+"'><img src='http://www.baharnewspaper.com/Pdfax/"+data["date"]+"/"+data["data"][x]["page"]+".jpg' /></li>");
		$("#pages #pages-ul li:nth-child(1)").addClass("active");
		i++;		
	}
	$("#pages #pages-ul").imageready(function () {
		var pageCount = i-1;		
		$("#pages #pages-ul li").css({"width":w+"px"});
		$("#pages #pages-ul").css({"width":(w*pageCount)+"px","left":(w*(pageCount-1))+"px"});

		
		$.mobile.changePage("#pages", {transition: "slide"});
		$.mobile.hidePageLoadingMsg();
	});
}

//-----------------------------------------------------------
$(document).on("swipeleft", "#pages", function() {
	var w = $("#pages #pages-ul li").width();
	$("#pages #pages-ul").animate({"left":"-="+w});
});


$(document).on("swiperight", "#pages", function() {
	var w = $("#pages #pages-ul li").width();
	$("#pages #pages-ul").animate({"left":"+="+w});
});
