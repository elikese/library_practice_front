/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


const inputBox = css`
  box-sizing: border-box;
  border: none;
  outline: none;
  padding: 0px 10px;
  width: 100%;
  height: 100%;
`

function BookRegisterInput({ value, onChange, onKeyUp, ref }) {


  return (
    <input
      css={inputBox}
      type="text"
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      ref={ref}
    />
  );
}

export default BookRegisterInput;