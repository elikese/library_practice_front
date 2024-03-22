import instance from "../utils/instance"

const editPasswordRequest = async (data) => {
  return await instance.put("/account/password", data);
}

export default editPasswordRequest;