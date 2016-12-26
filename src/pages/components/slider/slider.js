import './slider.styl';
import $ from 'jquery';

$(function() {

    $('.js-slider').each(function () {

        let $handleTooltip = $('.js-slider__handle-tooltip', $(this));
        let $sliderScale = $('.js-slider__scale', $(this));
        let sliderColor = $(this).data('slider-color');

        $('.js-slider__widget', $(this)).slider({
            range: $sliderScale.length ? 'min' : false,

            create: $handleTooltip.length ? function () {
                $handleTooltip.text($(this).slider('value'));
            } : function () {},

            slide: $handleTooltip.length ? function (event, ui) {
                $handleTooltip.text(ui.value);
            } : function () {}
        });

        $('.ui-slider-range', $(this)).css('background-color', sliderColor);
        let $handle = $('.js-slider__handle', $(this));
        $handle.css('background-color', sliderColor);

        if($handleTooltip.length) {
            $handle.on('mousedown', function (event) {
                $handleTooltip.addClass('slider__handle-tooltip_active')
            });
            $(this).on('mousedown', function (event) {
                $handleTooltip.addClass('slider__handle-tooltip_active')
            });
            $('body').on('mouseup', function (event) {
                $handleTooltip.removeClass('slider__handle-tooltip_active')
            });
        }
    });
});