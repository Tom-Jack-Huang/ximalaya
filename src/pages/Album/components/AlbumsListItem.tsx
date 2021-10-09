import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IProgram } from '@/models/album';
import IconShengyin from '@/assets/icon/IconShengyin';
import IconLijitingke from '@/assets/icon/IconLijitingke';
interface IProps {
  data: IProgram;
  index: number;
}
class AlbumsListItem extends Component<IProps> {
  render() {
    const { data, index } = this.props;
    return (
      <View style={[layout.flexRow, layout.bg]}>
        <Text style={layout.index}>{index + 1}</Text>
        <View>
          <Text style={layout.title}>{data.title}</Text>
          <View style={[layout.flexRow]}>
            <View style={[layout.flexRow]}>
              <IconLijitingke color={'#ccc'} />
              <Text style={[layout.cccColor, layout.bottomSty]}>{data.serial}</Text>
            </View>
            <View style={layout.flexRow}>
              <IconShengyin color={'#ccc'} />
              <Text style={[layout.cccColor, layout.bottomSty]}>{data.duration}</Text>
            </View>
          </View>
        </View>
        <Text style={layout.timeSty}>{data.date}</Text>
      </View>
    );
  }
}
const layout = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bg: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  index: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ccc',
    marginRight: 15,
  },
  title: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  cccColor: {
    color: '#ccc',
  },
  bottomSty: {
    marginLeft: 5,
    marginRight: 10,
  },
  timeSty: {
    color: '#ccc',
    position: 'absolute',
    right: 15,
  },
});
export default AlbumsListItem;
