import './search.scss';
import $ from 'jquery';

class Search {
  constructor($component) {
    this.$component = $component;
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const $text = $('.js-search__text', this.$component);

    $('.js-search__submit', this.$component).on('click', (event) => {
      event.preventDefault();

      if ($text.val() == '') return;

      const result = this._search($text.val());
      if (result) {
        //output results
        return;
      }

      this.$component.addClass('search_error');
      $text.val('');
      $text.attr('placeholder', 'I\'ve not found what I\'m looking for...');
    });

    $text.on('focusin', () => {
      if (!this.$component.hasClass('search_error')) return;

      this.$component.removeClass('search_error');
      $text.attr('placeholder', 'Search');
    });
  }

  _search(text) {
    //find text and return results
  }
};

$(() => {
  $('.js-search').each((index, node) => {
    new Search($(node));
  });
});