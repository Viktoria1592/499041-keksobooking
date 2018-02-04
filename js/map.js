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

var generateAdData = function() {
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

var nearByAds = [];

for (var i = 0; i < 8; i++) {
  nearByAds.push(generateAdData());
}

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

for (i = 0; i < 8; i++) {
  var newElement = document.createElement('button');
  newElement.style = 'left: ' + (nearByAds[i].location.x + 20) + 'px; top: ' + (nearByAds[i].location.y + 40) + 'px;';
  newElement.className = 'map__pin';

  var newElementImg = document.createElement('img');
  newElementImg.src = nearByAds[i].author.avatar;
  newElementImg.width = '40';
  newElementImg.height = '40';
  newElementImg.setAttribute('draggable', 'false');

  newElement.appendChild(newElementImg);
  fragment.appendChild(newElement);
}
mapPins.appendChild(fragment);

var similarTemplate = document.querySelector('template').content.querySelector('article');

var renderPosts = function () {
  var newPosts = similarTemplate.cloneNode(true);
  var massP = newPosts.querySelectorAll('p');
  newPosts.className = 'map__card';
  newPosts.querySelector('h3').innerText = nearByAds[i].offer.title;
  newPosts.querySelector('small').innerText = nearByAds[i].offer.address;
  console.log(nearByAds[i]);
  newPosts.querySelector('.popup__price').innerText = nearByAds[i].offer.price + ' &#x20bd;/ночь';
  if (nearByAds[i].offer.type === 'flat') {
    newPosts.querySelector('h4').innerText = 'Квартира';
  } else if (nearByAds[i].offer.type === 'bungalo') {
    newPosts.querySelector('h4').innerText = 'Бунгало';
  } else {
    newPosts.querySelector('h4').innerText = 'Дом';
  }
  massP[2].innerText =  nearByAds[i].offer.rooms + ' комнаты для ' + nearByAds[i].offer.guests + ' гостей';
  massP[3].innerText = 'Заезд после ' + nearByAds[i].offer.checkin + ', выезд до ' + nearByAds[i].offer.checkout;
  var featureAll = newPosts.querySelectorAll('ul.popup__features > li');
  for (var j = 0; j < nearByAds[i].offer.features.length; j++) {
    featureAll[j].className = 'feature feature--' + nearByAds[i].offer.features[j];
  }
  massP[4].innerText = nearByAds[i].offer.description;
  newPosts.querySelector('li > img').src = nearByAds[i].offer.photos;

  return newPosts;
};
for (i = 0; i < 1; i++) {
  fragment.appendChild(renderPosts());
}
var foo = document.querySelector('.map');
foo.appendChild(fragment);
console.log(foo);

var mapFiltersContainer = document.querySelector('.map__filters-container')
mapFiltersContainer.insertAdjacentHTML('beforeend', similarTemplate.appendChild(fragment));

