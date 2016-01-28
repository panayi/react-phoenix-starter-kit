defmodule App.ApiView do
  def render("error.json", %{id: id, title: title, detail: detail, status: status}) do
    %{errors: [%{id: id, title: title, detail: detail, status: status}]}
  end

  def render("error.json", errors) do
    %{errors: errors}
  end
end
