/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput"
import { useInput } from "../../hooks/useInput"
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { useMutation } from "react-query";
import editPasswordRequest from "../../apis/api/editPassword";


function PasswordEditPage(props) {
  useAuthCheck();

  const [oldPassword, handleOldPassword, oldMessage, setOld, setOldMessage] = useInput("oldPassword");
  const [newPassword, handleNewPassword, newMessage, setNew, setNewMessage] = useInput("newPassword");
  const [newPasswordCheck, handleNewPasswordCheck, newCheckMessage, setNewCheck, setNewChekMessage] = useInput("newPasswordCheck");

  const editPasswordMutation = useMutation({
    mutationKey: "editPasswordMutation",
    mutationFn: editPasswordRequest,
    onSuccess: response => {
      alert("비밀번호 변경 완료 \n다시 로그인 하시오");
      localStorage.removeItem("AccessToken");
      window.location.replace("/auth/signin");
    },
    onError: error => {
      if (error.response.status === 400) {
        const errorMap = error.response.data;
        const errorEntries = Object.entries(errorMap);
        setOldMessage(() => null);
        setNewMessage(() => null);
        setNewChekMessage(() => null);
        for (let [k, v] of errorEntries) {
          const message = {
            type: "error",
            text: v
          }
          if (k === "oldPassword") {
            setOldMessage(() => message)
          }
          if (k === "newPassword") {
            setNewMessage(() => message)
          }
          if (k === "newPasswordCheck") {
            setNewChekMessage(() => message)
          }
        }
      }
    }
  });


  const handleEditSubmitClick = () => {
    if (!window.confirm("수정하시겠습니까?")) {
      return;
    }
    editPasswordMutation.mutate({
      oldPassword: oldPassword,
      newPassword: newPassword,
      newPasswordCheck: newPasswordCheck
    });

  }

  return (
    <div>
      <h1>비밀번호 변경</h1>
      <AuthPageInput type={"password"} value={oldPassword} onChange={handleOldPassword} message={oldMessage} placeholder={"현재 비밀번호를 입력"} />
      <AuthPageInput type={"password"} value={newPassword} onChange={handleNewPassword} message={newMessage} placeholder={"변경할 비밀번호를 입력"} />
      <AuthPageInput type={"password"} value={newPasswordCheck} onChange={handleNewPasswordCheck} message={newCheckMessage} placeholder={"변경할 비밀번호를 확인"} />
      <button onClick={handleEditSubmitClick}>비밀번호 변경하기</button>
    </div>
  );
}

export default PasswordEditPage;