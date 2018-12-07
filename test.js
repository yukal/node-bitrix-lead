const http = require('http');
const querystring = require('querystring');

// An ID of the responsible user of the company (that created WebHook)
var user_id = 1;
var webhook = '31uhq2q855fk1foj'
var domain = 'api.bitrix24.com';
var method = 'crm.lead.add';
var format = 'json';

var lead_data = {
    'fields': {
        'ASSIGNED_BY_ID': user_id,
        'STATUS_ID': 'NEW',
        'OPENED': 'Y',

        'TITLE': 'Lilu Dallas', // REQUIRED
        'NAME': 'Lilu',
        'LAST_NAME': 'Dallas',
        "PHONE": [{ 'VALUE': '9721234567', 'VALUE_TYPE': 'WORK' }],
        'EMAIL': [{ 'VALUE': 'lilu@gmail.com', 'VALUE_TYPE': 'WORK' }],
        'COMPANY_TITLE': 'Intergalactic balance',
        'SOURCE_DESCRIPTION': 'Venus Planet',
    },
    'params': {
        'REGISTER_SONET_EVENT': 'Y'
    }
};

var query_data = querystring.stringify(lead_data);

var options = {
    host: `https://${domain}`,
    path: `/rest/${user_id}/${webhook}/${method}.${format}`,
    method: 'POST',
    port: 443,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(query_data)
    }
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(query_data);
req.end();
