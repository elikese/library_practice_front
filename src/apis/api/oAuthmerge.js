import instance from "../utils/instance"

const oAuthmergeRequest = async (data) => {
  return await instance.post("auth/oauth2/merge", data);
}

export default oAuthmergeRequest;