var URL = "http://baharnewspaper.com/app/index.php";
var iNav = new navigation();

$(document).on('pageshow', 'div[data-role="page"]', function() {
	var currentPage = ($(this).attr("id"));
	iNav.push(currentPage);
});



$(document).on('click', '#button_back', function() {
	$.mobile.changePage("#"+iNav.pop(), {
		transition : "slide"
	});
	
	return false;
});
//-----------------------------------------------------------

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
	
	testDB();
	
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
	successCB();
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
	var bFolder = "Bahar/"+prfNo;

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
		if (data[x]["fld_News_Title"]) {
			$("#news ul#titles").append("<li data-newsNo='" + data[x]["fld_News_No"] + "'>" + data[x]["fld_News_Title"] + "</li>");
		}
	}
	$.mobile.changePage("#news", {
		transition : "slide"
	});
	$("#news ul.mlist").listview("refresh");
	$("#news h1.ui-title").html(data["pageTitle"]);
	$.mobile.hidePageLoadingMsg();

}


$(document).on("click", "#page_titles", function() {
	$.mobile.showPageLoadingMsg();
	var w = $("#pages #pages-ul li").width();
	var pageCount = $("#pages #pages-ul li").length;
	var pageN = (pageCount - parseInt($("#pages #pages-ul").css("left")) / w);
	var prfNo = $("#pages #pages-ul").attr("data-prfno");
	var pageTitle = $("#pages h1.ui-title").html();
	$.ajax({
		type : 'GET',
		data : {
			f : "page_titles",
			prfNo : prfNo,
			pageNo : pageN,
			pageTitle : pageTitle,
			callback : 'page_title'
		},
		url : URL,
		async : false,
		contentType : "application/json",
		dataType : 'jsonp'
	});
});
//-----------------------------------------------------------
function show_news(data) {
	$("#anews #anews-content").empty();
	data = data[0];
	
	$("#anews #anews-content").append("<h2>"+data["fld_News_Top_Title"]+"</h2>");
	$("#anews #anews-content").append("<h1>"+data["fld_News_Title"]+"</h1>");
	if(data["fld_News_Author_Name"]) {
		$("#anews #anews-content").append("<h3'>"+data["fld_News_Author_Name"]+"</h3>");
	}
	$("#anews #anews-content").append(data["fld_News_Lead"]);
	$("#anews #anews-content").append(data["fld_News_Body"]);
	$.mobile.changePage("#anews", {
		transition : "slide"
	});
	$.mobile.hidePageLoadingMsg();
	downloadFile();	
}

$(document).on("click", "#news ul#titles.mlist li", function() {
	$.mobile.showPageLoadingMsg();
	var newsNo = $(this).attr("data-newsNo");
	$.ajax({
		type : 'GET',
		data : {
			f : "news_data",
			newsNo : newsNo,
			callback : 'show_news'
		},
		url : URL,
		async : false,
		contentType : "application/json",
		dataType : 'jsonp'
	});
}); 
