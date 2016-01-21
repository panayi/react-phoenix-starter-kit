defmodule Api.V1.SessionController do
  use Api.Web, :controller

  def create(conn, %{"session" => session_params}) do
    case Api.Session.authenticate(session_params, Api.Repo) do
      # If the user is authenticated, send back a new JWT
      {:ok, user} ->
        conn = Guardian.Plug.api_sign_in(conn, user, :token)

        conn
        |> put_status(:created)
        |> render(Api.V1.SessionView, "show.json", jwt: Guardian.Plug.current_token(conn))
      :error ->
        conn
        |> put_status(:unprocessable_entity)
    end
  end

  def unauthenticated_api(conn, _params) do
    conn
    |> put_status(:unauthorized)
    |> render(Api.V1.SessionView, "error.json", error: "Not Authenticated")
  end
end
