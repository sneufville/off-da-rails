class CustomerProfilesController < ApplicationController
  before_action :authenticate_user!, :get_profile, only: [:index, :create_or_update_profile, :api_update_profile]
  protect_from_forgery

  # get the current profile, i.e profile for the logged in user

  def get_current_profile
    render json: {
      current_profile: @current_profile
    }
  end

  def index

    render inertia: 'CustomerProfiles/CustomerProfile', props: {
      customer_profile: @current_profile,
      profile_id: @current_profile ? @current_profile.id : nil
    }
  end

  def create_or_update_profile
    _params = profile_params
    begin
      # try to create or update the user's existing profile
      if @current_profile
        # update the current profile
        if @current_profile.update(_params)
          render inertia: 'CustomerProfiles/CustomerProfile', props: {
            profile_updated: true,
            customer_profile: @current_profile,
          }
        else
          render inertia: 'CustomerProfiles/CustomerProfile', props: {
            profile_updated: false,
            form_data: params,
            customer_profile: @current_profile,
            submission_errors: @current_profile.errors
          }, status: :unprocessable_content
        end

      else
        profile = CustomerProfile.new(_params)
        profile.user_id = current_user.id
        if profile.save
          @current_profile = profile
          render inertia: 'CustomerProfiles/CustomerProfile', props: {
            profile_updated: true,
            customer_profile: profile
          }
        else
          render inertia: 'CustomerProfiles/CustomerProfile', props: {
            profile_updated: false,
            customer_profile: nil,
            form_data: params,
            submission_errors: profile.errors
          }, status: :unprocessable_content
        end
      end
    end
  end

  def api_update_profile
    _params = profile_params
    begin
      if @current_profile
        if @current_profile.update(_params)
          return render json: {
            success: true,
            message: 'Profile updated'
          }, status: :accepted
        else
          return render json: {
            success: false,
            message: 'Profile not updated'
          }, status: :bad_request
        end
      else
        return render json: {
          success: false,
          message: 'Profile not set up'
        }
      end
    end
  end

  private
  def profile_params
    params.require(:customer_profile).permit(:first_name, :last_name, :city, :country, :phone_number, :street_address_1, :street_address_2, :province_id)
  end

  def get_profile
    begin
      @current_profile = CustomerProfile.find_by(:user_id => current_user.id)
    rescue
      @current_profile = nil
    end
  end
end
