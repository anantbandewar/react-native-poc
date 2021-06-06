import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import loadsReducer from './store/reducers/loads';
import loadReducer from './store/reducers/load';
import { init } from './helpers/db';


// init().then(() => {
//   console.log("Initialized database.");
// }).catch(err => {
//   console.log("Initializing db failed.");
//   console.log(err);
// });

const rootReducer = combineReducers({
  loads: loadsReducer,
  load: loadReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <PaperProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </PaperProvider>
  );
}
