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
			console.log(array[0][1])
			for (var i = array[0].length - 1; i >= 0; i--) {
				$("#saved-list").append('<li>' + array[0][i].title + '</li>')
			}
			
		},
		error: function(err) {
			console.log('something went wrong')
			console.log(err)
		}
	})
}
makeList();

$("#searchButton").click(function() {
	$("#movie-title").empty()
	$("#movie-image").empty()
	$.ajax({
	url: 'http://www.omdbapi.com/?t=' + $("#searchBar")[0].value + '&y=&plot=short&r=json',
	type: 'get',
	success: function(res) {
		movieTitle  = res.Title
		movieImage  = res.Poster
		moviePlot   = res.Plot
		movieYear   = res.Year
		movieRated 	= res.Rated	
		movieActors = res.Actors
		$("#movie-title").append(res.Title)
		$("#movie-image").append('<img src="' + res.Poster + '">')
		$("#addToList").css("display", "inline");
		console.log(res)
	},
	error: function(err) {
		console.log(err)
	}

})
})


$("#addToList").click(function() {

	$.ajax({
		url: '/movie',
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

