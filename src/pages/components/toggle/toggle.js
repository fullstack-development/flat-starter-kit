import './toggle.styl';
import $ from 'jquery';

$(function () {
  $('.js-toggle').on('click', function (event) {
    if ($(this).hasClass('toggle_on'))
      $(this).removeClass('toggle_on');
    else
      $(this).addClass('toggle_on')
  })
});