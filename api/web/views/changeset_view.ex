defmodule App.ChangesetView do
  use App.Web, :view

  def render("error.json", %{id: id, changeset: changeset}) do
    errors = Enum.map(changeset.errors, fn {field, detail} ->
      %{
        id: id,
        title: "Invalid Attribute",
        detail: "#{field} #{render_detail(detail)}"
      }
    end)

    %{errors: errors}
  end

  def render_detail({message, values}) do
    Enum.reduce values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end
  end

  def render_detail(message) do
    message
  end
end
