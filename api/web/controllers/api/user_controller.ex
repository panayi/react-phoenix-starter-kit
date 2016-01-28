defmodule App.Api.UserController do
  use App.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, on_failure: { App.ApiController, :unauthenticated_api }

  alias App.User

  plug :scrub_params, "user" when action in [:create, :update]

  def index(conn, params) do
    users = Repo.all(User)
    render(conn, "index.json", %{users: users, conn: conn, params: params})
  end

  def create(conn, %{"user" => user_params}) do
    changeset = User.registration_changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", app_user_path(conn, :show, user))
        |> render("show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(App.ChangesetView, "error.json", %{id: "user.create", changeset: changeset})
    end
  end

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Repo.get!(User, id)
    changeset = User.changeset(user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        render(conn, "show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(App.ChangesetView, "error.json", %{id: "user.update", changeset: changeset})
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Repo.get!(User, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user)

    send_resp(conn, :no_content, "")
  end
end
