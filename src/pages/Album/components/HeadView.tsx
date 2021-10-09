import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IAuthor } from '@/models/album';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BlurView } from '@react-native-community/blur';
interface IProps {
  thumbnailUrl: string;
  author: IAuthor;
  title: string;
  summary: string;
}
class HeadView extends Component<IProps> {
  render() {
    const { thumbnailUrl, author, title, summary } = this.props;
    return (
      <View style={[layout.flexRow, layout.headBg]}>
        <Image
          source={thumbnailUrl.length > 0 ? { uri: thumbnailUrl } : require('@/assets/images/cover-right.png')}
          style={layout.imageBg}
        />
        <BlurView style={layout.imageBg} blurType={'light'} blurAmount={10} />
        <View style={[layout.flexRow, layout.headLeft]}>
          <Image
            source={thumbnailUrl.length > 0 ? { uri: thumbnailUrl } : require('@/assets/images/cover-right.png')}
            style={layout.thumbnailImage}
          />
          <Image source={require('@/assets/images/cover-right.png')} style={layout.coverRight} />
        </View>
        <View style={layout.headRight}>
          <Text style={layout.titleStr}>{title}</Text>
          <View style={layout.remarkBg}>
            <Text style={layout.remark}>{summary}</Text>
          </View>
          <View style={[layout.flexRow]}>
            <Image
              source={author.avatar ? { uri: author.avatar } : require('@/assets/images/cover-right.png')}
              style={layout.authorImage}
            />
            <Text style={layout.authorName}>{author.name}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const layout = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  imageBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  headBg: {
    height: getStatusBarHeight(true) + 44 + 150,
    backgroundColor: 'red',
    paddingHorizontal: 15,
    alignItems: 'flex-end',
    paddingBottom: 30,
  },
  headLeft: {
    marginRight: 15,
    alignItems: 'center',
  },
  headRight: {
    justifyContent: 'space-between',
    height: 100,
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  coverRight: {
    height: 60,
    width: 15,
  },
  authorName: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  authorImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  titleStr: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  remarkBg: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  remark: {
    color: '#fff',
  },
});
export default HeadView;
