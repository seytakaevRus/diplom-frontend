import React, { memo } from 'react';

export const MarkdownImage = memo((props) => (
  <img
    {...props}
    style={{
      height: 'auto',
      maxWidth: '100%'
    }}
    alt="something"
  />
));
