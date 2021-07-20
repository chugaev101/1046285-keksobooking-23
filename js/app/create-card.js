const fragmentCard = document.querySelector('#card').content;
const templateCard = fragmentCard.querySelector('.popup');

const getRoomCapacityText = (obj) => {
  const rooms = obj.offer.rooms;
  const guests = obj.offer.guests;
  let textForRooms;
  let textForGuests;

  if (!rooms || !guests) {
    return '';
  }

  switch (true) {
    // В этом случае числа 1 и 10 используются для преобразования слова "комната" в именительный падеж.
    case rooms === 1 || rooms % 10 === 1:
      textForRooms = 'комната для';
      break;
    // В этом случае числа 2, 5 и 10 используются для преобразования множественного числа слова "комната" в винительный падеж.
    case rooms >= 2 && rooms < 5 || rooms % 10 >= 2 && rooms % 10 < 5:
      textForRooms = 'комнаты для';
      break;
    // В этом случае числа 0, 5 и 10 используются для преобразования множественного числа слова "комната" в родительный падеж.
    case rooms >= 5 && rooms <= 10 || rooms % 10 === 0:
      textForRooms = 'комнат для';
      break;
  }

  switch (true) {
    // В этом случае числа 1 и 10 используются для преобразования слова "гость" в родительный падеж.
    case guests === 1 || guests % 10 === 1:
      textForGuests = 'гостя';
      break;
    // В этом случае числа 1 и 10 используются для преобразования множественного числа слова "гость" в родительный падеж.
    case guests > 1 && guests % 10 !== 1:
      textForGuests = 'гостей';
      break;
  }

  return `${rooms} ${textForRooms} ${guests} ${textForGuests}`;
};

const addAvatar = (obj, card) => {
  const avatar = card.querySelector('.popup__avatar');

  (obj.author.avatar) ? avatar.src = obj.author.avatar : avatar.src = 'img/avatars/default.png';
};

const addPhotos = (obj, card) => {
  const photos = obj.offer.photos;
  const photoList = card.querySelector('.popup__photos');
  let photoTemplate = photoList.removeChild(photoList.querySelector('.popup__photo'));

  if (photos) {
    if (!photos.length) {
      photoList.remove();
    }

    photos.forEach((photoLink) => {
      photoTemplate = photoTemplate.cloneNode(true);
      photoTemplate.src = photoLink;
      photoList.appendChild(photoTemplate);
    });
  }
};

const addFeatures = (obj, card) => {
  const features = obj.offer.features;
  const featuresList = card.querySelector('.popup__features');
  const featureTemplate = featuresList.removeChild(featuresList.querySelector('.popup__feature'));

  if(features) {
    if (!features.length) {
      featuresList.remove();
    }

    features.forEach((feature) => {
      const currentFuture = featureTemplate.cloneNode(true);
      currentFuture.classList.add(`popup__feature--${feature}`);
      featuresList.appendChild(currentFuture);
    });
  }
};

const addDataToElement = (selector, data, card) => {
  const element = card.querySelector(selector);

  (data) ? element.textContent = data : element.remove();
};

const createCard = (obj) => {
  const newCard = templateCard.cloneNode(true);

  addAvatar(obj, newCard);
  addPhotos(obj, newCard);
  addFeatures(obj, newCard);
  addDataToElement('.popup__title', obj.offer.title, newCard);
  addDataToElement('.popup__text--address', obj.offer.address, newCard);
  addDataToElement('.popup__text--price', `${obj.offer.price} ₽/ночь`, newCard);
  addDataToElement('.popup__type', obj.offer.type, newCard);
  addDataToElement('.popup__text--capacity', getRoomCapacityText(obj), newCard);
  addDataToElement('.popup__text--time', `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`, newCard);
  addDataToElement('.popup__description', obj.offer.description, newCard);
  addDataToElement('.popup__avatar', obj.author.avatar, newCard);

  return newCard;
};

export {createCard};
