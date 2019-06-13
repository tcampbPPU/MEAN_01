# MEANauthapp

MySQL Express Angular Nodejs stack application with authentication using JSON web tokens

## Installation

Create `credentials.js` in the main directory

The credentials file should look similar to this:

```
module.exports = {
  port: SOME_PORT,
  url: "YOUR_URL",
  host: "DB_HOST_URL",
  user: "DB_USER",
  password: "DB_PASSWORD",
  database: "DB"
};
```

Install the dependencies for root directory

```sh
$ npm install
```

### Setting up Angular 7

Enter Angular Src
```sh
$ cd angular-src/
```

Install the Angular dependencies

```sh
$ npm install
```
Return to root directory

```sh
$ cd ..
```

Run app

```sh
$ npm start
```

If steps where followed should see `Server listening on 3000 press Ctrl-C to terminate`


Go to Browser at `localhost:3000`
