import './feedback.scss';
import $ from 'jquery';

class Feedback {
  constructor($component) {
    this.$component = $component;
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$component.on('submit', (event) => event.preventDefault());
  }
}

export default function renderComponent() {
  $(() => {
    $('.js-feedback').each((index, node) => {
      new Feedback($(node));
    });
  });
}

renderComponent();