import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import HeadView from '@/pages/Album/components/HeadView';
import Tab from '@/pages/Album/components/Tab';
import { RootStackNavigation } from '@/navigator/index';

const mapStateToProps = ({ album }: RootState) => {
  return {
    author: album.author,
    summary: album.summary,
    thumbnailUrl: album.thumbnailUrl,
    title: album.title,
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

class Album extends Component<IProps> {
  state = { scrollY: new Animated.Value(0) };
  componentDidMount() {
    // @ts-ignore
    const { dispatch, route } = this.props;
    dispatch({
      type: 'album/getAlbumList',
      payload: {
        id: route.params.id,
      },
    });
  }
  _onAlbumsListItemClick = (id: string, index: number) => {
    const { navigation, dispatch, list } = this.props;
    const pre = list[index - 1];
    const nextItem = list[index + 1];
    dispatch({
      type: 'player/setState',
      payload: {
        previousId: pre ? pre.id : '',
        nextId: nextItem ? nextItem.id : '',
        sounds: list.map((item) => ({ id: item.id, title: item.title })),
      },
    });
    // @ts-ignore
    navigation.navigate('AlbumDetail', { id: id });
  };
  render() {
    const { thumbnailUrl, author, title, summary } = this.props;

    return (
      <View style={layout.bg}>
        <HeadView thumbnailUrl={thumbnailUrl} author={author} title={title} summary={summary} />
        <Tab onAlbumsListItemClick={this._onAlbumsListItemClick} />
      </View>
    );
  }
}

const layout = StyleSheet.create({
  bg: {
    flex: 1,
  },
});
export default connector(Album);
