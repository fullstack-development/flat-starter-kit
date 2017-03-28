import './signin.scss';
import $ from 'jquery';

class Signin {
  constructor($component) {
    this.$component = $component;
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$component.on('submit', (event) => {
      event.preventDefault();
      document.location.replace('/demo.html');
    });
  }
}

export default function renderComponent() {
  $(() => {
    $('.js-signin').each((index, node) => {
      new Signin($(node));
    });
  });
}

renderComponent();