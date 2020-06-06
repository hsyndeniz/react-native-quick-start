import { Navigation } from 'react-native-navigation';

import { startApp } from './source/authFlow';

Navigation.events().registerAppLaunchedListener(() => {
    startApp();
});