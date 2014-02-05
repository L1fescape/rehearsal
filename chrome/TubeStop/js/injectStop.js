var quality = true;
var keyboard = true;

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    keyboard = request.keyboard;
	quality = request.quality;
  }
);

var myPlayer = document.getElementById('watch-player');
function setQuality() { try { if (quality) myPlayer.setPlaybackQuality(myPlayer.getAvailableQualityLevels()[0]); } catch (error) { setTimeout("setQuality()", 100); }}
setQuality();

document.getElementsByClassName = function(className) {	// get document elements with a certain class
	var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
	var allElements = document.getElementsByTagName("*");
	var results = [];

	var element;
	for (var i = 0; (element = allElements[i]) != null; i++) {
		var elementClass = element.className;
		if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
			results.push(element);
	}
	
	return results;
}




document.onkeydown = function(e) { 
	
	if (document.getElementsByClassName("yt-uix-form-textarea comments-textarea")[0] == document.activeElement) return;
	else if (document.getElementById("masthead-search-term") == document.activeElement) return;
	else if (keyboard) {
		if (e.which == 32) {
			if (myPlayer.paused != true) { 
				myPlayer.pauseVideo(); 
				myPlayer.paused = true;
			} 
			else { 
				myPlayer.playVideo(); 
				myPlayer.paused = false; 
			}
			return false;
		}
		else if (e.which == 38 && e.ctrlKey) {
			myPlayer.setVolume(myPlayer.getVolume()+10);
			return false;
		}
		else if (e.which == 40 && e.ctrlKey) {
			myPlayer.setVolume(myPlayer.getVolume()-10);
			return false;
		}
	}
}