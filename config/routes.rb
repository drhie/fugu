Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "users/registrations", sessions: "users/sessions", passwords: "users/passwords" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"
  get 'spreadsheets/:id/last_item' => 'spreadsheets#last_item'
  get 'spreadsheets/preview' => 'spreadsheets#preview', as: :spreadsheet_preview
  delete 'spreadsheets/:id/categories/:name' => 'spreadsheets#delete_category'

  post 'searches' => 'searches#search', as: :search
  resources :searches, only: :index
  resources :spreadsheets
  resources :items, except: [:index, :show]
  resources :categories, only: [:index, :create, :show]

end
