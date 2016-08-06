//@flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import codePush from 'react-native-code-push';
import BlankScreen from './screens/blank_screen';
import {View, Text} from 'native-base';

class Main extends Component {

  props: {
    key: string,
  };

  state: {
    showModal: boolean,
    stage: string,
    downloadProgress: number,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      stage: 'Initializing',
      downloadProgress: 0,
    };
  }

  componentDidMount() {
    codePush.sync({deploymentKey: this.props.key, installMode: codePush.InstallMode.IMMEDIATE }, this.cpSync,
      ({ receivedBytes, totalBytes, }) => { this.setState({downloadProgress: receivedBytes / totalBytes * 100}); });
    //this.simulate();
  }

  simulate() {
    setTimeout(() => { this.cpSync(codePush.SyncStatus.CHECKING_FOR_UPDATE); }, 10);
    setTimeout(() => { this.cpSync(codePush.SyncStatus.DOWNLOADING_PACKAGE); }, 500);
    setTimeout(() => { this.setState({downloadProgress: 20}); }, 800);
    setTimeout(() => { this.setState({downloadProgress: 80}); }, 1800);
    setTimeout(() => { this.cpSync(codePush.SyncStatus.INSTALLING_UPDATE); }, 2000);
    setTimeout(() => { this.cpSync(codePush.SyncStatus.UPDATE_INSTALLED); }, 2200);
  }

  cpSync(status) {
    switch (status) {
    case codePush.SyncStatus.CHECKING_FOR_UPDATE:
      this.setState({stage: 'Checking for updates'});
      break;
    case codePush.SyncStatus.UP_TO_DATE:
      this.setState({stage: 'Done'});
      break;
    case codePush.SyncStatus.DOWNLOADING_PACKAGE:
      this.setState({showModal: true, stage: 'Downloading'});
      //this.refs.modal.open();
      break;
    case codePush.SyncStatus.INSTALLING_UPDATE:
      this.setState({stage: 'Installing'});
      break;
    case codePush.SyncStatus.UPDATE_INSTALLED:
      //this.refs.modal.close();
      this.setState({showModal: false, stage: 'Done'});
      break;
    default:
      this.setState({stage: 'Error'});
      console.log(`Unknonw codePush status ${status}`);
    }
  }

  renderModal() {
    return (<View><Text>{this.state.stage}</Text></View>);
  }

  renderRoute() {
    return (
      <BlankScreen />
    );
  }

  render() {
    if (this.state.showModal) { return this.renderModal(); }
    return this.renderRoute();
  }

}

function stateToProps(state) {
  return {
    key: state.info.codePushKey,
  };
}

const actions = {
};

export default connect(
  stateToProps,
  actions
)(Main);

