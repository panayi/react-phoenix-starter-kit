// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/a/34133809/359104
export default (config) => ({
  compiler_public_path: `http://${config.server_host}:${config.server_port}/`,

  globals: {
    ...config.globals,
    API_URL: JSON.stringify('http://localhost:4000'),
    LOCALSTORAGE_ROOT: JSON.stringify('redux_phoenix_starter_kit')
  }
})
