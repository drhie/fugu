Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"
  get 'spreadsheets/:id/last_item' => 'spreadsheets#last_item'

  resources :spreadsheets
  resources :items, except: [:index, :show]
  resources :categories, only: [:index, :create, :show]

end
