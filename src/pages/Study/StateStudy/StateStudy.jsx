import { useEffect, useState } from "react";
import Box from "../Box/Box";
import Box2 from "../Box2/Box2";


function StateStudy() {
  const inputState = useState("");
  const inputState2 = useState("");

  console.log("렌더링");

  useEffect(() => {
    console.log({ inputA: inputState });
    return () => {
      console.log("inputA 마운트 해제")
    }
  }, [inputState[0]]);

  useEffect(() => {
    console.log({ inputB: inputState2 });
    return () => {
      console.log("inputB 마운트 해제")
    }
  }, [inputState2[0]]);

  console.log("렌더링2");

  const handleTextInputOnChange = (e) => {
    if (e.target.name === "inputA") {
      const [value, setValue] = inputState;
      setValue(() => e.target.value);
    }
    if (e.target.name === "inputB") {
      const [value, setValue] = inputState2;
      setValue(() => e.target.value);
    }
  }

  return (
    <div>
      <input
        type="text"
        name="inputA"
        onChange={handleTextInputOnChange}
      />
      <input
        type="text"
        name="inputB"
        onChange={handleTextInputOnChange}
      />
      <Box vlaue={inputState[0]} />
      <Box2 value={inputState2[0]} />
    </div>
  );
}

export default StateStudy;