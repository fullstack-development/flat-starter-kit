import './messager.styl';
import $ from 'jquery';

const Messager = class {
  constructor($messager) {
    this.$messager = $messager;
    this._hideScroll();
    this._attachEventHandlers();
  }

  _hideScroll() {
    const $scroller = $('.js-messager__chat-scroller', this.$messager);
    const $chat = $('.js-messager__chat', this.$messager);
    const scrollWidth = $scroller.width() - $chat.width();

    $scroller.css('margin-right', -scrollWidth + 'px');
  }

  _attachEventHandlers() {
    $('.js-messager__btn-submit', this.$messager).on('click', () => {
      const $chat = $('.js-messager__chat', this.$messager);
      const $input = $('.js-messager__input', this.$messager);
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