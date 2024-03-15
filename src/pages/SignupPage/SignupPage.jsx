/** @jsxImportSource @emotion/react */
import axios from "axios";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import RightTopButton from "../../components/RightTopButton/RightTopButton";
import { useInput } from "../../hooks/useInput";
import * as s from "./style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupRequest } from "../../apis/api/signup";

function SignupPage(props) {
  const navigate = useNavigate();
  const [username, userNameChange, userNameMessage, setUsernameValue, setUsernameMessage] = useInput("username");
  const [password, passwordChange, passwordMessage] = useInput("password");
  const [checkPassword, checkPasswordChange] = useInput("cheeckMessage");
  const [name, nameChange, nameMessage] = useInput("name");
  const [email, emailChange, emailMessage] = useInput("email");
  const [checkPasswordMessage, setCheckPasswordMessage] = useState(null);

  useEffect(() => {
    if (!checkPassword || !password || passwordMessage.type === "error") {
      setCheckPasswordMessage(() => null);
      return;
    }

    if (checkPassword === password) {
      setCheckPasswordMessage(() => {
        return {
          type: "success",
          text: ""
        }
      })
    } else {
      setCheckPasswordMessage(() => {
        return {
          type: "error",
          text: "비밀번호가 일치하지 않습니다"
        }
      })
    }

  }, [checkPassword, password])

  const handleSignupSubmit = () => {
    const checkFlags = [
      userNameMessage?.type,
      passwordMessage?.type,
      checkPasswordMessage?.type,
      nameMessage?.type,
      emailMessage?.type
    ];

    if (checkFlags.includes("error") || checkFlags.includes(undefined) || checkFlags.includes(null)) {
      alert("가입 정보를 다시 확인하여 입력하십시오");
      return;
    }

    signupRequest({
      username,
      password,
      name,
      email
    }).then(response => {
      console.log(response);
      if (response.status === 201) {
        navigate("/auth/signin");
      }
    }).catch(error => {
      if (error.response.status === 400) {
        const errorMap = error.response.data;
        const errorEntries = Object.entries(errorMap);
        for (let [k, v] of errorEntries) {
          if (k === "username") {
            setUsernameMessage(() => {
              return {
                type: "error",
                text: v
              }
            });
          }
        }
      } else {
        alert("회원가입이 실패하였습니다");
      };
    });
    
  }

  return (
    <>
      <div css={s.header}>
        <h1>회원가입</h1>
        <RightTopButton onClick={handleSignupSubmit}>가입하기</RightTopButton>
      </div>
      <AuthPageInput type={"text"} name={"username"} placeholder={"아이디"} value={username} onChange={userNameChange} message={userNameMessage} />
      <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} message={passwordMessage} />
      <AuthPageInput type={"password"} name={"checkPassword"} placeholder={"비밀번호 확인"} value={checkPassword} onChange={checkPasswordChange} message={checkPasswordMessage} />
      <AuthPageInput type={"text"} name={"name"} placeholder={"성명"} value={name} onChange={nameChange} message={nameMessage} />
      <AuthPageInput type={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange} message={emailMessage} />
    </>
  );
}

export default SignupPage;