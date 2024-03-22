import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const pageContainer = css`   
    display: flex;
    justify-content: center;
    align-items: center;
    width: 766px;
    height: 100px;
    margin-top: 50px;
    & > h1 {
        font-size: 50px;
    }
`;

export const imgBox = css` 
    position: absolute;
    top: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
    height: 70%;
    overflow: hidden;
    height: 250px;
    margin-bottom: 70px;
    }
`;
