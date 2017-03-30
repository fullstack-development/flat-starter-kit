import './messages.scss';
import Messenger from '../../components/messenger/messenger';
import data from './data.json';
import $ from 'jquery';

class Messages {
  constructor($page) {
    this.$page = $page;
    this.$messenger = this.$page.find('.js-p-messages__messenger');
    this.$activContact = this.$page.find('.js-p-messages__contact-item:first-child');
    this._renderItemMessenger(this.$activContact);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$page.find('.js-p-messages__contact-item').each((index, node) => {
      $(node).on('click', () => this._renderItemMessenger($(node)));
    });
  }

  _renderItemMessenger($contactItem) {
    const login = $contactItem.data('login');
    const messages = data.messages.find(item => item.login === login) || {};
    const user = data.users.find(item => item.login === login);
    const html = Messenger.template({user, messages: messages.messages || []});
    this.$messenger.html(html);
    new Messenger(this.$messenger.children()[0]);
    this._updateActiveContact($contactItem);
  }

  _updateActiveContact($contactItem) {
    this.$activContact.removeClass('p-messages__contact-item_active');
    $contactItem.addClass('p-messages__contact-item_active');
    this.$activContact = $contactItem;
  }
}

$(() => {
  $('.js-p-messages').each((index, node) => {
    new Messages($(node));
  });
});