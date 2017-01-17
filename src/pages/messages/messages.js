import './messages.styl';
import Messager from '../../components/messager/messager';
import data from './data.json';
import $ from 'jquery';

class Messages {
  constructor($page) {
    this.$page = $page;
    this.$messager = this.$page.find('.js-p-messages__messager');
    this.$activContact = this.$page.find('.js-p-messages__contact-item:first-child');
    this._renderItemMessager(this.$activContact);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$page.find('.js-p-messages__contact-item').each((index, node) => {
      $(node).on('click', () => this._renderItemMessager($(node)));
    });
  }

  _renderItemMessager($contactItem) {
    const login = $contactItem.data('login');
    const messages = data.messages.find(item => item.login === login) || {};
    const user = data.users.find(item => item.login === login);
    const html = Messager.template({user, messages: messages.messages || []});
    this.$messager.html(html);
    new Messager(this.$messager.children()[0]);
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