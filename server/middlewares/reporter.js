module.exports = (req, res, next) => {
    res.report = (data) => {
        const { error, body } = data;
        const method = data.req.method;
        const path = data.req.path;
        const statusCode = data.res.statusCode;
        const statusMessage = data.res.statusMessage;

        if (error) {

            console.error(error);

        } else {

            console.log(`${method} [${statusCode}] ${statusMessage} ${path}`);
            console.log(body.toString('utf8'));

        }

        return res;
    };

    next();
};