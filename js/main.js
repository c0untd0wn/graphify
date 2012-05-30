$('document').ready(function(){
	// generate input table
	/*
	for(var i=0; i<6; i=i+1){
		$('#input_table').append('<tr class="row"></tr>');
	}
	for(var i=0; i<6; i=i+1){
		$('tr').append('<td class="block"></td>');
	}
	$('td').append('<input type="text" />');
	$('td input').first().remove();
	*/

	// '<iframe>'.concat($('#table_iframe').contents().find('html').html(), '</iframe>')

	$('th').append('<input type="text" class="input-mini" placeholder="Label" />');
	$('td').append('<input type="text" class="input-mini" placeholder="Data" />');
	$('thead tr td').empty().text('#');

	$('#myModal').modal({ keyboard: false, show: false });
	$('#myModal').on('shown', function(){

	});
	$('#embed').click(function(){
		$('.modal-body').append('<div class="alert fade in"><button class="close" data-dismiss="alert">x</button><strong>Copy the code below</strong><br /><input type="textarea" style="width:100%;" /></div>');
		$('.modal-body input').val('<iframe>'.concat($('#table_iframe').contents().find('html').html(), '</iframe>'));
	});

	// attach tooltips
	$('caption').popover({ title: 'Recommendation!', content: 'A title for the graph is recommended!', trigger: 'manual', placement: 'right' });
	$('tbody').popover({ title: 'Oops! You got an error.', content: 'Some cells are empty! Please fill the highlighted cells to make a graph.', trigger: 'manual', placement: 'right' });


	// generate graph when the button is clicked
	$('#generate_btn').click(function(){
		// check empty cells
		var empty_cell = 0;
		$('thead th:not(:last-child) input').each(function(){
			if($(this).val() == ''){
				$(this).parent().addClass('control-group error');
				empty_cell = 1;
			}
			else{
				$(this).parent().removeClass('control-group error');
			}
		});
		$('tbody tr:not(:last-child) th input').each(function(){
			if($(this).val() == ''){
				$(this).parent().addClass('control-group error');
				empty_cell = 1;
			}
			else{
				$(this).parent().removeClass('control-group error');
			}
		});
		$('tbody tr:not(:last-child) td:not(:last-child) input').each(function(){
			if($(this).val() == ''){
				$(this).parent().addClass('control-group error');
				empty_cell = 1;
			}
			else{
				$(this).parent().removeClass('control-group error');
			}
		});
		if($('caption input').val() == ''){
			$('caption').addClass('control-group warning');
			$('caption').popover('show');
		}
		else{
			$('caption').removeClass('control-group warning');
			$('caption').popover('hide');
		}

		if(empty_cell == 1){
			$('tbody').popover('show');
		}
		else{
			$('tbody').popover('hide');
			$('#table_iframe').remove();

			var values = {};
			$.each($('form').serializeArray(), function(i, field) {
				values[field.name] = field.value;
			});
			var address = 'iframe.html';
			address = address.concat('?', $.param(values));

			$('<iframe />').attr('src', address).attr('id', 'table_iframe').attr('frameBorder', '0').attr('style', 'height:100%;').appendTo('#result .centered');
			$('#myModal').modal('show');
		}
	});

	$('table input').live('change', function(){
		var column_empty = 1;
		var prev_column_empty = 1;
		// check columns
		// check if last column has data
		$('table tr').each(function(){
			if($(this).find('input').last().val() != ''){
				column_empty = 0;
			}
		});
		if(column_empty == 0){
			$('thead tr').append('<th scope="col"><input type="text" class="input-mini" placeholder="Label" /></th>');
			$('tbody tr').append('<td><input type="text" class="input-mini" placeholder="Data" /></td>');
		}
		// check if last column doesn't have data (recursively)
		else if(column_empty == 1){
			while(prev_column_empty == 1){
				if($('table tr').first().children().size() <= 3){
					prev_column_empty = 0;
					console.log('Exceptional First Column!');
				}
				console.log('Recursive Column Deletion!');
				$('table tr').each(function(){
					if($(this).find('input').last().parent().prev().children().val() != ''){
						prev_column_empty = 0;
					}
				});
				// remove last column
				if(prev_column_empty == 1){
					$('thead tr').find('th').last().remove();
					$('tbody tr').each(function(){
						$(this).find('td').last().remove();
					});
				}
			}
		}

		// check rows
		// check if last row has data
		var row_empty = 1;
		var prev_row_empty = 1;
		$('tbody tr').last().children().each(function(){
			if($(this).find('input').val() != ''){
				row_empty = 0;
			}
		});
		if(row_empty == 0){
			$('tbody tr').last().clone().appendTo('tbody');
			$('tbody tr:last input').val('');
		}
		else if(row_empty == 1){
			while(prev_row_empty == 1){
				if($('tbody tr:last').prev().prev().size() == 0){
					prev_row_empty = 0;
					console.log('Exceptional First Row!');
				}
				console.log('Recursive Row Deletion!');
				$('tbody tr:last').prev().children().each(function(){
					if($(this).find('input').val() != ''){
						prev_row_empty = 0;
					}
				});
				// remove last row
				if(prev_row_empty == 1){
					$('tbody tr:last').remove();
				}
			}

		}
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

