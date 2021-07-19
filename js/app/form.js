import {getMainMarkerCoordinate} from './map.js';
import {sendData} from '../tools/server-api.js';
import {showModalFailed, showModalSuccessSubmit} from './dialog.js';

const MIN_PRICES_FOR_TYPES = {'bungalow': 0, 'flat': 1000, 'hotel': 3000, 'house': 5000, 'palace': 10000};
const VALID_GRAPHIC_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ROOM_CAPACITY = {1: [1], 2: [1, 2], 3: [1, 2, 3], 100: [0]};
const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('.ad-form__element');
const titleInput = adForm.querySelector('#title');
const titleMinLength = titleInput.minLength;
const coordinateInput = adForm.querySelector('#address');
const typeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const roomNumberInput = adForm.querySelector('#room_number');
const numberSeatsInput = adForm.querySelector('#capacity');
const numberSeatsOptions = numberSeatsInput.querySelectorAll('option');
const formCheckInTime = adForm.querySelector('.ad-form__element--time');
const checkInLists = formCheckInTime.querySelectorAll('select');
const resetButton = adForm.querySelector('.ad-form__reset');
const inputAvatar = adForm.querySelector('#avatar');
const userAvatarPreview = adForm.querySelector('.ad-form-header__preview-image');
const inputPhotoHousing = adForm.querySelector('#images');
const housingPreview = adForm.querySelector('.ad-form__photo-image');

const deactivatePage = (cb) => {
  adForm.classList.add('ad-form--disabled');

  formElements.forEach((element) => {
    element.disabled = true;
  });

  cb();
};

const activatePage = (lat, lng, cb) => {
  adForm.classList.remove('ad-form--disabled');
  coordinateInput.value = `${lat}, ${lng}`;

  formElements.forEach((element) => {
    element.disabled = false;
  });

  cb();
};

const resetButtonHandler = (resetMap, cb) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    adForm.reset();
    resetMap(coordinateInput);
    cb();
  });
};

const submitFormHandler = (reset) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        showModalSuccessSubmit();
        evt.target.reset();
        reset(coordinateInput);
      },
      () => showModalFailed(),
      new FormData(evt.target),
    );
  });
};

const setPreview = (input, output) => {
  input.addEventListener('change', () => {
    const avatar = input.files[0];
    const fileName = avatar.name.toLowerCase();

    const matches = VALID_GRAPHIC_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        output.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  });
};

setPreview(inputAvatar, userAvatarPreview);
setPreview(inputPhotoHousing, housingPreview);

titleInput.addEventListener('input', () => {
  switch (true) {
    case titleInput.value.length < titleMinLength:
      titleInput.setCustomValidity(`Ещё как минимум ${titleMinLength - titleInput.value.length} симв.`);
      break;
    default:
      titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

typeInput.addEventListener('input', (evt) => {
  priceInput.value = '';

  Object.keys(MIN_PRICES_FOR_TYPES).forEach((key) => {
    if (evt.target.value === key) {
      const currentMinPrice = MIN_PRICES_FOR_TYPES[key];

      priceInput.min = currentMinPrice;
      priceInput.placeholder = `от ${currentMinPrice}`;
    }
  });
});

roomNumberInput.addEventListener('input', (evt) => {
  const currentCapacity = ROOM_CAPACITY[evt.target.value];

  for (const numberSeats of numberSeatsOptions) {
    if (currentCapacity.includes(+numberSeats.value)) {
      numberSeats.disabled = false;
      numberSeatsInput.value = numberSeats.value;
    } else {
      numberSeats.disabled = true;
    }
  }
});

formCheckInTime.addEventListener('input', (evt) => {
  checkInLists.forEach((list) => {
    if (list !== evt.target) {
      list.value = evt.target.value;
    }
  });
});

getMainMarkerCoordinate(coordinateInput);

export {deactivatePage, activatePage, submitFormHandler, resetButtonHandler};
