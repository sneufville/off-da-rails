class HomepageController < ApplicationController
  def index
    render inertia: 'Home', props: {
      name: 'Off_Da_RailZ Coffee Co'
    }
  end
end
