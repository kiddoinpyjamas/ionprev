const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

// create the express app
const app = express();

var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

// Don't redirect if the hostname is `localhost:port`
app.use(redirectToHTTPS([/localhost:(\d{4})/]));

// create middleware to handle the serving the app
const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);

// Catch all routes and redirect to the index file
app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/dist/index.html'));
});

// Create default port to serve the app on
const port = process.env.PORT || 80;

app.listen(port);

// Log to feedback that this is actually running
console.log('Server started on port ' + port);