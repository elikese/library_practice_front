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
    &:disabled {
        background-color: white;
        cursor: no-drop;
        color: #666666;
    }
`;

const BookRegisterInput = forwardRef((props, ref) => {
    const { value, onChange, onKeyDown, isDisabled } = props;
    return (
        <input
            css={inputBox}
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            ref={ref}
            disabled={isDisabled}
        />
    );
});

export default BookRegisterInput;
