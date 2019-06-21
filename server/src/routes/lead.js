module.exports = (express, controllers) => {
    const router = express.Router();
    const { lead } = controllers;

    router.get('/', lead.getLeadsList);
    router.post('/', lead.createLead);
    router.get('/:id', lead.getLeadById);
    router.patch('/:id', lead.updateLead);
    router.delete('/:id', lead.deleteLead);

    return router;
};
