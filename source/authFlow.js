import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import Loading from './screens/Loading';

import { reduxProvider } from './redux/index';

const Screens = new Map();

Screens.set('loading', Loading);

// Register screens
Screens.forEach((C, key) => {
    Navigation.registerComponent(key,() => gestureHandlerRootHOC(reduxProvider(C)),() => C);
});

export const startApp = () => {
    Navigation.setRoot({
        root: {
          component: {
            name: 'loading'
          }
        }
    });
};
