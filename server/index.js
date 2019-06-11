const conf = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const routes = require('./routes');
const reporter = require('./middlewares/reporter');

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
app.use(reporter);
app.use(routes);

app.listen(conf.server.port, conf.server.host, () => {
    console.log(`Listening on http://${conf.server.host}:${conf.server.port}`);
    console.log("Press ^C to exit\n");
});