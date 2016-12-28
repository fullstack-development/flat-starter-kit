import $ from 'jquery';

function importJqueryUI () {
  if (!$('<div></div>').slider) {
    require('./jquery-ui');
    require('./jquery-ui.css');
  }
}

function importJqueryPeity () {
  if (!$('<div></div>').peity) {
    require('./jquery.peity');
  }
}

export {
  importJqueryUI,
  importJqueryPeity,
}