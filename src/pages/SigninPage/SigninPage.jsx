/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useInput } from "../../hooks/useInput";
import RightTopButton from "../../components/RightTopButton/RightTopButton";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import { Link } from "react-router-dom";
import { signinRequest } from "../../apis/api/signin";
import { motion } from "framer-motion";
import googleImg from "../../assets/loginbuttons/Login_google.png";
import kakaoImg from "../../assets/loginbuttons/Login_kakao.png";
import naverImg from "../../assets/loginbuttons/Login_naver.png";
import { getToken } from "firebase/messaging";
import { messaging } from "../../apis/firebase/config/firebaseConfig";
import instance from "../../apis/utils/instance";

function SigninPage() {
    const [username, usernameChange] = useInput();
    const [password, passwordChange] = useInput();

    const handleSigninSubmit = () => {
        signinRequest({
            username,
            password,
        })
            .then((response) => {
                const accessToken = response?.data;
                localStorage.setItem("AccessToken", accessToken);
                window.location.replace("/");
            })
            .catch((error) => {
                alert(error.response?.data);
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSigninSubmit();
        }
    };

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
                <div css={s.header}>
                    <h1>로그인</h1>
                    <RightTopButton onClick={handleSigninSubmit}>로그인하기</RightTopButton>
                </div>
                <AuthPageInput
                    type={"text"}
                    name={"username"}
                    placeholder={"아이디"}
                    value={username}
                    onChange={usernameChange}
                />
                <AuthPageInput
                    type={"password"}
                    name={"password"}
                    placeholder={"비밀번호"}
                    value={password}
                    onChange={passwordChange}
                />
                <Link to={"/auth/signup"} css={s.signupButton}>
                    회원가입
                </Link>
                <div css={s.loginMenuBox}>
                    <div css={s.loginBox}>
                        <a href="http://localhost:8080/oauth2/authorization/kakao">
                            <img src={kakaoImg} alt="카카오로그인" />
                        </a>
                    </div>
                    <div css={s.loginBox}>
                        <a href="http://localhost:8080/oauth2/authorization/google">
                            <img src={googleImg} alt="구글로그인" />
                        </a>
                    </div>
                    <div css={s.loginBox}>
                        <a href="http://localhost:8080/oauth2/authorization/naver">
                            <img src={naverImg} alt="네이버로그인" />
                        </a>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default SigninPage;
