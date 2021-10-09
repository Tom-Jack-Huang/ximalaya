import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
const mapStateToProps = ({ album }: RootState) => {
  return {
    introduction: album.introduction,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class Introduction extends Component<ModelState> {
  render() {
    const { introduction } = this.props;
    return (
      <View style={layout.bg}>
        <Text style={layout.text}>{introduction}</Text>
      </View>
    );
  }
}
const layout = StyleSheet.create({
  bg: {
    padding: 10,
  },
  text: {
    fontSize: 14,
  },
});
export default connector(Introduction);
