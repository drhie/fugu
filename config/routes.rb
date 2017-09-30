Rails.application.routes.draw do
  get 'categories/create'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"

  resources :spreadsheets
  resources :items, except: [:index, :show]
  resources :categories, only: [:create]

  get 'spreadsheets/:id/last_item' => 'spreadsheets#last_item'

end
