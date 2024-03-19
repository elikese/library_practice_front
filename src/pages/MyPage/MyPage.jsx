/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import * as s from "./style";

function MyPage(props) {

    const fileRef = useRef();


    return (
        <div css={s.layout}>
            <div css={s.header}>
                <div css={s.imgBox}>
                    <div css={s.profileImg} onClick={() => { fileRef.current.click() }} >
                        <img src="https://pbs.twimg.com/profile_images/1641252178450083841/Cn2MUfHG_400x400.jpg" alt="profileImage" />
                        <input type="file" style={{ display: "none" }} ref={fileRef} />
                    </div>
                </div>
                <div css={s.infoBox}>
                    <div css={s.infoText}></div>
                    <div css={s.infoText}></div>
                    <div>
                        <div css={s.infoText}></div>
                        <button>버튼임</button>
                    </div>
                    <div></div>
                </div>
            </div>
            <div css={s.bottom}>

            </div>

        </div>
    );
}

export default MyPage;