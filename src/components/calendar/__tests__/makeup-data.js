import pugTemplate from './index.pug';
import render from '../calendar';

const data = {
  name: 'calendar',
  snippet: render,
  items: [{
    name: 'default.calendar.component',
    type: 'module',
  }]
};

function template({module: blockName}) {
  switch (blockName) {
    case 'default.calendar.component': {
      return pugTemplate({});
    }
  }
}

export {
  data,
  template,
}