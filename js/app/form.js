const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('.ad-form__element');

function deactivatePage() {
  adForm.classList.add('ad-form--disabled');

  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

function activatePage() {
  adForm.classList.remove('ad-form--disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
}

export {deactivatePage, activatePage};
