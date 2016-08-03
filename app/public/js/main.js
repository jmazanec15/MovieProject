console.log('running')

var movieTitle = '',
	movieImage = '',
	moviePlot   = '',
	movieYear   = '',
	movieActors   = '',
	movieRated = '';


function makeList() {
	$.ajax({
		url: '/movie',
		type: 'get',
		data: {
			"title": movieTitle,
			"img": movieImage,
			"plot": moviePlot,
			"year": movieYear,
			"rating": movieRated,
			"actors": movieActors
		},
		success: function(res) {
			$("#saved-list").empty();
			var array = JSON.parse("[" + res + "]");
			for (var i = array[0].length - 1; i >= 0; i--) {
				$("#saved-list").append('<li><p class="title-text">' + array[0][i].title + '<div class="movie-id" style="display:none;">' + array[0][i].id + '</div></p><div class="rating"><span class="stars" tabindex="1">☆</span><span class="stars" tabindex="2">☆</span><span class="stars" tabindex="3">☆</span><span class="stars" tabindex="4">☆</span><span class="stars" tabindex="5">☆</span></div><button class="delete-button">Delete</button></li>')
				
					for (var t = 0; t <= 4; t++) {
	 					if (t<= parseInt(array[0][i].rating)-1) {
	 						document.getElementsByClassName('stars')[t].style.color='gold';
	 					} else {
	 						document.getElementsByClassName('stars')[t].style.color='black';
	 				}
				}
			}
		},
		error: function(err) {
			console.log('something went wrong')
			console.log(err)
		}
	})
}
function makeUpcomingList() {
	$.ajax({
		url: '/future',
		type: 'get',
		data: {
			"title": movieTitle,
			"img": movieImage,
			"plot": moviePlot,
			"year": movieYear,
			"rating": movieRated,
			"actors": movieActors
		},
		success: function(res) {
			$("#saved-upcoming-list").empty();
			var array = JSON.parse("[" + res + "]");
			for (var i = array[0].length - 1; i >= 0; i--) {
				$("#saved-upcoming-list").append('<li><p class="title-text">' + array[0][i].title + '<div class="movie-id" style="display:none;">' + array[0][i].id + '</div></p><button class="delete-upcoming-button">Delete</button><button id="add-to-list-from-up">Add to list</button></li>')
			}
			
		},
		error: function(err) {
			console.log('something went wrong')
			console.log(err)
		}
	})
}
makeUpcomingList();
makeList();

$("#searchButton").click(function() {
	$("#movie-title").empty()
	$("#movie-image").empty()
	$.ajax({
	url: 'http://www.omdbapi.com/?t=' + $("#searchBar")[0].value + '&y=&plot=full&r=json',
	type: 'get',
	success: function(res) {
		movieTitle  = res.Title
		movieImage  = res.Poster
		moviePlot   = res.Plot
		movieYear   = res.Year
		movieActors = res.Actors
		$("#movie-title").append(res.Title)
		$("#movie-plot").append(res.Plot)
		$("#movie-review").append('imdbRating: ' + res.imdbRating)
		$("#movie-image").append('<img src="' + res.Poster + '">')
		$("#addToList").css("display", "inline");
		$("#addToUpcoming").css("display", "inline");
		console.log(res)
	},
	error: function(err) {
		console.log(err)
	}

})
})


$("#addToList").click(function() {

	$.ajax({
		url: '/movie/seen',
		type: 'post',
		data: {
			"title": movieTitle,
			"img": movieImage,
			"plot": moviePlot,
			"year": movieYear,
			"rating": movieRated,
			"actors": movieActors
		},
		success: function(res) {
			console.log(res)
		},
		error: function(err) {
			console.log('something went wrong')
			console.log(err)
		}
	})
	makeList();
})

$("#addToUpcoming").click(function() {


	$.ajax({
		url: '/future',
		type: 'post',
		data: {
			"title": movieTitle,
			"img": movieImage,
			"plot": moviePlot,
			"year": movieYear,
			"rating": movieRated,
			"actors": movieActors
		},
		success: function(res) {
			console.log(res)
		},
		error: function(err) {
			console.log('something went wrong')
			console.log(err)
		}
	})
	makeUpcomingList();
})

$("#logout").click(function() {
	$.ajax({
		url: '/movie/logout',
		type: 'get',
		success: function(res) {
			console.log(res);
			location.reload();
		},
		error: function(err) {
			console.log('something went wrong')
			console.log(err)
		}
	})
})

$(document).on('click', '.delete-button', function() {
	
	id2Delete = $(this).parent()[0].getElementsByClassName('movie-id')[0].innerText

	$.ajax({
		url: '/movie/delete',
		type: 'delete',
		data: {
			"idToDelete": id2Delete
		},
		success: function() {
			console.log("successfully deleted");
		},
		error: function(err) {
			console.log('something went wrong')
			console.log(err)
		}
	})
  $(this).parent().remove()
});

$(document).on('click', '.delete-upcoming-button', function() {
	
	id2Delete = $(this).parent()[0].getElementsByClassName('movie-id')[0].innerText

	$.ajax({
		url: '/future/delete',
		type: 'delete',
		data: {
			"idToDelete": id2Delete
		},
		success: function() {
			console.log("successfully deleted");
		},
		error: function(err) {
			console.log('something went wrong')
			console.log(err)
		}
	})
  $(this).parent().remove()
});

$(document).on('click', '#add-to-list-from-up', function() {
	id2Find = $(this).parent()[0].getElementsByClassName('movie-id')[0].innerText
	$.ajax({
		url: '/future/move',
		type: 'post',
		data: {
			"idToFind": id2Find
		},
		success: function(res) {
			console.log(res)
		},
		error: function(err) {
			console.log('something went wrong')
			console.log(err)
		}
	})
	makeUpcomingList();
	makeList();
});

$(document).on('click', '.rating > span', function() {
	var tabindex = parseInt($(this)[0].getAttribute('tabindex'))
	 for (var i = 0; i <= 4; i++) {
	 	
	 	if (i<= tabindex-1) {
	 	$(this).parent()[0].getElementsByClassName('stars')[i].style.color='gold';
	 	} else {
	 	$(this).parent()[0].getElementsByClassName('stars')[i].style.color='black';
	 }


	 }
id2Find = document.getElementsByClassName('movie-id')[0].innerText
	$.ajax({
		url: '/movie/patch',
		type: 'patch',
		data: {
			"idToFind": id2Find,
			"rating": tabindex
		},
		success: function(res) {
			console.log(res)
		},
		error: function(err) {
			console.log('something went wrong')
			console.log(err)
		}
	})
	// .indexOf(this)
});




