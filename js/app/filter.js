const DISPLAY_LIMIT = 10;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const NEXT_INDEX = 1;
const REMOVAL_AMOUNT = 1;
const FILTER_DEFAULT_VALUE = 'any';
const PriceLevels = {title: 'price', low: 'low', middle: 'middle', high: 'high'};
const filters = {};
const features = [];
const filterForm = document.querySelector('.map__filters');
const filterElements = filterForm.querySelectorAll('.map__filter');
const featuresCheckboxes = filterForm.querySelectorAll('[name=features]');

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
  filterElements.forEach((element) => {
    element.value = FILTER_DEFAULT_VALUE;
  });
};

const getFilters = (cb) => {

  filterForm.addEventListener('input', (evt) => {
    if (evt.target.classList.contains('map__filter')) {
      const targetIndex = evt.target.name.indexOf('-') + NEXT_INDEX;
      const filterKey = evt.target.name.slice(targetIndex, Infinity);

      if (evt.target.value === 'any') {
        delete filters[filterKey];
      } else if (isNaN(evt.target.value)) {
        filters[filterKey] = evt.target.value;
      } else {
        filters[filterKey] = +evt.target.value;
      }
    }

    if (evt.target.classList.contains('map__checkbox')) {
      (evt.target.checked) ? features.push(evt.target.value) : features.splice(features.indexOf(evt.target.value), REMOVAL_AMOUNT);
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

const filterOut = (data) => {
  const copiedData = data.slice();
  const filteredData = [];

  if (features.length) {
    copiedData.sort(compareAds);
  }

  for (let id = 0; id < copiedData.length; id++) {
    let hitCounter = 0;

    if (filteredData.length === DISPLAY_LIMIT) {
      break;
    }


    Object.keys(filters).forEach((key) => {

      if (key === PriceLevels.title) {
        switch (true) {
          case filters[key] === PriceLevels.low:
            if (copiedData[id].offer.price < LOW_PRICE) {
              hitCounter++;
            }
            break;
          case filters[key] === PriceLevels.middle:
            if (copiedData[id].offer.price  > LOW_PRICE && copiedData[id].offer.price < HIGH_PRICE) {
              hitCounter++;
            }
            break;
          case filters[key] === PriceLevels.high:
            if (copiedData[id].offer.price  > HIGH_PRICE) {
              hitCounter++;
            }
            break;
        }
      }

      if (copiedData[id].offer[key] === filters[key]) {
        hitCounter++;
      }
    });

    if (hitCounter === Object.values(filters).length) {
      filteredData.push(copiedData[id]);
    }
  }

  return filteredData;
};

export {deactivateFilters, activateFilters, resetFilters, getFilters, filterOut};
