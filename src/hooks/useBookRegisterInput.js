import { useState } from "react"

export const useBookRegisterInput = ({ enterFn, ref }) => {
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    setValue(() => e.target.value);
  }

  const handleOnKeyUp = (e) => {
    if (e.keyCode === 13) {
      enterFn(ref);
    }
  }

  return { value, handleOnChange, setValue };
}