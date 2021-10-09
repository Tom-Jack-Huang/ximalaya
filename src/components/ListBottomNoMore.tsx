import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
interface IProps {
  hasMore: boolean;
  loading: boolean;
}
class ListBottomNoMore extends Component<IProps> {
  render() {
    const { loading, hasMore } = this.props;
    return (
      <View style={layout.bg}>
        {loading ? (
          <Text>正在加载...</Text>
        ) : (
          <Text>{hasMore ? '' : '已经到底了'}</Text>
        )}
      </View>
    );
  }
}
const layout = StyleSheet.create({
  bg: {
    alignItems: 'center',
    marginVertical: 15,
  },
});
export default ListBottomNoMore;
