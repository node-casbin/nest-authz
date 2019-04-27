## Description

A demo shows how to use nest-authz to implement role-based access control.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Open [http://localhost:3000/api](http://localhost:3000/api) to see api.
The api uses Bear auth schema, so if you want to access protected api, you should click the `Authorize` button and set `Bearer yourjwttoken` after login.

## Test

```bash
# unit tests
$ npm run test
```

## License

[MIT licensed](LICENSE).
