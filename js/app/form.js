const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('.ad-form__element');
const titleInput = adForm.querySelector('#title');
const typeInput = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const roomNumberInput = adForm.querySelector('#room_number');
const numberSeatsInput = adForm.querySelector('#capacity');
const numberSeatsOptions = numberSeatsInput.querySelectorAll('option');

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');

  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
};

titleInput.addEventListener('input', () => {
  const minValue = titleInput.getAttribute('minlength');
  const maxValue = titleInput.getAttribute('maxlength');

  switch (true) {
    case titleInput.value.length < minValue:
      titleInput.setCustomValidity(`Ещё как минимум ${minValue - titleInput.value.length} симв.`);
      break;
    case titleInput.value.length > maxValue - 11:
      titleInput.setCustomValidity(`Осталось ${maxValue - titleInput.value.length} симв.`);
      break;
    default:
      titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

typeInput.addEventListener('input', () => {
  switch (true) {
    case typeInput.value === 'bungalow':
      price.setAttribute('min', '0');
      price.setAttribute('placeholder', 'от 0');
      break;
    case typeInput.value === 'flat':
      price.setAttribute('min', '1000');
      price.setAttribute('placeholder', 'от 1 000');
      break;
    case typeInput.value === 'hotel':
      price.setAttribute('min', '3000');
      price.setAttribute('placeholder', 'от 3 000');
      break;
    case typeInput.value === 'house':
      price.setAttribute('min', '5000');
      price.setAttribute('placeholder', 'от 5 000');
      break;
    case typeInput.value === 'palace':
      price.setAttribute('min', '10000');
      price.setAttribute('placeholder', 'от 10 000');
      break;
  }
});

roomNumberInput.addEventListener('input', () => {

  if (+roomNumberInput.value < 100) {
    numberSeatsOptions.forEach((option) => {
      (+option.value > roomNumberInput.value || +option.value === 0) ? option.setAttribute('disabled', 'disabled') : option.removeAttribute('disabled', 'disabled');
    });
    numberSeatsInput.value = numberSeatsOptions[0].value;

  } else if (+roomNumberInput.value >= 100) {
    numberSeatsOptions.forEach((option) => {
      if (+option.value !== 0) {
        option.setAttribute('disabled', 'disabled');
      } else {
        option.removeAttribute('disabled', 'disabled');
        numberSeatsInput.value = option.value;
      }
    });
  }

});

export {deactivatePage, activatePage};
