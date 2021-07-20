const COORDINATE_LENGTH = 5;
const DISPLAY_LIMITATION = 10;
const DEFAULT_ZOOM = 12;
const MainPinSettings = {url: 'img/main-pin.svg', size: [52, 52], anchor: [26, 52]};
const AdPinSettings = {url: 'img/pin.svg', size: [40, 40], anchor: [20, 40]};
const map = L.map('map-canvas');
const DefaultCoordinate = {lat: 35.68053, lng: 139.75515};
const markers = L.layerGroup().addTo(map);

const loadMap = (activateFn) => {
  map.on('load', () => {
    activateFn;
  })
    .setView({
      lat: DefaultCoordinate.lat,
      lng: DefaultCoordinate.lng,
    }, DEFAULT_ZOOM);
};

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const createPin = (url, size, anchor) => L.icon({
  iconUrl: url,
  iconSize: size,
  iconAnchor: anchor,
});

const placeMarker = (lat, lng, draggable = false, createIcon, location) => L.marker(
  {
    lat: lat,
    lng: lng,
  },
  {
    draggable: draggable,
    icon: createIcon,
  },
).addTo(location);

const mainMarker = placeMarker(
  DefaultCoordinate.lat,
  DefaultCoordinate.lng,
  true,
  createPin(MainPinSettings.url, MainPinSettings.size, MainPinSettings.anchor),
  map,
);

const getMainMarkerCoordinate = (coordinateInput) => {
  mainMarker.on('move', (evt) => {
    const coordinates = evt.target.getLatLng();

    coordinateInput.value = `${coordinates.lat.toFixed(COORDINATE_LENGTH)}, ${coordinates.lng.toFixed(COORDINATE_LENGTH)}`;
  });
};

const resetMap = (coordinateInput) => {
  mainMarker.setLatLng({
    lat: DefaultCoordinate.lat,
    lng: DefaultCoordinate.lng,
  });
  map.setView({
    lat: DefaultCoordinate.lat,
    lng: DefaultCoordinate.lng,
  }, 12);

  coordinateInput.value = `${DefaultCoordinate.lat}, ${DefaultCoordinate.lng}`;
};

const createMarkers = (data, createPopup) => {
  markers.clearLayers();

  for (let id = 0; id < DISPLAY_LIMITATION; id++) {
    if (data[id]) {
      placeMarker(
        data[id].location.lat,
        data[id].location.lng,
        true,
        createPin(AdPinSettings.url, AdPinSettings.size, AdPinSettings.anchor),
        markers,
      ).bindPopup(createPopup(data[id]), {keepInView: true});
    }
  }
};

export {DefaultCoordinate, loadMap, createMarkers, getMainMarkerCoordinate, resetMap};
