import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IChannel } from '@/models/home';
import IconLijitingke from '@/assets/icon/IconLijitingke';
import IconShengyin from '@/assets/icon/IconShengyin';
interface IProps {
  data: IChannel;
  onItemClick: (item: IChannel) => void;
}
class ChannelItem extends PureComponent<IProps> {
  onItemClick = () => {
    const { data, onItemClick } = this.props;
    if (typeof onItemClick === 'function') {
      onItemClick(data);
    }
  };

  render() {
    const { data } = this.props;
    return (
      <TouchableOpacity
        style={layout.itemBg}
        activeOpacity={1}
        onPress={this.onItemClick}>
        <Image source={{ uri: data.image }} style={layout.image} />
        <View style={layout.content}>
          <Text style={layout.title}>{data.title}</Text>
          <Text style={layout.remake} numberOfLines={1}>
            {data.remark}
          </Text>
          <View style={layout.bottomBg}>
            <View style={layout.iconBg}>
              <IconLijitingke style={layout.icon} color={'#f86442'} size={14} />
              <Text>{data.playing}</Text>
            </View>
            <View style={layout.iconBg}>
              <IconShengyin style={layout.icon} color={'#f86442'} size={14} />
              <Text>{data.played}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const layout = StyleSheet.create({
  itemBg: {
    flexDirection: 'row',
    marginHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 120,
    marginTop: 15,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#dedede',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
  },
  remake: {
    backgroundColor: '#f8f8f8',
    fontSize: 14,
    borderTopLeftRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  bottomBg: {
    flexDirection: 'row',
  },
  iconBg: {
    flexDirection: 'row',
    marginRight: 30,
  },
  icon: {
    marginRight: 10,
  },
});
export default ChannelItem;
