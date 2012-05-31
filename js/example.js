// Run the script on DOM ready:
$(function(){
		$.extend({
		  getUrlVars: function(){
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
			  hash = hashes[i].split('=');
			  vars.push(hash[0]);
			  vars[hash[0]] = hash[1];
			}
			return vars;
		  },
		  getUrlVar: function(name){
			return $.getUrlVars()[name];
		  }
		});

		theme = $.getUrlVar('theme');
		if(theme == "light"){
			$("<link/>", {
			   rel: "stylesheet",
			   type: "text/css",
			   href: "css/visualize-light.css"
			}).appendTo("head");
		}
		else{
			$("<link/>", {
			   rel: "stylesheet",
			   type: "text/css",
			   href: "css/visualize-dark.css"
			}).appendTo("head");
		}

	graph_or_table = 0;

	$('#input_table', window.parent.document).clone().prependTo('body');
	$('thead th:last-child').remove();
	$('tbody td:last-child').remove();
	$('tbody tr:last').remove();
	$('input').click(function(){
		if(graph_or_table == 0){
			$('table').show();
			$('.visualize').hide();
			graph_or_table = 1;
			$('input').val('See it in graph');
		}
		else{
			$('table').hide();
			$('.visualize').show();
			graph_or_table = 0;
			$('input').val('See it in table');
		}
	});
	$('caption, th, td').each(function(){
		i = $(this).find('input');
		v = i.val();
		p = i.parent();
		p.empty();
		p.text(v);
	});
	setTimeout(function(){
		$('#input_table').hide();
		type = $.getUrlVar('type');
		if(type == 'pie'){ $('#input_table').visualize({type: 'pie', parseDirection: $.getUrlVar('axis'), height: '300px', width: '420px'}); alert($('table').html()); }
		else if(type == 'bar'){ $('#input_table').visualize({type: 'bar', parseDirection: $.getUrlVar('axis'), width: '420px'}); }
		else if(type == 'area'){ $('#input_table').visualize({type: 'area', parseDirection: $.getUrlVar('axis'), width: '420px'}); }
		else{ $('#input_table').visualize({type: 'line', parseDirection: $.getUrlVar('axis'), width: '420px'}); }
	}, 200);
});
