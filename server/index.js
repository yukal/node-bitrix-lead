const Promise = require('promise');
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
    res.header("Access-Control-Allow-Origin", conf.cors.allow_origin);
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
    port: 443,
    headers: { 'Cache-Control': 'no-cache' }
};

function btrx_request(options, postData) {
    return new Promise(function (resolve, reject) {
        var body = '';
        var req = https.request(options, function (res) {
            res.setEncoding('utf8');

            // reject on bad status
            // if (res.statusCode < 200 || res.statusCode >= 300) {
            //     return reject(new Error('statusCode=' + res.statusCode));
            // }

            // cumulate data
            res.on('data', function (chunk) {
                body = chunk;
            });

            // resolve on end
            res.on('end', function () {
                resolve({ body: body, res: res });
            });
        });

        // reject on request error
        req.on('error', function (err) {
            reject({ body: body, res: res, err: err });
        });

        if (postData) {
            req.write(postData);
        }

        // IMPORTANT
        req.end();
    });
}


// Get list of the leads
app.get('/lead', function (req, res) {
    const action = 'crm.lead.list';
    const options = Object.assign(request_options, {
        path: `/rest/${conf.user_id}/${conf.webhook}/${action}.${conf.format}`
    });

    btrx_request(options).then(function (data) {
        res.set('Content-Type', data.res.headers['content-type']);
        res.status(Number(data.res.statusCode)).send(data.body);
        console.log(`${options.method} [${data.res.statusCode}] ${data.res.statusMessage} ${options.path}`);
        console.log(data.body.toString('utf8'));
    });
});


// Get lead by ID
app.get('/lead/:id', function (req, res) {
    const action = 'crm.lead.get';
    const lead_id = Number(req.params.id);
    const options = Object.assign(request_options, {
        path: `/rest/${conf.user_id}/${conf.webhook}/${action}.${conf.format}?id=${lead_id}`,
    });

    btrx_request(options).then(function (data) {
        res.set('Content-Type', data.res.headers['content-type']);
        res.status(Number(data.res.statusCode)).send(data.body);
        console.log(`${options.method} [${data.res.statusCode}] ${data.res.statusMessage} ${options.path}`);
        console.log(data.body.toString('utf8'));
    });
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

    btrx_request(options, data).then(function (data) {
        res.set('Content-Type', data.res.headers['content-type']);
        res.status(Number(data.res.statusCode)).send(data.body);
        console.log(`${options.method} [${data.res.statusCode}] ${data.res.statusMessage} ${options.path}`);
        console.log(data.body.toString('utf8'));
    });
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

    btrx_request(options, data).then(function (data) {
        res.set('Content-Type', data.res.headers['content-type']);
        res.status(Number(data.res.statusCode)).send(data.body);
        console.log(`${options.method} [${data.res.statusCode}] ${data.res.statusMessage} ${options.path}`);
        console.log(data.body.toString('utf8'));
    });
});


// Delete Lead
app.delete('/lead/:id', function (req, res) {
    const action = 'crm.lead.delete';
    const lead_id = Number(req.params.id);
    const options = Object.assign(request_options, {
        path: `/rest/${conf.user_id}/${conf.webhook}/${action}.${conf.format}?id=${lead_id}`,
    });

    btrx_request(options).then(function (data) {
        res.set('Content-Type', data.res.headers['content-type']);
        res.status(Number(data.res.statusCode)).send(data.body);
        console.log(`${options.method} [${data.res.statusCode}] ${data.res.statusMessage} ${options.path}`);
        console.log(data.body.toString('utf8'));
    });
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

// Start webserver
app.listen(conf.listen_port, conf.listen_host, function () {
    console.log(`Listening on http://${conf.listen_host}:${conf.listen_port}`);
    console.log("Press ^C to exit\n");
});
