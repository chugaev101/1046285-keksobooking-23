/* eslint-disable no-console */
import {deactivatePage, activatePage, resetButton, coordinateInput} from './form.js';
import {createCard} from '../app/create-card.js';
import {generateTestAds} from '../tools/test-data.js';

const defaultCoordinate = {lat: 35.68053, lng: 139.75515};
const COORDINATE_LENGTH = 5;
const testData = generateTestAds();

coordinateInput.value = `${defaultCoordinate.lat}, ${defaultCoordinate.lng}`;

deactivatePage();

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
  })
  .setView({
    lat: defaultCoordinate.lat,
    lng: defaultCoordinate.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adPinIcon = L.icon({
  iconUrl: '../../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: defaultCoordinate.lat,
    lng: defaultCoordinate.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();

  coordinateInput.value = `${coordinates.lat.toFixed(COORDINATE_LENGTH)}, ${coordinates.lng.toFixed(COORDINATE_LENGTH)}`;
});

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: defaultCoordinate.lat,
    lng: defaultCoordinate.lng,
  });
  map.setView({
    lat: defaultCoordinate.lat,
    lng: defaultCoordinate.lng,
  }, 10);

  coordinateInput.value = `${defaultCoordinate.lat}, ${defaultCoordinate.lng}`;
});

testData.forEach((element) => {
  L.marker(
    {
      lat: element.location.lat,
      lng: element.location.lng,
    },
    {
      icon: adPinIcon,
    },
  )
    .bindPopup(createCard(element), {keepInView: true})
    .addTo(map);
});

