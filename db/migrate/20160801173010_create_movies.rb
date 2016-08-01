class CreateMovies < ActiveRecord::Migration
  def change
  	 create_table  :movies do |table|
      table.string :title
      table.string :plot
      table.string :img
      table.string :rating
      table.string :year
      table.string :actors
      table.string :user_id
      
    end
  end
end
