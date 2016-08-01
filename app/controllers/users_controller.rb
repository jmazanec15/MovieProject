class UsersController < ApplicationController

  post '/login/?' do
    user = User.find_by username: params['username']
    if user
      password = BCrypt::Password.new user.password
      if password == params['password']
        session[:is_logged_in] = true
        session[:user_id] = user.id
        redirect :main
      else
        'wrong passoword'
      end
    else
      'wrong username'
    end
  end

  get '/main/?' do
    if session[:is_logged_in]
      erb :main
    else
      redirect '/'
    end
  end

  get '/?' do
    erb :home
  end

  post '/?' do
    newPassword = BCrypt::Password.create params['password']
    user = User.create username: params['username'], email: params['email'], password: newPassword

    if user
      session[:is_logged_in] = true
      session[:user_id] = user.id
      redirect :main
    else
      'User was not created'
    end
  end
end
