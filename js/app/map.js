const map = L.map('map-canvas');
const defaultCoordinate = {lat: 35.68053, lng: 139.75515};
const COORDINATE_LENGTH = 5;
const DISPLAY_LIMITATION = 10;
const markers = L.layerGroup().addTo(map);

const loadMap = (activateFn) => {
  map.on('load', () => {
    activateFn;
  })
    .setView({
      lat: defaultCoordinate.lat,
      lng: defaultCoordinate.lng,
    }, 12);
};

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

const getMainMarkerCoordinate = (coordinateInput) => {
  mainMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();

    coordinateInput.value = `${coordinates.lat.toFixed(COORDINATE_LENGTH)}, ${coordinates.lng.toFixed(COORDINATE_LENGTH)}`;
  });
};

const resetMap = (coordinateInput) => {
  mainMarker.setLatLng({
    lat: defaultCoordinate.lat,
    lng: defaultCoordinate.lng,
  });
  map.setView({
    lat: defaultCoordinate.lat,
    lng: defaultCoordinate.lng,
  }, 12);

  coordinateInput.value = `${defaultCoordinate.lat}, ${defaultCoordinate.lng}`;
};

const createMarkers = (data, createPopup) => {
  markers.clearLayers();

  for (let id = 0; id < DISPLAY_LIMITATION; id++) {
    if (data[id]) {
      L.marker(
        {
          lat: data[id].location.lat,
          lng: data[id].location.lng,
        },
        {
          icon: adPinIcon,
        },
      )
        .bindPopup(createPopup(data[id]), {keepInView: true})
        .addTo(markers);
    }
  }
};

export {defaultCoordinate, loadMap, createMarkers, getMainMarkerCoordinate, resetMap};
