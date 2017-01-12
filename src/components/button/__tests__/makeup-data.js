import pugTemplate from './index.pug';
import render from '../button';

const data = {
  name: 'button',
  type: 'module',
  snippet: render,
  items: [{
    name: 'default.button.component',
    type: 'module',
    image: require('./img/button-default.png')
  }, {
    name: 'size-small.button.component',
    type: 'module'
  }, {
    name: 'type-error.button.component',
    type: 'module'
  }]
};

function template({module: blockName}) {
  switch (blockName) {
    case 'default.button.component': {
      return pugTemplate({});
    }
    case 'size-small.button.component': {
      return pugTemplate({options: {
        size: 'small'
      }});
    }
    case 'type-error.button.component': {
      return pugTemplate({options: {
        type: 'error'
      }});
    }
  }
}

export {
  data,
  template,
}