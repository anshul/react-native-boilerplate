// @flow
/* global __DEV__ */

import types from '../types';
import { Platform } from 'react-native';


type Action = { type: 'DEVICE_INFO_SUCCESS', data: Object } | { type: 'RESET' } | {type: 'SETUP' };

type State = {
  name: string,
  os: string,
  osVersion: number,
  codePushKey: string
};

const codePushKeyProduction = 'prod key here';
const codePushKeyStaging = 'staging key here';

const initialState = {
  name: 'RNBoilerplate',
  os: Platform.OS,
  osVersion: Platform.version || 0,
  codePushKey: __DEV__ ? codePushKeyStaging : codePushKeyProduction,
};

export default function(state:State = initialState, action:Action): State {
  switch (action.type) {
  case types.RESET:
    return {... initialState };
  case types.DEVICE_INFO_SUCCESS:
    return { ...state, ...action.data };
  default:
    return state;
  }
}
