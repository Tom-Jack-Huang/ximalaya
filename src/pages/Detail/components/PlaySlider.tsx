import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from 'react-native-slider-x';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { getTimeString } from '@/utils/index';

const mapStateToProps = ({ player }: RootState) => {
  return {
    currentTime: player.currentTime,
    duration: player.duration,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {}

class PlaySlider extends Component<IProps> {
  _renderThumb = () => {
    const { currentTime, duration } = this.props;
    return (
      <View>
        <Text style={layout.timeStr}>{getTimeString(currentTime) + '/' + getTimeString(duration)}</Text>
      </View>
    );
  };
  render() {
    const { currentTime, duration } = this.props;
    return (
      <View style={layout.bg}>
        <Slider
          value={currentTime}
          maximumValue={duration}
          maximumTrackTintColor={'rgba(255,255,255,0.3)'}
          minimumTrackTintColor={'#fff'}
          renderThumb={this._renderThumb}
          thumbStyle={layout.thumb}
        />
      </View>
    );
  }
}
const layout = StyleSheet.create({
  bg: {
    margin: 10,
  },
  thumb: {
    backgroundColor: '#fff',
    width: 76,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeStr: {
    fontSize: 10,
  },
});
export default connector(PlaySlider);
