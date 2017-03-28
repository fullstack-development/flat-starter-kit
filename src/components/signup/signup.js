import './signup.scss';
import $ from 'jquery';

class Signup {
  constructor($component) {
    this.$component = $component;
    this.$password = $('[name=password]', this.$component);
    this.$confirm = $('[name=confirm]', this.$component);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$component.on('submit', (event) => {
      event.preventDefault();
      document.location.replace('/profile.html');
    });
    this.$password.on('blur', () => {
      this.$confirm[0].setCustomValidity('Confirm Password don\'t equal Password');
      this._validateConfirm();
    });
    this.$confirm.on('input', () => {
      this.$confirm[0].setCustomValidity('Confirm Password don\'t equal Password');
      this._validateConfirm();
    });

  }

  _validateConfirm() {
    if (this.$password[0].value === this.$confirm[0].value)
      this.$confirm[0].setCustomValidity('');
  }
}

export default function renderComponent() {
  $(() => {
    $('.js-signup').each((index, node) => {
      new Signup($(node));
    });
  });
}

renderComponent();