defmodule App.Api.UserView do
  use App.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, App.Api.UserView, "user.json"), type: "users"}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, App.Api.UserView, "user.json"), type: "users"}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id, email: user.email}
  end
end
