const getRandomNumber = (valueFrom, valueUpTo, numberDemicalPlaces) => {
  if (valueFrom > valueUpTo) {
    [valueFrom, valueUpTo] = [valueUpTo, valueFrom];
  }

  const randomResult = Math.random() * (valueUpTo - valueFrom) + valueFrom;

  return +randomResult.toFixed(numberDemicalPlaces);
};

getRandomNumber(15, 5, 2);
