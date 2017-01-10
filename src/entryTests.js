import './theme/global.styl';

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components', true, /^\.\/.*\.(jsx?)$/));
requireAll(require.context('./pages', true, /^\.\/.*\.(jsx?)$/));