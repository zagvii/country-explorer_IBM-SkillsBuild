let http = require('http');
let routes = require('./controller');

http.createServer(routes.handleRequest).listen(3000, () => {
    console.log('Server is running on port 3000');
});