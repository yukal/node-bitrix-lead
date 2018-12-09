// API Url:`https://${domain}/rest/${user_id}/${webhook}/${action}.${format}`;
const https = require('https');
const conf = require('./_config');

var action = 'crm.lead.add';

var lead_data = {
    'fields': {
        'ASSIGNED_BY_ID': conf.user_id,
        'STATUS_ID': 'NEW',
        'OPENED': 'Y',

        'TITLE': 'Lilu Dallas', // REQUIRED
        'NAME': 'Lilu',
        'LAST_NAME': 'Dallas',
        'SECOND_NAME': 'Multipass',
        "PHONE": [{ 'VALUE': '9721234567', 'VALUE_TYPE': 'WORK' }],
        'EMAIL': [{ 'VALUE': 'lilu@gmail.com', 'VALUE_TYPE': 'WORK' }],
        'WEB': 'lilu-dallas.com',
        'IM': 'Skype: lilu-dallas',

        'COMPANY_TITLE': 'Intergalactic balance',
        'SOURCE_ID': 360,
        'SOURCE_DESCRIPTION': 'Venus Planet',
        'STATUS_DESCRIPTION': 'Created new lead',
        'POST': 'Manager',
        'ADDRESS': 'StreetName, 10, 12a',
        'ADDRESS_2': 'StreetName, 12, 10a, of. 303',
        'ADDRESS_CITY': 'Haifa',
        'ADDRESS_REGION': 'Nesher',
        'ADDRESS_PROVINCE': 'Nesher',
        'ADDRESS_COUNTRY': 'Israel',
        'ADDRESS_COUNTRY_CODE': 972,
        'ADDRESS_POSTAL_CODE': 31000,

        'CURRENCY_ID': 'USD',
        'OPPORTUNITY': 15000,

        'COMMENTS': 'A test request by Nodejs',
        'ORIGINATOR_ID': 10,
        'ORIGIN_ID': 10
    },

    'params': {
        'REGISTER_SONET_EVENT': 'Y'
    }
};

var query_data = JSON.stringify(lead_data);

var options = {
    host: conf.domain,
    path: `/rest/${conf.user_id}/${conf.webhook}/${action}.${conf.format}`,
    method: 'POST',
    port: 443,
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(query_data)
    }
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

req.write(query_data);
req.end();
