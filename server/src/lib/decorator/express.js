const logger = require('./logger');

module.exports = {
    '.application.log': logger.text,
    '.response.log': logger.http,
    '.request.log': logger.http
};
