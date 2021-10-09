import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { StyleSheet } from 'react-native';

const mapStateToProps = ({ category }: RootState) => ({
  isEdit: category.isEdit,
});
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  onPress: () => void;
}
class CategoryHeaderBtn extends Component<IProps> {
  render() {
    const { onPress, isEdit } = this.props;
    return (
      <Button
        title={isEdit ? '完成' : '编辑'}
        type={'clear'}
        titleStyle={layout.headRightBtn}
        activeOpacity={1}
        onPress={onPress}
      />
    );
  }
}
const layout = StyleSheet.create({
  headRightBtn: {
    color: '#333',
    fontSize: 16,
  },
});
export default connector(CategoryHeaderBtn);
