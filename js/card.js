'use strict';
(function () {
  var similarTemplate = document.querySelector('template').content.querySelector('article');
  var fragment = document.createDocumentFragment();

  window.card = function (element) {
    var newPosts = similarTemplate.cloneNode(true);
    var massP = newPosts.querySelectorAll('p');
    var elementInnerText = function (elem, str) {
      newPosts.querySelector(elem).innerText = str;
    };
    newPosts.className = 'map__card';
    elementInnerText('h3', element.offer.title);
    elementInnerText('small', element.offer.address);
    elementInnerText('.popup__price', element.offer.price.toLocaleString() + ' ₽/ночь');

    if (element.offer.type === 'flat') {
      elementInnerText('h4', 'Квартира');
    } else if (element.offer.type === 'bungalo') {
      elementInnerText('h4', 'Бунгало');
    } else {
      elementInnerText('h4', 'Дом');
    }

    var room = ' комнаты';
    if (element.offer.rooms === 1) {
      room = ' комната';
    } else if (element.offer.rooms === 5) {
      room = ' комнат';
    }
    massP[2].innerText = element.offer.rooms + room + ' для ' + element.offer.guests + ' гостей';

    massP[3].innerText = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    newPosts.querySelector('.popup__features').style.paddingLeft = '0';

    var featureAll = newPosts.querySelectorAll('ul.popup__features > li');
    for (j = 0; j < featureAll.length; j++) {
      featureAll[j].style.display = 'none';
    }
    for (var j = 0; j < element.offer.features.length; j++) {
      featureAll[j].style.display = '';
      featureAll[j].className = 'feature feature--' + element.offer.features[j];
    }

    massP[4].innerText = element.offer.description;

    var ulPictures = newPosts.querySelector('.popup__pictures');
    ulPictures.style.paddingLeft = '0';

    var createImg = function () {
      var newElement = document.createElement('li');

      var newElementImg = document.createElement('img');
      newElementImg.src = element.offer.photos[j];
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

    newPosts.querySelector('.popup__avatar').src = element.author.avatar;

    return newPosts;
  };
})();
