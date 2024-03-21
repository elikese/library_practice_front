/** @jsxImportSource @emotion/react */
import axios from "axios";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import RightTopButton from "../../components/RightTopButton/RightTopButton";
import { useInput } from "../../hooks/useInput";
import * as s from "./style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OAuth2SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername, userNameChange] = useInput();
  const [password, setPassword, passwordChange] = useInput();
  const [checkPassword, setCheckPasswordValue, checkPasswordChange] = useInput();
  const [name, setName, nameChange] = useInput();
  const [email, setEmail, emailChange] = useInput();
  const [messageGroup, setMessageGroup] = useState({
    username: null,
    password: null,
    checkPassword: null,
    name: null,
    email: null
  });


  const handleCheckPassword = (e) => {
    if (!!e.target.value) {
      setMessageGroup(messageGroup => {
        return {
          ...messageGroup,
          checkPassword: {
            type: checkPassword === password ? "success" : "error",
            text: checkPassword === password ? "" : "비밀번호가 서로 일치하지 않습니다."
          }
        }
      })
    }
  }

  const handleSignupSubmit = () => {
    if (messageGroup?.checkPassword?.type === "error") {
      alert("비밀번호가 서로 일치하지 않습니다!")
      return;
    }

    if (!checkPassword) {
      setMessageGroup(messageGroup => {
        return {
          ...messageGroup,
          checkPassword: {
            type: "error",
            text: "비밀번호를 입력하세요"
          }
        }
      })
    }

    const signupData = {
      username,
      password,
      checkPassword,
      name,
      email
    }

    const signupRequest = async (signupData) => {

      try {
        const response = await axios.post("http://localhost:8080/auth/signup", signupData);
        if (response.data) {
          navigate("/auth/signin");
        }
      } catch (error) {
        const errorMap = error.response.data;
        const entries = Object.entries(errorMap);

        let newMessageGroup = {
          username: {
            type: "success",
            text: "Good✅"
          },
          password: {
            type: "success",
            text: "Good✅"
          },
          checkPassword: {
            type: "success",
            text: ""
          },
          name: {
            type: "success",
            text: "Good✅"
          },
          email: {
            type: "success",
            text: ""
          },
        };

        for (let [key, value] of entries) {
          newMessageGroup = {
            ...newMessageGroup,
            [key]: {
              type: "error",
              text: value
            }
          }
        }

        if (newMessageGroup.password.type === "error") {
          newMessageGroup = {
            ...newMessageGroup,
            checkPassword: null
          }
          setPassword(() => "");
          setCheckPasswordValue(() => "");
        }

        setMessageGroup(() => newMessageGroup);
      }
    }

    signupRequest(signupData);

  }

  return (
    <>
      <div css={s.header}>
        <h1>회원가입</h1>
        <RightTopButton onClick={handleSignupSubmit}>가입하기</RightTopButton>
      </div>
      <AuthPageInput type={"text"} name={"username"} placeholder={"아이디"} value={username} onChange={userNameChange} message={messageGroup.username} />
      <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} message={messageGroup.password} />
      <AuthPageInput type={"password"} name={"checkPassword"} placeholder={"비밀번호 확인"} value={checkPassword} onChange={checkPasswordChange} onBlur={handleCheckPassword} message={messageGroup.checkPassword} />
      <AuthPageInput type={"text"} name={"name"} placeholder={"성명"} value={name} onChange={nameChange} message={messageGroup.name} />
      <AuthPageInput type={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange} message={messageGroup.email} />
    </>
  );
}

export default OAuth2SignupPage;