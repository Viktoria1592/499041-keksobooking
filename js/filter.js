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

    var newMass = [];

    if (housingType.value !== 'any') {
      for ( var i = 0; i < nearByAds.length; i++) {
        if (housingType.value === nearByAds[i].offer.type) {
          newMass.push(nearByAds[i]);
        }
      }
    }

    if (housingPrice.value !== 'any') {
      for (i = newMass.length - 1; i >= 0; i++) {
        if (housingPrice.value === 'middle' && newMass[i].offer.price < 10000 || newMass[i].offer.price > 50000) {
          newMass.splice(i, 1);
        } else if (housingPrice.value === 'low' && newMass[i].offer.price >= 10000) {
          newMass.splice(i, 1);
        } else if (housingPrice.value === 'high' && newMass[i].offer.price <= 50000) {
          newMass.splice(i, 1);
        }
      }
    }

    /*if (housingRooms.value !== 'any') {
      for (i = 0; i < newMass.length; i++) {
        if (housingRooms.value + '' !== newMass[i].offer.rooms + '') {
          newMass[i + 1] = '';
        }
      }
    }

    if (housingGuests.value !== 'any') {
      for (i = 0; i < newMass.length; i++) {
        if (housingGuests.value + '' !== newMass[i].offer.guests + '') {
          newMass[i + 1] = '';
        }
      }
    }

    var filter = function (filterses) {
      if (filterses.checked === true) {
        for (i = 0; i < newMass.length; i++) {
          if (newMass[i].offer.features.length !== 0) {
            for (var k = 0; k < newMass[i].offer.features.length; k++) {
              if (newMass[i].offer.features[k] === filterses.value) {
                k = newMass[i].offer.features.length;
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
    filter(filterConditioner);*/

    for (i = 0; i < newMass.length; i++) {
      fragments.appendChild(window.pin(newMass[i]));
    }
    map.appendChild(fragments);
    var mapPin = document.querySelectorAll('.map__pin');
    for (i = 0; i < mapPin.length; i++) {
      mapPin[i].style.display = '';
    }
  };
})()


