'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');
  var filterWifi = filters.querySelector('#filter-wifi');
  var filterDishwasher = filters.querySelector('#filter-dishwasher');
  var filterParking = filters.querySelector('#filter-parking');
  var filterWasher = filters.querySelector('#filter-washer');
  var filterElevator = filters.querySelector('#filter-elevator');
  var filterConditioner = filters.querySelector('#filter-conditioner');
  var map = document.querySelector('.map');
  var fragments = document.createDocumentFragment();

  window.filter = function (nearByAds) {

    function housingTypeFilter(element) {
      if (housingType.value !== 'any') {
        if (housingType.value === element.offer.type) {
          return true;
        }
      } else {
        return true;
      }
    }
    function housingPriceFilter(element) {
      if (housingPrice.value !== 'any') {
        if (housingPrice.value === 'middle' && element.offer.price >= 10000 && element.offer.price <= 50000) {
          return true;
        }
        if (housingPrice.value === 'low' && element.offer.price < 10000) {
          return true;
        }
        if (housingPrice.value === 'high' && element.offer.price > 50000) {
          return true;
        }
      } else {
        return true;
      }
    }
    function housingRoomsFilter(element) {
      if (housingRooms.value !== 'any') {
        if (housingRooms.value + '' === element.offer.rooms + '') {
          return true;
        }
      } else {
        return true;
      }
    }
    function housingGuestsFilter(element) {
      if (housingGuests.value !== 'any') {
        if (housingGuests.value + '' === element.offer.guests + '') {
          return true;
        }
      } else {
        return true;
      }
    }

    function filteres(element, filterses) {
      if (filterses.checked === true) {
        if (element.offer.features.length !== 0) {
          for (var k = 0; k < element.offer.features.length; k++) {
            if (element.offer.features[k] === filterses.value) {
              k = element.offer.features.length;
              return true;
            }
          }
        }
      } else {
        return true;
      }
    }

    function filtWifi(element) {
      return filteres(element, filterWifi);
    }
    function filtDish(element) {
      return filteres(element, filterDishwasher);
    }
    function filtPark(element) {
      return filteres(element, filterParking);
    }
    function filtWash(element) {
      return filteres(element, filterWasher);
    }
    function filtElev(element) {
      return filteres(element, filterElevator);
    }
    function filtCond(element) {
      return filteres(element, filterConditioner);
    }

    var typeMass = nearByAds.filter(housingTypeFilter);
    var pricMass = typeMass.filter(housingPriceFilter);
    var roomMass = pricMass.filter(housingRoomsFilter);
    var guestMass = roomMass.filter(housingGuestsFilter);

    var wifiMass = guestMass.filter(filtWifi);
    var dishMass = wifiMass.filter(filtDish);
    var parkMass = dishMass.filter(filtPark);
    var washMass = parkMass.filter(filtWash);
    var elevMass = washMass.filter(filtElev);
    var conditMass = elevMass.filter(filtCond);

    for (var i = 0; i < conditMass.length; i++) {
      fragments.appendChild(window.pin(conditMass[i]));
    }
    map.appendChild(fragments);
    var mapPin = document.querySelectorAll('.map__pin');
    for (i = 0; i < mapPin.length; i++) {
      if (i < 6) {
        mapPin[i].style.display = '';
      }
    }
  };
})();
