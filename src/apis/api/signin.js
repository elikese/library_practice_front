import instance from "../utils/instance"

export const signinRequest = async (data) => {
  const response = instance.post("/auth/signin", data)
  return response;
}