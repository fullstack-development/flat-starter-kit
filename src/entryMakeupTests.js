import './theme/global.styl';

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

const dataSetComponents = requireAll(require.context('./components', true, /^\.\/.*(makeup-data\.js)$/));
const dataSetPages = requireAll(require.context('./pages', true, /^\.\/.*(makeup-data\.js)$/));

let dataSet = {
  label: 'Tests',
  items: [{
    name: 'components',
    type: 'module',
    styles: {
      markup: 'background-color: transparent;'
    },
    items: [],
  }, {
    name: 'pages',
    type: 'module',
    styles: {
      markup: 'background-color: transparent;'
    },
    items: [],
  }]
};

dataSet = dataSetComponents.reduce((acc, item) => {
  acc.items[0].items.push(item.data);
  return acc;
}, dataSet);

dataSet = dataSetPages.reduce((acc, item) => {
  acc.items[1].items.push(item.data);
  return acc;
}, dataSet);

function template(...args) {
  return dataSetComponents
    .concat(dataSetPages)
    .reduce((acc, item) => {
      return acc + (item.template(...args) || '');
    }, '');
}

window.Makeup(dataSet, template);

requireAll(require.context('./components', true, /^\.\/.*\.(jsx?)$/));
requireAll(require.context('./pages', true, /^\.\/.*\.(jsx?)$/));

