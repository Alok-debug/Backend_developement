const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    console.log(res);
    res.end('<h1>Hii this is Alok</h1>');
   
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=>{console.log(`newly created server is running  at PORT NO: ${PORT}`)});