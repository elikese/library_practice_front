import { css } from "@emotion/react";

export const button = css`
    transition: all 0.3s ease-in-out;
    border: none;
    padding: 10px;
    background-color: transparent;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        text-shadow: 0px 0px 1px ;
        font-size: 14px;
    }
    &:active{
        text-shadow: 0px 0px 5px ;
    }
`;