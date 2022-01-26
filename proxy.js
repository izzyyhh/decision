const https = require("https");
const httpProxy = require("http-proxy");
const fs = require("fs");

const services = [
    {
        dnsPrefix: new RegExp("^admin-starter\\."),
        proxyPort: process.env.ADMIN_PORT,
    },
    {
        dnsPrefix: new RegExp("^api-starter\\."),
        proxyPort: process.env.API_PORT,
    },
    ...(process.env.API_ENABLE_APM
        ? [
              {
                  dnsPrefix: new RegExp("^kibana-starter\\."),
                  proxyPort: process.env.KIBANA_PORT,
              },
          ]
        : []),
];

function getTarget(req) {
    const service = services.find((s) => s.dnsPrefix.test(req.headers.host));
    if (service === undefined) return undefined;
    return {
        target: {
            host: "localhost",
            port: service.proxyPort,
        },
    };
}

const proxy = httpProxy.createServer();
const server = https.createServer(
    {
        key: fs.readFileSync("node_modules/@vivid/certificates/files/dev.vivid-planet.cloud/privkey.pem", "utf8"),
        cert: fs.readFileSync("node_modules/@vivid/certificates/files/dev.vivid-planet.cloud/cert.pem", "utf8"),
        ca: fs.readFileSync("node_modules/@vivid/certificates/files/dev.vivid-planet.cloud/fullchain.pem", "utf8"),
    },
    function (req, res) {
        const target = getTarget(req);

        if (!target) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("404 Not Found\n");
            res.end();
        } else {
            console.log("balancing request to: ", target);
            proxy.web(req, res, target, (err) => {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.write(`${err}\n`);
                res.end();
            });
        }
    },
);

server.on("upgrade", function (req, socket, head) {
    const target = getTarget(req);

    console.log("balancing socket to: ", target);
    proxy.ws(req, socket, head, target);
});

server.listen(process.env.PROXY_PORT);
console.log(`Proxy is running on: ${process.env.PROXY_PORT}`);
