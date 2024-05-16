import React from 'react';

const HTMLRenderer = ({ htmlContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default HTMLRenderer;
