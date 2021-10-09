import React, { Component } from 'react';
import SnapCarousel, {
  AdditionalParallaxProps,
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import { hp, viewportWidth, wp } from '@/utils/index';
import { StyleSheet, View } from 'react-native';
import { ICarousel } from '@/models/home';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';

const sliderWidth = viewportWidth;
const itemWidth = wp(90) + wp(2) * 2;
export const sideHeight = hp(26);
const mapStateToProps = ({ home }: RootState) => ({
  carousel: home.carousel,
  activeDotIndex: home.activeDotIndex,
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  namespace: string;
}

class Carrousel extends Component<IProps> {
  componentDidMount() {
    const { dispatch, namespace } = this.props;
    dispatch({
      type: namespace + '/getCarouselList',
    });
  }

  _renderItem = (
    { item }: { item: ICarousel },
    parallaxProps: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{ uri: item.image }}
        style={styles.image}
        containerStyle={styles.imageContainer}
        {...parallaxProps}
        showSpinner
        spinnerColor={'rgba(0,0,0,0.25)'}
      />
    );
  };

  onSnapToItem = (index: number) => {
    const { dispatch, namespace } = this.props;
    dispatch({
      type: namespace + '/setState',
      payload: {
        activeDotIndex: index,
      },
    });
  };

  render() {
    const { carousel, activeDotIndex } = this.props;
    return (
      <View>
        <SnapCarousel
          data={carousel}
          // @ts-ignore
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages
          loop
          autoplay
          onSnapToItem={this.onSnapToItem}
        />
        <View style={styles.paginationBg}>
          <Pagination
            dotsLength={carousel.length}
            activeDotIndex={activeDotIndex}
            containerStyle={styles.pagination}
            dotContainerStyle={styles.dotContainer}
            dotStyle={styles.dot}
            inactiveDotScale={0.7}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imageContainer: {
    paddingVertical: 5,
    height: hp(26),
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationBg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
});
export default connector(Carrousel);
