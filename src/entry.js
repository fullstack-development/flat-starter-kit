import './theme/global.styl';

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

// require styles for jquery-plugins
requireAll(require.context('./plugins/', true, /^\.\/.*\.(css)$/));

requireAll(require.context('./', true, /^\.\/.*\.(jsx?)$/));

