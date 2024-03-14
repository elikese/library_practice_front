import { css } from "@emotion/react";

export const inputBox = css`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
`;

export const input = css`
    box-sizing: border-box;
    outline: none;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    padding: 5px 20px 5px 10px;
    width: 100%;
    background-color: white;
    font-size: 14px;

    &:focus {
        background-color: #f1f1f1;
    }
`;

export const messageBox = (type) => css`
    padding: 5px 10px;
    width: 100%;
    color: ${type === "error" ? "#ff6161" : "#29df4aff"};
    font-size: 11px;
    font-weight: 600;
`;

export const inputIcon = (type) => css`
    position: absolute;
    top: 5px;
    right: 5px;
    color: ${type === "error" ? "#ff6161" : "#29df4aff"};
`;