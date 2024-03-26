import { useState } from "react"

export const useReactSelect = (defaultValue) => {
  const [option, setOption] = useState(defaultValue);

  const handleOnChange = (option) => {
    console.log(option)
    setOption(() => option);
  }

  return { option, setOption, handleOnChange, defaultValue }
}