import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Button } from 'react-native-elements';
import LinearAnimatedGradient from 'react-native-linear-animated-gradient-transition';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState, props: MaterialTopTabBarProps) => {
  const routsState = props.navigation.getState();
  const routeName = routsState.routeNames[routsState.index];
  const modelState = state[routeName];
  return {
    gradientColors: modelState.carousel
      ? modelState.carousel[modelState.activeDotIndex]
      : undefined,
    gradientHid: modelState.gradientHid,
  };
};
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = ModelState & MaterialTopTabBarProps;

class TopTabBarView extends Component<IProps> {
  gotoCategory = () => {
    const { navigation } = this.props;

    navigation.navigate('Category', '');
  };

  render() {
    const { gradientColors, gradientHid, ...props } = this.props;
    let textStyle = layout.wethText;
    if (gradientHid) {
      textStyle = layout.blackText;
    }
    return (
      <View style={layout.bg}>
        {gradientHid ? (
          <View />
        ) : (
          <LinearAnimatedGradient
            colors={gradientColors ? gradientColors.colors : []}
            style={layout.gradient}
          />
        )}
        <View style={layout.content}>
          <View style={layout.tabBg}>
            <MaterialTopTabBar {...props} />
          </View>
          <Button
            title={'分类'}
            type={'clear'}
            buttonStyle={layout.typeBtn}
            titleStyle={[layout.typeBtnTitle, textStyle]}
            onPress={this.gotoCategory}
          />
        </View>
        <View style={layout.content}>
          <Button
            title={'搜索按钮'}
            containerStyle={layout.searchBtn}
            buttonStyle={layout.searchBtnBg}
            titleStyle={[layout.searchBtnTitle, textStyle]}
            activeOpacity={1}
          />
          <Button
            title={'历史记录'}
            type={'clear'}
            titleStyle={[layout.hisBtnTitle, textStyle]}
          />
        </View>
      </View>
    );
  }
}

const layout = StyleSheet.create({
  bg: {
    paddingTop: getStatusBarHeight(true),
    backgroundColor: '#fff', //
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: 'transparent', //
    overflow: 'hidden',
    elevation: 0,
  },
  tabBg: {
    flex: 1,
  },
  typeBtn: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
    borderRadius: 0,
    height: 25,
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  typeBtnTitle: {
    color: '#333',
    fontSize: 14,
  },
  searchBtn: {
    padding: 0,
    height: 30,
    flex: 1,
  },
  searchBtnBg: {
    backgroundColor: 'rgba(0,0,0,0.20)',
    borderRadius: 15,
    marginLeft: 10,
    justifyContent: 'flex-start',
    paddingLeft: 15,
  },
  searchBtnTitle: {
    fontSize: 14,
  },
  hisBtnTitle: {
    fontSize: 15,
    marginLeft: 20,
  },
  wethText: {
    color: '#fff',
  },
  blackText: {
    color: '#333',
  },
  topTabBar: {
    backgroundColor: 'red',
  },
});
export default connector(TopTabBarView);
