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

  var newMass = [];

  window.filter = function (nearByAds, mapPin2) {
    for (var i = 0; i < mapPin2.length; i++) {
      newMass[i] = mapPin2[i].cloneNode(true);
    }

    if (housingType.value !== 'any') {
      for (i = 0; i < mapPin2.length - 1; i++) {
        if (housingType.value !== nearByAds[i].offer.type) {
          newMass[i + 1] = '';
        }

      }
    }

    if (housingPrice.value !== 'any') {
      for (i = 0; i < mapPin2.length - 1; i++) {
        newMass[i + 1] = '';
        if (housingPrice.value === 'middle' && nearByAds[i].offer.price >= 10000 && nearByAds[i].offer.price <= 50000) {
          newMass[i + 1] = 'true';
        } else if (housingPrice.value === 'low' && nearByAds[i].offer.price < 10000) {
          newMass[i + 1] = 'true';
        } else if (housingPrice.value === 'high' && nearByAds[i].offer.price > 50000) {
          newMass[i + 1] = 'true';
        }
      }
    }

    if (housingRooms.value !== 'any') {
      for (i = 0; i < mapPin2.length - 1; i++) {
        if (housingRooms.value + '' !== nearByAds[i].offer.rooms + '') {
          newMass[i + 1] = '';
        }
      }
    }

    if (housingGuests.value !== 'any') {
      for (i = 0; i < mapPin2.length - 1; i++) {
        if (housingGuests.value + '' !== nearByAds[i].offer.guests + '') {
          newMass[i + 1] = '';
        }
      }
    }

    var filter = function (filterses) {
      if (filterses.checked === true) {
        for (i = 0; i < mapPin2.length - 1; i++) {
          if (nearByAds[i].offer.features.length !== 0 && newMass[i + 1] !== '') {
            for (var k = 0; k < nearByAds[i].offer.features.length; k++) {
              if (nearByAds[i].offer.features[k] === filterses.value) {
                k = nearByAds[i].offer.features.length;
                newMass[i + 1] = 'true';
              } else {
                newMass[i + 1] = '';
              }
            }
          } else {
            newMass[i + 1] = '';
          }
        }
      }
    };

    filter(filterWifi);
    filter(filterDishwasher);
    filter(filterParking);
    filter(filterWasher);
    filter(filterElevator);
    filter(filterConditioner);

    var j = 0;

    for (i = 0; i < mapPin2.length - 1; i++) {
      if (newMass[i + 1] !== '') {
        j++;
        if (j <= 5) {
          mapPin2[i + 1].style.display = '';
        } else {
          mapPin2[i + 1].style.display = 'none';
        }
      } else {
        mapPin2[i + 1].style.display = 'none';
      }
    }
  };
})();
