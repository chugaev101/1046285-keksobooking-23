import {getRandomNumber, getRandomArrayElement, getArrayRandomSlice, cutRandomArrayElement} from './utils.js';

const PREMISES_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const titles = ['Hotel Sunroute Plaza Shinjuku', 'Sotetsu Fresa Inn Kanda-Otemachi', 'Sotetsu Fresa Inn Ginza-Nanachome', 'Sotetsu Grand Fresa Tokyo-Bay Ariake', 'Grand Nikko Tokyo Daiba', 'THE KNOT TOKYO Shinjuku', 'Sotetsu Fresa Inn Tokyo Kinshicho', 'JR Kyushu Hotel Blossom Shinjuku', 'THE BLOSSOM HIBIYA', 'Grand Hyatt Tokyo'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const adsNumber = 10;
const avatars = [];

// Цикл генерации массива URL для аватаров
for (let counter = 1; counter <= adsNumber; counter++) {
  (counter < 10) ? avatars.push(`img/avatars/user0${counter}.png`) : avatars.push(`img/avatars/user${counter}.png`);
}

// Функция генерации случайного объявления
const generateTestAd = () => {
  const coordinates = {
    lat: getRandomNumber(35.65000, 35.70000, 5),
    lng: getRandomNumber(139.70000, 139.80000, 5),
  };

  return {
    author: {
      avatar: cutRandomArrayElement(avatars),
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: `${coordinates.lat}, ${coordinates.lng}`,
      price: getRandomNumber(2000, 15000),
      type: getRandomArrayElement(PREMISES_TYPES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getArrayRandomSlice(FEATURES),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at orci augue. Duis tincidunt sed magna a hendrerit. Curabitur ac.',
      photos: getArrayRandomSlice(photos),
    },
    location: coordinates,
  };
};

// Функция генерации массива случайных объявлений
const generateTestAds = () => new Array(adsNumber).fill(null).map(() => generateTestAd());

export {generateTestAds};
