class MoviesController < ApplicationController

  delete '/delete/?' do
    # Delete a  movie
    movie = Movie.find params['idToDelete']
    p params['idToDelete']
    if movie
      movie.destroy
      { status: 'worked', message: 'Movie deleted' }.to_json
    else
      { status: 'error', message: 'Cannot delete movie' }.to_json
    end
  end



  patch '/patch/?' do 

    movie = Movie.find params['idToFind']
    p '_____________________'
    p '_____________________'
    p '_____________________'
    p params['idToFind']
    p params['rating']
    p '_____________________'
    p '_____________________'
    p '_____________________'
    

    movie.update rating: params['rating']

    movie[:rating]
  end  

  get '/logout/?' do
    session[:is_logged_in] = false
    'Cool'  
  end  

  post '/seen' do
    movie = Movie.create title: params['title'], img: params['img'], plot: params['plot'], year: params['year'], rating: params['rating'], actors: params['actors'], user_id: session[:user_id]
    movies = Movie.all
    movies.to_json

  end

  get '/?' do
    movies    = Movie.all
    userid   = session[:user_id].to_s
    newMovies = movies.select {|moviex|  moviex.user_id == userid 
     # p moviex.user_id + ' movie_id' 
     # p user_id + ' user_id'
   }

    newMovies.to_json

  end

end
