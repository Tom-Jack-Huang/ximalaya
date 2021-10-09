import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IGuess } from '@/models/home';
interface onItemClick {
  data: IGuess;
  onItemClick: (item: IGuess) => void;
}
class GuessItem extends Component<onItemClick> {
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
        style={styles.itemBg}
        onPress={this.onItemClick}
        activeOpacity={1}>
        <Image source={{ uri: data.image }} style={styles.itemImage} />
        <Text style={styles.itemText} numberOfLines={2}>
          {data.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  itemBg: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: 95,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {},
});
export default GuessItem;
