function loadXMLDoc(url,delegate) {
	var xmlhttp = new XMLHttpRequest();
	if (xmlhttp != null) {
		xmlhttp.onreadystatechange =function(){delegate(xmlhttp)};
		xmlhttp.open("GET", url, true);
		xmlhttp.send(null);
	} else {
		alert("你的浏览器不支持XMLHttpRequest");
	}
}

function RefreshRecentContests()
{
    loadXMLDoc("http://contests.acmicpc.info/contests.json",function(xhr){
        RecentContestsResponse(xhr);
    });
}

function RecentContestsResponse(xhr)
{
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            localStorage.RecentContests = xhr.responseText;
            text = localStorage.RecentContests;
            list = JSON.parse(text);
            var now = new Date();
            var tmp = 0;
        	for(var i = 0 ; i < list.length ; ++ i){
        		var time = list[i].start_time
        		var nxt = new Date(Date.parse(time));
        		nxt.setHours(nxt.getHours() - 12);
        		if(now >= nxt) tmp++;
        	}
        	if(tmp == 0)chrome.browserAction.setBadgeText({text: ""});
        	else chrome.browserAction.setBadgeText({text: tmp.toString()});
        }
    }
}

RefreshRecentContests();
chrome.alarms.create({delayInMinutes: 5});

chrome.alarms.onAlarm.addListener(function() {
  RefreshRecentContests();
  chrome.alarms.create({delayInMinutes: 5});
});