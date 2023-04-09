import React, { memo } from 'react';

type MarkdownMediaType = 'img' | 'video' | 'gif';

const markdownStyle = {
  height: 'auto',
  maxWidth: '100%',
};

export const MarkdownMedia = memo((props: any) => {
  const mediaType: MarkdownMediaType = props.src
    .split('/')
    .at(-1)
    .split('_')[0];

  if (mediaType === 'img') {
    return <img {...props} style={markdownStyle} alt="something" />;
  } else if (mediaType === 'gif') {
    return (
      <video loop muted autoPlay playsInline style={markdownStyle}>
        <source {...props} />
      </video>
    );
  }

  return (
    <video loop playsInline controls style={markdownStyle}>
      <source {...props} />
    </video>
  );
});
