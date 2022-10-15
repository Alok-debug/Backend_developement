const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
    // Build Filepath dynamic
    const filePath = path.join(
        __dirname,
        "public",
        res.url === "/" ? "index.html" : req.url
    );

    // extension of file called
    let extension = path.extname(filePath);

    // Initial content type
    let contentType = "text/html";

    // check extension and set content type
    switch (extension) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }

    //-----Read File-------
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                //  <------'ENOENT' means file not found
                fs.readFile(path.join(__dirname, 'public', 'errorPage.html'), (err, content) => {
                    if (err) throw err;
                    res.writeHead(200, { 'content-type': 'text/html' });
                    res.end(content, 'utf8');

                });

            }
            else {
                //Some server error
                res.writeHead(500);
                res.end(`Server Error : ${err.code}`);
            }
        }

        // If no error, then load content
        else {
            //Success
            res.writeHead(200, { 'content-type': contentType });
            res.end(content, 'utf8');

        }
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Actual server is running on PORT NO: ${PORT}`));
