import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './screens/Home';
import Places from './screens/Places';
import Admob from './screens/Admob';
import Auth from './screens/Auth';
import Maps from './screens/Maps';

import { reduxProvider } from './redux/index';

const Screens = new Map();

Screens.set('home', Home);
Screens.set('maps', Maps);
Screens.set('places', Places);
Screens.set('admob', Admob);
Screens.set('auth', Auth);

// Register screens
Screens.forEach((C, key) => {
    Navigation.registerComponent(key,() => gestureHandlerRootHOC(reduxProvider(C)),() => C);
});

// Here some global listeners could be placed
// ...

export const startApp = () => {
    Promise.all([
        MaterialCommunityIcons.getImageSource('google', 25),
        MaterialCommunityIcons.getImageSource('react', 25),
        MaterialCommunityIcons.getImageSource('google-maps', 25),
        MaterialCommunityIcons.getImageSource('pin', 25)
    ]).then(([googleIcon, reactIcon, mapsIcon, pinIcon]) => {
        Navigation.setRoot({
            root: {
                sideMenu: {
                    left: {
                        component: {
                            name: 'home'
                        }
                    },
                    center: {
                        bottomTabs: {
                            options: {
                                bottomTabs: {
                                    titleDisplayMode: 'alwaysShow',
                                },
                            },
                            children: [{
                                stack: {
                                    children: [{
                                        component: {
                                            name: 'home',
                                            options: {
                                                topBar: {
                                                    visible: true,
                                                    title: {
                                                        text: 'Home',
                                                    },
                                                },
                                            },
                                        },
                                    }],
                                    options: {
                                        bottomTab: {
                                            text: 'Redux App',
                                            icon: reactIcon,
                                        },
                                    },
                                },
                            }, {
                                stack: {
                                    children: [{
                                        component: {
                                            name: 'admob',
                                            options: {
                                                topBar: {
                                                    visible: true,
                                                    title: {
                                                        text: 'Google Admob',
                                                    },
                                                },
                                            },
                                        },
                                    }],
                                    options: {
                                        bottomTab: {
                                            text: 'Admob',
                                            icon: googleIcon,
                                        },
                                    },
                                },
                            }, {
                                stack: {
                                    children: [{
                                        component: {
                                            name: 'maps',
                                            options: {
                                                topBar: {
                                                    visible: true,
                                                    title: {
                                                        text: 'Maps',
                                                    },
                                                },
                                            },
                                        },
                                    }],
                                    options: {
                                        bottomTab: {
                                            text: 'Maps',
                                            icon: mapsIcon,
                                        },
                                    },
                                },
                            }, {
                                stack: {
                                    children: [{
                                        component: {
                                            name: 'places',
                                            options: {
                                                topBar: {
                                                    visible: true,
                                                    title: {
                                                        text: 'Places',
                                                    },
                                                },
                                            },
                                        },
                                    }],
                                    options: {
                                        bottomTab: {
                                            text: 'Places',
                                            icon: pinIcon,
                                        },
                                    },
                                },
                            }],
                        },
                    },
                    options: {
                        bottomTab: {
                            text: 'SideMenu',
                            testID: 'SIDE_MENU_TAB'
                        }
                    }
                }
            }
        });
    });
};
