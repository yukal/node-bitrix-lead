// API Url:`https://${domain}/rest/${user_id}/${webhook}/${action}.${format}`;
const https = require('https');
const conf = require('./_config');

var action = 'crm.lead.list';

var options = {
    host: conf.domain,
    path: `/rest/${conf.user_id}/${conf.webhook}/${action}.${conf.format}`,
    method: 'GET',
    port: 443,
};

var req = https.request(options, function (res) {
    console.log(`STATUS: ${res.statusCode}\n`);
    console.log('HEADERS: ', JSON.stringify(res.headers));

    res.setEncoding('utf8');

    res.on('data', function (body) {
        console.log('BODY: ', body);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.end();
