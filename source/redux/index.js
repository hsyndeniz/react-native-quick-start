import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import { firebase as firebaseReducer } from './firebase/reducers/firebase';

export function* saga() {
    yield all([
        //fetchSaga()
        // some more
    ]);
}

const reducer = combineReducers({
    firebase: firebaseReducer
});

const persistConfig = {
    key: 'rootKeyPersist',
    storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, thunk));

const persistor = persistStore(store);

sagaMiddleware.run(saga);

export const reduxProvider = (Component) => (props: any) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Component {...props}/>
        </PersistGate>
    </Provider>
);
