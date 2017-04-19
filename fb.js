var count = 1;
setInterval(function(){
	function saveFile(data, fileName) {
		var DOMURL = self.URL || self.webkitURL || self;
		var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
		var url = DOMURL.createObjectURL(blob);

		var hyperlink = document.createElement('a');
		hyperlink.href = url;
		hyperlink.target = '_blank';
		hyperlink.download = fileName;
		hyperlink.click();

		DOMURL.revokeObjectURL(url);
	}
	document.querySelectorAll(".UFIReplyList").forEach(
		function(res,e){
			res.remove();
		}
	);
	var dataArray = [];
	var UFIComment = document.querySelectorAll(".UFIComment");
	if (UFIComment.length > 0) {
		UFIComment.forEach(
			function(res,e){
				var actorName = res.querySelector(".UFICommentActorName");
				if (actorName != null) {
					var dataHovercard = actorName.getAttribute("data-hovercard");
					var name = actorName.innerText;
					var commentBody = res.querySelector(".UFICommentBody");
					var id = dataHovercard.substring(dataHovercard.indexOf("id=")+3, dataHovercard.lastIndexOf("&"));
					console.log(name);
					//console.log(commentBody.innerText);
					console.log(id);
					var item = {
						id: id,
						name: name,
						comment: commentBody.innerText
					}
					dataArray.push(item);
					res.remove();
				}
			}
		)
		saveFile(JSON.stringify(dataArray), count + '_data.txt');
		count++;
	}
	document.querySelector(".UFIPagerLink").click();
}, 5000);
