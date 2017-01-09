import $ from 'jquery';
import './tick-box.styl';

class TickBox {
  constructor($component) {
    this.$component = $component;
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$component.on('click', () => this.$component.toggleClass('tick-box_enable'))
  }
}

$(() => {
  $('.js-tick-box').each((index, node) => {
    new TickBox($(node));
  });
});