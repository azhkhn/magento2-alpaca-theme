define(['noUiSlider'], function rangeSlider(noUiSlider) {
  'use strict';

  function init() {
    const rangeFilters = [...document.querySelectorAll('.range-filter')];
    rangeFilters.forEach(rangeFilter => {
      createRangeSlider(rangeFilter);
    });
  }

  function createRangeSlider(rangeFilter) {
    const inputMax = rangeFilter.querySelector('.range-filter__field--upper'),
          inputMin = rangeFilter.querySelector('.range-filter__field--lower'),
          rangeSlider = rangeFilter.querySelector('.range-filter__slider');

    rangeSlider.classList.add('noUi-extended');
    initNoUiSlider(rangeSlider, inputMin, inputMax);
    bindEvents(rangeSlider, inputMin, inputMax);
  }

  function initNoUiSlider(rangeSlider, inputMin, inputMax) {
    let minValue = parseInt(rangeSlider.getAttribute('data-min')),
        maxValue = parseInt(rangeSlider.getAttribute('data-max')),
        minCurrent = inputMin.value,
        maxCurrent = inputMax.value;

    noUiSlider.create(rangeSlider, {
      start: [minCurrent,maxCurrent],
      connect: true,
      step: 1,
      range: {
        'min': minValue,
        'max': maxValue
      }
    });
  }

  function bindEvents(rangeSlider, inputMin, inputMax) {
    const showFloat = parseInt(rangeSlider.getAttribute('data-show-float'));

    rangeSlider.noUiSlider.on('update', (values) => {
      if (showFloat) {
        inputMin.value = values[0];
        inputMax.value = values[1];
      }
      else {
        inputMin.value = parseInt(values[0]);
        inputMax.value = parseInt(values[1]);
      }
    });

    inputMax.addEventListener('change', (event) => {
      rangeSlider.noUiSlider.set([null, event.target.value]);
    });

    inputMin.addEventListener('change', (event) => {
      rangeSlider.noUiSlider.set([event.target.value, null]);
    });
  }

  init();

});
