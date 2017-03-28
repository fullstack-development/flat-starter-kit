import './toggle.scss';
import $ from 'jquery';

class Toggle {
  constructor($component) {
    this.$component = $component;
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$component.on('click', () => this.$component.toggleClass('toggle_on'));
  }
};

$(() => {
  $('.js-toggle').each((index, node) => {
    new Toggle($(node));
  });
});