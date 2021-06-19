import './app/form.js';
import {generateTestAds} from './tools/test-data.js';
import {createCard} from './app/create-card.js';

const TEST_DATA = generateTestAds();
const CANVAS = document.querySelector('#map-canvas');

CANVAS.appendChild(createCard(TEST_DATA[0]));
