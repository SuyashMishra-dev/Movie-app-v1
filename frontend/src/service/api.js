const { default: axios } = require("axios");
const { BASE_URL, endPoints } = require("../config");

export const getApi = async (endPoints) => {
  const url = `${BASE_URL}/${endPoints}`;
  return await axios.get(url);
};

export const postApi = async (endPoints, payload) => {
  const url = `${BASE_URL}/${endPoints}`;
  return await axios({
    url,
    method: "POST",
    data: payload,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
