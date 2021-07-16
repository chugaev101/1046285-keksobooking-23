const pageMain = document.querySelector('main');
const map = document.querySelector('.map');
const errorLoadAdsFragment = map.querySelector('#load_error').content;
const successSubmitMessageFragment = document.querySelector('#success').content;
const errorSubmitMessageFragment = document.querySelector('#error').content;
const ERROR_POPUP_DELAY_TIME = 2000;
const MESSAGE_DELAY_TIME = 2500;

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

const showModalSuccessSubmit = () => {
  const successMessage = successSubmitMessageFragment.querySelector('.success').cloneNode(true);
  const hiddenMessage = () => successMessage.remove();

  pageMain.append(successMessage);

  setTimeout(hiddenMessage, MESSAGE_DELAY_TIME);
};

const showModalFailed = () => {
  const errorMessage = errorSubmitMessageFragment.querySelector('.error').cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  pageMain.append(errorMessage);

  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      errorMessage.remove();
    }

    window.removeEventListener('keydown', () => errorMessage.remove());
  }, true);
};

export {showModalFailed, showModalSuccessSubmit, showLoadError};
