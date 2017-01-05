import './percentage.styl';
import $ from 'jquery';

class Percentage {
  constructor($component) {
    this.$component = $component;
    this.render();
  }

  render() {
    const $activeBorder = $('.js-percentage__active-border', this.$component);
    let perc = +$activeBorder.data('percent');
    if (isNaN(perc)) return;
    if (perc < 0) perc = 0;
    if (perc > 100) perc = 100;

    const timeTick = 1500 / perc;
    let i = 0;

    let timer = setTimeout( function changePerc() {
      $('.percentage__percent', $activeBorder).html(i);
      if (i * 3.6 <= 180)
        $activeBorder.css('background-image', 'linear-gradient(' + (90 + i * 3.6) + 'deg, transparent 50%, #fff 50%), linear-gradient(90deg, #fff 50%, transparent 50%)');
      else
        $activeBorder.css('background-image', 'linear-gradient(' + (i * 3.6 - 90) + 'deg, transparent 50%, #e75735 50%), linear-gradient(90deg, #fff 50%, transparent 50%)');
      if(++i <= perc)
        timer = setTimeout(changePerc, timeTick);
    }, timeTick);
  }
};

$(() => {
  $('.js-percentage').each((index, node) => {
    new Percentage($(node));
  });
});