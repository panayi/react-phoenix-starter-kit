defmodule Api.V1.RegistrationController do
  use Api.Web, :controller

  alias Api.User

  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params}) do
    changeset = User.registration_changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        broadcast_user = Map.take(user, [:id, :username, :email])
        Api.Endpoint.broadcast("users:new", "new:user", %{user: broadcast_user})
        conn
        |> put_status(:created)
        |> put_resp_header("location", v1_user_path(conn, :show, user))
        |> render(Api.V1.UserView, "show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Api.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
