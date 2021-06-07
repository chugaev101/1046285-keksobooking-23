const TYPES_PREMISES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TITLES = ['Hotel Sunroute Plaza Shinjuku', 'Sotetsu Fresa Inn Kanda-Otemachi', 'Sotetsu Fresa Inn Ginza-Nanachome', 'Sotetsu Grand Fresa Tokyo-Bay Ariake', 'Grand Nikko Tokyo Daiba', 'THE KNOT TOKYO Shinjuku', 'Sotetsu Fresa Inn Tokyo Kinshicho', 'JR Kyushu Hotel Blossom Shinjuku', 'THE BLOSSOM HIBIYA', 'Grand Hyatt Tokyo'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const NUMBER_ADS = 10;
const AVATARS = [];

// Функция генерации случайного числа из диапазона
const getRandomNumber = (valueFrom, valueUpTo, numberDemicalPlaces = 0) => {
  if (valueFrom > valueUpTo) {
    [valueFrom, valueUpTo] = [valueUpTo, valueFrom];
  }

  const randomResult = Math.random() * (valueUpTo - valueFrom) + valueFrom;

  return +randomResult.toFixed(numberDemicalPlaces);

};

// Цикл генерации массива URL для аватаров
for (let counter = 1; counter <= NUMBER_ADS; counter++) {
  (counter < 10) ? AVATARS.push(`img/avatars/user0${counter}.png`) : AVATARS.push(`img/avatars/user${counter}.png`);
}

// Функция получения случайного елемента из массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// Функция получения части массива случайной длины от исходного массива
const getArrayRandomSlice = (elements) => elements.slice(0, getRandomNumber(1, elements.length));

// Функция вырезания случайного елемента из массива и преведения его к строке
const cutRandomArrayElement = (elements) => elements.splice(getRandomNumber(0, elements.length - 1), 1).join('');

// Функция генерации случайного объявления
const generateTestAd = () => {
  const COORDINATES = [getRandomNumber(35.65000, 35.70000, 5), getRandomNumber(139.70000, 139.80000, 5)];

  return {
    author: {
      avatar: cutRandomArrayElement(AVATARS),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: COORDINATES.join(', '),
      price: getRandomNumber(2000, 15000),
      type: getRandomArrayElement(TYPES_PREMISES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 15),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getArrayRandomSlice(FEATURES),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at orci augue. Duis tincidunt sed magna a hendrerit. Curabitur ac.',
      photos: getArrayRandomSlice(PHOTOS),
    },
    location: {
      lat: COORDINATES[0],
      lng: COORDINATES[1],
    },
  };
};

// Функция генерации массива случайных объявлений
const generateArrayAds = () => new Array(NUMBER_ADS).fill(null).map(() => generateTestAd());

generateArrayAds();
