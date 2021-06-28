const fragmentCard = document.querySelector('#card').content;
const templateCard = fragmentCard.querySelector('.popup');

const createCard = (obj) => {
  const newCard = templateCard.cloneNode(true);
  const avatar = newCard.querySelector('.popup__avatar');

  (obj.author.avatar) ? avatar.src = obj.author.avatar : avatar.src = 'img/avatars/default.png';

  const getRoomCapacityText = () => {
    const rooms = obj.offer.rooms;
    const guests = obj.offer.guests;
    let textForRooms;
    let textForGuests;

    if (!rooms || !guests) {
      return '';
    }

    switch (true) {
      case rooms === 1 || rooms % 10 === 1:
        textForRooms = 'комната для';
        break;
      case rooms >= 2 && rooms < 5 || rooms % 10 >= 2 && rooms % 10 < 5:
        textForRooms = 'комнаты для';
        break;
      case rooms >= 5 && rooms <= 10 || rooms % 10 === 0:
        textForRooms = 'комнат для';
        break;
    }

    switch (true) {
      case guests === 1 || guests % 10 === 1:
        textForGuests = 'гостя';
        break;
      case guests > 1 && guests % 10 !== 1:
        textForGuests = 'гостей';
        break;
    }

    return `${rooms} ${textForRooms} ${guests} ${textForGuests}`;
  };

  const addPhotos = () => {
    const photos = obj.offer.photos;
    const photoList = newCard.querySelector('.popup__photos');
    let photoTemplate = photoList.removeChild(newCard.querySelector('.popup__photo'));

    if (!photos.length) {
      photoList.remove();
    }

    photos.forEach((photoLink) => {
      photoTemplate = photoTemplate.cloneNode(true);
      photoTemplate.src = photoLink;
      photoList.appendChild(photoTemplate);
    });
  };

  addPhotos();

  const addDataToElement = (selector, data) => {
    (data) ? newCard.querySelector(selector).textContent = data : newCard.querySelector(selector).remove();
  };

  addDataToElement('.popup__title', obj.offer.title);
  addDataToElement('.popup__text--address', obj.offer.address);
  addDataToElement('.popup__text--price', `${obj.offer.price} ₽/ночь`);
  addDataToElement('.popup__type', obj.offer.type);
  addDataToElement('.popup__text--capacity', getRoomCapacityText());
  addDataToElement('.popup__text--time', `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`);
  addDataToElement('.popup__features', obj.offer.features.join(', '));
  addDataToElement('.popup__description', obj.offer.description);
  addDataToElement('.popup__avatar', obj.author.avatar);

  return newCard;
};

export {createCard};
