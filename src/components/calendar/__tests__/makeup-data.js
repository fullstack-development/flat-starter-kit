import pugTemplate from './index.pug';
import render from '../calendar';

const data = {
  name: 'calendar',
  type: 'module',
  items: [{
    name: 'default.calendar.component',
    type: 'module',
  }]
};

function template({module: blockName}) {
  switch (blockName) {
    case 'default.calendar.component': {
      setTimeout(() => {render()}, 300);
      return pugTemplate({});
    }
  }
}

export {
  data,
  template,
}