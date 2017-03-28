import './drop-down.scss';

if (!$.fn.selectmenu) {
  require('jquery-ui/ui/widgets/selectmenu');
  require('jquery-ui/themes/base/selectmenu.css');
}

class DropDown {
  constructor($component) {
    this.$component = $component;
    this.render();
  }

  render() {
    $('.js-drop-down__select-box', this.$component).selectmenu();
  }
}

$(() => {
  $('.drop-down').each((index, node) => {
    new DropDown($(node));
  });
});