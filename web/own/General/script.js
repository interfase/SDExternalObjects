//add thenme boostrap
$(document).ready(function(){
	/*cambiar selector de los botones*/
	$("input[type = 'button']").addClass('btn btn-default');
	$("input[name = 'BTN_ENTER']").addClass('btn btn-primary');	
	$("input[name = 'BTN_CANCEL']").addClass('btn btn-default');
	$("input[name = 'BTN_DELETE']").addClass('btn btn-default');
	$("input[class = 'ErrorAttribute']").popover('show');		
	$("#btnColl").prop("type","button");
	BuscarPaginaActual();
	$('#buscar_accion').keyup(function(event){BuscarEnMenu(event);});	
	$('#span_collapse').click(function(){Collapse();});
	//menu desplegable	
	$("[data-toggle]").click(function() {
		var toggle_el = $(this).data("toggle");
		$(toggle_el).toggleClass("open-sidebar");		
		if ($(toggle_el).attr("class") == 'row container_centro'){
			$('#sidebar-toggle').removeClass("glyphicon-backward")
			$('#sidebar-toggle').addClass("glyphicon-forward")
		}else{	
			$('#sidebar-toggle').removeClass("glyphicon-forward")
			$('#sidebar-toggle').addClass("glyphicon-backward")
		}	
	});	
	/*largo*/
	largo = $("body").height() - 93;
	$(".div_centrorow").height(largo);	
	/*ancho*/
	ancho = $(".div_centrorow").width();
	$(".container_centro").width(ancho);
	$(".open-sidebar").width(ancho - 260);	
	$("#sidebar-toggle").click(function(){
		/*largo*/
		largo = $("body").height() - 93;
		$(".div_centrorow").height(largo);
		/*ancho*/
		ancho = $(".div_centrorow").width();
		$(".container_centro").width(ancho);
		$(".open-sidebar").width(ancho - 260);
	});		
});
$(window).resize(function() {
	/*largo*/
	largo = $("body").height() - 93;
	$(".div_centrorow").height(largo);
	/*ancho*/
	ancho = $(".div_centrorow").width();
	$(".container_centro").width(ancho);
	$(".open-sidebar").width(ancho - 260);	
});
function Collapse(){
	if ($('#span_collapse').attr("class") != "btn input-group-addon glyphicon coll glyphicon-sort-by-attributes-alt"){	
		$(".menu_principal ul").toggle();	
		$(".menu_principal li ul").each(function () {	
			$(this).parents('li').removeClass();
			$(this).parents('li').addClass("open");
		});	
		$('#span_collapse').addClass("coll");		
		$('#span_collapse').removeClass("glyphicon-sort-by-attributes")
		$('#span_collapse').addClass("glyphicon-sort-by-attributes-alt")
	}else{				
		$(".menu_principal ul").hide();
		$(".menu_principal li ul").each(function () {	
			$(this).parents('li').removeClass();
		});			
		$('#span_collapse').removeClass("coll");
		$('#span_collapse').removeClass("glyphicon-sort-by-attributes-alt")
		$('#span_collapse').addClass("glyphicon-sort-by-attributes")		
	}
};
function BuscarEnMenu(event){
	event = event.target.value.toLowerCase()
	$(".menu_principal li ul").find('a').each(function () {	
		$(this).parent().parents('li').removeClass();
		$(this).parent().parents('ul').hide();		
	});	
	if (event != ''){	
		$('#span_collapse').addClass("disabled");
		$(".menu_principal li ul").find('a').each(function () {	
			var menua = $(this).text().toLowerCase()
			if( menua.indexOf(event) >= 0){				
				$(this).parent().parents('li').removeClass();	
				$(this).parent().parents('li').addClass("open");
				$(this).parent().parents('ul').show();
				$(this).show();				
			}else{$(this).hide();}
		});		
	}else{
		$(".menu_principal li").show();	
		$(".menu_principal li a").show();	
		$('#span_collapse').removeClass("disabled");
	}
	$(".menu_principal").show();
};
function BuscarPaginaActual(){
	var pathname = $(location).attr('pathname').split('/');	
	pathname = pathname[pathname.length - 1]; 	
	$(".menu_principal li").find('a').each(function () {
		var href = $(this).attr('href')
		if (href == pathname){			
			$(this).parent().toggleClass("active");
			$(this).parent().parents('li').toggleClass("open");					
		}
	}); 
}; 
/*hasta aqui themeboostrap*/	

