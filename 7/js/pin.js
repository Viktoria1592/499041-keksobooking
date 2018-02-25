'use strict';
(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  window.pin = function (element) {
    var newElement = document.createElement('button');
    newElement.style = 'left: ' + (element.location.x + PIN_WIDTH / 2) + 'px; top: ' + (element.location.y + PIN_HEIGHT) + 'px;';
    newElement.className = 'map__pin';
    newElement.style.display = 'none';

    var newImg = document.createElement('img');
    newImg.src = element.author.avatar;
    newImg.width = '40';
    newImg.height = '40';
    newImg.setAttribute('draggable', 'false');

    newElement.appendChild(newImg);
    return newElement;
  };
})();
