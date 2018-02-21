'use strict';
(function () {
  var fieldsets = document.querySelectorAll('fieldset');

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', true);
  }

  var typeHoume = document.querySelector('#type');
  var priceHoume = document.querySelector('#price');

  typeHoume.addEventListener('change', function () {
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

  timeIn.addEventListener('change', function () {
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

  roomNumber.addEventListener('change', function () {
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
})();
