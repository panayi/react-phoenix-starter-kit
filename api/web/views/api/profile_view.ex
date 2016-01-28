defmodule App.Api.ProfileView do
  use JSONAPI.PhoenixView
  alias App.Api.ProfileView

  def render("show.json", %{user: user, conn: conn, params: params}) do
    ProfileView.show(user, conn, params)
  end

  def fields(), do: [:id, :name, :email]
  def type(), do: "profile"
end
