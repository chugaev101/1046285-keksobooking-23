const ERROR_POPUP_DELAY_TIME = 2000;
const BUTTON_CLOSE = 'Escape';
const pageBody = document.querySelector('body');
const map = document.querySelector('.map');
const errorLoadAdsFragment = map.querySelector('#load_error').content;
const successMessageFragment = document.querySelector('#success').content;
const successMessage = successMessageFragment.querySelector('.success').cloneNode(true);
const errorMessageFragment = document.querySelector('#error').content;
const errorMessage = errorMessageFragment.querySelector('.error').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const showLoadError = () => {
  const errorLoadAdsPopup = errorLoadAdsFragment.querySelector('.load-error__popup').cloneNode(true);
  const closeButton = errorLoadAdsPopup.querySelector('.load-error__button--hidden');
  const reloadButton = errorLoadAdsPopup.querySelector('.load-error__button--reload');
  const showPopup = () => errorLoadAdsPopup.classList.add('load-error__popup--show');
  const removePopup = () => errorLoadAdsPopup.remove();

  map.append(errorLoadAdsPopup);

  setTimeout(showPopup, ERROR_POPUP_DELAY_TIME);

  closeButton.addEventListener('click', () => {
    errorLoadAdsPopup.classList.remove('load-error__popup--show');
    setTimeout(removePopup, ERROR_POPUP_DELAY_TIME);
  });

  reloadButton.addEventListener('click', () => {
    document.location.reload();
  });
};

const hiddenMessage = (element) => element.remove();

const showModalSuccessSubmit = () => {
  pageBody.append(successMessage);

  successMessage.addEventListener('click', () => {
    hiddenMessage(successMessage);

    successMessage.removeEventListener('click', hiddenMessage);
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === BUTTON_CLOSE) {
      hiddenMessage(successMessage);
    }

    window.removeEventListener('keydown', hiddenMessage);
  });
};

const showModalFailed = () => {
  pageBody.append(errorMessage);

  errorButton.addEventListener('click', () => {
    hiddenMessage(errorMessage);

    errorMessage.removeEventListener('click', hiddenMessage);
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === BUTTON_CLOSE) {
      hiddenMessage(errorMessage);
    }

    window.removeEventListener('keydown', hiddenMessage);
  });
};

export {showModalFailed, showModalSuccessSubmit, showLoadError};
