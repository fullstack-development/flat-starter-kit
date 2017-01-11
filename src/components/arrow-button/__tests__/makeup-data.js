const pugTemplate = require('./index.pug');

const data = {
  name: 'arrow-button',
  type: 'module',
  items: [{
    name: 'default.arrow-button.component',
    type: 'module'
  }, {
    name: 'condition-inactive.arrow-button.component',
    type: 'module'
  }, {
    name: 'condition-disabled.arrow-button.component',
    type: 'module'
  }]
};

function template({module: blockName}) {
  switch (blockName) {
    case 'default.arrow-button.component': {
      return pugTemplate({});
    }
    case 'condition-inactive.arrow-button.component': {
      return pugTemplate({options: {
        condition: 'inactive'
      }});
    }
    case 'condition-disabled.arrow-button.component': {
      return pugTemplate({options: {
        condition: 'disabled'
      }});
    }
  }
}

export {
  data,
  template,
}