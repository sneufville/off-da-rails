Rails.application.routes.draw do
  get 'homepage/index'
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "homepage#index"
  resources :about_page, only: [:index, :show, :update]
  resources :contact_page, only: [:index, :show]
  resources :items, only: [:index, :show]
  resources :item_categories, only: [:index, :show]
  get '/item_categories/:id/items', to: "item_categories#items_for_category"
  # provinces - data only route
  get '/api/provinces', to: 'provinces#index'
  # customer profile
  # resources :customer_profiles, only: [:index]
  get '/customer_profiles/check', to: 'customer_profiles#get_current_profile'
  get '/customer_profiles/me', to: 'customer_profiles#index'
  post '/customer_profiles/me', to: 'customer_profiles#create_or_update_profile'
  put '/customer_profiles/me', to: 'customer_profiles#create_or_update_profile'
  # customer orders and cart
  # view routes
  get '/customer_orders/customer_cart', to: 'customer_orders#customer_cart'
  # api routes
  get '/api/customer_orders/cart', to: 'customer_orders#api_cart'
  post '/api/customer_orders/cart/:id', to: 'customer_orders#api_add_to_cart'
  delete '/api/customer_orders/cart/:id', to: 'customer_orders#api_delete_from_cart'
end
