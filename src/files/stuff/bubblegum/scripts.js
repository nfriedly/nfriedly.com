/**
 * @author Nathan Friedly - http://nfriedly.com
 */
window.onload = function() {
	rad = 20;
	settingsMain = {
	  tl: { radius: 20 },
	  tr: { radius: 20 },
	  bl: { radius: 20 },
	  br: { radius: 20 },
	  antiAlias: true,
	  autoPad: false
	}

	settingsMenu = {
	  tl: false,
	  tr: { radius: 20 },
	  bl: false,
	  br: { radius: 20 },
	  antiAlias: true,
	  autoPad: false
	}	
	
	if(navigator.userAgent) 
		if(navigator.userAgent.indexOf("MSIE") != -1)
			{
				//alert("IE can't handle this page corectly!\n\nDowngrading page...");
				settingsMain.antiAlias=false;
				settingsMenu.antiAlias=false;				
			}
		
	
	var divObj = document.getElementById("main");
	var cornersObj = new curvyCorners(settingsMain, divObj);
	cornersObj.applyCornersToAll();
		
	var divObj = document.getElementById("menu");
	var cornersObj = new curvyCorners(settingsMenu, divObj);
	cornersObj.applyCornersToAll();
	
	var alerts = document.getElementsByClassName("alert");
	for(x in alerts)
	{
		if(alerts[x].nodeName){
			var cornersObj = new curvyCorners(settingsMain, alerts[x]);
			cornersObj.applyCornersToAll();
		}
	}

}

if(typeof document.getElementsByClassName == "undefined") {
	//from http://www.netlobo.com/javascript_getelementsbyclassname.html
	document.getElementsByClassName = function(clsName){
		var retVal = new Array();
		var elements = document.getElementsByTagName("*");
		for(var i = 0;i < elements.length;i++){
			if(elements[i].className.indexOf(" ") >= 0){
				var classes = elements[i].className.split(" ");
				for(var j = 0;j < classes.length;j++){
					if(classes[j] == clsName)
						retVal.push(elements[i]);
				}
			}
			else if(elements[i].className == clsName)
				retVal.push(elements[i]);
		}
		return retVal;
	}
}
