let http = require('http');
let url = require('url');
let fs = require('fs');

let port = process.argv[2];
if (!port) {
    console.log('端口都不指定的的吗？来个\n node server 8888 瞧给你累的');
    process.exit(1);
}
let server = http.createServer(function(request, response) {
    let parseUrl = url.parse(request.url, true);
    let pathWidthQuery = request.url;
    let queryStr = '';
    if (pathWidthQuery.indexOf('?') >= 0) queryStr = pathWidthQuery.substring(pathWidthQuery.indexOf('?'));
    let path = parseUrl.pathname;
    console.log(path);
    let query = parseUrl.query;
    let method = parseUrl.method;
    console.log('有个大帅哥发来了请求！路径为：' + pathWidthQuery);

    if (path === "/favicon.ico") {
        response.statusCode = 200;
        response.end()
    } else {
        let filePath = path === "/" ? "/index.html" : path;
        let statusCode, file;
        let index = path.lastIndexOf('.');
        suffix = path.substring(index).toLocaleLowerCase();

        const hashMap = {
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.json': 'text/json',
            '.html': 'text/html',
            '.jpg': 'image/jpeg',
            '.png': 'image/png'
        }
        response.setHeader('Content-type', `${hashMap[suffix]||"text/html"};charset=utf-8`);
        try {
            statusCode = 200;
            file = fs.readFileSync(`./public${filePath}`);
        } catch (e) {
            statusCode = 404;
            file = "<h2>404路径未找到</h2>"
        }
        response.statusCode = statusCode;
        response.write(file)
        response.end()
    }


})

server.listen(port);
console.log('监听' + port + "成功 请使用打开：http://localhost:" + port);