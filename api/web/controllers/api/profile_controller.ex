defmodule App.Api.ProfileController do
  use App.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, on_failure: { App.ApiController, :unauthenticated_api }

  def show(conn, params) do
    case Guardian.Plug.current_resource(conn) do
      nil ->
        conn
        |> put_status(404)
        |> render(App.ErrorView, "error.json", %{
          id: "profile.show",
          title: "User not found",
          detail: "Failed to retrieve current user",
          status: 404
        })
      user ->
        conn
        |> put_status(:ok)
        |> render(App.Api.ProfileView, "show.json", %{user: user, conn: conn, params: params})
    end
  end
end
