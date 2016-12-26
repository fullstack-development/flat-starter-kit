import './percentage.styl';
import $ from 'jquery';

$(function() {

    $('.js-percentage__active-border').each(function() {
        var perc = + $(this).data('percent');
        if (isNaN(perc)) return;
        if (perc < 0) perc = 0;
        if (perc > 100) perc = 100;

        var $activeBorder = $(this),
            i = 0,
            timeTick = 1500 / perc;

        var timer = setTimeout( function changePerc() {
            $('.percentage__percent', $activeBorder).html(i);
            if (i * 3.6 <= 180)
                $activeBorder.css('background-image', 'linear-gradient(' + (90 + i * 3.6) + 'deg, transparent 50%, #fff 50%), linear-gradient(90deg, #fff 50%, transparent 50%)');
            else
                $activeBorder.css('background-image', 'linear-gradient(' + (i * 3.6 - 90) + 'deg, transparent 50%, #e75735 50%), linear-gradient(90deg, #fff 50%, transparent 50%)');
            if(++i <= perc)
                timer = setTimeout(changePerc, timeTick);
        }, timeTick)
    })
});