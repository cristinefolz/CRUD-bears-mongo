var deleteBear = function(event){
	event.preventDefault();

	var id = $(event.target).closest('tr').attr('id'); // find the bear by attribute id
	var bear = $(event.target).closest('tr');
	
	if(confirm('Do you want to remove bear: ' + id)) {

		$.ajax({						  // ajax method to delete the bear from the dbase
			url: '/api/bears/' + id,
			method: 'DELETE',
		}).done(function(){
			console.log('delete the bear!')
			bear.remove();  // remove the html table row
		})
	}	
};


var createBear = function(event){

    event.preventDefault();

    // find the values for our variables
	var name = $('#bearName').val();
	var age = $('#bearAge').val();
	var gender = $('#bearGender').val();
	var $table = $('#bearTable');

	// create a bear with the values assigned to properties
	var bear = {};
		bear.name = name;
		bear.age = age;
		bear.gender = gender;


	$.ajax({						         // ajax method to add bear to the dbase
			url: '/api/bears/',
			method: 'POST',					// POST = create
			data: bear,  // the url is expecting data; we are sending the data in the 'bear' object
		}).done(function(data){
			console.log('added the bear!', data);
			$table.append('<tr id=' + data._id +'>\
						<td>' + data.name + '\
						</td>\
						<td>' + data.age + '\
						</td>\
						<td>' + data.gender + '\
						</td>\
						<td><button type="delete" class="btn btn-warning deleteBear">Delete</button></td>\
					</tr>');
		
		$('.deleteBear').on('click', deleteBear);
		});	

	$('#bearName').val('');
	$('#bearAge').val(''); 
	$('#bearGender').val('');

};

$('.deleteBear').on('click', deleteBear);
$('#createBear').on('click', createBear);