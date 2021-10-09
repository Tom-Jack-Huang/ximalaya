import { Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(pre: number) {
  const value = (pre * viewportWidth) / 100;
  return Math.round(value);
}

function hp(pre: number) {
  const value = (pre * viewportHeight) / 100;
  return Math.round(value);
}
function getTimeString(seconds: number) {
  const m = parseInt((seconds % (60 * 60)) / 60 + '', 10);
  const s = parseInt((seconds % 60) + '', 10);

  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}
export { viewportWidth, viewportHeight, wp, hp, getTimeString };
