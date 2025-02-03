const dealsService = require('../services/dealsService');

const createDeal = async (req, res) => {
  try {
    const deal = await dealsService.createDeal(req.body);
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllDeals = async (req, res) => {
  try {
    const deals = await dealsService.getAllDeals(req.body);
    res.status(201).json(deals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDeal = async (req, res) => {
  try {
    const deal = await dealsService.getDeal(req.body);
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createDeal,
  getAllDeals,
  getDeal,
};
