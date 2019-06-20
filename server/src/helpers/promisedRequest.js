const https = require('https');

function request(options, postData) {
    return new Promise((resolve, reject) => {
        let body = '';
        const req = https.request(options, res => {
            res.setEncoding('utf8');
            res.on('data', chunk => body = chunk);
            res.on('end', () => resolve({ body, req, res, err: null }));
        });

        req.on('error', err => reject({ body, req, res, err }));

        if (postData) {
            req.write(postData);
        }

        // (!) Important
        req.end();
    });
}

module.exports = request;
