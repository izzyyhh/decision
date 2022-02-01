#!/usr/bin/env bash
. ~/.nvm/nvm.sh

# jump into project dir
cd $(dirname $0)

# use correct npm and install dependencies
nvm install
nvm use
npm i -g npm@7
npm install

# create webstorm/phpstorm symlink
ln -sf $PWD/api/schema.gql ./schema.graphql
ln -sf $PWD/api/schema.gql ./app/schema.gql

# ln -sf ./schema.graphql $PWD/app/schema.gql

npm --prefix api install & wait
npm --prefix app install & wait
