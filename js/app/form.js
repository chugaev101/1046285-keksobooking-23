/* eslint-disable no-console */
import {getMainMarkerCoordinate} from './map.js';
import {sendData} from '../tools/server-api.js';
import {showModalFailed, showModalSuccessSubmit} from './dialog.js';

const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('.ad-form__element');
const titleInput = adForm.querySelector('#title');
const titleMinLength = titleInput.minLength;
const coordinateInput = adForm.querySelector('#address');
const typeInput = adForm.querySelector('#type');
const MIN_PRICES_FOR_TYPES = {'bungalow': 0, 'flat': 1000, 'hotel': 3000, 'house': 5000, 'palace': 10000};
const priceInput = adForm.querySelector('#price');
const roomNumberInput = adForm.querySelector('#room_number');
const roomCapacity = {1: [1], 2: [1, 2], 3: [1, 2, 3], 100: [0]};
const numberSeatsInput = adForm.querySelector('#capacity');
const numberSeatsOptions = numberSeatsInput.querySelectorAll('option');
const formCheckInTime = adForm.querySelector('.ad-form__element--time');
const checkInLists = formCheckInTime.querySelectorAll('select');
const resetButton = adForm.querySelector('.ad-form__reset');

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
  });

  cb();
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
  const currentCapacity = roomCapacity[evt.target.value];

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
