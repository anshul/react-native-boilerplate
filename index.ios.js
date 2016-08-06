'use strict';

import { AppRegistry, StatusBar } from 'react-native';
import setup from './app/setup';

StatusBar.setBarStyle('light-content');
AppRegistry.registerComponent('RNBoilerplate', setup);

