const http = require('http');
const port = 3000;

const server = http.createServer((request, response)=>{
    response.end('Hello World!');
});

server.listen(port);