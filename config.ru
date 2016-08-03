ENV['RACK_ENV'] ||= 'development'

require 'bundler'
Bundler.require :default, ENV['RACK_ENV'].to_sym

ActiveRecord::Base.establish_connection(
    :adapter => 'sqlite3',
    :database => 'db.sqlite3'
  )

require './app/models/user'
require './app/models/movie'
require './app/models/future'

require './app/controllers/application_controller'
require './app/controllers/users_controller'
require './app/controllers/movies_controller'
require './app/controllers/futures_controller'

map('/movie') { run MoviesController }
map('/future') { run FuturesController }
map('/') { run UsersController }
