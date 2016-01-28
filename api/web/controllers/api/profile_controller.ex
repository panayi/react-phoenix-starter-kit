defmodule App.Api.ProfileController do
  use App.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, on_failure: { App.ApiController, :unauthenticated_api }

  alias App.Profile

  def show(conn, params) do
    case Guardian.Plug.current_resource(conn) do
      nil ->
        conn
        |> put_status(404)
        |> render(App.ApiView, "error.json", %{
          id: "profile.show",
          title: "User not found",
          detail: "Failed to retrieve current user",
          status: 404
        })
      user ->
        conn
        |> put_status(:ok)
        |> render("show.json", %{user: user})
    end
  end
end
