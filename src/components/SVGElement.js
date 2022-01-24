import React from 'react';

const SVGElement = ({icon, size, style, width, height}) => {
  const Icon = icon;
  return (
    <Icon
      style={style}
      width={size || width || style?.width || 20}
      height={size || height || style?.height || 20}
    />
  );
};

export default SVGElement;
