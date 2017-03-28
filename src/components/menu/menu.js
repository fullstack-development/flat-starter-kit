import './menu.scss';
import $ from 'jquery';

class Menu {
  constructor($component) {
    this.$component = $component;
    this._attachEventHandler();
    this.$list = $('.js-menu__list', this.$component);
  }

  _attachEventHandler() {
    $('.js-menu__button', this.$component).on('click', () => this.$list.toggleClass('menu__list_open'));
  }
}

$(() => {
  $('.js-menu').each((index, node) => {
    new Menu($(node));
  });
});