import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    position: relative;
    justify-content: space-around;
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
    & > h1 {
        font-size: 40px;
    }
`;

export const imgBox = css` 
    position: absolute;
    top: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    & > img {
    height: 70%;
    overflow: hidden;
    height: 250px;
    margin-bottom: 70px;
    }
`;
