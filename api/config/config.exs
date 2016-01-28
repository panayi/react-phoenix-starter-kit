# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :app, App.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "MGmjNHJpCUPWVHW05KtfOFhQWNAnJPxWdh+VxWz5uLZXCMyHiVjzptdIJqxssFii",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: App.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Guardian setup
config :joken, config_module: Guardian.JWT

config :guardian, Guardian,
  issuer: "ReactPhoenixStarterKit",
  ttl: { 3, :days },
  verify_issuer: true,
  secret_key: "rvKtzav/XuNE74SZP1Nnwj64DhrrLtMilM78c9uDMGIu6PuamhfnkqgBxF/GGvXl
GNgrNjo+b1W7T7RR+bnVr2NgzKcpeBKEtyrJG0bAcRkq4XQjZmW9SoWqI++v/uwG
LaF1LHryaKH9vfq0hOfIgIp/WdiQnXYo8IIvgPTIJRlkGYUFKPxLTOKN4MYkCp/G
sTWd+TgrFtGO7NhKNFKRKY3nbtfA6TGUECSrYgBBoQLUlnpIzKgzNqUsj8zYTqA0
TxIkunN3DN7F3zpvTJOidl6uRSX7sYJxTQw4YdIuIZ1vQYpv44vHJB4LJT5hKwKL
p5C/jYuooB54ALl3Oukhz8P25cLjUs6dQpFEhBg0MImQ969cYxGtQLvcunOOYfsM
4EHoCs2B9JwfBtWiNyVij8ngiUMTDuaLdr30MsYQPBlqKmMqjkvfdM8aSc0n90QK
mNowc1UXlbcHSToYEYYDbtOdcHO2c9WfXLH/tS2XxUQg9WBVjPF6cxp26DhQPWTc
8IJvMx715j92pBOr7gltGftnNoEnoNaK5TFFM+KneSQ75Zv97ZthKjL8PqSdGK+U
j7TChj9EXAQZaA+JCvFR0QNTunmPQi449r8UrMnF0DADwwX2FqD+lXXpBOSx4lLG
h1/XUR8kPVJw3uHA7R53OuQB31TcWAFPPgGgV4gc6cCbWYNXxPBenIQL5wjBaZye
bZ+eAOggWQXLfTT9ZHdN2jTgIC4FTT7hXzErU8ShlZ6UO5ANQFqECZQxkcUv3lA3
n78cne/wptaAvZcmgMQwJRYnv/38nEhJwM2oZaTiV2kL+Xi8kHscDlAXuGwcMQ8O
7s3em5Hj2koBZBdznKvOis8F9gFlc0ZKOBgRBJS3fGP/IsGRYBjITAXYXq12ioSx
wI8tJuAwofoWdvh0aMYiwVGOSTuY0ur51txiLgdOjz1QOqYKgsUidgA1oMRZZqxp
QaRt2IhySk8vEvxcUHo0cQZiiafDAXnJvOGE65zlu+t6Z2nvl3RSeOGXTjBOXbJZ
nlXaaIFLLQ4ZPFTbjNlDLv7ByIEV2P0Sd3uFCq6gK620XgTAFgmm5QDXIlUKzjhg
/O4juIPCWtQIrXu2cBAcnQW2ljAMj6M7qGuhoYgZPeEcCjmaJnm2UIgExF9n+Wdg
Cpqcs6Jef764jyRdFYz2vT3OtFoFtWFBSa3B/jFHyD+KgX261IEoAQqtN1yFZDWx
LMF3goyzRmx6fLAcVbrPbFqr/gMlFAcW07o4gbOagjP8+ne66Q9HcZNqlynju/Kn
w2IaaAJBKs5vhgkuyEWVKerexjPoXveU0vKTKgXGLO7skTJVFpdOSIc+Erh0r4ii
iwYqYcyVBU2bVWWtvjEtDUNORofXbNWjEbWyK+U21m1KEmk3cQy/J/zz4AE17cR0
6ZBqe31UQkEbMZ8kjXA7zWKiffWByEqfHmzD6jf4Bn428WO6KG7ZcChHiGmsEU+p
6pjVvYIE6GtAF+o3K8+ZUuLkUXwzOBoKOWryGmdgCWzpymmXQV0ggaFaKLxbMWpp
ifWoweBRhC3MG7F4Z8/bj2FD7sKFcG2zL9uXJx4TRHRLJXIp+fPAgqiuEYAFvcTU",
  serializer: App.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false
