import {deactivatePage, activatePage, resetButtonHandler, submitFormHandler, resetPreviews} from './app/form.js';
import {deactivateFilters, activateFilters, resetFilters, getFilters, filterOut} from './app/filter.js';
import {DefaultCoordinate, loadMap, createMarkers, resetMap} from './app/map.js';
import {getData} from './tools/server-api.js';
import {createCard} from './app/create-card.js';
import {showLoadError} from './app/dialog.js';
import {debounce} from './tools/debounce.js';

deactivatePage(() => deactivateFilters());

loadMap(activatePage (DefaultCoordinate.lat, DefaultCoordinate.lng, () => activateFilters()));

getData((ads) => {
  createMarkers(ads, createCard);
  getFilters(debounce(() => createMarkers(filterOut(ads), createCard)));

  resetButtonHandler(resetMap, () => {
    createMarkers(ads, createCard);
    resetFilters();
  });

  submitFormHandler(resetMap, () => {
    createMarkers(ads, createCard);
    resetFilters();
  });
},
showLoadError,
deactivateFilters,
);

resetButtonHandler(resetMap, () => resetPreviews());
submitFormHandler(resetMap, () => resetPreviews());
