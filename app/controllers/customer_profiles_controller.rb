class CustomerProfilesController < ApplicationController
  before_action :authenticate_user!, :get_profile, only: [:index, :create_or_update_profile]

  # get the current profile, i.e profile for the logged in user

  def get_current_profile
    render json: {
      current_profile: @current_profile
    }
  end

  def index

    render inertia: 'CustomerProfiles/CustomerProfile', props: {
      'current_profile': @current_profile
    }
  end

  def create_or_update_profile
    profile_params = params.require(:profile).permit(:first_name, :last_name)
    profile_params[:customer_id] = @current_profile.customer_id
    begin
      # try to create or update the user's existing profile
      if @current_profile
        # update the current profile
        profile = CustomerProfile.update(profile_params)
      else
        profile = CustomerProfile.new(profile_params)
      end

      if profile.save
        render json: {
          success: true,
          profile: profile
        }
      else
        render json: {
          success: false,
          profile: nil,
          errors: profile.errors.full_messages
        }, status: :unprocessable_content
      end
    end
  end

  private
  def get_profile
    begin
      @current_profile = CustomerProfile.find_by(:customer_id => current_user.id)
    rescue ActiveRecord::RecordNotFound
      @current_profile = nil
    end
  end
end
