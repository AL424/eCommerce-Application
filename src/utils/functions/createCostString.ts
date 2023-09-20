export const createCostString = (costCent = 0) => {
  const costUSD = costCent / 100;
  const costString = costUSD.toFixed(2);
  return `${costString} $`;
};