var BrowserDetect = {init: function () {this.browser = this.searchString(this.dataBrowser) || "An unknown browser"; this.version = this.searchVersion(navigator.userAgent)|| this.searchVersion(navigator.appVersion)|| "an unknown version"; this.OS = this.searchString(this.dataOS) || "an unknown OS";}, searchString: function (data) { for (var i=0;i<data.length;i++)	{ var dataString = data[i].string; var dataProp = data[i].prop; this.versionSearchString = data[i].versionSearch || data[i].identity;	if (dataString) {if (dataString.indexOf(data[i].subString) != -1)	return data[i].identity; }	else if (dataProp)	return data[i].identity;}},	searchVersion: function (dataString) {	var index = dataString.indexOf(this.versionSearchString);	if (index == -1) return; return parseFloat(dataString.substring(index+this.versionSearchString.length+1));	},	dataBrowser: [{	string: navigator.userAgent,subString: "Chrome",identity: "Chrome"},{ 	string: navigator.userAgent,subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb"},	{string: navigator.vendor,subString: "Apple",identity: "Safari",versionSearch: "Version"},	{prop: window.opera,identity: "Opera"},	{string: navigator.vendor,subString: "iCab",identity: "iCab"},{string: navigator.vendor,		subString: "KDE",identity: "Konqueror"},{string: navigator.userAgent,subString: "Firefox",identity: "Firefox"},	{string: navigator.vendor,			subString: "Camino",identity: "Camino"},{string: navigator.userAgent,subString: "Netscape",	identity: "Netscape"},{string: navigator.userAgent,	subString: "MSIE",identity: "Explorer",	versionSearch: "MSIE"},{string: navigator.userAgent,subString: "Gecko",	identity: "Mozilla",	versionSearch: "rv"	},	{ string: navigator.userAgent,subString: "Mozilla",	identity: "Netscape",versionSearch: "Mozilla"}],dataOS : [{			string: navigator.platform,	subString: "Win",identity: "Windows"},{	string: navigator.platform,	subString: "Mac",identity: "Mac"},{string: navigator.userAgent, subString: "iPhone",identity: "iPhone/iPod"},{string: navigator.platform,subString: "Linux",identity: "Linux"}]};BrowserDetect.init();
simplexhr={
  doxhr:function(container,url){  	
    simplexhr.outputContainer=document.getElementById(container);    
    var request;
    try{
      request = new XMLHttpRequest();
    }catch(error){
      try{
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }catch(error){
        return true;
      }
    }
    request.open('get',url,true);
    request.onreadystatechange=function(){
      if(request.readyState == 1){
        simplexhr.outputContainer.innerHTML='';
      }
      if(request.readyState == 4){
        if (request.status && /200|304/.test(request.status))
        {
          simplexhr.retrieved(request);
        } else{
          simplexhr.failed(request);
        }
      }
    }
    request.setRequestHeader('If-Modified-Since','Wed, 05 Apr 2006 00:00:00 GMT');
    request.send(null);
    return false;
  },
  retrieved:function(requester){
    var data=requester.responseText;
	data=data.replace(/\n/g,'<br />');	
	var link = '<link rel="stylesheet" type="text/css" href="Shared/ext/resources/css/' + data + '"/>' ;
	document.getElementsByTagName("head")[0].innerHTML += link;	 	
	return false;
  },
  failed:function(requester){
    alert('The XMLHttpRequest failed. Status: '+requester.status);
  	return true;
  }
}
function AppTemplateSearch(){
	var search=document.getElementById("search");	
	var referencia=document.getElementById("referencia");	
	referencia.href = "buscar.aspx?" + search.value	
}
function EventsHandler(e,func)
{
  if(e){e = e;} 
  else {e = window.event;}  
  if(e.which)
  {var keycode = e.which;} 
  else {var keycode = e.keyCode;}  
  if(keycode == 13){  
  if (func==1){  
	var search=document.getElementById("search");	
	if (BrowserDetect.browser=='Opera'){
		setTimeout(function () {window.location.href = "buscar.aspx?" + search.value;}, 0);		
	}else	{
		window.location = "buscar.aspx?" + search.value
	}
	}   
  }  
}
AppTemplateLoad = function(){	
	var pause = 500;	
	var countDownObj = document.getElementById("countDown");	
	countDownObj.count = function(i) {	
		countDownObj.innerHTML = i		
		if (i == 0)	{			
			gx.evt.execEvt('ELOAD_MPAGE.');
			return;
		}
		else{
			gx.evt.execEvt('ELOAD_MPAGE.');
			setTimeout(function(){countDownObj.count(i - 1);},pause);			
		}						
	}  		
    countDownObj.count(2);
}