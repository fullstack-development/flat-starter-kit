import './stages.styl';
import $ from 'jquery';

$(function () {

    $('.js-stages').each(function () {

        let progress = $(this).data('progress');
        let itemsLength = $('.js-stages__item', $(this)).length;

        $('.js-stages__progress', $(this))
            .css('width', (100 * (progress - 1) / (itemsLength - 1)) + '%');
    })
});