import './search.styl';
import $ from 'jquery';

const Search = class {
  constructor($search) {
    this.$search = $search;
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const $text = $('.js-search__text', this.$search);

    $('.js-search__submit', this.$search).on('click', (event) => {
      event.preventDefault();

      if ($text.val() == '') return;

      const result = this._search($text.val());
      if (result) {
        //выводим результат
        return;
      }

      this.$search.addClass('search_error');
      $text.val('');
      $text.attr('placeholder', 'I\'ve not found what I\'m looking for...');
    });

    $text.on('focusin', () => {
      if (!this.$search.hasClass('search_error')) return;

      this.$search.removeClass('search_error');
      $text.attr('placeholder', 'Search');
    });
  }

  _search(text) {
    //ищем text и возвращаем результат
  }
};

$(() => {
  $('.js-search').each((index, node) => {
    new Search($(node));
  });
});