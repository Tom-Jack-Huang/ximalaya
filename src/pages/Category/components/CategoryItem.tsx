import React, { Component } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ICategory } from '@/models/category';
import { viewportWidth } from '@/utils/index';
import { Badge } from 'react-native-elements';
interface IProps {
  data: ICategory;
  selected: boolean;
  isEdit?: boolean;
  disable?: boolean;
  style?: StyleProp<ViewStyle>;
}
class CategoryItem extends Component<IProps> {
  render() {
    const { data, selected, isEdit, disable, style } = this.props;
    return (
      <View
        style={[layout.listTitleBg, disable ? layout.disableBg : null, style]}>
        <Text style={layout.listTitle}>{data.name}</Text>
        {isEdit && !disable ? (
          <Badge
            value={selected ? '-' : '+'}
            status={'error'}
            containerStyle={layout.editBtnBg}
          />
        ) : null}
      </View>
    );
  }
}
const layout = StyleSheet.create({
  listTitleBg: {
    backgroundColor: '#fff',
    height: 40,
    width: (viewportWidth - 15 * 5) / 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  editBtnBg: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 16,
  },
  disableBg: {
    backgroundColor: '#ccc',
  },
});
export default CategoryItem;
