/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { forwardRef } from "react";


const inputBox = css`
  box-sizing: border-box;
  border: none;
  outline: none;
  padding: 0px 10px;
  width: 100%;
  height: 100%;
`

const BookRegisterInput = forwardRef((props, ref) => {
  const { value, onChange, onKeyDown } = props;
  return (
    <input
      css={inputBox}
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={ref}
    />
  );
});

export default BookRegisterInput;