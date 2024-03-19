import React from 'react';
import { GridLoader } from 'react-spinners';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function FullSizeLoader() {
  return (
    <div css={s.layout}>
      <GridLoader color="#dbdbdb" />
    </div>
  );
}

export default FullSizeLoader;