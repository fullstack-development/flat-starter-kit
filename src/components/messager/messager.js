import './messager.styl';
import $ from 'jquery';

class Messager {
  constructor($component) {
    this.$component = $component;
    this._hideScroll();
    this._attachEventHandlers();
  }

  _hideScroll() {
    const $scroller = $('.js-messager__chat-scroller', this.$component);
    const $chat = $('.js-messager__chat', this.$component);
    const scrollWidth = $scroller.width() - $chat.width();

    $scroller.css('margin-right', -scrollWidth + 'px');
  }

  _attachEventHandlers() {
    $('.js-messager__btn-submit', this.$component).on('click', () => {
      const $chat = $('.js-messager__chat', this.$component);
      const $input = $('.js-messager__input', this.$component);
      const message = $input.val();

      if (message == '') return;

      let $message = $(`<div class="messager__message messager__message_out"><span>${message}</span></div>`);
      $chat.append($message);

      $input.val('');
    });
  }
};


$(() => {
  $('.js-messager').each((index, node) => {
    new Messager($(node));
  });
});