import './news.scss';
import $ from 'jquery';

class News {
  constructor($component) {
    this.$component = $component;
    this.$description = $('.js-news__description', this.$component);
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
    $('.js-news').each((index, node) => {
      new News($(node));
    });
  });
}

renderComponent();