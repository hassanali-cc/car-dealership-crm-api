const express = require('express');
const dealsController = require('../controllers/dealsController');

const router = express.Router();

router.post('/', dealsController.createDeal);
router.get('/all', dealsController.getAllDeals);
router.get('/:id', dealsController.getDeal);

module.exports = router;
