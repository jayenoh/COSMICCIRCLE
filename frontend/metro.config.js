// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix duplicate @react-navigation/native causing LinkingContext mismatch
// expo-router bundles its own copy, but we need a single instance
const reactNavigationNative = path.resolve(
  __dirname,
  'node_modules/@react-navigation/native'
);
const reactNavigationCore = path.resolve(
  __dirname,
  'node_modules/@react-navigation/core'
);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Force all @react-navigation/native imports to use the root copy
  if (moduleName === '@react-navigation/native' || moduleName.startsWith('@react-navigation/native/')) {
    const subPath = moduleName.replace('@react-navigation/native', '');
    return context.resolveRequest(context, reactNavigationNative + subPath, platform);
  }

  // Force all @react-navigation/core imports to use the root copy
  if (moduleName === '@react-navigation/core' || moduleName.startsWith('@react-navigation/core/')) {
    const subPath = moduleName.replace('@react-navigation/core', '');
    return context.resolveRequest(context, reactNavigationCore + subPath, platform);
  }

  // Stub out large icon glyph maps that crash Hermes
  const largeIconSets = [
    'MaterialCommunityIcons',
    'FontAwesome',
    'FontAwesome5',
    'FontAwesome6',
    'Ionicons',
    'Feather',
    'Entypo',
    'Foundation',
    'Octicons',
    'SimpleLineIcons',
    'EvilIcons',
    'AntDesign',
    'Fontisto',
  ];

  for (const iconSet of largeIconSets) {
    if (
      moduleName === `@expo/vector-icons/${iconSet}` ||
      moduleName === `react-native-vector-icons/${iconSet}` ||
      moduleName.endsWith(`/vendor/react-native-vector-icons/${iconSet}`)
    ) {
      return {
        filePath: require.resolve('./stubs/empty-icon.js'),
        type: 'sourceFile',
      };
    }
  }

  // Fall back to default resolution
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
