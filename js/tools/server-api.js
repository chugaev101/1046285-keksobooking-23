const getData = (onSuccess, onFail, deactivation) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      onFail();
      deactivation();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
