/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useInput } from "../../hooks/useInput";
import RightTopButton from "../../components/RightTopButton/RightTopButton";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import oAuthmergeRequest from "../../apis/api/oAuthmerge";
import { motion } from 'framer-motion';

function OAuthMergePage(props) {
  const [username, usernameChange] = useInput();
  const [password, passwordChange] = useInput();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const oAuth2MegerMutation = useMutation({
    mutationKey: "oAuth2MegerMutation",
    mutationFn: oAuthmergeRequest,
    onSuccess: response => {
      alert("계정통합이 완료되었습니다 \n 다시 로그인 하세요.")
      window.location.replace("/auth/signin");
    },
    onError: error => {
      alert(error.response.data);
    }
  });

  const handleSigninSubmit = () => {
    oAuth2MegerMutation.mutate({
      username: username,
      password: password,
      oauth2Name: searchParams.get("name"),
      providerName: searchParams.get("provider")
    });
  }

  return (
    <>
      <motion.div
        initial={{ "opacity": 0 }}
        animate={{ "opacity": 1 }}
        exit={{ "opacity": 1 }}
      >
        <div css={s.header}>
          <h1>계정 통합 로그인</h1>
          <RightTopButton onClick={handleSigninSubmit}>계정통합하기</RightTopButton>
        </div>

        <AuthPageInput type={"text"} name={"username"} placeholder={"아이디"} value={username} onChange={usernameChange} />
        <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} />
      </motion.div >
    </>
  );
}

export default OAuthMergePage;