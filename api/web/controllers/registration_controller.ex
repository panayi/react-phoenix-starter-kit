defmodule App.RegistrationController do
  use App.Web, :controller

  alias App.User

  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params}) do
    changeset = User.registration_changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        payload = Map.take(user, [:id, :name, :email])
        App.Endpoint.broadcast(
          "users:new",
          "new:user",
          %{attributes: payload, type: "users"}
        )

        conn = Guardian.Plug.api_sign_in(conn, user, :token)

        conn
        |> put_status(:created)
        |> put_resp_header("location", app_user_path(conn, :show, user))
        |> render(App.SessionView, "show.json", %{token: Guardian.Plug.current_token(conn)})
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(App.ChangesetView, "error.json", %{
          id: "register",
          changeset: changeset
        })
    end
  end
end
