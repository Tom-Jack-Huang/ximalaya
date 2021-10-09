import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { IGuess } from '@/models/home';
import IconXihuan from '@/assets/icon/IconXihuan';
import IconMore from '@/assets/icon/IconMore';
import IconHuanyipi from '@/assets/icon/IconHuanyipi';
import GuessItem from '@/pages/Home/components/GuessItem';
interface IProps extends ModelState {
  guess: IGuess[];
  onItemClick: (item: IGuess) => void;
}
class Guess extends Component<IProps> {
  componentDidMount() {
    this.onReloadData();
  }

  onChangeGuess = () => {
    this.onReloadData();
  };

  onReloadData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/getGuessList',
    });
  };

  onItemClick = (item: IGuess) => {
    const { onItemClick } = this.props;
    if (typeof onItemClick === 'function') {
      onItemClick(item);
    }
  };
  _renderItem = ({ item }: { item: IGuess }) => {
    return <GuessItem data={item} onItemClick={this.onItemClick} />;
  };
  render() {
    const { guess } = this.props;
    return (
      <View style={styles.bg}>
        <View style={styles.topTab}>
          <View style={styles.topTapItem}>
            <IconXihuan />
            <Text style={styles.likeText}>{'   猜你喜欢'}</Text>
          </View>
          <View style={styles.topTapItem}>
            <Text style={styles.moreText}>更多</Text>
            <IconMore />
          </View>
        </View>
        <FlatList
          data={guess}
          renderItem={this._renderItem}
          numColumns={3}
          style={styles.tableView}
          scrollEnabled={false}
        />
        <TouchableOpacity
          style={styles.tabBottom}
          activeOpacity={1}
          onPress={this.onChangeGuess}>
          <IconHuanyipi color={'red'} />
          <Text>{'  换一批'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps({ home }: RootState) {
  return {
    guess: home.guess,
  };
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
  },
  topTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 34,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
    padding: 10,
  },
  tableView: {
    padding: 5,
  },
  topTapItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    color: '#6f6f6f',
  },
  likeText: {
    color: '#333333',
  },
  tabBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default connector(Guess);
