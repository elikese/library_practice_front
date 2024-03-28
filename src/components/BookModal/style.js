import { css } from "@emotion/react";

export const layout = css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #03030390;
    width: 100%;
    height: 100%;
    transition: all 1s ease-in-out;
`;


export const modalLayout = css`
    box-sizing: border-box;
    width: 50%;
    height: 50%;
    background-color: #fafafa;
    opacity: 1;
`