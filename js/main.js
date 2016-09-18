function getdata()
{
	$('#loading-image').show();
	$.ajax({
		url : "https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites",
		type : "POST",
		dataType : "JSON",
		success : function(result){
			$('#loading-image').hide();
			json_data = result;
			var i=0;
			//alert(result.websites[0].title);
			document.getElementById("website_count").className = "website-count";
			document.getElementById("count").innerHTML = "We've found "+result.websites.length+" personal web portfolios";
			for(i=0;i<result.websites.length;i++)
			{
				var card_content = '<div class="row back"><div class="col-sm-1"><img class="favicon" src="'+result.websites[i].favicon_image+'" /></div><div class="col-sm-1"></div><div class="col-sm-10"><h4>'+result.websites[i].title+'</h4><div class="row"><div class="col-sm-5"><p><i class="fa fa-tag" aria-hidden="true"></i>'+result.websites[i].tag+'</p></div><div class="col-sm-7"><p><i class="fa fa-paperclip" aria-hidden="true"></i><a target="_blank" href="'+result.websites[i].url_address+'">'+result.websites[i].url_address+'</a></p></div></div></div>';				
				document.getElementById("card_box").innerHTML += card_content;			
			}
		},
		error: function(error){
			$('#loading-image').hide();
			alert(JSON.stringify(error));
		}
	});
}
$(window).load(function(){
	$('#search_input').keyup(function(){
		var search_result = [];
		var searchVal = document.getElementById("search_input").value;
		var regex = new RegExp(searchVal, "i");
		for(var k=0;k<json_data.websites.length;k++)
		{
			if(json_data.websites[k]["title"].search(regex) != -1 || json_data.websites[k]["tag"].search(regex) != -1 || json_data.websites[k]["url_address"].search(regex) != -1)
			{
				search_result.push(json_data.websites[k]);
			}
		}
		//alert(search_result[0].title);
		document.getElementById("card_box").innerHTML = "";
		for(i=0;i<search_result.length;i++)
		{
			var card_content = '<div class="row back"><div class="col-sm-1"><img class="favicon" src="'+search_result[i].favicon_image+'" /></div><div class="col-sm-1"></div><div class="col-sm-10"><h4>'+search_result[i].title+'</h4><div class="row"><div class="col-sm-5"><p>'+search_result[i].tag+'</p></div><div class="col-sm-7"><p><a target="_blank" href="'+search_result[i].url_address+'">'+search_result[i].url_address+'</a></p></div></div></div>';				
			document.getElementById("card_box").innerHTML += card_content;			
		}
	})
})

function pushdata()
{
	var title = document.getElementById("title").value;
	var url = document.getElementById("url").value;
	var tag = document.getElementById("tag").value;

	var link = "https://hackerearth.0x10.info/api/one-push?type=json&query=push&title="+title+"&url="+url+"&tag="+tag+"";
	alert(link);

	$.ajax({
		url : link,
		type : "GET",
		success : function(response){
			alert(response);
		},
		error: function(error){
			alert(JSON.stringify(error));
		}		
	});
}
