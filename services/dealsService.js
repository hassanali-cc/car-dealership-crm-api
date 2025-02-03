const Deal = require('../models/Deal');

const createDeal = async ({ title, description, price }) => {
  const deal = await Deal.create({
    title,
    description,
    price,
  });
  return deal;
};

const getAllDeals = async () => {
  const deals = await Deal.findAll()
  if (!deals) {
    throw new Error('Deals not found');
  }
  return deals;
};

const getDeal = async (id) => {
  const deal = await Deal.findByPk(id);
  if (!deal) throw new Error('Deal not found');
  return deal;
};

module.exports = {
  createDeal,
  getAllDeals,
  getDeal,
};
