const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/') {
        // Serve the index.html file
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/signup') {
        // Serve the signup.html file
        const filePath = path.join(__dirname, 'signup.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/login') {
        // Serve the login.html file
        const filePath = path.join(__dirname, 'login.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/signup-process' && req.method === 'POST') {
        // Handle signup form submission
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const userData = querystring.parse(body);

            // Validate and save user data to a file (e.g., users.json)
            if (userData.username && userData.password && userData.email) {
                const user = {
                    username: userData.username,
                    email: userData.email,
                    password: userData.password,
                    
    
                };

                // Save the user data to a file (append to an array of users)
                const usersFilePath = path.join(__dirname, 'users.json');
                fs.readFile(usersFilePath, 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    } else {
                        let users = [];
                        if (data) {
                            users = JSON.parse(data);
                        }
                        users.push(user);

                        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
                            if (err) {
                                res.writeHead(500, { 'Content-Type': 'text/plain' });
                                res.end('Internal Server Error');
                            } else {
                                res.writeHead(302, { 'Location': '/login' });
                                res.end();
                            }
                        });
                    }
                });
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request');
            }
        });
    } else {
        // Handle 404 Not Found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

const port = 3005;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
