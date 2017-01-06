import './slider.styl';
import $ from 'jquery';

if (!$.fn.slider) {
    require('jquery-ui/ui/widgets/slider');
    require('jquery-ui/themes/base/slider.css');
}

class Slider {
  constructor($component) {
    this.$component = $component;
    this.render();
  }
  
  render() {
    let $handleTooltip = $('.js-slider__handle-tooltip', this.$component);
    let $sliderScale = $('.js-slider__scale', this.$component);
    let sliderColor = this.$component.data('slider-color');

    const $widget = $('.js-slider__widget', this.$component);
    $widget.slider({
      range: $sliderScale.length ? 'min' : false,

      create: $handleTooltip.length ? () => {
          $handleTooltip.text($widget.slider('value'));
        } : () => {},

      slide: $handleTooltip.length ? (event, ui) => {
          $handleTooltip.text(ui.value);
        } : () => {}
    });

    $('.ui-slider-range', this.$component).css('background-color', sliderColor);
    $('.js-slider__handle', this.$component).css('background-color', sliderColor);

    this._attachTooltipEventHandlers();
  }

  _attachTooltipEventHandlers() {
    let $handleTooltip = $('.js-slider__handle-tooltip', this.$component);

    if ($handleTooltip.length) {
      $('.js-slider__handle', this.$component).on('mousedown', () => {
        $handleTooltip.addClass('slider__handle-tooltip_active')
      });
      this.$component.on('mousedown', () => {
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