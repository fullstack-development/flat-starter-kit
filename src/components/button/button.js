import './button.styl';
import $ from 'jquery';

$(function() {

    $('.js-button')
        .on('click', function (event) {
        event.preventDefault();

        let $div = $('<div/>'),
            btnOffset = $(this).offset(),
            xPos = event.pageX - btnOffset.left,
            yPos = event.pageY - btnOffset.top;

        $div.addClass('button__ripple-effect');
        $div.css({
                top: yPos,
                left: xPos
            });
        $div.appendTo($(this));

        window.setTimeout(function(){
            $div.remove();
        }, 1000);
        })
        .on('mousedown', function (event) {
            $(this).addClass('button_pressed');
        })
        .on('mouseup', function (event) {
            $(this).removeClass('button_pressed');
        })
        .on('mouseout', function (event) {
            $(this).removeClass('button_pressed');
        })
        .on('click', function (event) {
            if ($(this).hasClass('button_inverted'))
                $(this).removeClass('button_inverted');
            else
                $(this).addClass('button_inverted');
        });
});