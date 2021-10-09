import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationState, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import Introduction from '@/pages/Album/components/Introduction';
import AlbumsList from '@/pages/Album/components/AlbumsList';
interface IProps {
  onAlbumsListItemClick: (id: string, index: number) => void;
}
class Tab extends Component<IProps> {
  state = {
    index: 1,
  };
  _onIndexChange = (index: number) => {
    this.setState({
      index: index,
    });
  };
  _renderScene = (item: any) => {
    const { onAlbumsListItemClick } = this.props;
    switch (item.route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return <AlbumsList onAlbumsListItemClick={onAlbumsListItemClick} />;
    }
  };
  _renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<{ key: string; title: string }> },
  ) => {
    return (
      <TabBar
        jumpTo={props.jumpTo}
        layout={props.layout}
        position={props.position}
        navigationState={props.navigationState}
        scrollEnabled={true}
        tabStyle={layout.tabStyle}
        labelStyle={layout.labelStyle}
        style={layout.bg}
        indicatorStyle={layout.indicatorStyle}
      />
    );
  };
  render() {
    const { index } = this.state;
    return (
      <TabView
        onIndexChange={this._onIndexChange}
        navigationState={{
          routes: [
            { key: 'introduction', title: '简介' },
            { key: 'albums', title: '节目' },
          ],
          index: index,
        }}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
      />
    );
  }
}
const layout = StyleSheet.create({
  bg: {
    backgroundColor: '#fff',
  },
  tabStyle: {
    width: 80,
  },
  labelStyle: {
    color: '#333',
  },
  indicatorStyle: {
    backgroundColor: '#eb6d48',
    borderColor: '#fff',
    borderLeftWidth: 20,
    borderRightWidth: 20,
  },
});
export default Tab;
