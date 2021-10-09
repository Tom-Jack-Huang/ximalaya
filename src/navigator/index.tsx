import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category';
import Album from '@/pages/Album';
import AlbumDetail from '@/pages/Detail/AlbumDetail';
import IconDown from '@/assets/icon/IconDown';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Album: {
    id: string;
    title: string;
    image: string;
  };
  AlbumDetail: undefined;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator();

function getAlbumOptions() {
  return {
    headerTitle: '',
    headerTransparent: true,
    headerTitleStyle: { color: 'rgba(0,0,0,0)' },
  };
}

class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            gestureEnabled: true,
            headerBackTitleVisible: false,
            headerTintColor: '#333',
          }}>
          <Stack.Screen
            name={'BottomTabs'}
            component={BottomTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name={'Category'} component={Category} options={{}} />

          <Stack.Screen
            name={'Album'}
            component={Album}
            // @ts-ignore
            options={getAlbumOptions}
          />
          <Stack.Screen
            name={'AlbumDetail'}
            component={AlbumDetail}
            options={{
              animation: 'slide_from_bottom',
              headerShown: false,
              title: '',
              headerTintColor: '#fff',
              contentStyle: {
                backgroundColor: '#807c66',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
