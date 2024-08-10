class AboutPageController < ApplicationController
  before_action :set_about_page, only: %i[index show update]

  def index; end

  def show; end

  def update; end

  private

  def set_about_page
    @about_page = AboutPage.first
  end
end
