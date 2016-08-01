class MoviesController < ApplicationController

  post '/?' do
    movie = Movie.create title: params['title'], img: params['img'], plot: params['plot'], year: params['year'], rating: params['rating'], actors: params['actors'], user_id: session[:user_id]
    movies = Movie.all
    movies.to_json

  end
  get '/?' do
    movies = Movie.all
    movies.to_json

  end

end
