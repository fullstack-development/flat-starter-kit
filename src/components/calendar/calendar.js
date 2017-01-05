import './calendar.styl';
import $ from 'jquery';
import {importJqueryUI} from '../../plugins/index';
importJqueryUI();

const Calendar = class {
  constructor($calendar) {
    this.$calendar = $calendar;
    this.render();
  }

  render() {
    let $day = $('.js-calendar__day', this.$calendar);
    let $widget = $('.js-calendar__widget', this.$calendar);

    $widget.datepicker({
      changeYear: false,
      altField: $day,
      altFormat: "dd",
      firstDay: 1
    });

    $('.calendar__btn-today', this.$calendar).on('click', (event) => {
      $widget.datepicker('setDate', new Date());
    });
  }
};

$(() => {
  $('.js-calendar').each((index, node) => {
    new Calendar($(node));
  });
});
