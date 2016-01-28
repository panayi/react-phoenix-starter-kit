# React, Redux, Ramda starter kit
## Development
Setup backend:

```bash
cd api
mix deps.get
mix ecto.create
mix ecto.migrate
mix phoenix.server
npm install
npm run dev
```

Setup frontend:

```bash
npm install
npm run dev
```

Go to [http://localhost:3000/](http://localhost:3000/)

## Tests
Watch for changes and re-run tests:

```
npm run test:dev
```

Run tests once and generate coverage report:

```
npm run test
```
