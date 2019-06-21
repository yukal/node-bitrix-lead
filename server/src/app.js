const conf = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('./lib/decorator')('express');
const app = express();

const controllers = require('./controllers');
const routes = require('./routes')(express, controllers);

app.set('dirname', __dirname);

// Include CORS before other routes!
app.options(conf.cors.options, cors());
app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Origin", conf.cors.allow_origin);
    res.header("Access-Control-Allow-Headers", conf.cors.allow_headers);
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.listen(conf.server.port, conf.server.host, () => {
    app.log.info('Start server on %s:%d', conf.server.host, conf.server.port);
});
