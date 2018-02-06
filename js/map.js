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
  for (var i = 0; i < len; i++) {
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
  for (var i = 0; i < len; i++) {
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


var generateAdData = function () {
  var locatX = randomNumber(900, 300);
  var locatY = randomNumber(500, 150);
  return {
    author: {
      avatar: 'img/avatars/user0' + randomNumber(8, 1) + '.png'
    },

    offer: {
      title: randomElement(titlesCopy),
      address: locatX + ', ' + locatY,
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

    locat: {
      x: locatX,
      y: locatY
    }
  };
};

var nearByAds = [];

for (var i = 0; i < 8; i++) {
  nearByAds.push(generateAdData());
}

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var createNewElement = function () {
  var newElement = document.createElement('button');
  newElement.style = 'left: ' + (nearByAds[i].locat.x + 20) + 'px; top: ' + (nearByAds[i].locat.y + 40) + 'px;';
  newElement.className = 'map__pin';

  var newImg = document.createElement('img');
  newImg.src = nearByAds[i].author.avatar;
  newImg.width = '40';
  newImg.height = '40';
  newImg.setAttribute('draggable', 'false');

  newElement.appendChild(newImg);
  return newElement;
};

for (i = 0; i < 8; i++) {
  fragment.appendChild(createNewElement());
}
mapPins.appendChild(fragment);

document.querySelector('.map').classList.remove('map--faded');

var similarTemplate = document.querySelector('template').content.querySelector('article');

var renderPosts = function () {
  var newPosts = similarTemplate.cloneNode(true);
  var massP = newPosts.querySelectorAll('p');
  var elementInnerText = function (element, str) {
    newPosts.querySelector(element).innerText = str;
  };
  newPosts.className = 'map__card';
  elementInnerText('h3', nearByAds[i].offer.title);
  elementInnerText('small', nearByAds[i].offer.address);
  elementInnerText('.popup__price', nearByAds[i].offer.price.toLocaleString() + ' ₽/ночь');

  if (nearByAds[i].offer.type === 'flat') {
    elementInnerText('h4', 'Квартира');
  } else if (nearByAds[i].offer.type === 'bungalo') {
    elementInnerText('h4', 'Бунгало');
  } else {
    elementInnerText('h4', 'Дом');
  }

  if (nearByAds[i].offer.rooms === 1) {
    massP[2].innerText = nearByAds[i].offer.rooms + ' комната для ' + nearByAds[i].offer.guests + ' гостей';
  } else if (nearByAds[i].offer.rooms === 5) {
    massP[2].innerText = nearByAds[i].offer.rooms + ' комнат для ' + nearByAds[i].offer.guests + ' гостей';
  } else {
    massP[2].innerText = nearByAds[i].offer.rooms + ' комнаты для ' + nearByAds[i].offer.guests + ' гостей';
  }

  massP[3].innerText = 'Заезд после ' + nearByAds[i].offer.checkin + ', выезд до ' + nearByAds[i].offer.checkout;
  newPosts.querySelector('.popup__features').style.paddingLeft = '0';

  var featureAll = newPosts.querySelectorAll('ul.popup__features > li');
  for (j = 0; j < featureAll.length; j++) {
    featureAll[j].style.display = 'none';
  }
  for (var j = 0; j < nearByAds[i].offer.features.length; j++) {
    featureAll[j].style.display = '';
    featureAll[j].className = 'feature feature--' + nearByAds[i].offer.features[j];
  }

  massP[4].innerText = nearByAds[i].offer.description;

  var ulPictures = newPosts.querySelector('.popup__pictures');
  ulPictures.style.paddingLeft = '0';

  var createImg = function () {
    var newElement = document.createElement('li');

    var newElementImg = document.createElement('img');
    newElementImg.src = nearByAds[i].offer.photos[j];
    newElementImg.width = '60';
    newElementImg.height = '60';
    newElementImg.style.paddingRight = '3px';

    newElement.appendChild(newElementImg);
    return newElement;
  };

  for (j = 0; j < 3; j++) {
    fragment.appendChild(createImg());
  }
  ulPictures.appendChild(fragment);

  newPosts.querySelector('.popup__avatar').src = nearByAds[i].author.avatar;

  return newPosts;
};
for (i = 0; i < 1; i++) {
  fragment.appendChild(renderPosts());
}
var foo = document.querySelector('.map');
foo.appendChild(fragment);
