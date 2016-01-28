defmodule App.Api.UserView do
  use JSONAPI.PhoenixView
  alias App.Api.UserView

  def render("index.json", %{users: users, conn: conn, params: params}) do
    UserView.index(users, conn, params)
  end

  def render("show.json", %{user: user, conn: conn, params: params}) do
    UserView.show(user, conn, params)
  end

  def fields(), do: [:id, :name, :email]
  def type(), do: "users"
end
