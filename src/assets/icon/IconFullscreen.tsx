/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconFullscreen: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M169.7 890.4c-8.7 0-17.4-3.3-24-9.9-13.2-13.2-13.2-34.7 0-48l200.9-200.9c13.2-13.2 34.7-13.2 48 0 13.2 13.2 13.2 34.7 0 48L193.7 880.5c-6.6 6.6-15.3 9.9-24 9.9zM659.5 400.5c-8.7 0-17.4-3.3-24-9.9-13.2-13.2-13.2-34.7 0-48L825 153.1c13.2-13.2 34.7-13.2 48 0 13.2 13.2 13.2 34.7 0 48L683.4 390.6c-6.6 6.6-15.3 9.9-23.9 9.9zM856 895.2c-8.8 0-17.5-3.4-24.2-10.1L632.7 683c-13.2-13.3-13-34.8 0.3-48 13.3-13.2 34.8-13 48 0.3l199.2 202.1c13.2 13.3 13 34.8-0.3 48-6.7 6.5-15.3 9.8-23.9 9.8zM368.8 402.8c-8.8 0-17.5-3.4-24.1-10.1L153.2 198.6c-13.2-13.3-13-34.8 0.3-48 13.3-13.2 34.8-13 48 0.3L393 345c13.2 13.3 13 34.8-0.3 48-6.7 6.5-15.3 9.8-23.9 9.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M134.1 453.7c-18.7 0-33.9-15.2-33.9-33.9V205.2c0-57.7 46.9-104.6 104.6-104.6h201.5c18.7 0 33.9 15.2 33.9 33.9s-15.2 33.9-33.9 33.9H204.8c-20.3 0-36.8 16.5-36.8 36.8v214.6c0 18.7-15.1 33.9-33.9 33.9zM894 453.7c-18.7 0-33.9-15.2-33.9-33.9V205.2c0-20.3-16.5-36.8-36.8-36.8H631.2c-18.7 0-33.9-15.2-33.9-33.9s15.2-33.9 33.9-33.9h192.1c57.7 0 104.6 46.9 104.6 104.6v214.6c0 18.7-15.2 33.9-33.9 33.9zM406.4 925.9H204.8c-57.7 0-104.6-46.9-104.6-104.6V606.8c0-18.7 15.2-33.9 33.9-33.9S168 588 168 606.8v214.6c0 20.3 16.5 36.8 36.8 36.8h201.5c18.7 0 33.9 15.2 33.9 33.9s-15.1 33.8-33.8 33.8zM823.3 925.9H631.2c-18.7 0-33.9-15.2-33.9-33.9s15.2-33.9 33.9-33.9h192.1c20.3 0 36.8-16.5 36.8-36.8V606.8c0-18.7 15.2-33.9 33.9-33.9s33.9 15.2 33.9 33.9v214.6c0 57.6-46.9 104.5-104.6 104.5z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconFullscreen.defaultProps = {
  size: 18,
};

IconFullscreen = React.memo ? React.memo(IconFullscreen) : IconFullscreen;

export default IconFullscreen;
