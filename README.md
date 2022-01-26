# comet-starter

# Development

## Requirements

-   [nvm](https://github.com/nvm-sh/nvm)
-   [docker & docker-compose](https://docs.docker.com/compose/)

## Installation

    // Execute following script
    ./install.sh

## Uninstallation

    // Removes docker volumes and all files and folder which are not managed in the repo (node_modules, lib,...)
    // If you want to reset your development environment totally, run this command and ./install.sh afterwards.

    ./uninstall.sh

## Run Services

    // use correct npm version https://github.com/nvm-sh/nvm#deeper-shell-integration
    nvm use

    // All services
    npm run dev

    npx pm2 status
    npx pm2 logs [service]
    npx pm2 restart [service]
    npx pm2 stop all

    // import fixtures
    npm run --prefix api/iff-api fixtures

### APM for api service

    API_ENABLE_APM=1 npm run dev

    And open Kibana at https://kibana-comet.$VIVID_HOST_USERNAME.dev.vivid-planet.cloud:8443/
