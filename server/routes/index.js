module.exports = (express) => {
    const router = express.Router();

    router.use('/lead', require('./lead'));

    return router;
};
