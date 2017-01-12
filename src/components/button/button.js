import './button.styl';
import $ from 'jquery';

class Button {
  constructor($component) {
    this.$component = $component;
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$component
      .on('click', (event) => this._showRippleEffect(event))
      .on('mousedown', () => this.$component.addClass('button_pressed'))
      .on('mouseup', () => this.$component.removeClass('button_pressed'))
      .on('mouseout', () => this.$component.removeClass('button_pressed'));
  }

  _showRippleEffect(event) {
    const $div = $('<div/>');
    const btnOffset = this.$component.offset();
    const xPos = event.pageX - btnOffset.left;
    const yPos = event.pageY - btnOffset.top;

    $div.addClass('button__ripple-effect');
    $div.css({
      top: yPos,
      left: xPos
    });
    $div.appendTo(this.$component);

    window.setTimeout(function () {
      $div.remove();
    }, 1000);
  }
}

export default function renderComponent() {
  $(() => {
    $('.js-button').each((index, node) => {
      new Button($(node));
    });
  });
}

renderComponent();