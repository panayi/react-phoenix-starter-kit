defmodule App.SessionView do
  use JSONAPI.PhoenixView
  alias App.SessionView

  def render("show.json", %{session: session, conn: conn, params: params}) do
    SessionView.show(session, conn, params)
  end

  def fields(), do: [:token]
  def type(), do: "session"
end
