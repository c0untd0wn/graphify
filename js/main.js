$('document').ready(function(){
	$('th, td').append('<input type="text" class="input-mini" />');
	$('thead tr td').empty().text('#');
	$('#generate_btn').click(function(){
		$('#table_iframe').remove();

		var values = {};
		$.each($('form').serializeArray(), function(i, field) {
			values[field.name] = field.value;
		});
		var address = 'iframe.html';
		address = address.concat('?', $.param(values));

		$('<iframe />').attr('src', address).attr('id', 'table_iframe').attr('frameBorder', '0').appendTo('#result .centered');

	});

	/*
	$('th, td, caption').dblclick(function(){
		$('th, td, caption').each(function(){
			v = $(this).find('input').val();
			p = $(this).find('input').parent();
			p.empty();
			p.text(v);
		});

		t = $(this).text();
		$(this).empty().append('<input type="text" />');
		$(this).find('input').val(t);
		$(this).find('input').focusout(function(){
			v = $(this).val();
			p = $(this).parent();
			p.empty();
			p.text(v);

			$('#table_iframe').remove();
			$('<iframe />').attr('src', 'iframe.html').attr('id', 'table_iframe').appendTo('body');
		}).keypress(function(e){
			if(e.which == 10 || e.which == 13){
				$(this).trigger('focusout');
			}
		}).focus();
	});
	*/

});

