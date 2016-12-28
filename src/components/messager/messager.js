import './messager.styl';
import $ from 'jquery';

$(function () {

    $('.js-messager').each(function () {

        //скрываем скрол в чате
        let $scroller = $('.js-messager__chat-scroller', $(this)),
            $chat = $('.js-messager__chat', $(this)),
            scrollWidth = $scroller.width() - $chat.width();

        $scroller.css('margin-right', - scrollWidth + 'px');

        $('.js-messager__btn-submit', $(this)).on('click', (event) => {
            let $input = $('.js-messager__input', $(this)),
                message = $input.val();

            if (message == '') return;

            let $message = $('<div class="messager__message messager__message_out"><span>' + message + '</span></div>');
            $chat.append($message);

            $input.val('');
        })
    })
});