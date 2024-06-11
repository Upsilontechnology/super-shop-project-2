import useAxiosPrivate from "./useAxiosPrivate";
// import useAxiosPublic from "./useAxiosPublic";

const axios = useAxiosPrivate();
const useRole = async (email) => {
  try {
    const response = await axios.get(`/users/role/${email}`);
    if (!response.data) {
      throw new Error("Failed to fetch user role");
    }
    // console.log(response.data.role);
    return response.data.role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw new Error("Error fetching user role");
  }
};

export default useRole;
