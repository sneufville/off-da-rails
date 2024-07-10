class ContactPageController < ApplicationController
  before_action :set_contact_page, only: [:index, :show]

  def index
  end

  def show
  end

  private
  def set_contact_page
    @contact_page = ContactPage.first
  end
end
