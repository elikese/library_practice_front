import { css } from "@emotion/react";

export const bookCard = css`
    display: flex;
    width: 97%;
    height: 120px;
    margin: auto;
    margin-top: 5px;
    padding: 5px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
`

export const leftBox = css`
    width: 20%;
    height: 100%;
    &>img {
        height: 100%;
    }
`
export const middleBox = css`
    box-sizing: border-box;
    padding: 5px 10px;
    display: flex;
    width: 60%;
    height: 100%;
    border-right: 1px solid #dbdbdb;
    border-left: 1px solid #dbdbdb;
`
export const rightBox = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 20%;
    height: 100%;
    padding: 5px 10px;
`

export const textBox = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 14px;
    width: 50%;
`