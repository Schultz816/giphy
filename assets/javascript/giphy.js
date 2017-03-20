var topics = ["otter", "anteater", "dog", "sloth", "alligator", "cow", "orangutan", "mandrill", "manatee", "pigeon", "buffalo", "moose"];
// creates buttons from above var
installAnimalButtons();

// creates new animal button at end of array.  false return prohibits page from reloading
$('#addAnimal').on('click', function() {
    var animalEntered = $('#animalInput').val().trim();
    topics.push(animalEntered);
    $('#animalInput').val('');
    installAnimalButtons();

    return false;
});

$(document.body).on('click', '.button-list', function() {
    
    var animalName = $(this).data('animal');
    
    var query = 'http://api.giphy.com/v1/gifs/search?q=' + animalName + '&limit=10&api_key=dc6zaTOxFJmzC';

    $('#topics').empty();


$.ajax({
	url: query,
 	method: 'GET'

}).done(function(response) {
        
        var results = response.data;

        
        for (i = 0; i < results.length; i++) {
            var newGif = $('<div class="col-sm-4">');
            var rating = results[i].rating.toUpperCase();
            var p = $('<p>').html('Rating: ' + rating);
            p.addClass('text-center');
            var img = $('<img>');
            // defines gif attributes
            img.attr('src', results[i].images.fixed_height_small_still.url);
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            img.attr('data-clicked', 'still');
            img.addClass('gif-margin gif center-block panel');
          
            newGif.append(p);
            newGif.append(img);
            
            $('#topics').append(newGif);
        }
    });
});


$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});

 function installAnimalButtons() {
     $('#animalButtons').empty();

     for (var i = 0; i < topics.length; i++) {
         var button = $('<button>').addClass('btn btn-primary button-list');
         button.attr('data-animal', topics[i]).html(topics[i]);
         $('#animalButtons').append(button);
    }
}