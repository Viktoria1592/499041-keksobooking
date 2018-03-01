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

  function housingTypeFilter(element) {
    if (housingType.value === 'any') {
      return true;
    }
    if (housingType.value === element.offer.type) {
      return true;
    }
    return false;
  }
  function housingPriceFilter(element) {
    if (housingPrice.value === 'any') {
      return true;
    }
    if (housingPrice.value === 'middle' && element.offer.price >= 10000 && element.offer.price <= 50000) {
      return true;
    }
    if (housingPrice.value === 'low' && element.offer.price < 10000) {
      return true;
    }
    if (housingPrice.value === 'high' && element.offer.price > 50000) {
      return true;
    }
    return false;
  }
  function housingRoomsFilter(element) {
    if (housingRooms.value === 'any') {
      return true;
    }
    if (housingRooms.value + '' === element.offer.rooms + '') {
      return true;
    }
    return false;
  }
  function housingGuestsFilter(element) {
    if (housingGuests.value === 'any') {
      return true;
    }
    if (housingGuests.value + '' === element.offer.guests + '') {
      return true;
    }
    return false;
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
      return false;
    }
    return true;
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

  window.filter = function (nearByAds) {
    return nearByAds.filter(function(item) {
       return housingTypeFilter(item) && housingPriceFilter(item) && housingRoomsFilter(item) && 
      housingGuestsFilter(item) && filtWifi(item) && filtDish(item) && filtPark(item) && 
      filtWash(item) && filtElev(item) && filtCond(item) === true;
    });
  };
})();
