const http = require('http');
const https = require('https');
const url = require('url');
const cors = require('cors'); // Import the cors package

const server = http.createServer((req, res) => {
  // Enable CORS for your React app's origin
  cors({ origin: 'http://localhost:3000' })(req, res, () => {
    if (req.url === '/api/data' && req.method === 'GET') {
      const apiOptions = {
        hostname: 'timesinternet1.chargebee.com',
        path: '/api/v2/subscriptions',
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic bGl2ZV9rNzdjdUNXQ0sxVEJiQjdlSVB1NDVDNmNRcHNkY2RhTHFIOg==',
        },
	rejectUnauthorized: false,
      };

      const apiRequest = https.request(apiOptions, (apiResponse) => {
        let data = '';

        apiResponse.on('data', (chunk) => {
          data += chunk;
        });

        apiResponse.on('end', () => {
          res.setHeader('Content-Type', 'application/json');
          res.end(data);
        });
      });

      apiRequest.on('error', (error) => {
        console.error('API request failed:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'API request failed' }));
      });

      apiRequest.end();
    } else {
      // Handle other routes if needed
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
});

const port = process.env.PORT || 5001;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});