import {deactivatePage, activatePage, resetButtonHandler, submitFormHandler} from './app/form.js';
import {deactivateFilters, activateFilters, resetFilters, getFilters, filtering} from './app/filter.js';
import {defaultCoordinate, loadMap, createMarkers, resetMap} from './app/map.js';
import {getData} from './tools/server-api.js';
import {createCard} from './app/create-card.js';
import {showLoadError} from './app/dialog.js';
import {debounce} from './tools/debounce.js';

deactivatePage(() => deactivateFilters());

loadMap(activatePage (defaultCoordinate.lat, defaultCoordinate.lng, () => activateFilters()));

getData((ads) => {
  createMarkers(ads, createCard);
  getFilters(debounce(() => createMarkers(filtering(ads), createCard)));
},
showLoadError,
deactivateFilters,
);

submitFormHandler(resetMap, () => resetFilters());

resetButtonHandler(resetMap, () => resetFilters());
