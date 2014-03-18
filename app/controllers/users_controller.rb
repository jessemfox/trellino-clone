class UsersController < ApplicationController
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_params)
    
    if @user.save
      @user.reset_session_token!
      session[:session_token] = @user.session_token
      
      redirect_to root_url
    else
      render json: { errors: @user.errors.full_messages }
    end
  end
  
  
  def show
    @user = User.find(params[:id])
    render :json => @user
  end
  
  def index
    @users = User.all
    render :json => @users.to_json(only: [:id, :email]) 
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
