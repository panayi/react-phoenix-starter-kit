# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :api, Api.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "MGmjNHJpCUPWVHW05KtfOFhQWNAnJPxWdh+VxWz5uLZXCMyHiVjzptdIJqxssFii",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: Api.PubSub,
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
  secret_key: "+/HZDLRRXtmKO5oN1n/vw35suQI/2iLJNr6sKhs8iDod8H0wWRYwPe5FNYZpOvQj",
  serializer: Api.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false
