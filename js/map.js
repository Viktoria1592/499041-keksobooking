'use strict';

document.querySelector('.map').classList.remove('.map--faded');

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
};

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
};

var randomNumber = function (min, max) {
   return Math.round(Math.random() * (max - min) + min);
};

var Ads = function() {
  return {
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
};

var nearbyAds = [];

for (var i = 0; i < 8; i++) {
  nearbyAds[i] = Ads();
}

var mapPins = document.querySelector('.map__pins');

var fragment = document.createDocumentFragment();

for (i = 0; i < 6; i++) {
  var newElement = document.createElement('button');
  newElement.style = 'left: ' + (nearbyAds.location.x + 20) + 'px; top: ' + (nearbyAds.location.y + 40) + 'px;';
  newElement.className = 'map__pin';
  var newElementImg = document.createElement('img');
  newElementImg.src = nearbyAds.author.avatar;
  newElementImg.style.width = '40';
  newElementImg.style.height = '40';
  newElementImg.setAttribute('draggable', 'false');
  
  fragment.appendChild(newElement);
}

mapPins.appendChild(fragment);

var similarTemplate = document.querySelector('.map__card popup').content;

var renderPosts = function () {
  var newPosts = similarTemplate.cloneNode(true);
  newPosts.className = 'map__card';
  newPosts.innerHTML = '<h3>' + nearbyAds.offer.title + '</h3>';
  newPosts.innerHTML = '<p><small>' + nearbyAds.offer.address + '</small></p>';
  newPosts.innerHTML = '<p class="popup__price">' + nearbyAds.offer.price + '&#x20bd;/ночь</p>';
  if (nearbyAds.offer.type === 'flat') {
    newPosts.innerHTML = '<h4>Квартира</h4>';
  } else if (nearbyAds.offer.type === 'bungalo') {
    newPosts.innerHTML = '<h4>Бунгало</h4>';
  } else {
    newPosts.innerHTML = '<h4>Дом</h4>';
  }
  newPosts.innerHTML = '<p>' + nearbyAds.offer.rooms + ' комнаты для ' + nearbyAds.offer.guests + ' гостей </p>';
  newPosts.innerHTML = '<p>Заезд после ' + nearbyAds.offer.checkin + ', выезд до ' + nearbyAds.offer.checkout + '</p>';
  newPosts.innerHTML = '<ul class="popup__features">';
  for (var j = 0; j <= nearbyAds.offer.features.length; j++) {
    newPosts.innerHTML = '<li class="feature feature--' + nearbyAds.offer.features[j] + '"></li>';
  }
  newPosts.innerHTML = '</ul>';
  newPosts.innerHTML = '<p>' + nearbyAds.offer.description + '</p>';
  newPosts.innerHTML = '<ul class="popup__pictures">';
  for (j = 0; j <= nearbyAds.offer.photos.length; j++) {
    newPosts.innerHTML = '<li><img src="' + nearbyAds.offer.photos[j] + '"></li>';
  }
  newPosts.innerHTML = '</ul>';

  return newPosts;
};

fragment.appendChild(renderPosts());
var mapFiltersContainer = document.querySelector('.map__filters-container');
mapFiltersContainer.insertAdjacentHTML('beforebegin', similarTemplate.appendChild(fragment));


