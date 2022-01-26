module.exports = {
    apps: [
        {
            name: "decision-docker",
            script: "node docker-compose.js",
            namespace: "starter",
        },
        {
            name: "decision-app",
            script: "npm run --prefix app start",
            namespace: "starter",
            autorestart: true,
        },
        {
            name: "decision-api",
            script: "dotenv -- wait-on -l tcp:$POSTGRESQL_PORT && npm --prefix api run db:migrate && npm --prefix api run start:dev",
            namespace: "starter",
            autorestart: true,
        },
    ],
};
