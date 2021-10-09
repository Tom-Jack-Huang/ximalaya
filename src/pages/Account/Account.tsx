import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { RootStackNavigation } from '@/navigator/index';

interface IProps {
  navigation: RootStackNavigation;
}

class Account extends Component<IProps> {
  render() {
    return (
      <View>
        <Text>Account</Text>
      </View>
    );
  }
}

export default Account;
