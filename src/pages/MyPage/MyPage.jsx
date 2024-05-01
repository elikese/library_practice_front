/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import * as s from "./style";
import { useMutation, useQueryClient } from "react-query";
import { sendAuthMailRequest } from "../../apis/api/sendAuthMail";
import FullsizeLoader from "../../components/FullSizeLoader/FullSizeLoader";
import { GoCheckCircleFill } from "react-icons/go";
import { motion } from "framer-motion";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { Link, useNavigate } from "react-router-dom";

function MyPage() {
    useAuthCheck();
    const navigate = useNavigate();
    const fileRef = useRef();
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("PrincipalQuery");
    // useMutation => post요청 제외 모두
    const sendAuthMailMutation = useMutation({
        mutationKey: "sendAuthMailMutation",
        mutationFn: sendAuthMailRequest,
        retry: 0,
        onSuccess: (response) => {
            if (response.data) {
                alert("메일 전송을 완료하였습니다.");
            } else {
                alert("메일 전송을 실패하였습니다.");
            }
        },
    });

    const handleSendAuthMailClick = () => {
        sendAuthMailMutation.mutate(); // mutationFn 호출
    };

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
                <div css={s.layout}>
                    {sendAuthMailMutation.isLoading ? <FullsizeLoader size={"25px"} /> : <></>}
                    <div css={s.header}>
                        <div css={s.imgBox}>
                            <div
                                css={s.profileImg}
                                onClick={() => {
                                    fileRef.current.click();
                                }}
                            >
                                <img
                                    src="https://pbs.twimg.com/profile_images/1641252178450083841/Cn2MUfHG_400x400.jpg"
                                    alt="profileImage"
                                />
                                <input type="file" style={{ display: "none" }} ref={fileRef} />
                            </div>
                        </div>
                        <div css={s.infoBox}>
                            <div css={s.infoText}>사용자이름: {principalData?.data.username}</div>
                            <div css={s.infoText}>
                                이름: {principalData?.data.name}
                                {principalData?.data.authorities.filter((auth) => auth.authority === "ROLE_ADMIN")
                                    .length === 0 ? (
                                    <></>
                                ) : (
                                    " ( 🔐관리자 )"
                                )}
                            </div>
                            <div css={s.emailBox}>
                                <div css={s.infoText}>이메일: {principalData?.data.email}</div>
                                {principalData?.data.authorities.filter((auth) => auth.authority === "ROLE_USER")
                                    .length === 0 ? (
                                    <button css={s.infoButton} onClick={handleSendAuthMailClick}>
                                        인증하기
                                    </button>
                                ) : (
                                    <div css={s.emailCheck}>
                                        {" "}
                                        <GoCheckCircleFill />
                                        인증완료{" "}
                                    </div>
                                )}
                            </div>
                            <div css={s.infoButtonBox}>
                                <button css={s.infoButton} onClick={() => navigate("/account/edit/password")}>
                                    정보 수정
                                </button>
                                <button css={s.infoButton} onClick={() => navigate("/account/edit/password")}>
                                    비밀번호 수정
                                </button>
                                {principalData?.data.authorities.filter((auth) => auth.authority === "ROLE_ADMIN")
                                    .length === 0 ? (
                                    <></>
                                ) : (
                                    <button
                                        css={s.infoButton}
                                        onClick={() => navigate("/admin/book/management?page=1")}
                                    >
                                        🔐통합도서관리
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div css={s.bottom}></div>
                </div>
            </motion.div>
        </>
    );
}

export default MyPage;
