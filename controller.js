const path = require('path');
const services = require("./countries-service");


function handleRequest(req, res) {
    let filePath = "." + req.url;
    if (filePath == './countries' && req.method === "GET") { 
        services.fetchCountries()
            .then((data) => {
                if (data) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                }
                else {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: "Internal Server Error: Responde data is null" }));
                }
            })
            .catch((error) => {
                console.error('Error fetching data from /countries service:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error:  "Internal Server Error: Failed to fetch data" }));
            });
    } else if (filePath == './countries' && req.method != "GET") {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end("Incorrect HTTP method used.");
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end("Request URL not found.");
    }
}

module.exports = {
    handleRequest: handleRequest
}