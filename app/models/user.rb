class User < ActiveRecord::Base
	has_many :movies
	has_many :futures
end
