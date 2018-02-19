'use strict';

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

var AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var titlesCopy = TITLES.slice();
var typesCopy = TYPES.slice();
var checkinsCopy = CHECKINS.slice();
var featuresCopy = FEATURES.slice();
var photosCopy = PHOTOS.slice();
var avatarsCopy = AVATARS.slice();

var randomAvatar = function (mass) {
  var randomNumber = Math.round((mass.length - 1) * Math.random());
  var element = mass[randomNumber];
  mass.splice(randomNumber, 1);

  return element;
};

var randomElement = function (mass) {
  var randomNumber = Math.round((mass.length - 1) * Math.random());
  return mass[randomNumber];
};

var randomMass = function () {
  var photoCopy = PHOTOS.slice();
  var len = photoCopy.length;
  var newMass = [];
  for (var i = 0; i < len; i++) {
    var randomsNumber = Math.round((photoCopy.length - 1) * Math.random());
    var element = photoCopy[randomsNumber];
    photoCopy.splice(randomsNumber, 1);
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
      avatar: randomAvatar(avatarsCopy)
    },

    offer: {
      title: randomElement(titlesCopy),
      address: (locatX + PIN_WIDTH / 2) + ', ' + (locatY + PIN_HEIGHT),
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
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var createNewElement = function () {
  var newElement = document.createElement('button');
  newElement.style = 'left: ' + (nearByAds[i].locat.x + PIN_WIDTH / 2) + 'px; top: ' + (nearByAds[i].locat.y + PIN_HEIGHT) + 'px;';
  newElement.className = 'map__pin';
  newElement.style.display = 'none';

  var newImg = document.createElement('img');
  newImg.src = nearByAds[i].author.avatar;
  newImg.width = '40';
  newImg.height = '40';
  newImg.setAttribute('draggable', 'false');

  newElement.appendChild(newImg);
  return newElement;
};

var fragments = document.createDocumentFragment();

for (var i = 0; i < 8; i++) {
  nearByAds.push(generateAdData());
  fragments.appendChild(createNewElement());
}
mapPins.appendChild(fragments);

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

var fieldsets = document.querySelectorAll('fieldset');

for (i = 0; i < fieldsets.length; i++) {
  fieldsets[i].setAttribute('disabled', true);
}

var noticeForm = document.querySelector('.notice__form');

var docElem = document.querySelector('.map__pin--main');

var locationOfAnElement = function (docElement) {
  var mapLocat = docElement.getBoundingClientRect();
  var body = document.body;
  var scrollTop = window.pageYOffset || docElement.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docElement.scrollLeft || body.scrollLeft;
  var mapLocateX = mapLocat.x + scrollLeft + mapLocat.width / 2;
  var mapLocateY = mapLocat.y + scrollTop + mapLocat.height;
  return (Math.round(mapLocateX) + ', ' + Math.round(mapLocateY));
};

var foo = document.querySelector('.map');

document.querySelector('#address').value = locationOfAnElement(docElem);

var enableFieldsets = function (mass) {
  for (i = 0; i < mass.length; i++) {
    mass[i].removeAttribute('disabled');
  }
};

docElem.addEventListener('mouseup', function () {
  foo.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  enableFieldsets(fieldsets);
  foo.appendChild(fragments);
  i = 0;
  fragment.appendChild(renderPosts());
  foo.appendChild(fragment);
  var mapPin = document.querySelectorAll('.map__pin');
  for (i = 0; i < mapPin.length; i++) {
    mapPin[i].style.display = '';
  }
  document.querySelector('#address').disabled = 'disabled';
}
);

mapPins.addEventListener('click', function (evt) {
  var activeElement = evt.target;
  var mapPin = document.querySelectorAll('.map__pin');
  var imgPin = mapPins.querySelectorAll('img');
  for (i = 0; i < mapPin.length - 1; i++) {
    var sp2 = document.querySelector('.map__card');
    if (activeElement.style === mapPin[i + 1].style || activeElement.src === imgPin[i + 1].src) {
      if (sp2 !== null) {
        var sp1 = foo.appendChild(renderPosts());
        foo.replaceChild(sp1, sp2);
      } else {
        foo.appendChild(renderPosts());
      }
    } else if (activeElement.style === mapPin[0].style || activeElement.src === imgPin[0].src) {
      if (sp2 !== null) {
        foo.removeChild(foo.querySelector('.map__card'));
      }
    }
  }
}
);

var typeHoume = document.querySelector('#type');
var priceHoume = document.querySelector('#price');

typeHoume.addEventListener('mouseup', function () {
  if (typeHoume.value === 'bungalo') {
    priceHoume.min = '0';
  } else if (typeHoume.value === 'flat') {
    priceHoume.min = '1000';
  } else if (typeHoume.value === 'house') {
    priceHoume.min = '5000';
  } else {
    priceHoume.min = '10000';
  }
}
);

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

timeIn.addEventListener('mouseup', function () {
  if (timeIn.value === '12:00') {
    timeOut.value = '12:00';
  } else if (timeIn.value === '13:00') {
    timeOut.value = '13:00';
  } else {
    timeOut.value = '14:00';
  }
}
);

var roomNumber = document.querySelector('#room_number');
var option = document.querySelector('#capacity').querySelectorAll('option');
var capacity = document.querySelector('#capacity');

roomNumber.addEventListener('mouseup', function () {
  if (roomNumber.value === '1') {
    capacity.value = '1';
    option[0].disabled = 'disabled';
    option[1].disabled = 'disabled';
    option[2].disabled = '';
    option[3].disabled = 'disabled';
  } else if (roomNumber.value === '2') {
    capacity.value = '2';
    option[0].disabled = 'disabled';
    option[1].disabled = '';
    option[2].disabled = '';
    option[3].disabled = 'disabled';
  } else if (roomNumber.value === '3') {
    capacity.value = '3';
    option[0].disabled = '';
    option[1].disabled = '';
    option[2].disabled = '';
    option[3].disabled = 'disabled';
  } else {
    capacity.value = '0';
    option[0].disabled = 'disabled';
    option[1].disabled = 'disabled';
    option[2].disabled = 'disabled';
    option[3].disabled = '';
  }
}
);
