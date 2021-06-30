import {deactivatePage, activatePage, resetButtonHandler, submitFormHandler} from './app/form.js';
import {defaultCoordinate, loadMap, createMarkers, resetMap} from './app/map.js';
import {getData} from './tools/server-api.js';
import {createCard} from './app/create-card.js';
import {showLoadError} from './app/dialog.js';

deactivatePage();

loadMap(activatePage(defaultCoordinate.lat, defaultCoordinate.lng));

getData((ads) => createMarkers(ads, createCard), showLoadError);

submitFormHandler(resetMap);

resetButtonHandler(resetMap);
