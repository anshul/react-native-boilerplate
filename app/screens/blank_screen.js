// @flow

import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Title,
  Text,
} from 'native-base';
import { connect } from 'react-redux';

class BlankScreen extends Component {

  props: {
    name: string,
    version?: string,
  };

  state: {
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>{this.props.name}</Title>
        </Header>
        <Content padder>
          <Text>This is v{this.props.version}.</Text>
        </Content>
      </Container>
    );
  }
}

function stateToProps(state) {
  return {
    name: state.info.name,
    version: state.info.version,
  };
}

const actions = {
};

export default connect(
  stateToProps,
  actions
)(BlankScreen);
