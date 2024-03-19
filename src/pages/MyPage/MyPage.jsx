/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import * as s from "./style";
import { useQueryClient } from "react-query";
import { FiUserCheck } from "react-icons/fi";

function MyPage() {
    const fileRef = useRef();
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("PrincipalQuery");

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
                    <div css={s.infoText}>사용자이름: {principalData.data.username}</div>
                    <div css={s.infoText}>이름: {principalData.data.name}</div>
                    <div css={s.emailBox}>
                        <div css={s.infoText}>이메일: {principalData.data.email}</div>
                        {
                            principalData.data.authorities.filter(auth => auth.authority === "ROLE_USER").length === 0
                                ? <button css={s.infoButton}>인증하기</button>
                                : "　✅인증완료"
                        }

                    </div>
                    <div>
                        <button>정보 수정</button>
                        <button>비밀번호 수정</button>
                    </div>
                </div>
            </div>
            <div css={s.bottom}>

            </div>

        </div>
    );
}

export default MyPage;