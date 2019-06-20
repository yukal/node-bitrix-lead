const express = require('express');
const router = express.Router();

const leadController = require('../controllers/lead');

router.get('/', leadController.getLeadsList);
router.post('/', leadController.createLead);
router.get('/:id', leadController.getLeadById);
router.patch('/:id', leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
