import React from 'react';
import { GridLoader } from 'react-spinners';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function FullSizeLoader({ size }) {
  return (
    <div css={s.layout}>
      <GridLoader color="#dbdbdb" size={size} />
    </div>
  );
}

export default FullSizeLoader;