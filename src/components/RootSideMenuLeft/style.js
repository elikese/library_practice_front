import { css } from "@emotion/react";

export const layout = (show) => css`
    transition: all 0.5s ease-in-out;
    opacity: ${show ? 1 : 0};
    position: absolute;
    top: 0;
    left: ${show ? "0px" : "-200px"};
    box-sizing: border-box;
    border-right: 1px solid #dbdbdb;
    padding: 15px 0px;
    width: 200px;
    height: 100%;
    background-color: #fafafa;
`;

export const header = css`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    padding: 0px 10px;
    width: 100%;
    height: 50px;
`;

export const menuButton = css`
    box-sizing: border-box;
    border: none;
    padding: 10px;
    background-color: transparent;
    cursor: pointer;

    & > * {
        font-size: 16px;
    }
`;

export const profile = css`
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #dbdbdb;
    width: 100%;
    height: 150px;
`;

export const userImgBox = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    font-size: 40px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
`;

export const settingBtn = css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 20px;
    width: 25px;
    height: 25px;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

export const menuList = css`

`;

export const loginbuttonBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;

    & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-bottom: 1px solid #dbdbdb;
    padding: 0px 20px;
    height: 40px;
    width: 100%;
    background-color: #fdfdfd;
    color: #222222;
        cursor: pointer;
        & > h1 {
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
        }
    }
`;

export const menuLink = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    padding: 0px 20px;
    height: 40px;
    background-color: #fdfdfd;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    color: #222222;
`;

export const profileTextBox = css`
    cursor: default;
    border-bottom: 1px solid #dbdbdb;
    padding: 2px 5px;
    font-size: 14px;
    font-weight: 400;
    text-decoration: none;
`;