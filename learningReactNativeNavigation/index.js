import {AppRegistry} from 'react-native';

// import App from './App';
// import App from './AppWithDrawer';
// import {App_NestingMultiple} from './src/components/fundamentals/nestingNavigators/NestingMultiple';

import {name as appName} from './app.json';
import AppWithGlobalTabAndNestedStackNavigation from './src/components/fundamentals/nestingNavigators/TabWithNestedStackNavigation';

AppRegistry.registerComponent(
  appName,
  () => AppWithGlobalTabAndNestedStackNavigation,
);
