'use strict';
(function () {
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


  window.data = function () {
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
  }
})();
