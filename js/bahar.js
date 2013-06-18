var URL = "http://baharnewspaper.com/app/index.php";

$(document).bind("mobileinit", function() {
	$.mobile.allowCrossDomainPages = true;
});

//-----------------------------------------------------------

function first_page_callback(data) {
	for (var x in data) {
		data[x]["fld_Year"] = parseInt(data[x]["fld_Year"]) - 1300;
		var date = data[x]["fld_Year"] + "/" + data[x]["fld_Month"] + "/" + data[x]["fld_Day"];
		$("#profiles").append("<li style='text-align:center;' data-date='" + date + "' data-prfNo='" + data[x]["fld_Profile_No"] + "'>" + data[x]["fld_Year"] + "/" + data[x]["fld_Month"] + "/" + data[x]["fld_Day"] + "</li>");
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
	prfNo = data["prfNo"];

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

//-----------------------------------------------------------

function setPageTitle(dif) {
	var w = $("#pages #pages-ul li").width();
	var pageCount = $("#pages #pages-ul li").length;
	var pageN = (pageCount - parseInt($("#pages #pages-ul").css("left")) / w) + dif;
	var title = $("#pages #pages-ul li[data-page='" + pageN + "']").attr("data-title");
	$("#pages h1.ui-title").html(title);
}

function nextprevPage(dif) {
	var w = $("#pages #pages-ul li").width();
	$("#pages #pages-ul").animate({
		"left" : "-=" + (w * dif)
	});
	setPageTitle(dif);
}


$(document).on("swipeleft", "#pages", function() {
	nextprevPage(1);
});
$(document).on("click", "#page_forward", function() {
	nextprevPage(1);
});

$(document).on("swiperight", "#pages", function() {
	nextprevPage(-1);
});
$(document).on("click", "#page_back", function() {
	nextprevPage(-1);
});

//-----------------------------------------------------------
function page_title(data) {
	$("#news ul#titles").empty();
	for (var x in data) {
		console.log(data[x]["fld_News_Title"]);
		$("#news ul#titles").append("<li>" + data[x]["fld_News_Title"] + "</li>");
	}
	$.mobile.changePage("#news", {
		transition : "slide"
	});
	$("#news ul.mlist").listview("refresh");
	$.mobile.hidePageLoadingMsg();

}


$(document).on("click", "#page_titles", function() {
	$.mobile.showPageLoadingMsg();
	var w = $("#pages #pages-ul li").width();
	var pageCount = $("#pages #pages-ul li").length;
	var pageN = (pageCount - parseInt($("#pages #pages-ul").css("left")) / w);
	var prfNo = $("#pages #pages-ul").attr("data-prfno");
	$.ajax({
		type : 'GET',
		data : {
			f : "page_titles",
			prfNo : prfNo,
			pageNo : pageN,
			callback : 'page_title'
		},
		url : URL,
		async : false,
		contentType : "application/json",
		dataType : 'jsonp'
	});

});

