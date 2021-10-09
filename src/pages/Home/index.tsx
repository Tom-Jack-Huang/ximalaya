import React, { Component } from 'react';
import { FlatList, View, ListRenderItemInfo, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import Carrousel, { sideHeight } from '@/pages/Home/components/Carrousel';
import Guess from '@/pages/Home/components/Guess';
import { IChannel, IGuess } from '@/models/home';
import ChannelItem from '@/pages/Home/components/ChannelItem';
import ListBottomNoMore from '@/components/ListBottomNoMore';
import { RouteProp } from '@react-navigation/native';
import { HomeParamList } from '@/navigator/HomeTabs';
import { RootStackNavigation } from '@/navigator/index';

const mapStateToProps = (state: RootState, { route }: { route: RouteProp<HomeParamList> }) => {
  const { namespace } = route.params;
  const modelState = state[namespace];
  return {
    loading: state.loading.effects[namespace + '/getChannelList'],
    channel: modelState.channel,
    hasMore: modelState.hasMore,
    gradientHid: modelState.gradientHid,
    namespace: namespace,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface IIProps extends ModelState {
  navigation: RootStackNavigation;
}
interface IState {
  refreshing: boolean;
}
class Index extends Component<IIProps, IState> {
  state = {
    refreshing: false,
  };
  componentDidMount() {
    const { dispatch, namespace } = this.props;
    dispatch({
      type: namespace + '/getChannelList',
      payload: {
        loadMore: false,
      },
    });
  }

  _onItemClick = (item: IChannel) => {
    // console.log(item);
    const { navigation } = this.props;
    let params = {
      id: item.id,
      title: item.title,
      image: item.image,
    };
    // @ts-ignore
    navigation.navigate('Album', params);
  };
  onGuessItemClick = (item: IGuess) => {
    const { navigation } = this.props;
    let params = {
      id: item.id,
      title: item.title,
      image: item.image,
    };

    // @ts-ignore
    navigation.navigate('Album', params);
  };
  _onEndReached = () => {
    const { dispatch, hasMore, loading, namespace } = this.props;
    if (!hasMore || loading) {
      return;
    }
    dispatch({
      type: namespace + '/getChannelList',
      payload: {
        loadMore: true,
      },
    });
  };
  _onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    const { dispatch, namespace } = this.props;
    dispatch({
      type: namespace + '/getChannelList',
      payload: {
        loadMore: false,
      },
      callback: () => {
        this.setState({
          refreshing: false,
        });
      },
    });
  };
  _onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    let gradientHidStatus = offsetY > sideHeight;
    const { dispatch, gradientHid, namespace } = this.props;
    if (gradientHid !== gradientHidStatus) {
      dispatch({
        type: namespace + '/setState',
        payload: {
          gradientHid: gradientHidStatus,
        },
      });
    }
  };
  _keyExtractor = (item: IChannel) => {
    return item.id;
  };
  _renderItem = ({ item }: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onItemClick={this._onItemClick} />;
  };
  _ListHeaderComponent = () => {
    const { namespace } = this.props;
    return (
      <View>
        <Carrousel namespace={namespace} />
        <Guess onItemClick={this.onGuessItemClick} />
      </View>
    );
  };
  _ListFooterComponent = () => {
    const { hasMore, loading } = this.props;
    return <ListBottomNoMore hasMore={hasMore} loading={!loading} />;
  };
  render() {
    const { channel } = this.props;
    return (
      <FlatList
        ListHeaderComponent={this._ListHeaderComponent}
        data={channel}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={this._ListFooterComponent}
        onRefresh={this._onRefresh}
        refreshing={this.state.refreshing}
        onScroll={this._onScroll}
      />
    );
  }
}

export default connector(Index);
