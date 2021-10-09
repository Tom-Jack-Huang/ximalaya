import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import IconBack from '@/assets/icon/IconBack';
import IconBofang from '@/assets/icon/IconBofang';
import IconBofang1 from '@/assets/icon/IconBofang1';
import IconBofang2 from '@/assets/icon/IconBofang2';
import IconBofang3 from '@/assets/icon/IconBofang3';
import IconDown from '@/assets/icon/IconDown';
import IconFavoritesFill from '@/assets/icon/IconFavoritesFill';
import IconFaxian from '@/assets/icon/IconFaxian';
import IconFullscreen from '@/assets/icon/IconFullscreen';
import IconHuanyipi from '@/assets/icon/IconHuanyipi';
import IconLijitingke from '@/assets/icon/IconLijitingke';
import IconLoading from '@/assets/icon/IconLoading';
import IconMessage from '@/assets/icon/IconMessage';
import IconMore from '@/assets/icon/IconMore';
import IconPaste from '@/assets/icon/IconPaste';
import IconPause from '@/assets/icon/IconPause';
import IconPlay2 from '@/assets/icon/IconPlay2';
import IconPlayArrow from '@/assets/icon/IconPlayArrow';
import IconShangyishou from '@/assets/icon/IconShangyishou';
import IconShengyin from '@/assets/icon/IconShengyin';
import IconShijian from '@/assets/icon/IconShijian';
import IconShoucang from '@/assets/icon/IconShoucang';
import IconShouye from '@/assets/icon/IconShouye';
import IconTime from '@/assets/icon/IconTime';
import IconUser from '@/assets/icon/IconUser';
import IconV from '@/assets/icon/IconV';
import IconVolumeOff from '@/assets/icon/IconVolumeOff';
import IconVolumeUp from '@/assets/icon/IconVolumeUp';
import IconXihuan from '@/assets/icon/IconXihuan';
import IconXiayishou from '@/assets/icon/IconXiayishou';

class Found extends Component {
  render() {
    return (
      <View style={layout.bg}>
        <IconBack />
        <IconBofang />
        <IconBofang1 />
        <IconBofang2 />
        <IconBofang3 color={'red'} />
        <IconDown />
        <IconFavoritesFill />
        <IconFaxian />
        <IconFullscreen />
        <IconHuanyipi />
        <IconLijitingke />
        <IconLoading />
        <IconMessage />
        <IconMore />
        <IconPaste />
        <IconPause />
        <IconPlay2 />
        <IconPlayArrow />
        <IconShangyishou />
        <IconShengyin />
        <IconShijian />
        <IconShoucang />
        <IconShouye />
        <IconTime />
        <IconUser />
        <IconV />
        <IconVolumeOff />
        <IconVolumeUp />
        <IconXihuan />
        <IconXiayishou />
      </View>
    );
  }
}
const layout = StyleSheet.create({
  bg: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default Found;
