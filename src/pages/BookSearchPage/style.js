import { css } from "@emotion/react";

export const layout = css`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 100%;
`;
export const header = css`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 2px solid #dbdbdb;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  height: 13%;
  
  `;
export const container = css`
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid #dbdbdb;
  padding: 10px;
  width: 100%;
  height: 380px;
`;

export const searchBar = css`
    display: flex;
    justify-content: center;
    width: 70%;
    & > input {
        outline: none;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        margin-left: 10px;
        width: 300px;
    }
    & > button {
        margin-left: 5px;
        border: none;
        border-radius: 4px;
        width: 80px;
        cursor: pointer;

        &:hover {
            background-color: #dddddd;
        }
        &:active {
            background-color: #fafafa;
        }
    }
`;

export const resultPage = css`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    background-color: white;
    overflow: auto;
    &::-webkit-scrollbar {
        box-sizing: border-box;
        width: 10px;
        height: 10px;
        background-color: #fdfdfd;
    }

    &::-webkit-scrollbar-thumb {
        box-sizing: border-box;
        border: 1px solid #fafafa;
        background-color: #dbdbdb;
    }
`

