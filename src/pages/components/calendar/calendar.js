import './calendar.styl';
import $ from 'jquery';

'use strict';

$(function () {

    $('.js-calendar').each(function () {

        let $day = $('.js-calendar__day', $(this));

        let $widget = $('.js-calendar__widget', $(this));
        $widget.datepicker({
            changeYear: false,
            altField: $day,
            altFormat: "dd",
            firstDay: 1
        });

        $('.calendar__btn-today', $(this)).on('click', (event) => {
            $widget.datepicker('setDate', new Date());
        })
    });
});
