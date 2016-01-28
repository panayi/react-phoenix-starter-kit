defmodule App.ApiController do
  use App.Web, :controller

  # Simple authentication provided by Guardian
  # This code will check every incoming HTTP request for a JWT in the
  # 'Authorization' header
  # plug Guardian.Plug.EnsureAuthenticated, on_failure: { App.ApiController, :unauthenticated_api }

  def unauthenticated_api(conn, _params) do
    conn
    |> put_status(401)
    |> render(App.ApiView, "error.json", %{
      id: "authenticate",
      title: "Unauthenticated access",
      detail: "Unable to process request due to failed authentication",
      status: 401
    })
  end
end
