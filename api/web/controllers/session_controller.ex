defmodule App.SessionController do
  use App.Web, :controller

  def create(conn, %{"session" => session_params}) do
    case App.Session.authenticate(session_params, App.Repo) do
      # If the user is authenticated, send back a new JWT
      {:ok, user} ->

        conn = Guardian.Plug.api_sign_in(conn, user, :token)

        conn
        |> put_status(:created)
        |> render(App.SessionView, "show.json",
          %{session: %{token: Guardian.Plug.current_token(conn)}, conn: conn, params: session_params})
      :error ->
        conn
        |> put_status(422)
        |> render(App.ErrorView, "error.json", %{
          id: "login",
          title: "Invalid credentials",
          detail: "The provided credentials do not match an existing user",
          status: 422
        })
    end
  end
end
