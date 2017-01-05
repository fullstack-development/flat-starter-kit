import './stages.styl';
import $ from 'jquery';

class Stages {
  constructor($component) {
    this.$component = $component;
    this.render();
  }

  render() {
    let progress = this.$component.data('progress');
    let itemsLength = $('.js-stages__item', this.$component).length;

    $('.js-stages__progress', this.$component)
      .css('width', (100 * (progress - 1) / (itemsLength - 1)) + '%');
  }
};

$(() => {
  $('.js-stages').each((index, node) => {
    new Stages($(node));
  });
});