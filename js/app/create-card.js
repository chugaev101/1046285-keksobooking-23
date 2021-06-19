const TEMPLATE_CARD = document.querySelector('#card').content;

const createCard = (obj) => {
  const newCard = TEMPLATE_CARD.cloneNode(true);

  const descriptionRoomOpacity = function () {
    const ROOMS = obj.offer.rooms;
    const GUESTS = obj.offer.guests;
    let textForRooms;
    let textForGuests;

    switch (true) {
      case ROOMS === 1 || ROOMS % 10 === 1:
        textForRooms = 'комната для';
        break;
      case ROOMS >= 2 && ROOMS < 5 || ROOMS % 10 >= 2 && ROOMS % 10 < 5:
        textForRooms = 'комнаты для';
        break;
      case ROOMS >= 5 && ROOMS <= 10 || ROOMS % 10 === 0:
        textForRooms = 'комнат для';
        break;
    }

    switch (true) {
      case GUESTS === 1 || GUESTS % 10 === 1:
        textForGuests = 'гостя';
        break;
      case GUESTS > 1 && GUESTS % 10 !== 1:
        textForGuests = 'гостей';
        break;
    }

    return `${ROOMS} ${textForRooms} ${GUESTS} ${textForGuests}`;
  };

  // добавляет фотографий помещения
  ( function () {
    const PHOTOS = obj.offer.photos;
    const PHOTO_LIST = newCard.querySelector('.popup__photos');
    let photoTemplate = PHOTO_LIST.removeChild(newCard.querySelector('.popup__photo'));

    PHOTOS.forEach((photoLink) => {
      photoTemplate = photoTemplate.cloneNode(true);
      photoTemplate.src = photoLink;
      PHOTO_LIST.appendChild(photoTemplate);
    });
  }());

  newCard.querySelector('.popup__title').textContent = obj.offer.title;
  newCard.querySelector('.popup__text--address').textContent = obj.offer.address;
  newCard.querySelector('.popup__text--price').textContent = `${obj.offer.price} ₽/ночь`;
  newCard.querySelector('.popup__type').textContent = obj.offer.type;
  newCard.querySelector('.popup__text--capacity').textContent = descriptionRoomOpacity();
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  newCard.querySelector('.popup__features').textContent = obj.offer.features.join(', ');
  newCard.querySelector('.popup__description').textContent = obj.offer.description;
  newCard.querySelector('.popup__avatar').src = obj.author.avatar;

  return newCard;
};

export {createCard};
