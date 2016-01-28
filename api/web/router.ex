defmodule App.Router do
  use App.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  post "login", App.SessionController, :create
  post "register", App.RegistrationController, :create

  scope "/api", App, as: :app do
    pipe_through :api

    get "/profile", Api.ProfileController, :show
    resources "/users", Api.UserController, except: [:new, :edit]
  end
end
