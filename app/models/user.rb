class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :spreadsheets
  has_many :categories
  has_many :items, through: :spreadsheets

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
