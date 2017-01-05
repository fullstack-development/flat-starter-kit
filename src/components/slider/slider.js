import './slider.styl';
import $ from 'jquery';
import {importJqueryUI} from '../../plugins/index';
importJqueryUI();

const Slider = class {
  constructor($slider) {
    this.$slider = $slider;
    this.render();
  }
  
  render() {
    let $handleTooltip = $('.js-slider__handle-tooltip', this.$slider);
    let $sliderScale = $('.js-slider__scale', this.$slider);
    let sliderColor = this.$slider.data('slider-color');

    const $widget = $('.js-slider__widget', this.$slider);
    $widget.slider({
      range: $sliderScale.length ? 'min' : false,

      create: $handleTooltip.length ? () => {
          $handleTooltip.text($widget.slider('value'));
        } : () => {},

      slide: $handleTooltip.length ? (event, ui) => {
          $handleTooltip.text(ui.value);
        } : () => {}
    });

    $('.ui-slider-range', this.$slider).css('background-color', sliderColor);
    $('.js-slider__handle', this.$slider).css('background-color', sliderColor);

    this._attachTooltipEventHandlers();
  }

  _attachTooltipEventHandlers() {
    let $handleTooltip = $('.js-slider__handle-tooltip', this.$slider);

    if ($handleTooltip.length) {
      $('.js-slider__handle', this.$slider).on('mousedown', () => {
        $handleTooltip.addClass('slider__handle-tooltip_active')
      });
      this.$slider.on('mousedown', () => {
        $handleTooltip.addClass('slider__handle-tooltip_active')
      });
      $('body').on('mouseup', () => {
        $handleTooltip.removeClass('slider__handle-tooltip_active')
      });
    }
  }
};

$(() => {
  $('.js-slider').each((index, node) => {
    new Slider($(node));
  });
});