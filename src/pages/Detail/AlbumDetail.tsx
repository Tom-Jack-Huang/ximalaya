import React, { Component } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import IconDown from '@/assets/icon/IconDown';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import IconBofang from '@/assets/icon/IconBofang';
import IconPause from '@/assets/icon/IconPause';
import PlaySlider from '@/pages/Detail/components/PlaySlider';
import IconShangyishou from '@/assets/icon/IconShangyishou';
import IconXiayishou from '@/assets/icon/IconXiayishou';
const mapStateToProps = ({ player }: RootState) => {
  return {
    soundUrl: player.soundUrl,
    playState: player.playState,
    title: player.title,
    previousId: player.previousId,
    nextId: player.nextId,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  navigation: RootStackNavigation;
  route: RouteProp<any, 'AlbumDetail'>;
}
class AlbumDetail extends Component<IProps> {
  componentDidMount() {
    const { dispatch, route } = this.props;

    dispatch({
      type: 'player/getShow',
      payload: {
        id: route.params?.id,
      },
    });
  }
  componentWillUnmount() {}

  _onBackBtnClick = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };
  _onPlayStateChange = () => {
    const { dispatch, playState } = this.props;
    console.log(playState);
    dispatch({
      type: playState === 'playing' ? 'player/pause' : 'player/play',
    });
  };
  _previous = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'player/previous' });
  };
  _next = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'player/next' });
  };
  render() {
    const { playState, title, previousId, nextId } = this.props;
    return (
      <View>
        <View style={[layout.flexRow, layout.navBg]}>
          <TouchableOpacity style={layout.backBtn} onPress={this._onBackBtnClick}>
            <IconDown size={25} color={'#fff'} />
          </TouchableOpacity>
          <Text style={layout.titleStr}>{title}</Text>
        </View>

        <PlaySlider />
        <View style={[layout.flexRow, layout.conBtn]}>
          <TouchableOpacity activeOpacity={!previousId ? 0.3 : 1} onPress={this._previous} disabled={!previousId}>
            <IconShangyishou size={30} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this._onPlayStateChange}
            style={layout.playStateBtn}
            disabled={playState === ''}>
            {playState === 'playing' ? <IconPause size={35} color={'#fff'} /> : <IconBofang size={40} color={'#fff'} />}
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={!nextId ? 0.3 : 1} onPress={this._next} disabled={!nextId}>
            <IconXiayishou size={30} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const layout = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navBg: {
    marginTop: getStatusBarHeight(true) + 15,
  },
  titleStr: {
    fontSize: 18,
    color: '#fff',
  },
  backBtn: {
    position: 'absolute',
    left: 15,
  },
  playStateBtn: {},
  conBtn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 20,
  },
});
export default connector(AlbumDetail);
