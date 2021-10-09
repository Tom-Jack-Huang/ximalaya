import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Listen from '@/pages/Listen/Listen';
import Found from '@/pages/Found/Found';
import Account from '@/pages/Account/Account';
import IconShouye from '@/assets/icon/IconShouye';
import IconShoucang from '@/assets/icon/IconShoucang';
import IconFaxian from '@/assets/icon/IconFaxian';
import IconUser from '@/assets/icon/IconUser';
import HomeTabs from '@/navigator/HomeTabs';
import PlayBtn from '@/components/PlayBtn';

export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Play: undefined;
  Found: undefined;
  Account: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParamList>();

class BottomTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#f86442',
        }}>
        <Tab.Screen
          name={'HomeTabs'}
          component={HomeTabs}
          options={{
            tabBarLabel: '首页',
            headerShown: false,
            tabBarIcon: ({ color, size }) => <IconShouye color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name={'Listen'}
          component={Listen}
          options={{
            tabBarLabel: '我听',
            headerTitle: '我听',
            tabBarIcon: ({ color, size }) => <IconShoucang color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name={'Play'}
          component={PlayBtn}
          options={{
            tabBarButton: () => {
              return <PlayBtn />;
            },
          }}
        />
        <Tab.Screen
          name={'Found'}
          component={Found}
          options={{
            tabBarLabel: '发现',
            headerTitle: '发现',
            tabBarIcon: ({ color, size }) => <IconFaxian color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name={'Account'}
          component={Account}
          options={{
            tabBarLabel: '我的',
            headerTitle: '我的',
            tabBarIcon: ({ color, size }) => <IconUser color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabs;
