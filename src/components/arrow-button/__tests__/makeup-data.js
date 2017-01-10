import pug from 'pug'

const data = {
  label: 'arrow-button',
  items: [{
    name: 'default',
  }, {
    name: 'condition-inactive',
  }, {
    name: 'condition-disabled',
  }]
};

const pugTemplate = pug.compileFile('index.pug');

function template(blockName) {
  switch (blockName) {
    case 'default': {
      return pugTemplate({});
    }
    case 'condition-inactive': {
      return pugTemplate({options: {
        condition: 'inactive'
      }});
    }
    case 'condition-disabled': {
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