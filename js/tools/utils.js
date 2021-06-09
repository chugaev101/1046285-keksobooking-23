// Функция генерации случайного числа из диапазона
const getRandomNumber = (valueFrom, valueUpTo, numberDemicalPlaces = 0) => {
  if (valueFrom > valueUpTo) {
    [valueFrom, valueUpTo] = [valueUpTo, valueFrom];
  }

  const randomResult = Math.random() * (valueUpTo - valueFrom) + valueFrom;

  return +randomResult.toFixed(numberDemicalPlaces);

};

// Функция получения случайного елемента из массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// Функция получения части массива случайной длины от исходного массива
const getArrayRandomSlice = (elements) => elements.slice(0, getRandomNumber(1, elements.length));

// Функция вырезания случайного елемента из массива и преведения его к строке
const cutRandomArrayElement = (elements) => elements.splice(getRandomNumber(0, elements.length - 1), 1).join('');

export {getRandomNumber, getRandomArrayElement, getArrayRandomSlice, cutRandomArrayElement};
