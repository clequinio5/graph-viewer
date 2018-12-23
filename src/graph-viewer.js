const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const { exec } = require('child_process');
const args = process.argv.slice(2);

let tree = args[0] ? args[0] : 'tree';
if (!fs.existsSync('./trees/' + tree + '.json')) {
    console.log("./trees/" + tree + ".json doesn't exist!")
    process.exit(0)
}
let sens = args[1] ? args[1] : 'desc';
if (sens != "asc" && sens != "desc") {
    console.log("Le sens doit etre 'asc' ou 'desc'");
    process.exit(0)
}
let template = args[2] ? args[2] : 'template';
if (!fs.existsSync('./templates/' + template + '.html')) {
    console.log("./templates/" + template + ".html doesn't exist!")
    process.exit(0)
}
console.log(tree)
console.log(sens)
console.log(template)
fs.writeFileSync('index.html', fs.readFileSync('./templates/' + template + '.html').toString().replace('tree.json', './trees/' + tree + '.json').replace('var sens = "asc";', 'var sens = "' + sens + '";'));
console.log('index.html ready')

http.createServer(function (request, response) {
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(config.serverPORT);
console.log('Server running at http://localhost:' + config.serverPORT + '/');

exec(config.pathChrome + ' -incognito --new-window --start-fullscreen --window-position=0,0 http://localhost:' + config.serverPORT);