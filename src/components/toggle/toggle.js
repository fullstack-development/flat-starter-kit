import './toggle.styl';
import $ from 'jquery';

const Toggle = class {
  constructor($toggle) {
    this.$toggle = $toggle;
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$toggle.on('click', () => this.$toggle.toggleClass('toggle_on'));
  }
};

$(() => {
  $('.js-toggle').each((index, node) => {
    new Toggle($(node));
  });
});