import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin: 5px 0px;
`;

export const pageNumbers = css`
    box-sizing: border-box;
    display: flex;
`
export const pageButton = (isSelected) => css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-collapse: collapse;
    margin-right: 3px;
    border: ${isSelected ? "none" : "2px solid #dbdbdb"};
    border-radius: 3px;
    padding: 2px 5px;
    height: 30px;
    width: 35px;
    background-color: ${isSelected ? "#cccccc" : "#fafafa"};
    text-decoration: none;
    font-size: ${isSelected ? "15px" : "12px"};
    font-weight: ${isSelected ? 700 : 500};
    color: black;
`

export const pageCount = css`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 0;
    width: 150px;
    border: 2px solid #dbdbdb;
    border-radius: 3px;
    font-size: 10px;
    cursor: default;
    & > div {
        border-bottom: 1px solid #dbdbdb
    }
    
`

export const pageInputBox = css`
    position: relative;
    padding-left: 1px;
    & > input {
        width: 140px;
        border: none;
        border-bottom: 1px solid #dbdbdb;
        outline: none;
        font-size: 9px;
        background-color: #fafafa;
    }
    & > button {
        position: absolute;
        top: 0px;
        right: 1px;
        height: 13px;
        font-size: 9px;
        background-color: transparent;
        border: none;
        border-radius: 3px;
        &:hover {
            border-radius: 3px;
            background-color: #eeeeee;
            cursor: pointer;
        }
    }
`