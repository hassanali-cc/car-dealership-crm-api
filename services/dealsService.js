
const createDeal = async ({ title, description, price }) => {
  const deal = {

  }
  return deal;
};

const getAllDeals = async () => {
  const deals = []
  if (!deals) {
    throw new Error('Deals not found');
  }
  return deals;
};

const getDeal = async (id) => {
  const deal = []
  if (!deal) throw new Error('Deal not found');
  return deal;
};

module.exports = {
  createDeal,
  getAllDeals,
  getDeal,
};
