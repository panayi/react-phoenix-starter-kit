defmodule Api.V1.SessionView do
  use Api.Web, :view

  def render("show.json", %{jwt: jwt}) do
    %{jwt: jwt}
  end

  def render("error.json", %{error: error}) do
    %{error: error}
  end
end
