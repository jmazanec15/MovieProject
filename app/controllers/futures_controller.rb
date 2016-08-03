class FuturesController < ApplicationController
  delete '/delete/?' do
    # Delete a  movie
    future = Future.find params['idToDelete']
    if future
      future.destroy
      { status: 'worked', message: 'Movie deleted' }.to_json
    else
      { status: 'error', message: 'Cannot delete movie' }.to_json
    end
  end
  post '/move' do
    future = Future.find params['idToFind']
    movie = Movie.create title: future['title'], img: future['img'], plot: future['plot'], year: future['year'], rating: future['rating'], actors: future['actors'], user_id: session[:user_id]
    movies = Movie.all
    movies.to_json
    if future
      future.destroy
      { status: 'worked', message: 'Movie deleted' }.to_json
    else
      { status: 'error', message: 'Cannot delete movie' }.to_json
    end


  end
  post '/' do
    future = Future.create title: params['title'], img: params['img'], plot: params['plot'], year: params['year'], rating: params['rating'], actors: params['actors'], user_id: session[:user_id]
    futures = Future.all
    future.to_json


  end
  get '/?' do
    futures    = Future.all
    userid   = session[:user_id].to_s
    newFutures = futures.select {|futurex|  futurex.user_id == userid 
     # p moviex.user_id + ' movie_id' 
     # p user_id + ' user_id'
   }

    newFutures.to_json

  end
end
