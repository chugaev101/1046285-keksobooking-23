const filterForm = document.querySelector('.map__filters');
const filterElements = filterForm.querySelectorAll('.map__filter');
const filterType = filterForm.querySelector('#housing-type');
const filterPrice = filterForm.querySelector('#housing-price');
const filterRooms = filterForm.querySelector('#housing-rooms');
const filterGuests = filterForm.querySelector('#housing-guests');
const featuresCheckboxes = filterForm.querySelectorAll('[name=features]');
const filters = [];
const features = [];
const lowPrice = 10000;
const highPrice = 50000;

const deactivateFilters = () => {
  filterForm.classList.add('map__filters--disabled');

  filterElements.forEach((element) => {
    element.disabled = true;
  });
  featuresCheckboxes.forEach((element) => {
    element.disabled = true;
  });
};

const activateFilters = () => {
  filterForm.classList.remove('map__filters--disabled');

  filterElements.forEach((element) => {
    element.disabled = false;
  });
  featuresCheckboxes.forEach((element) => {
    element.disabled = false;
  });
};

const resetFilters = () => {
  filterForm.reset();
};

const getFilters = (cb) => {

  filterForm.addEventListener('input', (evt) => {
    if (evt.target.classList.contains('map__filter')) {

      switch (true) {
        case evt.target.name === filterType.name:
          (evt.target.value === 'any') ? filters[0] = null : filters[0] = evt.target.value;
          break;
        case evt.target.name === filterPrice.name:
          (evt.target.value === 'any') ? filters[1] = null : filters[1] = evt.target.value;
          break;
        case evt.target.name === filterRooms.name:
          (evt.target.value === 'any') ? filters[2] = null : filters[2] = +evt.target.value;
          break;
        case evt.target.name === filterGuests.name:
          (evt.target.value === 'any') ? filters[3] = null : filters[3] = +evt.target.value;
          break;
      }
    }

    if (evt.target.classList.contains('map__checkbox')) {
      (evt.target.checked) ? features.push(evt.target.value) : features.splice(features.indexOf(evt.target.value), 1);
    }

    cb();
  });
};

const getAdRank = (ad) => {
  const adFeatures = ad.offer.features;
  let rank = 0;

  if (adFeatures) {
    features.forEach((feature) => {
      if (adFeatures.includes(feature)) {
        rank ++;
      }
    });
  }

  return rank;
};

const compareAds = (adA, adB) => {
  const rankA = getAdRank(adA);
  const rankB = getAdRank(adB);

  return rankB - rankA;
};

const filtering = (data) => {
  let filteredData = data;

  filters.filter((filter) => filter !== null)
    .forEach((filter) => {
      if (filter === 'low') {
        filteredData = filteredData.filter((obj) => obj.offer.price < lowPrice);
      } else if (filter === 'middle') {
        filteredData = filteredData.filter((obj) => obj.offer.price >= lowPrice && obj.offer.price < highPrice);
      } else if (filter === 'high') {
        filteredData = filteredData.filter((obj) => obj.offer.price > highPrice);
      } else {
        filteredData = filteredData.filter((obj) => Object.values(obj.offer).includes(filter));
      }
    });

  if (features) {
    return filteredData.slice().sort(compareAds);
  }

  return filteredData;
};

export {deactivateFilters, activateFilters, resetFilters, getFilters, filtering};
