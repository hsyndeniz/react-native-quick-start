import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import Auth from './screens/Auth';
import Register from './screens/Register';

import { reduxProvider } from './redux/index';

const Screens = new Map();

Screens.set('auth', Auth);
Screens.set('register', Register);

// Register screens
Screens.forEach((C, key) => {
    Navigation.registerComponent(key,() => gestureHandlerRootHOC(reduxProvider(C)),() => C);
});

export const startApp = () => {
    Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'auth',
                  options: {
                    topBar: {
                      visible: false
                    }
                  }
                },
              }
            ]
          }
        }
    });
};
