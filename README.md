## Requirements
- Ruby 2.3.4
- Rails 5.2
- Webpacker 4

## Setup
#### Initial setup
This is a Rails + React app, so make sure that `webpacker` and `node_modules` are set up in addition to the standard Rails bundle and db setup.
```
$ bundle
$ bundle exec rails webpacker:install:react

$ rails db:create
$ rails db:migrate
$ rails db:seed

$ yarn upgrade
```

#### Run necessary servers
```
$ rails s
$ ./bin/webpack-dev-server
```

#### Access dev environment
localhost:5100
