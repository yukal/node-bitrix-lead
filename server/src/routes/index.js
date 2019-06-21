module.exports = (express, controllers) => {
    const router = express.Router();

    router.use('/lead', require('./lead')(express, controllers));

    return router;
};
