class ApplicationController < ActionController::Base

  def session_check
    if user_signed_in?
      puts "user signed in"
      {
        'current_user' => current_user,
        'user_profile' => nil,
      }
    else
      puts "user not signed in"
      {
        'current_user' => nil,
        'user_profile' => nil,
      }
    end
  end

  inertia_share do
    session_check
  end

end
