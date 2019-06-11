const promisedRequest = require("./promisedRequest");

class Bitrix {
    constructor(options) {
        this.userId = 0;
        this.format = 'json';
        this.protocol = 'https';
        this.host = '';
        this.webhook = '';

        Object.assign(this, options);
    }

    get(action, params={}) {
        const options = this.buildOptions('GET', action, params);
        return promisedRequest(options);
    }

    post(action, params={}, data={}) {
        const postData = JSON.stringify(data);
        const options = this.buildOptions('POST', action, params, postData);
        return promisedRequest(options, postData);
    }

    buildOptions(method, action, params={}, data='') {
        const options = {
            port: 443,
            host: this.host,
            path: this.buildUrlPath(action, params),
            method: method.toUpperCase(),
            headers: { 'Cache-Control': 'no-cache' }
        };

        if (options.method === 'POST' && data.length) {
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(data);
        }

        return options;
    }

    buildUrlPath(action, params={}) {
        let query = `/rest/${this.userId}/${this.webhook}/${action}.${this.format}`;

        if (Object.keys(params).length > 0) {
            query += '?' + this.buildUrlParams(params)
        }

        return query;
    }

    buildUrlParams(params={}) {
        const arrParams = [];

        for (const q in params) {
            arrParams.push(`${q}=${params[q]}`);
        }

        return arrParams.join('&');
    }
}

module.exports = Bitrix;