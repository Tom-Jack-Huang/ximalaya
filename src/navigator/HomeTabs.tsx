import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React, { Component } from 'react';
import Home from '@/pages/Home';
import TopTabBarView from '@/pages/Home/components/TopTabBarView';
import { StyleSheet } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { ICategory } from '@/models/category';
import { createHomeModel } from '@/config/dva';

export type HomeParamList = {
  [key: string]: {
    namespace: string;
  };
};

const Tab = createMaterialTopTabNavigator<HomeParamList>();
const mapStateToProps = (state: RootState) => {
  const myCategory = state.category.myCategory;
  return {
    myCategory: myCategory,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

class HomeTabs extends Component<ModelState> {
  _tabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarView {...props} />;
  };
  _renderItem = (item: ICategory) => {
    createHomeModel(item.id);
    return (
      <Tab.Screen
        name={item.id}
        key={item.id}
        component={Home}
        options={{
          tabBarLabel: item.name,
          tabBarInactiveTintColor: '#333',
          tabBarActiveTintColor: '#333',
          tabBarIndicatorStyle: {
            height: 4,
            width: 20,
            marginLeft: 30,
            borderRadius: 2,
            backgroundColor: '#f86442',
          },
        }}
        initialParams={{
          namespace: item.id,
        }}
      />
    );
  };
  render() {
    const { myCategory } = this.props;
    return (
      <Tab.Navigator
        sceneContainerStyle={layout.bg}
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarStyle: {
            backgroundColor: 'transparent',
          },
          tabBarItemStyle: {
            width: 85,
          },
          lazy: true,
        }}
        tabBar={this._tabBar}>
        {myCategory.map((item) => this._renderItem(item))}
      </Tab.Navigator>
    );
  }
}
const layout = StyleSheet.create({
  bg: {
    backgroundColor: 'transparent',
  },
});
export default connector(HomeTabs);
