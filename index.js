/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NativeBaseProvider, extendTheme} from 'native-base';

const nativeBaseDefaultProps = extendTheme({
  components: {},
});

const MainApp = () => {
  return (
    <NativeBaseProvider theme={nativeBaseDefaultProps}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
