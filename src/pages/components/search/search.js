import './search.styl';
import $ from 'jquery';

$(function () {

    function search(text) {
        //ищем text и возвращаем результат
    }

    $('.js-search').each(function () {

        let $search = $(this);
        let $text = $('.js-search__text', $search);

        $('.js-search__submit', $search).on('click', function (event) {
            event.preventDefault();

            if ($text.val() == '') return;

            let result = search($text.val());
            if (result) {
                //выводим результат
                return;
            }

            $search.addClass('search_error');
            $text.val('');
            $text.attr('placeholder', 'I\'ve not found what I\'m looking for...');
        });

        $text.on('focusin', function (event) {
            if (!$search.hasClass('search_error')) return;

            $search.removeClass('search_error');
            $text.attr('placeholder', 'Search');
        });
    });
});