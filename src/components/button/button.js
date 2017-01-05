import './button.styl';
import $ from 'jquery';

const Button = class {
  constructor($button) {
    this.$button = $button;
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$button
      .on('click', (event) => this._showRippleEffect(event))
      .on('mousedown', () => this.$button.addClass('button_pressed'))
      .on('mouseup', () => this.$button.removeClass('button_pressed'))
      .on('mouseout', () => this.$button.removeClass('button_pressed'));
  }

  _showRippleEffect(event) {
    event.preventDefault();

    const $div = $('<div/>');
    const btnOffset = this.$button.offset();
    const xPos = event.pageX - btnOffset.left;
    const yPos = event.pageY - btnOffset.top;

    $div.addClass('button__ripple-effect');
    $div.css({
      top: yPos,
      left: xPos
    });
    $div.appendTo(this.$button);

    window.setTimeout(function () {
      $div.remove();
    }, 1000);
  }
};

$(() => {
  $('.js-button').each((index, node) => {
    new Button($(node));
  });
});