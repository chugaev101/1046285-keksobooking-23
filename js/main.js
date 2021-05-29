const getRandomNumber = (valueFrom, valueUpTo, numberDemicalPlaces) => {
  if (valueFrom >= valueUpTo) {
    return false;
  }

  const randomResult = Math.random() * (valueUpTo - valueFrom) + valueFrom;

  return randomResult.toFixed(numberDemicalPlaces);
};

getRandomNumber(3, 24, 6);
