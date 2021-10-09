import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { ICategory } from '@/models/category';
import lodash from 'lodash';
import CategoryItem from '@/pages/Category/components/CategoryItem';
import { RootStackNavigation } from '@/navigator/index';
import CategoryHeaderBtn from '@/pages/Category/components/CategoryHeaderBtn';
import { DragSortableView } from 'react-native-drag-sort';
import { viewportWidth } from '@/utils/index';

const mapStateToProps = ({ category }: RootState) => ({
  myCategory: category.myCategory,
  category: category.category,
  isEdit: category.isEdit,
});
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

class Category extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    props.navigation.setOptions({
      headerRight: () => <CategoryHeaderBtn onPress={this.onEditClick} />,
    });
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'category/toggle',
      payload: {
        isEdit: false,
      },
    });
  }

  onEditClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'category/toggle',
    });
  };

  onItemLongPress = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'category/toggle',
    });
  };
  onItemPress = (item: ICategory, selected: boolean, index: number) => {
    const { dispatch, isEdit, myCategory } = this.props;
    if (isEdit) {
      let array: ICategory[] = myCategory;
      if (selected) {
        array = array.filter((obj) => obj.id !== item.id);
      } else {
        array = array.concat([item]);
      }

      dispatch({
        type: 'category/changeMyCategory',
        payload: {
          myCategory: array,
        },
      });
    }
  };
  _onDataChange = (data: ICategory[]) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'category/changeMyCategory',
      payload: {
        myCategory: data,
      },
    });
  };
  renderItem = (
    item: string,
    index: number,
    classifyGroup: _.Dictionary<ICategory[]>,
    isEdit: boolean,
  ) => {
    const { myCategory } = this.props;
    return (
      <View key={item}>
        <Text style={layout.groupTitle}>{item}</Text>
        <View style={layout.listBg}>
          {classifyGroup[item].map((classify, index) => {
            if (myCategory.find((selItem) => selItem.id === classify.id)) {
              return null;
            }
            return (
              <TouchableOpacity
                onLongPress={this.onItemLongPress}
                key={classify.id}
                onPress={() => this.onItemPress(classify, false, index)}>
                <CategoryItem
                  data={classify}
                  selected={false}
                  isEdit={isEdit}
                  style={layout.listBtn}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  _myCategoryRender = (item: ICategory, index: number) => {
    const { isEdit } = this.props;
    return (
      <View key={item.id}>
        <CategoryItem
          data={item}
          key={item.id}
          selected={true}
          isEdit={isEdit}
          disable={index < 2}
        />
      </View>
    );
  };

  render() {
    const { category, isEdit, myCategory } = this.props;
    const classifyGroup = lodash.groupBy(category, (item) => item.classify);
    return (
      <ScrollView scrollEnabled={false}>
        <Text style={layout.groupTitle}>我的分类</Text>
        <View style={layout.listBg}>
          <DragSortableView
            dataSource={myCategory}
            keyExtractor={(item) => item.id}
            onDataChange={this._onDataChange}
            childrenHeight={40}
            childrenWidth={(viewportWidth - 15 * 5) / 4}
            parentWidth={viewportWidth}
            marginChildrenLeft={15}
            marginChildrenTop={15}
            sortable={isEdit}
            fixedItems={[0, 1]}
            onClickItem={(data, item: ICategory, index: number) => {
              this.onItemPress(item, true, index);
            }}
            renderItem={this._myCategoryRender}
          />
        </View>
        <View>
          {Object.keys(classifyGroup).map((item, index) =>
            this.renderItem(item, index, classifyGroup, isEdit),
          )}
        </View>
      </ScrollView>
    );
  }
}
const layout = StyleSheet.create({
  groupTitle: {
    marginHorizontal: 15,
    marginTop: 15,
    fontSize: 16,
  },
  listBg: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listBtn: {
    marginTop: 15,
    marginLeft: 15,
  },
});
export default connector(Category);
