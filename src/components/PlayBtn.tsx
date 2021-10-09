import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconBofang3 from '@/assets/icon/IconBofang3';

interface IProps {
  onPress: () => void;
}

class PlayBtn extends Component<IProps> {
  render() {
    return (
      <TouchableOpacity activeOpacity={1} style={layout.btnBg} onPress={this.props.onPress}>
        <IconBofang3 color={'#ededed'} size={40} />
      </TouchableOpacity>
    );
  }
}
const layout = StyleSheet.create({
  btnBg: {
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PlayBtn;
