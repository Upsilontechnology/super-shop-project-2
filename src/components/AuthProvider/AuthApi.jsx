import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const axios = useAxiosPrivate();

export const clearToken = async () => {
  const { data } = await axios.get("/auth/logout");
  console.log("Token clear ------> ", data);
  return data;
};

// get token from the server
export const getToken = async (email) => {
  const { data } = await axios.post("/auth/jwt", { email });
  // console.log(data);
  console.log("Token recived from the server ------> ", data);
  return data;
};
