'use strict';
(function () {
  var WIDTH_MAP = 1200;
  var HEIDHT_MAP = 750;
  var docElem = document.querySelector('.map__pin--main');
  var mapLocat = docElem.getBoundingClientRect();
  var nearByAds = [];
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var fragments = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    nearByAds.push(window.data());
    fragments.appendChild(window.pin(nearByAds[i]));
  }
  mapPins.appendChild(fragments);

  var fieldsets = document.querySelectorAll('fieldset');

  var noticeForm = document.querySelector('.notice__form');

  var locationOfAnElement = function (docElement) {
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
    fragment.appendChild(window.card(nearByAds[i]));
    foo.appendChild(fragment);
    var mapPin = document.querySelectorAll('.map__pin');
    for (i = 0; i < mapPin.length; i++) {
      mapPin[i].style.display = '';
    }
    document.querySelector('#address').disabled = 'true';
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

      if (docElem.offsetTop - shift.y > HEIDHT_MAP - mapLocat.height) {
        docElem.style.top = HEIDHT_MAP - mapLocat.height + 'px';
      } else if (docElem.offsetTop - shift.y < 160 - mapLocat.height / 2) {
        docElem.style.top = 160 - mapLocat.height / 2 + 'px';
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

      document.querySelector('#address').value = locationOfAnElement(docElem);
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
    for (i = 0; i < mapPin.length - 1; i++) {
      var sp2 = document.querySelector('.map__card');
      if (activeElement.style === mapPin[i + 1].style || activeElement.src === imgPin[i + 1].src) {
        if (sp2 !== null) {
          var sp1 = foo.appendChild(window.card(nearByAds[i]));
          foo.replaceChild(sp1, sp2);
        } else {
          foo.appendChild(window.card(nearByAds[i]));
        }
      } else if (activeElement.style === mapPin[0].style || activeElement.src === imgPin[0].src) {
        if (sp2 !== null) {
          foo.removeChild(foo.querySelector('.map__card'));
        }
      }
    }
  }
  );
})();
