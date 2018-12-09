const https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const conf = require('./_config');

// CORS. Include before other routes!
app.options(conf.cors.options, cors());
app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Origin", `http://${conf.listen_host}:${conf.cors.allow_port}`);
    res.header("Access-Control-Allow-Headers", conf.cors.allow_headers);
    next();
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Basic request options
const request_options = {
    host: conf.domain,
    method: 'GET',
    port: 443
};

function build_response(response, data) {
    var content_type = response.headers['content-type'];
    var json = JSON.stringify({
        headers: response.headers,
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
    });

    data = (content_type.indexOf('application/json') === -1)
        ? `"data":${JSON.stringify(data)}` : `"data":${data}`;

    // Append body data to json data
    json = json.substr(1, json.length - 2);
    json = [json, data].join(',');

    return `{${json}}`;
}

function request_handler(response_handler, options, data = '') {
    const simple_requests = { 'GET': '', 'DELETE': '' };

    const req = https.request(options, function (res) {
        console.log(`${req.method} [${res.statusCode}] ${res.statusMessage} ${req.path}`);

        res.setEncoding('utf8');
        res.on('data', function (body) {
            // response_handler.status(res.statusCode).send(build_response(res, body));
            response_handler.setHeader('Content-Type', res.headers['content-type']);
            response_handler.status(res.statusCode).send(body);

            console.log(res.headers['content-type']);
            console.log(body, "\n");

            response_handler.end();
        });
    }).on('error', (error) => {
        console.error(error);
    });

    if (!(options.method in simple_requests) && data.length) {
        req.write(data);
    }
    req.end();

    this.setTimeout(() => {
        response_handler.setHeader('Content-Type', 'application/json')
        response_handler.status(504).json({ 'error': 'Timeout' }).end()
    }, 8000);
}


// Get list of the leads
app.get('/lead', function (req, res) {
    const action = 'crm.lead.list';
    const options = Object.assign(request_options, {
        path: `/rest/${conf.user_id}/${conf.webhook}/${action}.${conf.format}`
    });

    const _req = https.request(options, function (_res) {
        console.log(`${_req.method} [${_res.statusCode}] ${_res.statusMessage} ${_req.path}`);

        _res.setEncoding('utf8');
        _res.on('data', function (body) {
            // res.status(_res.statusCode).send(build_response(res, body));
            res.setHeader('Content-Type', _res.headers['content-type']);
            res.status(_res.statusCode).send(body).end();
            console.log(_res.headers['content-type'], body, "\n");
        });
    }).on('error', (error) => {
        console.error(error);
    }).end();

    // request_handler(res, options);
});


// Get lead by ID
app.get('/lead/:id', function (req, res) {
    const action = 'crm.lead.get';
    const lead_id = Number(req.params.id);
    const options = Object.assign(request_options, {
        path: `/rest/${conf.user_id}/${conf.webhook}/${action}.${conf.format}?id=${lead_id}`,
    });

    const _req = https.request(options, function (_res) {
        console.log(`${_req.method} [${_res.statusCode}] ${_res.statusMessage} ${_req.path}`);

        _res.setEncoding('utf8');
        _res.on('data', function (body) {
            // res.status(_res.statusCode).send(build_response(res, body));
            res.setHeader('Content-Type', _res.headers['content-type']);
            res.status(_res.statusCode).send(body).end();
            console.log(_res.headers['content-type'], body, "\n");
        });
    }).on('error', (error) => {
        console.error(error);
    }).end();

    // request_handler(res, options);
});


// Create lead
app.post('/lead', function (req, res) {
    var action = 'crm.lead.add';
    var data = JSON.stringify({
        fields: req.body,
        params: { "REGISTER_SONET_EVENT": "Y" }
    });
    const options = Object.assign(request_options, {
        path: `/rest/${conf.user_id}/${conf.webhook}/${action}.${conf.format}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    });

    var _req = https.request(options, function (_res) {
        console.log(`${_req.method} [${_res.statusCode}] ${_res.statusMessage} ${_req.path}`);

        _res.setEncoding('utf8');
        _res.on('data', function (body) {
            res.setHeader('Content-Type', _res.headers['content-type']);
            res.status(_res.statusCode).send(body).end();
            console.log(_res.headers['content-type'], body, "\n");
        });
    }).on('error', (error) => {
        console.error(error);
    });
    _req.write(data);
    _req.end();

    // request_handler(res, options, data);
});


// Update lead
app.patch('/lead/:id', function (req, res) {
    var action = 'crm.lead.update';
    var lead_id = Number(req.params.id);
    var data = JSON.stringify({
        fields: req.body,
        params: { "REGISTER_SONET_EVENT": "Y" }
    });

    const options = Object.assign(request_options, {
        path: `/rest/${conf.user_id}/${conf.webhook}/${action}.${conf.format}?id=${lead_id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    });

    var _req = https.request(options, function (_res) {
        console.log(`${_req.method} [${_res.statusCode}] ${_res.statusMessage} ${_req.path}`);

        _res.setEncoding('utf8');
        _res.on('data', function (body) {
            res.setHeader('Content-Type', _res.headers['content-type']);
            res.status(_res.statusCode).send(body).end();
            console.log(_res.headers['content-type'], body, "\n");
        });
    }).on('error', (error) => {
        console.error(error);
    });
    _req.write(data);
    _req.end();

    // request_handler(res, options, data);
});


// Delete Lead
app.delete('/lead/:id', function (req, res) {
    const action = 'crm.lead.delete';
    const lead_id = Number(req.params.id);
    const options = Object.assign(request_options, {
        path: `/rest/${conf.user_id}/${conf.webhook}/${action}.${conf.format}?id=${lead_id}`,
    });

    var _req = https.request(options, function (_res) {
        console.log(`${_req.method} [${_res.statusCode}] ${_res.statusMessage} ${_req.path}`);

        _res.setEncoding('utf8');
        _res.on('data', function (body) {
            // res.status(_res.statusCode).send(build_response(res, body));
            res.setHeader('Content-Type', _res.headers['content-type']);
            res.status(_res.statusCode).send(body).end();
            console.log(_res.headers['content-type'], body, "\n");
        });
    }).on('error', (error) => {
        console.error(error);
    }).end();

    // request_handler(res, options);
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

// Start webserver
app.listen(conf.listen_port, conf.listen_host, function () {
    console.log(`Listening on http://${conf.listen_host}:${conf.listen_port}`);
    console.log("Press ^C to exit\n");
});
