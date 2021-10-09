import React, { Component } from 'react';
import { FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { IProgram } from '@/models/album';
import AlbumsListItem from '@/pages/Album/components/AlbumsListItem';

const mapStateToProps = ({ album }: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  onAlbumsListItemClick: (id: string, index: number) => void;
}
class AlbumsList extends Component<IProps> {
  _renderItem = ({ item, index }: ListRenderItemInfo<IProgram>) => {
    const { onAlbumsListItemClick } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          onAlbumsListItemClick(item.id, index);
        }}>
        <AlbumsListItem data={item} index={index} />
      </TouchableOpacity>
    );
  };

  render() {
    const { list } = this.props;
    return (
      <FlatList
        data={list}
        renderItem={this._renderItem}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    );
  }
}

export default connector(AlbumsList);
