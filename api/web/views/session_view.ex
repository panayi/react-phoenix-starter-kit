defmodule App.SessionView do
  use App.Web, :view

  def render("show.json", %{token: token}) do
    %{data: %{token: token}, type: "session"}
  end
end
