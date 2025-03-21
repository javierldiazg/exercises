export const getNormalRangeMock = async () => {
  return { min: 1, max: 100 };
};

export const getFixedRangeMock = async () => {
  return { rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] };
};
