export const REGEX = {
  username: {
    regexr: /^[A-Za-z0-9]{5,10}$/,
    text: "영문자, 숫자포함하여 5~10자리"
  },
  password: {
    regexr: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,128}$/,
    text: "영문자, 숫자, 특수문자 포함하여 8~128자리"
  },
  name: {
    regexr: /^(?=.*[가-힇])^[가-힇]{1,10}$/,
    text: "한글만 입력 할 수 있습니다"
  },
  email: {
    regexr: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    text: "이메일 형식이어야 합니다"
  }
}