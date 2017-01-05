import './stages.styl';
import $ from 'jquery';

const Stages = class {
  constructor($stages) {
    this.$stages = $stages;
    this.render();
  }

  render() {
    let progress = this.$stages.data('progress');
    let itemsLength = $('.js-stages__item', this.$stages).length;

    $('.js-stages__progress', this.$stages)
      .css('width', (100 * (progress - 1) / (itemsLength - 1)) + '%');
  }
};

$(() => {
  $('.js-stages').each((index, node) => {
    new Stages($(node));
  });
});