'use strict';

document.querySelector('.map')classList.remove('.map--faded');

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = [
  'flat',
  'house',
  'bungalo'
];
var CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var titlesCopy = TITLES.slice();
var typesCopy = TYPES.slice();
var checkinsCopy = CHECKINS.slice();
var featuresCopy = FEATURES.slice();
var photosCopy = PHOTOS.slice();

var randomElement = function (mass) {
  var randomNumber = Math.round((mass.length - 1) * Math.random());
  var element = mass[randomNumber];
  mass.splice(randomNumber, 1);

  return element;
};

var randomMass = function (mass) {
  var len = mass.length;
  var newMass = [];
  for (var i = 0;  i < len; i++) {
    var randomNumber = Math.round((mass.length - 1) * Math.random());
    var element = mass[randomNumber];
    mass.splice(randomNumber, 1);
    newMass[i] = element;
  }

  return newMass;
}

var randomLenght = function (mass) {
  var len = Math.round(mass.length * Math.random());
  var newMass = [];
  for (var i = 0;  i < len; i++) {
    var randomNumber = Math.round((mass.length - 1) * Math.random());
    var element = mass[randomNumber];
    mass.splice(randomNumber, 1);
    newMass[i] = element;
  }

  return newMass;
}

var randomNumber = function (min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

var nearbyAds = {
  author: {
    avatar: 'img/avatars/user0' + randomNumber(8, 1) + '.png'
  },

  offer: {
    title: randomElement(titlesCopy),
    address: location.x + ', ' + location.y,
    price: randomNumber(1000000, 1000),
    type: randomElement(typesCopy),
    rooms: randomNumber(5, 1),
    guests: randomNumber(50, 1),
    checkin: randomElement(checkinsCopy),
    checkout: randomElement(checkinsCopy),
    features: randomLenght(featuresCopy),
    description: '',
    photos: randomMass(photosCopy)
  },

  location: {
    x: randomNumber(900, 300),
    y: randomNumber(500, 150)
  }
}

var renderAds = function (nearbyAds) {
  var nearbyAdsElement = similarNearbyAdsTemplate.cloneNode(true);

  nearbyAdsElement.querySelector('.map__pins').style.fill = nearbyAds.location.x;
  return nearbyAdsElement;
}

var fragment = document.createDocumentFragment();
fragment.appendChild(renderAds(nearbyAds.offer.address));
similarListElement.appendChild(fragment);


