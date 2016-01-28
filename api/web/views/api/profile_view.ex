defmodule App.Api.ProfileView do
  use App.Web, :view

  def render("show.json", %{user: user}) do
    %{data: %{id: user.id, email: user.email}, type: "profile"}
  end
end
