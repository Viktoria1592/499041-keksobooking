'use strict';
(function () {

  var onLoad = function (mass) {
    for (var i = 0; i < 8; i++) {
      nearByAds[i] = mass[i];
      fragments.appendChild(window.pin(nearByAds[i]));
    }
    mapPins.appendChild(fragments);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 17em 28em; text-align: center; ' +
      'background-color: red; position: absolute; padding-top: 70px;' +
      'width: 300px; height: 100px; border: 2px solid white';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var nearByAds = [];
  window.load(onLoad, onError);

  var WIDTH_MAP = 1200;
  var HEIDHT_MAP = 500;
  var docElem = document.querySelector('.map__pin--main');
  var mapLocat = docElem.getBoundingClientRect();
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var fragments = document.createDocumentFragment();
  var fieldsets = document.querySelectorAll('fieldset');
  var noticeForm = document.querySelector('.notice__form');

  var locationOfAnElement = function (docElement) {
    var body = document.body;
    var mapLocats = map.getClientRects();
    var mapLocation = docElem.getBoundingClientRect();
    var scrollTop = window.pageYOffset || docElement.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElement.scrollLeft || body.scrollLeft;
    for (var i = 0; i < mapLocats.length; i++) {
      var mapLocateX = mapLocation.x + scrollLeft + mapLocation.width / 2 - mapLocats[i].x;
      var mapLocateY = mapLocation.y + scrollTop + mapLocation.height;
    }

    return Math.round(mapLocateX) + ', ' + Math.round(mapLocateY);
  };

  var locationCoordinatesPin = function (docElement) {
    var body = document.body;
    var mapLocats = map.getClientRects();
    var mapLocation = docElem.getBoundingClientRect();
    var scrollTop = window.pageYOffset || docElement.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElement.scrollLeft || body.scrollLeft;
    var i = 0;
    return ('left: ' + (mapLocation.x + scrollLeft + mapLocation.width / 2 - mapLocats[i].x) + 'px; top: ' + (mapLocation.y + scrollTop + mapLocation.height) + 'px;');
  };

  var initialCoordinatesPin = locationOfAnElement(docElem);
  var initialCoordinates = locationCoordinatesPin(docElem);

  document.querySelector('#address').value = locationOfAnElement(docElem);

  var enableFieldsets = function (mass) {
    for (var i = 0; i < mass.length; i++) {
      mass[i].removeAttribute('disabled');
    }
  };

  docElem.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    enableFieldsets(fieldsets);
    map.appendChild(fragments);
    var mapPin = document.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPin.length; i++) {
      mapPin[i].style.display = '';
    }
    document.querySelector('#address').setAttribute('readonly', true);
  }
  );

  docElem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (docElem.offsetTop - shift.y > HEIDHT_MAP - mapLocat.height / 2) {
        docElem.style.top = HEIDHT_MAP - mapLocat.height / 2 + 'px';
      } else if (docElem.offsetTop - shift.y < 150 - mapLocat.height / 2) {
        docElem.style.top = 150 - mapLocat.height / 2 + 'px';
      } else {
        docElem.style.top = (docElem.offsetTop - shift.y) + 'px';
      }

      if (docElem.offsetLeft - shift.x > WIDTH_MAP) {
        docElem.style.left = (WIDTH_MAP) + 'px';
      } else if (docElem.offsetLeft - shift.x < 0) {
        docElem.style.left = 0 + 'px';
      } else {
        docElem.style.left = (docElem.offsetLeft - shift.x) + 'px';
      }
      noticeForm.querySelector('#address').value = locationOfAnElement(docElem);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPins.addEventListener('click', function (evt) {
    var activeElement = evt.target;
    var mapPin = document.querySelectorAll('.map__pin');
    var imgPin = mapPins.querySelectorAll('img');
    for (var i = 0; i < mapPin.length - 1; i++) {
      var sp2 = document.querySelector('.map__card');
      if (activeElement.style === mapPin[i + 1].style || activeElement.src === imgPin[i + 1].src) {
        if (sp2 !== null) {
          var sp1 = map.appendChild(window.card(nearByAds[i]));
          map.replaceChild(sp1, sp2);
        } else {
          map.appendChild(window.card(nearByAds[i]));
        }
      } else if (activeElement.style === mapPin[0].style || activeElement.src === imgPin[0].src) {
        if (sp2 !== null) {
          map.removeChild(map.querySelector('.map__card'));
        }
      }
    }
  }
  );

  noticeForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(noticeForm), function () {
      noticeForm.reset();
      map.classList.add('map--faded');
      noticeForm.classList.add('notice__form--disabled');
      var mapPin = document.querySelectorAll('.map__pin');
      for (var i = 1; i < mapPin.length; i++) {
        mapPin[i].style.display = 'none';
      }
      var sp2 = document.querySelector('.map__card');
      if (sp2 !== null) {
        map.removeChild(map.querySelector('.map__card'));
      }
      for (i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = true;
      }
      mapLocat.style = initialCoordinates;
      document.querySelector('#address').value = initialCoordinatesPin;
    }, onError);
    evt.preventDefault();
  });
})();
