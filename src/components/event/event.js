import './event.styl';
import $ from 'jquery';

class Event {
  constructor($component) {
    this.$component = $component;
    this.$description = $('.js-event__description', this.$component);
    this._setColumnWidth();
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    $(window).resize(() => this._setColumnWidth());
  }

  _setColumnWidth() {
    const width = this.$description.width();
    const height = this.$description.height();
    this.$description
      .css({
        '-webkit-column-width': `${width}px`,
        '-moz-column-width': `${width}px`,
        'column-width': `${width}px`,
        'height': `${height}px`,
      });
  }
}

export default function renderComponent() {
  $(() => {
    $('.js-event').each((index, node) => {
      new Event($(node));
    });
  });
}

renderComponent();