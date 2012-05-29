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
	$('#input_table', window.parent.document).clone().appendTo('body');
	$('caption, th, td').each(function(){
		i = $(this).find('input');
		v = i.val();
		p = i.parent();
		p.empty();
		p.text(v);
	});
	type = $.getUrlVar('type');
	if(type == 'pie'){ $('table').visualize({type: 'pie', parseDirection: $.getUrlVar('axis'), height: '300px', width: '420px'}); }
	else if(type == 'bar'){ $('table').visualize({type: 'bar', parseDirection: $.getUrlVar('axis'), width: '420px'}); }
	else if(type == 'area'){ $('table').visualize({type: 'area', parseDirection: $.getUrlVar('axis'), width: '420px'}); }
	else{ $('table').visualize({type: 'line', parseDirection: $.getUrlVar('axis'), width: '420px'}); }
});
