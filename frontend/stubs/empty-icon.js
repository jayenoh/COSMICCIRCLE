// Stub for large icon sets that crash Hermes
const React = require('react');
const { Text } = require('react-native');

function EmptyIcon(props) {
  return React.createElement(Text, { style: { fontSize: props.size || 24 } }, '?');
}

EmptyIcon.glyphMap = {};
EmptyIcon.getRawGlyphMap = function () { return {}; };
EmptyIcon.hasIcon = function () { return false; };
EmptyIcon.getImageSource = function () { return Promise.resolve({ uri: '' }); };
EmptyIcon.getImageSourceSync = function () { return { uri: '' }; };
EmptyIcon.loadFont = function () { return Promise.resolve(); };
EmptyIcon.font = {};

module.exports = EmptyIcon;
module.exports.default = EmptyIcon;
