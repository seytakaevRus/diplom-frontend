import React, { memo } from 'react';

export const MarkdownImage = memo((props) => (
  <img
    {...props}
    style={{
      width: '300px',
    }}
    alt="something"
  />
));
