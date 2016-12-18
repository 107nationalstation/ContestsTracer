function AddRecentContest(contest){
	var line=$("<tr></tr>");
    var name=$("<a></a>").text(contest.name);
    name.attr({
        "href":contest.link,
        "target":"_blank"
    });
    name=$("<td></td>").append(name);
    var starttime=$("<td></td>").text(contest.start_time);
    line.append(name,starttime);
    $("#table_RecentContests tbody").append(line);
}

function gao(){
  	$("#table_RecentContests tbody tr").remove();
  	text = localStorage.RecentContests;
  	if(text == null) return;
  	list = JSON.parse(text);
  	for(var i = 0 ; i < list.length ; ++ i)
  		AddRecentContest(list[i]);
};

gao();
