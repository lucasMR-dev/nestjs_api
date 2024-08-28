## Project setup

```bash
$ npm install
```

## Setup .ENV
```bash
# Change DB Config
$ cp .copyenv .env
# Make JWT Secret
$ node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
