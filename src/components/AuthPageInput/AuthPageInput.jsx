/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";


function AuthPageInput(props) {
  const { type, name, placeholder, onChange, value, ref, onBlur, message } = props;

  return (
    <div css={s.inputBox}>
      <input
        css={s.input}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
        onBlur={onBlur}
      />
      {
        !!message && message.type === "error" &&
        <div css={s.inputIcon(message.type)}>
          <MdErrorOutline />
        </div>
      }
      {
        !!message && message.type === "success" &&
        <div css={s.inputIcon(message.type)}>
          <MdCheckCircleOutline />
        </div>
      }
      {
        !!message &&
        <div css={s.messageBox(message.type)}>
          {message.text}
        </div>
      }
    </div>
  );
}

export default AuthPageInput;