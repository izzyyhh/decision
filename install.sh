#!/usr/bin/env bash
. ~/.nvm/nvm.sh

# jump into project dir
cd $(dirname $0)

# use correct npm and install dependencies
nvm install
nvm use
npm i -g npm@7
npm install

# create admin symlinks
# ln -sf $PWD/.env ./admin/
# ln -sf $PWD/api/schema.gql ./admin/

# create api symlinks
ln -sf $PWD/.env ./api/

# create webstorm/phpstorm symlink
ln -sf $PWD/api/schema.gql ./schema.graphql

# npm --prefix admin install &
npm --prefix api install &
wait

# npx dotenv -- node createDevIdpClient.js
