import './messenger.scss';
import $ from 'jquery';
import pugTemplate from './template.pug';

class Messenger {
  constructor($component) {
    this.$component = $component;
    this._hideScroll();
    this._attachEventHandlers();
  }

  static template(options) {
    return pugTemplate({options});
  }

  _hideScroll() {
    const $scroller = $('.js-messenger__chat-scroller', this.$component);
    const $chat = $('.js-messenger__chat', this.$component);
    const scrollWidth = $scroller.width() - $chat.width();

    $scroller.css('margin-right', -scrollWidth + 'px');
  }

  _attachEventHandlers() {
    $('.js-messenger__btn-submit', this.$component).on('click', () => {
      const $chat = $('.js-messenger__chat', this.$component);
      const $input = $('.js-messenger__input', this.$component);
      let message = $input.val();

      if (message == '') return;

      let $message = $(`<div class="messenger__message messenger__message_out">${message}</div>`);
      $chat.append($message);

      $input.val('');
    });
  }
}


$(() => {
  $('.js-messenger').each((index, node) => {
    new Messenger($(node));
  });
});

export default Messenger;