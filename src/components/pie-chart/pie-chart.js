import './pie-chart.styl';
import $ from 'jquery';

if (!$.fn.peity) {
  require('peity/jquery.peity');
}

class PieChart {
  constructor($component) {
    this.$component = $component;
    this.render();
  }

  render() {
    $('.js-pie-chart__items', this.$component).peity('donut', {
      fill: ['#747474', '#e75735', '#4eb7a8', '#e5e5e5'],
      radius: 47.5,
      innerRadius: 30.5
    });
  }
};

$(() => {
  $('.js-pie-chart').each((index, node) => {
    new PieChart($(node));
  });
});